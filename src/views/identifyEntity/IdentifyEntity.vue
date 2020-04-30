<template>
  <div class="artMain">
    <i class="iconfont iconziyuan1"></i>
    <el-input
      type="textarea"
      autosize
      :placeholder="msg"
      prefix-icon="el-icon-search"
      @change="queryData"
      v-model="inputdata"
      @input="getInputValue"
    ></el-input>
    <el-button class="btnStyle" @click="queryData" type="primary">提交</el-button>
    <div v-if="showData">
      <div>
        <div class="title">识别结果</div>
        <div class="contentStyle" v-html="inputdata2"></div>
      </div>
      <div>
        <div class="title">分词属性结果</div>
        <el-input type="textarea" autosize v-model="inputdata"></el-input>
      </div>
      <div>
        <div class="title">属性数据</div>
        <Barchart />
      </div>
    </div>
  </div>
</template>
<script>
import Barchart from "./Barchart";
let str = "玉米与传统的水稻、小麦等粮食作物相比";
function delData(str, data) {
  const label = "(" + str + ")";
  let regexp = new RegExp(",", "g");
  let val = label.replace(regexp, "|");
  let reg = new RegExp(val, "g");
  let test = data.replace(reg, function() {
    return `<span style="color:red">${arguments[0]}</span>`;
  });
  return test;
}

export default {
  name: "IdentifyEntity",
  components: { Barchart },
  data() {
    return {
      msg:
        "美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。",
      inputdata:
        "美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。",
      inputdata2: `美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。`,
      showData: false
    };
  },
  created() {},
  methods: {
    getInputValue(value) {
      console.log("输入框当前的value: ", value);
      this.inputdata = value;
    },
    queryData(value) {
      this.showData = true;
      const mark = "美国太空军,美国空军部,外太空,军事任务,国防部";
      this.inputdata2 = delData(mark, this.inputdata);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.artMain {
  min-height: calc(100vh - 80px);
  display: flex;
  flex: 1;
  flex-direction: column;
  background: url("../../assets/img/bg.png") #00071a no-repeat;

  padding: 160px 220px 0 220px;
  i {
    font-size: 17px;
    color: #18191d;
    position: absolute;
    left: 250px;
    top: 168px;
    z-index: 99;
  }
  textarea {
    resize: none;
  }
  .el-textarea__inner {
    padding-left: 50px;
    letter-spacing: 2px;
  }
  .btnStyle {
    background: #c52275;
    margin: 30px auto;
    width: 120px;
    border-color: #c52275;
  }
  .title {
    height: 36px;
    line-height: 36px;
    align-items: center;
    color: #5a7095;
    margin-top: 10px;
  }
  .contentStyle {
    background: #fff;
    padding: 10px 30px;
    letter-spacing: 2px;
  }
  .content {
    background: #fff;
  }
}
</style>
