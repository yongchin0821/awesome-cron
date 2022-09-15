<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import CronParser from "./components/CronParser.vue";
// import Cron from "cron-converter";
import CronParser from "awesome-cron/src/cronParser";
// import cronParser from "awesome-cron/src/cronParser/cronParser.vue";
// console.log(CronParser);
</script>

<template>
  <h1 class="title">awesome-cron</h1>
  <p style="font-size: 18px">Just a cron parser, cron is awesome</p>
  <cron-parser />
  <!-- <CronParser></CronParser> -->
  <p>
    Supports 5, 6 (w/ seconds or year), or 7 (w/ seconds and year) part cron
    expressions
  </p>
  <p class="read-the-docs">Powered by ririko</p>
  <k-button>fdsfds</k-button>
</template>

<style scoped>
@import "./assets/font/fonts.css";
.title {
  font-family: myfavfont;
  font-size: 5em;
}
.read-the-docs {
  color: #888;
}
</style>
