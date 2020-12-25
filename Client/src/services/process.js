import axios from 'axios';

export async function fetchList(params) {
  return axios.get('/api/process/page', { params });
}
export function modify(entity) {
  return axios.patch(`/api/process/modify/${entity.id}`, entity);
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

export function modifyTask(processId,entity) {
  return axios.patch(`/api/process/modify/${processId}/modifyTask/${entity.id}`, entity);
}