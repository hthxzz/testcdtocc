<template>
  <div class="CyclingTime-wrapper nomap-content-container">
    <panelTitle title="平均骑行统计" :displaySwitch="false" />
    <section class="search-wrapper">
       <SearchPanel :searchConfig="searchConfig" ></SearchPanel>
    </section>
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <div class="item">
        <div class="echar-pie" style="height: 300px">
         <v-chart :options="WeekOption"  theme="theme" />
        </div>
      </div>
    </section>
    <section class="table-wrapper">
      <div class="item">
        <TableAndPagination
          :detailFormConfig="detailFormConfig"
          :totalP="total"
          @fetchTableData="fetchTableData"
          @handleDetail="handleDetail"
          @getSearchValue="getSearchValue"
        >
          <el-table
            style="width: 100%;height:100%;overflow-y: auto"
            :height="tableHeight"
            :data="tableData"
            stripe
            ref="table"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="营运企业" prop="2"></el-table-column>
            <el-table-column label="统计时间" prop="4"></el-table-column>
            <el-table-column label="平均骑行距离" prop="5"></el-table-column>
            <el-table-column label="平均骑行时间" prop="6"></el-table-column>
            <el-table-column label="平均骑行速度" prop="7"></el-table-column>
          </el-table>
        </TableAndPagination>
      </div>
    </section>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
// import { option3 } from "./options";
export default {
  name: "",
  mixins: [tableMixins],
  mounted() {
    this.getWeekData();
  },
  methods: {
    getWeekData(data){
      var time=[],ky=[],qn=[];
      // if(data.barChartData&&data.barChartData.length>0){
      //   data.barChartData.forEach(e=>{
      //     time.push(e.weekName);
      //     ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
      //     qn.push(((e.yoyPassengerVolume!=null?e.yoyPassengerVolume:0)/10000).toFixed(2));
      //   })
      // }
      var testData2={
        title:"2020年周日均客流情况",
        unitName:['公里/日','时间 分钟/日',"速度：km/h/E"],
        legendData:['距离','时间','速度'],
        xAxisData:["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月","十月","十一月","十二月"],
        seriesData:[["24.61", "34.75", "35.17", "36.03", "36.62", "36.39", "27.33","30.35","29.45","33.33","36.12","27.56"],["48.98", "59.31", "59.72", "58.71", "58.41", "62.94", "52.22", "49.72", "53.71", "55.41", "51.94", "52.52"],["24.61", "34.75", "35.17", "36.03", "36.62", "36.39", "27.33","30.35","29.45","33.33","36.12","27.56"]]
      }
      this.WeekOption=this.$utils.echart.creatEchartOption_9_1_1(testData2);
    },
    // workCountFormat(row) {
    //   return row.workNum == null ? 0 : row.workNum;
    // },
    // restCountFormat(row) {
    //   return row.restNum == null ? 0 : row.restNum;
    // },
    getChars() {
    //   this.$http
    //     .$get("/gxdc_bikeServiceAnalysisHandler/getCycleTimesInTime")
    //     .then(data => {
    //       let xAxisData = [],
    //         seriesData = [],
    //         legendData = ["工作日", "节假日"],
    //         ydata = [],
    //         ydata2 = [];
    //       for (const item of data.results) {
    //         xAxisData.push(item.hour);
    //         ydata.push(item.workNum == null ? 0 : item.workNum);
    //         ydata2.push(item.restNum == null ? 0 : item.restNum);
    //       }ConfigurationWarning
    //       seriesData.push(ydata);
    //       seriesData.push(ydata2);
    //       let option = this.$utils.echart.getBarOption({
    //         xAxisData: xAxisData,
    //         legendData: legendData,
    //         seriesData: seriesData
    //       });
    //       this.option = option;
    //     });
    },
    getSearchValue(val) {
    //   this.getSearchTableValue(val);
    //   let isKeyV = this.searchConfig.isKeyV;
    //   const search = {
    //     page: this.currentPage,
    //     pageSize: this.pageSize
    //   };
    //   if (isKeyV) {
    //     Object.assign(search, val);
    //   } else {
    //     search.queryFields = JSON.stringify(val);
    //   }
    //   this.$http.$post(this.url, search).then(data => {
    //     if (this.showPagination) {
    //       this.tableData = data.results;
    //       this.total = data.totalRecordNum;
    //     } else {
    //       this.tableData = data;
    //     }
    //     let xAxisData = [],
    //       seriesData = [],
    //       legendData = ["工作日", "节假日"],
    //       ydata = [],
    //       ydata2 = [];
    //     for (const item of data.results) {
    //       xAxisData.push(item.hour);
    //       ydata.push(item.workNum == null ? 0 : item.workNum);
    //       ydata2.push(item.restNum == null ? 0 : item.restNum);
    //     }
    //     seriesData.push(ydata);
    //     seriesData.push(ydata2);
    //     let option = this.$utils.echart.getBarOption({
    //       xAxisData: xAxisData,
    //       legendData: legendData,
    //       seriesData: seriesData
    //     });
    //     this.option = option;
    //   });
    }
  },
  data() {
    return {
      url: "",
      WeekOption:{},
      option: {},
       searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 3,
            type: "select",
            label: "企业",
            placeholder: "企业名称",
            VModelvalue: {
              name: "busnessCode",
              defaultValue: ""
            },
            options: [
              {
                value: "",
                label: "全部"
              }
            ]
          },{
            order: 6,
            type: "select",
            label: "",
            placeholder: "",
            VModelvalue: {
              name: "lineCode",
              defaultValue: "1"
            },
            options: [
              {
                value: "1",
                label: "年"
              },
              {
                value: "2",
                label: "月"
              }
            ]
          }, {
            order: 14,
            type: "monthrange",
            formate: "yyyy-MM",
            label: "",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "statisticsDate",
              defaultValue: ""
            }
          }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        //   {
        //     action: "export",
        //     label: "导出"
        //   }
        ]
      },
    };
  }
};
</script>

<style lang="scss" scoped>
.CyclingTime-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  section:not(:first-child) {
    // flex: 1;
  }
  .search-wrapper {
    flex-basis: 50px;
  }
}
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
        li:nth-child(1) {
          font-size: 26px;
          color: red;
        }
        li:nth-child(2) {
          font-size: 26px;
          color: red;
          margin: 20px 0;
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
        span {
          display: inline-block;
          cursor: pointer;
          padding: 6px;
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
            background-color: #2056dd;
            border: 1px solid #2056dd;
            color: #fff;
          }
        }
      }
    }
  }
}
.table-wrapper {
  display: flex;
  flex-direction: column;
  .item {
    &:first-child {
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