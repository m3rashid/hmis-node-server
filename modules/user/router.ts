import {
  ERRORS,
  Validator,
  authValidator,
  addressValidator,
  availabilityValidator,
  convertPermissionToReadable,
} from '@hmis/gatekeeper';
import {
  login,
  resetPassword,
  updatePassword,
  forgotPassword,
} from './controllers/auth';
import {
  doctorsSearch,
  patientSearch,
  getDoctorAvailability,
} from './controllers/search';
import { Router } from 'express';
import Get from '../default/get';
import Edit from '../default/edit';
import List from '../default/list';
import Create from '../default/create';
import Delete from '../default/delete';
import { UserModel } from './models/user';
import type { MODELS } from '@hmis/gatekeeper';
import { hashPassword } from './helpers/bcrypt';
import { AddressModel } from './models/address';
import { ProfileModel } from './models/profile';
import type { Request, Response } from 'express';
import { checkAuth } from '../../middlewares/auth';
import { issueJWT, revalidateJWT } from './helpers/jwt';
import { AvailabilityModel } from './models/availability';
import Search from '../default/search';

const userRouter = Router();
const useRoute = ERRORS.useRoute;

userRouter.post(
  '/address/add',
  checkAuth,
  Validator.validate(addressValidator.createAddressSchema),
  Create<MODELS.IAddress>(AddressModel, {})
);

userRouter.post(
  '/address/edit',
  checkAuth,
  Validator.validate(addressValidator.updateAddressSchema),
  Edit<MODELS.IAddress>(AddressModel, {})
);

userRouter.post(
  '/auth/login',
  Validator.validate(authValidator.loginSchema),
  useRoute(login)
);

userRouter.post(
  '/auth/logout',
  useRoute(async (req: Request, res: Response) => {
    return res.sendStatus(200);
  })
);

userRouter.post(
  '/auth/revalidate',
  Get<MODELS.IUser>(UserModel, {
    requireAuth: false,
    populate: ['role', 'profile'],
    reqTransformer: async (req) => {
      const rfToken = req.headers.authorization;
      if (!rfToken) throw ERRORS.newError('No Token Provided');

      const { valid, expired, payload } = revalidateJWT(rfToken);
      if (!valid || expired) throw ERRORS.newError('Unauthorized');

      const userId = (payload?.sub as any)?._id;
      if (!userId) throw ERRORS.newError('No user found');
      req.user = { ...(req.user || {}), _id: userId };
      return req;
    },
    filterQueryTransformer: async ({ user }) => ({ _id: user._id }),
    serializer: async ({ data }) => {
      if (!data) throw ERRORS.newError('User not found');
      const { accessToken, refreshToken } = issueJWT(data);
      return { user: data, accessToken, refreshToken } as any;
    },
  })
);

userRouter.post(
  '/auth/forgot-password',
  Validator.validate(authValidator.forgotPasswordSchema),
  useRoute(forgotPassword)
);

userRouter.post(
  '/auth/update-password',
  // Validator.validate(authValidator.forgotPasswordSchema),
  useRoute(updatePassword)
);

userRouter.post(
  '/auth/reset-password',
  Validator.validate(authValidator.resetPasswordSchema),
  useRoute(resetPassword)
);

userRouter.post(
  '/patient/signup-init',
  Validator.validate(authValidator.patientSignupInitSchema),
  useRoute(async (req: Request, res: Response) => {
    res.status(200).json('Patient Signup Init');
  })
);

userRouter.post(
  '/patient/signup-two',
  Validator.validate(authValidator.patientSignupTwoSchema),
  useRoute(async (req: Request, res: Response) => {
    res.status(200).json('Patient Signup Two');
  })
);

userRouter.post(
  '/patient/signup-final',
  Validator.validate(authValidator.patientSignupFinalSchema),
  useRoute(async (req: Request, res: Response) => {
    res.status(200).json('Patient Signup Final');
  })
);

userRouter.post(
  '/patient/all',
  checkAuth,
  useRoute(List<MODELS.IUser>(UserModel, {}))
);

userRouter.post('/user/all', checkAuth, List<MODELS.IUser>(UserModel, {}));

userRouter.post('/user/search', checkAuth, Search<MODELS.IUser>(UserModel, {}));

userRouter.post('/user/remove', checkAuth, Delete<MODELS.IUser>(UserModel, {}));

userRouter.post(
  '/user/recover',
  checkAuth,
  Delete<MODELS.IUser>(UserModel, { recover: true })
);

userRouter.get(
  '/user/me',
  checkAuth,
  Get<MODELS.IUser>(UserModel, {
    filterQueryTransformer: async ({ user }) => ({ _id: user._id }),
  })
);

userRouter.get(
  '/user/me-details',
  checkAuth,
  useRoute(async (req: Request, res: Response) => {
    if (!req.user) throw ERRORS.newError('User not found');
    const user = await UserModel.findById(req.user._id)
      .populate({ path: 'profile', populate: ['addresses', 'availabilities'] })
      .populate('role')
      .lean();

    const transformedUser = {
      ...user,
      role: {
        ...user?.role,
        permissions: convertPermissionToReadable(
          JSON.parse(JSON.stringify(user?.role?.permissions))
        ),
      },
    };

    return res.status(200).json(transformedUser);
  })
);

userRouter.post(
  '/user/signup',
  Validator.validate(authValidator.userSignupSchema),
  Create<MODELS.IUser>(UserModel, {
    requireAuth: false,
    payloadTransformer: async ({ payload }) => {
      payload.password = await hashPassword(payload.password);
      return payload;
    },
  })
);

userRouter.post(
  '/availability/add',
  checkAuth,
  Validator.validate(availabilityValidator.createAvailabilitySchema),
  Create<MODELS.IAvailability>(AvailabilityModel, {})
);

userRouter.post(
  '/availability/edit',
  checkAuth,
  Validator.validate(availabilityValidator.updateAvailabilitySchema),
  Edit<MODELS.IAvailability>(AvailabilityModel, {})
);

userRouter.post(
  '/profile/create',
  checkAuth,
  Validator.validate(authValidator.createProfileSchema),
  Create<MODELS.IProfile>(ProfileModel, {})
);

userRouter.post(
  '/profile/update',
  checkAuth,
  Validator.validate(authValidator.updateProfileSchema),
  Edit<MODELS.IProfile>(ProfileModel, {})
);

userRouter.post('/search/doctors', checkAuth, useRoute(doctorsSearch));

userRouter.post('/search/patient', checkAuth, useRoute(patientSearch));

userRouter.post(
  '/search/doctor-timings',
  checkAuth,
  useRoute(getDoctorAvailability)
);

export default userRouter;
