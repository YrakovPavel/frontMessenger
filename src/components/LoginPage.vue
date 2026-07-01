<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import checkAuth from "@/auth/checkAuth.js";

const user = ref({
  username: null,
  password: null,
});

const router = useRouter();

async function login() {
  const params = new URLSearchParams();
  params.append("username", user.value.username);
  params.append("password", user.value.password);

  axios
    .post("/api/login", params)
    .then(async () => {
      await checkAuth();
      await router.push({ name: "main-empty" });
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <div class="page">
    <div class="container">
      <h1>Добро пожаловать в MyMessenger!</h1>
      <form @submit.prevent>
        <div class="form-floating">
          <input
            id="login"
            type="text"
            class="form-control"
            placeholder="Логин"
            v-model="user.username"
          />
          <label for="login">Логин</label>
        </div>
        <br />
        <div class="form-floating">
          <input
            id="password"
            type="password"
            class="form-control"
            placeholder="Пароль"
            v-model="user.password"
          />
          <label for="password">Пароль</label>
        </div>
        <br />
        <button @click="login" class="form-control btn btn-primary">
          Войти
        </button>
      </form>
      <router-link to="registration">Зарегистрироваться</router-link>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 10vh;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  min-height: 100vh;
}

.container {
  border-radius: 15px;
  margin: 40px auto;
  padding: 40px;

  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;

  background: white;
  width: min(90vw, 550px);
}

.form-floating {
  width: 70%;
  margin: 0 auto;
}

.btn {
  width: 70%;
  height: 70%;
  margin: 0 auto 10px;
}

h1 {
  text-align: center;
  width: 100%;
  margin: 0 auto 50px;
}
</style>
