<template>
  <div class="login-page">
    <h1>Вход</h1>
    <form v-on:submit.prevent="submitForm">
      <label>E-mail:</label>
      <input type="email" name="email" placeholder="Введите ваш e-mail" v-model="form.email"><br><br>
      <label>Пароль:</label>
      <input type="password" name="password" placeholder="Введите ваш пароль" v-model="form.password"><br><br>

      <template v-if="errors.length > 0">
          <div>
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
      </template>

      <button>Войти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import router from "@/router"
import { useUserStore } from '@/stores/user'

export default {
  name: "LogIn",

  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },

  data() {
      return {
          form: {
            email: '',
            password: '',
          },
          errors: []
      }
  },

  methods: {
    async submitForm() {
      this.errors = []

      if (this.form.email === '') {
        this.errors.push('Вы не ввели ваш e-mail')
      }

      if (this.form.password === '') {
        this.errors.push('Вы не ввели ваш пароль')
      }

      if (this.errors.length === 0) {
        await axios
            .post('/api/login/', this.form)
            .then(response => {
              this.userStore.setToken(response.data)

              axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
            })
            .catch(error => {
              console.log('error', error)
            })

        await axios
            .get('/api/me/')
            .then(response => {
              this.userStore.setUserInfo(response.data)

              this.$router.push('/')
            })
            .catch(error => {
              console.log('error', error)
            })
      }
    }
  }
}
</script>