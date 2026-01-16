/*
 * @Author: mdz
 * @Date: 2021-10-21 11:48:35
 * @LastEditTime: 2023-09-07 11:31:49
 * @LastEditors: madongzhe
 * @Description: code状态码
 * @FilePath: \lx_battery_server\src\utils\codeStatus.ts
 */

export const codeStatus = {
  /**
   * @description: 客户端发送的请求有错误（请求语法错误，body 数据格式有误，body 缺少必须的字段等），导致服务端无法处理
   */
  BAD_REQUEST_ERROR: 40000,
  /**
   * @description: 请求的资源需要认证，客户端没有提供认证信息或者认证信息不正确
   */
  UNAUTHORIZED_ERROR: 40001,
  /**
   * @description: 服务器程序错误
   */
  SERVER_ERROR: 40002,
  /**
   * @description: 服务器端接收到并理解客户端的请求，但是客户端的权限不足。比如，普通用户想操作只有管理员才有权限的资源。
   */
  FORBIDDEN_ERROR: 40003,
  /**
   * @description: 从MCloud读取文件失败
   */
  READINGFILE_ERROR: 40004,
};
