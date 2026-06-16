import {defineStore} from "pinia";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const isAuthenticated = ref(false);
    const username = ref("");

    function $reset(){
        isAuthenticated.value = false;
        username.value = "";
    }

    return {isAuthenticated, username, $reset}
    },
    {
        persist: true
    })
