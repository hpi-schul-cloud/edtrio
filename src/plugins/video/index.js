import React from "react";

export default function Video(options) {
  return {
    changes: {},
    helpers: {},
    components: { VideoNode },
    plugins: [RenderVideoNode, { schema }],
  };
}

const schema = {
  blocks: {
    video: {
      isVoid: true,
    },
  },
};

function VideoNode(props) {
  const { src, mimeType, selected, ...attributes } = props;

  return (
    <div
      className={`plugin-wrapper ${selected ? "selected" : ""}`}
      {...attributes}
    >
      <video className="video" controls preload="metadata">
        <source src={src} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

const RenderVideoNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props;

    if (node.type === "video") {
      const src = node.data.get("src");
      const mimeType = node.data.get("mimeType");
      if ((mimeType || "").includes("video")) {
        return (
          <VideoNode
            src={src}
            mimeType={mimeType}
            selected={isFocused}
            {...attributes}
          />
        );
      }
    }
  },
};
