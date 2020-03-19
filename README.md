# vue-pro

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```

### Ant Design of Vue

- https://www.antdv.com/docs/vue/introduce-cn/

### 解决 message: "Navigating to current location ("/home") is not allowed",警告的问题 多次点击同一路由报错 在路由配置一添加代码

```
/**
 * 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
```

### 版本问题 "ant-design-vue": "^1.4.12" 已解决

- [VueTypes warn]: oneOfType - value "" should be of type "String or Number"
- VueTypes warn]: arrayOf - value must be an array of "String"
- Invalid prop: custom validator check failed for prop "selectedKeys".
- https://github.com/vueComponent/ant-design-vue/issues/597
