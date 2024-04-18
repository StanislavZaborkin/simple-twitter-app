import axios from 'axios';

import {
  RequestProps,
  OmittedRequestProps,
  Response,
  IError,
} from './types.ts';

export const setToken = (access_token: string) => {
  localStorage.setItem('token', access_token);
};

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => {
  localStorage.removeItem('token');
};

/** Intercepts all requests to add token if it exists */
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => Promise.reject(error),
);

/** Intercepts all responses to handle the errors */
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  (error: IError) => {
    if (!error.response) return error;

    const { status } = error.response;
    // If we get 401 error it means that token is expired,
    // so we can add refresh token logic here
    if (status === 401) {
      return;
    }

    return error;
  },
);

export const makeRequest = async ({
  method,
  url,
  body,
  options,
}: RequestProps) => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
  const VITE_APP_MANIFEST = import.meta.env.VITE_APP_MANIFEST;
  const BASE_URL = JSON.parse(VITE_APP_MANIFEST).BASE_API;

  const responseData: Response = await axios({
    method,
    headers,
    data: body,
    url: `${BASE_URL}${url}`,
    ...options,
  });

  if (responseData.name === 'AxiosError') {
    throw new Error(responseData.response.data.details);
  }

  return responseData.data;
};

export const sget = (props: OmittedRequestProps) =>
  makeRequest({ method: 'get', ...props });
export const spost = (props: OmittedRequestProps) =>
  makeRequest({
    method: 'post',
    ...props,
  });
