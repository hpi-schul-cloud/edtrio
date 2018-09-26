import Image from '../image'
import Iframe from '../iframe'
import { Text, Block } from 'slate'

/**
 * handles clicks on the imageblock button and
 * forwards them accordingly to plugins/image
 */
export const onClickImageButton = (event, change, onChange) => {
  const { insertImage } = Image().changes

  event.preventDefault()
  const src = window.prompt('Enter the URL of the image:')
  if (!src) return

  change.call(insertImage, src)

  onChange(change)
}

/**
 * handles clicks on the codeblock button and
 * forwards them accordingly to plugins/code-block
 */
export const onClickCodeButton = (event, change, onChange) => {
  event.preventDefault()

  change.call(_insertCodeBlock)

  onChange(change)
}

export const onClickIframeButton = (event, change, onChange) => {
  const { insertIframe } = Iframe().changes

  event.preventDefault()
  const src = window.prompt('Enter the URL of the iframe:')
  if (!src) return

  change.call(insertIframe, src)

  onChange(change)
}

function _insertCodeBlock(change, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock(
    Block.create({
      type: 'code',
      nodes: [Text.create()]
    })
  )
}
