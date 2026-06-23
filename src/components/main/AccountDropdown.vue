<script setup>
  import {useAuthStore} from "@/auth/useAuthStore.js";
  import {onMounted, ref} from "vue";
  import {Modal} from "bootstrap";
  import axios from "axios";
  import router from "@/router.js";

  //Нажатие в меню навигации на свой аккаунт
  const toggleOpen = ref(false);
  function toggleDropdown(){
    toggleOpen.value = !toggleOpen.value;
  }

  //Выход из аккаунта
  async function logout(){
    axios.post("/api/logout")
        .then(response =>{
          useAuthStore().$reset();
          router.push({name: "home"});
        })
        .catch(error =>{
          console.log(error);
        })
  }

  const profile = ref({
    login: null,
    first_name: null,
    last_name: null,
    birth_date: null,
    avatar_url: null
  });

  async function getProfile(){
    axios.get('/api/profile/get')
        .then(response =>{
          profile.value.login = response.data["login"];
          profile.value.first_name = response.data["first_name"];
          profile.value.last_name = response.data["last_name"];
          profile.value.birth_date = response.data["birth_date"].split("-").reverse().join(".");
          profile.value.avatar_url = response.data["avatar_url"];
        })
        .catch(error =>{
          console.log(error);
        })
  }

  //Настройка окна профиля
  const ProfileModalElement = ref(null);
  let ProfileModalInstance = null;

  function openModal(){
    getProfile();
    ProfileModalInstance.show();
  }

  function closeModal(){
    ProfileModalInstance.hide();
  }

  onMounted(()=>{
    ProfileModalInstance = new Modal(ProfileModalElement.value);

    // закрытие своего аккаунта по клику вне
    document.addEventListener('click', (event)=>{
      const dropdown = document.querySelector('.dropdown')
      if (dropdown && !dropdown.contains(event.target)) {
        toggleOpen.value = false
      }
    });

  })
</script>

<template>
  <div class="dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" @click="toggleDropdown" :aria-expanded=toggleOpen>
      {{useAuthStore().username}}
    </a>
    <ul class="dropdown-menu" v-if="toggleOpen">
      <li><a class="dropdown-item" href="#" @click="openModal">Профиль</a></li>
      <li><a class="dropdown-item" href="#" @click="logout">Выйти</a></li>
    </ul>
  </div>

  <div class="modal fade" ref="ProfileModalElement" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Профиль {{profile.login}}</h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="profile.avatar_url" alt="avatar">
          <label>
            <b>Имя: </b>{{profile.first_name}}
          </label>
          <label>
            <b>Фамилия: </b>{{profile.last_name}}
          </label>
          <label>
            <b>Дата рождения: </b>{{profile.birth_date}}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .dropdown {
    margin-left: auto;
    margin-right: 20px;
    color: white;
    position: relative;
    display: inline-block;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;

    display: block;
    margin-top: 5px;
  }

  .modal-body{
    display: grid;
    place-items: center;
  }

  img{
    margin: 10px;
  }
</style>