/*
 * @Author: mdz
 * @Date: 2021-09-26 09:25:23
 * @LastEditTime: 2026-01-08 10:58:23
 * @LastEditors: madongzhe110@126.com madongzhe110@126.com
 * @Description:
 * @FilePath: \crystal_recognition_server\src\main.ts
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 开启白名单模式，自动剥离未在 DTO 中定义的属性
      forbidNonWhitelisted: true, // （可选但推荐）遇到未知属性时直接报错，而非静默剥离
      transform: true, // （可选）自动将负载转换为 DTO 类的实例
      // disableErrorMessages: process.env.NODE_ENV === 'prod', // 生产环境可设置为 true 以隐藏错误详情
    })
  );
  // 日志中间件
  app.use(new LoggerMiddleware().use);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  const port = 3801;
  console.log(`服务启动成功，端口：${port}`);
  await app.listen(port);
}
bootstrap();
