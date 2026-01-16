/*
 * @Author: mdz
 * @Date: 2021-09-27 15:16:57
 * @LastEditTime: 2023-07-18 11:39:58
 * @LastEditors: madongzhe
 * @Description:
 * @FilePath: \lx_battery_server\commitlint.config.js
 */

module.exports = {
  extents: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'improvement', 'perf', 'refactor', 'revert', 'style', 'test']],
  },
};
