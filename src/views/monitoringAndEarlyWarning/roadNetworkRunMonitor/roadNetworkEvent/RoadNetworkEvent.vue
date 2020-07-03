<template>
  <div class="road-network-event-wrap nomap-content-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <div class="imgWrap">
            <img src="./img/lwsj_qb.png" alt />
          </div>
          <div for="全部">全部</div>
        </span>
        <div class="road-network-event-content">
          <TableAndPagination
            :AddFormConfig="AddFormConfig"
            :detailFormConfig="detailFormConfig"
            :showSearchPanel="false"
            :showPagination="false"
          >
            <el-table style="width: 100%;height:100%;overflow-y: auto" :data="tableData" stripe>
              <el-table-column label="事件名称" prop="eventName"></el-table-column>
              <el-table-column label="事件类型" prop="evenType"></el-table-column>
              <el-table-column label="所在路线" prop="eventLine"></el-table-column>
              <el-table-column label="发生时间" prop="eventTime"></el-table-column>
              <el-table-column label="发生地点" prop="eventAddress"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="table-detail-btn"
                    @click="handleDetail(scope.row)"
                  >详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </TableAndPagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="阻断事件">
        <span slot="label">
          <div class="imgWrap">
            <img src="./img/lwsj_yd.png" alt />
          </div>
          <div for="阻断事件">阻断事件</div>
        </span>

        <zdsj />
      </el-tab-pane>
      <el-tab-pane label="拥堵预警">
        <span slot="label">
          <div class="imgWrap">
            <img src="./img/lwsj_yj.png" alt />
          </div>
          <div for="拥堵预警">拥堵预警</div>
        </span>

        <ydyj />
      </el-tab-pane>
      <el-tab-pane label="交通事件">
        <span slot="label">
          <div class="imgWrap">
            <img src="./img/lwsj_jt.png" alt />
          </div>
          <div for="交通事件">交通事件</div>
        </span>

        <jtsj />
      </el-tab-pane>
      <el-tab-pane label="公共预警">
        <span slot="label">
          <div class="imgWrap">
            <img src="./img/lwsj_jt.png" alt />
          </div>
          <div for="公共预警">公共预警</div>
        </span>

        <ggyj />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { AddFormConfig } from "@/components/common/addForm/AddFormConfig.js";
import { detailFormConfig } from "@/components/common/tableAction/detailForm/detailFormConfig.js";
import zdsj from "./components/zdsj.vue";
import ggyj from "./components/ggyj.vue";
import jtsj from "./components/jtsj.vue";
import ydyj from "./components/ydyj.vue";
export default {
  name: "",
  components: {
    zdsj,
    ggyj,
    jtsj,
    ydyj
  },
  inheritAttrs: false,
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     // 通过 `vm` 访问组件实例
  //     vm.searchConfig.searchCondition[0].VModelvalue.defaultValue =
  //       to.params.search;
  //   });
  // },
  mounted() {
    // this.searchConfig.searchCondition[0].VModelvalue.defaultValue =
    //   "aaaaaaaaaaa";
  },
  methods: {
    handleNextClick() {
      console.log("handleNextClick");
    },
    handleDetail(row) {
      const data = this.detailFormConfig.data;
      let that = this;
      this.$http
        .$get2(this.detailFormConfig.url, { name: row.name })
        .then(result => {
          const res = result.data.result[0];
          const keys = Object.keys(res);
          that;
          data.forEach(val => {
            val.forEach(val2 => {
              for (const key of keys) {
                if (val2.key == key) {
                  if (val2.formate) {
                    val2.value = val2.formate(res[key]);
                  } else {
                    val2.value = res[key];
                  }
                }
              }
            });
          });
          // const test = {a} = {"a":"aaaaaa","b":"bbbbbbb","c":"ccccccc"};
          this.detailFormConfig.data = data;
          this.$store.state.app.fullscreenLoading = false;
          this.detailFormConfig.show = true;
        });
    },
    close() {
      this.AddFormConfig.dialogFormVisible = false;
    }
  },
  data() {
    return {
      operationList: ["detail"],
      dialogFormVisible: false,
      AddFormConfig: AddFormConfig,

      tableData: [
        ...new Array(16).fill({
          eventName: "天府一街道路拥堵",
          evenType: "阻断事件",
          eventLine: "天府一街",
          eventTime: "2019/08/23 15:35",
          eventAddress: "从川大路东延线到益州大道中段-由西向东"
        })
      ],
      searchButtonList: [
        {
          order: 1,
          label: "查询"
        },
        {
          order: 2,
          label: "添加"
        }
      ],
      detailFormConfig: detailFormConfig,

      searchConfig: {
        searchCondition: [
          {
            type: "input",
            label: "",
            // width: "123px",
            placeholder: "事件名称",
            VModelvalue: {
              name: "name",
              defaultValue: "a"
            }
          },
          {
            type: "input",
            label: "",
            // width: "123px",
            placeholder: "路线编码",
            VModelvalue: {
              name: "lxbm",
              defaultValue: "11111111111"
            }
          },
          {
            type: "select",
            label: "",
            placeholder: "事件类型",
            VModelvalue: {
              name: "select",
              defaultValue: ""
            },
            options: [
              {
                value: "选项1",
                label: "全部"
              },
              {
                value: "选项2",
                label: "阻断事件"
              },
              {
                value: "选项3",
                label: "拥堵预警"
              },
              {
                value: "选项4",
                label: "阻断事件"
              },
              {
                value: "选项5",
                label: "交通事件"
              },
              {
                value: "选项6",
                label: "交通事件"
              }
            ]
          },
          {
            type: "datetimerange",
            formate: "yyyy-MM-dd HH:mm:ss",
            label: "",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "date1",
              defaultValue: "2"
            }
          }
        ],
        searchButton: [
          {
            order: 1,
            label: "查询"
          },
          {
            order: 2,
            label: "添加"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
$backgroundColor: rgba(5, 12, 38, 1);
.road-network-event-wrap {
  // width:100%;
  height: 100%;
  overflow-y: auto;
  // background: rgba(5, 12, 38, 1);
  // border: 1px solid rgba(32, 86, 221, 0.6);
  // background-image: url("./img/search_bg.png");
  background-size: 124px 120px;
  background-repeat: no-repeat;
  background-position: right top;
}
.road-network-event-content {
  height: 100%;
}
.bgimg {
  position: absolute;
  top: 45px;
  right: 19px;
  width: 124px;
  height: 120px;
}
.imgWrap {
  width: 48px;
  height: 48px;
  background: rgba(32, 86, 221, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgWrap > img {
  width: 34px;
  height: 34px;
  vertical-align: bottom;
}
</style>
<style lang="scss">
.el-tabs--border-card {
  // background: rgba(5, 12, 38, 1);
  border: 0;
  margin-top: 21px;
  height: 100%;
  .el-tabs__header {
    // background: rgba(5, 12, 38, 1);
    border: 0;
  }
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  // background: rgba(5, 12, 38, 1);
  border: 0;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: 0;
}
</style>