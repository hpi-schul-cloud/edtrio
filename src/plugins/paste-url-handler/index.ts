import isUrl from "is-url";
import { getEventTransfer } from "slate-react";

import { Editor } from "slate";
import AudioHandler from "./handlers/AudioHandler";
import VideoHandler from "./handlers/VideoHandler";
import VimeoHandler from "./handlers/VimeoHandler";
import YoutubeHandler from "./handlers/YoutubeHandler";

export default function PasteURLHandler() {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [
      HandlePaste,
      ...YoutubeHandler().plugins,
      ...VimeoHandler().plugins,
      ...VideoHandler().plugins,
      ...AudioHandler().plugins,
    ],
  };
}

const HandlePaste = {
  onPaste(event: any, editor: Editor, next: () => void) {
    const transfer = getEventTransfer(event);
    // @ts-ignore, text is in there
    const { type, text } = transfer;

    if (type === "text") {
      if (!isUrl(text)) {
        return;
      }

      if (YoutubeHandler().validate(text)) {
        return YoutubeHandler().dealWithIt(text, editor);
      }

      if (VimeoHandler().validate(text)) {
        return VimeoHandler().dealWithIt(text, editor);
      }

      if (VideoHandler().validate(text)) {
        return VideoHandler().dealWithIt(text, editor);
      }

      if (AudioHandler().validate(text)) {
        return AudioHandler().dealWithIt(text, editor);
      }
    }
    return next();
  },
};
