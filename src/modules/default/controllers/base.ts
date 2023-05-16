import type { IRole } from 'modules/role'

export interface PartialUser {
	_id: string
	name: string
	email: string
	roles: IRole[]
}
