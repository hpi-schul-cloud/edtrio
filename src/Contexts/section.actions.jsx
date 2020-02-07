import { editorWS } from "~/utils/socket"
import { mergeDiff, buildDiff } from '~/utils/diff'
import uuid from "uuid/v4"
import { saveSectionCache } from "~/utils/cache"
import { generateHash } from "~/utils/crypto"
import { SET_ACTIVE_SECTION } from "./view.actions"
import { mapSection } from "~/utils/reducer"
import logger from "redux-logger"

export const SET_SECTIONS = 'SET_SECTIONS'
export const ADD_SECTION = 'ADD_SECTION'
export const REPLACE_ADDED_SECTION_ID = "REPLACE_ADDED_SECTION_ID"
export const SWITCH_SECTION_VISIBILTY = 'SWITCH_SECTION_VISIBILTY'
export const PREPARE_DELETE_SECTION = 'PREPARE_DELETE_SECTION'
export const DELETE_SECTION = 'DELETE_SECTION'
export const DELETING_SECTION_FAILED = 'DELETING_SECTION_FAILED'
export const UPDATE_SECTION = 'UPDATE_SECTION'
export const SECTION_DOCVALUE_CHANGE = 'SECTION_DOCVALUE_CHANGE'
export const SAVING_SECTION = 'SAVING_SECTION'
export const SAVING_SECTION_FAILED = 'SAVING_SECTION_FAILED'
export const SECTION_SAVED = 'SECTION_SAVED'
export const FETCHING_SECTION = 'FETCHING_SECTION'
export const SECTION_FETCHED = 'SECTION_FETCHED'
export const FETCHING_SECTION_FAILED = 'SECTION_FETCHED'

/**
 * Switch visibible of a section to true or false depending on the current value
 * Will be synced with the server while save process and makes the sections
 * invisible or visble for all how do not have write permissions
 *
 * @param {string} sectionId - id of the sections witch visibility should switch
 */
export const switchSectionVisibility = (sectionId) => ({
	type: SWITCH_SECTION_VISIBILTY,
	payload: sectionId
})

/**
 * Set Sections in store, if there are existing sections they will overwirden
 * to add a Section use addSection
 *
 * @param {Object[]} sections - Sections to overwrite current sections
 */
export const setSections = (sections) => ({
	type: SET_SECTIONS,
	payload: sections
})

/**
 * Add a section to the current state of sections, it is recommend to set an Id at least
 * But could also called with out any parameter. Sections will be set with following parametes
 * if no other value is given
 *
 * Defaults:
 * - title: ""
 * - _id: uuid - should be set to a mongoDB id, otherwise it could not saved to server
 * - visible: true - also read users can see the section
 * - docValue: {} - state object of serlo editor
 * - changed: Set - have to be an Set Obejct with last changes, shouldn't be overwrite
 * - position: -1 - section will added at least positon
 *
 * @param {Object} [section] - section object, all necesarry data are setten by default and can be overwirten
 */
export const addSection = (section) => ({
	type: ADD_SECTION,
	payload: {
		title: "",
		_id: uuid(), // TODO: mark, so it will not be saved to backend with this id
		visible: true,
		docValue: {},
		changed: new Set(),
		position: -1, // added at last pos
		...section
	}
})

/**
 * Fetch one or multible sections from the server and add it to sections state
 * if no positon is setted by the server response it will be added at last position
 *
 * @param  {...String} sectionIds - comma seperated list of section ids
 */
export const fetchSection = (...sectionIds) => ({state, dispatch}) => {

	// TODO: check connection and inform user

	const proms = sectionIds.map(async (_id) => {

		dispatch({
			type: FETCHING_SECTION,
			payload: _id
		})

		return editorWS.emit(
			'get',
			`lesson/${state.lesson._id}/sections`,
			_id
		)
	})

	const resolved = Promise.allSettled(proms)
	resolved.forEach((res, i) => {
		if(res.status === 'fulfilled'){
			dispatch(addSection(mapSection(res.value)))
			dispatch({
				type: SECTION_FETCHED,
				payload: res.value._id
			})
		} else {
			dispatch({
				type: FETCHING_SECTION_FAILED,
				payload: sectionIds[i]
			})
		}
	})
}

/**
 * Creates a new section and persist it on the backend, section is created with default values of addSection
 *
 * @param {int} position - positon of section
 */
