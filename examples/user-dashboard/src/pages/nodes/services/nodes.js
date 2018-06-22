import request from '../../../utils/request';
import { PAGE_SIZE } from '../../../constants';

export function fetch({ page }) {
  return request(`/api/v1/nodes?_page=${page}&_limit=${PAGE_SIZE}`)
  .then(res=>{ 
    return { 
      data:res.data.items,
      headers:{"x-total-count":res.data.items.length} 
    }
  })
}

export function remove(id) {
  return request(`/api/nodes/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/nodes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/nodes', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
