<template>
  <nav>
    <router-link to="/">Home</router-link> |
<<<<<<< HEAD
    <router-link to="/about">About</router-link>
=======
    <router-link to="/about">About</router-link> |
    <router-link to="/sign-up">Sign up</router-link> |
    <router-link to="/log-in">Log in</router-link>
>>>>>>> origin/main
  </nav>
  <router-view/>
</template>

<<<<<<< HEAD
=======
<script setup lang="ts">
import axios from "axios"

export default {
  name: 'App',
  beforeCreate() {
    this.$store.commit("initializeStore")

    const access = this.$store.state.access

    if (access) {
      axios.defaults.headers.common['Authorization'] = 'JWT' + access
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  }
}
</script>

>>>>>>> origin/main
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> origin/main
