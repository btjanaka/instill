// Instructions for building the site as well as serving a live version.
const Cite = require("citation-js");
const CleanCSS = require("clean-css");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const fsPromises = require("fs-extra").promises;
const hljs = require("highlight.js");
const htmlMinify = require("html-minifier").minify;
const path = require("path");
const postcss = require("postcss");
const yaml = require("js-yaml");
const { Liquid } = require("liquidjs");
const { watch, series } = require("gulp");

const liquidEngine = new Liquid();
const cssMinify = new CleanCSS({ level: 1 });
const htmlMinifyOptions = {
  useShortDoctype: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  removeComments: true,
  minifyCss: true,
};

const BUILD_DIR = "build";
const STATIC_FILES = ["404.html", "favicon.ico", "robots.txt"];

// markdown-it with various plugins.
const md = require("markdown-it")({
  html: true,
  xhtmlOut: false,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ""; // Use external default escaping.
  },
})
  .use(require("@iktakahiro/markdown-it-katex"))
  .use(require("markdown-it-center-text"))
  .use(require("markdown-it-anchor"), {
    level: 2,
    permalink: true,
    permalinkBefore: false,
    permalinkSymbol: "¶",
    permalinkClass: "permalink", // Style in index.liquid
  })
  .use(require("markdown-it-toc-done-right"), {
    level: 2,
    listType: "ul",
    containerClass: "l-body",
  })
  .use(require("markdown-it-implicit-figures"), {
    figcaption: true,
    link: false,
  });

function clean(callback) {
  fs.removeSync(BUILD_DIR);
  fs.mkdirSync(BUILD_DIR);
  callback();
}

// Only intended for development mode.
function linkFiles(callback) {
  for (const filename of STATIC_FILES) {
    fs.symlinkSync(
      path.join("../src", filename),
      path.join(BUILD_DIR, filename)
    );
  }

  fs.symlinkSync("../src/assets", path.join(BUILD_DIR, "assets"));

  callback();
}

function copyFiles(callback) {
  for (const filename of STATIC_FILES) {
    fsPromises.copyFile(
      path.join("src", filename),
      path.join(BUILD_DIR, filename)
    );
  }

  fs.copySync("src/assets/", path.join(BUILD_DIR, "assets"));

  callback();
}

// Sets the alt attribute of each image to be its caption.
function setImageAlt(article) {
  article("figure").each(function (idx, obj) {
    /* eslint-disable no-invalid-this */

    const caption = article(this).children("figcaption").text();
    article(this).children("img").attr("alt", caption);
  });
}

// Renders the footnotes in-place in the article.
function renderFootnotes(article) {
  const footnotes = [];

  article("footnote").each(function (idx, obj) {
    /* eslint-disable no-invalid-this */

    const note = article(this).html();
    footnotes.push(note);

    // Create the modal.
    article(this).replaceWith(`<span class="modal-container">
  <input id="footnote-toggle-${idx + 1}" class="modal-toggle" type="checkbox">
  <button><sup>${idx + 1}</sup></button>
  <span class="modal-backdrop">
    <span class="modal-content">
      ${note}
      <label class="modal-close" for="footnote-toggle-${
        idx + 1
      }">[Close]</label>
    </span>
  </span>
</span>`);
  });

  article("ol#footnote-list").html(
    footnotes.map((note) => `<li class="end-item">${note}</li>`).join("\n")
  );

  if (footnotes.length == 0) {
    article("h2:contains(Footnotes)").remove();
    article("ol#footnote-list").remove();
  }
}

function renderEntry(entry) {
  const tokens = [`<span>`];

  // Title.
  tokens.push(`<b>${entry.title}</b>`);

  // URL if available.
  if (entry.URL)
    tokens.push(
      ` <a title="Link" href="${entry.URL}" class="ref-link">[link]</a>`
    );

  // Put the remaining info on the next line.
  tokens.push(`<br/>`);

  // Authors with Last Name, First Initial.
  for (const author of entry.author) {
    tokens.push(`${author.family}, ${author.given[0]}., `);
  }

  // Year.
  tokens.push(`${entry.issued["date-parts"][0][0]}.`);

  tokens.push(`</span>`);
  return tokens.join("");
}

