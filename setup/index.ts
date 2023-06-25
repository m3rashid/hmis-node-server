import {
  createDevUser,
  updateDevUser,
  createExternalUsers,
  createInternalUsers,
} from './auth';
import { migrateInventory } from './inventory';
import { migrateAdminRoles } from './role';
import { migrateSpecialRoles } from './role/specialRoles';
import { migrateAnnouncements } from './announcement';
import { createAddress } from './address';
import { migrateProfiles } from './profile';

const consumableIds: Array<string> = [];
const nonConsumableIds: Array<string> = [];
const announcementIds: Array<string> = [];
const addressIds: Array<string> = [];
const appointmentIds: Array<string> = [];
const availabilityIds: Array<string> = [];
const ipdIds: Array<string> = [];
const opdIds: Array<string> = [];
const paymentIds: Array<string> = [];
const testIds: Array<string> = [];
const roles: Array<{ name: string; _id: string }> = [];
const internalUsers: Array<{ role: string; _id: string }> = [];
const patientIds: Array<string> = [];

const initialDbMigration = async () => {
  const devUserId = await createDevUser();
  const adminRoles = await migrateAdminRoles(devUserId);
  adminRoles.map((t) => roles.push(t));

  const otherRoles = await migrateSpecialRoles(devUserId);
  otherRoles.map((t) => roles.push(t));

  // TODO: make multiple doctors
  // TODO: create doctor availability
  // TODO: create doctor profile
  // TODO: create tests

  const users = await createInternalUsers(devUserId);
  users.map((t) => internalUsers.push(t));
  await updateDevUser(devUserId);

  const { consumables, nonConsumables } = await migrateInventory(devUserId);
  consumables.map((t) => consumableIds.push(t));
  nonConsumables.map((t) => nonConsumableIds.push(t));

  const announcements = await migrateAnnouncements(devUserId);
  announcements.map((t) => announcementIds.push(t));

  const externalUsers = await createExternalUsers(devUserId);
  externalUsers.map((t) => patientIds.push(t));

  const addresses = await createAddress(patientIds);
  addresses.map((t) => addressIds.push(t));

  await migrateProfiles(patientIds, addressIds);

  // TODO: create payments
  // TODO: create appointments
  // TODO: create Prescriptions

  // TODO: create OPD from appointments
  // TODO: create IPD from appointments/OPD
	// TODO: create doctor leaves
};

export default initialDbMigration;
