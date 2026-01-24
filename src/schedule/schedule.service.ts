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
  @Cron('0 0 9-21 * * 0,6') // 每周六、周日 9-21 整点执行
  async handleCron() {
    // 确定不需要购买的商品，不限量/一直有链接的商品
    /**
     * 1950 时代少年团-棉花娃娃动物系列套装 时代少年团:贺峻霖款
     * 1944 时代少年团-棉花娃娃动物系列套装 时代少年团:马嘉祺款
     */
    const notNeedSkuIds = [2751, 2758, 2757, 2756, 2755, 2754, 2753, 2752, 1733, 1732, 342, 340, 337, 2815, 2816, 2817, 2818, 2819, 2820, 2821, 2822, 2823, 2824, 2825, 2826, 2827, 2828, 2829, 2830]
    const token = await this.authService.getToken();
    // 获取商品列表
    const goodsList = await this.goodService.getGoodsList(token);
    if (!goodsList) {
      return
    }
    let total = 0;
    const orderGoodsArr = []
    const handleGoodsArr = []
    for (const goods of goodsList) {
      // 获取商品详情
      const detail = await this.goodService.getGoodsDetail(goods.spuCode, token);
      const length = detail.goodsSkuList.length;
      // 循环商品选项，先从HJL开始购买
      for (let i = length - 1; i >= 0; i--) {
        const item = detail.goodsSkuList[i]
        // 过滤库存为0的商品
        if (item.stock === 0) {
          continue
        }
        // 不需要的商品ID
        if (notNeedSkuIds.includes(item.id)) {
          continue
        }
        // 校验商品是否支持购买，余量不足或者超过上限
        const verifyRst = await this.goodService.verification(item.id, token);
        const isVerify = verifyRst[0]
        if (length === 1) {
          handleGoodsArr.push(`• ${item.skuName}, ${isVerify.message}`)
        } else {
          handleGoodsArr.push(`• ${detail.name}-${item.skuName}, ${isVerify.message}`)
        }
        function isNullOrEmpty(str: string | null | undefined): boolean {
          return str === null || str === undefined || str === '';
        }
        // 没有错误信息则直接提交订单
        if (isNullOrEmpty(isVerify.message)) {
          await this.goodService.submitOrder({
            skuId: item.id,
            sellPrice: item.sellPrice,
          }, token)
          total++
          if (length === 1) {
            orderGoodsArr.push(`• ${item.skuName}`)
          } else {
            orderGoodsArr.push(`• ${detail.name}-${item.skuName}`)
          }
        }
      }
    }
    const orderGoodString = orderGoodsArr.join('\n')
    const handleGoodString = handleGoodsArr.join('\n')
    await this.emailService.sendEmail({
      email: 'syy_3263@163.com', // 收件人
      subject: `TF 定时任务`,
      text: `${new Date()} 定时任务执行完成, 购买了 ${total} 件商品，详情如下：\n ${orderGoodString}\n 校验商品详情：\n ${handleGoodString}`,
    });
  }
}