export const createSection = (position) => async ({dispatch, state}) => {
	const tempId = uuid()
	const {lesson} = state
	position = position || state.sections.length

	dispatch(addSection({
		_id: tempId,
		position
	}));

	if (lesson && lesson._id && !Number.isInteger(lesson._id)) {
		try{
			const section = await editorWS.emit('create', `lesson/${lesson._id}/sections`, {})
			dispatch({
				type: REPLACE_ADDED_SECTION_ID,
				payload: {
					tempId,
					backendId: section._id,
				},
			})
		} catch (err){
			logger.log('err', err);
			dispatch({ // TODO: Recognice it and save it later, have to be a post and not a patch
				// trigger could be the connection, need to be sockets as component und bind do a store
				type: SAVING_SECTION_FAILED,
				payload: {
					_id: tempId,
					err
				}
			})
		}
	}
	// eslint-disable-next-line no-console
	console.log('TODO: task without lesson should also work');
}

/**
 * Saves all data to server, that are markes in the changed Set
 */
export const saveSections = () => async ({dispatch, state}) => {

	const { sections, lesson } = state
	const NOTHING_TO_SAVE = 'nothing to save'

	const hashes = []
	// keep care of adding or removing something, ...section is to generate hash and it should include
	// everything witch is part of section, compared to database
	const proms = sections.map(({changed, hash, timestamp, ...section}, index) => {
		const changes = {}

		if ( changed.size === 0 ) return Promise.resolve(NOTHING_TO_SAVE)

		dispatch({
			type: SAVING_SECTION
		})

		changed.forEach(key => {
			if(key === 'docValue'){
				changes.stateDiff = buildDiff(
					section.savedDocValue,
					section.docValue,
				)
			} else if (Object.prototype.hasOwnProperty.call(section, key)) {
				changes[key] = section[key]
			}
		})

		// meaby a hash should be part of the server request, but not implemented write now
		hashes[index] = generateHash(section)

		return editorWS.emit(
			'patch',
			`lesson/${lesson._id}/sections`,
			section._id,
			changes,
			{ state: 'diff' }
		);
	})

	const resolved = await Promise.allSettled(proms)

	resolved.forEach((res, i) => {
		// keep care of adding or removing something, ...section is to generate hash and it should include
		// everything witch is part of section, compared to database
		const {changed, ...section} = sections[i]
		const sectionId = section._id

		if(res.status === 'fulfilled'){
			if(res.value !== NOTHING_TO_SAVE){
				dispatch({
					type: SECTION_SAVED,
					payload: sectionId
				})

				saveSectionCache({
					...section,
					// timestamp: res.value.updatedAt || res.value.instertedAt,
					hash: hashes[i],
					savedToBackend: true
				})
			}
		} else {
			dispatch({
				type: SAVING_SECTION_FAILED,
				payload: sectionId
			})
			saveSectionCache({
				section,
				hash: hashes[i],
				savedToBackend: false
			})
		}
	})


}

/**
 * Sets docValue
 *
 * @param {string} sectionId - ID of a section
 * @param {Object} docValue - should be a Serlo Editor State
 */
export const updateSectionDocValue = (sectionId, docValue) => ({
	type: SECTION_DOCVALUE_CHANGE,
	payload: {
		_id: sectionId,
		docValue
	}
})

/**
 * Use if section is already updated, for example by the sockets
 *
 * @param {string} sectionId - ID of a section
 * @param {Object} section - Section object itself
 */
export const sectionWasUpdated = (sectionId, section) => ({
	type: UPDATE_SECTION,
	payload: {
		_id: sectionId,
		...section
	}
})

/**
 * Merge the current docValue (Serlo state) with the diff and overwrite current docValue
 *
 * @param {string} sectionId - ID of a section
 * @param {Object} diff - Diff generated by util function buildDiff
 */
export const mergeEditorDiff = (sectionId, diff) => ({state, dispatch}) => {
	const currentSection = state.sections.find(sec => sec._id === sectionId)
	const currentDocValue = currentSection.docValue
	dispatch({
		type: UPDATE_SECTION,
		payload: {
			_id: sectionId,
			docValue: mergeDiff(currentDocValue, diff)
		}
	})
}

/**
 * Removes a section from lesson. Lesson will be soft deleted from backend
 *
 * @param {string} sectionId - MongoId of Section
 */
export const removeSection = (sectionId) => async ({state, dispatch}) => {
	dispatch({
		type: PREPARE_DELETE_SECTION,
		payload: sectionId,
	})


	const index = state.sections.findIndex((section) => section._id === sectionId)
	const newActiveIndex = index === 0 ? index + 1 : index - 1
	const newActiveSectionId = state.sections[newActiveIndex]._id

	dispatch({
		type: SET_ACTIVE_SECTION,
		payload: newActiveSectionId
	})
	try{
		const section = await editorWS.emit('remove', `lesson/${state.lesson._id}/sections`, sectionId)
		dispatch({
			type: DELETE_SECTION,
			payload: section._id,
		})
	} catch (err){
		// TODO: check if connection to sever exist
		dispatch({
			type: DELETING_SECTION_FAILED,
			payload: sectionId
		})
	}
}