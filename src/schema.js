import { CHILD_REQUIRED, CHILD_TYPE_INVALID } from 'slate-schema-violations'
import { Block } from 'slate'
import isUrl from 'is-url'

export default {
    document: {
        nodes: [
            { match: [
                { type: 'title' },
                { type: 'section' },
                { type: 'code' },
                { type: 'blockquote' },
                { type: 'h1' },
                { type: 'h2' },
                { type: 'h3' },
                { type: 'h4' },
                { type: 'h5' },
                { type: 'a' },
                { type: 'img' },
                { type: 'ul' },
                { type: 'li' },
                { type: 'p' },
                { type: 'video' },
                { type: 'geogebra' },
            ]}
        ],
        blocks: {
            img: {
                isVoid: true,
                data: {
                    src: v => v && isUrl(v),
                }
            }
        },
        /*
        normalize: (change, { code, node, child, index }) => {
            switch(code) {
                case CHILD_TYPE_INVALID: {
                    console.log(`index: ${index}, child: ${child}`)
                    // const type = index === 0 ? 'title' : 'p'
                    // return change.setNodeByKey(child.key, type)
                    return true
                }
                case CHILD_REQUIRED: {
                    const block = Block.create(index === 0 ? 'title' : 'p')
                    return change.insertNodeByKey(node.key, index, block)
                }
            }
        }*/
    }
}
