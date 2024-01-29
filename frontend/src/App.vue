<template>
    <nav id="nav">
        <router-link to="/">Главная</router-link> |
        <router-link to="/game">Играть</router-link> |
        <router-link to="/login">Войти</router-link> |
        <router-link to="/signup">Зарегистрироваться</router-link>
    </nav>
    <router-view/>
</template>

<script>
    import axios from 'axios'
    import { useUserStore } from '@/stores/user'

    export default {
      name: 'App',

      setup() {
        const userStore = useUserStore()

        return {
          userStore
        }
      },

      beforeCreate() {
        this.userStore.initStore()

        const token = this.userStore.user.access

        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            axios.defaults.headers.common["Authorization"] = "";
        }
      },
    }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #CDB1ED;
  background: #19061F;
}

body {
    display: flex;
    justify-content: center;
    margin: 0;
    background: #19061F;
    overflow: hidden;
    text-align: center;
}

nav {
  background: #19061F;
  z-index: 1;
  position: sticky;
  width: 440px;
  padding: 30px;
  border: 5px solid #CDB1ED;

  a {
    font-weight: bold;
    color: #CDB1ED;

    &.router-link-exact-active {
      color: #714988;
    }
  }
}
</style>
<script setup lang="ts">
</script>