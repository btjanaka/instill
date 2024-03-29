## Abstract

Instill is a single-page article template geared towards academics looking to
create an online version of their paper. This page is a demonstration of
Instill. See
[src/article.md](https://github.com/btjanaka/instill/blob/master/src/article.md)
in the repo for the Markdown source.

## Contents

[[toc]]

## Random Paragraphs

Ullam blanditiis ducimus labore maxime quis consectetur voluptas. Blanditiis
laudantium accusantium ea. Nemo soluta nemo numquam veritatis deleniti et. Id
quis deserunt quas magni accusantium quis atque. Iure voluptas ut dolores.
Temporibus corrupti unde dolorem rerum rerum quo. Suscipit rerum nisi
perspiciatis voluptates.

Doloremque saepe ut dolorum natus. Architecto fugiat est blanditiis voluptates.
Suscipit laudantium perspiciatis asperiores deserunt molestias ratione quis. Et
asperiores tenetur accusantium. Excepturi architecto doloremque omnis culpa
sequi blanditiis enim consequatur. Eaque vero libero vitae accusamus ut
deleniti. Et ipsa aut voluptatem quam quo. Nihil cum qui accusamus.

Quia recusandae voluptas assumenda tenetur in. Et optio ea quisquam. Aperiam
esse odio eum ipsum sequi. Velit ea est accusantium sint nobis dolores tenetur.
Accusamus vero aut animi amet numquam quia. Non eligendi ut dolorem sint.
Laudantium ut sint et rerum quasi exercitationem. Odio blanditiis ut et dolore
vel dolores placeat dolores. Vel alias aperiam ipsa dolorum. Impedit sit quis
fugit enim.

### Example Sub-header

Aut dolore similique corporis sit consequatur tempore animi quae. Qui ducimus
voluptatem possimus et dolorem in corporis et. Ea quis sit molestiae aperiam
distinctio eius cupiditate deleniti. Sed aliquam ut consectetur laborum odit
porro ut. Perspiciatis iste corporis aut. Autem enim occaecati fugit
accusantium. Nemo maiores sunt alias rem dolorum consectetur id ullam.

Sint numquam esse ad quia vel delectus et. Aut non dolorem velit reprehenderit
voluptate ullam recusandae dolore. Expedita consectetur dolor eum sint
consectetur voluptas id. Fuga est vitae nisi in reprehenderit. Ducimus corrupti
quia est porro iure itaque et. Eligendi aut praesentium odit voluptas. Ut qui
inventore ut in. Explicabo ipsa aspernatur consectetur cupiditate totam
voluptatum inventore.

## Math

Here is some math: $x$

Some block math:

$$e^{i\pi} + 1 = 0$$

$$e = mc^2$$

## Footnotes

Footnotes work by putting the footnote text in `footnote` tags, such as
`<footnote>This is a footnote.</footnote>`, like right here.<footnote>This is a
footnote.</footnote> Click to open the footnote! Footnotes can also contain
formatted content, such as here. <footnote>This is **bold**, and this is
_italic_.</footnote> Footnotes also appear at the end of the
document.<footnote>I suppose they should really be called endnotes, but oh
well.</footnote>

Note that `footnote` is a custom tag, but the build process replaces it with
proper HTML tags.

## Citations

This is how to cite external publications <cite>Gregor2015</cite>. That was done
with `<cite>Gregor2015</cite>`. Click on the citation to see the references pop
up!

Multiple citations works too: <cite>Gregor2015, Mnih2015</cite>. That was done
with `<cite>Gregor2015, Mnih2015</cite>`.

Citation numbers will be sorted; even though we put `Gregor2015` at the end
here: `<cite>Silver2017, Heess2017, Gregor2015</cite>` it still shows up first
<cite>Silver2017, Heess2017, Gregor2015</cite>.

## Lists

Unordered list:

- Item 1
- Item 2

Numbered List:

1. Item 1
1. Item 2

## Code Block

```python
print("hello world")
```

## Images

Images can have captions attached to them.

![This is the caption of the figure. You can even use formatted text in it, like
**bold** text and _italic_ text. The caption can be pretty long, too, if you so
wish. This image was generated with a CPPN.](assets/img/cppn-rgb.jpg)

![Here's another image. This was also generated with a CPPN.](assets/img/cppn-grey.jpg)

Here's some text after the images.

## Appendix

### Acknowledgements

The authors are grateful...

### Author Contributions

A did this. B did that. C did nothing :(

### Citing this Article

If citing this article, please use the following bibtex:

```bibtex
@article {
  (you would fill this in)
}
```
