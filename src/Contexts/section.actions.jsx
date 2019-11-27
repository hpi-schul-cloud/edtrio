import { editorWS } from "~/utils/socket"
import { mergeDiff, buildDiff } from '~/utils/diff'
import uuid from "uuid/v4"
import { saveSectionData } from "~/utils/cache"
import { generateHash } from "~/utils/crypto"

export const SET_SECTIONS = 'SET_SECTIONS'
export const ADD_SECTION = 'ADD_SECTION'
export const REPLACE_ADDED_SECTION_ID = "REPLACE_ADDED_SECTION_ID"
export const SWITCH_SECTION_VISIBILTY = 'SWITCH_SECTION_VISIBILTY'
export const PREPARE_DELETE_SECTION = 'PREPARE_DELETE_SECTION'
export const DELETE_SECTION = 'DELETE_SECTION'
export const DELETING_SECTION_FAILED = 'DELETING_SECTION_FAILED'
export const UPDATE_SECTION = 'UPDATE_SECTION'
export const SECTION_DOCVALUE_CHANGE = 'SECTION_DOCVALUE_CHANGE'
export const SAVING_DOCVALUES = 'SAVING_DOCVALUE'
export const SAVING_DOCVALUE_FAILED = 'SAVING_DOCVALUE_FAILED'
export const DOCVALUE_SAVED = 'DOCVALUE_SAVED'
export const SAVING_SECTIONS = 'SAVING_SECTION'
export const SAVING_SECTION_FAILED = 'SAVING_SECTION_FAILED'
export const SECTION_SAVED = 'SECTION_SAVED'

export const switchSectionVisibility = (sectionId) => ({state}) => ({
	type: SWITCH_SECTION_VISIBILTY,
	payload: sectionId
})

export const setSections = (sections) => ({
	type: SET_SECTIONS,
	payload: sections
})


/**
 * Creates a new Sections and persist it on the backend
 *
 * @param {int} position - positon of section
 */
export const createSection = (position) => async ({dispatch, state}) => {
	const tempId = uuid()
	const {lesson} = state
	position = position || state.sections.length
	dispatch({
		type: ADD_SECTION,
		payload: {
			tempId,
			position
		},
	})

	const section = await editorWS.emit('create', `lesson/${lesson._id}/sections`, {position})

	dispatch({
		type: REPLACE_ADDED_SECTION_ID,
		payload: {
			tempId,
			backendId: section._id,
		},
	})


}

const createDiffAndSendToBackend = (lessonId, section) => {

	const sectionDiff = buildDiff(
		section.savedDocValue,
		section.docValue,
	)

	return editorWS
		.emit(
			'patch',
			`lesson/${lessonId}/sections/diff`,
			section._id,
			{state: sectionDiff},
		)
}

const saveSectionDocValue = ({ignoreChangedSet = -1}) => async ({dispatch, state}) => {

	dispatch({
		type: SAVING_DOCVALUES
	})

	let proms = []
	let sections = []
	const hashes = []

	if(ignoreChangedSet === -1){
		proms = state.sections.reduce((acc, section) => {
			if(section.changed.has('docValue')){
				sections.push(section)
				acc.push(createDiffAndSendToBackend(state.lesson._id, section))
				hashes.push(generateHash(section.docValue))
			}
		}, [])
	}else {
		const section = state.sections[ignoreChangedSet]
		sections = [section]
		proms.push(createDiffAndSendToBackend(state.lesson._id, section))
		hashes.push(generateHash(section.docValue))
	}

	const resolved = await Promise.allSettled(proms)

	resolved.forEach((res, i) => {
		const sectionId = sections[i]._id
		if(res.status === 'fulfilled'){
			dispatch({
				type: DOCVALUE_SAVED,
				payload: sectionId
			})
		} else {
			dispatch({
				type: SAVING_DOCVALUE_FAILED,
				payload: sectionId
			})
		}
	})

	resolved.forEach((res, i) => {
		// keep care of adding or removing something, ...section is to generate hash and it should include
		// everything witch is part of section, compared to database
		const {changed, ...section} = sections[i]
		const sectionId = section._id
		if(res.status === 'fulfilled'){
			dispatch({
				type: DOCVALUE_SAVED,
				payload: sectionId
			})
			saveSectionData({
				...section,
				timestamp: res.value.updatedAt || res.value.instertedAt,
				docHash: hashes[i],
				savedToBackend: true
			})
		} else {
			dispatch({
				type: SAVING_DOCVALUE_FAILED,
				payload: sectionId
			})
			saveSectionData({
				section,
				docHash: hashes[i],
				savedToBackend: false
			})
		}
	})
}

export const saveSections = () => async ({dispatch, state}) => {

	dispatch({
		type: SAVING_SECTIONS
	})

	const { sections, lesson } = state

	const hashes = []
	// keep care of adding or removing something, ...section is to generate hash and it should include
	// everything witch is part of section, compared to database
	const proms = sections.map(({changed, hash, timestamp, ...section}, index) => {
		const changes = {}

		if(changed.has('docValue')){
			// docValue is removed from changed Set to not filter it afterwards
			// saveSectionDocValue, should not check it, but set it again if it failed
			changed.delete('docValue')
			dispatch(saveSectionDocValue({ignoreChangedSet: index}))
		}

		if(changed.size === 0) return Promise.resolve()

		changed.forEach(key => {
			if(section.hasOwnPropertie(key)){
				changes[key] = section[key]
			}
		})

		const prom = editorWS.emit(
			'patch',
			`lesson/${lesson._id}/sections`,
			section._id,
			changes
		)

		// meaby a hash should be part of the server request, but not implemented write now
		hashes[index] = generateHash(section)

		return prom
	})

	const resolved = await Promise.allSettled(proms)

	resolved.forEach((res, i) => {
		// keep care of adding or removing something, ...section is to generate hash and it should include
		// everything witch is part of section, compared to database
		const {changed, ...section} = sections[i]
		const sectionId = section._id
		if(res.status === 'fulfilled'){
			dispatch({
				type: SECTION_SAVED,
				payload: sectionId
			})
			saveSectionData({
				...section,
				timestamp: res.value.updatedAt || res.value.instertedAt,
				hash: hashes[i],
				savedToBackend: true
			})
		} else {
			dispatch({
				type: SAVING_SECTION_FAILED,
				payload: sectionId
			})
			saveSectionData({
				section,
				hash: hashes[i],
				savedToBackend: false
			})
		}
	})


}

export const updateSectionDocValue = (sectionId, docValue) => ({
	type: SECTION_DOCVALUE_CHANGE,
	payload: {
		_id: sectionId,
		docValue
	}
})

export const sectionWasUpdated = (sectionId, section) => ({
	type: UPDATE_SECTION,
	_id: sectionId,
	...section
})

export const mergeSerloDiff = (sectionId, diff) => ({state, dispatch}) => {
	const currentDocValue = state.sections.find(sec => sec._id === sectionId)
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
	try{

		const section = await editorWS.emit('delete', `lesson/${state.lesson._id}/sections/${sectionId}`)

		dispatch({
			type: DELETE_SECTION,
			payload: sectionId,
		})
	} catch (err){
		// TODO: check if connection to sever exist
		dispatch({
			type: DELETING_SECTION_FAILED,
			payload: sectionId
		})
	}
}