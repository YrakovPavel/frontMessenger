import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/auth/useAuthStore.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/registration",
      name: "registration",
      component: () => import("./components/RegistrationPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/LoginPage.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("./components/HomePage.vue"),
    },
    {
      path: "/main",
      component: () => import("./components/main/MainPage.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "main-empty",
          component: () => import("./components/main/Right/EmptyChat.vue"),
        },
        {
          path: ":id",
          name: "main-chat",
          component: () => import("./components/main/Right/ChatPage.vue"),
          props: true,
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const store = useAuthStore();
  if (store.state.isAuthenticated) {
    if (
      to.name === "home" ||
      to.name === "login" ||
      to.name === "registration"
    ) {
      return { name: "main-empty" };
    } else {
      return true;
    }
  } else {
    if (to.meta.requiresAuth) {
      return { name: "login" };
    }
  }
});

export default router;
