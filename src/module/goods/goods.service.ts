import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthorizationEntity } from "../auth/entitiies/authorization.entity";
const https = require('https');
import { lastValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class GoodsService {
  constructor(
    private httpService: HttpService
  ) { }

  /**
   * @desc 提交订单
   */
  async submitOrder(data: {
    skuId: number,
    sellPrice: number
  }, token: string) {
    try {
      const options = {
        'method': 'POST',
        'url': 'https://app.tfent.cn/place-order/mallOrder/placeOrder',
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        data: {
          "payMethod": null,
          "chkParentAuth": 0,
          "orderPrice": data.sellPrice,
          "buyItemInfos": [
            {
              "companyId": 2,
              "orgId": 35,
              "remark": "",
              "productList": [
                {
                  "skuId": data.skuId,
                  "num": 1,
                  "pullerId": null,
                  "expectedDeliveryTime": null
                }
              ]
            }
          ],
          "receiverInfo": {
            "id": 8262243,
            "receiver": "师英英",
            "receiverPhone": "18437213263",
            "receiverProvince": "北京市",
            "receiverCity": "北京城区",
            "receiverCounty": "海淀区",
            "receiverAddress": "龙岗路35号锋线阁小区二门S1410",
            "bookDefaultStatus": 1,
            "bookType": 1
          },
          "remark": "",
          "orderSource": 3,
          "validCode": "",
          "orderType": 1,
          "deliveryMethod": 2,
          "cartIds": [
            data.skuId
          ],
          "applyType": 1
        }

      };
      const response: any = await lastValueFrom(this.httpService.request(options));
      Logger.log('submitOrder request')
      if (response.data.code == 200) {
        return response.data.data
      }
    } catch(e) {
      await this.submitOrder(data, token)
    }
  }

  /**
   * @desc 获取商品列表
   */

  async getGoodsList(token: string) {
    try {
      const options = {
        'method': 'POST',
        'url': 'https://app.tfent.cn/goods/salesClassInfo/appRelationGoodsList',
        'headers': {
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) UnifiedPCMacWechat(0xf264162f) XWEB/18152',
          'xweb_xhr': '1',
          'syscode': 'tf',
          'accept': '*/*',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': 'https://servicewechat.com/wxe080fea87f9b2b4b/21/page-frame.html',
          'accept-language': 'zh-CN,zh;q=0.9',
          'priority': 'u=1, i',
          'Authorization': token,
          'content-type': 'application/json'
        },
        data: {
          "companyId": 2,
          "orgId": 35,
          "salesClassId": 3,
          "sortFieldType": 0,
          "sortType": 0,
          "pageNum": 1,
          "pageSize": 10,
          "applyType": 1
        }
      };
      const response: any = await lastValueFrom(this.httpService.request(options));
      Logger.log('getGoodsList request')
      if (response.data.code == 200) {
        return response.data.data && response.data.data.records
      }
    } catch(e) {
      await this.getGoodsList(token)
    }
  }

  /**
   * @desc 获取商品详情
   */
  async getGoodsDetail(spuCode: string, token: string) {
    try {
      const options = {
        'method': 'POST',
        'url': 'https://app.tfent.cn/goods/shelves/getShelvesBySpuCode',
        'headers': {
          'authority': 'app.tfent.cn',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) UnifiedPCMacWechat(0xf264162f) XWEB/18152',
          'xweb_xhr': '1',
          'syscode': 'tf',
          'accept': '*/*',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': 'https://servicewechat.com/wxe080fea87f9b2b4b/21/page-frame.html',
          'accept-language': 'zh-CN,zh;q=0.9',
          'priority': 'u=1, i',
          'Authorization': token,
          'content-type': 'application/json'
        },
        data: {
          "spuCode": spuCode,
          "companyId": 2,
          "applyType": 1
        }
      };
      const response: any = await lastValueFrom(this.httpService.request(options));
      Logger.log('getGoodsDetail request')
      if (response.data.code == 200) {
        return response.data.data
      }
    } catch(e) {
      await this.getGoodsDetail(spuCode, token)
    }
  }

  /**
   * @desc 校验商品是否支持购买
   * @param skuId 商品id
   * @param token 
   * @returns 
   */
  async verification(skuId: number, token: string) {
    try {
      const options = {
        'method': 'POST',
        'url': 'https://app.tfent.cn/mall/mallOrder/verification',
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        data: {
          "applyType": 1,
          "buySkuInfos": [
            {
              "companyId": 2,
              "orgId": 35,
              "skuId": skuId,
              "number": 1
            }
          ]
        }
      };
      const response: any = await lastValueFrom(this.httpService.request(options));
      Logger.log('verification request')
      if (response.data.code == 200) {
        return response.data.data
      }
    } catch(e) {
      await this.verification(skuId, token)
    }
  }

  /**
   * @desc 获取收货地址列表
   */
  async getAddressList(token: string) {
    try {
      const options = {
        'method': 'POST',
        'url': 'https://app.tfent.cn/gis/book/pageQuery',
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        data: {
          "bookType": 1,
          "searchName": "",
          "pageNum": 1,
          "bookDefaultStatus": 0,
          "pageSize": 10
        }
  
      };
      const response: any = await lastValueFrom(this.httpService.request(options));
      Logger.log('getAddressList request')
      if (response.data.code == 200) {
        return response.data.data
      }
    } catch(e) {
      await this.getAddressList(token)
    }
  }
}