// Renders the modals and reference lists in-place in the article.
function renderReferences(article) {
  const references = Cite.input(fs.readFileSync("src/references.bib", "utf8"), {
    forceType: "@bibtex/text",
  });
  const idToEntry = {};
  for (let i = 0; i < references.length; ++i) {
    idToEntry[references[i].id] = references[i];
  }
  const citedEntries = []; // Only keep track of cited entries.
  const citedIdsToNums = {}; // Maps IDs to positions in citedEntries.

  // Create the modal for each citation in the article. Clicking on each modal
  // gives a popup with the references.
  article("cite").each(function (idx, obj) {
    /* eslint-disable no-invalid-this */

    // Retrieve the specified ids from the text of the citation. The citations
    // should be comma-separated (they can have some whitespace though).
    const ids = article(this)
      .text()
      .split(",")
      .map((s) => s.trim());

    // Turn the ids into a list of entries and citation numbers.
    const data = [];
    for (const id of ids) {
      if (id in citedIdsToNums === false) {
        // If item has not been cited before, add it to the cited entries.
        const entry = idToEntry[id];
        citedIdsToNums[id] = citedEntries.length;
        citedEntries.push(entry);
      }
      const pos = citedIdsToNums[id];
      data.push({ entry: citedEntries[pos], num: pos });
    }
    data.sort((a, b) => a.num - b.num); // Sort by number.

    // Render all the entries for display in the modal.
    const renderedEntries = data
      .map((o) => o.entry)
      .map(renderEntry)
      .map((entry) => `<span class="end-item">${entry}</span>`) // Put each entry in a span.
      .join("<br/><br/>\n");

    // Render the nums. Add 1 because the nums are 0-based and we want 1-based.
    const numStr = `[${data
      .map((o) => o.num)
      .map((x) => x + 1)
      .join(",")}]`;

    // Create the modal.
    article(this).replaceWith(`<cite class="modal-container">
  <input id="ref-toggle-${idx}" class="modal-toggle" type="checkbox">
  <button>${numStr}</button>
  <span class="modal-backdrop">
    <span class="modal-content">
      ${renderedEntries}
      <label class="modal-close" for="ref-toggle-${idx}">[Close]</label>
    </span>
  </span>
</cite>`);
  });

  article("ol#reference-list").html(
    citedEntries
      .map((entry) => `<li class="end-item">${renderEntry(entry)}</li>`)
      .join("\n")
  );

  if (citedEntries.length == 0) {
    article("h2:contains(References)").remove();
    article("ol#reference-list").remove();
  }
}

function renderArticle() {
  const markdownText =
    fs.readFileSync("src/article.md", "utf8") +
    `
## Footnotes

<ol id="footnote-list" class="end-list"></ol>

## References

<ol id="reference-list" class="end-list"></ol>
`;
  const article = cheerio.load(md.render(markdownText));

  // Lazy loading for images.
  article("img").attr("loading", "lazy");

  setImageAlt(article);
  renderFootnotes(article);
  renderReferences(article);

  return article.html();
}

async function buildArticle(minify, callback) {
  const template = fs.readFileSync("src/index.liquid", "utf8");
  const data = yaml.safeLoad(fs.readFileSync("src/data.yaml", "utf8"));
  const article = renderArticle();

  let styles = fs.readFileSync("src/styles.css", "utf8");
  styles = (await postcss([autoprefixer]).process(styles, { from: undefined }))
    .css;
  if (minify) styles = cssMinify.minify(styles).styles;

  const substitutions = {
    styles: styles,
    article: article,
  };

  for (const key in data) {
    if (data.hasOwnProperty(key) && key !== "styles" && key !== "article") {
      substitutions[key] = data[key];
    }
  }

  const html = await liquidEngine.parseAndRender(template, substitutions);
  if (minify) html = htmlMinify(html, htmlMinifyOptions);
  fs.writeFile(path.join(BUILD_DIR, "index.html"), html);

  callback();
}

function refreshSite(callback) {
  browserSync.reload();
  callback();
}

// Watch all files for changes, except the build and other unneccessary folders.
function liveReload() {
  watch(
    ["src/**/*.*", "!**/.*.swp", "!**/*.vim"],
    { ignoreInitial: false },
    series((cb) => buildArticle(false, cb), refreshSite)
  );
}

function startServer(callback) {
  browserSync.init({
    port: 3000,
    online: false,
    localOnly: true,
    host: "localhost",
    server: {
      baseDir: BUILD_DIR,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    notify: true,
    // Only bind to the localhost IP, (instead of 0.0.0.0, which allows external
    // connections.
    listen: "localhost",
    callbacks: {
      // 404 page.
      ready: function (err, bs) {
        bs.addMiddleware("*", function (req, res) {
          res.writeHead(302, {
            location: "404.html",
          });
          res.end("Redirecting!");
        });
      },
    },
  });
  callback();
}

exports.default = function (callback) {
  console.log("Commands:");
  console.log("  build -> Build the entire site.");
  console.log("  watch -> Live reload the site at localhost:3000.");
  callback();
};
exports.build = series(clean, copyFiles, (cb) => buildArticle(true, cb));
exports.watch = series(clean, linkFiles, startServer, liveReload);
