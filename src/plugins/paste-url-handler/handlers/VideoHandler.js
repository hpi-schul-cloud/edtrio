import mimeLookup from "browser-media-mime-type";

export default function VideoHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertVideo,
    },
    helpers: {},
    components: {},
    plugins: [],
  };
}

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
