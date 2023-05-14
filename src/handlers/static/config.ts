import type { Request, Response } from 'express'

export const appConfig = {
	app: {
		name: 'HMIS',
		version: '1.0.0',
		fullName: 'Health Management and Informatics System'
	},
	appColors: {
		primary: '#00BDC1',
		primaryHover: '#E6FFFB',
		secondary: '#484C56'
	},
	colors: {
		success: '#22C55E',
		warning: '#F59E0B',
		danger: '#F43F5E',
		info: '#0EA5E9'
	}
} as const

export const getConfig = async (req: Request, res: Response) => {
	return res.status(200).json(appConfig)
}
