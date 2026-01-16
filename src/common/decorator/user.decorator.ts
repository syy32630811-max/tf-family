/*
 * @Author: mdz
 * @Date: 2021-10-20 16:27:13
 * @LastEditTime: 2021-10-20 16:49:01
 * @LastEditors: mdz
 * @Description:
 * @FilePath: \mcloud-server\src\common\decorator\user.decorator.ts
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return data ? user && user[data] : user;
});
