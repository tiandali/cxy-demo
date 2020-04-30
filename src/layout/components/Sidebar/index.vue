<template>
  <div :class="{ 'has-logo': showLogo }" class="menubar">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <div class="text">
      <i class="iconfont iconhoutailogo"></i>
      <span>{{ title }}</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="false"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <!-- </el-scrollbar> -->
    <div class="company">
      <!-- <img :src="imgurl" alt /> -->
      <img src="../../../assets/img/2.png" alt />

      <div class="companyname">
        <span class="comText">{{ company }}</span>
        <span class="comEn">{{ companyEn }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      title: "美军体系经费知识库",
      imgurl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      company: "深圳航天科工集团有限公司",
      companyEn: "SHENZHEN AEROSPACE SCIENCE AND INDUSTRY CORPORATION"
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style lang="scss" scoped>
.menubar {
  background: #0f1629;
  padding: 0 30px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-content: center;
  .text {
    display: flex;
    height: 80px;
    line-height: 72px;
    align-content: center;
    height: 200px;

    .iconfont {
      margin-left: 14px;
      font-size: 38px;
      color: #13c6e2;
    }
    span {
      font-family: Source Han Sans CN;
      font-size: 20px;
      font-weight: 400;
      margin-left: 4px;
      color: #fff;
    }
  }
  .company {
    display: flex;
    // height: 80px;
    align-items: center;
    width: 290px;

    img {
      width: 60px;
      height: 40px;
    }
  }
  .companyname {
    display: flex;
    height: 80px;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
    .comText {
      color: #fff;
      font-size: 11px;
    }
    .comEn {
      color: #fff;
      // font-size: 5px;
      width: 250%;
      -webkit-transform-origin-x: 0;
      -webkit-transform: scale(0.5);
      transform: scale(0.4);
      font-size: 12px;
    }
  }
}
</style
>>
