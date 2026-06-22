<script setup>
import {ref, onMounted, watch} from "vue";
  import {Modal} from 'bootstrap';
  import axios from "axios";

  const ModalElement = ref(null);
  let ModalInstance = null;

  const login = ref(null);

  onMounted(() =>{
    ModalInstance = new Modal(ModalElement.value);
  })

  function openModal(){
    ModalInstance.show();
  }

  function closeModal(){
    ModalInstance.hide();
  }

  function AddChat(){
    axios.post("/api/chat/create/dialogue", {login: login.value})
        .then(response =>{
          ModalInstance.hide();
        })
        .catch(error =>{
          console.log(error)
        })
  }

  defineExpose({
    openModal
  });

</script>

<template>
  <button type="button" class="newChat btn btn-primary" @click="openModal">
    Добавить чат
  </button>

  <div class="modal fade" ref="ModalElement" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Начать диалог</h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input id="login" type="text" class="form-control" placeholder="Логин пользователя" v-model="login">
        </div>
        <button type="button" class="btn btn-primary" @click="AddChat">Добавить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .newChat{
    place-self: center;
    width: 100%;
    height: 50%;
  }
</style>