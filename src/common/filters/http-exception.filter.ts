/*
 * @Author: mdz
 * @Date: 2021-09-28 14:28:16
 * @LastEditTime: 2023-02-27 14:29:09
 * @LastEditors: madongzhe
 * @Description: 错误过滤器
 * @FilePath: \mcloud-server\src\common\filters\http-exception.filter.ts
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { codeStatus } from 'src/utils/codeStatus';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    let message = exception.getResponse();

    if (typeof exception.getResponse() == 'string') {
      message = exception.message;
    } else {
      message = exception.getResponse()['message'];
    }
    Logger.error(`${request.url} - ${message}`, '非正常接口请求');
    if (status == 401 && message == 'Unauthorized') {
      response.status(200).json({
        code: codeStatus.UNAUTHORIZED_ERROR,
        msg: 'Token失效，重新登录',
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    } else {
      response.status(200).json({
        code: status,
        msg: message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
