/*
 * @Author: mdz
 * @Date: 2021-10-20 11:35:29
 * @LastEditTime: 2021-12-15 11:41:39
 * @LastEditors: mdz
 * @Description: 日志中间件
 * @FilePath: \mcloud-server\src\common\middleware\logger.middleware.ts
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, path } = req;
    Logger.log(`${method} ${path}`);
    next();
  }
}
