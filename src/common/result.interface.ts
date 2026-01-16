/*
 * @Author: mdz
 * @Date: 2021-09-30 10:09:00
 * @LastEditTime: 2021-09-30 10:09:01
 * @LastEditors: mdz
 * @Description:
 * @FilePath: \mcloud-server\src\common\result.interface.ts
 */

// 定义通用的API接口返回数据类型
export interface Result {
  code: number;
  message: string;
  data?: any;
}
