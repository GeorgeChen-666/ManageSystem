import axios from 'axios';
export function login({ username, password }) {
  return axios.post('/api/users/login', {
    username,
    password,
  });
}
export function register(entity) {
  return axios.post('/api/users/register', entity);
}
export async function fetchList() {
  return axios.get('/api/users/page', {});
}
