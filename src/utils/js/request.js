import axios from "axios";
import {
  Message,
  MessageBox
} from "element-ui";
import store from "../../store";
import {
  getToken
} from "@/utils/js/token";

const service = axios.create({
  baseURL: document.location.protocol + window.location.search,
  // baseURL: 'http://invest.thinkey.org/',
  // baseURL: 'http://investtest.thinkey.xyz/',
  // baseURL: 'http://43.247.184.53:8280/wallet-admin/',
  // baseURL: this.$store.state.get_url,
  // baseURL: 'http://192.168.1.106:8600',
  // baseURL: "http://192.168.1.108:8600",
  timeout: 30000
});
service.interceptors.request.use(
  config => {
    let token = "Bearer " + getToken();
    config.headers["content-type"] = "application/json; charset=utf-8";
    if (store.getters.token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (
      response.data.eCode === undefined ||
      response.data.eCode === "" ||
      response.data.eCode === 201 ||
      response.data.eCode === 200 ||
      response.data.eCode === 0 ||
      response.data.eCode === 1 ||
      res.eCode === 10000 ||
      res.eCode === 400 ||
      res.eCode === 500
    ) {
      return response.data;
    } else {
      if (
        res.eCode === 100001 ||
        res.eCode === 100002 ||
        res.eCode === 100003
      ) {
        store.dispatch("login/FedLogOut").then(() => {
          location.reload();
        });
      }
      return Promise.reject("error");
    }
  },
  error => {
    let msg = "";
    if (error == "Error: timeout of 5000ms exceeded") {
      msg = "无效请求！请求超时！";
    } else {
      msg = error.message;
    }
    Message({
      message: msg,
      type: "error",
      duration: 2 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
