import React from "react";

export default function Audio(options) {
  return {
    changes: {},
    helpers: {},
    components: { AudioNode },
    plugins: [RenderAudioNode, { schema }],
  };
}

const schema = {
  blocks: {
    audio: {
      isVoid: true,
    },
  },
};

function AudioNode(props) {
  const { src, mimeType, selected, ...attributes } = props;

  return (
    <div
      className={`plugin-wrapper ${selected ? "selected" : ""}`}
      {...attributes}
    >
      <audio
        className="audio"
        controls
        preload="metadata"
        style={{ width: "100%", minHeight: "54px" }}
      >
        <source src={src} type={mimeType} />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
}

const RenderAudioNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props;

    if (node.type === "audio") {
      const src = node.data.get("src");
      const mimeType = node.data.get("mimeType");
      if ((mimeType || "").includes("audio")) {
        return (
          <AudioNode
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
