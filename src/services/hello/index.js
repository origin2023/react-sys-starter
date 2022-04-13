import { request } from 'umi';

export function relationList(data) {
  return request('/origin-cmdb/relation/type/list', {
    method: 'get',
    params: data,
  });
}

export function postList(data) {
  return request('/origin-cmdb/relation/type/list', {
    method: 'post',
    data: data,
  });
}