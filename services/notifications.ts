import { NotificationModel } from "../models/notification";

export const createNotification = async () => {
	const notification = new NotificationModel({
    // title: req.body.title,
    // description: req.body.description,
  });
  const newNotification = await notification.save();
	return newNotification;
}