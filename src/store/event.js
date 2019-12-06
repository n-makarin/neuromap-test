import list from "@/store/event/list.js";

export default {
  namespaced: true,
  state: {
    data: {
      id: 0,
      title: "",
      participant_list: [],
      facilitator_user_id: null,
      secretary_user_id: null,
      duration: {
        begin: 0,
        end: 0
      },
      status: ""
    }
  },
  mutations: {
    SET(store, event) {
      store.data = event;
    }
  },
  actions: {
    /**
     * @prop {object} event
     * @returns void
     */
    set({ commit }, event) {
      commit("SET", event);
    }
  },
  getters: {
    data: state => state.data
  },
  modules: {
    list
  }
};
