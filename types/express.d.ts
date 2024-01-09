import { IUserContext } from '@src/common/consts';

declare module 'express' {
  export interface Request {
    user?: IUserContext;
  }
}
