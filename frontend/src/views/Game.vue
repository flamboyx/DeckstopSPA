<template>
  <body>
    <div class="road">
      <img class="stars stars_1" src="../images/stars_1.png">
      <img class="stars stars_2" src="../images/stars_2.png">
      <img class="bg_sprite nebula_1" src="../images/nebula_1.png">
      <img class="bg_sprite nebula_2" src="../images/nebula_2.png">
    </div>
    <img id="player" src="../images/player.png">

    <img class="enemy" src="../images/enemy.png">

    <button type="button" id="pause_button">
      <img id="pause" src="../images/pause.png">
      <img id="play" src="../images/play.png">
    </button>

  </body>
</template>

<script src="../game.ts">
</script>

<style>
@import '../styles/style.css';
</style>