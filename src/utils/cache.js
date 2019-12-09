const lesson = 'EDITOR_LESSON_DATA';
const section = 'EDITOR_SECTION_DATA';

const storeNames = [lesson, section];
const isValidStore = (name) => {
	if(!storeNames.includes(name)) {
		console.error('[cache] Is not valid storename', { name })
	}
	return name;
}

const suffix = '-';
const getSuffixFromData = (data) => {
	const { _id } = data;
	if (!_id) {
		console.error('[cache] Can not extract _id from data.')
	}
	return suffix+_id;
}

const getSuffixFromId = (id) => {
	return suffix+id;
}

export const saveDataToStore = name => (data) => {
	localStorage.setItem(isValidStore(name)+getSuffixFromData(data), JSON.stringify(data))
}

export const loadDataFromStore = name => (id) => {
	return JSON.parse(localStorage.getItem(isValidStore(name)+getSuffixFromId(id)) || {});
}

export const batchLoadDataFromStore = name => (...ids) => {
	return ids.map(id => loadDataFromStore(name)(id))
}

export const batchSaveDataFromStore = name => (...datas) => {
	return datas.forEach(data => saveDataToStore(name)(data))
}

export const saveLessonCache = saveDataToStore(lesson)
export const loadLessonCache = loadDataFromStore(lesson)
export const saveSectionCache = saveDataToStore(section)
export const loadSectionCache = loadDataFromStore(section)