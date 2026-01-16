/*
 * @Author: mdz
 * @Date: 2021-09-28 13:37:06
 * @LastEditTime: 2023-08-04 14:44:48
 * @LastEditors: madongzhe
 * @Description:
 * @FilePath: \lx_battery_server\src\common\interceptor\transform.interceptor.ts
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    Logger.log(request.url, '正常接口请求');
    if (['/image/svg'].includes(request.path)) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => {
        return {
          code: '200',
          data: data,
          msg: '请求成功',
        };
      })
    );
  }
}
