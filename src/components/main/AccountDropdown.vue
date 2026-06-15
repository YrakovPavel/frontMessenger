<script setup>
  import {useAuthStore} from "@/stores/useAuthStore.js";
  import {onMounted, ref} from "vue";

  //Нажатие в меню навигации на свой аккаунт
  const toggleOpen = ref(false);
  function toggleDropdown(){
    toggleOpen.value = !toggleOpen.value;
  }

  onMounted(()=>{
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
      <li><a class="dropdown-item" href="#">Профиль</a></li>
      <li><a class="dropdown-item" href="#">Выйти</a></li>
    </ul>
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
</style>