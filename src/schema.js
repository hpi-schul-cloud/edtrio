import { Block } from 'slate'

export default {
  document: {
    nodes: [
      { match: [{ type: 'title' }], min: 1, max: 1 },
      { match: [{ type: 'section' }], min: 1 }
    ],
    normalize: (change, { code, node, child, index }) => {
      if (index !== 0) {
        return
      }

      // only deal with title nodes here
      switch (code) {
        case 'child_type_invalid': {
          console.log('uh')
          return change.setNodeByKey(child.key, 'title')
        }
        case 'child_required': {
          console.log('mhm')
          const block = Block.create(index === 0 ? 'title' : 'paragraph')
          return change.insertNodeByKey(node.key, index, block)
        }
        default: {
          console.log('some error')
        }
      }
    }
  }
}
