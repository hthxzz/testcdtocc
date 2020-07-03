<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <railSearch @getSearchVal="globleSearch" />
          </PanelItem>
          <PanelItem :title="titleTime+'换乘站点客流排名'" :displaySwitch="false" >
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
                        @row-click="gotoStation"
                >
                  <!-- <el-table-column type="index" width="50"></el-table-column> -->
                  <el-table-column label="站点名称" prop="stationName" width="120"></el-table-column>
                  <el-table-column label="日均换乘量(万人次)" prop="dayAvgTransferPassengerFlow" width="120" :formatter="formateTraffic"></el-table-column>
                  <el-table-column label="换乘占比" prop="transferPassengerFlowProp" :formatter="formateRate"></el-table-column>
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
        <panel v-if="isShowRightPanel">
          <PanelItem  :title="titleName1" :displaySwitch="false">
            <div class="echar-wrap">
              <v-chart :options="option1" />
            </div>
          </PanelItem>
          <PanelItem :title="stationName+'换乘地铁客流去向情况'" :displaySwitch="false">
            <div class="echar-wrap-my">
              <div class="lineName"  v-for="item in roadList">
                <el-tag  :color="item.color" effect="dark" >
                 {{item.name}}
                </el-tag>
                <span  :style ="{backgroundColor:item.color}" class="lineNameline"></span>
                <div v-for="item1 in item.direction" class="content">
                  <div class="lineDirection">
                    {{item1.name}}<span>  方向</span>
                  </div>
                 <div class="directionValue">
                   <el-progress :percentage="item1.value" color="rgb(255,255,0)"></el-progress>
                 </div>
                </div>

              </div>

