import { Editor } from "slate";

export default function VimeoHandler() {
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

// eslint-disable-next-line
const _regex = /vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/i;

const validate = (url: string) => {
  return !!_regex.exec(url);
};

const dealWithIt = (url: string, editor: Editor) => {
  const regexUrl = _regex.exec(url);
  if (regexUrl) {
    const videoId = regexUrl[2];
    insertYoutubeVideo(editor, videoId);
  }

  return true;
};

function insertYoutubeVideo(editor: Editor, videoId: string) {
  editor.insertBlock({
    type: "embed",
    data: {
      provider: "vimeo",
      url: `https://player.vimeo.com/video/${videoId}`,
    },
  });
}
