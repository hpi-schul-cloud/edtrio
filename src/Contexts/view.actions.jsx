export const SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION"
export const SET_EDITING = "SET_EDITING"
export const SET_LOADING = "SET_LOADING"
export const TOGGLE_SECTION_OVERVIEW = "TOGGEL_SECTION_OVERVIEW"
export const TOGGLE_SECTION_SETTINGS = "TOGGLE_SECTION_SETTINGS"


export const setActiveSection = (sectionId) => ({
	type: SET_ACTIVE_SECTION,
	payload: sectionId
})


/**
 * Set section editing mode
 *
 * @param {boolean} editing - activate or deactivate editing mode
 */
export const setEditing = (editing) => ({
	type: SET_EDITING,
	payload: editing
})

export const startLoading = () => ({
	type: SET_LOADING,
	payload: true
})

export const finishLoading = () => ({
	type: SET_LOADING,
	payload: false
})

/**
 * Set the visibility of the section overview
 * @param {boolean} show - should be visible?
 */
export const showSectionOverview = (show = true) => ({
	type: TOGGLE_SECTION_OVERVIEW,
	payload: show
})

export const toggleSectionOverview = () => ({state, dispatch}) =>
	dispatch({
		type: TOGGLE_SECTION_OVERVIEW,
		payload: !state.view.sectionOverviewExpanded
	})

/**
 * Set the visibility of the section settings
 * @param {boolean} show - should be visible?
 */
export const showSectionSettings= (show = true) => ({
	type: TOGGLE_SECTION_SETTINGS,
	payload: show
})

export const toggleSectionSettings = () => ({state, dispatch}) =>
	dispatch({
		type: TOGGLE_SECTION_SETTINGS,
		payload: !state.view.showSectionSettings
	})
