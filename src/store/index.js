import Vue from "vue";
import Vuex from "vuex";
import sharedMutations from "vuex-shared-mutations";

import user from "@/store/user.js";
import event from "@/store/event.js";

Vue.use(Vuex);

const sharedMutationList = [
  "user/SET",
  "user/list/SET",
  "event/SET",
  "event/list/SET"
];

export default new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    event
  },
  plugins: [sharedMutations({ predicate: sharedMutationList })]
});
