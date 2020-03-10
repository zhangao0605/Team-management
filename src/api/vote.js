import request from '@/utils/js/request'

//================================================

// 点击单元格获取数据
export function getDataHistoryApi(data) {
  return request({
    url: "/vote/getDetailByParam",
    method: "post",
    data: data
  });
}
// 获取数据统计数据
export function getDataTotalApi(data) {
  return request({
    url: "/vote/getByParam",
    method: "post",
    data: data
  });
}
// 获取日期统计数据
export function getTimeTotalApi(data) {
  return request({
    url: "/vote/getHistory",
    method: "get",
    params: data
  });
}
// 获取王者解锁数据
export function getKingUnlockApi() {
  return request({
    url: "/vote/getKingsInfo",
    method: "get",
  });
}
// 获取所有权限
export function getUsers(data) {
  return request({
    url: "/api/user/getUsers",
    method: "post",
    data: data
  });
}
// 获取用户树
export function getUserTree() {
  return request({
    url: "/api/user/getUserTree",
    method: "get",
    params: {}
  });
}
export function getUserProfit(data) {
  return request({
    url: "/api/user/getUserProfit",
    method: "post",
    data: data
  });
}
export function getVote(data) {
  return request({
    url: "/api/user/getVote",
    method: "post",
    data: data
  });
}

export function getVoteDetail(data) {
  return request({
    url: "/api/user/getVoteDetail",
    method: "post",
    data: data
  });
}
