<template>
  <div>
    <chart :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
// import random from "lodash/random";
import request from "../../utils/request";
import Chart from "../../components/Chart";

export default {
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData();

    this.interval = setInterval(() => {
      this.getChartData();
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      // this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        methods: "get",
        params: {
          ID: 123
        }
      }).then(response => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    // 清除事件
    clearInterval(this.interval);
  },
  components: {
    Chart
  }
};
</script>

<style></style>
