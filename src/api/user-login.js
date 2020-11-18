import { sendPostRequest } from './api-send';

const userLogin = async (username, password) => {
  const result = await sendPostRequest('/auth/login', {
    username,
    password,
  });
  return result;
};

export default userLogin;
