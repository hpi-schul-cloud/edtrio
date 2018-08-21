import { CHILD_REQUIRED, CHILD_TYPE_INVALID } from 'slate-schema-violations'
import { Block } from 'slate'
import isUrl from 'is-url'

export default {
    document: {
        nodes: [
            {
                match: [{ type: 'title' }],
                min: 1,
                max: 1,
            },
            {
                match: [{ type: 'section' }],
                min: 1,
            },
            // add normalization rule for title
            /*
            { match: [
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
            ]}*/
        ],
        blocks: {
            img: {
                isVoid: true,
                data: {
                    src: v => v && isUrl(v),
                }
            }
        },
        normalize: (change, { code, node, child, index }) => {
            switch(code) {
                case CHILD_TYPE_INVALID: {
                    console.log(change)
                    console.log(`CHILD TYPE INVALID ${index} ${child.type}`)
                    const type = index === 0 ? 'title' : 'section'
                    return change.setNodeByKey(child.key, type)
                }
                case CHILD_REQUIRED: {
                    console.log(`CHILD REQUIREDD ${index}`)
                    const block = Block.create(index === 0 ? 'title' : 'section')
                    return change.insertNodeByKey(node.key, index, block)
                }
            }
        }
    }
}
