/*
 * @Author: 师英英
 * @Date: 2024-03-04 17:26:16
 * @LastEditors: aliyun9402055519
 * @LastEditTime: 2025-07-22 10:14:56
 * @FilePath: /LXKT_Job_Sync/src/schedule/schedule.module.ts
 * @Description: 默认
 */
import { Module } from '@nestjs/common';
import { TimingTaskService } from './schedule.service';
import { GoodsModule } from 'src/module/goods/goods.module';
import { AuthModule } from 'src/module/auth/auth.module';
import { EmailModule } from 'src/module/email/email.module';

@Module({
  imports: [
    AuthModule,
    GoodsModule,
    EmailModule,
  ],
  providers: [TimingTaskService],
  controllers: [],
  exports: [TimingTaskService],
})
export class TimingTaskModule {}
