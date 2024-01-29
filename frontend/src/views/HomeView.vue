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
      <table>
        <thead>
          <tr>
            <th>Рекорд</th>
            <th>Игрок</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scores" :key="score.id">
            <td>{{ score.score }}</td>
            <td>{{ score.got_by.name }}</td>
            <td>{{ score.got_at_formatted }} назад</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
table{
  border: 1px solid #CDB1ED;
  text-align: center;
}
th{
  border: 1px solid #CDB1ED;
  text-align: center;
}
td{
  border: 1px solid #CDB1ED;
  text-align: center;
}
.home{
  text-align: center;
}
</style>
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