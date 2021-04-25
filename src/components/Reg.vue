<template>
  <v-form
      ref="form"
      lazy-validation
      class="register"
  >

    <v-app-bar-title style="text-align: center; cursor: default">Регистрация</v-app-bar-title>

    <v-text-field
        v-model="user.fio"
        label="ФИО"
        required
    ></v-text-field>

    <v-text-field
        v-model="user.login"
        label="Логин"
        required
    ></v-text-field>

    <v-text-field
        type="password"
        v-model="user.password"
        label="Пароль"
        required
    ></v-text-field>

    <v-text-field
        v-if="user.password !== null"
        type="password"
        v-model="password_confirm"
        label="Подтвердите пароль"
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
        @keydown.enter="registerUser"
        @click="registerUser"
        plain
        type="submit"
    >
      Зарегистрироваться
    </v-btn>

  </v-form>
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
      },
      password_confirm : '',
      message : '',
    }
  },
  methods: {
    registerUser() {
      if (this.user.password === null || this.user.login === null || this.user.fio === null || this.password_confirm === null) {
        this.message = 'Все поля обязательны для заполнения';
      }
      else if (this.user.password === this.password_confirm) {
        let user_exist = this.$store.state.userList.find(item => item.login === this.user.login);
        if (user_exist != undefined) {
          this.message = 'Такой логин занят';
        }
        else {
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
      else {
        this.message = 'Пароли не совпадают';
      }
    }
  }
}
</script>

<style scoped>
  .register {
    margin: 0 auto;
    width: 720px;
    display: flex;
    flex-direction: column;
  }
  .form_input {
    margin-bottom: 5px;
    padding: 5px;
  }
</style>