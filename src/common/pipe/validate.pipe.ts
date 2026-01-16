/*
 * @Author: mdz
 * @Date: 2021-10-18 16:55:13
 * @LastEditTime: 2025-11-24 18:45:10
 * @LastEditors: madongzhe110@126.com madongzhe110@126.com
 * @Description: 类验证器
 * @FilePath: \crystal_recognition_server\src\common\pipe\validate.pipe.ts
 */
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value, { enableImplicitConversion: true });
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0];
      throw new BadRequestException('Validation failed：' + msg);
    }
    return object;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
    // return !types.find((type) => metatype === type);
  }
}
