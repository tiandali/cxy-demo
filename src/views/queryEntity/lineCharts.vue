<template>
  <div class="container">
    <div class="triangle"></div>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "LineChart",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "LineChart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
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
        backgroundColor: "#02102D",
        color: ["#13C6E2", "#61a0a8", "#d48265", "#91c7ae", "#749f83"],
        grid: {
          left: "10%",
          bottom: "20%"
        },
        title: {
          show: true,
          text: "单价走势(元)",
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
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#5D5D5F"
            }
          },

          data: ["Mon", "Tue", "Wed", "Thu", "Fri"]
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#5D5D5F"
            }
          }
        },
        series: [
          {
            data: [6, 7, 6, 9, 7],
            type: "line",
            areaStyle: {}
          }
        ]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.container {
  position: relative;
  // display: flex;
  // flex: 1;
  .triangle {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: #13c6e2 transparent transparent #13c6e2;
  }
}
</style>