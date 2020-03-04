import request from '@/utils/js/request'

//================================================

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
