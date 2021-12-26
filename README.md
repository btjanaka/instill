# Instill

> ## About Instill
>
> Instill is a single-page article template geared towards academics looking to
> create an online version of their paper. Visit the demo here:
> <https://instill-article.github.io>
>
> ## Features
>
> - Write articles in Markdown! Parsing done by
>   [markdown-it](https://www.npmjs.com/package/markdown-it)
> - Katex support thanks to
>   [markdown-it-katex](https://www.npmjs.com/package/@iktakahiro/markdown-it-katex)
> - Table of contents for your articles with
>   [markdown-it-toc-done-right](https://www.npmjs.com/package/markdown-it-toc-done-right)
> - Include and cite bibtex references with a custom `cite` command; e.g.
>   `<cite>someone1992</cite>`
>   - Citations come with a modal that shows more info when clicked on
> - Write footnotes that show up in a modal with
>   `<footnote>Lorem ipsum dolor...</footnote>`
> - Lazy loaded images as suggested
>   [here](https://victorzhou.com/blog/lazy-loading-images/)
> - Syntax highlighting for code blocks with
>   [highlight.js](https://highlightjs.org/)
> - SEO tags (OpenGraph and Twitter) included
> - Liquid / liquidjs template and CSS stylesheet if you really want to dig into
>   customization :smile:
> - CSS autoprefixing for browser compatibility
> - HTML+CSS minifier for final page output (though honestly, the page is
>   already tiny :laughing:)
> - Pure HTML+CSS output (JavaScript is only used for generating the site)
>   - Yes, even the modals are HTML+CSS :wink:
> - Integration with GitHub Actions to deploy to a GitHub Pages site.
>
> ## Getting Started
>
> To use Instill, start by clicking the `Use this template` button on the home
> page of the repo, or by visiting
> [this link](https://github.com/btjanaka/instill/generate). Then do the
> following:
>
> 1. Check that the license agrees with you. If this work is not under
>    CC-BY-4.0, you will need to change the `LICENSE`, modify the license
>    statement at the bottom of `src/index.liquid`, and switch the "license"
>    field in `package.json`.
> 1. Edit the "name", "author", "description", and "repository" fields in
>    `package.json`.
> 1. Install dependencies with `npm install`. It is probably a good idea to try
>    firing up the live server with `npm start`.
> 1. Modify the fields in `src/data.yaml`.
> 1. Replace the following images now or later:
>    1. The OpenGraph preview image in `src/assets/img/open-graph-preview.png`.
>       Recommended resolution is 1200x630.
>    1. The Twitter preview image in `src/assets/img/twitter-preview.png`.
>       Recommended resolution is a square image from 144x144 to 4096x4096.
>    1. The favicon in `src/favicon.ico`. If you are unfamiliar with favicons, I
>       recommend using an online favicon converter.
> 1. The repository is designed to deploy to a GitHub Pages site on an external
>    repo. Typically, I do this by creating an organization so that I can have a
>    URL like `custom-name.github.io`. Once you have such a repo, set up GitHub
>    Actions deployment:
>    1. Obtain a
>       [Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).
>    1. Add the token as a secret called `TOKEN`
>       ([how to add a secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository))
>    1. Change the `external_repository` (and maybe also the `publish_branch`)
>       at the bottom of `.github/workflows/deploy.yaml`.
> 1. Remove this blockquote section from the README (but keep the rest of it for
>    your use).
> 1. You're now ready to write your article! The article content is in
>    `src/article.md`, while the references are in `src/references.bib`. See the
>    instructions below for more info.
>
> ## Why "Instill"?
>
> 1. _Instill_ knowledge into others by using this template to write an article.
> 1. Much of this template was inspired by
>    [Distill](https://distill.pub/guide/).

## Instructions

### Installation

Install dependencies with:

```bash
npm install
```

### Build

Build the site for deployment with:

```bash
npm run build
```

The site will now be available in `build/`. Open `build/index.html` with your
browser to view the site.

### Development

Start the dev server with:

```bash
npm start
```

And view the site at <https://localhost:3000>.

### Writing

The main article text is in `src/article.md`. Normal Markdown features apply.
In addition:

- When creating an image, such as with `![Alt text](path/to/img.jpg)`, the alt
  text will be used as the image caption, and will appear below the image when
  rendered.
- You can write footnotes with `<footnote>This is a footnote</footnote>`.
- You can cite references in `src/references.bib` with `<cite>KEYS</cite>` where
  `KEYS` is a comma-separated list of keys/ids from `src/references.bib`. For
  instance, you can use `<cite>Einstein1921, Oppenheimer1950"</cite>` to cite
  two articles `Einstein1921` and `Oppenheimer1950`.
  - Make sure to include the `url` field in your bibtex entries so that the
    articles are easily accessible from the webpage.

### Customization

The article is loaded in a liquidjs template in `src/index.liquid`. Any
variables in `src/data.yaml` will be passed to this template, except for
`styles` and `article` (those are reserved). You can also modify the CSS in
`src/styles.css`. If you plan to change the appearance completely, note that the
404 page has its own inline styling, so you will want to modify that too.

## Manifest

```text
src
├── index.liquid -> Liquid page template; variables are loaded in Gulpfile.js
├── data.yaml -> Data passed to the template
├── article.md -> Main article text
├── appendix.md -> Appendix (Acknowledgements, Author Contributions, etc.)
├── references.bib -> Bibtex references, can be used in the article
├── styles.css -> Custom CSS styles, loaded into the head of the final page
├── assets/ -> Additional JS, CSS, images
├── robots.txt -> Defaults to doing nothing
├── favicon.ico -> Default is just an X
└── 404.html
```

## License

The article in this repository is released under the
[CC-BY-4.0 License](LICENSE), and the infrastructure code is released under the
[MIT License](LICENSE_MIT).

## Credits

This article is built with the [Instill](https://github.com/btjanaka/instill)
template by [Bryon Tjanaka](https://btjanaka.net).
