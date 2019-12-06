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
    },
    /**
     * Add user to user list
     * @param {object} user User data
     * @returns void
     */
    add({ getters, commit }, user) {
      const list = getters.data;
      list.push(user);
      commit("SET", list);
    },
    /**
     * Remove user from user list
     * @param {number} userId
     * @returns void
     */
    remove({ getters, commit }, userId) {
      let list = getters.data;
      list = list.filter(function(element) {
        return element.id !== userId;
      });
      commit("SET", list);
    }
  },
  getters: {
    data: state => state.data
  },
  modules: {}
};
