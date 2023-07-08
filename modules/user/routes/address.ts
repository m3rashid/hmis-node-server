import { Router } from 'express';
import Edit from '../../default/edit';
import Create from '../../default/create';
import type { MODELS } from '@hmis/gatekeeper';
import { AddressModel } from '../models/address';
import { checkAuth } from '../../../middlewares/auth';
import { ERRORS, Validator, addressValidator } from '@hmis/gatekeeper';

const addressRouter: Router = Router();
const useRoute = ERRORS.useRoute;

addressRouter.post(
  '/add',
  checkAuth,
  Validator.validate(addressValidator.createAddressSchema),
  useRoute(Create<MODELS.IAddress>(AddressModel, {}))
);
addressRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(addressValidator.updateAddressSchema),
  useRoute(Edit<MODELS.IAddress>(AddressModel, {}))
);

export default addressRouter;
