import React from "react";
import { Editor } from "slate";

export default function Video() {
  return {
    changes: {},
    helpers: {},
    components: { VideoNode },
    plugins: [RenderVideoNode],
  };
}

function VideoNode(props: any) {
  const { src, mimeType, selected, ...attributes } = props;

  return (
    <div
      className={`plugin-wrapper ${selected ? "selected" : ""}`}
      {...attributes}
    >
      <video className="video" controls={true} preload="metadata">
        <source src={src} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

const RenderVideoNode = {
  renderNode(props: any, editor: Editor, next: any) {
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
    return next();
  },
};
