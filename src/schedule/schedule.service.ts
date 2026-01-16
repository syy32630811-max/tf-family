import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AuthService } from "src/module/auth/auth.service";
import { EmailService } from "src/module/email/email.service";
import { GoodsService } from "src/module/goods/goods.service";

@Injectable()
export class TimingTaskService {
  constructor(
    private readonly authService: AuthService,
    private readonly goodService: GoodsService,
    private readonly emailService: EmailService,
  ) { }

  // @Cron(new Date(Date.now() + 3 * 1000)) // 服务启动 3 秒后运行
  @Cron('0 0 10 * * 0,6') // 每周六、周日 10:00 执行
  async handleCron() {
    const notNeedSkuIds = [2751, 2758, 2757, 2756, 2755, 2754, 2753, 2752, 1733, 1732, 342, 340, 337]
    const token = await this.authService.getToken();
    const goodsList = await this.goodService.getGoodsList(token);
    let total = 0;
    for (const goods of goodsList) {
      const detail = await this.goodService.getGoodsDetail(goods.spuCode, token);
      const length = detail.goodsSkuList.length;
      for (let i = length - 1; i >= 0; i--) {
        const item = detail.goodsSkuList[i]
        // 删除库存为0的商品
        if (item.stock === 0) {
          continue
        }
        // 不需要的商品ID
        if (notNeedSkuIds.includes(item.id)) {
          continue
        }
        const isVerify = await this.goodService.verification(item.id, token);
        function isNullOrEmpty(str: string | null | undefined): boolean {
          return str === null || str === undefined || str === '';
        }
        if (isNullOrEmpty(isVerify.message)) {
          await this.goodService.submitOrder({
            skuId: item.id,
            sellPrice: item.sellPrice,
          }, token)
          total++
        }
      }
    }
    await this.emailService.sendEmail({
      email: 'syy_3263@163.com', // 收件人
      subject: `TF 定时任务`,
      text: `${new Date()} 定时任务执行完成, 购买了 ${total} 件商品`,
    });
  }
}