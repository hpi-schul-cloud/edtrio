import isHotkey from "is-hotkey";
import { Editor } from "slate";

export default function Hotkey(hotkey: string, fn: (editor: Editor) => void) {
  return {
    onKeyDown(event: any, editor: Editor, next: () => void) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        return fn(editor);
      }
      return next();
    },
  };
}
