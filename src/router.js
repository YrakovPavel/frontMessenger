import {createRouter, createWebHistory} from "vue-router";


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
            component: () => import("./components/Main.vue")
        }
    ]
})

export default router;