import type { Request, Response } from 'express';
import { ERRORS, type MODELS } from '@hmis/gatekeeper';
import type { FilterQuery, Model, PaginateOptions } from 'mongoose';

interface SearchControllerParams<DbType> {
  maxLimit?: number;
  requireAuth?: boolean;
}

function Search<DbType>(
  model: Model<DbType> | MODELS.PaginateModel<DbType>,
  { maxLimit = 25, requireAuth = true }: SearchControllerParams<DbType>
) {
  return ERRORS.useRoute(
    async (
      req: Request<
        any,
        any,
        { query: FilterQuery<DbType>; options: PaginateOptions }
      >,
      res: Response<DbType>
    ) => {
      if (requireAuth && !req.isAuthenticated)
        throw ERRORS.newError('No user found');

      const limit = Math.min(
        Number((req.body.options || {}).limit || 0),
        maxLimit
      );

      const foundDocs = await model
        // @ts-ignore
        .find(req.body.query || {})
        .skip((req.body.options.page || 1) - 1)
        .limit(limit)
        .lean();

      const docs = JSON.parse(JSON.stringify(foundDocs));
      const count = await model.countDocuments(req.body.query || {});

      const paginatedDocs: MODELS.PaginatedListIResponse<DbType> = {
        docs: docs,
        totalDocs: count,
        totalPages: Math.ceil(count / limit),
        page: req.body.options.page || 1,
        pagingCounter: (req.body.options.page || 1) * limit,
        hasNextPage: docs.length > limit,
        hasPrevPage: (req.body.options.page || 1) > 1,
        limit,
        nextPage: (req.body.options.page || 1) + 1,
				prevPage: (req.body.options.page || 1) - 1 < 1 ? null : (req.body.options.page || 1) - 1, 
      };

      return res.status(200).json(paginatedDocs as any);
    }
  );
}

export default Search;
