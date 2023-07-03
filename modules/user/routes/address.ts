import { Router } from 'express';
import { checkAuth } from '../../../middlewares/auth';
import { addAddress, updateAddress } from '../controllers/address';
import { ERRORS, Validator, addressValidator } from '@hmis/gatekeeper';

const addressRouter: Router = Router();
const useRoute = ERRORS.useRoute;

addressRouter.post(
  '/add',
  checkAuth,
  Validator.validate(addressValidator.createAddressSchema),
  useRoute(addAddress)
);
addressRouter.post(
  '/edit',
  checkAuth,
  Validator.validate(addressValidator.updateAddressSchema),
  useRoute(updateAddress)
);

export default addressRouter;
