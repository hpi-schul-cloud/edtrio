const EDITOR_LESSON_DATA = 'EDITOR_LESSON_DATA'
const EDITOR_SECTION_DATA = 'EDITOR_SECTION_DATA'

export function saveLessonCache(lesson) {
	localStorage.setItem(`${EDITOR_LESSON_DATA}-${lesson._id}`, JSON.stringify(lesson))
}

export function loadLessonCache(lessonId) {
	const lesson = localStorage.getItem(`${EDITOR_LESSON_DATA}-${lessonId}`)
	if (lesson) {
		return JSON.parse(lesson)
	}

	return {}
}

export function saveSectionCache(...sections) {
	sections.forEach((section) => {
		localStorage.setItem(`${EDITOR_SECTION_DATA}-${section._id}`, JSON.stringify(section))
	})
}

export function loadSectionCache(...sectionIds) {
	const unresolvedIds = []
	const sections = []
	sectionIds.forEach(id => {
		const data = localStorage.getItem(`${EDITOR_SECTION_DATA}-${id}`)
		if (data) {
			sections.push(JSON.parse(data))
		} else {
			unresolvedIds.push(id)
		}
	})

	return [sections, unresolvedIds]
}
