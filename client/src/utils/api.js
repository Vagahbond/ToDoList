import axios from 'axios';

import config from '../config';

export let token = localStorage.getItem('token');

/**
 * @param {string} method 
 * @param {string} url 
 * @param {any} data 
 * @param {import('axios').AxiosRequestConfig} config 
 */
export function request(method, url, data, request_config = {}) {
  const { headers = {}, ...others } = request_config;

  return axios({
    method,
    url: `${config.api_url}${url}`,
    data,
    headers: {
      authorization: token,
      ...headers,
    },
    ...others,
  });
}

/**
 * @param {string} value 
 */
export function setToken(value) {
  localStorage.setItem('token', value);
  token = value;
}

export function deleteToken() {
  token = null;
  localStorage.removeItem('token');
}

export async function checkToken() {
  if (!token) return false;

  try {
    const { data } = await request('GET', '/connected');

    if (!data?.connected) {
      deleteToken();
      return false;
    }

    return true;
  } catch {
    return false;
  }
}