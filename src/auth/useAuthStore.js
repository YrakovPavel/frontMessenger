import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const state = reactive({
      isAuthenticated: false,
      username: "",
    });

    function $reset() {
      state.isAuthenticated = false;
      state.username = "";
    }

    return { state, $reset };
  },
  {
    persist: true,
  },
);
