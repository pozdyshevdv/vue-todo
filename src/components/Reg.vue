<template>
  <div>
    <input class="form_input" type="text" placeholder="ФИО" v-model="user.fio">
    <input class="form_input" type="text" placeholder="Логин" v-model="user.login">
    <input class="form_input" type="password" placeholder="Пароль" v-model="user.password">
    <input class="form_input" type="submit" value="Зарегистрироваться" @click="registerUser">
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {
    return {
      user: {
        fio: null,
        login: null,
        password: null,
      }
    }
  },
  methods: {
    registerUser() {
      let users = this.$store.state.userList;
      users.push(this.user);
      this.$store.commit('setUserList', users);
      localStorage.setItem('userList', JSON.stringify(users));
      this.$store.commit('setAuth');
      this.$store.commit('setUser', this.user);
      localStorage.setItem('auth', "true");
      localStorage.setItem('user', JSON.stringify(this.user));
      this.$router.push('/todolist');
    }
  }
}
</script>

<style scoped>

</style>