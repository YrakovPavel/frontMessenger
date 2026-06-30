import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/auth/useAuthStore.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/registration",
            name: "registration",
            component: () => import("./components/Registration.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/Login.vue")
        },
        {
            path: "/",
            name: "home",
            component: () => import("./components/Home.vue")
        },
        {
            path: "/main",
            component: () => import("./components/main/Main.vue"),
            meta: {requiresAuth: true},
            children:[
                {
                    path: "",
                    name: "main-empty",
                    component: () => import("./components/main/Right/EmptyChat.vue")
                },
                {
                    path: ":id",
                    name: "main-chat",
                    component: () => import("./components/main/Right/Chat.vue"),
                    props: true
                }
            ]
        }
    ]
})

router.beforeEach((to, from) => {
    const store = useAuthStore();
    if (store.state.isAuthenticated){
        if (to.name === "home" || to.name === "login" || to.name === "registration"){
            return {name: "main-empty"};
        }
        else{
            return true;
        }
    }
    else{
        if (to.meta.requiresAuth){
            return {name: "login"};
        }
    }
})

export default router;