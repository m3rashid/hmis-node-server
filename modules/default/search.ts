import { ERRORS, type MODELS } from '@hmis/gatekeeper';
import type { Request, Response } from 'express';
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
        .find(req.body.query || {})
        .skip((req.body.options.page || 1) - 1)
        .limit(limit + 1)
        .lean();

      const docs = JSON.parse(JSON.stringify(foundDocs));

      const paginatedDocs: Partial<MODELS.PaginatedListIResponse<DbType>> = {
        docs: docs.slice(0, limit),
        hasNextPage: docs.length > limit,
        hasPrevPage: (req.body.options.page || 1) > 1,
        limit,
        nextPage: docs.length > limit ? (req.body.options.page || 1) + 1 : null,
        prevPage:
          (req.body.options.page || 1) > 1
            ? (req.body.options.page || 1) - 1
            : null,
      };

      return res.status(200).json(paginatedDocs as any);
    }
  );
}

export default Search;
