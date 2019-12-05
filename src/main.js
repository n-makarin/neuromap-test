import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import sendRequest from "@/plugins/send-request.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");

Vue.use(VueAxios, axios);
Vue.use(sendRequest);