<!--              <v-chart :options="option2" />-->
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
    // formateRate(row, column, cellValue) {//同比格式化
    //   return cellValue?cellValue.toFixed(0)+'%':'--';
    // },
    // formateTraffic(row, column, cellValue) {//轨道客流量格式化
    //   return cellValue?(cellValue/10000).toFixed(2):'--';
    // },
    globleSearch(val) {
      const points = {
        "01": [104.06312148701771, 30.65986455455192],
        "02": [104.05403774090017, 30.66179574504265],
        "03": [104.07470337435977, 30.6426353934782],
        "04": [104.04786697734987, 30.67004399420483],
        "05": [104.03456323635207, 30.661575367148263],
        "07": [104.126688168332, 30.63319401076086],
        "10": [103.95327027460655, 30.570428961993795]
      };
      this.frequency=val.frequency;// 频率
      this.staticDate=val.staticDate;//统计时间
      this.isWorkDay=val.isWorkDay;//是否工作日
      this.lineCode=val.lineCode;//线路编码
      if(val.frequency=="年"){
        this.titleTime=val.staticDate+'年';
      }else if(val.frequency=="月"){
        let times=val.staticDate.split("-");
        this.titleTime=times[0]+'年'+Number(times[1].toString())+'月';
      }
      // this.getStationPassengerVolumeRank();
      this.getStationChangePassengerFlowData();
      if(val.lineCode!=''){
        this.switchView(points[val.lineCode]);
      }
    },
    getStatues(val) {
      this.dimension=val.code;
      this.getStationChangePassengerFlowData();
      // this.getStationPassengerVolumeRank();
    },
    getStationPassengerVolumeRank(data) {//地图展示排名

                var res1=data;
                const pointData = [];
                let sum = res1.reduce((total, val) => {
                  return total + parseInt(val.dayAvgTransferPassengerFlow);
                }, 0);
                var index=1;
                for (const item of res1) {
                  pointData.push({
                    name: item.stationName+ "(Top" + parseInt(index) + ")",
                    value: [
                      item.longitude,
                      item.latitude,
                      item.dayAvgTransferPassengerFlow,
                            20
                      /*(item.dayAvgTransferPassengerFlow * 300) / sum*/
                    ]
                  });
                  index++;
                }
                var optiontStr='总换乘量';
                if(this.dimension!="总量"){
                  optiontStr=this.dimension+"换乘量";
                }
                let option = this.$utils.echart.getMigrationOption(
                        {
                          seriesData: {
                            pointData: pointData
                          }
                        },
                        {
                          tooltip: {
                            show: false
                          },
                          series: [
                            {
                              label: {
                                normal: {
                                  show: true,
                                  formatter: [
                                    "{a|{b}}",
                                    "{c|"+optiontStr+"} {b|{@[2]}}"
                                    // "{c|进站} {b|{@[4]}}",
                                    // "{c|出站} {b|{@[5]}}"
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
                          ]
                        }
                );
                let stationName = tmap.addChart("stationName", option);
                this.activeRightPanel(stationName.$chart);
                this.getRightPaneData(data[0].stationName);//显示右边

    },
    getStationChangePassengerFlowData() {
      this.$http
              .$get(
                      "gdjc_travelCharacteristicsHandler/getTransferStationPassengerFlowData",
                      {
                        frequency:this.frequency,// 频率
                        staticDate:this.staticDate,//统计时间
                        isWorkDay:this.isWorkDay,//是否工作日
                        lineCode:this.lineCode,
                        dimension:this.dimension
                      }
              )
              .then(res => {
                this.tableData = res.slice(0,10);
                this.getStationPassengerVolumeRank(this.tableData);
              });
    },
    activeRightPanel(el) {
      el.on("click", params => {
        debugger;
        this.getRightPaneData(params.name.split("(")[0]);
      });
    },
    getRightPaneData(stationName) {//单个站点客流变化
      this.stationName=stationName;
      var val={
        stationName:stationName,
        frequency:this.frequency,// 频率
        staticDate:this.staticDate,//统计时间
        isWorkDay:this.isWorkDay,//是否工作日
      }
      this.isShowRightPanel = true;
      this.getStationDailyAveragePassengerFlowChangeData(val);
      // this.getStationDailyAverageHourInOutPassengerFlowChangeData(val);s
      this.getTransferStationFlowDestinationData(val);
    },
    gotoStation(row) {
      this.switchView([row.longitude, row.latitude]);
    },
    switchView(point) {
      const duration = 1000;
      let view = tmap.omap.getView();
      view.animate({ center: point, duration: duration });
      view.animate(
              {
                zoom: tmap.getMapZoomLevel() - 1,
                duration: duration / 2
              },
              {
                zoom: 14,
                duration: duration / 2
              }
      );
    },
    getStationDailyAveragePassengerFlowChangeData(val) {
      this.$http.$get(
                      "gdjc_travelCharacteristicsHandler/getTransStationDailyAveragePassengerFlowChangeData",
                      val
              )
              .then(res => {
                debugger;
                const xAxisData = [],
                        seriesData1 = [],
                        seriesData2 = [],
                        seriesData = [];
                this.titleName1 = res.chartTitle;
                for (const item of res.lineChartData) {
                  xAxisData.push(item.time);
                  seriesData1.push(item.passengerVolume);
                }
                // for (const item of res.lineChartYoyData) {
                //   seriesData2.push(item.passengerVolume);
                // }
                seriesData.push(seriesData1);
                // seriesData.push(seriesData2);
                var testData2={
                  // title:data.chartTitle,
                  unitName:'人次',
                  legendData:['换乘流量'],
                  xAxisData: xAxisData,
                  seriesData:seriesData,
                  interval:4,

                };
                debugger;
                this.option1=this.$utils.echart.createEchartOption_8_1(testData2);
              });
    },
    getTransferStationFlowDestinationData(val) {
      this.$http.$get("gdjc_travelCharacteristicsHandler/getTransferStationFlowDestinationData",val) .then(res => {
        const colors = {
          "01": "rgba(26, 117, 209,1)",
          "02": "rgb(238, 121, 26)",
          "03": "rgb(238, 75, 129)",
          "04": "rgb(68, 209, 53)",
          "05": "rgb(190, 81, 169)",
          "07": "rgb(118, 214, 222)",
          "10": "rgb(108, 105, 236)"
        };
        if(res!=null&&res.length>0){
          let roadList=[];
          res.forEach(e=>{
            var road={
              name:Number(e.lineName)+'号线',
              color:colors[e.lineName],
              direction:[]
            };
             if(e.passengerFlowDestion.length>0){
               e.passengerFlowDestion.forEach(ele=>{
                 road.direction.push({name:ele.stationName,value:Number(ele.scale).toFixed(0)})
               })

             }
            roadList.push(road);
          })
          this.roadList=roadList;
        }
        });
    },

    init() {
      tmap.setMapZoomLevel(13);
      // tmap.removeChart('stationName');
    }
  },
  mounted() {
    // this.test();
    this.init();
    // this.getStationPassengerVolumeRank();
    this.getStationChangePassengerFlowData();
  },
  data() {
    return {
      isShowRightPanel:true,
      stationName:'',
      frequency:'年',// 频率
      staticDate:this.$utils.dayjs().format("YYYY"),//统计时间
      isWorkDay:'工作日',//是否工作日
      lineCode:'',//线路编码
      dimension:'日均',//时间维度
      titleTime:this.$utils.dayjs().format("YYYY")+'年',//标题时间
      option2: {},
      option1:{},
      tableData: [],
      showPagination: false,
      titleName1:'',
      itemList: [
        // { code: "总量", value: "总量" },
        { code: "日均", value: "日均" },
        { code: "早高峰", value: "早高峰" },
        { code: "晚高峰", value: "晚高峰" }
      ],
      // color1:"rgb(238, 121, 26)",
      roadList: []
    };

  },
  destroyed() {
    tmap.removeChart('stationName');
  }
};
</script>
<style lang="css" scoped>
  .lineName >>> .el-tag{
    border:0;
    border-radius: 0;
  }
  .directionValue >>> .el-progress__text{
    color:#FFFFFF;
  }
  .directionValue >>> .el-progress-bar__outer{
    background-color: rgba(32,86,221,.6);
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
  height: 316px;
  overflow: auto;
  .lineName{
    position: relative;
    margin: 5px 0px;
    .lineNameline{
      width: 95%;
      display: inline-block;
      /*background-color: #fff;*/
      height: 2px;
      position: absolute;
      top: 32px;
      left: 0;
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