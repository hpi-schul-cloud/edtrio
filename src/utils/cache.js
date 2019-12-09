const lesson = 'EDITOR_LESSON_DATA';
const section = 'EDITOR_SECTION_DATA';

const storeNames = [lesson, section];
const isValidCache = (name) => {
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

export const saveDataToCache = name => (data) => {
	localStorage.setItem(isValidCache(name)+getSuffixFromData(data), JSON.stringify(data))
}

export const loadDataFromCache = name => (id) => {
	return JSON.parse(localStorage.getItem(isValidCache(name)+getSuffixFromId(id)) || {});
}

export const batchLoadDataFromCache = name => (...ids) => {
	return ids.map(id => loadDataFromStore(name)(id))
}

export const batchSaveDataFromCache = name => (...datas) => {
	return datas.forEach(data => saveDataToStore(name)(data))
}

export const saveLessonCache = saveDataToCache(lesson)
export const loadLessonCache = loadDataFromCache(lesson)
export const saveSectionCache = batchSaveDataFromCache(section)
export const loadSectionCache = batchLoadDataFromCache(section)