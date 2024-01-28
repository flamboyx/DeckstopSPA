<template>
  <div class="home">
    <h1>Домашняя страница</h1>

    <span v-if="userIsLoggedIn" >{{ user_data }}</span>
    <br><br>
    <button v-if="userIsLoggedIn" @click="logout">Выйти</button>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',

  props: {
    store: Object
  },

  data() {
    return{
      user_data: ''
    }
  },

  computed: {
    userIsLoggedIn() {
      return !localStorage.getItem('access');
    }
  },

  mounted() {
    this.getMe()
  },

  methods:{
    getMe() {
      axios
          .get("/api/me/")
          .then(response => {
            console.log('data', response.data)

            this.user_data = response.data.name
          })
          .catch(error => {
            console.log('error', error)
          })
    },

    logout()  {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      if (this.$props.store) {
        this.$props.store.commit('clearAccess');
        this.$props.store.commit('clearRefresh');
      }
      this.user_data = '';
      this.$router.push('/login');
    }
  }
});
</script>