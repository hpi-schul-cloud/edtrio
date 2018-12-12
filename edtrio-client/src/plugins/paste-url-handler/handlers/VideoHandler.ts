// @ts-ignore
import mimeLookup from "browser-media-mime-type";
import { Editor } from "slate";

export default function VideoHandler() {
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

const validate = (url: string) => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  return (mimeType || "").includes("video");
};

const dealWithIt = (url: string, editor: Editor) => {
  const fileExtension = url.substr(url.lastIndexOf(".") + 1);
  const mimeType = mimeLookup(fileExtension);
  insertVideo(editor, url, mimeType);
  return true;
};

function insertVideo(editor: Editor, url: string, mimeType: any) {
  editor.insertBlock({
    type: "video",
    data: { src: url, mimeType },
  });
}
