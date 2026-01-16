/*
 * @Author: aliyun9402055519
 * @Date: 2025-07-18 11:11:39
 * @LastEditors: aliyun9402055519
 * @LastEditTime: 2025-07-22 10:17:32
 * @FilePath: /LXKT_Job_Sync/src/module/inspection/inspection.module.ts
 * @Description: 默认
 */
import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GoodsService],
  controllers: [],
  exports: [GoodsService],
})
export class GoodsModule {}
