<template>
  <v-card
      class="mx-auto overflow-hidden main_card"
      height="400"
  >
    <v-app-bar
        color="deep-purple"
        dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title v-if="$store.state.auth === true">
        Привет, {{$store.state.user.login}}
      </v-toolbar-title>

    </v-app-bar>

    <router-view class="content"></router-view>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >

          <router-link tag="v-list-item" v-if="$store.state.auth === true" to="/todolist">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Домой
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link tag="v-list-item" v-if="$store.state.auth === false" to="/login">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-login-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Авторизация
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link tag="v-list-item" v-if="$store.state.auth === false" to="/reg">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Регистрация
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link tag="v-list-item" v-if="$store.state.auth === true" to="/logout">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Выход
              </v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </v-card>
</template>


<script>
  export default {
    name: 'MainComponent',
    data () {
      return {
        drawer: false,
        group: null,
      }
    },
  }
</script>

<style scoped>
  .links {
    margin: 0 auto 60px;
    margin-top: 180px;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    width: 400px;
    background-color: #8C64FF;
    border-radius: rounded-t-xl;
  }
  .content {
    padding: 20px;
  }
  .main_card {
    display: table;
    margin: 180px auto;
    width: 720px;
    height: auto;
  }
</style>