/*
 * @Author: mdz
 * @Date: 2021-11-23 11:39:55
 * @LastEditTime: 2026-01-08 10:47:45
 * @LastEditors: madongzhe110@126.com madongzhe110@126.com
 * @Description: 数据库配置
 * @FilePath: \crystal_recognition_server\src\config\database.ts
 */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'tf-family',
  password: '6w3GGMdnC4snsJBZ',
  database: 'tf-family',
  entities: ['dist/**/*.entity{.ts,.js}'],
  charset: 'utf8mb4',
  logging: true,
  // entityPrefix: '',
  autoLoadEntities: true,
  timezone: '+08:00',
}

console.log(process.env.NODE_ENV, '-------------环境');
const DBConfig = mysqlConfig;
export { DBConfig };
