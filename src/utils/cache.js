const EDITOR_LESSON_DATA = 'EDITOR_LESSON_DATA'
const EDITOR_SECTION_DATA = 'EDITOR_SECTION_DATA'

export function saveLessonCache(lesson) {
	try {
		localStorage.setItem(`${EDITOR_LESSON_DATA}-${lesson._id}`, JSON.stringify(lesson))
	}catch (err) {
		console.error(err)
	}
}

export function loadLessonCache(lessonId) {
	try {
		const lesson = localStorage.getItem(`${EDITOR_LESSON_DATA}-${lessonId}`)
		if (lesson) {
			return JSON.parse(lesson)
		}
	} catch (err) {
		console.error(err)
	}

	return {}
}

export function saveSectionCache(...sections) {
	sections.forEach((section) => {
		try {
			localStorage.setItem(`${EDITOR_SECTION_DATA}-${section._id}`, JSON.stringify(section))
		} catch(err) {
			console.error(err)
		}
	})
}

export function loadSectionCache(...sectionIds) {
	const unresolvedIds = []
	const sections = []

	sectionIds.forEach(id => {
		try{
			const data = localStorage.getItem(`${EDITOR_SECTION_DATA}-${id}`)
			if (data) {
				sections.push(JSON.parse(data))
			} else {
				unresolvedIds.push(id)
			}
		} catch (err) {
			console.error(err)	
		}
	})

	return [sections, unresolvedIds]
}
