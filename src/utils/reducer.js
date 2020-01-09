/**
 * Maps Object from the backend to the needed section attribute
 * @param {Object} section - section object sended from the backend
 */
export const mapSection = (section) => {
	return {
		...section,
		id: section._id, // needed for old version, please use _id instead
		docValue: section.state,
		savedDocValue: section.state, // value of docValue that is saved on the backend, needed for creating diff when docValue was changed
		notes: section.note,
		visible: section.visible || true, // TODO: remove should be set by server and blur mode should removed
	}
}


/**
 * Copies an array and runs splice on it.
 * The copie of the array is retruned, not the spliced elements
 *
 * @param {any[]} array - array that need a copie and splice should called on
 * @param {Integer} start - start postion in array
 * @param {Integer} deleteCount - elements to delete
 * @param  {...any} item - elements to add
 *
 * @returns {any[]} - new Array with all object without the spliced ones
 */
export const invertSplice = (array, start, deleteCount, ...item) => {
	const newArrayWithAddedSectinstate = [...array]
	newArrayWithAddedSectinstate.splice(start, deleteCount, ...item)
	return newArrayWithAddedSectinstate
}