/**
 * 参数缺失：1001
 * @returns 
 */
const paramsMissingFun = (msg) => {
  return {
    code: 1001,
    message: msg || '参数缺失',
    data: {}
  }
}

/**
 * 请求失败: 900
 * @returns 
 */
const failFun = (errorData, msg) => {
  return {
    code: 900,
    message: msg || '请求失败',
    data: {}
  }
}

/**
 * 请求成功: 0
 * @returns 
 */
const successFun = (data) => {
  return {
    code: 0,
    message: '请求成功',
    data
  }
}

module.exports = {
  paramsMissingFun,
  failFun,
  successFun
}