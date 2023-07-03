import type { Request } from 'express';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type AllExceptOptional<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>;

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
