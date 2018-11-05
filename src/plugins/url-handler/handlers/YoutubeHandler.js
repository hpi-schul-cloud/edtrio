import React from "react";

export default function YoutubeHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertYoutubeVideo,
    },
    helpers: {},
    components: {
      YoutubeNode,
    },
    plugins: [],
  };
}

const _regex = /youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)/i;

const validate = url => {
  return !!_regex.exec(url);
};

const dealWithIt = (url, change) => {
  const videoId = _regex.exec(url)[1];
  change.call(insertYoutubeVideo, videoId);
  return true;
};

function insertYoutubeVideo(change, videoId, target) {
  change.insertBlock({
    type: "video",
    data: {
      videoId,
      provider: "youtube",
    },
  });
}

function YoutubeNode(props) {
  const { videoId, selected, ...attributes } = props;

  return (
    <div
      className={`plugin-wrapper ${selected ? "selected" : ""}`}
      style={{ display: "flex", flexDirection: "column" }}
      {...attributes}
    >
      <iframe
        title="YouTube Video"
        style={{ minHeight: "25rem" }}
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
