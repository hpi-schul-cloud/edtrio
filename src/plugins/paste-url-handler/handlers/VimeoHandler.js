export default function VimeoHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertYoutubeVideo,
    },
    helpers: {},
    components: {},
    plugins: [],
  };
}

//eslint-disable-next-line
const _regex = /vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/i;

const validate = url => {
  return !!_regex.exec(url);
};

const dealWithIt = (url, change) => {
  const videoId = _regex.exec(url)[2];
  change.call(insertYoutubeVideo, videoId);
  return true;
};

function insertYoutubeVideo(change, videoId) {
  change.insertBlock({
    type: "embed",
    isVoid: true,
    data: {
      provider: "vimeo",
      url: `https://player.vimeo.com/video/${videoId}`,
    },
  });
}
