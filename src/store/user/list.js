export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    SET(state, data) {
      state.data = data;
    }
  },
  actions: {
    async get({ commit }) {
      await this._vm
        .$sendRequest({
          method: "GET",
          url: "user/list"
        })
        .catch(err => {
          console.log(err);
        })
        .then(response => {
          if (!response || !response.data || response.data.length === 0) {
            return;
          }
          const userList = response.data;
          commit("SET", userList);
        });
    }
  },
  getters: {
    data: state => state.data
  },
  modules: {}
};
