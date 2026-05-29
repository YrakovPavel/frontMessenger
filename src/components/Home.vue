<script setup>
</script>

<template>
  <div class="page">
    <div class="container">
      <h1>Добро пожаловать в MyMessenger!</h1>
      <img src="@/assets/communicati.jpg" alt="main image of people">
      <div class="buttons">
        <button @click="$router.push({name: 'login'})" class="btn btn-primary">Войти</button>
        <button @click="$router.push({name: 'registration'})" class="btn btn-success">Зарегистрироваться</button>
      </div>
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

  .buttons{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .btn{
    margin: 0 auto;
    width: 90%;
  }

  h1{
    text-align: center;
    width: 100%;
    margin: 0 auto 0;
  }

  img{
    width: 100%;
    height: 100%;
    padding: 20px;
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