<script setup>
  const props = defineProps(["message"])
</script>

<template>
  <div class="chat_sender" v-if="props">
    <h6 class="mb-1">{{ message.author }}</h6>
    <label>{{ message.message }}</label>
    <br>
    <small>{{ message.time }}</small>
  </div>
</template>

<style scoped>
  .chat_sender{
    background: lightgrey;
    align-self: flex-start;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    max-width: 50%;
    word-break: break-all;
  }
</style>