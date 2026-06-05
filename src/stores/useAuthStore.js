import {defineStore} from "pinia";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const isAuthenticated = ref(false);
    const username = ref("");

    return {isAuthenticated, username}
    },
    {
        persist: true
    })
