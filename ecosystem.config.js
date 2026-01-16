/*
 * @Author: mdz
 * @Date: 2021-12-24 10:42:37
 * @LastEditTime: 2023-07-14 15:36:58
 * @LastEditors: madongzhe
 * @Description: 环境配置
 * @FilePath: \battery_server\ecosystem.config.js
 */
module.exports = {
  apps: [
    {
      name: 'lx_battery_server',
      // script: '/home/wwwroot/dev/mcloud_server/dist/main.js',
      script: 'dist/main.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      restart_delay: 60,
      env_prod: {
        NODE_ENV: 'prod',
      },
      env_pre: {
        NODE_ENV: 'pre',
      },
    },
  ],
};
