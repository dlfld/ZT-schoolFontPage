import request from '@/utils/request'
export function loginCheckData(data1) {
  return request({
    url: '/admin/admin/login',
    method: 'post',
    params: data1
  })
}
