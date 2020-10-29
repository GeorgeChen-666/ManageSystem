import axios from 'axios';
export async function login({ username, password }) {
  return await axios.post('/api/users/login', {
    username,
    password,
  });
}
