import { Body, Controller, Get, Post } from "@nestjs/common";
import { GoodsService } from "./goods.service";
import { AuthService } from "../auth/auth.service";

@Controller('goods')
export class GoodsController {
  constructor(
    private readonly service: GoodsService,
    private readonly authService: AuthService,
  ){}

  @Get('/list')
  async getGoodsList() {
    const token = await this.authService.getToken()
    return await this.service.getAllTNTGoodsList(token)
  }

  @Post('/detail')
  async getGoodDetail(@Body('spuCode') spuCode: string) {
    const token = await this.authService.getToken()
    return await this.service.getGoodsDetail(spuCode, token)
  }

  @Post('/submit-order')
  async submitOrder(@Body('sellPrice') sellPrice: number, @Body('skuId') skuId: number ) {
    const token = await this.authService.getToken()
    return await this.service.submitOrder({ skuId, sellPrice}, token)
  }

  @Get('/order-list')
  async getOrderList() {
    const token = await this.authService.getToken()
    return await this.service.getOrderList(token)
  }
}