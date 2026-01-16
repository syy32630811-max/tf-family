/*
 * @Author: mdz
 * @Date: 2021-09-27 17:12:47
 * @LastEditTime: 2026-01-05 14:23:04
 * @LastEditors: aliyun9402055519
 * @Description: AuthController中实现login API，使用passport-local守卫
 * @FilePath: /crystal_recognition_server/src/module/auth/auth.controller.ts
 */
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller('api')
@ApiTags('用户')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/save-token')
  async SaveTfToken(@Body('token') token: string) {
    const id = await this.authService.saveToken(token);
    return { id };
  }
}
