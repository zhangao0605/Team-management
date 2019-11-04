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

/*注销登录*/
export function logout() {
  return request({
    url: '/v1/investmentAdmin/user/loginout ',
    method: 'get',
    params: {}
  })
}

/*获取表格信息*/
export function getPersonInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/getPersonInfo',
    method: 'post',
    data: e
  })
}

/*获取充值记录*/
export function getAcceptRecord(e) {
  return request({
    url: '/v1/investmentAdmin/info/getAcceptRecord',
    method: 'post',
    data: e
  })
}

/*获取用户来源*/
export function getExchangeType() {
  return request({
    url: '/v1/investmentAdmin/info/getExchangeType',
    method: 'get',
    params: {}
  })
}

/*重试操作*/
export function reTryPlay(e) {
  return request({
    url: '/v1/investmentAdmin/info/reTryPlay',
    method: 'get',
    params: e
  })
}

/*获取全部提现记录*/
export function getWithdrawalRecord(e) {
  return request({
    url: '/v1/investmentAdmin/info/getWithdrawalRecord',
    method: 'post',
    data: e
  })
}

/*获取批次*/
export function reviewBatch(e) {
  return request({
    url: '/v1/investmentAdmin/info/reviewBatch',
    method: 'get',
    params: e
  })
}

/*节点大赛信息 节点信息*/
export function nodeInfo(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeInfo',
    method: 'post',
    data: e
  })
}

/*节点大赛信息 节点类型*/
export function nodeType(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeType',
    method: 'post',
    data: e
  })
}

/*节点大赛数值设置*/
export function getSettingInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/getSettingInfo',
    method: 'post',
    data: e
  })
}

/* 修改MN值*/
export function updateSetting(e) {
  return request({
    url: '/v1/investmentAdmin/info/updateSetting',
    method: 'post',
    data: e
  })
}

/* 获取MN值历史记录*/
export function getMNLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getMNLog',
    method: 'post',
    data: e
  })
}

/* 获取节点信息单个节点详情*/
export function odeInfoCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/odeInfoCheck',
    method: 'post',
    data: e
  })
}

/* 获取权益池*/
export function equitypool(e) {
  return request({
    url: '/v1/investmentAdmin/node/equitypool',
    method: 'post',
    data: e
  })
}

/*获取创世节点设置*/
export function getPersonInfoCreation(e) {
  return request({
    url: '/v1/investmentAdmin/info/getPersonInfoCreation',
    method: 'post',
    data: e
  })
}

/*获取创世节查看详细*/
export function checkCreationDetails(e) {
  return request({
    url: '/v1/investmentAdmin/info/checkCreationDetails',
    method: 'get',
    params: e
  })
}

/*添加节点*/
export function insertCreationPerson(e) {
  return request({
    url: '/v1/investmentAdmin/info/insertCreationPerson',
    method: 'post',
    data: e
  })
}

/*修改节点*/
export function updateCreationPerson(e) {
  return request({
    url: '/v1/investmentAdmin/info/updateCreationPerson',
    method: 'post',
    data: e
  })
}

/*强制解绑*/
export function unBindCreationAddress(e) {
  return request({
    url: '/v1/investmentAdmin/info/unBindCreationAddress',
    method: 'get',
    params: e
  })
}

/*删除节点*/
export function deleteCreationAddress(e) {
  return request({
    url: '/v1/investmentAdmin/info/deleteCreationAddress',
    method: 'get',
    params: e
  })
}

/*批量审核*/
export function auditWithdrawalRecord(e) {
  return request({
    url: '/v1/investmentAdmin/info/auditWithdrawalRecord',
    method: 'post',
    data: e
  })
}

/*加入暂不审核*/
export function withholdAudit(e) {
  return request({
    url: '/v1/investmentAdmin/info/withholdAudit',
    method: 'get',
    params: e
  })
}

/*晋级审核*/
export function promotionAudit(e) {
  return request({
    url: '/v1/investmentAdmin/node/promotionAudit',
    method: 'post',
    data: e
  })
}

/*单个批准晋级*/
export function promotionAuditExe(e) {
  return request({
    url: '/v1/investmentAdmin/node/promotionAuditExe',
    method: 'post',
    data: e
  })
}

/*批量批准晋级*/
export function allPromotionAuditExe(e) {
  return request({
    url: '/v1/investmentAdmin/node/allPromotionAuditExe',
    method: 'post',
    data: e
  })
}

/*节点类型历史记录*/
export function nodeTypeRecord(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeTypeRecord',
    method: 'post',
    data: e
  })
}

/*审批批次详情*/
export function getALLReviewBatch(e) {
  return request({
    url: '/v1/investmentAdmin/info/getALLReviewBatch',
    method: 'post',
    data: e
  })
}

/*节点质押金额详情*/
export function nodePledgeAmount(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodePledgeAmount',
    method: 'post',
    data: e
  })
}

