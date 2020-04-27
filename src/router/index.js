import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "首页",
        component: () => import("../views/home/HomePage"),
        meta: { title: "首页", icon: "iconfont iconziyuan4" }
      }
    ]
  },
  {
    path: "/entity",
    component: Layout,
    children: [
      {
        path: "/search",
        name: "实体查询",
        component: () => import("../views/queryEntity/SearchEntity"),
        props: route => ({ id: route.query.id }),
        meta: {
          title: "实体查询",
          icon: "iconfont iconziyuan1"
        }
      },
      {
        path: "/info",
        name: "实体详情",
        component: () => import("../views/queryEntity/EntityInfo"),
        // component: () => import("@/views/dashboard/index"),
        props: route => ({ id: route.query.id }),
        hidden: true
      }
    ]
  },
  {
    path: "/identifyEntity",
    component: Layout,
    children: [
      {
        path: "index",
        name: "实体识别",
        component: () => import("../views/identifyEntity/IdentifyEntity"),
        // component: () => import("@/views/form/index"),
        meta: { title: "实体识别", icon: "iconfont iconziyuan2" }
      }
    ]
  },
  {
    path: "/extract",
    component: Layout,
    children: [
      {
        path: "index",
        name: "实体关系提取",
        component: () => import("../views/extract/index"),
        // component: () => import("@/views/form/index"),
        meta: { title: "实体关系提取", icon: "iconfont iconziyuan2" }
      }
    ]
  },
  {
    path: "/KnowledgeSearch",
    component: Layout,
    children: [
      {
        path: "index",
        name: "知识问答",
        component: () => import("../views/knowledgeOverview/KnowledgeSearch"),
        meta: { title: "知识问答", icon: "iconfont iconziyuan5" }
      },
      {
        path: "overview",
        name: "实体详情",
        component: () => import("../views/knowledgeOverview/Overview"),
        // component: () => import("@/views/dashboard/index"),
        props: route => ({ id: route.query.id }),
        hidden: true
      }
    ]
  },
  {
    path: "/quiz",
    component: Layout,
    children: [
      {
        path: "index",
        name: "知识概览",
        component: () => import("../views/quiz/Quiz"),
        meta: { title: "知识概览", icon: "iconfont iconziyuan4" }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/dashboard", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
