import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/search/:param/:type",
      name: "searchview",
      component: () => import("./components/SearchView")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    },
    {
      path:"/supports",
      name: "supports",
      component: () => import("./components/Supports")
    },
    {
      path: "/prereqs",
      name: "prereqs",
      component: () => import("./components/Prereqs")
    },
    {
      path:"/guidelines",
      name:"guidelines",
      component: () => import("./components/Guidelines")
    },
    {
      path:"/supportTest",
      name:"supportTest",
      component: () => import("./components/supportTest")
    }
  ]
});