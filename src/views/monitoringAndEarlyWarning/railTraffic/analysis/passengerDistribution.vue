<template>
  <div class="nomap-content-container">
    <panel>
      <div class="item-container">
        <section>
          <panelTitle title="不同时段客流分布" :displaySwitch="false" />
          <div class="search">
            <SearchPanel
                    :searchConfig="searchConfig"
                    @getSearchValue="getSearchValue2"
                    @handleQuery="handleQuery"
            ></SearchPanel>
          </div>
          <div class="itemLis-wrap">
            <div class="item">
              <v-chart :options="option1" theme="theme" />
            </div>
            <div class="item">
            <v-chart :options="NotWDoption"  theme="theme"/>
            </div>
            <div class="item">
              <TableAndPagination
                      :showSearchPanel="false"
                      :showPagination="false"
              >
                <el-table
                        style="width: 100%;height:100%;overflow-y: auto"
                        :height="tableHeight"
                        :data="tableData2"
                        stripe
                        ref="table"
                >
                  <el-table-column label="时间段" prop="time"></el-table-column>
                  <el-table-column label="非工作日日均客流(万人次)" prop="nonWorkDayAvgFlow" :formatter="this.formateTraffic"> </el-table-column>
                  <!-- <el-table-column label="统计方式" prop="hour"></el-table-column> -->
                  <el-table-column label="非工作日同比" prop="nonWorkDayAvgFlowYoy">
                    <template slot-scope="scope">
                      <span>{{ scope.row.nonWorkDayAvgFlowYoy.toFixed(2)}}%</span>

                    </template>
                  </el-table-column>
                  <el-table-column label="工作日日均客流(万人次)" prop="workDayAvgFlow":formatter="this.formateTraffic"></el-table-column>
                  <el-table-column label="工作日同比" prop="workDayAvgFlowYoy">
                    <template slot-scope="scope">
                      <span>{{ scope.row.workDayAvgFlowYoy.toFixed(2)}}%</span>
                    </template>
                  </el-table-column>
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
        <section>
          <panelTitle title="周日均客流分布" :displaySwitch="false" />
          <div class="search">
            <SearchPanel
                    :searchConfig="searchConfig"
                    @getSearchValue="getSearchValue2"
                    @handleQuery="handleQuery2"
            ></SearchPanel>
          </div>
          <div class="itemLis-wrap">
            <div class="item">
              <v-chart :options="WeekOption"  theme="theme" />
            </div>
          </div>
        </section>
        <section>
          <panelTitle title="月日均客流分布" :displaySwitch="false" />
          <div class="search">
            <SearchPanel
                    :searchConfig="searchConfig"
                    @getSearchValue="getSearchValue2"
                    @handleQuery="handleQuery3"
            ></SearchPanel>
          </div>
          <div class="itemLis-wrap">
            <div class="item">
              <v-chart :options="monthOption"   />
            </div>
          </div>
        </section>
        <section>
          <panelTitle title="年日均客流分布" :displaySwitch="false" />
          <div class="search">
            <SearchPanel
                    :searchConfig="searchConfig2"
                    @getSearchValue="getSearchValue2"
                    @handleQuery="handleQuery4"
            ></SearchPanel>
          </div>
          <div class="itemLis-wrap">
            <div class="item">
              <v-chart :options="yearOption"  theme="theme" />
            </div>
          </div>
        </section>
        <section>
          <panelTitle title="节假日客流分布" :displaySwitch="false" />
          <div class="search">
            <SearchPanel
                    :searchConfig="searchConfig"
                    @getSearchValue="getSearchValue2"
                    @handleQuery="handleQuery5"
            ></SearchPanel>
          </div>
          <div class="itemLis-wrap">
            <div class="item">
              <v-chart :options="option2"  theme="theme" />
            </div>
          </div>
        </section>

      </div>
    </panel>
  </div>
</template>

