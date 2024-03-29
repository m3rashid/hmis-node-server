import cron from 'node-cron';
import mongoose from 'mongoose';
import { LeaveModel } from '../models/leave';
import { logger } from '../../../utils/logger';
import { RoleModel } from '../../role/models/role';
import { UserModel } from '../../user/models/user';

const leaveJob = async () => {
  const role = await RoleModel.findOne({ name: 'SUPER_ADMIN' });
  const devUser = await UserModel.findOne({
    role: new mongoose.Types.ObjectId(role?._id),
  });

  await LeaveModel.updateMany(
    {
      endDate: { $lt: new Date() },
      status: { $or: ['PENDING', 'ACCEPTED', 'REJECTED'] },
    },
    {
      $set: {
        status: 'ENDED',
        lastUpdatedBy: new mongoose.Types.ObjectId(devUser?._id),
      },
    }
  );
};

cron.schedule('* * 0 * * *', () => {
  logger.info('Leave Job started');
  leaveJob()
    .then(() => logger.info('Leave Job completed'))
    .catch(console.log);
});
