<script setup>
import AddChat from "@/components/main/Left/AddChat.vue";
import axios from "axios";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ChatPreview from "@/components/main/Left/ChatPreview.vue";
import AccountDropdown from "@/components/main/AccountDropdown.vue";
import webSocketClient from "@/webSocketClient.js";
import { useRoute, useRouter } from "vue-router";
import { useWindowSize } from "@vueuse/core";
import { useChatContentStore } from "@/useChatContentStore.js";

const chatStore = useChatContentStore();
const route = useRoute();
const router = useRouter();

const socketConnection = new webSocketClient(
  "http://localhost:8080/my-messenger-websocket",
);

//Добавления подписки на чат
function chatSubscription(chat) {
  socketConnection.subscribe(
    "chats",
    "/topic/chat/" + chat["chat_id"],
    (message) => {
      let parsedMessage = JSON.parse(message.body);
      if (parsedMessage["chat_id"] === currentChatId.value) {
        chatStore.addMessage(parsedMessage);
      }
      let chatPos = chats.value.findIndex(
        (item) => item["chat_id"] === chat["chat_id"],
      );
      chats.value[chatPos]["text"] = parsedMessage["text"];
      chats.value[chatPos]["time"] = parsedMessage["time"];
    },
  );
}

//Добавление подписки на новых пользователей
function userSubscription() {
  socketConnection.subscribe("users", "/user/queue/chats", (message) => {
    let parsedMessage = JSON.parse(message.body);
    chats.value.push(parsedMessage);
    chatSubscription(parsedMessage);
  });
}

//Добавление подписок на все чаты
function assignChatsSubscriptions() {
  for (let chat of chats.value) {
    chatSubscription(chat);
  }
}

socketConnection.pushOnConnectedCallback(assignChatsSubscriptions);
socketConnection.pushOnConnectedCallback(userSubscription);

const chats = ref([]);
const addChatRef = ref(null);

//Получить превью слева(Название чата, изображение, последнее сообщение)
async function getChatsPreview() {
  axios
    .get("/chats/preview")
    .then((response) => {
      chats.value = response.data;
      if (!chats.value.length) {
        addChatRef.value?.openModal();
      }
      assignChatsSubscriptions();
    })
    .catch((error) => {
      console.log(error);
    });
}

const findChatValue = ref("");
const currentChatId = ref(null);

//Выбрать чат приоритетным и открыть его сообщения
function focusOnChat(chat_id) {
  currentChatId.value = chat_id;
  if (window.innerWidth < 768) {
    router.replace({ name: "main-chat", params: { id: chat_id } });
  } else {
    router.push({ name: "main-chat", params: { id: chat_id } });
  }
}

//Для просмотра на телефоне
const width = useWindowSize().width;
const isMobile = computed(() => {
  return width.value <= 768;
});

const viewDialogue = computed(() => {
  return route.name === "main-chat";
});

onMounted(() => {
  getChatsPreview();
  userSubscription();
});

onBeforeUnmount(() => {
  socketConnection.disconnect();
});
</script>

<template>
  <div class="page">
    <div class="card-container">
      <nav class="navbar bg-primary">
        <input
          class="find-field form-control"
          type="search"
          placeholder="Поиск"
          aria-label="Search"
          v-model="findChatValue"
          v-if="!(isMobile && viewDialogue)"
        />
        <account-dropdown></account-dropdown>
      </nav>
      <div class="main">
        <div class="left" v-if="!(isMobile && viewDialogue)">
          <div class="list-group">
            <chat-preview
              v-for="chat in chats"
              :key="chat.chat_id"
              :chat="chat"
              :find="findChatValue"
              @click.prevent="focusOnChat(chat.chat_id)"
            />
          </div>
          <div class="addChat">
            <add-chat ref="addChatRef"></add-chat>
          </div>
        </div>
        <div class="right" v-if="!(isMobile && !viewDialogue)">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 4vh;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  height: 100vh;
  width: 100vw;
}

.card-container {
  width: 75%;
  height: 93%;
  padding: 0;
  border-radius: 15px;
  background: white;
}

.navbar {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 10px;
}

.find-field {
  width: 39%;
}

.main {
  display: flex;
  height: 93%;
  width: 100%;
  padding: 20px 20px 20px;
  gap: 20px;
}

.left {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
}

.list-group {
  height: 55vh;
  overflow-y: auto;
}

.addChat {
  width: 100%;
  align-self: flex-end;
}

.right {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

/* Для телефона */
@media (max-width: 768px) {
  .page {
    padding-top: 0;
    height: 100%;
  }

  .card-container {
    width: 100%;
    height: 100%;
  }

  .main {
    align-items: center;
    height: 100%;
  }

  .left {
    width: 100%;
    height: 100%;
  }

  .right {
    width: 100%;
    height: 100%;
  }
}
</style>
