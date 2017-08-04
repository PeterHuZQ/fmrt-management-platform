/**
 * 用户中心接口
 */
import { userCenter } from './const'
import http from './http'

// ----------------------01-用户中心   ---------------------------
/**
 * 01 用户中心 列表查询
 * @param {[type]}  page [开始的记录]
 * @param {[type]}  rows  [页大小]
 */
export function getListUser({
  page,
  rows
}) {
  return http.get(userCenter.ROUTE_GET_LIST_USER, {
    params: { page, rows }
  })
}

/**
 * 02 用户中心 新建用户信息
 * @param {[type]}  userName  [用户名]
 * @param {[type]}  name [姓名]
 * @param {[type]}  password [密码]
 * @param {[type]}  age [年龄]
 * @param {[type]}  sex [性别]
 * @param {[type]}  birthday [生日]
 */
export function getInsertCustomerBasic({
  userName,
  name,
  password,
  age,
  sex,
  birthday
}) {
  return http.post(userCenter.ROUTE_GET_TRY_INSERT_USER_BASIC, {
    userName,
    name,
    password,
    age,
    sex,
    birthday
  })
}
