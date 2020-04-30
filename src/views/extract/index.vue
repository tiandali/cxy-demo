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
        <div class="title">提取结果</div>
        <div class="contentStyle" v-html="extractData"></div>
      </div>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      msg:
        "美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。",
      inputdata:
        "美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。",
      extractData: "",
      showData: false
    };
  },
  created() {},
  methods: {
    getInputValue(value) {
      this.inputdata = value;
    },
    queryData(value) {
      this.showData = true;
      // const mark = "美国太空军,美国空军部,外太空,军事任务,国防部";
      // this.extractData = delData(mark, this.inputdata);
      const info = {
        force: "美国太空军",
        Responsibilities: "外太空执行军事任务",
        department: "美国空军部",
        Higheroffice: "空军部，国防部"
      };
      this.extractData = `<div>
   
      <div>(职责,美国太空军,外太空执行军事任务)<div>
      <div>(归属,美国太空军,美国空军部)<div>
      <div>(上级部门,美国太空军,空军部)<div>
      <div>(上级部门,美国太空军,国防部)<div>
      </div>`;
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

  padding: 160px 220px;
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
