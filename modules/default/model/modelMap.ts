import { AppointmentModel } from 'modules/appointment'
import { UserModel } from 'modules/auth'
import { AttendanceModel, AvailabilityModel, LeaveModel } from 'modules/availability'
import { ConsumableModel, NonConsumableModel } from 'modules/inventory'
import { NotificationModel } from 'modules/notification'
import { PrescriptionModel } from 'modules/prescription'
import { AddressModel, ProfileModel } from 'modules/profile'
import { RoleModel } from 'modules/role'

export const models = {
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
} as const
