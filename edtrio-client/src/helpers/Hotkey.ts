import isHotkey from "is-hotkey";
import { Editor } from "slate";

export default function Hotkey(hotkey: string, fn: (editor: Editor) => void) {
  return {
    onKeyDown(event: any, editor: Editor, next: () => void) {
      if (isHotkey(hotkey, event)) {
        return fn(editor);
      }
      return next();
    },
  };
}
