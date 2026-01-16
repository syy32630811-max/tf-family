/*
 * @Author: mdz
 * @Date: 2021-09-27 17:04:05
 * @LastEditTime: 2026-01-05 14:54:50
 * @LastEditors: aliyun9402055519
 * @Description:
 * @FilePath: /crystal_recognition_server/src/module/auth/auth.module.ts
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthorizationEntity } from './entitiies/authorization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizationEntity]),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
