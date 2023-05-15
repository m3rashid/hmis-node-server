export const toSentenceCase = (text: string, split?: string) => {
	return text
		.split(split ?? '_')
		.reduce<string[]>((acc, str) => {
			if (str.length > 0) {
				return [...acc, str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)]
			}
			return [...acc]
		}, [])
		.join(' ')
}
