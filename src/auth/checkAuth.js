import axios from "axios";
import {useAuthStore} from "@/auth/useAuthStore.js";

async function checkAuth(){
    axios.get('/api/public/auth/check')
        .then(response => {
            if (Object.keys(response.data).length){
                useAuthStore().isAuthenticated = true;
                useAuthStore().username = response.data["login"];
            }
            else{
                useAuthStore().isAuthenticated = false;
            }
        })
        .catch(error =>{
            console.log(error);
        });
}

export default checkAuth;