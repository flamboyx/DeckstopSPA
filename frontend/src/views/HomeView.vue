<template>
  <div class="home">
    <h1>Домашняя страница</h1>

    <span v-if="userIsLoggedIn" >{{ user_data }}</span>
    <br><br>
    <button v-if="userIsLoggedIn" @click="logout">Выйти</button>

    <div>
      <div>
        <h2>Таблица рекордов</h2>
      </div>

      <div v-for="score in scores" v-bind:key="score.id">
        <div>
          <h1>{{ score.score }}</h1>
          <p>{{ score.got_by.name }}</p>
          <p>{{ score.got_at_formatted }} назад</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',

  data() {
    return{
      user_data: '',
      scores: [],
    }
  },

  computed: {
    userIsLoggedIn() {
      return !localStorage.getItem('access');
    }
  },

  mounted() {
    this.getMe()
    this.getScores()
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
    },

    getScores() {
      axios
          .get('/api/scoreboard/')
          .then(response => {
            this.scores = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
});
</script>