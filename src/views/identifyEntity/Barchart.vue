<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from "echarts";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "BarChart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        backgroundColor: "#fff",
        color: ["#C52275", "#61a0a8", "#d48265", "#91c7ae", "#749f83"],
        grid: {
          left: "10%",
          bottom: "20%"
        },
        title: {
          show: false,
          text: "同类项分布对比",
          right: "30px",
          top: "10px",
          textStyle: {
            color: "#fff",
            fontSize: 12,
            fontWeight: 400
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000517"
            }
          },

          data: ["n", "v", "qv", "pr", "w", "f", "aa", "as", "n", "f"]
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000517"
            }
          }
        },
        series: [
          {
            data: [9, 3, 6, 9, 5, 7, 5, 8, 9, 3],
            type: "bar",
            barWidth: 8
          }
        ]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>