import { Router } from 'express';
import Edit from '../../default/edit';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { AddressModel } from '../models/address';
import { checkAuth } from '../../../middlewares/auth';
import { Validator, addressValidator } from '@hmis/gatekeeper';

const addressRouter: Router = Router();

addressRouter.post(
  '/add',
  checkAuth,
  Validator.validate(addressValidator.createAddressSchema),
  Create<MODELS.IAddress>(AddressModel, {})
);

addressRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(addressValidator.updateAddressSchema),
  Edit<MODELS.IAddress>(AddressModel, {})
);

export default addressRouter;
