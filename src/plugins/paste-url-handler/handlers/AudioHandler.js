import React from "react";

import mimeLookup from "browser-media-mime-type";

export default function AudioHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertAudio,
    },
    helpers: {},
    components: {
      AudioNode,
    },
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

const validate = url => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  return (mimeType || "").includes("audio");
};

const dealWithIt = (url, change) => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  change.call(insertAudio, url, mimeType);
  return true;
};

function insertAudio(change, src, mimeType, target) {
  change.insertBlock({
    type: "audio",
    data: { src, mimeType },
  });
}

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
