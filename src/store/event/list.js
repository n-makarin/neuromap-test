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
          url: "event/list"
        })
        .catch(err => {
          console.log(err);
        })
        .then(response => {
          if (!response || !response.data || response.data.length === 0) {
            return;
          }
          const eventList = response.data;
          commit("SET", eventList);
        });
    },
    /**
     * Add event to event list
     * @param {object} event event data
     * @returns void
     */
    add({ getters, commit }, event) {
      const list = getters.data;
      list.push(event);
      commit("SET", list);
    },
    /**
     * Remove event from event list
     * @param {number} eventId
     * @returns void
     */
    remove({ getters, commit }, eventId) {
      let list = getters.data;
      list = list.filter(function(element) {
        return element.id !== eventId;
      });
      commit("SET", list);
    }
  },
  getters: {
    data: state => state.data
  },
  modules: {}
};
