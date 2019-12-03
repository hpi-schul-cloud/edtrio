export const splice = (array, start, deleteCount, ...item) => {
	const newArrayWithAddedSectinstate = [...array]
            newArrayWithAddedSectinstate.splice(start, deleteCount, ...item)
            return newArrayWithAddedSectinstate
}

export const mapSection = (section) => {
    return {
        ...section,
        id: section._id, // needed for old version, please use _id instead
        docValue: section.state,
        savedDocValue: section.state,
        notes: section.note,
        visible: section.visible || true, // TODO: remove should be set by server and blur mode should removed
    }
}