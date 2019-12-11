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
    },
    participantList: [],
    facilitatorUser: {},
    secretaryUser: {}
  },
  mutations: {
    SET(store, event) {
      store.data = event;
    },
    SET_PARTICIPANT_LIST(store, list) {
      store.participantList = list;
    },
    SET_FACILITATOR_LIST(store, user) {
      store.facilitatorUser = user;
    },
    SET_SECRETARY_LIST(store, user) {
      store.secretaryUser = user;
    }
  },
  actions: {
    /**
     * @prop {object} event
     * @returns void
     */
    set({ commit }, event) {
      commit("SET", event);
    },
    /**
     * Create event, add to store and db
     * @param {object} payload
     * @returns Promise<void>
     */
    async create({ commit, dispatch }, payload) {
      await this._vm
        .$sendRequest({
          method: "POST",
          url: "event/list",
          data: payload
        })
        .catch(err => {
          console.log(err);
        })
        .then(response => {
          if (!response || !response.data || response.data.length === 0) {
            return;
          }
          const event = response.data;
          commit("SET", event);
          dispatch("event/list/add", event, { root: true });
        });
    },
    /**
     * Get users by ids and set participantList to store
     * @param {number[]} participantList List of participants users ids
     * @returns Promise<void>
     */
    async setParticipantList({ commit, dispatch }, participantList) {
      const list = [];
      for (let i = 0; i < participantList.length; i++) {
        const user = await dispatch("user/get", participantList[i], {
          root: true
        });
        list.push(user);
      }
      commit("SET_PARTICIPANT_LIST", list);
    },
    /**
     * Get facilitator user by id from db and set to store
     * @param {number} userId
     * @returns Promise<void>
     */
    async setFacilitatorUser({ commit, dispatch }, userId) {
      const user = await dispatch("user/get", userId, {
        root: true
      });
      commit("SET_FACILITATOR_LIST", user);
    },
    /**
     * Get secretary user by id from db and set to store
     * @param {number} userId
     * @returns Promise<void>
     */
    async setSecretaryUser({ commit, dispatch }, userId) {
      const user = await dispatch("user/get", userId, {
        root: true
      });
      commit("SET_SECRETARY_LIST", user);
    }
  },
  getters: {
    data: state => state.data,
    participantList: state => state.participantList,
    facilitatorUser: state => state.facilitatorUser,
    secretaryUser: state => state.secretaryUser
  },
  modules: {
    list
  }
};
