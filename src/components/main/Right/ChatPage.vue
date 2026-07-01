<script setup>
import { markRaw, ref, watch } from "vue";
import { useAuthStore } from "@/auth/useAuthStore.js";
import ChatRecipient from "@/components/main/Right/ChatRecipient.vue";
import ChatSender from "@/components/main/Right/ChatSender.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useChatContentStore } from "@/useChatContentStore.js";

const chatStore = useChatContentStore();
const authStore = useAuthStore();
const route = useRoute();

//Контентное наполнение страницы(Чаты, сообщения)
const chatComponents = ref([]);

//Создать компонент(Сообщение)
function createMessage(message) {
  if (message["username"] === authStore.state.username) {
    chatComponents.value.push({
      type: markRaw(ChatRecipient),
      props: { message },
    });
  } else {
    chatComponents.value.push({
      type: markRaw(ChatSender),
      props: { message },
    });
  }
}

const messageToSend = ref(null);

async function sendMessage() {
  axios
    .post("/api/message/send", {
      chat_id: route.params.id,
      text: messageToSend.value,
    })
    .then(() => {
      messageToSend.value = null;
    })
    .catch((error) => {
      console.log(error);
    });
}

//Получить содержание чата(список сообщений в диалоге)
async function getChatContent(chat_id) {
  axios
    .get(`/chats/${chat_id}`)
    .then((response) => {
      chatStore.$reset();
      chatComponents.value = [];
      for (let message of response.data) {
        chatStore.addMessage(message);
        createMessage(message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//При смене чата загрузить его сообщения
watch(
  () => route.params.id,
  (id) => {
    if (!id) return;
    getChatContent(id);
  },
  { immediate: true },
);

//При добавлении новых сообщений отобразить их
watch(
  () => chatStore.chat.length,
  (newLength, oldLength) => {
    if (
      newLength > oldLength &&
      chatStore.chat[newLength - 1]["chat_id"] == route.params.id
    ) {
      createMessage(chatStore.chat[newLength - 1]);
    }
  },
);
</script>

<template>
  <div>
    <div class="chat">
      <component
        v-for="item in chatComponents"
        :key="item.props['chat_id']"
        :is="item.type"
        v-bind="item.props"
      />
    </div>
    <div class="form-floating" v-if="route.params.id">
      <textarea
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea2"
        style="height: 100px"
        v-model="messageToSend"
        @keydown.enter="sendMessage"
      ></textarea>
      <label for="floatingTextarea2">Комментарий...</label>
    </div>
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  padding: 60px;
  height: 55vh;
  overflow-y: auto;
}

textarea {
  margin-top: 9vh;
  resize: none;
}

.form-floating {
  grid-area: d;
  margin: 10px;
}
</style>
