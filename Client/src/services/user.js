import axios from 'axios';

export function login({username, password}) {
  return axios.post('/api/users/login', {
    username,
    password,
  });
}

export function register(entity) {
  return axios.post('/api/users/register', entity);
}

export function modify(entity) {
  return axios.patch(`/api/users/modify/${entity.id}`, entity);
}

export async function fetchList(params) {
  return axios.get('/api/users/page', {params});
}
