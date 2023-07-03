import { AnnouncementModel } from '../models/announcement';

export interface CreateAnnouncement {
  title: string;
  description: string;
  createdBy: string;
}
export const createAnnouncement = async ({
  createdBy,
  description,
  title,
}: CreateAnnouncement) => {
  const announcement = new AnnouncementModel({ title, description, createdBy });
  const newAnnouncement = await announcement.save();
  return newAnnouncement;
};
