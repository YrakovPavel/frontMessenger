<script setup>
  import {computed} from "vue";

  const props = defineProps(["message"])

  const messageTime = computed(()=>{
    let timeDate = new Date(props.message.time);
    let hours = timeDate.getHours().toString().padStart(2, "0");
    let minutes = timeDate.getMinutes().toString().padStart(2, "0");
    return hours + ":" + minutes;
  })

</script>

<template>
  <div class="chat_sender">
    <h6 class="mb-1">{{ message.username }}</h6>
    <label>{{ message.text }}</label>
    <br>
    <small>{{ messageTime}}</small>
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
    word-break: break-all;
  }
</style>