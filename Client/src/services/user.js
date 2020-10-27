import axios from 'axios';
export async function doLogin({ username, password }) {
  return axios.post('/api/users/login', {
    username,
    password,
  });
}
