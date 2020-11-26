import axios from 'axios';

export async function fetchList(params) {
  return axios.get('/api/process/page', { params });
}

export async function fetchLogs(id, params) {
  return axios.get(`/api/process/${id}/pageLogs`, {
    params: {
      ...params,
      sort: 'createOn desc',
      pageSize: 100,
    },
  });
}

export async function sendCommand(id, params) {
  return axios.post(`/api/process/${id}/pageLogs/sendCommand`, {
    command: params,
  });
}
