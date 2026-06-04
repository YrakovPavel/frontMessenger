<script setup>
  const props = defineProps(["message"])
</script>

<template>
  <div class="chat_recipient">
    <h6 class="mb-1">{{ message.author }}</h6>
    <label>{{ message.message }}</label>
    <br>
    <small>{{ message.time }}</small>
  </div>
</template>

<style scoped>
  .chat_recipient{
    background: dodgerblue;
    align-self: flex-end;
    text-align: left;
    color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    max-width: 50%;
    word-break: break-all;
  }
</style>