<template>
  <div class="container">
    <div class="triangle"></div>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "PolarChart",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "polarChart"
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
      let max = 30;
      let min = 0;
      this.chart.setOption({
        backgroundColor: "#02102D",
        // color: ["#199475", "#61a0a8", "#d48265", "#91c7ae", "#749f83"],
        grid: {
          left: "5%",
          right: "5%"
        },
        color: ["#13C6E2"],
        tooltip: { backgroundColor: "#fff", textStyle: "#999" },

        radar: {
          name: {
            textStyle: {
              color: "#13C6E2"
            },
            fontSize: 14
          },
          shape: "circle",
          center: ["50%", "50%"],
          radius: "70%",
          scale: true,
          indicator: [
            {
              name: "太空体系",
              max: max,
              min: min
            },
            {
              name: "核体系",
              max: max,
              min: min
            },
            {
              name: "导弹防御体系",
              max: max,
              min: min
            },
            {
              name: "网电对抗体系",
              max: max,
              min: min
            },
            {
              name: "制海作战体系",
              max: max,
              min: min
            },
            {
              name: "制空作战体系",
              max: max,
              min: min
            }
          ],
          splitArea: {
            show: false
          },

          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["50%", "50%"],
          radius: "70%"
        },
        angleAxis: {
          min: 0,
          max: 360,
          interval: 5,
          clockwise: true,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(19, 198, 226, 0.1)"
              // color: "#444368"
            }
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          min: min,
          max: max,
          interval: 10
        },
        series: [
          {
            name: "预算",
            type: "radar",
            areaStyle: {
              opacity: 0.1
            },
            lineStyle: {
              width: 1
            },
            lineStyle: {
              // 单项线条样式。
              normal: {
                opacity: 0.2 // 图形透明度
              }
            },
            data: [
              {
                value: [21, 18, 9, 15, 25, 18],
                name: "预算分配"
              }
            ]
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
  display: flex;
  flex: 1;
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