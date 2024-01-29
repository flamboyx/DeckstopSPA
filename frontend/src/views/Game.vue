<template>
  <body>
    <div id="road">
      <img class="stars stars_1 stars_1_1" src="../images/stars_1.png">
      <img class="stars stars_1 stars_2_1" src="../images/stars_2.png">
      <img class="stars stars_2 stars_1_2" src="../images/stars_1.png">
      <img class="stars stars_2 stars_2_2" src="../images/stars_2.png">
      <img class="bg_sprite nebula_1" src="../images/nebula_2.png">
      <img class="bg_sprite nebula_2" src="../images/nebula_1.png">
      <img id="player" src="../images/player.png">
    </div>
    <div id="info">
      <h1>HiScore <i><b id="hiscore"></b></i></h1>
      <h1>Score <i><b id="score"></b></i></h1>
      <br>
      <h1>Life <b id="lives">&lt3 &lt3 &lt3</b></h1>
      <h1>Ability </h1>
      <br>
      <h1>Power </h1>
      <h1>Grace </h1>
    </div>

    <button type="button" id="pause_button">
      <img id="pause" src="../images/pause.png">
      <img id="play" src="../images/play.png">
    </button>

    <div id="game_over">
      <p><b>Game Over</b></p>

      <button type="button" id="retry_button" class="game_button">Retry</button>
    </div>
  </body>
</template>

<script>
import { game } from '@/game';
import axios from 'axios';

export default {
    name: 'Game',

    data() {
        return {
            score: 0,
        }
    },

    mounted() {
        game()
    },

    methods: {
        game,

        sendScore() {
            console.log('sendScore', this.score)

            axios
                .post('/api/scoreboard/create/', {
                  'score': this.score
                })
                .then(response => {
                  console.log('data', response.data)
                })
                .catch(error => {
                  console.log('error', error)
                })
        },
    },
}
</script>

<style>
@import '@/styles/style.css';
</style>