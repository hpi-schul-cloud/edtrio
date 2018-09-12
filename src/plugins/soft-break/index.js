
// Based heavily on ianstormtaylor/slate-soft-break
// https://yarnpkg.com/en/package/slate-soft-break
export default function SoftBreak(options) {
    return {
        onKeyDown(event, change) {
            if (event.key !== 'Enter') return
            if (event.shiftKey === false) return
            switch(change.value.anchorBlock.type) {
                case 'title':
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5': return
            }
            return change.insertText('\n')
        },
    }
}
