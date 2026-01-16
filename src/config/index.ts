/*
 * @Author: mdz
 * @Date: 2022-03-09 11:22:03
 * @LastEditTime: 2026-01-09 15:30:14
 * @LastEditors: aliyun9402055519
 * @Description: 公共配置
 * @FilePath: /crystal_recognition_server/src/config/index.ts
 */
export const EMAIL_CONFIG = {
  host: 'imap.163.com', // 邮箱服务器地址
  port: 465, // 服务器端口 默认 465
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'syy_3263@163.com', // 邮箱地址
    pass: 'EAdftLGZ7hhXVHf5', // 客户端专用密码
  },
};
