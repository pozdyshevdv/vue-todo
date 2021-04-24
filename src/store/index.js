import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList: [],
    taskList: [],
    auth: false,
    user: null,
  },
  mutations: {
    setUserList (state, userList) {
      state.userList = userList;
    },
    setUser (state, user) {
      state.user = user;
    },
    setAuth (state) {
      state.auth = true;
    },
    setTask (state, taskList) {
      state.taskList = taskList
    },
    clearUser (state) {
      state.user = null;
      state.auth = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
