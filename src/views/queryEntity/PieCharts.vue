<template>
  <div class="container">
    <div class="triangle"></div>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "PieCharts",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "PieCharts"
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
        color: ["#13C6E2", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622","#2f4554",],
        
        tooltip: {
          trigger: "item",
          backgroundColor: "#fff",
          textStyle: "#999"
        },
    
        series: [
          {
          
            type: "pie",
            data:[
                {value:21,name:'太空'},
                {value:8,name:'核'},
                {value:9,name:'导弹防御'},
                {value:30,name:'网电对抗'},
                {value:6,name:'制海作战'},
                {value:5,name:'制空作战'},
            ],
            emphasis:{
                itemStyle:{
                    shadowBlur:10,
                    shadowOffsetX:0,

                }
            },
           
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