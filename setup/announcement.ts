import { faker } from '@faker-js/faker';
import { AnnouncementModel } from '../models/announcement';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const ANNOUNCEMENT_COUNT = 20;
export const migrateAnnouncements = async (devId: string) => {
  const announcements: Array<Promise<any>> = [];
  for (let i = 0; i < ANNOUNCEMENT_COUNT; i++) {
    const newAnnouncement = new AnnouncementModel({
      title: faker.lorem.lines({ max: 1, min: 1 }),
      description: faker.lorem.lines({ min: 5, max: 50 }),
      createdBy: new mongoose.Types.ObjectId(devId),
    });
    announcements.push(newAnnouncement.save());
  }
  const ans = await Promise.all(announcements);
  logger.info('Announcements Created');
  return ans.map((t) => t._id);
};
