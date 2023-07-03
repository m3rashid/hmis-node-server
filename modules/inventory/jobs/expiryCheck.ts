import cron from 'node-cron';
import mongoose from 'mongoose';
import { logger } from '../../../utils/logger';
import { UserModel } from '../../user/models/user';
import { RoleModel } from '../../role/models/role';
import { ConsumableModel } from '../models/consumable';
import { NonConsumableModel } from '../models/nonConsumable';

const expiryCheckOnInventoryJob = async () => {
	const role = await RoleModel.findOne({ name: 'SUPER_ADMIN' });
  const devUser = await UserModel.findOne({
    role: new mongoose.Types.ObjectId(role?._id),
  });

  const consumables = await ConsumableModel.updateMany(
    { expiryDate: { $lt: new Date() } },
    {
      $set: {
        deleted: true,
        lastUpdatedBy: new mongoose.Types.ObjectId(devUser?._id),
      },
    }
  );

  const nonConsumables = await NonConsumableModel.updateMany(
    { nextServicingDate: { $lt: new Date() } },
    {
      $set: {
        deleted: true,
        lastUpdatedBy: new mongoose.Types.ObjectId(devUser?._id),
      },
    }
  );

  // TODO: send mail to the admin with the list of items that are expiring
  await Promise.all([consumables, nonConsumables]);
};

cron.schedule('* * 0 * * *', () => {
  logger.info('Expiry Check Job started');
  expiryCheckOnInventoryJob()
    .then(() => logger.info('Expiry Check Job completed'))
    .catch(console.log);
});
