<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
// 用做图表监听大小变化  https://github.com/Justineo/resize-detector
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    // https://www.echartsjs.com/zh/api.html#echartsInstance
    // 销毁掉 第三方组件的事件
    removeListener(this.$refs.chartDom, this.resize);
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    resize() {
      this.myChart.resize();
    },
    renderChart() {
      // 封装组件
      this.myChart = echarts.init(this.$refs.chartDom);
      this.myChart.setOption(this.option);
    }
  },
  watch: {
    // 1> 深度监听 option 数据变化 ，再更新  比较耗性能
    // option: {
    //   handler(val) {
    //     this.myChart.setOption(val);
    //   },
    //   deep: true
    // }
    // 2> 父组件重新赋值 数据变化 ，再更新
    option(val) {
      this.myChart.setOption(val);
    }
  }
};
</script>

<style></style>
