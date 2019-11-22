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
export function logout() {
  return request({
    url: '/v1/investmentAdmin/user/loginout ',
    method: 'get',
    params: {}
  })
}
export function getPersonInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/getPersonInfo',
    method: 'post',
    data: e
  })
}
export function getAcceptRecord(e) {
  return request({
    url: '/v1/investmentAdmin/info/getAcceptRecord',
    method: 'post',
    data: e
  })
}
export function getExchangeType() {
  return request({
    url: '/v1/investmentAdmin/info/getExchangeType',
    method: 'get',
    params: {}
  })
}
export function reTryPlay(e) {
  return request({
    url: '/v1/investmentAdmin/info/reTryPlay',
    method: 'get',
    params: e
  })
}
export function getWithdrawalRecord(e) {
  return request({
    url: '/v1/investmentAdmin/info/getWithdrawalRecord',
    method: 'post',
    data: e
  })
}
export function reviewBatch(e) {
  return request({
    url: '/v1/investmentAdmin/info/reviewBatch',
    method: 'get',
    params: e
  })
}
export function nodeInfo(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeInfo',
    method: 'post',
    data: e
  })
}
export function nodeType(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeType',
    method: 'post',
    data: e
  })
}
export function getSettingInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/getSettingInfo',
    method: 'post',
    data: e
  })
}
export function updateSetting(e) {
  return request({
    url: '/v1/investmentAdmin/info/updateSetting',
    method: 'post',
    data: e
  })
}
export function getMNLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getMNLog',
    method: 'post',
    data: e
  })
}
export function odeInfoCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/odeInfoCheck',
    method: 'post',
    data: e
  })
}
export function equitypool(e) {
  return request({
    url: '/v1/investmentAdmin/node/equitypool',
    method: 'post',
    data: e
  })
}
export function getPersonInfoCreation(e) {
  return request({
    url: '/v1/investmentAdmin/info/getPersonInfoCreation',
    method: 'post',
    data: e
  })
}
export function checkCreationDetails(e) {
  return request({
    url: '/v1/investmentAdmin/info/checkCreationDetails',
    method: 'get',
    params: e
  })
}
export function insertCreationPerson(e) {
  return request({
    url: '/v1/investmentAdmin/info/insertCreationPerson',
    method: 'post',
    data: e
  })
}
export function updateCreationPerson(e) {
  return request({
    url: '/v1/investmentAdmin/info/updateCreationPerson',
    method: 'post',
    data: e
  })
}
export function unBindCreationAddress(e) {
  return request({
    url: '/v1/investmentAdmin/info/unBindCreationAddress',
    method: 'get',
    params: e
  })
}
export function deleteCreationAddress(e) {
  return request({
    url: '/v1/investmentAdmin/info/deleteCreationAddress',
    method: 'get',
    params: e
  })
}
export function auditWithdrawalRecord(e) {
  return request({
    url: '/v1/investmentAdmin/info/auditWithdrawalRecord',
    method: 'post',
    data: e
  })
}
export function withholdAudit(e) {
  return request({
    url: '/v1/investmentAdmin/info/withholdAudit',
    method: 'get',
    params: e
  })
}
export function promotionAudit(e) {
  return request({
    url: '/v1/investmentAdmin/node/promotionAudit',
    method: 'post',
    data: e
  })
}
export function promotionAuditExe(e) {
  return request({
    url: '/v1/investmentAdmin/node/promotionAuditExe',
    method: 'post',
    data: e
  })
}
export function allPromotionAuditExe(e) {
  return request({
    url: '/v1/investmentAdmin/node/allPromotionAuditExe',
    method: 'post',
    data: e
  })
}
export function nodeTypeRecord(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeTypeRecord',
    method: 'post',
    data: e
  })
}
export function getALLReviewBatch(e) {
  return request({
    url: '/v1/investmentAdmin/info/getALLReviewBatch',
    method: 'post',
    data: e
  })
}
export function nodePledgeAmount(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodePledgeAmount',
    method: 'post',
    data: e
  })
}
export function subordinateNodeAllCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/subordinateNodeAllCheck',
    method: 'post',
    data: e
  })
}
export function nodeLevel(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeLevel',
    method: 'post',
    data: e
  })
}
export function nodeprofitCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeprofitCheck',
    method: 'post',
    data: e
  })
}
export function promotionAuditCheck(e) {
  return request({
    url: '/v1/investmentAdmin/node/promotionAuditCheck',
    method: 'post',
    data: e
  })
}
export function unbindingAudit(e) {
  return request({
    url: '/v1/investmentAdmin/node/unbindingAudit',
    method: 'post',
    data: e
  })
}
export function approvalbind(e) {
  return request({
    url: '/v1/investmentAdmin/node/approvalbind',
    method: 'post',
    data: e
  })
}
export function allApprovalbind(e) {
  return request({
    url: '/v1/investmentAdmin/node/allApprovalbind',
    method: 'post',
    data: e
  })
}
export function transactionRecordScreen(e) {
  return request({
    url: '/v1/investmentAdmin/node/transactionRecordScreen',
    method: 'post',
    data: e
  })
}
export function withdrawalRefund(e) {
  return request({
    url: '/v1/investmentAdmin/info/withdrawalRefund',
    method: 'get',
    params: e
  })
}
export function getSystemHealthInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/getSystemHealthInfo',
    method: 'post',
    data: e
  })
}
export function getAcceptAndRedeemLogNew() {
  return request({
    url: '/v1/investmentAdmin/info/getAcceptAndRedeemLogNew',
    method: 'get',
    params: {}
  })
}
export function getAcceptAndRedeemLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getAcceptAndRedeemLog',
    method: 'post',
    data: e
  })
}
export function nodeReport(e) {
  return request({
    url: '/v1/investmentAdmin/node/nodeReport',
    method: 'post',
    data: e
  })
}
export function getEarningsLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getEarningsLog',
    method: 'post',
    data: e
  })
}
export function getNowSettlement(e) {
  return request({
    url: '/v1/investmentAdmin/info/getNowSettlement',
    method: 'get',
    params: {}
  })
}
export function getRedeemRecordCeiling(e) {
  return request({
    url: '/v1/investmentAdmin/info/getRedeemRecordCeiling',
    method: 'post',
    data: e
  })
}
export function updatesettings(e) {
  return request({
    url: '/v1/investmentAdmin/node/updatesettings',
    method: 'post',
    data: e
  })
}
export function newupdate(e) {
  return request({
    url: '/v1/investmentAdmin/node/newupdate',
    method: 'post',
    data: e
  })
}
export function withdrawalrules(e) {
  return request({
    url: '/v1/investmentAdmin/node/withdrawalrules',
    method: 'post',
    data: e
  })
}
export function withdrawalsconfigure(e) {
  return request({
    url: '/v1/investmentAdmin/node/withdrawalsconfigure',
    method: 'post',
    data: e
  })
}
export function invitelink(e) {
  return request({
    url: '/v1/investmentAdmin/node/invitelink',
    method: 'post',
    data: e
  })
}
export function viewinghistory(e) {
  return request({
    url: '/v1/investmentAdmin/node/viewinghistory',
    method: 'post',
    data: e
  })
}
export function getnodeusdthistory(e) {
  return request({
    url: '/v1/investmentAdmin/node/getnodeusdthistory',
    method: 'post',
    data: e
  })
}
export function getNodeSettingNew(e) {
  return request({
    url: '/v1/investmentAdmin/info/getNodeSettingNew',
    method: 'post',
    data: e
  })
}
export function updateNodeSettingNew(e) {
  return request({
    url: '/v1/investmentAdmin/info/updateNodeSettingNew',
    method: 'post',
    data: e
  })
}
export function getNodeSettingNewLog(e) {
  return request({
    url: '/v1/investmentAdmin/info/getNodeSettingNewLog',
    method: 'post',
    data: e
  })
}
export function getnodetuehistory(e) {
  return request({
    url: '/v1/investmentAdmin/node/getnodetuehistory',
    method: 'post',
    data: e
  })
}
export function getNickNameInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/getNickNameInfo',
    method: 'get',
    params: e
  })
}
export function updateNodeInfo(e) {
  return request({
    url: '/v1/investmentAdmin/info/updateNodeInfo ',
    method: 'post',
    data: e
  })
}
export function getPersonDetails(e) {
  return request({
    url: '/v1/investmentAdmin/info/getPersonDetails',
    method: 'get',
    params: e
  })
}
export function getphonecode(e) {
  return request({
    url: '/v1/investmentAdmin/user/getphonecode',
    method: 'get',
    params: e
  })
}
export function getphonecodeinvalid(e) {
  return request({
    url: '/v1/investmentAdmin/user/getphonecodeinvalid',
    method: 'get',
    params: e
  })
}


