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
    }
  },
  getters: {
    data: state => state.data,
    participantList: state => state.participantList,
    secretaryUser: state => state.secretaryUser
  },
  modules: {
    list
  }
};
