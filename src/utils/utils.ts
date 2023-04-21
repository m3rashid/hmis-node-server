export const wait = async (ms?: number) => {
	const wait = new Promise(resolve => setTimeout(resolve, ms ?? 2000))
	await wait
}
