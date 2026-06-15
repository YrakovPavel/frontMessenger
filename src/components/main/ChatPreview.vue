<script setup>
  const props = defineProps(["chat"]);
</script>

<template>
  <a href="#" class="friend list-group-item list-group-item-action">
    <img class="friend-avatar" :src="chat.avatarUrl" alt="avatar">
    <h6 class="friend-name">{{chat.name}}</h6>
    <small class="friend-time">3 days ago</small>
    <p class="friend-message">{{chat.text}}</p>
    <!--   <span class="friend-badge badge text-bg-primary rounded-pill">2</span> !-->
  </a>
</template>

<style scoped>
  .friend{
    padding: 2px 2px;
    display: grid;
    grid-auto-columns: 2fr 1fr 5fr 2fr;
    grid-template-areas:
          "a b b d e e"
          "a c c c c m";
  }

  h6{
    text-align: left;
  }

  .friend-avatar{
    margin: 5px;
    grid-area: a;
    border-radius: 100%;
    max-height: 7vh;
    max-width: 7vh;
  }

  .friend-name{
    margin: 5px;
    grid-area: b;
  }

  .friend-time{
    grid-area: e;
  }

  .friend-message{
    grid-area: c;
    text-align: left;
    margin-left: 5px;
    margin-right: 5px;
  }

  .friend-badge{
    max-height: 2.5vh;
    max-width: 2.5vh;
    grid-area: m;
  }
</style>