import { getEventTransfer } from 'slate-react'
import isUrl from 'is-url'

import YoutubeHandler from './handlers/YoutubeHandler'

export default function URLHandler(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [HandlePaste, ...YoutubeHandler().plugins]
  }
}

const HandlePaste = {
  onPaste(event, change, editor) {
    const transfer = getEventTransfer(event)
    const { type, text } = transfer

    if (type === 'text') {
      console.log('yeah text')

      if (!isUrl(text)) {
        return
      }

      console.log('indeed a url')

      if (YoutubeHandler().validate(text)) {
        return YoutubeHandler().dealWithIt(text, change)
      }

      return
    }
  }
}
