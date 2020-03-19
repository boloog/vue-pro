import Vue from "vue";
import VueRouter from "vue-router";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/NotFound";
import Forbidden from "../views/Forbidden";
import findLast from "lodash/findLast";
import { check, isLogin } from "../utils/auth";

/**
 * 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {
      authority: ["user", "admin"]
    },
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/BaseLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "仪表盘",
          icon: "dashboard"
        },
        component: {
          render: h => h("router-view")
        },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: {
              title: "分析页"
            },
            component: () =>
              import(
                /* webpackChunkName: "user" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/form",
    name: "form",
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/BaseLayout"),

    // component: {
    //   render: h => h("router-view")
    // },
    meta: {
      title: "表单",
      icon: "form",
      authority: ["admin"]
    },
    children: [
      {
        path: "/form/basic-form",
        name: "basicform",
        meta: {
          title: "基础表单"
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/Forms/BasicForm")
      },
      {
        path: "/form/step-form",
        name: "stepform",
        hideChildrenInMenu: true, // 处理子级菜单
        meta: {
          title: "分布表单"
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/Forms/StepForm"),
        children: [
          {
            path: "/form/step-form",
            redirect: "/form/step-form/info"
          },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () =>
              import(
                /* webpackChunkName: "user" */ "../views/Forms/StepForm/Step1"
              )
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () =>
              import(
                /* webpackChunkName: "user" */ "../views/Forms/StepForm/Step2"
              )
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () =>
              import(
                /* webpackChunkName: "user" */ "../views/Forms/StepForm/Step3"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/user",
    hideInMenu: true,
    // component: {
    //   render: h => h("router-view")
    // },
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  // console.log("to.matched", to.matched);
  const record = findLast(to.matched, record => record.meta.authority);
  // 判断是否有权限
  if (record && !check(record.meta.authority)) {
    // 判断是否有登录 / 是不是在登录页面
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你无权限访问。"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
