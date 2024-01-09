import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserContext } from '../consts/user.const';
import { Request } from 'express';

export const UserContext = createParamDecorator(
  (data: keyof IUserContext, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
