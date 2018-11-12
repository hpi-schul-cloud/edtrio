import { getEventTransfer } from "slate-react";
import isUrl from "is-url";

import YoutubeHandler from "./handlers/YoutubeHandler";
import VimeoHandler from "./handlers/VimeoHandler";
import VideoHandler from "./handlers/VideoHandler";
import AudioHandler from "./handlers/AudioHandler";

export default function PasteURLHandler(options) {
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
  onPaste(event, change, editor) {
    const transfer = getEventTransfer(event);
    const { type, text } = transfer;

    if (type === "text") {
      if (!isUrl(text)) {
        return;
      }

      if (YoutubeHandler().validate(text)) {
        return YoutubeHandler().dealWithIt(text, change);
      }

      if (VimeoHandler().validate(text)) {
        return VimeoHandler().dealWithIt(text, change);
      }

      if (VideoHandler().validate(text)) {
        return VideoHandler().dealWithIt(text, change);
      }

      if (AudioHandler().validate(text)) {
        return AudioHandler().dealWithIt(text, change);
      }

      return;
    }
  },
};
