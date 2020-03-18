<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        collapsible
        v-model="collapsed"
        :theme="navTheme"
        v-if="navLayout === 'left'"
      >
        <div class="logo">Vue Ant Design</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
            class="trigger"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
      <setting-drawer />
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import SiderMenu from "./SiderMenu";
import Footer from "./Footer";
import SettingDrawer from "@/components/SettingDrawer";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Header,
    SiderMenu,
    Footer,
    SettingDrawer
  }
};
</script>

<style lang="less" scoped>
.logo {
  line-height: 64px;
  color: #fff;
  text-align: center;
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 24px;
}
</style>
