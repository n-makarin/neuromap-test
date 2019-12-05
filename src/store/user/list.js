export default {
  state: {
    data: []
  },
  mutations: {
    SET(state, data) {
      state.data = data;
    }
  },
  actions: {
    // async get({ commit }) {
    //   await this.app.$sendReq
    // }
  },
  modules: {}
};
