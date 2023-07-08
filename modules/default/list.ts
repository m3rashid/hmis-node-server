import type { Request, Response } from 'express';
import { ERRORS, type MODELS } from '@hmis/gatekeeper';
import type { FilterQuery, Model, PaginateOptions } from 'mongoose';

interface ListControllerParams<DbType> {
  maxLimit?: number;
  requireAuth?: boolean;
  reqTransformer?: (req: Request) => Promise<Request>;
  optionsTransformer?: (_: {
    user: MODELS.ILoginUser;
    options: PaginateOptions;
  }) => Promise<PaginateOptions>;
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

function List<DbType>(
  model: Model<DbType> | MODELS.PaginateModel<DbType>,
  {
    maxLimit = 25,
    requireAuth = true,
    reqTransformer = async (req) => req,
    filterQueryTransformer = async ({ user, filterQuery }) => filterQuery,
    populate = [],
    serializer = async ({ data, user }) => data,
    optionsTransformer = async ({ user, options }) => options,
  }: ListControllerParams<DbType>
) {
  return ERRORS.useRoute(
    async (
      _req: Request<
        any,
        any,
        { query: FilterQuery<DbType>; options: PaginateOptions }
      >,
      res: Response<DbType>
    ) => {
      if (requireAuth && !_req.isAuthenticated)
        throw ERRORS.newError('No user found');

      const req = await reqTransformer(_req);
      const user = req.user;

      const limit = Math.min(
        Number((req.body.options || {}).limit || 0),
        maxLimit
      );
      const page = Number((req.body.options || {}).page || 0);
      const options = await optionsTransformer({
        user,
        options: { ...req.body.options, limit, page },
      });

      const query = await filterQueryTransformer({
        user,
        filterQuery: req.body.query || {},
      });

      // @ts-ignore
      const listDocs = await model.paginate(query, options);
      const data = await serializer({
        user,
        data: JSON.parse(JSON.stringify(listDocs)),
      });
      return res.status(200).json(data);
    }
  );
}

export default List;
