
export const bindAllSettledToPromise = () => {
	if(typeof Promise.allSettled !== 'function'){

		Promise.allSettled =  (proms) => Promise.all(proms.map((prom) =>
			prom.then(
				value => ({value, status: 'fulfilled'}),
				error => ({reason: error, status: 'rejected'})
			)))
	}

	return Promise.allSettled
}