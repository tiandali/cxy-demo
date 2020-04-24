<template>
  <div class="container">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>
<script>
import echarts from "echarts";
import { chartdata } from "../test";
import { mapState } from "vuex";

export default {
  name: "RelationArea",
  props: {
    name: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
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
    return {
      // source,
      // dataTitle,
      // dataLink
    };
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
      const source = { name: this.name, itemStyle: { color: "#C52275" } };
      const color = [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ];
      // const chartNode = chartdata.map((e, i) => {
      //   const { entity2 = {} } = e;
      //   const title = entity2.title ? entity2.title : "";
      //   const img = entity2.image ? entity2.image : "";
      //   const colorIndex = i % 12;
      //   const nodes = {
      //     name: title,
      //     symbol: img ? `image://${img}` : "circle",
      //     symbolSize: 100,
      //     itemStyle: { color: color[colorIndex] }
      //   };
      //   return nodes;
      // });
      // let hash = {};
      // let nodes = chartNode.reduce(function(item, next) {
      //   hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
      //   return item;
      // }, []);

      const nodes = this.relData.nodes.map((e, i) => {
        const { img } = e;
        const colorIndex = i % 12;
        return {
          name: e.title,
          symbol: img ? `image://${img}` : "circle",
          symbolSize: 100,
          itemStyle: { color: color[colorIndex] }
        };
      });
      console.log("nodes: ", JSON.parse(JSON.stringify(nodes)));
      // const links = chartdata.map((e, i) => {
      //   const { rel = {}, entity2 = {} } = e;
      //   const title = entity2.title ? entity2.title : "";
      //   const type = rel.type ? rel.type : "";
      //   const colorIndex = i % 12;
      //   const links = {
      //     source: source.name,
      //     target: title,
      //     name: type,
      //     label: {
      //       align: "center",
      //       fontSize: 12
      //     },
      //     lineStyle: {
      //       color: color[colorIndex]
      //     }
      //   };
      //   return links;
      // });
      const links = this.relData.links.map((e, i) => {
        const { source, target, rel } = e;
        const colorIndex = i % 12;
        return {
          source,
          target,
          name: rel,
          label: {
            align: "center",
            fontSize: 12
          },
          lineStyle: {
            color: color[colorIndex]
          }
        };
      });
      console.log("links: ", JSON.parse(JSON.stringify(links)));
      // let categories = chartdata.map((e, i) => {
      //   const { rel = {} } = e;
      //   const type = rel.type ? rel.type : "";
      //   const categories = {
      //     name: type
      //   };
      //   return categories;
      // });
      let hash = {};

      let categories = this.relData.links
        .map((e, i) => {
          return { name: e.rel };
        })
        .reduce((item, next) => {
          hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
          return item;
        }, []);
      console.log("categories: ", categories);

      let data = {
        nodes: [...nodes],
        links: [...links]
      };

      this.chart.setOption({
        backgroundColor: "#02102D",
        title: {
          text: "知识图谱"
        },
        legend: [
          {
            // selectedMode: "single",
            data: categories.map(x => x.name)
            // icon: "circle"
          }
        ],
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 58,
            draggable: true,
            roam: true,
            focusNodeAdjacency: true,
            categories: categories,
            edgeSymbol: ["", "arrow"],
            // edgeSymbolSize: [80, 10],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 20
                },
                formatter(x) {
                  return x.data.name;
                }
              }
            },
            label: {
              show: true
            },
            force: {
              repulsion: 1000,
              edgeLength: 120
            },
            data: data.nodes,
            links: data.links,
            // animationEasing: "elasticOut",
            // animationEasingUpdate: "elasticOut",
            // animationDelay(idx) {
            //   return idx * 20;
            // },
            // animationDelayUpdate(idx) {
            //   return idx * 20;
            // },
            animationDurationUpdate: 1500,
            animationEasingUpdate: "quinticInOut"
          }
        ]
      });
    }
  },
  computed: {
    ...mapState("entity", ["relData"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.container {
  display: flex;
  flex: 1;
}
</style>