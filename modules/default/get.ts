import type { Request, Response } from 'express';
import type { FilterQuery, Model } from 'mongoose';
import { ERRORS, type MODELS } from '@hmis/gatekeeper';

interface GetControllerParams<DbType> {
  requireAuth?: boolean;
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
    requireAuth = true,
    reqTransformer = async (req) => req,
    filterQueryTransformer = async ({ user, filterQuery }) => filterQuery,
    populate = [],
    serializer = async ({ data, user }) => data,
  }: GetControllerParams<DbType>
) {
  return ERRORS.useRoute(
    async (
      _req: Request<any, any, { query: FilterQuery<DbType> }>,
      res: Response
    ) => {
      if (requireAuth && !_req.isAuthenticated)
        throw ERRORS.newError('No user found');

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
    }
  );
}

export default Get;
