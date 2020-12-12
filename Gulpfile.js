// Instructions for building the site as well as serving a live version.
const browserSync = require("browser-sync");
const fs = require("fs-extra");
const fsPromises = require("fs-extra").promises;
const path = require("path");
const yaml = require("js-yaml");
const { Liquid } = require("liquidjs");
const { watch, series } = require("gulp");

const BUILD_DIR = "build";
const liquidEngine = new Liquid();

// markdown-it with katex and center-text plugins.
const md = require("markdown-it")({
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true,
})
  .use(require("markdown-it-katex"))
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
  });

function clean(callback) {
  fs.removeSync(BUILD_DIR);
  fs.mkdirSync(BUILD_DIR);
  callback();
}

function linkAssets(callback) {
  fs.symlinkSync("../src/assets", path.join(BUILD_DIR, "assets"));
  callback();
}

function copyAssets(callback) {
  fs.copySync("src/assets/", path.join(BUILD_DIR, "assets"));
  callback();
}

function buildArticle(callback) {
  const template = fs.readFileSync("src/index.liquid", "utf8");
  const frontMatter = fs.readFileSync("src/front-matter.yaml", "utf8");
  const frontMatterData = yaml.safeLoad(frontMatter);

  const substitutions = {
    frontMatter: frontMatter,
    title: frontMatterData.title,
    description: frontMatterData.description,
    url: frontMatterData.url,
    styles: fs.readFileSync("src/styles.css", "utf8"),
    article: md.render(fs.readFileSync("src/article.md", "utf8")),
    references: fs.readFileSync("src/references.bib", "utf8"),
    appendix: md.render(fs.readFileSync("src/appendix.md", "utf8")),
  };

  liquidEngine
    .parseAndRender(template, substitutions)
    .then((data) => fs.writeFile(path.join(BUILD_DIR, "index.html"), data))
    .then(callback);
}

function build404(callback) {
  fsPromises.copyFile("src/404.html", path.join(BUILD_DIR, "404.html"));
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
    series(buildArticle, build404, refreshSite)
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
        console.log(bs.options.get("urls"));
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
exports.build = series(clean, copyAssets, build404, buildArticle);
exports.watch = series(clean, linkAssets, startServer, liveReload);
