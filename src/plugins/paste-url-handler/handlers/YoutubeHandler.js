export default function YoutubeHandler(options) {
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

const _regex = /youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)/i;

const validate = url => {
  return !!_regex.exec(url);
};

const dealWithIt = (url, change) => {
  const videoId = _regex.exec(url)[1];
  change.call(insertYoutubeVideo, videoId);
  return true;
};

function insertYoutubeVideo(change, videoId) {
  change.insertBlock({
    type: "embed",
    isVoid: true,
    data: {
      provider: "youtube",
      url: `https://www.youtube-nocookie.com/embed/${videoId}`,
    },
  });
}
