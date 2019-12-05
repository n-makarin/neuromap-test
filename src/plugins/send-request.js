import axios from "axios";
const endpoint = "http://127.0.0.1:8000/";

export default {
  install(Vue) {
    Vue.prototype.$sendRequest = ({
      method,
      url,
      params,
      data,
      ...options
    }) => {
      const headers = "";
      return axios({
        method,
        url: endpoint + url,
        params,
        data,
        headers,
        ...options
      });
    };
  }
};
