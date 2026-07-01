<script setup>
import { computed } from "vue";

const props = defineProps(["chat", "find"]);
const timeNow = new Date();

const getTime = computed(() => {
  let timeDate = new Date(props.chat.time);
  let timeDifference = (timeNow.getTime() - timeDate.getTime()) / 86400000; //Переводим разницу в дни (1000 * 60 * 60 * 24);

  if (timeDifference > 6) {
    return timeDate.toLocaleDateString("de-DE");
  }

  if (timeNow.toDateString() !== timeDate.toDateString()) {
    return timeDate.toLocaleString("ru-RU", { weekday: "short" });
  }

  return timeDate.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
});

const getText = computed(() => {
  return !props.chat.text
    ? "(Напишите свое первое сообщение)"
    : props.chat.text;
});
</script>

<template>
  <a
    href="#"
    class="friend list-group-item list-group-item-action"
    v-if="props.chat.name.includes(find)"
  >
    <img class="friend-avatar" :src="props.chat.avatarUrl" alt="avatar" />
    <h6 class="friend-name">{{ props.chat.name }}</h6>
    <small class="friend-time">{{ getTime }}</small>
    <p class="friend-message">{{ getText }}</p>
    <!--   <span class="friend-badge badge text-bg-primary rounded-pill">2</span> !-->
  </a>
</template>

<style scoped>
.friend {
  padding: 2px 2px;
  display: grid;
  grid-auto-columns: 2fr 1fr 5fr 2fr;
  grid-template-areas:
    "a b b d e e"
    "a c c c c m";
}

h6 {
  text-align: left;
}

.friend-avatar {
  margin: 5px;
  grid-area: a;
  border-radius: 100%;
  max-height: 7vh;
  max-width: 7vh;
}

.friend-name {
  margin: 5px;
  grid-area: b;
}

.friend-time {
  grid-area: e;
  text-align: end;
  margin-right: 12px;
}

.friend-message {
  grid-area: c;
  text-align: left;
  margin-left: 5px;
  margin-right: 5px;
}

.friend-badge {
  max-height: 2.5vh;
  max-width: 2.5vh;
  grid-area: m;
}
</style>
