import {updateOrAdd} from '~/Contexts/section.actions'
import { fetchSection , saveSections } from './section.actions'
import { saveSectionCache } from "~/utils/cache"


export const ERROR = 'ERROR'
export const SAVE_STATUS = 'SAVE_STATUS'

export const ADD_SECTION_STATE_CONFLICT = 'ADD_SECTION_STATE_CONFLICT'
export const SECTION_STATE_CONFLICTS_RESOLVED = 'SECTION_STATE_CONFLICTS_RESOLVED'


/**
 * adds a message to the nofification pannel for noticing the user
 * 
 * @param {string} message - message that should show to the user
 */
export const newError = (message) => ({
	type: ERROR,
	message
})

/**
 * set status message to unsaved changes
 */
export const unsavedChanges = () => ({
	type: SAVE_STATUS,
	payload: 'Ungesicherte Änderungen'
})

export const addSectionStateConflict = (sectionId, local, server) => ({
	type: ADD_SECTION_STATE_CONFLICT,
	_id: sectionId,
	local,
	server
})

export const sectionStateConflictResolved = (loadFromServer) => ({state, dispatch}) => {

	const conflicts = state.notifications.sectionStateConflicts

	if (loadFromServer) {
		const _ids = conflicts.map(({_id, server}) => {
			server._id = _id;
			dispatch(updateOrAdd(server))
			saveSectionCache(server)
			return _id
		})

		dispatch(fetchSection(..._ids))
	} else {
		const _ids = conflicts.map(({_id, local}) => {
			local._id = _id;
			dispatch(updateOrAdd(local))
			return _id;
		})
		dispatch(saveSections(false, ..._ids))
	}


	dispatch({type: SECTION_STATE_CONFLICTS_RESOLVED})
}