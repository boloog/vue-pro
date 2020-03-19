import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { layout, Menu, button, icon, drawer, radio } from "ant-design-vue";

Vue.config.productionTip = false;
Vue.use(button);
Vue.use(layout);
Vue.use(icon);
Vue.use(drawer);
Vue.use(radio);
Vue.use(Menu);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
