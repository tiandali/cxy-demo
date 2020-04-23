<template>
  <div class="quizmain">
    <div class="leftTree">
      <div>
        <a-tree showLine :defaultExpandedKeys="['0-0-0', '0-0-1', '0-0-2']" @select="onSelect">
          <a-icon slot="icon" type="carry-out" />
          <a-tree-node key="0-0">
            <a-icon slot="icon" type="carry-out" />
            <span slot="title" style="color: #1890ff">首页</span>
            <a-tree-node title="一级分类一" key="0-0-0">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node title="二级分类一" key="0-0-0-0">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node title="三级分类一" key="0-0-1-0">
                  <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
              </a-tree-node>
              <a-tree-node title="二级分类一" key="0-0-0-1">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node title="三级分类一" key="0-0-1-0">
                  <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
              </a-tree-node>
              <a-tree-node title="二级分类一" key="0-0-0-2">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node title="三级分类一" key="0-0-1-0">
                  <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
              </a-tree-node>
            </a-tree-node>
            <a-tree-node title="一级分类二" key="0-0-1">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node title="二级分类二" key="0-0-1-0">
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
        <div class="titleName">{{titleName}}</div>
        <div class="picMain">
          <img src="../../assets/img/filepic.png" alt />
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
  .ant-tree li ul {
    padding-left: 25px;
  }
  .ant-tree-child-tree {
    &::before {
      position: absolute;
      left: -12px;
      top: 25px;
      color: #5a7095;
      content: "--------";
    }
  }
  .ant-tree-treenode-switcher-close {
    &::before {
      position: absolute;
      left: -12px;
      top: 25px;
      color: rgb(14, 13, 13);
      content: "--------";
    }
  }
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
  .ant-tree li {
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
  }
  .ant-tree.ant-tree-show-line li:not(:last-child)::before {
    position: absolute;
    left: 35px;
    width: 1px;
    height: 100%;
    height: calc(100% - 22px);
    margin: 22px 0 0;
    border-left: 1px dashed #5a7095;
    content: " ";
  }
  .ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
    //三级菜单的小图标
    display: none;
  }

  .ant-tree-node-content-wrapper-normal {
    &::before {
      color: #5a7095;
      margin-left: -40px;
      content: "--------";
    }
  }
}
</style>