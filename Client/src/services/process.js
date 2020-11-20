import axios from 'axios';

export async function fetchList(params) {
  return axios.get('/api/process/page', {params});
}

export async function fetchLogs(id, params) {
  return axios.get(`/api/process/${id}/pageLogs`, {params});
}