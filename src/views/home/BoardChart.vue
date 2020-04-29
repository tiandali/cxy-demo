<template>
  <div class="container">
    <div class="triangle"></div>
    <div class="selectStyle">
      <el-select v-model="value" popper-class="selectdropdown" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div :id="title" :class="className" :style="{height:height,width:width}" />
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "BoardChart",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    title: {
      type: String,
      default: "BoardChart"
    },
    type: {
      type: String,
      default: "bar"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },

    selectData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      options: [],
      value: ""
    };
  },
  created() {
    console.log("created2: ");
  },
  mounted() {
    console.log("mounted2: ");
    const defaultValue = this.selectData[0];
    console.log("this.selectData: ", this.selectData);
    console.log("mounted--defaultValue: ", defaultValue);
    this.value = defaultValue ? defaultValue.value : "";
    this.id = this.title;
    this.options = this.selectData.map(e => ({
      label: e.label,
      value: e.value
    }));
    this.initChart();
  },
  watch: {
    selectData(newData, oldData) {
      console.log("oldData: ", oldData);
      console.log("newData: ", newData);
      this.queryData(newData);
    },
    value(newval, oldval) {
      console.log("value--oldval: ", oldval);
      console.log("value--newval: ", newval);
      this.value = newval;
      this.initChart();
    },
    title(newval, oldval) {
      console.log("title--oldval: ", oldval);
      console.log("title--newval: ", newval);
      this.title = newval;
      this.id = newval;
      this.initChart();
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    queryData(newData) {
      const defaultValue = this.selectData[0];
      this.value = defaultValue ? defaultValue.value : "";
      this.id = this.title;
      this.options = this.selectData.map(e => ({
        label: e.label,
        value: e.value
      }));
      this.initChart();
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      window.addEventListener("resize", this.chart.resize);

      const xAxisData = [
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020
      ];
      const filterChartData = this.selectData.filter(
        e => e.value === this.value
      )[0];
      const data = filterChartData ? filterChartData.chartData : [];
      let option = {
        backgroundColor: "#02102D",
        color: ["#13C6E2", "#61a0a8", "#d48265", "#91c7ae", "#749f83"],
        grid: {
          left: "10%",
          bottom: "10%"
        },
        title: {
          show: true,
          text: this.title,
          left: "30px",
          top: "10px",
          textStyle: {
            color: "#fff",
            fontSize: 12,
            fontWeight: 400
          }
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "#fff",
          textStyle: "#999",
          formatter: params => {
            const info = params ? params[0] : {};
            const { axisValue, seriesName, value } = info;
            return `<div style="padding:10px;">
            <div style="margin-bottom:10px;">${axisValue}  ${this.title}</div>
            <div style="margin-bottom:10px;">${seriesName}</div>
            <div><span style="color:#C52275;" >${value}</span>万美元</div>
            </div>`;
          }
        },
        xAxis: {
          name: "年",
          type: "category",
          axisLine: {
            show: false
          },
          nameTextStyle: {
            color: "#5A7095"
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#5A7095"
            }
          },
          data: xAxisData
        },
        yAxis: {
          type: "value",
          name: "万美元",
          nameTextStyle: {
            color: "#5A7095"
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#5A7095"
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#5A7095"
            }
          }
        },
        series: [
          {
            name: this.value,
            data: data,
            type: this.type,
            barWidth: 8,

            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: "#4294FE" // 100% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "#13C6E2" // 0% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: "#4095FD"
                },
                {
                  offset: 0,
                  color: "#0A6371"
                }
              ]),
              opacity: 0.2
            }
          }
        ]
      };
      this.chart.setOption(option, true);
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
  .selectStyle {
    position: absolute;
    top: 20px;
    right: 30px;
    z-index: 99;
    .el-input {
      .el-input__inner {
        color: #fff;
      }

      .el-input__suffix {
        .el-input__suffix-inner {
          .el-input__icon {
            line-height: 24px;
          }
        }
      }
    }
    .el-input--suffix .el-input__inner {
      width: 200px;
      background: #c52275;
      height: 24px;
      border-color: #c52275;
      color: #fff;
      // line-height: 24px;
    }
  }
  .bgStyle {
    background: "#fff";
  }
}
</style>