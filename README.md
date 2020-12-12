# Instill

> ## Template Instructions (Remove when Done)
>
> > _Articles for instilling knowledge into the greater community._
>
> This repository is a template for single-page articles. The demo of this
> template is on <https://instill-article.github.io>
>
> To use it, start by clicking the `Use this template` button on the home page
> of the repo, or by visiting
> [this link](https://github.com/btjanaka/instill/generate). Follow the other
> instructions in this document for installation, then do the following:
>
> 1. Check that the license agrees with you. If this work is not under
>    CC-BY-4.0, you will need to change the `LICENSE`, modify the license
>    statement at the bottom of `src/index.liquid`, and switch the "license"
>    field in `package.json`.
> 1. Change the title of this README.
> 1. Edit the "name", "author", "description", and "repository" fields in
>    `package.json`.
> 1. Modify the fields in `src/data.yaml`.
> 1. Replace the OpenGraph preview image in
>    `src/assets/img/open-graph-preview.png`. Recommended resolution is
>    1200x630.
> 1. Replace the Twitter preview image in `src/assets/img/twitter-preview.png`.
>    Recommended resolution is a square image from 144x144 to 4096x4096.
> 1. Write your article in `src/article.md`. Make sure the title matches the one
>    in `src/data.yaml`.
> 1. When writing references in `src/references.bib`, make sure to include the
>    `url` field so that the article can easily be accessed from the article.
> 1. The repository is designed to deploy to a GitHub Pages site on an external
>    repo. Typically, I do this by creating an organization so that I can have a
>    URL like `custom-name.github.io`. Once you have such a repo, set up GitHub
>    Actions deployment:
>    1. Obtain a
>       [Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).
>    1. Add the token as a secret called `TOKEN`
>       ([how to add a secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository))
>    1. Change the `external_repository` at the bottom of
>       `.github/workflows/deploy.yaml`.
> 1. Replace the favicon in `src/favicon.ico`. If you are unfamiliar with
>    favicons, I recommend using an online favicon converter.
> 1. Remove this message.
>
> Note that this template does not use any JavaScript in the final site :)

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

The main article text is in `src/articles.md`. Normal Markdown features apply.

Furthermore, you can cite references in `src/references.bib` with
`<cite key="KEYS"></cite>` where `KEYS` is a comma-separated list of keys from
`src/references.bib`. For instance, you can use
`<cite key="Einstein1921, Oppenheimer1950"></cite>` to cite two articles
`Einstein1921` and `Oppenheimer1950`.

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
├── robots.text -> Defaults to doing nothing
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
