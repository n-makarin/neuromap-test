import list from "@/store/user/list.js";

export default {
  namespaced: true,
  state: {
    data: {
      id: 0,
      name: "",
      surname: ""
    }
  },
  mutations: {
    SET(store, { id = 0, name = "", surname = "" }) {
      store.data = {
        id,
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
      if (!user.id || !user.name || !user.surname) {
        return;
      }
      commit("SET", user);
    },
    /**
     * Create user, add to store and db
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
    },
    /**
     * Remove user from store and db
     * @param {number} userId
     * @returns Promise<void>
     */
    async remove({ commit, dispatch }, userId) {
      await this._vm
        .$sendRequest({
          method: "DELETE",
          url: `user/detail/${userId}`
        })
        .catch(err => {
          console.log(err);
        })
        .then(response => {
          if (!response.status === 200) {
            return;
          }
          commit("SET", { id: 0, name: "", surname: "" });
          dispatch("user/list/remove", userId, { root: true });
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
