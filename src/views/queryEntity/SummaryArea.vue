<template>
  <div class="areaMain">
    <div class="pic">
      <img
        v-if="this.$route.query.id==='太空体系'"
        style="width: 100%; height: 218px;"
        src="../../assets/img/太空.png"
      />
      <img
        v-else-if="this.$route.query.id==='核体系'"
        style="width: 100%; height: 218px;"
        src="../../assets/img/核.png"
      />
      <img
        v-else-if="this.$route.query.id==='制空作战体系'"
        style="width: 100%; height: 218px;"
        src="../../assets/img/制空.png"
      />
      <img
        v-else-if="this.$route.query.id==='导弹防御体系'"
        style="width: 100%; height: 218px;"
        src="../../assets/img/导弹.png"
      />

      <img v-else style="width: 100%; height: 218px;" src="../../assets/img/太空.png" />
    </div>
    <div class="sub">
      <p v-if="this.$route.query.id==='太空体系'">{{sub}}</p>
      <p v-else-if="this.$route.query.id==='核体系'">{{sub2}}</p>
      <p v-else-if="this.$route.query.id==='制空作战体系'">{{sub}}</p>
      <p v-else-if="this.$route.query.id==='导弹防御体系'">{{sub2}}</p>
      <p v-else-if="this.$route.query.id==='制海作战体系'">{{sub}}</p>
      <p v-else>{{sub2}}</p>
    </div>
    <div class="same" v-if="showtext===true">
      <div class="textStyle" v-for="same in sames" :key="same">{{same}}</div>
    </div>
    <div class="same" v-else>
      <div class="textStyle" v-for="same2 in sames2" :key="same2">{{same2}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SummaryArea",
  data() {
    return {
      // url:
      // "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      sub:
        "美国太空军（英语：United States Space Force）是美国空军部下属的一个独立部队，其主要职责是为美国在外太空执行军事任务。它是自1947年以来美国空军独立以来成立的第六个军事部门和第一个新出现的部队军种，也是国防部三大军事部门之一下属的一个部门,太空军由空军部直接领导，向国防部长报告，由总统任命并获得参议院授权，太空军军种主官是太空作战部长，负责对太空军各部门进行监督。 ",
      sames: ["美国太空军", "美国空军部", "外太空", "军事任务", "国防部"],
      sub2:
        "美国海军（英语：United States Navy，缩写：USN或U.S. Navy），是一个美军军种，负责管理所有与海军有关的事务。其职责为：“配备、训练和武装一支有能力赢得战争、阻止入侵和保证海域自由的海军战斗部队。”]美国海军目前有近500,000现役和预备役海军军人、2852艘现役大小军舰。海军旗下设有空中部队，拥有超过3,700架飞机，主要包括F/A-18E/F超级大黄蜂式打击战斗机及SH-60海鹰直升机，使得美国海军成为全球第四大的空战部队。",
      sames2: ["美军军种", "海军", "战斗机", "SH-60海鹰直升机"],
      showtext: true
    };
  },
  created() {
    const name = this.$route.query.id;
    console.log("name: ", name);
    const type = ["太空体系", "制空作战体系", "制海作战体系"];
    if (type.includes(name)) {
      this.showtext = true;
    } else {
      this.showtext = false;
    }
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.areaMain {
  display: flex;
  flex: 1;
  flex-direction: column;
  // background: pink;
  .same {
    display: flex;
    flex-wrap: wrap;

    .textStyle {
      color: #fff;
      padding: 8px;
      margin-right: 20px;
      margin-bottom: 10px;
      background: #c52275;
      font-size: 12px;
      font-family: Source Han Sans CN;
      border-radius: 2px;
    }
  }
  .sub,
  p {
    max-height: 300px;
    margin-bottom: 20px;
    color: #999;
    font-size: 14px;
    display: box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pic {
    margin-bottom: 20px;
  }
}
</style>