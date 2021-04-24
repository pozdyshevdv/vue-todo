<template>
  <v-app>
    <MainComponent />
  </v-app>
</template>

<script>
import MainComponent from "./components/MainComponent";

export default {
  name: 'App',

  components: {
    MainComponent,
  },

  data: () => ({
    //
  }),
  created() {
    if (localStorage.getItem('userList') != undefined) {
      this.$store.commit('setUserList', JSON.parse(localStorage.getItem('userList')));
    }
    if (localStorage.getItem('user') != undefined) {
      this.$store.commit('setUser', localStorage.getItem('user'));
      this.$store.commit('setAuth');
    }
    else {
      this.$store.commit("setUser", null)
    }
    if (localStorage.getItem('taskList') != undefined) {
      this.$store.commit('setTask', JSON.parse(localStorage.getItem('taskList')));
    }
  }
};
</script>
