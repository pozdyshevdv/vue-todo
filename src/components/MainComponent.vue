<template>
  <div>
    <div class="links">
      <router-link v-if="$store.state.auth === true" to="/todolist">Домой</router-link>
      <router-link v-if="$store.state.auth === true" to="/logout">Выход</router-link>
      <router-link v-if="$store.state.auth === false" to="/login">Авторизация</router-link>
      <router-link v-if="$store.state.auth === false" to="/reg">Регистрация</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'MainComponent',
  }
</script>

<style scoped>
  .links {
    margin: 20px auto;
    padding: 5px;
    border: 2px solid #cccccc;
    display: flex;
    justify-content: space-around;
    width: 400px;
  }
</style>