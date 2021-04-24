<template>
  <div class="authorizing_form">
    <input class="form_input" type="text" placeholder="Логин" v-model="login">
    <input class="form_input" type="password" placeholder="Пароль" v-model="password">
    <input class="form_input" type="submit" value="Войти" @keydown.enter="user_login" @click="user_login">
    <div v-if="message" class="error">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Authorize",
  data() {
    return {
      login: '',
      password: '',
      message: '',
    }
  },
  methods: {
    user_login() {
      let users = this.$store.state.userList;
      if (users != null) {
        let user = users.find(item => item.login === this.login && item.password === this.password);
        if (user != undefined) {
          this.$store.commit('setAuth');
          this.$store.commit('setUser', user);
          localStorage.setItem('auth', "true");
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/todolist');
        }
        else {
          this.message = 'Неверное имя пользователя или пароль';
        }
      }
      else {
        this.message = 'Ошибка';
      }
    }
  }
}
</script>

<style scoped>
  .authorizing_form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 400px;
  }
  .form_input {
    margin-bottom: 15px;
    height: 32px;
    font-size: 24px;
  }
  .error {
    color: darkred;
  }
</style>