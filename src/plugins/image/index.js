import React from "react";

import "./style.css";

export default function Image(options) {
  return {
    changes: {
      insertImage,
    },
    helpers: {},
    components: {
      ImageNode,
    },
    plugins: [RenderImageNode, { schema }],
  };
}

const schema = {
  blocks: {
    img: {
      isVoid: true,
    },
  },
};

/**
 * Change that inserts an image block displaying the src image
 */
function insertImage(change, src, target) {
  if (target) {
    change.select(target);
  }

  change.insertBlock({
    type: "img",
    data: { src },
  });
}

/**
 * React Component that displays an actual image from props.src url
 */
function ImageNode(props) {
  const { src, selected, ...attributes } = props;

  return (
    <img
      src={src}
      className={`plugin-wrapper image ${selected ? "selected" : ""}`}
      alt="Uploaded by user"
      {...attributes}
    />
  );
}

/**
 * Overwrites Slates Editor.renderNode(props) to actually render
 * ImageNode for `img` tags
 */
const RenderImageNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props;

    if (node.type === "img") {
      const src = node.data.get("src");
      return <ImageNode src={src} selected={isFocused} {...attributes} />;
    }
  },
};
