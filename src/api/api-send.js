import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_BASE_URL || '/api';

function handleResult(res) {
  return res.data;
}

export function sendGetRequest(route) {
  const url = `${URL_BASE}${route}`;
  return axios.get(url).then(handleResult);
}

export function sendPostRequest(route, payload) {
  const url = `${URL_BASE}${route}`;
  return axios.post(url, payload).then(handleResult);
}
