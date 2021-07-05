import { sha1 } from 'object-hash'

export const generateHash = (data) => {
	// TODO: replace with blake2, it's faster and right now not broken
	return sha1(data)
}

export const generateLessonHash = ({position, courseId, sections, title, meta}) => {
	return generateHash({
		position,
		courseId,
		sections,
		title,
		meta
	})
}

export const generateSessionHash = ({title, docValue, meta}) => {
	return generateHash({
		title,
		docValue,
		meta
	})
}