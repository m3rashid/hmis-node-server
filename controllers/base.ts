import type { Request, Response } from 'express';

export type RequestWithBody<T> = Request<object, object, T>;

export type PaginatedRequestQueryParams<
  Body = object,
  Params = object
> = Request<
  object,
  object,
  Body,
  Params & {
    pageSize: number;
    pageNumber: number;
  }
>;
