import list from "@/store/user/list.js";

export default {
  namespaced: true,
  state: {
    data: {
      name: "",
      surname: ""
    }
  },
  mutations: {
    SET(store, { name = "", surname = "" }) {
      store.data = {
        name,
        surname
      };
    }
  },
  actions: {
    /**
     * @returns void
     */
    set({ commit }, user) {
      if (!user.name || !user.surname) {
        return;
      }
      commit("SET", user);
    }
  },
  getters: {
    data: state => state.data
  },
  modules: {
    list
  }
};
