<template>
  <div class="homeMain">
    <dir class="topMain">
      <div class="chartStyle" v-for="item in chartListTops" v-bind:key="item">
        <BoardChart :type="item.type" :title="item.title" :selectData="item.selectData" />
      </div>
      <!-- <div class="chartStyle">
        <BoardChart type="bar" title="太空体系" :selectData="selectData" />
      </div>
      <div class="chartStyle">
        <BoardChart type="bar" title="核体系" :selectData="selectData" />
      </div>
      <div class="chartStyle">
        <BoardChart type="bar" title="导弹防御体系" :selectData="selectData" />
      </div>-->
    </dir>
    <div class="bottomMain">
      <div class="chartStyle" v-for="item in chartListBottoms" v-bind:key="item">
        <BoardChart :type="item.type" :title="item.title" :selectData="item.selectData" />
      </div>
      <!-- <div class="chartStyle">
        <BoardChart type="bar" title="网电对抗体系" :selectData="selectData" />
      </div>
      <div class="chartStyle">
        <BoardChart type="bar" title="制海作战体系" :selectData="selectData" />
      </div>
      <div class="chartStyle">
        <BoardChart type="bar" title="制空作战体系" :selectData="selectData" />
      </div>-->
    </div>
  </div>
</template>
<script>
import BoardChart from "./BoardChart";
import { boardData } from "./data";
console.log("boardData: ", boardData);
export default {
  name: "HomePage",
  components: {
    BoardChart
  },
  data() {
    return {
      title1: "太空体系",
      selectData: [],
      chartListTops: [
        {
          type: "bar",
          title: "太空体系",
          selectData: this.fileterChartData(0)
        },
        { type: "line", title: "核体系", selectData: this.fileterChartData(1) },
        {
          type: "bar",
          title: "导弹防御体系",
          selectData: this.fileterChartData(2)
        }
      ],
      chartListBottoms: [
        {
          type: "line",
          title: "网电对抗体系",
          selectData: this.fileterChartData(3)
        },
        {
          type: "line",
          title: "制海作战体系",
          selectData: this.fileterChartData(4)
        },
        {
          type: "line",
          title: "制空作战体系",
          selectData: this.fileterChartData(5)
        }
      ]
    };
  },
  created() {
    console.log("created1111");
  },
  mounted() {
    console.log("mounted1111");
    this.selectData = boardData[0].selectData;
    this.title = boardData[0].title;
    console.log("selectData: ", this.selectData);
  },
  methods: {
    fileterChartData(i) {
      const data = boardData[i].selectData || [];
      return data;
    }
  }
};
</script>
<style lang="scss" scope>
.homeMain {
  min-height: calc(100vh - 80px);
  display: flex;
  // flex: 1;
  flex-direction: column;
  background: #00071a;
  .topMain,
  .bottomMain {
    display: flex;
    height: 440px;
    padding: 30px 25px 10px 25px;
    margin: 0;
    .chartStyle {
      margin: 0 25px;
      display: flex;
      flex: 1;
      background: #02102d;
    }
  }
}
</style>