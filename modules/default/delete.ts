import type { Request, Response } from 'express';
import { ERRORS, type MODELS } from '@hmis/gatekeeper';
import type { FilterQuery, Model, QueryOptions } from 'mongoose';

interface DeleteControllerParams<DbType> {
  options?: QueryOptions<DbType>;
  requireAuth?: boolean;
  recover?: boolean;
  reqTransformer?: (req: Request) => Promise<Request>;
  filterQueryTransformer?: (_: {
    user: MODELS.ILoginUser;
    filterQuery: FilterQuery<DbType>;
  }) => Promise<FilterQuery<DbType>>;
}

function Delete<DbType>(
  model: Model<DbType> | MODELS.PaginateModel<DbType>,
  {
    requireAuth = true,
    recover = false,
    reqTransformer = async (req) => req,
    filterQueryTransformer = async ({ user, filterQuery }) => filterQuery,
    options = { multi: true },
  }: DeleteControllerParams<DbType>
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
      await model.findOneAndUpdate(
        query,
        {
          $set: {
            deleted: !recover,
            ...(req.user ? { lastUpdatedBy: req.user._id } : {}),
          },
        },
        { ...options }
      );

      return res.sendStatus(204);
    }
  );
}

export default Delete;
