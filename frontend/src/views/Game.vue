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
  </body>
</template>

<script lang="ts">
import { game } from '@/game';

export default {
    mounted() {
        game()
    },
    methods: {
        game,
    },
}
</script>

<style>
@import '@/styles/style.css';
</style>