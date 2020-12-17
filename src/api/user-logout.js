import { sendGetRequest } from './api-send';

const userLogout = async () => {
  const result = await sendGetRequest('/auth/logout');
  return result;
};

export default userLogout;
