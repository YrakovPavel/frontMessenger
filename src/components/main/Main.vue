<script setup>
import AddChat from "@/components/main/AddChat.vue";
import axios from "axios";
import {markRaw, onBeforeUnmount, onMounted, ref} from "vue";
import ChatSender from "@/components/main/ChatSender.vue";
import ChatRecipient from "@/components/main/ChatRecipient.vue";
import {useAuthStore} from "@/auth/useAuthStore.js";
import ChatPreview from "@/components/main/ChatPreview.vue";
import AccountDropdown from "@/components/main/AccountDropdown.vue";
import webSocketClient from "@/webSocketClient.js";

  const socketConnection = new webSocketClient('http://localhost:8080/my-messenger-websocket');

  //Добавления подписки на чат
  function chatSubscription(chat){
    socketConnection.subscribe('chats', '/topic/chat/' + chat["chat_id"],
        (message) => {
          let parsedMessage = JSON.parse(message.body);
          if (parsedMessage["chat_id"] === currentChatId.value){
            chatContent.value.push(parsedMessage);
            createMessage(parsedMessage);
          }
          let chatPos = chats.value.findIndex(item => item["chat_id"] === chat["chat_id"]);
          chats.value[chatPos]["text"] = parsedMessage["text"];
          chats.value[chatPos]["time"] = parsedMessage["time"];
        })
  }

  //Добавление подписки на новых пользователей
  function userSubscription(){
    socketConnection.subscribe('users', '/user/queue/chats',
        (message) =>{
          let parsedMessage = JSON.parse(message.body);
          chats.value.push(parsedMessage);
          chatSubscription(parsedMessage);
    });
  }

  //Добавление подписок на все чаты
  function assignChatsSubscriptions(){
    for (let chat of chats.value) {
      chatSubscription(chat);
    }
  }

  socketConnection.pushOnConnectedCallback(assignChatsSubscriptions);
  socketConnection.pushOnConnectedCallback(userSubscription);

  //Контентное наполнение страницы(Чаты, сообщения)
  const chatContent = ref([]);
  const chatComponents = ref([]);

  //Создать компонент(Сообщение)
  function createMessage(message){
    if (message["username"] === useAuthStore().username){
      chatComponents.value.push({
        type: markRaw(ChatRecipient),
        props: {message}
      })
    }
    else{
      chatComponents.value.push({
        type: markRaw(ChatSender),
        props: {message}
      })
    }
  }

  //Получить содержание чата(список сообщений в диалоге)
  async function getChatContent(){
    axios.get(`/chats/${currentChatId.value}`)
        .then(response =>{
          chatComponents.value = [];
          chatContent.value = response.data;
          chatContent.value.forEach((message) =>{
            createMessage(message);
          })
        })
        .catch(error =>{
          console.log(error);
        })
  }

  const chats = ref([]);
  const addChatRef = ref(null);

  //Получить превью слева(Название чата, изображение, последнее сообщение)
  async function getChatsPreview(){
    axios.get('/chats/preview')
        .then(response =>{
          chats.value = response.data;
          if (!chats.value.length){
            addChatRef.value?.openModal();
          }
          assignChatsSubscriptions();
        })
        .catch(error =>{
          console.log(error);
        })
  }

  const findChatValue = ref("");

  const messageToSend = ref(null);
  const currentChatId = ref(null);

  async function sendMessage(){
      axios.post('/api/message/send', {
        chat_id: currentChatId.value,
        text: messageToSend.value
      })
          .then(response =>{
            messageToSend.value = null;
          })
          .catch(error =>{
            console.log(error);
          })
  }

  //Выбрать чат приоритетным и открыть его сообщения
  function focusOnChat(chat_id){
    currentChatId.value = chat_id;
    getChatContent();
  }

  onMounted(()=>{
    getChatsPreview();
    userSubscription();
  })

  onBeforeUnmount(() => {
    socketConnection.disconnect();
  });

</script>

<template>
  <div class="page">
    <div class="container">
      <nav class="navbar bg-primary">
          <input class="find-field form-control" type="search" placeholder="Поиск"
                 aria-label="Search" v-model="findChatValue">
          <account-dropdown></account-dropdown>
      </nav>
      <div class="main">
        <div class="list-group">
          <chat-preview v-for="chat in chats" :key="chat.chat_id" :chat="chat"
                        :find="findChatValue" @click="focusOnChat(chat.chat_id)"/>
        </div>
        <div class="chat">
          <component v-for="item in chatComponents" :is="item.type" v-bind="item.props"/>
        </div>
        <div class="form-floating" v-if="currentChatId">
          <textarea class="form-control" placeholder="Leave a comment here"
                    id="floatingTextarea2" style="height: 100px"
                    v-model="messageToSend" @keydown.enter="sendMessage"></textarea>
            <label for="floatingTextarea2">Комментарий...</label>
        </div>
        <add-chat ref="addChatRef"></add-chat>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .page{
    height: 100vh;
    display: flex;
    padding: 2%;
  }

  .container{
    padding: 0;
    border-radius: 15px;
    background: white;
  }

  .main{
    padding: 20px 20px 20px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-areas:
        "a b"
        "c d";
    gap: 10px;
    text-align: center;
    height: 85vh;
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

  .find-field{
    width: 39%;
  }

  .list-group{
    height: 55vh;
    overflow-y: auto;
  }

  .chat{
    display: flex;
    flex-direction: column;
    padding: 60px;
    height: 55vh;
    overflow-y: auto;
  }

  textarea{
    resize: none;
  }

  .form-floating{
    grid-area: d;
    margin: 10px;
  }
</style>