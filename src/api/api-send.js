import axios from 'axios';

const URL_BASE = process.env.API_BASE_URL || 'http://ritachan.site/api';

function handleResult(res) {
  if (!res.data.success) {
    alert(res.data.message);
  }
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
