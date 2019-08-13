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
export function getMainInfo(e) {
  return request({
    url:'/v1/investmentAdmin/info/getMainInfo',
    method: 'post',
    data:e
  })
}

/*获取战队编号*/
export function selectGroup() {
  return request({
    url:'/v1/investmentAdmin/info/selectGroup',
    method: 'post',
    data:{}
  })
}
/*获取活动身份*/
export function selectGroupRole() {
  return request({
    url:'/v1/investmentAdmin/info/selectGroupRole',
    method: 'post',
    data:{}
  })
}
/*导出文件*/
export function exportResult(e) {
  return request({
    url:'/v1/investmentAdmin/info/exportResult',
    method: 'get',
    params:e
  })
}
