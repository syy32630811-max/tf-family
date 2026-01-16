/*
 * @Author: mdz
 * @Date: 2021-09-26 09:25:23
 * @LastEditTime: 2026-01-07 14:50:29
 * @LastEditors: aliyun9402055519
 * @Description: 根文件
 * @FilePath: /crystal_recognition_server/src/app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipe/validate.pipe';
import { DBConfig } from './config/database';
import { ScheduleModule } from '@nestjs/schedule';
import { GoodsModule } from './module/goods/goods.module';
import { TimingTaskModule } from './schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DBConfig),
    AuthModule,
    GoodsModule,
    ScheduleModule.forRoot(),
    TimingTaskModule,
    //
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
