<template>
  <div class="register">
    <input class="form_input" type="text" placeholder="ФИО" v-model="user.fio">
    <input class="form_input" type="text" placeholder="Логин" v-model="user.login">
    <input class="form_input" type="password" placeholder="Пароль" v-model="user.password">
    <input class="form_input" type="submit" value="Зарегистрироваться" @keydown.enter="registerUser" @click="registerUser">
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
  .register {
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: column;
  }
  .form_input {
    margin-bottom: 5px;
    padding: 5px;
  }
</style>