<template>
  <div>
    <h1>Вы вышли</h1>
  </div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    this.$store.commit('clearUser')
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    this.$router.push('/login');
  }
}
</script>

<style scoped>

</style>