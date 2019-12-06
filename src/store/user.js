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
     * Set current user to store
     * @prop {object} user
     * @returns void
     */
    set({ commit }, user) {
      if (!user.name || !user.surname) {
        return;
      }
      commit("SET", user);
    },
    /**
     *
     * @param {object} payload
     * @returns Promise<void>
     */
    async create({ commit, dispatch }, { name = "", surname = "" }) {
      await this._vm
        .$sendRequest({
          method: "POST",
          url: "user/list",
          data: { name, surname }
        })
        .catch(err => {
          console.log(err);
        })
        .then(response => {
          if (!response || !response.data || response.data.length === 0) {
            return;
          }
          const user = response.data;
          commit("SET", user);
          dispatch("user/list/add", user, { root: true });
        });
    }
  },
  getters: {
    data: state => state.data
  },
  modules: {
    list
  }
};
