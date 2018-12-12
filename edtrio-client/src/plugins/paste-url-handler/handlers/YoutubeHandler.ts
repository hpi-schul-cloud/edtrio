import { Editor } from "slate";

export default function YoutubeHandler() {
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

const validate = (url: string) => {
  return !!_regex.exec(url);
};

const dealWithIt = (url: string, editor: Editor) => {
  const regexUrl = _regex.exec(url);
  if (regexUrl) {
    const videoId = regexUrl[1];
    insertYoutubeVideo(editor, videoId);
  }
  return true;
};

function insertYoutubeVideo(editor: Editor, videoId: string) {
  editor.insertBlock({
    type: "embed",
    data: {
      provider: "youtube",
      url: `https://www.youtube-nocookie.com/embed/${videoId}`,
    },
  });
}
