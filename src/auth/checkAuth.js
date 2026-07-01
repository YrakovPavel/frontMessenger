import axios from "axios";
import { useAuthStore } from "@/auth/useAuthStore.js";

async function checkAuth() {
  await axios
    .get("/api/public/auth/check")
    .then((response) => {
      const store = useAuthStore();
      if (Object.keys(response.data).length) {
        store.state.isAuthenticated = true;
        store.state.username = response.data["login"];
      } else {
        store.state.isAuthenticated = false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default checkAuth;
