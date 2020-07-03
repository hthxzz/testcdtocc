<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <railSearch @getSearchVal="globleSearch" />
          </PanelItem>
          <PanelItem :title="titleTime+'站点客流OD排名'" :displaySwitch="false">
            <div class="rangeClass">
              <div class="search">
                <ChangeTag :itemList="itemList" @getStatues="getStatues" />
              </div>
              <TableAndPagination :showPagination="showPagination" :showSearchPanel="false">
                <el-table
                        style="width: 100%;height:260px;overflow-y: auto"
                        :height="475"
                        :data="tableData"
                        stripe
                        ref="table"
                >
                  <!-- <el-table-column type="index" width="50"></el-table-column> -->
                  <el-table-column label="起点" prop="inStationName"></el-table-column>
                  <el-table-column label="终点" prop="outStationName"></el-table-column>
                  <el-table-column label="客流量(万人次)" prop="passengerNum" :formatter="formateTraffic"></el-table-column>
                </el-table>
              </TableAndPagination>
            </div>

          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <railTrafficMap />
        </div>
      </template>

      <template #rightPanel>
        <panel>
          <PanelItem :title="ODTitle" :displaySwitch="false">
            <div class="echar-wrap">
              <v-chart :options="option1" />
            </div>
          </PanelItem>
          <PanelItem :title="ZDMC+'站点客流OD分析'" :displaySwitch="false">
            <div class="echar-wrap-my">
              <div class="stationOD" >
                <div class="title">
                   <span  style ="background-color:#2056DD" class="stationODOutIn" > 出发</span>
                  <span class="checkBox">
                     <el-checkbox-group v-model="checkList" @change="stationIn">
                    <el-checkbox label="地图"></el-checkbox>
                  </el-checkbox-group>
                  </span>

                </div>
              <div v-for="item1 in direction1" class="content">
                <div class="lineDirection">
                  {{item1.name}}
                </div>
                <div class="directionValue">
                  <el-progress :percentage="item1.value" color="rgb(255,255,0)"></el-progress>
                </div>
              </div>
            </div>
              <div class="stationOD" >
                <div class="title">
                  <span  style ="background-color:#FFFF00" class="stationODOutIn" > 到达</span>
                  <span class="checkBox">
                     <el-checkbox-group v-model="checkList1" @change="stationOut">
                    <el-checkbox label="地图"></el-checkbox>
                  </el-checkbox-group>
                  </span>

                </div>
                <div v-for="item1 in direction2" class="content">
                  <div class="lineDirection">
                    {{item1.name}}
                  </div>
                  <div class="directionValue">
                    <el-progress :percentage="item1.value" color="rgb(255,255,0)"></el-progress>
                  </div>
                </div>
              </div>
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import railSearch from "./components/railSearch.vue";
import railTrafficMap from "./components/railTrafficMap.vue";
export default {
  name: "",
  components: {
    railSearch,
    railTrafficMap
  },
  mixins: [tableMixins],
  methods: {

    globleSearch(val) {
      this.frequency = val.frequency;// 频率
      this.staticDate = val.staticDate;//统计时间
      this.isWorkDay = val.isWorkDay;//是否工作日
      this.lineCode = val.lineCode;//线路编码
      if (val.frequency == "年") {
        this.titleTime = val.staticDate + '年';
      } else if (val.frequency == "月") {
        let times = val.staticDate.split("-");
        this.titleTime = times[0] + '年' + Number(times[1].toString()) + '月';
      }
      this.getStationPassengerVolumeRank(val);
    },
    getStatues(val) {
      this.dimension = val.code;
      this.getStationPassengerVolumeRank();
      // this.getStationPassengerVolumeRank();
    },
    getStationPassengerVolumeRank() {
      this.$http
              .$get("gdjc_travelCharacteristicsHandler/getStationTravelPassengerFlowODData", {
                frequency: this.frequency,// 频率
                staticDate: this.staticDate,//统计时间
                isWorkDay: this.isWorkDay,//是否工作日
                lineCode: this.lineCode,
                dimension: this.dimension
              })
              .then(res => {
                if(res){
                  this.tableData = res;
                  this.getMapEcharts(res);
                  this.getStationDailyAveragePassengerFlowChangeData(res[0].inStationName,res[0].outStationName);
                  this.getTravelStationFlowODAnalysisData(res[0].inStationName);
                }
              });
    },
    init() {
      tmap.setMapZoomLevel(11);
    },
    getMapEcharts(data) {
      var allData={citys:[],moveLines:[]};
      if(data!=undefined){
        data=data.slice(0,5);
        let map= new Map();
        var i=0;
        data.forEach(e=>{
          map.set(e.inStationName,[e.inStationLongitude,e.inStationLatitude]);
          map.set(e.outStationName,[e.outStationLongitude,e.outStationLatitude]);
          let moveline = {
            fromName: e.inStationName,
            toName: e.outStationName,
            coords: [[e.inStationLongitude,e.inStationLatitude], [e.outStationLongitude,e.outStationLatitude]],
            lineStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#58B3CC'
                }, {offset: 1, color: '#F58158'}], false),
                        width: data.length-i+2, opacity: 0.6, curveness: 0.5
              }
            }
          }
          allData.moveLines.push(moveline);
          i++;
        })
        map.forEach(function(value,key){
          let city={
            name:key,
            value:value,
            symbolSize: 20,
           itemStyle: {normal: {color: "#F58158"}}
          };
          allData.citys.push(city);
          // console.log(value,key);
        });
      }
      // var allData = {
      //   "citys": [
      //     {
      //       "name": "天府广场",
      //       "value": [104.063394, 30.659942],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "百草路",
      //       "value": [103.977146, 30.735567],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "成都医学院",
      //       "value": [104.192245, 30.819409],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "双流西站",
      //       "value": [103.915163, 30.546076],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "杨柳河",
      //       "value": [103.828834, 30.683533],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "成都大学",
      //       "value": [104.179857, 30.649465],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "崔家店",
      //       "value": [104.134118, 30.668055],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "火车北站",
      //       "value": [104.071102, 30.698203],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //     {
      //       "name": "警官学院",
      //       "value": [104.037346, 30.515234],
      //       "symbolSize": 20,
      //       "itemStyle": {"normal": {"color": "#F58158"}}
      //     },
      //   ],
      //   moveLines: [
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[104.063394, 30.659942], [103.977146, 30.735567]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 18, opacity: 0.6, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[104.192245, 30.819409], [104.192245, 30.819409]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 12, opacity: 0.6, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[103.828834, 30.683533], [104.179857, 30.649465]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 12, opacity: 0.6, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[104.134118, 30.668055], [104.037346, 30.515234]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 9, opacity: 0.4, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[104.037346, 30.515234], [104.134118, 30.668055]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 8, opacity: 0.4, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[103.977146, 30.735567], [103.828834, 30.683533]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 7, opacity: 0.4, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[104.063394, 30.659942], [104.071102, 30.698203]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 6, opacity: 0.4, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[104.071102, 30.698203], [103.977146, 30.735567]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 6, opacity: 0.4, curveness: 0.2
      //         }
      //       }
      //     },
      //     {
      //       fromName:'天府广场',
      //       toName:'天府三街',
      //       "coords": [[103.915163, 30.546076], [104.192245, 30.819409]],
      //       lineStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //             offset: 0,
      //             color: '#58B3CC'
      //           }, {offset: 1, color: '#F58158'}], false), width: 2, opacity: 0.2, curveness: 0.2
      //         }
      //       }
      //     },
      //
      //
      //   ]
      // };
      let option = this.$utils.echart.creatEchartOption_11_1(allData);
      let stationName = tmap.addChart("stationName", option);
      this.activeRightPanel(stationName.$chart);
    },
    activeRightPanel(el) {
      el.on("click", params => {
        if(params.seriesName=='地点'){
          this.getTravelStationFlowODAnalysisData(params.name);
        }else if(params.seriesName=='线路'){
          this.getStationDailyAveragePassengerFlowChangeData(params.data.fromName,params.data.toName)
        }

      });
    },
    getTravelStationFlowODAnalysisData(stationName) {//单个站点客流变化
      this.ZDMC=stationName;
      var val={
        stationName:stationName,
        frequency:this.frequency,// 频率
        staticDate:this.staticDate,//统计时间
        isWorkDay:this.isWorkDay,//是否工作日
      };
      this.$http.$get(
              "gdjc_travelCharacteristicsHandler/getTravelStationFlowODAnalysisData",val )
              .then(res => {
                this.direction1=[],this.direction2=[];
                this.inStationPassengerFlowDestion=res.inStationPassengerFlowDestion;
                this.outStatioPpassengerFlowDestion=res.outStatioPpassengerFlowDestion;
                if(res.inStationPassengerFlowDestion&&res.inStationPassengerFlowDestion.length>0){
                  var data=res.inStationPassengerFlowDestion.slice(0,5);
                  data.forEach(e=>{
                    this.direction1.push({name:e.inStationName,value:Number(e.scale)})
                  })
                }
                if(res.outStatioPpassengerFlowDestion&&res.outStatioPpassengerFlowDestion.length>0){
                  var data=res.outStatioPpassengerFlowDestion.slice(0,5);
                  data.forEach(e=>{
                    this.direction2.push({name:e.outStationName,value:Number(e.scale)})
                  })
                }
              })

      // this.getStationDailyAverageHourInOutPassengerFlowChangeData(val);s
      // this.getTransferStationFlowDestinationData(val);
    },
    getStationDailyAveragePassengerFlowChangeData(inStationName, outStationName) {
      this.$http.$get(
              "gdjc_travelCharacteristicsHandler/getTravelDailyAveragePassengerFlowChangeData",
              {

                inStationName:inStationName,
                outStationName:outStationName,
                frequency:this.frequency,// 频率
                staticDate:this.staticDate,//统计时间
                isWorkDay:this.isWorkDay,//是否工作日
              }
      )
              .then(res => {
                const xAxisData = [],
                        seriesData1 = [],
                        seriesData2 = [],
                        seriesData = [];
                this.ODTitle = res.chartTitle;
                for (const item of res.lineChartData) {
                  xAxisData.push(item.time);
                  seriesData1.push(item.passengerVolume);
                }

                seriesData.push(seriesData1);
                // seriesData.push(seriesData2);
                var testData2={
                  // title:data.chartTitle,
                  unitName:'人次',
                  legendData:['客流量'],
                  xAxisData: xAxisData,
                  seriesData:seriesData,
                  interval:4,

                };
                debugger;
                this.option1=this.$utils.echart.createEchartOption_8_1(testData2);
                // this.option1 = this.$utils.echart.getLineOption(
                //         {
                //           xAxisData: xAxisData,
                //           legendData: ["客流量"],
                //           seriesData: seriesData
                //         },
                //
                // );
              });
    },
    stationIn(val) {
      if(val.length==0){
        tmap.removeChart('in');
       this.getMapEcharts( this.tableData);
      }else{
        this.checkList1=[];
        tmap.removeChart('out');
        tmap.removeChart('stationName');
        const pointData = [],linesData=[];
        let sum = this.inStationPassengerFlowDestion.reduce((total, val) => {
          return total + parseInt(val.passengerNum);
        }, 0);
        for (const [index, item] of this.inStationPassengerFlowDestion.entries()) {
          pointData.push({
            name: item.inStationName + "(Top" + (index + 1) + ")",
            value: [item.inStationLongitude,
              item.inStationLatitude,
              item.passengerNum,
              (item.passengerNum * 100) / sum,
            ]
          });
          linesData.push({
            fromName: item.inStationName,
            toName: item.outStationName,
            coords: [[item.inStationLongitude, item.inStationLatitude], [item.outStationLongitude, item.outStationLatitude]],
            value: item.passengerNum,
            center: item.outStationLongitude + "," + item.outStationLatitude
          })
        }
        let option = this.$utils.echart.getMigrationOption(
                {
                  seriesData: {
                    pointData: pointData,
                    linesData: [linesData],
                    symbol:'arrow',
                    symbolSize: 10,
                  }
                },
                {
                  series: [
                    {
                      label: {
                        normal: {
                          show: true,
                          formatter: [
                            "{a|{b}}",
                            "{c|客流量} {b|{@[2]}}"
                          ].join("\n"),
                          rich: {
                            a: {
                              padding: [6, 0, 0, 0],
                              color: "rgba(0,255,255,1)",
                              fontSize: this.$utils.setSize(16),
                              fontWeight: 400,
                              fontFamily: "幼圆"
                            },
                            b: {
                              color: "rgba(0,255,255,1)",
                              fontSize: this.$utils.setSize(16),
                              // fontWeight: 400,
                              fontFamily: "幼圆"
                              // lineHeight:20
                            },
                            c: {
                              color: "rgba(0,255,255,.6)",
                              fontSize: this.$utils.setSize(14),
                              fontFamily: "幼圆"
                              // lineHeight:30
                            }
                          }
                        }
                      }
                    }
                  ],
                  tooltip: {
                    show: false,
                    formatter: function (params) {
                      //根据业务自己拓展要显示的内容
                      if (params.seriesType == "effectScatter") {
                        var res = "";
                        var name = params.data.name;
                        var value = params.data.value[2];
                        var value2 = params.data.value[4];
                        res =
                                "<span style='color:#fff;'>" +
                                name +
                                "</span><br/>客流量：" +
                                value +
                                "</span><br/>班次数量：" +
                                value2;
                        return res;
                      }
                    }
                  }
                }
        );
        console.log(option);
        tmap.addChart("in", option);
      }

    },
    stationOut(val) {
      if(val.length==0){
        tmap.removeChart('out');
        this.getMapEcharts( this.tableData);
      }else{
        this.checkList=[];
        tmap.removeChart('in');
        tmap.removeChart('stationName');
        const pointData = [],linesData=[];
        let sum = this.outStatioPpassengerFlowDestion.reduce((total, val) => {
          return total + parseInt(val.passengerNum);
        }, 0);
        for (const [index, item] of this.outStatioPpassengerFlowDestion.entries()) {
          pointData.push({
            name: item.outStationName + "(Top" + (index + 1) + ")",
            value: [item.outStationLongitude,
              item.outStationLatitude,
              item.passengerNum,
              (item.passengerNum * 100) / sum,
            ]
          });
          linesData.push({
            fromName: item.inStationName,
            toName: item.outStationName,
            coords: [[item.inStationLongitude, item.inStationLatitude], [item.outStationLongitude, item.outStationLatitude]],
            value: item.passengerNum,
            center: item.inStationLongitude + "," + item.inStationLatitude
          })
        }
        let option = this.$utils.echart.getMigrationOption(
                {
                  seriesData: {
                    pointData: pointData,
                    linesData: [linesData],
                    symbol:'arrow',

                  }
                },
                {
                  series: [
                    {
                      label: {
                        normal: {
                          show: true,
                          formatter: [
                            "{a|{b}}",
                            "{c|客流量} {b|{@[2]}}"
                          ].join("\n"),
                          rich: {
                            a: {
                              padding: [6, 0, 0, 0],
                              color: "rgba(0,255,255,1)",
                              fontSize: this.$utils.setSize(16),
                              fontWeight: 400,
                              fontFamily: "幼圆"
                            },
                            b: {
                              color: "rgba(0,255,255,1)",
                              fontSize: this.$utils.setSize(16),
                              // fontWeight: 400,
                              fontFamily: "幼圆"
                              // lineHeight:20
                            },
                            c: {
                              color: "rgba(0,255,255,.6)",
                              fontSize: this.$utils.setSize(14),
                              fontFamily: "幼圆"
                              // lineHeight:30
                            }
                          }
                        }
                      }
                    }
                  ],
                  tooltip: {
                    show: false,
                    formatter: function (params) {
                      //根据业务自己拓展要显示的内容
                      if (params.seriesType == "effectScatter") {
                        var res = "";
                        var name = params.data.name;
                        var value = params.data.value[2];
                        var value2 = params.data.value[4];
                        res =
                                "<span style='color:#fff;'>" +
                                name +
                                "</span><br/>客流量：" +
                                value +
                                "</span><br/>班次数量：" +
                                value2;
                        return res;
                      }
                    }
                  }
                }
        );
        console.log(option);
        tmap.addChart("out", option);
      }

    }
  },
  mounted() {
    // this.test();
    this.init();
    this.getStationPassengerVolumeRank();
    this.getMapEcharts();
  },
  data() {
    return {
      checkList:[],
      checkList1:[],
      ZDMC:'',
      ODTitle:'',
      inStationPassengerFlowDestion:[],
      outStatioPpassengerFlowDestion:[],
      frequency:'年',// 频率
      staticDate:this.$utils.dayjs().format("YYYY"),//统计时间
      isWorkDay:'工作日',//是否工作日
      lineCode:'',//线路编码
      dimension:'日均',//时间维度
      titleTime:this.$utils.dayjs().format("YYYY")+'年',//标题时间
      option2: {},
      option1:{},
      tableData: [
      ],
      showPagination: false,
      itemList: [
        // { code: "总量", value: "总量" },
        { code: "日均", value: "日均" },
        { code: "早高峰", value: "早高峰" },
        { code: "晚高峰", value: "晚高峰" }
      ],
      direction1:[],
      direction2:[],
    };
  },
  destroyed() {
    tmap.removeChart('stationName');
    tmap.removeChart('in');
    tmap.removeChart('out');
  }
};
</script>
<style lang="css" scoped>
  .stationOD >>> .el-tag{
    border:0;
    border-radius: 0;
  }
  .directionValue >>> .el-progress__text{
    color:#FFFFFF;
  }
  .directionValue >>> .el-progress-bar__outer{
    background-color: rgba(255,255,255,.4);
  }
</style>
<style lang="scss" scoped>
  .rangeClass{
    height: 490px;
  }
.search {
  text-align: right;
}
.testmap {
  height: 100%;
}
.echar-wrap {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.echar-wrap-my{
  width: 100%;
  height: 315px;
  overflow: auto;
  .stationOD{
    margin: 5px 0px;
    .title{
      display: flex;
      flex-direction: row;
      .stationODOutIn{
        flex:1;
        color:#000;
        font-size: 16px;
        width: 50px;
        display: inline-block;
        /*background-color: #fff;*/
        text-align: center;
        height: 30px;
        line-height: 30px;

      }
      .checkBox{
        margin-left: 20px;
        flex:4;
      }
    }

    .content{
      margin: 10px 0px;
      height: 20px;
      line-height: 20px;
      display: flex;
      flex-direction: row;
      .lineDirection{
        flex:1;
        font-size: 14px;
        span{
          color:rgba(255,255,255,.6);
        }
      }
      .directionValue{
        flex:3
      }
    }
  }
}
.echars {
  width: 100%;
  height: 100%;
}
</style>