export const SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION"
export const SET_EDITING = "SET_EDITING"
export const TOGGLE_SECTION_OVERVIEW = "TOGGEL_SECTION_OVERVIEW"
export const TOGGLE_SECTION_SETTINGS = "TOGGLE_SECTION_SETTINGS"


export const setActiveSection = (sectionId) => ({
	type: SET_ACTIVE_SECTION,
	payload: sectionId
})


/**
 *
 *
 * @param {boolean} editing - activate or deactivate editing mode
 */
export const setEditing = (editing) => ({
	type: SET_EDITING,
	payload: editing
})

export const showSectionOverview = () => ({
	type: TOGGLE_SECTION_OVERVIEW,
	payload: true
})

export const hiddeSectionOverview = () => ({
	type: TOGGLE_SECTION_OVERVIEW,
	payload: false
})

export const toggleSectionOverview = () => ({state, dispatch}) =>
	dispatch({
		type: TOGGLE_SECTION_OVERVIEW,
		payload: !state.view.sectionOverviewExpanded
	})

export const showSectionSettings= () => ({
	type: TOGGLE_SECTION_SETTINGS,
	payload: true
})

export const hiddeSectionSettings = () => ({
	type: TOGGLE_SECTION_SETTINGS,
	payload: false
})

export const toggleSectionSettings = () => ({state, dispatch}) =>
	dispatch({
		type: TOGGLE_SECTION_SETTINGS,
		payload: !state.view.showSectionSettings
	})
