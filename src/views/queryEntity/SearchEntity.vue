<template>
  <div class="searchMain">
    <div class="inputContent">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        @change="queryEntity"
        @keyup.enter.native="queryEntity"
        v-model="inputdata"
        @input="getInputValue"
      ></el-input>
      <div class="caseBar">
        <span class="fontStyle">例如:</span>
        <span class="caseStyle" @click="selectItem" v-for="item in cases" v-bind:key="item">{{item}}</span>
        <i class="el-icon-warning-outline"></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import request from "@/utils/request";
import { mapState } from "vuex";

export default {
  name: "SearchEntity",
  props: ["id"],
  data() {
    return {
      inputdata: "",
      cases: ["太空体系", "核体系", "导弹防御体系", "网电对抗体系","制海作战体系","制空作战体系"]
    };
  },
  created() {
    this.inputdata = this.$route.query.id;
  },
  mounted() {
    const test = this.relData.nodes;
  },
  methods: {
    
selectItem(e){
  console.log('e: ', e);
  const name=e.target.innerText;
  console.log('name: ', name);
  this.inputdata=name;

},
    getInputValue(value) {
      this.inputdata = value;
    },
    queryEntity(e) {
      const value=e.target.value?e.target.value:e;
      console.log('value: ', value);
      this.$store.dispatch("entity/getRelData", { title: value });
      this.$router.push({
        path: "/info",
        query: {
          id: value
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
.searchMain {
  min-height: calc(100vh - 80px);
  display: flex;
  flex: 1;
  flex-direction: column;
  background: url("../../assets/img/bg.png") #00071a no-repeat;
  .inputContent {
    padding-top: 200px;
    margin: 0 392px;
    // width: 615px;
  }
  .caseBar {
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-content: center;
    .fontStyle {
      color: #daf2f6;
    }
    .caseStyle {
      margin-right: 20px;
      color: #5a7095;
    }
    i {
      line-height: 30px;
      font-size: 24px;
      color: #c52275 !important;
    }
  }
}
</style>