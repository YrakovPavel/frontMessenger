<script setup>
  import axios from 'axios';
  import {useRoute} from "vue-router";
  import checkAuth from "@/auth/checkAuth.js";
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
  axios.defaults.baseURL = 'http://localhost:8080';

  checkAuth();

  const route = useRoute();

</script>

<template>
  <router-view :key="route.fullPath"></router-view>
</template>

<style scoped>
</style>
