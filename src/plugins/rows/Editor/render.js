export default function({
    row,
    rows,
    index,
    store,
    getDocument,
    renderIntoExtendedSettings,
    PrimarySettingsWrapper,
}) {
    return row.render({
        renderIntoExtendedSettings,
        PrimarySettingsWrapper,
        insert: options => rows.insert(index + 1, options),
        replace: options => {
            rows.remove(index)
            rows.insert(index, options)
        },
        remove: () => {
            rows.remove(index)
        },
        mergeWithPrevious: merge => {
            if (index - 1 < 0) return
            const previous = getDocument(store.state, rows()[index - 1].id)
            const current = getDocument(store.state, row.id)
            if (!previous || !current || previous.plugin !== current.plugin)
                return
            merge(previous.state)
            setTimeout(() => rows.remove(index - 1))
        },
        mergeWithNext: merge => {
            if (index + 1 === rows().length) return
            const next = getDocument(store.state, rows()[index + 1].id)
            const current = getDocument(store.state, row.id)
            if (!next || !current || next.plugin !== current.plugin) return
            merge(next.state)
            setTimeout(() => {
                rows.remove(index + 1)
            })
        },
    })
}
