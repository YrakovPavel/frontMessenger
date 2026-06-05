<script setup>
  import AddChat from "@/components/main/AddChat.vue";
  import axios from "axios";
  import {onMounted, reactive, ref, shallowRef} from "vue";
  import ChatSender from "@/components/main/ChatSender.vue";
  import ChatRecipient from "@/components/main/ChatRecipient.vue";
  import {useAuthStore} from "@/stores/useAuthStore.js";

  const chats = ref([]);
  async function getChats(){
    axios.get('/chats/preview')
        .then(response =>{
          chats.value = response.data;
        })
        .catch(error =>{
          console.log(error);
        })
  }

  const messageToSend = ref({
    chat_id: null,
    text: null
  })

  async function sendMessage(){
      axios.post('/api/message/send', messageToSend.value)
          .then(response =>{
            messageToSend.value.text = null;
            getChatContent(messageToSend.value.chat_id);
          })
          .catch(error =>{
            console.log(error);
          })
  }

  const chatContent = ref([]);
  const chatComponents = shallowRef([]);

  async function getChatContent(chat_id){
    messageToSend.value.chat_id = chat_id;
    axios.get(`/chats/${chat_id}`)
        .then(response =>{
          chatComponents.value = [];
          chatContent.value = response.data;
          chatContent.value.forEach((message) =>{
            if (message["username"] === useAuthStore().username){
              chatComponents.value.push({
                type: ChatRecipient,
                props: {message}
              })
            }
            else{
              chatComponents.value.push({
                type: ChatSender,
                props: {message}
              })
            }
          })
        })
        .catch(error =>{
          console.log(error);
        })
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
           v-for="chat in chats" @click="getChatContent(chat.chat_id)">
          <img class="friend-avatar" :src="chat.avatarUrl" alt="avatar">
            <h6 class="friend-name">{{chat.name}}</h6>
            <small class="friend-time">3 days ago</small>
            <p class="friend-message">{{chat.text}}</p>
            <span class="friend-badge badge text-bg-primary rounded-pill">2</span>
        </a>
      </div>
      <div class="chat">
        <component v-for="item in chatComponents" :is="item.type" v-bind="item.props"/>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here"
                  id="floatingTextarea2" style="height: 100px"
                  v-model="messageToSend.text" @keydown.enter="sendMessage"></textarea>
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