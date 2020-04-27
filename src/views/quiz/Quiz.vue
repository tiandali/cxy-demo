<template>
  <div class="quizmain">
    <div class="leftTree">
      <div class="triangle"></div>
      <div class="tree">
        <a-tree showLine :defaultExpandedKeys="['0-0-0', '0-0-1', '0-0-2']" @select="onSelect">
          <a-icon slot="icon" type="carry-out" />
          <a-tree-node key="0-0">
            <a-icon slot="icon" type="carry-out" />
            <span slot="title" class="treeroot" style="color: #5a7095">首页</span>
            <a-tree-node title="一级分类一" key="0-0-0">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node title="二级分类一" key="0-0-0-0">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node title="三级分类一" key="0-0-0-1">
                  <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
              </a-tree-node>
              <a-tree-node title="二级分类二" key="0-0-0-1">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node title="三级分类一" key="0-0-1-0">
                  <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
              </a-tree-node>
              <a-tree-node title="二级分类三" key="0-0-0-2">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node title="三级分类一" key="0-0-4-0">
                  <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
              </a-tree-node>
            </a-tree-node>
            <a-tree-node title="一级分类二" key="0-0-1">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node title="二级分类二" key="0-0-2-2">
                <a-icon slot="icon" type="carry-out" />
              </a-tree-node>
            </a-tree-node>
            <a-tree-node title="一级分类三" key="0-0-2">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node title="二级分类三" key="0-0-2-0">
                <a-icon slot="icon" type="carry-out" />
              </a-tree-node>
            </a-tree-node>
          </a-tree-node>
        </a-tree>
      </div>
    </div>
    <div class="rightMain">
      <div class="rightContent">
        <div class="triangle"></div>
        <div class="titleName">{{titleName}}</div>
        <div class="picMain">
          <!-- <img src="../../assets/img/filepic.png" alt /> -->
          <!-- <embed
            src="https://pan.baidu.com/disk/pdfview?path=%2F.pdf%2F%E9%A9%AC%E5%B0%94%E5%85%8B%E6%96%AF%EF%BC%9A%E6%B4%BB%E7%9D%80%E4%B8%BA%E4%BA%86%E8%AE%B2%E8%BF%B0%E7%94%9F%E6%B4%BB.pdf"
            width="100%"
            height="100%"
            alt
          />-->
          <!-- <embed
            src="https://netdisk-pan.baidupcs.com/disk/docview?bdstoken=a110f19e65cd987a2722b8a651c3554b&uk=708071480&path=%2F%E8%8C%B6c%E9%A2%9Ccyys%2F%E8%8C%B6%E9%A2%9C%E6%96%87%E6%A1%A3%E5%85%B7%E4%BD%93%E9%85%8D%E6%96%B9%2F1%E8%8C%B6%E9%A2%9C%E6%82%A6%E8%89%B2%E6%96%B0%E5%93%81%E9%85%8D%E6%96%B9.xlsx"
            width="100%"
            height="100%"
            alt
          />-->

          <iframe
            src="http://view.officeapps.live.com/op/view.aspx?src=https://www.xiangya.com.cn/uploadfiles/20190823/20190823152130306.xls?web=1"
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
export default {
  name: "Quiz",
  data() {
    return {
      showLine: true,
      showIcon: false,
      titleName: "选中的title",
      showTable: false,
      tableData: [
        {
          name: "感冒",
          type: "疾病",
          num: "111"
        },
        {
          name: "土豆",
          type: "食物",
          num: "222"
        },
        {
          name: "猪肉",
          type: "食物",
          num: "333"
        },
        {
          name: "草莓",
          type: "水果",
          num: "444"
        }
      ]
    };
  },
  created() {},
  methods: {
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleSearch(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/info",
        query: {
          id: row.name
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
    width: calc(100vw- 650px);
    height: calc(100vh - 150px);
    overflow: auto;
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
      flex: 1;
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