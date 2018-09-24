import isHotkey from 'is-hotkey'

export default function Hotkey(hotkey, fn) {
  return {
    onKeyDown(event, change, editor) {
      if (isHotkey(hotkey, event)) {
        change.call(fn)
      }
    }
  }
}