<script>
import railSearchGroup from "./components/railSearchGroup";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  components: { railSearchGroup},
  mixins: [tableMixins],
  methods: {
    getAllLineData(){
      this.$http.$get('/gdjc_infoManagerHandler/getLine').then(res => {
        if(res!=null&&res.length>0){
          res.forEach(e=>{
            this.searchConfig.searchCondition[0].options.push({value:e.lineCode,label:e.lineName});
            this.searchConfig2.searchCondition[0].options.push({value:e.lineCode,label:e.lineName})
          })
        }
      });
    },
    handleQuery(data) {
      this.$http.$get('gdjc_basicPassengerFlowHandler/getPeriodPassengerVolumeList',data).then(res => {
       this.tableData2=res;
      });
      this.$http.$get('/gdjc_basicPassengerFlowHandler/getPeriodPassengerVolume',data).then(res => {
        if(res!=null){
          this. getWorkingDaysData(res[0]);
          this.getNotWorkingDaysData(res[1]);
        }

      });

      },
    getWorkingDaysData(data){
      var time=[],ky=[],qn=[];
      if(data.lineChartData&&data.lineChartData.length>0){
        data.lineChartData.forEach(e=>{
          time.push(e.time);
          ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
        })
      }
      if(data.lineChartYoyData&&data.lineChartYoyData.length>0){
        data.lineChartYoyData.forEach(e=>{
          qn.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
        })
      }
      var testData2={
        title:data.chartTitle,
        unitName:'万人次',
        legendData:['客运量','去年'],
        xAxisData: time,
        seriesData:[ky,qn]


      }
      this.option1=this.$utils.echart.createEchartOption_8_1(testData2);
    },
    getNotWorkingDaysData(data){
      var time=[],ky=[],qn=[];
      if(data.lineChartData&&data.lineChartData.length>0){
        data.lineChartData.forEach(e=>{
          time.push(e.time);
          ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
        })
      }
      if(data.lineChartYoyData&&data.lineChartYoyData.length>0){
        data.lineChartYoyData.forEach(e=>{
          qn.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
        })
      }
      var testData2={
        title:data.chartTitle,
        unitName:'万人次',
        legendData:['客运量','去年'],
        xAxisData: time,
        seriesData:[ky,qn]
      }
      this.NotWDoption=this.$utils.echart.creatEchartOption_4_3(testData2);
    },
    getWeekData(data){
      var time=[],ky=[],qn=[];
      if(data.barChartData&&data.barChartData.length>0){
        data.barChartData.forEach(e=>{
          time.push(e.weekName);
          ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
          qn.push(((e.yoyPassengerVolume!=null?e.yoyPassengerVolume:0)/10000).toFixed(2));
        })
      }
      var testData2={
        title:data.chartTitle,
        unitName:'万人次',
        legendData:['客运量','去年'],
        xAxisData: time,
        seriesData:[ky,qn]
      }
      this.WeekOption=this.$utils.echart.creatEchartOption_9_1(testData2);
    },
    getMonthData(data){
      var time=[],ky=[],qn=[];
      if(data.barChartData&&data.barChartData.length>0){
        data.barChartData.forEach(e=>{
          time.push(e.weekName);
          ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
          qn.push(((e.yoyPassengerVolume!=null?e.yoyPassengerVolume:0)/10000).toFixed(2));
        })
      }
      var testData2={
        title:data.chartTitle,
        unitName:'万人次',
        legendData:['客运量','去年'],
        xAxisData: time,
        seriesData:[ky,qn]
      }
      this.monthOption=this.$utils.echart.creatEchartOption_3_1(testData2);
    },

    getYearData(data){
      debugger;
      var time=[],ky=[],qn=[];
      if(data.barChartData&&data.barChartData.length>0){
        data.barChartData.forEach(e=>{
          time.push(e.yearName);
          ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
          // qn.push(((e.yoyPassengerVolume!=null?e.yoyPassengerVolume:0)/10000).toFixed(2));
        })
      }
      var testData2={
        title:data.chartTitle,
        unitName:'万人次',
        legendData:['客运量'],
        xAxisData: time,
        seriesData:[ky]
      }
      this.yearOption=this.$utils.echart.creatEchartOption_5_3(testData2);
    },
    getHolidayData(data){
      debugger;
      var time=[],ky=[],qn=[];
      if(data.barChartData&&data.barChartData.length>0){
        data.barChartData.forEach(e=>{
          time.push(e.holidayName);
          ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
          qn.push(((e.yoyPassengerVolume!=null?e.yoyPassengerVolume:0)/10000).toFixed(2));
        })
      }
      var testData2={
        title:data.chartTitle,
        unitName:'万人次',
        legendData:['客运量','去年'],
        xAxisData: time,
        seriesData:[ky,qn]
      }
      this.option2=this.$utils.echart.creatEchartOption_4_1(testData2);
    },
    handleQuery2(data) {
      if(data==undefined){
        data={};
        data.staticDate=this.$utils.dayjs().format("YYYY");
      }
      this.$http.$get('/gdjc_basicPassengerFlowHandler/getPeriodWeekPassengerVolume',data).then(res => {
        if(res!=null){
          this.getWeekData(res);
        }

      });

    },
    handleQuery3(data) {
      if(data==undefined){
        data={};
        data.staticDate=this.$utils.dayjs().format("YYYY");
      }
      this.$http.$get('/gdjc_basicPassengerFlowHandler/getPeriodMonthPassengerVolume',data).then(res => {
        if(res!=null){
          this.getMonthData(res);
        }
      });
    },
    handleQuery4(data) {
      if(data==undefined){
        data={};
        data.startDate=this.$utils.dayjs().year()-5;
        data.endDate=this.$utils.dayjs().format("YYYY");
      }
      this.$http.$get('/gdjc_basicPassengerFlowHandler/getPeriodYearPassengerVolume',data).then(res => {
        if(res!=null){
          this.getYearData(res);
        }
      });
      // this.getWorkingDaysData(data);
    },
    handleQuery5(data) {
      if(data==undefined){
        data={};
        data.staticDate=this.$utils.dayjs().format("YYYY");
      }
      this.$http.$get('/gdjc_basicPassengerFlowHandler/getPeriodHolidayPassengerVolume',data).then(res => {
        if(res!=null){
          this.getHolidayData(res);
        }
      });
    },
    getSearchValue2(data){

    }

  },
  mounted() {
    this.getAllLineData();
    var data={lineCode:'',staticDate:this.$utils.dayjs().format("YYYY")};
    this.handleQuery(data);
    // this. getWorkingDaysData(data);
    // this.getNotWorkingDaysData(data);
    this.handleQuery2();
    this.handleQuery3();
    this.handleQuery4();
    this.handleQuery5();
  },

  data() {
    return {
      tableData2:[],
      yearOption:{},
      monthOption:{},
      NotWDoption:{},
      WeekOption:{},
      option1: {},
      option12: {},
      option2: {},
      grid: {
        left: 60
      },
      url: "/gdjc_basicPassengerFlowHandler/getPeriodPassengerVolumeList",
      searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 3,
            type: "select",
            label: "线路",
            placeholder: "线路名称",
            VModelvalue: {
              name: "lineCode",
              defaultValue: ""
            },
            options: [
              {
                value: "",
                label: "全部"
              }
            ]
          },{
            order: 14,
            type: "year",
            formate: "yyyy",
            label: "时  间",
            VModelvalue: {
              name: "staticDate",
              defaultValue:new Date().getFullYear().toString(),
            }
          },
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "统计"
          }
        ]
      },
      searchConfig2: {
        isKeyV: true,
        searchCondition: [
          {
            order: 3,
            type: "select",
            label: "线路",
            placeholder: "线路名称",
            VModelvalue: {
              name: "lineCode",
              defaultValue: ""
            },
            options: [
              {
                value: "",
                label: "全部"
              }
            ]
          },{
            order: 14,
            type: "year",
            formate: "yyyy",
            label: "开始时间",
            VModelvalue: {
              name: "startDate",
              defaultValue:(this.$utils.dayjs().year()-5).toString(),
            }
          },
          {
            order: 14,
            type: "year",
            formate: "yyyy",
            label: "结束时间",
            VModelvalue: {
              name: "endDate",
              defaultValue:new Date().getFullYear().toString(),
            }
          },
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "统计"
          }
        ]
      },
    };
  }
};
</script>

<style lang="scss" scoped>
.item-container {
  section {
    .itemLis-wrap {
      .item {
        width: 100%;
        height: 260px;
        margin-bottom: 20px;
        background-color: $noMapBgColor;
      }
    }
  }
}
</style>