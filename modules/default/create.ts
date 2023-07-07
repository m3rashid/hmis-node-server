import type { Model } from 'mongoose';
import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';

interface CreateControllerParams<DbType> {
  reqTransformer?: (req: Request) => Promise<Request>;
  payloadTransformer?: (_: {
    user: MODELS.ILoginUser;
    payload: DbType;
  }) => Promise<DbType>;
  serializer?: (_: {
    user: MODELS.ILoginUser;
    data: DbType;
  }) => Promise<DbType>;
}

function Create<DbType>(
  model: Model<DbType> | MODELS.PaginateModel<DbType>,
  {
    payloadTransformer = async ({ user, payload }) => payload,
    reqTransformer = async (req) => req,
    serializer = async ({ data, user }) => data,
  }: CreateControllerParams<DbType>
) {
  return async (
    _req: Request<any, any, { payload: DbType }>,
    res: Response
  ) => {
    const req = await reqTransformer(_req);
    const user = req.user;
    const payload = await payloadTransformer({
      user,
      payload: req.body.payload || {},
    });

    const createDoc = new model({
      ...payload,
      ...(req.user
        ? { createdBy: req.user._id, lastUpdatedBy: req.user._id }
        : {}),
    });
    await createDoc.save();

    const data = await serializer({
      data: JSON.parse(JSON.stringify(createDoc)),
      user,
    });
    return res.status(201).json(data);
  };
}

export default Create;
