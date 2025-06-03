import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { RequestUser } from 'src/modules/auth/interfaces/jwt-payload.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as RequestUser;
  },
);
