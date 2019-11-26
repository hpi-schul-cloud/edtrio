const EDITOR_LESSON_DATA = 'EDITOR_LESSON_DATA'
const EDITOR_SECTION_DATA = 'EDITOR_SECTION_DATA'

export function saveLessonData(lesson) {
    localStorage.setItem(`${EDITOR_LESSON_DATA}-${lesson._id}`, JSON.stringify(lesson))
}

export function loadLessonData(lessonId) {
    const lesson = localStorage.getItem(`${EDITOR_LESSON_DATA}-${lessonId}`)
    if (lesson) {
        return JSON.parse(lesson)
    }

    return {}
}

export function saveSectionData(...sections) {
    sections.forEach((section) => {
        localStorage.setItem(`${EDITOR_SECTION_DATA}-${section._id}`, JSON.stringify(section))
    })
}

export function loadSectionData(...sectionIds) {
    const sections = sectionIds.map(id => {
        const data = localStorage.getItem("EDITOR_DATA-" + id)
        if (data) {
            return JSON.parse(data)
        }
    })

    return sections
}

export function saveEditorData(data, lessonId) {
    localStorage.setItem("EDITOR_DATA-" + lessonId, JSON.stringify(data))
}

export function loadEditorData(lessonId) {
    const savedData = localStorage.getItem("EDITOR_DATA-" + lessonId)
    if (savedData) {
        return JSON.parse(savedData)
    }

    return {}
}
