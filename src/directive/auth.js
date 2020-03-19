import { check } from "../utils/auth";

// 自己注册
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        // 缺陷就是 如果权限是动态 的 就不方便了，还是适用组件权限控制
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default {
  install
};
