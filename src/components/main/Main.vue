<script setup>
import AddChat from "@/components/main/AddChat.vue";
import axios from "axios";
import {markRaw, onMounted, ref} from "vue";
import {Client} from "@stomp/stompjs";
import ChatSender from "@/components/main/ChatSender.vue";
import ChatRecipient from "@/components/main/ChatRecipient.vue";
import {useAuthStore} from "@/stores/useAuthStore.js";

  //Добавление подписок в веб сокет
  function assignChatsSubscriptions(){
    for (let chat of chats.value) {
      subscriptions.chats.push(stompClient.subscribe('/topic/chat/' + chat["chat_id"],
          (message) => {
            let parsedMessage = JSON.parse(message.body);
            if (parsedMessage["chat_id"] === currentChatId.value){
              chatContent.value.push(parsedMessage);
              createMessage(parsedMessage);
            }
            chat["text"] = parsedMessage["text"];
          }));
    }
  }

  //Настройка веб сокета
  const subscriptions = {
    chats: [],
    users: null
  }
  const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/my-messenger-websocket',
    debug(str){
      console.log(str);
    },
    reconnectDelay: 5000, // Auto-reconnect after 5 seconds if dropped
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  stompClient.onConnect = (frame) =>{
    console.log("Connected", frame);
    assignChatsSubscriptions();
  };

  stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  };

  stompClient.activate();

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

  //Получить превью слева(Название чата, изображение, последнее сообщение)
  async function getChats(){
    axios.get('/chats/preview')
        .then(response =>{
          chats.value = response.data;
          assignChatsSubscriptions();
        })
        .catch(error =>{
          console.log(error);
        })
  }

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
    getChats();
  })

</script>

<template>
  <div class="page">
    <div class="container">
      <div class="list-group">
        <a href="#" class="friend list-group-item list-group-item-action"
           v-for="chat in chats" @click="focusOnChat(chat.chat_id)">
          <img class="friend-avatar" :src="chat.avatarUrl" alt="avatar">
            <h6 class="friend-name">{{chat.name}}</h6>
            <small class="friend-time">3 days ago</small>
            <p class="friend-message">{{chat.text}}</p>
         <!--   <span class="friend-badge badge text-bg-primary rounded-pill">2</span> !-->
        </a>
      </div>
      <div class="chat">
        <component v-for="item in chatComponents" :is="item.type" v-bind="item.props"/>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here"
                  id="floatingTextarea2" style="height: 100px"
                  v-model="messageToSend" @keydown.enter="sendMessage"></textarea>
        <label for="floatingTextarea2">Comment</label>
      </div>
      <add-chat></add-chat>
    </div>
  </div>
</template>

<style scoped>
  .page{
    padding-top: 1px;
    padding-bottom: 1px;
    min-height:100vh;
    min-width:100vh;
  }

  .container{
    border-radius: 15px;
    margin: 5% auto;
    padding: 20px 20px 20px;
    min-height: 78vh;
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-areas:
        "a b"
        "c d";
    text-align: center;
    background: white;
  }

  .list-group{
    height: 60vh;
    overflow-y: auto;
  }

  .chat{
    display: flex;
    flex-direction: column;
    padding: 60px;
    height: 60vh;
    overflow-y: auto;
  }

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

  textarea{
    resize: none;
  }

  .form-floating{
    grid-area: d;
    margin: 10px;
  }
</style>