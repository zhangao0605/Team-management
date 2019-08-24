import request from '@/utils/js/request'

export function login(username, password) {
  return request({
    url: '/v1/investmentAdmin/user/login',
    method: 'post',
    data: {
      "account": username,
      "password": password,
    }
  })
}

/*获取表格信息*/
export function getPersonInfo(e) {
  return request({
    url:'/v1/investmentAdmin/info/getPersonInfo',
    method: 'post',
    data:e
  })
}
/*获取充值记录*/
export function getAcceptRecord(e) {
  return request({
    url:'/v1/investmentAdmin/info/getAcceptRecord',
    method: 'post',
    data:e
  })
}
/*获取用户来源*/
export function getExchangeType() {
  return request({
    url:'/v1/investmentAdmin/info/getExchangeType',
    method: 'get',
    params:{}
  })
}
/*重试操作*/
export function reTryPlay(e) {
  return request({
    url:'/v1/investmentAdmin/info/reTryPlay',
    method: 'get',
    params:e
  })
}
/*获取全部提现记录*/
export function getWithdrawalRecord(e) {
  return request({
    url:'/v1/investmentAdmin/info/getWithdrawalRecord',
    method: 'post',
    data:e
  })
}
/*获取批次*/
export function reviewBatch(e) {
  return request({
    url:'/v1/investmentAdmin/info/reviewBatch',
    method: 'get',
    params:e
  })
}
/*节点大赛信息 节点信息*/
export function nodeInfo(e) {
  return request({
    url:'/v1/investmentAdmin/node/nodeInfo',
    method: 'post',
    data:e
  })
}/*节点大赛信息 节点类型*/
export function nodeType(e) {
  return request({
    url:'/v1/investmentAdmin/node/nodeType',
    method: 'post',
    data:e
  })
}

