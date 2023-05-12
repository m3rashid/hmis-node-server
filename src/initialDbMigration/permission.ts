import { PERMISSION } from 'handlers/role/helpers'
import PermissionModel from 'models/permission'
import mongoose from 'mongoose'
import { toSentenceCase } from 'utils/strings'

type IPermissionArray = Array<{
	name: string
	description: string
	resourceType: string
	scope: string
	permission: number
}>

export const defaultSelfPermissions: IPermissionArray = [
	{
		name: 'R_U_D_BU_PERM_SELF',
		description: 'Read, Update, Delete and Bulk Update permissions to all Self Created resources',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: PERMISSION.READ + PERMISSION.UPDATE + PERMISSION.DELETE + PERMISSION.BULK_UPDATE
	},
	{
		name: 'R_PERM_SELF',
		description: 'Only Read permissions to all Self Created resources',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: PERMISSION.READ
	},
	{
		name: 'U_PERM_SELF',
		description: 'Only Update permissions to all Self Created resources',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: PERMISSION.UPDATE
	},
	{
		name: 'D_PERM_SELF',
		description: 'Only Delete permissions to all Self Created resources',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: PERMISSION.DELETE
	},
	{
		name: 'BU_PERM_SELF',
		description: 'Read, Update, Delete and Bulk Update permissions to all Self Created resources',
		resourceType: 'ALL',
		scope: 'SELF',
		permission: PERMISSION.BULK_UPDATE
	}
]

export const adminPermissions: IPermissionArray = [
	{
		name: 'READ_ALL',
		description: 'Read Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: PERMISSION.READ
	},
	{
		name: 'CREATE_ALL',
		description: 'Create Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: PERMISSION.CREATE
	},
	{
		name: 'UPDATE_ALL',
		description: 'Update Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: PERMISSION.UPDATE
	},
	{
		name: 'DELETE_ALL',
		description: 'Delete Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: PERMISSION.DELETE
	},
	{
		name: 'BULK_UPDATE_ALL',
		description: 'Bulk Update Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: PERMISSION.BULK_UPDATE
	},
	{
		name: 'BULK_DELETE_ALL',
		description: 'Bulk Delete Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission: PERMISSION.BULK_DELETE
	},
	{
		name: 'ALL_ADMIN_ALL',
		description: 'All Access to do everything on every resource',
		resourceType: 'ALL',
		scope: 'ALL',
		permission:
			PERMISSION.READ +
			PERMISSION.CREATE +
			PERMISSION.UPDATE +
			PERMISSION.DELETE +
			PERMISSION.BULK_UPDATE +
			PERMISSION.BULK_DELETE
	}
]

export const developerPermissions: IPermissionArray = []

export const defaultPatientPermissions: IPermissionArray = []

export const defaultDoctorPermissions: IPermissionArray = []

export const defaultNursePermissions: IPermissionArray = []

export const defaultPharmacistPermissions: IPermissionArray = []

export const defaultLabTechnicianPermissions: IPermissionArray = []

export const defaultReceptionistPermissions: IPermissionArray = []

export const defaultAccountantPermissions: IPermissionArray = []

export const defaultInventoryManagerPermissions: IPermissionArray = []

const migratePermissions = async (devId: string) => {
	const promises: Array<Promise<any>> = []
	const allPermissions: IPermissionArray = [
		...defaultSelfPermissions,
		...adminPermissions,
		...developerPermissions,
		...defaultPatientPermissions,
		...defaultDoctorPermissions,
		...defaultNursePermissions,
		...defaultPharmacistPermissions,
		...defaultLabTechnicianPermissions,
		...defaultReceptionistPermissions,
		...defaultAccountantPermissions,
		...defaultInventoryManagerPermissions
	]

	allPermissions.forEach(perm => {
		const p = new PermissionModel({
			actualName: perm.name,
			displayName: toSentenceCase(perm.name),
			description: perm.description,
			resourceType: perm.resourceType,
			scope: perm.scope,
			permission: perm.permission,
			createdBy: new mongoose.Types.ObjectId(devId),
			lastUpdatedBy: new mongoose.Types.ObjectId(devId)
		})
		promises.push(p.save())
	})
	await Promise.all(promises)
}

export default migratePermissions
