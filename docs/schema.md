# Schema
The schema of edtr.io docs is closely aligned to the HTML5 standard to not introduce further complexity.

# Nodes
## Types
- `title`: Title of the document (`min: 1, max: 1`)
- `section`: Thematic grouping of content, typically with a heading
- `code`: Piece of computer code
- `blockquote`: Section that is quoted from another source
- `h1`-`h5`: Headings
- `a`: Hyperlink
- `img`: Image
- `ul`: Unordered, bulleted list
- `li`: List item
- `p`: Paragraph
- `video`: Video embeds (e.g. YouTube)
- `geogebra`

## Structure
There are two higher level node types: `title` and `section`.
Each document must have exactly one `title` node. It may only contain a `text` node.\
It is followed by 1:n many `section` nodes. `section` nodes can contain any type of node.

```text
├── title
│   └── text: "Title of my document"
├── section
├── section
├── ...
└── section
```


# Mark types
- `strong`
- `em`
- `cite`

For a more detailed documentation also take a look at `schema.js`.