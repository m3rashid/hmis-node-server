import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
import type { FilterQuery, Model, QueryOptions } from 'mongoose';

interface EditControllerParams<DbType> {
  options?: QueryOptions<DbType>;
  reqTransformer?: (req: Request) => Promise<Request>;
  filterQueryTransformer?: (_: {
    user: MODELS.ILoginUser;
    filterQuery: FilterQuery<DbType>;
  }) => Promise<FilterQuery<DbType>>;
  payloadTransformer?: (_: {
    user: MODELS.ILoginUser;
    payload: Partial<DbType>;
  }) => Promise<Partial<DbType>>;
  serializer?: (_: {
    user: MODELS.ILoginUser;
    data: DbType;
  }) => Promise<DbType>;
}

function Edit<DbType>(
  model: Model<DbType> | MODELS.PaginateModel<DbType>,
  {
    payloadTransformer = async ({ user, payload }) => payload,
    reqTransformer = async (req) => req,
    serializer = async ({ data, user }) => data,
    filterQueryTransformer = async ({ user, filterQuery }) => filterQuery,
    options = {},
  }: EditControllerParams<DbType>
) {
  return async (
    _req: Request<
      any,
      any,
      { query: FilterQuery<DbType>; payload: Partial<DbType> }
    >,
    res: Response
  ) => {
    const req = await reqTransformer(_req);
    const user = req.user;

    const payload = await payloadTransformer({
      user,
      payload: req.body || {},
    });
    const query = await filterQueryTransformer({
      user,
      filterQuery: req.body.query || {},
    });

    // @ts-ignore
    const updateDoc = await model.findOneAndUpdate(
      query,
      {
        $set: {
          ...payload,
          ...(req.user ? { lastUpdatedBy: req.user._id } : {}),
        },
      },
      { ...options, new: true }
    );

    const data = await serializer({
      data: JSON.parse(JSON.stringify(updateDoc)),
      user,
    });

    return res.status(200).json(data);
  };
}

export default Edit;
