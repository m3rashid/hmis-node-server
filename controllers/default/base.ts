import type { IRole } from 'models/role'

export interface PartialUser {
	_id: string
	name: string
	email: string
	roles: IRole[]
}
