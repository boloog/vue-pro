<template>
  <div style="width: 200px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    // 获取路由数据
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      // 处理当前 routes 里面的数据
      routes.forEach(item => {
        // 有 name  && 当前目录为不显示
        if (item.name && !item.hideInMenu) {
          // 设置 选择的 key
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          // 如果有子级 && 子目录不显示
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          // 其它为显示的 就直接添加
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      return menuData;
    }
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      // 菜单是关闭状态 不打开菜单
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  components: {
    SubMenu
  }
};
</script>
