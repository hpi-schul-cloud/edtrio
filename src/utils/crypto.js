import { sha1 } from 'object-hash'

export const generateHash = (data) => {
	return sha1(data)
}