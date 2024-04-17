import axios from 'axios';
// import clearStorage from '../../helpers/clearStorage';
import {
  RequestProps,
  OmittedRequestProps,
  Response,
  IError,
} from './types.ts';

export const setToken = (access_token: string) => {
  localStorage.setItem('token', access_token);
};

/** Gets the token from browser storage */
export const getToken = () => localStorage.getItem('token');

/** Removes the token from browser storage */
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
    // so just remove all data and redirect user to login page
    if (status === 401 && getToken()) {
      // clearStorage();
      // TODO: add redirect to login page
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
  token: propsToken,
}: RequestProps) => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
  if (propsToken) headers.Authorization = `Bearer ${propsToken}`;
  const VITE_APP_MANIFEST = import.meta.env.VITE_APP_MANIFEST;
  const BASE_URL = JSON.parse(VITE_APP_MANIFEST).BASE_API;

  const responseData: Response = await axios({
    method,
    headers,
    data: body,
    url: `${BASE_URL}${url}`,
    ...options,
  });

  /** Error handling */
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
