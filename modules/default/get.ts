import type { MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
import type { FilterQuery, Model } from 'mongoose';

interface GetControllerParams<DbType> {
  reqTransformer?: (req: Request) => Promise<Request>;
  filterQueryTransformer?: (_: {
    user: MODELS.ILoginUser;
    filterQuery: FilterQuery<DbType>;
  }) => Promise<FilterQuery<DbType>>;
  populate?: Array<string>;
  serializer?: (_: {
    user: MODELS.ILoginUser;
    data: DbType;
  }) => Promise<DbType>;
}

function Get<DbType>(
  model: Model<DbType> | MODELS.PaginateModel<DbType>,
  {
    reqTransformer = async (req) => req,
    filterQueryTransformer = async ({ user, filterQuery }) => filterQuery,
    populate = [],
    serializer = async ({ data, user }) => data,
  }: GetControllerParams<DbType>
) {
  return async (
    _req: Request<any, any, { query: FilterQuery<DbType> }>,
    res: Response
  ) => {
    const req = await reqTransformer(_req);
    const user = req.user;

    const query = await filterQueryTransformer({
      user,
      filterQuery: req.body.query || {},
    });

    // @ts-ignore
    let find = model.findOne(query, {});
    if (populate.length > 0) find = find.populate(populate) as any;
    const getDoc = await find;
    const data = await serializer({
      data: JSON.parse(JSON.stringify(getDoc)),
      user,
    });
    return res.status(200).json(data);
  };
}

export default Get;