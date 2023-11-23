import { Request, Response, NextFunction } from "express";
import {IUserDto} from '../dtos/user-dto'

// declare global {
//   export type TController = (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => Promise<void | { redirect?: string; data?: any }>;
// }

declare global {
  export type TController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;

  namespace Express {
    export interface Request {
      user: IUserDto
    }
  }
}



