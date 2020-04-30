<template>
  <div class="quizmain">
    <div class="leftTree">
      <div class="triangle"></div>
      <div class="tree">
        <a-tree
          showLine
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          @select="onSelect"
          :selectedKeys="selectedKeys"
          :treeData="treeData"
        />
      </div>
    </div>
    <div class="rightMain">
      <div class="rightContent">
        <div class="triangle"></div>
        <div class="titleName">{{titleName}}</div>
        <div class="picMain">
          <iframe
            v-if="ischangefile"
            src="http://view.officeapps.live.com/op/view.aspx?src=http://www.yiwugogo.com/2.xlsx?web=1"
            width="100%"
            height="100%"
            frameborder="1"
          ></iframe>
          <iframe
            v-else
            src="http://view.officeapps.live.com/op/view.aspx?src=http://www.yiwugogo.com/1.xlsx?web=1"
            width="100%"
            height="100%"
            frameborder="1"
          ></iframe>
        </div>
        <div class="btnstyle">
          <a-button type="primary" @click="queryTable">实体提取</a-button>
        </div>
        <div v-if="showTable" class="tableMain">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="实体名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="实体类型">
              <template slot-scope="scope">
                <el-tag size="medium">{{ scope.row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="出现次数">
              <template slot-scope="scope">
                <div class="rowlayout">
                  <span>{{scope.row.num}}</span>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleSearch(scope.$index, scope.row)"
                  >查询实体</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { treeData } from "./treeData";
export default {
  name: "Quiz",
  data() {
    return {
      ischangefile: true,
      showLine: true,
      showIcon: false,
      titleName: "卫星通信系统",
      showTable: false,
      expandedKeys: ["0-0"],
      autoExpandParent: true,
      selectedKeys: ["太空-0"],
      treeData,
      tableData: [
        {
          name: "卫星",
          type: "太空体系",
          num: "84"
        },
        {
          name: "原子弹",
          type: "核体系",
          num: "42"
        },
        {
          name: "火箭",
          type: "导弹防御体系",
          num: "536"
        },
        {
          name: "网络",
          type: "网电对抗体系",
          num: "354"
        },
        {
          name: "航空母舰",
          type: "制海作战体系",
          num: "457"
        },
        {
          name: "轰炸机",
          type: "制空作战体系",
          num: "844"
        }
      ]
    };
  },
  created() {
    this.treeData = treeData;
  },
  mounted() {
    this.treeData = treeData;
  },
  watch: {
    treeData(newval, oldval) {
      this.treeData = treeData;
    }
  },
  methods: {
    onExpand(expandedKeys) {
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect(selectedKeys, info) {
      const { selectedNodes } = info;
      const test1 = selectedNodes[0] ? selectedNodes[0].data : {};
      const test2 = test1.props ? test1.props : {};
      const selectName = test2.title ? test2.title : {};
      this.titleName = selectName;
      this.selectedKeys = selectedKeys;
      this.ischangefile = !this.ischangefile;
    },
    handleEdit(index, row) {},
    handleSearch(index, row) {
      this.$router.push({
        path: "/info",
        query: {
          id: row.type
        }
      });
    },
    queryTable() {
      this.showTable = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.quizmain {
  background: #00071a;
  max-height: calc(100vh - 100px);
  display: flex;
  flex: 1;
  padding: 30px 30px 30px 50px;
  .leftTree {
    background: #02102d;
    margin-right: 30px;
    display: flex;
    width: 450px;
    height: calc(100vh - 150px);
    overflow-y: auto;
    overflow-y: overlay;
    flex-direction: column;
    padding: 30px;
    position: relative;
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
    .tree {
      .ant-tree,
      .ant-tree-show-line,
      .ant-tree-icon-hide {
        .ant-tree-treenode-switcher-open {
          li {
            margin: 0;
            padding: 25px 25px 0 25px;
            white-space: nowrap;
            list-style: none;
            outline: 0;
            &::before {
              position: absolute;
              left: 35px;
              width: 1px;
              height: 100%;
              height: calc(100% - 22px);
              margin: 22px 0 0;
              border-left: 1px dashed #5a7095;
              content: " ";
            }
            ul {
              .ant-tree-child-tree:not(:first-child) {
                &::before {
                  position: absolute;
                  left: -12px;
                  top: 25px;
                  color: #5a7095;
                  content: "--------";
                }
              }
            }
          }
        }
        .ant-tree-treenode-switcher-close {
          &::before {
          }
        }
        li ul {
          padding-left: 25px;
        }
      }
    }

    // .ant-tree-treenode-switcher-close {
    //   &::before {
    //     position: absolute;
    //     left: -12px;
    //     top: 25px;
    //     color: rgb(14, 13, 13);
    //     content: "--------";
    //   }
    // }
    .ant-tree.ant-tree-show-line li span.ant-tree-switcher {
      color: #afb9c8;
      background: #02102d;
      font-size: 20px;
    }
    .ant-tree li .ant-tree-node-content-wrapper {
      color: #5a7095;
      font-size: 16px;
    }
    .ant-tree-child-tree > li:first-child {
      padding-top: 25px;
      padding-left: 25px;
    }
  }
  // .ant-tree.ant-tree-show-line li:not(:last-child)::before {
  //   position: absolute;
  //   left: 35px;
  //   width: 1px;
  //   height: 100%;
  //   height: calc(100% - 22px);
  //   margin: 22px 0 0;
  //   border-left: 1px dashed #5a7095;
  //   content: " ";
  // }
  .ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
    //三级菜单的小图标
    display: none;
  }

  .ant-tree-node-content-wrapper-normal {
    &::before {
      color: #5a7095;
      margin-left: -45px;
      content: "--------";
    }
  }

  .rightMain {
    display: flex;
    flex: 1;
    width: calc(100vw- 700px);
    height: calc(100vh - 150px);
    overflow: auto;
    overflow: overlay;
    background: #02102d;
    flex-direction: column;
    padding-right: 20px;
  }
  .rightContent {
    display: flex;
    flex: 1;
    padding: 30px;
    flex-direction: column;
    position: relative;
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

    .titleName {
      height: 24px;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      line-height: 25px;
      color: #daf2f6;
      margin-bottom: 20px;
    }
    .picMain {
      display: flex;
      // flex: 1;
      height: 580px;
    }
    .btnstyle {
      display: flex;
      justify-content: flex-end;
      margin: 30px;
      .ant-btn {
        background: #c52275;
        border-color: #c52275;
        width: 120px;
      }
    }
    .tableMain {
      .rowlayout {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>