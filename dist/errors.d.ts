import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
export declare function notFound(req: Request, res: Response, next: NextFunction): void;
export declare function serverError(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): void;
