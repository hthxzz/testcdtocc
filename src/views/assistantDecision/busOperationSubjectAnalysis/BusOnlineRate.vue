<template>
  <div class="statistical-analysis-container nomap-content-container">
    <section>
      <div class="search">
        <section class="search-wrapper">
          <SearchPanel
            :searchConfig="searchConfig"
            @getSearchValue="getSearchValue"
            @handleQuery="handleQuery"
          ></SearchPanel>
        </section>
      </div>
      <div class="indexContent" style="height:580px">
        <div class="top">
          <v-chart :options="option3" :autoresize="true" />
        </div>
        <div class="OperationComplaint-wrapper">
          <!-- <h2>营运投诉</h2> -->
          <TableAndPagination
            :totalP="total"
            :showSearchPanel="false"
            @fetchTableData="fetchTableData"
          >
            <el-table
              style="width: 100%;height:100%;overflow-y: auto"
              :height="308"
              :data="tableData"
              stripe
              ref="table"
            >
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="时间" prop="lineName"></el-table-column>
              <el-table-column label="营运车辆在线数" prop="stationName" :formatter="this.formateTraffic"></el-table-column>
              <el-table-column label="营运车辆在线率" prop="stationName" :formatter="this.formateTraffic"></el-table-column>
              <!-- <el-table-column label="统计方式" prop="hour"></el-table-column> -->
              <el-table-column label="非营运车辆在线数" prop="staticDate"></el-table-column>
              <el-table-column
                label="非营运车辆在线率"
                prop="passengerVolumeYoy"
                :formatter="this.formateTraffic"
              ></el-table-column>
              <el-table-column
                label="车辆总体在线数"
                prop="passengerVolumeYoy"
                :formatter="this.formateTraffic"
              ></el-table-column>
              <el-table-column
                label="车辆总体在线率"
                prop="passengerVolumeYoy"
                :formatter="this.formateTraffic"
              ></el-table-column>
              <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="table-detail-btn"
                    @click="handleDetail( scope.row)"
                  >详情</el-button>
                </template>
              </el-table-column>-->
            </el-table>
          </TableAndPagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "linePassengerFlow",
  mixins: [tableMixins],
  mounted() {
    // this.setSearchInitValue();
    // this.getPassengerFlowByPage();
    // this.handleSearch();
    // this.getAllLineData();
    this.handleQuery();
  },
  methods: {
    getAllLineData() {
      this.$http.$get("/gdjc_infoManagerHandler/getLine").then(res => {
        if (res != null && res.length > 0) {
          res.forEach(e => {
            this.searchConfig.searchCondition[0].options.push({
              value: e.lineCode,
              label: e.lineName
            });
          });
        }
      });
    },
    getSearchValue(val) {
      // this.searchConfig.searchCondition[1].options=[{value:"",label:"全部站点"}];
      // if (val.lineCode!=""){
      //     this.$http.$get('/gdjc_infoManagerHandler/getStationByLine',{lineCode:val.lineCode}).then(res => {
      //         if(res!=null&&res.length>0){
      //             res.forEach(e=>{
      //                 this.searchConfig.searchCondition[1].options.push({value:e.stationName,label:e.stationName});
      //             })
      //         }
      //     });
      // }else{
      //     val.stationName='';
      // }
      if (val.frequency == "年") {
        this.searchConfig.searchCondition[3].type = this.searchConfig.searchCondition[4].type =
          "year";
        this.searchConfig.searchCondition[3].formate = this.searchConfig.searchCondition[4].formate =
          "yyyy";
        this.searchConfig.searchCondition[3].VModelvalue.defaultValue = this.searchConfig.searchCondition[4].VModelvalue.defaultValue = this.$utils
          .dayjs()
          .format("YYYY");
        if (val.startStaticDate.length > 4) {
          val.startStaticDate = val.startStaticDate.split("-")[0];
          val.endStaticDate = val.endStaticDate.split("-")[0];
        }
      } else if (val.frequency == "月") {
        this.searchConfig.searchCondition[3].type = this.searchConfig.searchCondition[4].type =
          "month";
        this.searchConfig.searchCondition[3].formate = this.searchConfig.searchCondition[4].formate =
          "yyyy-MM";
        this.searchConfig.searchCondition[3].VModelvalue.defaultValue = this.searchConfig.searchCondition[4].VModelvalue.defaultValue = this.$utils
          .dayjs()
          .format("YYYY-MM");

        if (val.startStaticDate.length < 5) {
          val.startStaticDate = val.startStaticDate + "-01";
          val.endStaticDate = val.endStaticDate + "-01";
        } else if (
          val.startStaticDate.length > 9 &&
          val.startStaticDate.length < 11
        ) {
          val.startStaticDate = val.startStaticDate.split("-")[0] + "-01";
          val.endStaticDate = val.endStaticDate.split("-")[0] + "-01";
        }
      } else if (val.frequency == "日") {
        this.searchConfig.searchCondition[3].type = this.searchConfig.searchCondition[4].type =
          "date";
        this.searchConfig.searchCondition[3].formate = this.searchConfig.searchCondition[4].formate =
          "yyyy-MM-dd";
        this.searchConfig.searchCondition[3].VModelvalue.defaultValue = this.searchConfig.searchCondition[4].VModelvalue.defaultValue = this.$utils
          .dayjs()
          .format("YYYY-MM-DD");

        if (val.startStaticDate.length < 5) {
          val.startStaticDate = val.startStaticDate + "-01-01";
          val.endStaticDate = val.endStaticDate + "-01-01";
        } else if (
          val.startStaticDate.length > 5 &&
          val.startStaticDate.length < 9
        ) {
          val.startStaticDate = val.startStaticDate + "-01";
          val.endStaticDate = val.endStaticDate + "-01";
        }
      }

      // this.getSearchTableValue(val);
      // this.getPassengerFlowByPage(search);
    },
    handleQuery(val) {
      if (val == undefined) {
        val = {};
        val.frequency = "年";
        val.startStaticDate = this.$utils.dayjs().format("YYYY");
        val.endStaticDate = this.$utils.dayjs().format("YYYY");
      }
      this.getSearchTableValue(val);
      this.$http
        .$get(
          "gdjc_basicPassengerFlowHandler/getCustomizeQueryStaticDataChart",
          val
        )
        .then(res => {
          this.getPassengerFlowByPage(res, val);
        });
    },
    //   设置搜索初始值

    // 第三个图
    getPassengerFlowByPage(data, serchVal) {
      var time = [],
        yy = [],
        fw = [],
        aq = [];
      // if(data.lineChartData&&data.lineChartData.length>0){
      //     data.lineChartData.forEach(e=>{
      //         time.push(e.time);
      //         ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
      //     })
      // }
      // if(data.lineChartYoyData&&data.lineChartYoyData.length>0){
      //     data.lineChartYoyData.forEach(e=>{
      //         qn.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
      //     })
      // }
      var xData = (function() {
        var data = [];
        for (var i = 1; i < 31; i++) {
          data.push(i);
        }
        return data;
      })();
      yy = [
        50,
        91,
        24,
        26,
        27,
        30,
        30,
        30,
        27,
        28,
        21,
        20,
        14,
        12,
        71,
        7,
        94,
        22,
        22,
        33,
        39,
        36,
        29,
        28,
        35,
        24,
        26,
        27,
        24,
        20
      ];
      fw = [
        9,
        17,
        55,
        10,
        19,
        33,
        44,
        85,
        8,
        9,
        17,
        2,
        55,
        10,
        19,
        3,
        44,
        85,
        8,
        72,
        36,
        93,
        62,
        10,
        19,
        55,
        10,
        19,
        84,
        78
      ];
      aq = [
        59,
        97,
        25,
        20,
        29,
        33,
        34,
        35,
        28,
        29,
        27,
        12,
        45,
        21,
        9,
        73,
        94,
        25,
        28,
        37,
        36,
        69,
        92,
        21,
        59,
        45,
        26,
        19,
        4,
        8
      ];
      var testData2 = {
        title: "公交车在线率",
        unitName: "次",
        xAxisData: xData,
        legendData: ["营运车辆在线数", "非营运车辆在线数", "全部车辆在线数"],
        seriesData: [yy, fw, aq]
      };
      this.option3 = this.$utils.echart.createEchartOption_8_1(testData2);
    }
  },
  data() {
    return {
      grid: Object.freeze({
        left: 70
      }),
      url: "/gdjc_basicPassengerFlowHandler/getCustomizeQueryStaticDataList",
      option1: {},
      option2: {},
      option3: {},
      stationName: "",
      valueFormate: "yyyy",
      value1: "year",
      value2: "",
      staStationName: "",
      startTime: "",
      cycleType: "year",
      staStationNameList: "",
      endTime: "",
      type: "year",
      searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 14,
            type: "date",
            formate: "yyyy-MM-dd",
            label: "统计日期",
            placeholder: "时间",
            VModelvalue: {
              name: "startStaticDate",
              defaultValue: this.$utils.dayjs().format("YYYY-MM-DD")
            }
          },
          {
            order: 14,
            width: "120px",
            type: "timeselect",
            formate: "HH:mm",
            label: "统计时间",
            placeholder: "开始时间",
            VModelvalue: {
              name: "datetest",
              defaultValue: "07:00"
            }
          },
          {
            order: 14,
            width: "120px",
            type: "timeselect",
            formate: "HH:mm",
            label: "~  ",
            placeholder: "结束时间",
            VModelvalue: {
              name: "datetest2",
              defaultValue: "20:00"
            }
          },
          {
            order: 3,
            width: "120px",
            type: "select",
            label: "时间间隔",
            filterable: true,
            placeholder: "",
            VModelvalue: {
              name: "interval",
              defaultValue: "1"
            },
            options: [
              {
                value: "1",
                label: "30分钟"
              },
              {
                value: "2",
                label: "1小时"
              }
            ]
          }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ]
      },
      searchoptions: [
        {
          value: "year",
          label: "年"
        },
        {
          value: "month",
          label: "月"
        },
        {
          value: "day",
          label: "日"
        }
      ],
      searchoptionsForStation: [],
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped>
$backgroundColor: rgba(5, 12, 38, 1);
.statistical-analysis-wrap {
  // width:100%;
  height: 100%;
  // overflow-y: auto;
  padding-bottom: 10px;
  // background: rgba(5, 12, 38, 1);
  // border: 1px solid rgba(32, 86, 221, 0.6);
  // background-image: url("./img/search_bg.png");
  background-size: 124px 120px;
  background-repeat: no-repeat;
  background-position: right top;
  .statistical-analysis-container {
    margin: 0 21px;
  }
}
.search {
  margin-top: 1px;
}
.indexContent {
  height: 100%;
  // background: rgba(32, 86, 221, 0.2);
  margin-top: 10px;
  // opacity:0.2;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    margin-bottom: 0px;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
.OperationComplaint-wrapper {
  height: 350px;
}
.top {
  height: 310px;
}
.date-wrapper {
  display: inline-block;
  margin-left: 10px;
}
.btn-wrapper {
  display: inline-block;
  margin-left: 10px;
  // height: 145px;
}
.search-detail {
  width: 71px;
}
</style>
<style lang="css" scoped>
.btn-wrapper >>> .table-detail-btn {
  height: 40px;
}
</style>

