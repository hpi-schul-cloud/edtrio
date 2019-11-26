import SHA1 from 'crypto-js/SHA1'


export const generateHash = (data) => {
	return SHA1(data)
}