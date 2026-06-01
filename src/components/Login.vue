<script setup>

import {ref} from "vue";
import axios from "axios";
import {useAuthStore} from "@/auth.js";
import {useRouter} from "vue-router";

const user = ref({
  username: null,
  password: null
})

const router = useRouter();

async function login(){
  const params = new URLSearchParams();
  params.append('username', user.value.username);
  params.append('password', user.value.password);

  axios.post('/api/login', params)
      .then(response =>{
        useAuthStore().isAuthenticated = true;
        router.push({name: "main"});
      })
      .catch(error =>{
        console.log(error)
      })
}
</script>

<template>
  <div class="page">
    <div class="container">
      <h1>Добро пожаловать в MyMessenger!</h1>
      <form @submit.prevent>
        <div class="form-floating">
          <input id="login" type="text" class="form-control" placeholder="Логин" v-model="user.username">
          <label for="login">Логин</label>
        </div>
        <br>
        <div class="form-floating">
          <input id="password" type="password" class="form-control" placeholder="Пароль" v-model="user.password">
          <label for="password">Пароль</label>
        </div>
        <br>
        <button @click="login" class="form-control btn btn-primary">Войти</button>
      </form>
     <router-link to="registration">Зарегистрироваться</router-link>
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
    padding: 40px;
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: white;
    width: 30%;
  }

  .form-floating{
    width: 70%;
    margin: 0 auto;
  }

  .btn{
    width: 70%;
    margin: 0 auto 10px;
  }

  h1{
    text-align: center;
    width: 100%;
    margin: 0 auto 50px;
  }

  @media (max-width: 768px){

    .container{
      width: 90%;
      min-height: auto;

      padding: 25px;
    }

    h1{
      font-size: 32px;
    }

    .form-control,
    .btn{
      font-size: 18px;
      height: 55px;
    }

    label{
      font-size: 18px;
    }
  }
</style>