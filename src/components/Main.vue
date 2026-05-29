<script setup>

</script>

<template>
  <div class="page">
    <div class="container">
      <div class="list-group">
        <a href="#" class="friend list-group-item list-group-item-action">
          <img class="friend-avatar" src="@/assets/avatar-generations_rpge.jpg" alt="avatar">
            <h6 class="friend-name">Антон</h6>
            <small class="friend-time">3 days ago</small>
            <p class="friend-message">Правда там разрабов поменяли + трейлер сомн...</p>
            <span class="friend-badge badge text-bg-primary rounded-pill">2</span>
        </a>
        <button class="list-group-item list-group-item-action">Линк</button>
        <button class="list-group-item list-group-item-action">Зельда</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
        <button class="list-group-item list-group-item-action">Ганон</button>
      </div>
      <div class="chat">
        <div class="chat_sender">
          <h6 class="mb-1">Антон</h6>
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
          <small>3 days ago</small>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <h6 class="mb-1">Павел</h6>
          <label>ОООООООООООООООOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</label>
          <small>2 days ago</small>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <label>ООООООООООООООО</label>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <label>ООООООООООООООО</label>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <label>ООООООООООООООО</label>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <label>ООООООООООООООО</label>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <label>ООООООООООООООО</label>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <label>ООООООООООООООО</label>
        </div>
        <div class="chat_sender">
          <label>ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ</label>
        </div>
        <div class="chat_recipient">
          <label>ООООООООООООООО</label>
        </div>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Comment</label>
      </div>
      <button class="add-chat form-control btn btn-primary">Добавить чат</button>
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

  .chat_sender{
    background: lightgrey;
    align-self: flex-start;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    max-width: 50%;
    word-break: break-all;
  }

  .chat_recipient{
    background: dodgerblue;
    align-self: flex-end;
    text-align: left;
    color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    max-width: 50%;
    word-break: break-all;
  }

  .friend{
    padding: 2px 2px;
    display: grid;
    grid-auto-columns: 2fr 1fr 5fr 2fr;
    grid-template-areas:
        "a b d d e e"
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

  .add-chat{
    place-self: center;
  }

  .form-floating{
    grid-area: d;
    margin: 10px;
  }
</style>