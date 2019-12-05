import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import sendRequest from "@/plugins/send-request.js";

import PortalVue from "portal-vue";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(sendRequest);
Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
