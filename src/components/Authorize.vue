<template>
  <v-form
      ref="form"
      lazy-validation
      class="authorizing_form"
      @keydown.enter="user_login"
  >

    <v-app-bar-title style="text-align: center; cursor: default">Авторизация</v-app-bar-title>

    <v-text-field
        v-model="login"
        label="Логин"
        required
    ></v-text-field>

    <v-text-field
        type="password"
        v-model="password"
        label="Пароль"
        required
    ></v-text-field>

    <v-alert
        v-if="message"
        type="error"
        class="mes"
    >
      {{message}}
    </v-alert>

    <v-btn
        color="success"
        @click="user_login"
        plain
        type="submit"
    >
      Войти
    </v-btn>

  </v-form>
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
  props: {
    title: String,
  },
  methods: {
    user_login() {
      let users = this.$store.state.userList;
      if (this.login == '' || this.password == '') {
        this.message = 'Необходимо заполнить все поля';
      }
      else {
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
    },
  }
}
</script>

<style scoped>
  .authorizing_form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 720px;
  }
</style>