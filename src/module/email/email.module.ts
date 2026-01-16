/*
 * @Author: 师英英
 * @Date: 2024-06-13 17:24:43
 * @LastEditors: aliyun9402055519
 * @LastEditTime: 2025-07-24 15:54:46
 * @FilePath: /LXKT_Job_Sync/src/module/email/email.module.ts
 * @Description: 默认
 */
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EMAIL_CONFIG } from 'src/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: EMAIL_CONFIG.host,
        port: EMAIL_CONFIG.port,
        auth: {
          user: EMAIL_CONFIG.auth.user,
          pass: EMAIL_CONFIG.auth.pass,
        },
      },
      preview: false, // 是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
      defaults: {
        from: EMAIL_CONFIG.auth.user,
      },
    }),
  ],
  providers: [EmailService],
  controllers: [],
  exports: [EmailService],
})
export class EmailModule {}
