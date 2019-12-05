import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Events from "../views/Events.vue";
import Users from "../views/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
  {
    path: "/events",
    name: "events",
    component: Events
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
