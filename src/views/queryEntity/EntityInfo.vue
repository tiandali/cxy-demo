<template>
  <div class="infoMain">
    <div class="infoContent">
      <div class="summaryArea">
        <div class="searchArea">
          <el-input v-model="sample" suffix-icon="el-icon-search" size="mini" @change="queryEntity"></el-input>
        </div>

        <SummaryArea />
      </div>
      <div class="relationArea">
        <RelationArea :name="sample" />
      </div>
      <div class="chartArea">
        <div class="polarChart">
          <PolarChart />
        </div>
        <div class="lineChart">
          <lineCharts />
        </div>
        <div class="barChart">
          <BarChart />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SummaryArea from "./SummaryArea";
import RelationArea from "./RelationArea";
import PolarChart from "./PolarChart";
import BarChart from "./BarChart";
import lineCharts from "./lineCharts";
import { mapState } from "vuex";

export default {
  name: "EntityInfo",
  components: {
    SummaryArea,
    RelationArea,
    PolarChart,
    BarChart,
    lineCharts
  },
  data() {
    return {
      sample: "",
      chartData: {}
    };
  },
  created() {
    this.sample = this.$route.query.id;
  },
  mounted() {},
  methods: {
    queryEntity(value) {
      this.sample = value;
      this.$store.dispatch("entity/getRelData", { title: value });
    }
  },
  computed: {
    ...mapState("entity", ["relData"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.infoMain {
  min-height: calc(100vh - 80px);
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #18191d;
  padding: 30px;
  .searchArea {
    margin-bottom: 20px;
  }
  .infoContent {
    display: flex;
    flex: 1;
    .cahrtArea,
    .relationArea,
    .summaryArea {
      display: flex;
      flex-direction: column;
    }
    .summaryArea {
      flex: 1 0 325px;
      margin-right: 30px;
    }
    .relationArea {
      flex: 1 0 515px;
      margin-right: 30px;
      background: gray;
    }
    .chartArea {
      flex: 1 0 265px;
      display: flex;
      flex-direction: column;
      .polarChart {
        display: flex;
        flex: 0 0 254px;
        margin-bottom: 30px;
      }
      .lineChart {
        display: flex;
        flex: 0 0 176px;
        margin-bottom: 30px;
      }
      .barChart {
        display: flex;
        flex: 0 0 160px;
        background: blue;
      }
    }
  }
}
</style>