const EDITOR_LESSON_DATA = 'EDITOR_LESSON_DATA'
const EDITOR_SECTION_DATA = 'EDITOR_SECTION_DATA'

export function saveLessonCache(lesson) {
	try {
		localStorage.setItem(
			`${EDITOR_LESSON_DATA}-${lesson._id}`,
			JSON.stringify({
				...lesson,
				change: Array.from(lesson.chnaged || [])
			}))
	}catch (err) {
		console.error(err)
	}
}

export function loadLessonCache(lessonId) {
	try {
		const lesson = localStorage.getItem(`${EDITOR_LESSON_DATA}-${lessonId}`)
		if (lesson) {
			const cached = JSON.parse(lesson)
			return {
				...cached,
				changed: cached.changed ? new Set(cached.changed) : new Set(),
			}
		}
	} catch (err) {
		console.error(err)
	}

	return {}
}

export function saveSectionCache(...sections) {
	sections.forEach((section) => {
		try {
			localStorage.setItem(
				`${EDITOR_SECTION_DATA}-${section._id}`,
				JSON.stringify({
					...section,
					changed: Array.from(section.changed || [])
				}))
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
				const cached = JSON.parse(data)
				sections.push({
					...cached,
					changed:  cached.changed ? new Set(cached.changed) : new Set(),
				})
			} else {
				unresolvedIds.push(id)
			}
		} catch (err) {
			console.error(err)
		}
	})

	return [sections, unresolvedIds]
}
