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
                <el-button size="mini" class="table-detail-btn" @click="handleSearch()">查询</el-button>
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
            <!-- <panelTitle title="交通运行指数" :displaySwitch="false"></panelTitle> -->
            <div class="search">
              <SearchPanel
                :searchConfig="searchConfig"
                @getSearchValue="getSearchValue"
                @handleQuery="handleQuery"
              ></SearchPanel>
              <!-- <el-select v-model="staStationName" placeholder="请选择" @change="changeDate">
                <el-option
                  v-for="item in searchoptionsForStation"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div class="date-wrapper">
                <el-select v-model="value" placeholder="请选择" @change="changeDate">
                  <el-option
                    v-for="item in searchoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="date-wrapper">
                <el-date-picker v-model="value3" :type="type" placeholder="选择年"></el-date-picker>
              </div>-->
            </div>
            <div class="indexContent" style="height:560px">
              <div class="top">
                <v-chart :options="option1" />
              </div>
              <div class="OperationComplaint-wrapper">
                <!-- <h2>营运投诉</h2> -->
                <TableAndPagination
                  :searchConfig="searchConfig"
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
                    <el-table-column label="日期" prop="date"></el-table-column>
                    <el-table-column label="当期客流" prop="flowNum"></el-table-column>
                    <el-table-column label="统计小时" prop="hour"></el-table-column>
                    <el-table-column label="起点站名称" prop="stationName"></el-table-column>
                    <el-table-column label="上期客流" prop="lastFlowNum"></el-table-column>
                    <el-table-column label="比率" prop="ratio"></el-table-column>
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
    this.handleSearch();
    this.getStartStations();
  },
  methods: {
    //   设置搜索初始值
    setSearchInitValue() {
      this.value2 = this.$utils.dayjs().format("YYYY");
    },
    //  带年纪搜索
    handleSearch() {
      this.getStationPassengerFlow(this.value1, this.value2);
      this.getDatePassengerFlow(this.value1, this.value2);
    },
    getStartStations() {
      this.$http.$get("kyjc_transportStatistic/getStartStations").then(data => {
        const options = [
          {
            label: "全部",
            value: "全部"
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
      }
      if (a == "month") {
        this.type = "month";
        this.valueFormate = "yyyy-MM";
        this.value2 = this.$utils.dayjs().format("YYYY-MM");
      }
      if (a == "day") {
        this.type = "date";
        this.valueFormate = "yyyy-MM-dd";
        this.value2 = this.$utils.dayjs().format("YYYY-MM-DD");
      }
    },
    //第一个柱状图
    getStationPassengerFlow(val1, val2) {
      this.$http
        .$get("kyjc_statisticHandler/getStationPassengerFlow", {
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
            xAxisData.push(item.stationName);
            flowNum.push(item.flowNum);
            lastFlowNum.push(item.lastFlowNum);
          }
          seriesData.push(flowNum);
          seriesData.push(lastFlowNum);
          this.option1 = this.$utils.echart.getBarOption({
            xAxisData: xAxisData,
            legendData: ["当前客流量", "去年同期客流量"],
            seriesData: seriesData
          });
        });
    },
    // 第二个线图
    getDatePassengerFlow(val1, val2) {
      this.$http
        .$get("kyjc_statisticHandler/getDatePassengerFlow", {
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
            flowNum.push(item.flowNum);
            lastFlowNum.push(item.lastFlowNum);
          }
          seriesData.push(flowNum);
          seriesData.push(lastFlowNum);
          this.option2 = this.$utils.echart.getLineOption(
            {
              xAxisData: xAxisData,
              legendData: ["当前客流量", "去年同期客流量"],
              seriesData: seriesData
            },
            {
              xAxis: [
                {
                  type: "category",
                  axisLabel: {
                    interval: 3,
                    color: "#fff"
                  }
                }
              ]
            }
          );
        });
    }
  },
  data() {
    return {
      url: "/kyjc_statisticHandler/getPassengerFlowByPageDwon",
      option1: {},
      option2: {},
      valueFormate: "yyyy",
      value1: "year",
      value2: "",
      staStationName: "",
      type: "year",
      searchConfig: {
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
          // {
          //   order: 1,
          //   width: "220px",
          //   type: "linkDate",
          //   label: "",
          //   filterable: true,
          //   placeholder: "方式",
          //   VModelvalue: {
          //     name: "yeara",
          //     defaultValue: ""
          //   },
          //   VModelvalue2: {
          //     name: "yearb",
          //     defaultValue: ""
          //   },
          //   options: [
          //     {
          //       value: "year",
          //       label: "年"
          //     },
          //     {
          //       value: "month",
          //       label: "月"
          //     },
          //     {
          //       value: "day",
          //       label: "日"
          //     }
          //   ]
          // },
          {
            order: 11,
            width: "220px",
            type: "linkDateRang",
            label: "",
            filterable: true,
            placeholder: "方式",
            VModelvalue: {
              name: "cycleType",
              defaultValue: ""
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
        ]
        //   searchButtonGroup: [
        //     {
        //       action: "query",
        //       label: "查询"
        //     }
        //   ]
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
</style>
<style lang="css" scoped>
.btn-wrapper >>> .table-detail-btn {
  height: 40px;
}
</style>