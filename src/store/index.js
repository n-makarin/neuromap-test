import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user.js";
import sharedMutations from "vuex-shared-mutations";

Vue.use(Vuex);

const sharedMutationList = ["user/SET", "user/list/SET"];

export default new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  },
  plugins: [sharedMutations({ predicate: sharedMutationList })]
});
