import type { Request, Response } from 'express';

export type RequestWithBody<T> = Request<object, object, T>
