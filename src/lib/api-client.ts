/**
 * This file returns an instance of axios that is preconfigured with 
 * all neccessary information to make calls. Import api from this 
 * file and use it for all http requests throughout the app. 
 */

import Axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

function authRequestInterceptor(config: InternalAxiosRequestConfig) { 
  const token = Cookies.get('auth_token');
  if (config.headers) {
  config.headers.Accept = "application/json";
  }
  config.headers.Authorization = 'bearer ' + token;
  config.withCredentials = true;

  return config;
}

export const api = Axios.create({});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    // if (error.response?.status === 401) {
    //   const searchParams = new URLSearchParams();
    //   const redirectTo = searchParams.get('redirectTo');
    //   window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    // }

    console.log(message)

    return Promise.reject(error);
  },
);
