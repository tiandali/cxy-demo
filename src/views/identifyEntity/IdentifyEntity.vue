<template>
  <div class="artMain">
    <div class="selectType">
      <el-radio-group v-model="radio" @change="changeContext">
        <el-radio label="1">太空军</el-radio>
        <el-radio label="2">海军</el-radio>
      </el-radio-group>
    </div>
    <i class="iconfont iconziyuan1"></i>
    <el-input
      type="textarea"
      autosize
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
      radio: "1",

      inputdata:
        "美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。",
      inputdata2: `美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。`,
      showData: false
    };
  },
  created() {},
  methods: {
    changeContext(val) {
      console.log("val: ", val);
      this.showData = false;
      const tipdata =
        "美国海军（英语：United States Navy，缩写：USN或U.S. Navy），是一个美军军种，负责管理所有与海军有关的事务。其职责为：“配备、训练和武装一支有能力赢得战争、阻止入侵和保证海域自由的海军战斗部队。”]美国海军目前有近500,000现役和预备役海军军人、2852艘现役大小军舰。海军旗下设有空中部队，拥有超过3,700架飞机，主要包括F/A-18E/F超级大黄蜂式打击战斗机及SH-60海鹰直升机，使得美国海军成为全球第四大的空战部队。";
      if (val === "2") {
        this.inputdata = tipdata;
      } else {
        this.inputdata =
          "美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。";
      }
    },
    getInputValue(value) {
      this.inputdata = value;
    },
    queryData(value) {
      this.showData = true;
      const mark = "美国太空军,美国空军部,外太空,军事任务,国防部";
      const mark2 =
        "美军军种,海军,F/A-18E/F超级大黄蜂式打击战斗机,SH-60海鹰直升机";
      const tipdata =
        "美国海军（英语：United States Navy，缩写：USN或U.S. Navy），是一个美军军种，负责管理所有与海军有关的事务。其职责为：“配备、训练和武装一支有能力赢得战争、阻止入侵和保证海域自由的海军战斗部队。”]美国海军目前有近500,000现役和预备役海军军人、2852艘现役大小军舰。海军旗下设有空中部队，拥有超过3,700架飞机，主要包括F/A-18E/F超级大黄蜂式打击战斗机及SH-60海鹰直升机，使得美国海军成为全球第四大的空战部队。";
      const text = this.inputdata.slice(0, 5);

      if (text === "美国太空军") {
        this.inputdata2 = delData(mark, this.inputdata);
      } else {
        this.inputdata = tipdata;
        this.inputdata2 = delData(mark2, tipdata);
      }
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

  padding: 160px 300px 0 300px;
  .selectType {
    margin-bottom: 12px;
    .el-radio-group {
      .el-radio__input.is-checked .el-radio__inner {
        background: #c52275;
        border-color: #c52275;
      }
    }
  }
  i {
    font-size: 17px;
    color: #18191d;
    position: absolute;
    left: 325px;
    top: 197px;
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
