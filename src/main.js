import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./lang/lang";
import "./pages/Login/login.css";
import "vue3-toastify/dist/index.css";

createApp(App).use(router).use(i18n).mount("#app");
