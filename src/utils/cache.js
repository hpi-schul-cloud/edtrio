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
