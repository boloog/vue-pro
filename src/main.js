import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Layout, Menu, Button, Icon, Drawer, Radio } from "ant-design-vue";

import Authorized from "./components/Authorized";
import Auth from "./directive/auth";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
// 全局注册组件
Vue.component("Authorized", Authorized);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
