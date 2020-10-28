import axios from 'axios';
export async function login({ username, password }) {
  return axios.post('/api/users/login', {
    username,
    password,
  });
}
