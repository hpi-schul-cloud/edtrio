import mimeLookup from "browser-media-mime-type";

export default function AudioHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertAudio,
    },
    helpers: {},
    components: {},
    plugins: [],
  };
}

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
