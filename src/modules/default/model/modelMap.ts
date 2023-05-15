import AppointmentModel from 'modules/appointment/models/appointment'
import UserModel from 'modules/auth/models/user'
import AttendanceModel from 'modules/availability/models/attendance'
import AvailabilityModel from 'modules/availability/models/availability'
import LeaveModel from 'modules/availability/models/leave'
import ConsumableModel from 'modules/inventory/models/consumable'
import NonConsumableModel from 'modules/inventory/models/nonConsumables'
import NotificationModel from 'modules/notification/models/notifications'
import PrescriptionModel from 'modules/prescription/models/prescription'
import AddressModel from 'modules/profile/models/address'
import ProfileModel from 'modules/profile/models/profile'
import RoleModel from 'modules/role/models/role'

import type { IDbSchemaKeys, ModelSchemas, PaginateModel } from '.'

export const models: Record<IDbSchemaKeys, PaginateModel<ModelSchemas[IDbSchemaKeys]>> = {
	address: AddressModel,
	appointment: AppointmentModel,
	availability: AvailabilityModel,
	consumable: ConsumableModel,
	leave: LeaveModel,
	nonConsumable: NonConsumableModel,
	prescription: PrescriptionModel,
	profile: ProfileModel,
	role: RoleModel,
	user: UserModel,
	attendance: AttendanceModel,
	notification: NotificationModel
}
