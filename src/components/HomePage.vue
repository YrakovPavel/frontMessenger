<script setup>
import axios from "axios";

async function loadToken() {
  await axios.get("/api/public/token");
}
loadToken();
</script>

<template>
  <div class="page col-12">
    <div class="card-container">
      <h1>Добро пожаловать в MyMessenger!</h1>
      <img src="@/assets/communicati.jpg" alt="main image of people" />
      <div class="buttons">
        <button
          @click="$router.push({ name: 'login' })"
          class="btn btn-primary"
        >
          Войти
        </button>
        <button
          @click="$router.push({ name: 'registration' })"
          class="btn btn-success"
        >
          Зарегистрироваться
        </button>
      </div>
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

.card-container {
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

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.btn {
  padding: 12px;
  font-size: 20px;
}

h1 {
  margin: 0 auto 0;
}

img {
  width: 100%;
  height: auto;
  padding: 20px;
}
</style>
