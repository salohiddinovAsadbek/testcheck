import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login/login.vue";
import Home from "../pages/Home/Home.vue";

const users = [
  {
    useremail: "admin@",
    userpassword: "1234",
  },
];

const routes = [
  {
    path: "/",
    component: Login,
    name: "Login page",
    props: { users },
  },
  {
    path: "/home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
