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