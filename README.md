# Web Article

> The demo of this template is on <https://web-article.github.io>
>
> ## Template Instructions
>
> This repository is a template for single-page web articles. To use it, simply
> clone it, and follow the other instructions in this document for installation.
> After cloning, you should also do the following:
>
> 1. Change the title of this README.
> 1. Edit the "name", "author", "description", and "repository" fields in
>    `package.json`.
> 1. Modify the fields in `src/front-matter.yaml`.
> 1. Replace the OpenGraph preview image in
>    `src/assets/img/open-graph-preview.png`. Recommended resolution is
>    1200x630.
> 1. Replace the Twitter preview image in `src/assets/img/twitter-preview.png`.
>    Recommended resolution is a square image from 144x144 to 4096x4096.
> 1. Write your article in `src/article.md`. Make sure the title matches the one
>    in `src/front-matter.yaml`.
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
> 1. Remove this message.
>
> This repository is built on the
> [Distill template](https://github.com/distillpub/template). Essentially, this
> repository takes the components of the template and splits them up into
> multiple files in `src`, so that we can write Markdown and integrate other
> fancy technologies. See the [Distill guide](https://distill.pub/guide/) for
> more info.

## Instructions

### Installation

Install dependencies with:

```bash
npm install
```

### Build

Build the site with:

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

## Manifest

```text
src
├── index.liquid -> Liquid page template; variables are loaded in Gulpfile.js
├── front-matter.yaml -> Data passed to Distill and also to the template
├── article.md -> Main article text
├── appendix.md -> Appendix (Acknowledgements, Author Contributions, etc.)
├── references.bib -> Bibtex references, can be used in the article
├── styles.css -> Custom CSS styles, loaded into the head of the final page
├── assets/ -> Additional JS, CSS, images
└── 404.html
```

## License

While the article in this repository is released under the
[CC-BY-4.0 License](LICENSE) the infrastructure code is released under the
[MIT License](LICENSE_MIT).

## Credits

The template for this repository is here:
<https://github.com/btjanaka/web-article>. That template is based on the amazing
web articles [David Ha](https://github.com/hardmaru) publishes, such as the
[Attention Agent](https://github.com/attentionagent/attentionagent.github.io)
article.
