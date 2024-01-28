<template>
  <div class="signup-page">
    <h1>Регистрация</h1>
    <form v-on:submit.prevent="submitForm">
      <label>E-mail:</label>
      <input type="email" placeholder="Введите ваш e-mail" name="email" v-model="form.email"><br><br>
      <label>Никнейм:</label>
      <input type="text" placeholder="Введите ваш никнейм" name="name" v-model="form.name"><br><br>
      <label>Пароль:</label>
      <input type="password" placeholder="Введите пароль" name="password1" v-model="form.password1"><br><br>
      <label>Повторите пароль:</label>
      <input type="password" placeholder="Введите пароль ещё раз" name="password2" v-model="form.password2"><br><br>

      <template v-if="errors.length > 0">
          <div>
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
      </template>

      <button>Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import router from "@/router";

export default {
  name: "SignUp",

  data(){
      return {
          form: {
            email: '',
            name: '',
            password1: '',
            password2: ''
          },
          errors: [],
      }
  },
  methods:{
    submitForm(){
      this.errors = []

      if (this.form.email === '') {
        this.errors.push('Вы не ввели ваш e-mail')
      }

      if (this.form.name === '') {
        this.errors.push('Вы не ввели ваше имя')
      }

      if (this.form.password1 === '') {
        this.errors.push('Вы не ввели пароль')
      }

      if (this.form.password1 !== this.form.password2) {
        this.errors.push('Пароли не совпадают')
      }

      if (this.errors.length === 0) {
        axios
            .post('/api/signup/', this.form)
            .then(response => {
              if (response.data.message === 'success') {
                this.$router.push('/login')
              } else {

              }
            })
            .catch(error => {
              console.log('error', error)
            })
      }
    }
  }
}

</script>