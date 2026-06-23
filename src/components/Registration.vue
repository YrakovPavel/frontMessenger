<script setup>
  import {ref} from "vue";
  import axios from "axios";
  import {useRouter} from "vue-router";
  import checkAuth from "@/auth/checkAuth.js";

  const router = useRouter();

  const user = ref({
    role: "user",
    login: null,
    passwordHash: null,
    firstName: null,
    lastName: null,
    birthDate: null,
    avatarUrl: "",
  })

  const image = ref(null);

  function addAvatar(event){
    user.value.avatarUrl = event.target.files[0].name;
    image.value = event.target.files[0];
  }

  async function registration(){
    const formData = new FormData();
    formData.append('file', image.value);
    axios.post("/api/public/uploadAvatar", formData)
        .then(response =>{
          user.value.avatarUrl = response.data;
          axios.post('/api/public/registration', user.value)
          .then(response =>{
            router.push({name: "main"});
          })
          .catch(error =>{
            console.log(error)
          })
    })
  }
</script>

<template>
  <div class="page">
    <div class="container">
      <h1>
        Регистрация
      </h1>
      <form class="mb-3" @submit.prevent>
        <div class="form-floating">
          <input id="login" type="text" class="form-control" placeholder="Логин" v-model="user.login">
          <label for="login">Логин</label>
        </div>
        <br>
        <div class="form-floating">
          <input id="password" type="password" class="form-control" placeholder="Пароль" v-model="user.passwordHash">
          <label for="password">Пароль</label>
        </div>
        <br>
        <div class="form-floating">
          <input id="firstName" type="text" class="form-control" placeholder="Имя" v-model="user.firstName">
          <label for="firstName">Имя</label>
        </div>
        <br>
        <div class="form-floating">
          <input id="lastName" type="text" class="form-control" placeholder="Фамилия" v-model="user.lastName">
          <label for="lastName">Фамилия</label>
        </div>
        <br>
        <div class="form-floating">
          <input id="birthDate" type="date" class="form-control" placeholder="Дата рождения" v-model="user.birthDate">
          <label for="birthDate">Дата рождения</label>
        </div>
        <br>
        <div>
          <label for="avatar">Фото профиля</label>
          <input id="avatar" type="file" accept=".jpg, .jpeg, .png" class="form-control" @change="addAvatar($event)">
        </div>
        <br>
        <button @click="registration" class="form-control btn btn-primary">Зарегистрироваться</button>
      </form>
     <router-link to="login">Войти</router-link>
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
    justify-content: center;
    align-items: center;
    background: white;
    text-align: center;
    width: 30%;
  }

  h1{
    text-align: center;
    width: 100%;
    margin: 0 auto 20px;
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