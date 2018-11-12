import React from "react";

import mimeLookup from "browser-media-mime-type";

export default function YoutubeHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertVideo,
    },
    helpers: {},
    components: {
      VideoNode,
    },
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

const validate = url => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  return (mimeType || "").includes("video");
};

const dealWithIt = (url, change) => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  change.call(insertVideo, url, mimeType);
  return true;
};

function insertVideo(change, src, mimeType) {
  change.insertBlock({
    type: "video",
    data: { src, mimeType },
  });
}

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
