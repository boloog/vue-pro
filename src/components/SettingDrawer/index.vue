<template>
  <div>
    <a-drawer
      title="Basic"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :maskClosable="false"
      :afterVisibleChange="afterVisibleChange"
    >
      <template v-slot:handle>
        <a-button
          type="primary"
          @click="visible = !visible"
          class="setting-drawer"
        >
          <a-icon :type="visible ? 'close' : 'setting'" />
        </a-button>
      </template>
      <template>
        <h2>整体风格定制</h2>
        <a-radio-group
          @change="e => onChange('navTheme', e.target.value)"
          :value="$route.query.navTheme || 'dark'"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <hr />
        <h2>导航模式</h2>
        <a-radio-group
          @change="e => onChange('navLayout', e.target.value)"
          :value="$route.query.navLayout || 'left'"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </template>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(type, value) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [type]: value
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.setting-drawer {
  position: absolute;
  top: 300px;
  right: 254px;
  width: 46px;
  height: 46px;
  border-radius: 4px 0 0 4px;
}
</style>
