/**
 * Created by amosannn on 18/4/2
 * http 配置
 * 去除 axios 封装
 */
import axios from 'axios'
import store from './store/store'
import * as types from './store/types'
import router from './router'
// import Vue from "vue/types/index";

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'https://api.amosannn.com';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });

export default axios;
