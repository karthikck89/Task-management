import { createRouter, createWebHistory } from "vue-router";

const router = new createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      component: () => import(/* webpackChunkName: "paymentMethod" */ "./views/ListView.vue"),
      props: true,
    },
    {
      path: "/create",
      name: "createTask",
      component: () => import(/* webpackChunkName: "paymentSuccess" */ "./views/CreateTask.vue"),
      props: true,
    },
  ],
});

export default router;
