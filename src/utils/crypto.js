import { sha1 } from 'object-hash'

export const generateHash = (data) => {
	// TODO: replace with blake2, it's faster and right now not broken
	return sha1(data)
}