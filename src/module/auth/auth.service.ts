/*
 * @Author: mdz
 * @Date: 2021-09-27 17:08:06
 * @LastEditTime: 2026-01-05 14:43:18
 * @LastEditors: aliyun9402055519
 * @Description:
 * @FilePath: /crystal_recognition_server/src/module/auth/auth.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizationEntity } from './entitiies/authorization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthorizationEntity)
    private readonly authorizationRepository: Repository<AuthorizationEntity>,
  ) {}

  async saveToken(token: string) {
    await this.authorizationRepository.updateAll({ active: 0 })
    const res = await this.authorizationRepository.insert({ token, active: 1, create_time: new Date() })
    return res.identifiers[0].id
  }

  async getToken() {
    const res = await this.authorizationRepository.findOneBy({ active: 1 })
    return res.token
  }
}
