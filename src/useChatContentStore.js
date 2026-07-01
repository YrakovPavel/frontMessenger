import { defineStore } from "pinia";
import { ref } from "vue";

//стор для хранения и передачи данных чата
export const useChatContentStore = defineStore(
  "chat",
  () => {
    const chat = ref([]);

    function addMessage(message) {
      chat.value.push(message);
    }

    function $reset() {
      chat.value = [];
    }

    return {
      chat,
      addMessage,
      $reset,
    };
  },
  {
    persist: true,
  },
);
