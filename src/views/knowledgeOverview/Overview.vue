<template>
  <div class="knowMain">
    <div class="leftCon">
      <div class="topInput">
        <el-input v-model="sample" suffix-icon="el-icon-search" size="mini" @change="queryEntity"></el-input>
      </div>
      <div class="middleList">
        <div class="triangle"></div>
        <div class="answer">答案</div>
        <div
          class="list"
          v-for="(item, index) in itemArr"
          :key="index"
          :class="{
            clickBg: index == clickIndex,
            hoverBg: index == hoverIndex
          }"
          @click="clickIndex = index"
          @mouseover="hoverIndex = index"
          @mouseout="hoverIndex = -1"
        >{{ item }}</div>
        <div class="pageStyle">
          <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
        </div>
      </div>
    </div>
    <div class="rightCon">
      <div class="triangle"></div>
      <div :id="id" :class="className" :style="{ height: height, width: width }" />
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import Graph from "echarts/lib/data/Graph";
import { mapState } from "vuex";
const Edge = Graph.Edge;
const Node = Graph.Node;

function generateNodeKey(id) {
  return "_EC_" + id;
}
Graph.prototype.addEdge = function(n1, n2, dataIndex) {
  var nodesMap = this._nodesMap;
  var edgesMap = this._edgesMap; // PNEDING

  if (typeof n1 === "number") {
    n1 = this.nodes[n1];
  }

  if (typeof n2 === "number") {
    n2 = this.nodes[n2];
  }

  if (!Node.isInstance(n1)) {
    n1 = nodesMap[generateNodeKey(n1)];
  }

  if (!Node.isInstance(n2)) {
    n2 = nodesMap[generateNodeKey(n2)];
  }

  if (!n1 || !n2) {
    return;
  }
  var key = n1.id + "-" + n2.id; // PENDING
  //此处是修改echarts的关系图的方法，
  // if (edgesMap[key]) {
  //   return;
  // }

  var edge = new Edge(n1, n2, dataIndex);
  edge.hostGraph = this;

  if (this._directed) {
    n1.outEdges.push(edge);
    n2.inEdges.push(edge);
  }

  n1.edges.push(edge);

  if (n1 !== n2) {
    n2.edges.push(edge);
  }

  this.edges.push(edge);
  edgesMap[key] = edge;
  return edge;
};

export default {
  name: "Overview",
  props: {
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
      sample: "土豆",
      itemArr: ["A", "B", "C", "D", "E", "F"],
      hoverIndex: -1, //表示当前hover的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
      clickIndex: -1 //表示当前点击的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
    };
  },
  created() {
    this.sample = this.$route.query.id;
    console.log("$route.id", this.$route.query.id);
  },

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
    queryEntity(value) {
      console.log("value: ", value);
      this.sample = value;
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      const chartdata = this.relData || {};
      const chartNodes = chartdata.nodes ? chartdata.nodes : [];
      const chartLinks = chartdata.links ? chartdata.links : [];
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
      const nodes = chartNodes.map((e, i) => {
        const { img } = e;
        const colorIndex = i % 12;
        return {
          name: e.title,
          symbol: img ? `image://${img}` : "circle",
          symbolSize: 58,
          itemStyle: { color: color[colorIndex] }
        };
      });
      console.log("nodes: ", nodes);
      const links = chartLinks.map((e, i) => {
        const { source, target, rel } = e;
        const colorIndex = i % 12;
        return {
          source,
          target,
          name: rel,
          value: (i + 1) * 80,
          label: {
            align: "center",
            fontSize: 12
          },
          lineStyle: {
            color: color[colorIndex]
          }
        };
      });
      console.log("links: ", links);
      let hash = {};
      let categories = chartdata.links
        .map((e, i) => {
          return { name: e.rel };
        })
        .reduce((item, next) => {
          hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
          return item;
        }, []);
      console.log("categories: ", categories);
      const CURVENESS_LIST = Array.from({ length: 20 }).map(
        (_, i) => (((i < 10 ? i + 2 : i - 9) - (i % 2)) / 10) * (i % 2 ? -1 : 1)
      );
      // 1. 已存在的边的列表
      // const data = []
      // 2. 预期生成的优化曲度后的列表
      let echartLinks = [];
      links.forEach(link => {
        // 3. 查询已优化的列表中，已存在的两个顶点相同的边
        // const sameLink = echartLinks.filter(
        //   item => item.source === link.source && item.target === link.target
        // );
        // 4. 优化曲度
        link.lineStyle.curveness = Math.random();
        echartLinks.push(link);
      });
      console.log("echartLinks: ", echartLinks);
      let data = {
        nodes: [...nodes],
        links: [...echartLinks]
      };

      this.chart.setOption({
        backgroundColor: "#02102D",
        title: {
          text: "知识图谱"
        },
        legend: [
          {
            // selectedMode: 'single',
            data: categories.map(x => x.name)
            // icon: 'circle'
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
              edgeLength: 120,
              repulsion: 100, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.03, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: [300, 300], //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation: true
            },
            data: data.nodes,
            links: data.links
          }
        ],
        animationEasing: "elasticOut",
        animationEasingUpdate: "elasticOut",
        animationDelay(idx) {
          return idx * 20;
        },
        animationDelayUpdate(idx) {
          return idx * 20;
        }
      });
    }
  },
  computed: {
    ...mapState("entity", ["relData"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.knowMain {
  min-height: calc(100vh - 80px);
  display: flex;
  flex: 1;
  background: #00071a;
  padding: 30px;
  .leftCon {
    display: flex;
    width: 450px;
    flex-direction: column;
    margin-right: 30px;
    .middleList {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      background: #02102d;
      margin-top: 30px;
      padding-left: 30px;
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
      .answer {
        color: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .middleList .list {
      width: 390px;
      height: 70px;
      line-height: 60px;
      background: #5a7095;
      margin-bottom: 20px;
      padding-left: 30px;
      color: #fff;
      cursor: pointer;
    }
    .hoverBg {
      background: #13c6e2 !important;
      // color: red !important;
    }
    .clickBg {
      background: red;
      color: #fff;
    }
    .pageStyle {
      display: flex;
      justify-content: flex-end;
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #c52275;
      }
      .el-pagination {
        .btn-prev,
        .btn-next {
          background: #02102d;
          width: 32px;
          height: 23px;
          line-height: 23px;

          border: 1px solid rgba(90, 112, 149, 1);
          opacity: 1;
          border-radius: 14px;
        }
        .number {
          background: #02102d;
          width: 32px;
          height: 23px;
          line-height: 23px;
          border: 1px solid rgba(90, 112, 149, 1);
          opacity: 1;
          border-radius: 14px;
        }
      }
    }
  }
  .rightCon {
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
}
</style>
