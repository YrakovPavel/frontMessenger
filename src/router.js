import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/useAuthStore.js";

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
            name: "main",
            component: () => import("./components/main/Main.vue"),
            meta: {requiresAuth: true}
        }
    ]
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
        return {name: "login"};
    } else {
        return true;
    }
})

export default router;