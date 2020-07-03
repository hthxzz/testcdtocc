<template>
  <div class="statistical-analysis-wrap">
    <panel>
      <div class="statistical-analysis-container">
        <div class="itemList">
          <section>
            <!-- <panelTitle title="交通运行指数" :displaySwitch="false"></panelTitle> -->
            <div class="search">
              <el-select v-model="value1" placeholder="请选择" @change="changeDate">
                <el-option
                  v-for="item in searchoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div class="date-wrapper">
                <el-date-picker
                  v-model="value2"
                  :type="type"
                  placeholder="选择年"
                  :value-format="valueFormate"
                ></el-date-picker>
              </div>
              <div class="btn-wrapper">
                <el-button
                  size="mini"
                  class="table-detail-btn search-detail"
                  @click="handleSearch()"
                >查询</el-button>
              </div>
            </div>
            <div class="indexContent">
              <div class="top">
                <v-chart :options="option1" />
              </div>
              <div class="bot">
                <v-chart :options="option2" />
              </div>
            </div>
          </section>
          <section>
            <div class="search">
              <section class="search-wrapper">
                <SearchPanel
                  :searchConfig="searchConfig"
                  @getSearchValue="getSearchValue"
                  @handleQuery="handleQuery"
                ></SearchPanel>
              </section>
              <!-- <el-select v-model="stationName" placeholder="请选择客运站名">
                <el-option
                  v-for="item in staStationNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="cycleType" placeholder="请选择统计方式" @change="changeDate">
                <el-option
                  v-for="item in searchoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div class="date-wrapper">
                <el-date-picker
                  v-model="startTime"
                  :type="type"
                  placeholder="选择开始时间"
                  :value-format="valueFormate"
                ></el-date-picker>
              </div>
              <div class="date-wrapper">
                <el-date-picker
                  v-model="endTime"
                  :type="type"
                  placeholder="选择结束时间"
                  :value-format="valueFormate"
                ></el-date-picker>
              </div>
              <div class="btn-wrapper">
                <el-button
                  size="mini"
                  class="table-detail-btn search-detail"
                  @click="getMostPassengerLineByDateAndStation()"
                >查询</el-button>
              </div>-->
            </div>
            <div class="indexContent" style="height:560px">
              <div class="top">
                <v-chart :options="option3" />
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
                    :height="tableHeight"
                    :data="tableData"
                    stripe
                    ref="table"
                  >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="日期" prop="date"></el-table-column>
                    <!-- <el-table-column label="总运力" prop="total"></el-table-column> -->
                    <!-- <el-table-column label="统计小时" prop="hour"></el-table-column> -->
                    <!-- <el-table-column label="站点名" prop="station"></el-table-column> -->
                    <el-table-column label="环比" prop="chain"></el-table-column>
                    <el-table-column label="线路" prop="line"></el-table-column>
                    <el-table-column label="去年同期运力" prop="lastCapacity"></el-table-column>
                    <el-table-column label="运力" prop="capacity"></el-table-column>
                    <!-- <el-table-column label="同比" prop="yearOnYear"></el-table-column> -->
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
      </div>
    </panel>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  mixins: [tableMixins],
  mounted() {
    this.setSearchInitValue();
    this.getMostPassengerLineByDateAndStation();
    this.handleSearch();
    this.getStartStations();
  },
  methods: {
    getSearchValue(val) {
      const search = {};
      for (const item of val) {
        if (item.columnName == "date") {
          search["startTime"] = item.queryValue.split("|")[0];
          search["endTime"] = item.queryValue.split("|")[1];
        } else {
          search[item.columnName] = item.queryValue;
        }
      }
      this.getSearchTableValue(val);
      this.getMostPassengerLineByDateAndStation(search);
    },
    handleQuery() {},
    //   设置搜索初始值
    setSearchInitValue() {
      this.value2 = this.$utils.dayjs().format("YYYY");
      this.startTime = this.$utils.dayjs().format("YYYY");
      this.endTime = this.$utils.dayjs().format("YYYY");
    },
    //  带年纪搜索
    handleSearch() {
      this.getLinePassengerTopTen(this.value1, this.value2);
      this.getMostPassengerLineByDate(this.value1, this.value2);
    },
    getSearchValue3(val) {
      this.getMostPassengerLineByDateAndStation(val);
    },
    getStartStations() {
      this.$http.$get("kyjc_transportStatistic/getStartStations").then(data => {
        const options = [
          {
            label: "全部",
            value: ""
          }
        ];
        for (const item of data) {
          options.push({
            label: item.staStationName,
            value: item.staStationName
          });
        }
        this.searchConfig.searchCondition[0].options = options;
      });
    },
    changeDate(a) {
      if (a == "year") {
        this.type = "year";
        this.valueFormate = "yyyy";
        this.value2 = this.$utils.dayjs().format("YYYY");
        this.startTime = this.$utils.dayjs().format("YYYY");
        this.endTime = this.$utils.dayjs().format("YYYY");
      }
      if (a == "month") {
        this.type = "month";
        this.valueFormate = "yyyy-MM";
        this.value2 = this.$utils.dayjs().format("YYYY-MM");
        this.startTime = this.$utils.dayjs().format("YYYY-MM");
        this.endTime = this.$utils.dayjs().format("YYYY-MM");
      }
      if (a == "day") {
        this.type = "date";
        this.valueFormate = "yyyy-MM-dd";
        this.value2 = this.$utils.dayjs().format("YYYY-MM-DD");
        this.startTime = this.$utils.dayjs().format("YYYY-MM-DD");
        this.endTime = this.$utils.dayjs().format("YYYY-MM-DD");
      }
    },
    // 第一个图
    getLinePassengerTopTen(val1, val2) {
      this.$http
        .$get("kyjc_statisticHandler/getLineCapacity", {
          cycleType: val1 || "year",
          date: val2 || this.$utils.dayjs().year()
        })
        .then(res => {
          // this.getSearchTableValue();
          const xAxisData = [];
          const seriesData = [];
          const flowNum = [];
          const lastFlowNum = [];
          for (const item of res) {
            xAxisData.push(item.line);
            flowNum.push(item.capacity);
            lastFlowNum.push(item.lastCapacity);
          }
          seriesData.push(flowNum);
          seriesData.push(lastFlowNum);
          this.option1 = this.$utils.echart.creatEchartOption_9_1(
            // this.option1 = this.$utils.echart.getBarOption(
            {
              xAxisData: xAxisData,
              legendData: ["当前运力", "同比运力"],
              seriesData: seriesData
            },
            {
              grid: {
                left: 70,
                bottom: 60
              },
              xAxis: [
                {
                  axisLabel: {
                    align: "center",
                    // interval: 3,
                    color: "#fff",
                    rotate: "10"
                  }
                }
              ]
            }
          );
        });
    },
    // 第二个图
    getMostPassengerLineByDate(val1, val2) {
      this.$http
        .$get("kyjc_statisticHandler/getLineCapacityByDate", {
          cycleType: val1 || "year",
          date: val2 || this.$utils.dayjs().year()
        })
        .then(res => {
          // this.getSearchTableValue();
          const xAxisData = [];
          const seriesData = [];
          const flowNum = [];
          const lastFlowNum = [];
          for (const item of res) {
            if (val1 == "day") {
              xAxisData.push(item.hour);
            } else {
              xAxisData.push(item.date);
            }
            flowNum.push(item.capacity);
            lastFlowNum.push(item.lastCapacity);
          }
          seriesData.push(flowNum);
          seriesData.push(lastFlowNum);
          this.option2 = this.$utils.echart.createEchartOption_8_1(
            // this.option2 = this.$utils.echart.getLineOption(
            {
              xAxisData: xAxisData,
              legendData: ["当前运力", "同比运力"],
              seriesData: seriesData
            },
            {
              grid: this.grid,
              xAxis: [
                {
                  type: "category",
                  axisLabel: {
                    interval: 2,
                    color: "#fff",
                    rotate: "10"
                  }
                }
              ]
            }
          );
        });
    },
    // 第三个图
    getMostPassengerLineByDateAndStation(val) {
      // debugger;
      this.$http
        .$get("kyjc_statisticHandler/getMostPassengerLineByDateAndStation", val)
        .then(res => {
          // this.getSearchTableValue();
          const xAxisData = [];
          const seriesData = [];
          const flowNum = [];
          const lastFlowNum = [];
          for (const item of res && res) {
            xAxisData.push(item.date);
            flowNum.push(item.flowNum);
            lastFlowNum.push(item.lastFlowNum);
          }
          seriesData.push(flowNum);
          seriesData.push(lastFlowNum);
          this.option3 = this.$utils.echart.creatEchartOption_9_1(
            // this.option3 = this.$utils.echart.getBarOption(
            {
              xAxisData: xAxisData,
              legendData: ["当前客流量", "去年同期客流量"],
              seriesData: seriesData
            },
            {
              grid: this.grid
            }
          );
        });
    }
  },
  data() {
    return {
      grid: Object.freeze({
        left: 70
      }),
      url: "/kyjc_statisticHandler/getLineCapacityByPage",
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
        isKeyV: false,
        searchCondition: [
          {
            order: 3,
            width: "220px",
            type: "select",
            label: "",
            filterable: true,
            placeholder: "客运站名称",
            operator: "like",
            VModelvalue: {
              name: "stationName",
              defaultValue: ""
            },
            options: []
          },
          {
            order: 11,
            width: "220px",
            type: "linkDateRang",
            label: "",
            filterable: true,
            placeholder: "方式",
            VModelvalue: {
              name: "cycleType",
              defaultValue: "year"
            },
            VModelvalue2: {
              name: "date",
              operator: "between",
              defaultValue: ""
            },
            options: [
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
  height: 560px;
  // background: rgba(32, 86, 221, 0.2);
  margin-top: 10px;
  // opacity:0.2;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    margin-bottom: 20px;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
.OperationComplaint-wrapper {
  height: 450px;
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