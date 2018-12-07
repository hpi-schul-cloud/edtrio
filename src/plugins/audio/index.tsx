import React from "react";
import { Editor } from "slate";

export default function Audio() {
  return {
    changes: {},
    helpers: {},
    components: { AudioNode },
    plugins: [RenderAudioNode],
  };
}

function AudioNode(props: any) {
  const { src, mimeType, selected, ...attributes } = props;

  return (
    <div
      className={`plugin-wrapper ${selected ? "selected" : ""}`}
      {...attributes}
    >
      <audio
        className="audio"
        controls={true}
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
  renderNode(props: any, editor: Editor, next: () => void) {
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
    return next();
  },
};
