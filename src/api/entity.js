import request from '@/utils/request'

export function getRel(params) {
  return request({
    url: "/api/schema",
    method: 'get',
    params
  })
}
