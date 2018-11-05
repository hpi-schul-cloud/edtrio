import React from "react";

export default function Iframe(options) {
  return {
    changes: {
      insertIframe,
    },
    helpers: {},
    components: {
      IframeNode,
    },
    plugins: [RenderIframeNode, { schema }],
  };
}

const schema = {
  blocks: {
    iframe: {
      isVoid: true,
    },
  },
};

function insertIframe(change, src, target) {
  if (target) {
    change.select(target);
  }

  change.insertBlock({
    type: "iframe",
    data: { src },
  });
}

function IframeNode(props) {
  const { src, selected, ...attributes } = props;

  return (
    <iframe
      src={src}
      title="Iframe"
      frameBorder="0"
      className={`iframe plugin-wrapper ${selected ? "selected" : ""}`}
      {...attributes}
    />
  );
}

const RenderIframeNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props;

    if (node.type === "iframe") {
      const src = node.data.get("src");

      return <IframeNode src={src} selected={isFocused} {...attributes} />;
    }
  },
};
