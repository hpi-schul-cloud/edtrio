
// Based heavily on ianstormtaylor/slate-soft-break
// https://yarnpkg.com/en/package/slate-soft-break
export default function SoftBreak(options) {
    return {
        onKeyDown(event, change) {
            if (event.key !== 'Enter') return
            if (change.value.anchorBlock.type === 'title') return
            return change.insertText('\n')
        },
    }
}
