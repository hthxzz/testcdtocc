<template>
  <div class="PassengerFlowTrend-wrapper">
    <!-- <h2>客流趋势分析</h2> -->
    <!-- 搜索开始 -->
    <section class="search-wrapper">
      <SearchPanel
        :searchConfig="this.$props.chartAndTable.searchConfig"
        @getSearchValue="getSearchValue"
        @handleQuery="handleQuery"
      ></SearchPanel>
    </section>
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <div class="item">
        <ul>
          <li>{{totalNumber}}</li>
          <li>{{ub}}</li>
        </ul>
      </div>
      <div class="item">
        <div class="echar-pie">
          <v-chart :options="option" />
        </div>
        <div class="btn-wrappper">
          <ChangeEchar :itemList="lengendForEchar" @getStatues="changeEchar"></ChangeEchar>
        </div>
      </div>
    </section>
    <!-- 表格开始 -->
    <section class="table-wrapper">
      <div class="item">
        <ChangeEchar :itemList="lengendFortable" @getStatues="changeTable"></ChangeEchar>
      </div>
      <div class="item" v-for="tableItem in tableList" :key="tableItem.order" v-if="tableItem.show">
        <TableAndPagination
          :showSearchPanel="false"
          :totalP="total"
          :showPagination="showPagination"
          @fetchTableData="fetchTableData"
          @handleDetail="handleDetail"
          @getSearchValue="getSearchValue"
        >
          <el-table
            style="width: 100%;height:100%;overflow-y: auto"
            :height="tableHeight"
            :data="tableDataForEchar"
            stripe
            :totalP="total"
            ref="table"
          >
            <!-- <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item  :label="item.label"
              :prop="item.name"
              v-for="item in tableItem.colconfig"
              :key="item.name"
               >
                    <span>{{ props.row[item.name] }}</span>
                  </el-form-item>
                 
                </el-form>
              </template>
            </el-table-column>-->
            <el-table-column
              :label="item.label"
              :prop="item.name"
              v-for="item in tableItem.colconfig"
              :key="item.name"
              v-if="item.formate"
            >
              <template slot-scope="scope">
                <span
                  style="color:rgba(255, 0, 0, 1)"
                  v-if="scope.row[item.name] > 0 "
                >{{ scope.row[item.name] }}%⬆</span>
                <span
                  style="color:rgba(255, 192, 0, 1)"
                  v-if="scope.row[item.name] < 0 "
                >{{ scope.row[item.name] }}%⬇</span>
              </template>
            </el-table-column>

            <el-table-column v-else :label="item.label" :prop="item.name"></el-table-column>
            <!-- <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                        </template>
            </el-table-column>-->
          </el-table>
        </TableAndPagination>
      </div>
      <!-- <div class="item" v-else>
        <TableAndPagination :showSearchPanel="false" :showPagination="showPagination" >
          <el-table
            style="width: 100%;height:100%;overflow-y: auto"
            :height="tableHeight"
            :data="tableData"
            stripe
            ref="table"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item  :label="item.label"
              :prop="item.name"
              v-for="item in tableBCol"
              :key="item.name"
               >
                    <span>{{ props.row[item.name] }}</span>
                  </el-form-item>
                 
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              :label="item.label"
              :prop="item.name"
              v-for="item in tableBCol"
              :key="item.name"
              v-if="item.formate"
            >
              <template slot-scope="scope">
                <span
                  style="color:rgba(255, 0, 0, 1)"
                  v-if="scope.row[item.name] > 0 "
                >{{ scope.row[item.name] }}%⬆</span>
                <span
                  style="color:rgba(255, 192, 0, 1)"
                  v-if="scope.row[item.name] < 0 "
                >{{ scope.row[item.name] }}%⬇</span>
              </template>
            </el-table-column>

            <el-table-column v-else :label="item.label"
              :prop="item.name"></el-table-column>
          </el-table>
        </TableAndPagination>
      </div>-->
    </section>
    <!-- <DetailForm></DetailForm> -->
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
// import { echarAndTableConfig } from "../../../views/monitoringAndEarlyWarning/common/config";
export default {
  name: "ChartAndTable",
  props: {
    chartAndTable: Object //组件整体配置项
  },
  mounted() {
    this.url = this.chartAndTable.tableConfig.tableList[0].url;
  },
  mixins: [tableMixins],
  watch: {
    tableData() {
      this.getTotalNum();
      this.getEcharOption();
      this.tableDataForEchar = this.tableData.downTable;
    }
  },
  methods: {
    // 获取统计总数
    getTotalNum() {
      this.totalNumber = this.tableData.upTable.total;

      // let statisticName = this.chartAndTable.charConfig.statisticName;

      // let flag = Number.isInteger(statisticName);
      // if (flag) {
      //   this.totalNumber = statisticName;
      //   return;
      // }
      //     const tableData = this.tableData;
      //     this.totalNumber = tableData.reduce((total, item)=>{
      //       if (Number.isNaN(parseFloat(item[this.statisticName]))) {
      //             return total +  0;
      //           }else{
      //             return total +  item[this.statisticName];
      //           }
      //       },0);
    },
    getEcharOption(type) {
      const tableData = this.tableData.upTable.list;
      const echarConfig = this.echarConfig;
      let legendData = echarConfig[0].legendData;
      let xAxisData = [];
      let seriesData = [];
      let yName = [];
      for (const item of tableData) {
        xAxisData.push(item["date"]);
        yName.push(item["flow"]);
      }
      seriesData.push(yName);
      if (type != "bar") {
        this.option = this.$utils.echart.getLineOption({
          xAxisData: xAxisData,
          legendData: legendData,
          seriesData: seriesData
        });
      } else {
        this.option = this.$utils.echart.getBarOption({
          xAxisData: xAxisData,
          legendData: legendData,
          seriesData: seriesData
        });
      }
    },
    getSearchValue(val) {
      let isKeyV = this.chartAndTable.searchConfig.isKeyV;
      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      if (isKeyV) {
        Object.assign(search, val);
      } else {
        search.queryFields = JSON.stringify(val);
      }
      this.$http.$post(this.url, search).then(data => {
        if (this.showPagination) {
          this.tableData = data.results;
          this.total = data.totalRecordNum;
        } else {
          this.tableData = data;
          // this.total = data.totalRecordNum;
        }
      });
    },
    handleQuery(content) {
      console.log(content);
    },
    // 切换echar图表
    changeEchar(content) {
      if (content == "趋势图") {
        this.getEcharOption();
      } else if (content == "对比图") {
        this.getEcharOption("bar");
      }
    },
    // 切换表格
    changeTable(content) {
      if (content == "分区间统计数据") {
        this.tableOneShow = true;
        this.url = this.$props.chartAndTable.tableConfig.tableA.url;
      } else if (content == "分线路统计数据") {
        this.tableOneShow = false;
        this.url = this.$props.chartAndTable.tableConfig.tableB.url;
      }
    }
  },
  data() {
    return {
      option: {},
      tableDataForEchar: [],
      totalNumber: "--", //大数字
      url: "", // 表格获取数据的地址
      showPagination: false, //是否显示白哦个分页按钮
      tableOneShow: true, // 显示第一个还是第二个表格
      ub: this.chartAndTable.charConfig.ub, // 大数字下面的那个标题
      statisticName: this.chartAndTable.charConfig.statisticName, // 根据表格 字段 自动计算 总客流
      echarConfig: this.chartAndTable.charConfig.echarConfig, // echar配置
      lengendForEchar: this.chartAndTable.charConfig.lengendForEchar
        ? this.chartAndTable.charConfig.lengendForEchar
        : [
            { value: "趋势图", code: "111" },
            { code: 222, value: "对比图" }
          ], // echar上面的切换按钮

      lengendFortable: this.chartAndTable.tableConfig.lengendFortable, // 表格上面的切换按钮
      tableList: this.chartAndTable.tableConfig.tableList // 表格
    };
  }
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.PassengerFlowTrend-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  section:not(:first-child) {
    flex: 1;
  }
  .search-wrapper {
    flex-basis: 50px;
  }
}
// .echar-wrapper {
//   .item{
//     ul{
//         li:nth-child(1) {
//           font-size: 26px;
//           color: red;
//         }
//         li:nth-child(2) {
//           font-size: 26px;
//           color: red;
//           margin: 20px 0;
//         }
//     }
//   }
// }
.echar-wrapper {
  display: flex;
  background-image: linear-gradient(to right, rgba(32, 86, 221, 0.4), #0a1e53);
  .item {
    &:first-child {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        text-align: center;
        border-radius: 4px;
        li:nth-child(1) {
          width: 140px;
          border-radius: 4px;
          height: 66px;
          letter-spacing: 1px;
          color: #00ffff;
          font-weight: bolder;
          font-size: 24px;
          line-height: 66px;
          background: rgba(32, 86, 221, 1);
        }
        li:nth-child(2) {
          background: rgba(5, 14, 40, 0.4);
          border-radius: 4px;
          width: 140px;
          height: 50px;
          font-weight: bold;
          line-height: 51px;
          font-size: 14px;
          color: #ffffff;
          // margin: 20px 0;
        }
        li:nth-child(3) {
          font-size: 22px;
          color: yellow;
        }
      }
    }
    &:last-child {
      flex: 5;
      position: relative;
      .echar-pie {
        width: 100%;
        height: 100%;
      }
      .btn-wrappper {
        position: absolute;
        top: 10px;
        right: 120px;
        // span{
        //     display: inline-block;
        //     cursor: pointer;
        //     padding: 6px;
        //     border-radius: 10px;
        //     font-size: 14px;
        //     &:first-child{
        //         background-color: #fff;
        //         border: 1px solid #fff;
        //         color: #2056dd;
        //     }
        //     &:last-child{
        //         background-color: aqua;
        //         margin-left: 20px;
        //          background-color: #2056dd;
        //         border: 1px solid #2056dd;
        //         color: #fff;
        //     }
        // }
      }
    }
  }
}
.table-wrapper {
  display: flex;
  flex-direction: column;
  .item {
    &:first-child {
      margin-top: 20px;
      flex-basis: 26px;
      line-height: 26px;
      span {
        display: inline-block;
        cursor: pointer;
        padding: 3px;
        border-radius: 10px;
        font-size: 14px;
        &:first-child {
          background-color: #fff;
          border: 1px solid #fff;
          color: #2056dd;
        }
        &:last-child {
          background-color: aqua;
          margin-left: 20px;
          background-color: #485dcc;
          border: 1px solid #485dcc;
          color: #fff;
        }
      }
    }
    &:last-child {
      flex: 1;
      height: calc(100% - 30px);
    }
  }
}
</style>