/*节点下属全部节点数量 查看详情*/
export function subordinateNodeAllCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/subordinateNodeAllCheck',
    method: 'post',
    data: e
  })
}

/*节点下属全部节点数量 查看详情 节点级别*/
export function nodeLevel(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeLevel',
    method: 'post',
    data: e
  })
}

/*节点累计收益详情 查看详情*/
export function nodeprofitCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeprofitCheck',
    method: 'post',
    data: e
  })
}

/*晋级审核 查看详情*/
export function promotionAuditCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/promotionAuditCheck',
    method: 'post',
    data: e
  })
}

/*解绑审核检索*/
export function unbindingAudit(e) {
  return request({
    url: '/v1/investmentAdmin/node/unbindingAudit',
    method: 'post',
    data: e
  })
}

/*确认批准解帮*/
export function approvalbind(e) {
  return request({
    url: '/v1/investmentAdmin/node/approvalbind',
    method: 'post',
    data: e
  })
}

/*全部批准解帮*/
export function allApprovalbind(e) {
  return request({
    url: '/v1/investmentAdmin/node/allApprovalbind',
    method: 'post',
    data: e
  })
}

/*全部批准解帮*/
export function transactionRecordScreen(e) {
  return request({
    url: '/v1/investmentAdmin/node/transactionRecordScreen',
    method: 'post',
    data: e
  })
}

/*提现退款*/
export function withdrawalRefund(e) {
  return request({
    url: '/v1/investmentAdmin/info/withdrawalRefund',
    method: 'get',
    params: e
  })
}

/*服务监控*/
export function getSystemHealthInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/getSystemHealthInfo',
    method: 'post',
    data: e
  })
}

/*充值提现相关今日记录*/
export function getAcceptAndRedeemLogNew() {
  return request({
    url: '/v1/investmentAdmin/info/getAcceptAndRedeemLogNew',
    method: 'get',
    params: {}
  })
}

/*充值提现相关历史记录*/
export function getAcceptAndRedeemLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getAcceptAndRedeemLog',
    method: 'post',
    data: e
  })
}

/*充值提现相关历史记录*/
export function nodeReport(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeReport',
    method: 'post',
    data: e
  })
}

/*充值提现相关历史记录*/
export function getEarningsLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getEarningsLog',
    method: 'post',
    data: e
  })
}

/*充值提现相关历史记录*/
export function getNowSettlement(e) {
  return request({
    url: '/v1/investmentAdmin/info/getNowSettlement',
    method: 'get',
    params: {}
  })
}

/*批量审核查询额度*/
export function getRedeemRecordCeiling(e) {
  return request({
    url: '/v1/investmentAdmin/info/getRedeemRecordCeiling',
    method: 'post',
    data: e
  })
}

/*获取ios and历史*/
export function updatesettings(e) {
  return request({
    url: '/v1/investmentAdmin/node/updatesettings',
    method: 'post',
    data: e
  })
}

/*新增更新ios and历史*/
export function newupdate(e) {
  return request({
    url: '/v1/investmentAdmin/node/newupdate',
    method: 'post',
    data: e
  })
}

/*提现规则*/
export function withdrawalrules(e) {
  return request({
    url: '/v1/investmentAdmin/node/withdrawalrules',
    method: 'post',
    data: e
  })
}

/*提现配置修改*/
export function withdrawalsconfigure(e) {
  return request({
    url: '/v1/investmentAdmin/node/withdrawalsconfigure',
    method: 'post',
    data: e
  })
}

/*邀请链接域名展现*/
export function invitelink(e) {
  return request({
    url: '/v1/investmentAdmin/node/invitelink',
    method: 'post',
    data: e
  })
}

/*邀请链接提现查看历史*/
export function viewinghistory(e) {
  return request({
    url: '/v1/investmentAdmin/node/viewinghistory',
    method: 'post',
    data: e
  })
}

/*节点累计收益统计 usdt查看历史*/
export function getnodeusdthistory(e) {
  return request({
    url: '/v1/investmentAdmin/node/getnodeusdthistory',
    method: 'post',
    data: e
  })
}

/*获取设置数据*/
export function getNodeSettingNew(e) {
  return request({
    url: '/v1/investmentAdmin/info/getNodeSettingNew',
    method: 'post',
    data: e
  })
}
/*修改设置数据*/
export function updateNodeSettingNew(e) {
  return request({
    url: '/v1/investmentAdmin/info/updateNodeSettingNew',
    method: 'post',
    data: e
  })
}
/*获取置数据修改LOG*/
export function getNodeSettingNewLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getNodeSettingNewLog',
    method: 'post',
    data: e
  })
}
/*节点累计收益统计 tue */
export function getnodetuehistory(e) {
  return request({
    url: '/v1/investmentAdmin/node/getnodetuehistory',
    method: 'post',
    data: e
  })
}


