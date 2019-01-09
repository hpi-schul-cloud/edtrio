// @ts-ignore
import mimeLookup from "browser-media-mime-type";
import { Editor } from "slate";

export default function AudioHandler() {
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

const validate = (url: string) => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  return (mimeType || "").includes("audio");
};

const dealWithIt = (url: string, editor: Editor) => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  insertAudio(editor, url, mimeType);
  return true;
};

function insertAudio(editor: Editor, url: string, mimeType: any) {
  editor.insertBlock({
    type: "audio",
    data: { src: url, mimeType },
  });
}
