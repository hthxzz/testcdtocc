<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <railSearch @getSearchVal="globleSearch" />
          </PanelItem>
          <PanelItem :title="titleTime+'早晚高峰站点客流排名'" :displaySwitch="false">
            <div class="search">
              <ChangeTag :itemList="itemList" @getStatues="getStatues" />
            </div>
            <TableAndPagination :showPagination="showPagination"  :showSearchPanel="false">
              <el-table
                style="width: 100%;height:100%;overflow-y: auto"
                :height="tableHeight"
                :data="tableData1"
                stripe
                ref="table"
                @row-click="gotoStation"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column label="站点名称" prop="stationName"  width="120"></el-table-column>
                <el-table-column label="客流量(万人次)" prop="passengerFlow" width="120" :formatter="formateTraffic"></el-table-column>
                <el-table-column label="同比" prop="passengerFlowYoy" :formatter="formateRate" ></el-table-column>
              </el-table>
            </TableAndPagination>
          </PanelItem>
          <PanelItem :title="titleTime+'进出站点日均客流排名'" :displaySwitch="false">
            <div class="search">
              <ChangeTag :itemList="itemList2" @getStatues="getStatues1" />
            </div>
            <TableAndPagination :showPagination="showPagination"  :showSearchPanel="false">
              <el-table
                style="width: 100%;height:260px;overflow-y: auto"
                :height="tableHeight"
                :data="tableData2"
                stripe
                ref="table"
                @row-click="gotoStation"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column label="站点名称" prop="stationName" width="120"></el-table-column>
                <el-table-column label="总客流(万人次)" prop="passengerFlow" width="120" :formatter="formateTraffic"></el-table-column>
                <el-table-column label="同比" prop="passengerFlowYoy" :formatter="formateRate"></el-table-column>
              </el-table>
            </TableAndPagination>
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
          <PanelItem :title="titleName1" :displaySwitch="false">
            <div class="echar-wrap">
              <v-chart :options="option1" />
            </div>
          </PanelItem>
          <PanelItem :title="titleName2" :displaySwitch="false">
            <div class="echar-wrap">
              <v-chart :options="option2" />
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
import $ from "jquery";
export default {
  name: "",
  components: {
    railSearch,
    railTrafficMap
  },
  mixins: [tableMixins],
  methods: {

    getBaseInfoHtml (type, data, feaCoordinate, titleText, width, height) {//点击图层上地体站点的信息
      var content = "";
       if (type.indexOf("BUS_METRO") !== -1) {
        //公交地铁换乘
         this.getRightPaneData(data.name);

        content = null;
      }
      else {
        content = null;
        console.warn("图层：" + type + "没有配置弹窗展示内容！");
      }
      return content;
    },
    globleSearch(val) {//时间等搜索条件改变后执行方法
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
      this.getMorningAndEveningPeakPassengerFlowData();//左一表格
      this.getDailyAveragePassengerFlowData();//左二表格
      this.getStationPassengerVolumeRank();
      if(val.lineCode!=''){
        this.switchView(points[val.lineCode]);
      }
    },

    getStatues(val) {
      this.dimension1=val.code;
      this.getMorningAndEveningPeakPassengerFlowData();
      this.getStationPassengerVolumeRank();
    },
    getStatues1(val){
      this.dimension2=val.code;
      this.getDailyAveragePassengerFlowData();
      this.getStationPassengerVolumeRank(1);
    },
    getStationPassengerVolumeRank(type) {//地图展示排名
      var url='gdjc_basicPassengerFlowHandler/getMorningAndEveningPeakPassengerFlowData';
      var val={
        frequency:this.frequency,// 频率
        staticDate:this.staticDate,//统计时间
        isWorkDay:this.isWorkDay,//是否工作日
        lineCode:this.lineCode,
        dimension:this.dimension1
      };
      if(type!=undefined&&type==1){
        url="gdjc_basicPassengerFlowHandler/getDailyAveragePassengerFlowData";
        val.dimension=this.dimension2;
      }
      this.$http
        .$get(url, val)
        .then(res => {
          var res1=res.slice(0,10);
          const pointData = [];
          let sum = res1.reduce((total, val) => {
            return total + parseInt(val.passengerFlow);
          }, 0);
          var index=1;
          for (const item of res1) {
            pointData.push({
              name: item.stationName+ "(Top" + parseInt(index) + ")",
              value: [
                item.longitude,
                item.latitude,
                item.passengerFlow,
                (item.passengerFlow * 300) / sum
              ]
            });
            index++;
          }
          var optiontStr='总客流';
          if(val.dimension!="总量"){
            optiontStr=val.dimension+"客流";
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
          this.getRightPaneData(res[0].stationName);//右边表格显示
          console.log(option);
        });
    },
    activeRightPanel(el) {
      el.on("click", params => {
        debugger;
        this.getRightPaneData(params.name.split("(")[0]);
      });
    },
    getRightPaneData(stationName) {//单个站点客流变化
      var val={
        stationName:stationName,
        frequency:this.frequency,// 频率
        staticDate:this.staticDate,//统计时间
        isWorkDay:this.isWorkDay,//是否工作日
      }
      this.isShowRightPanel = true;
      this.getStationDailyAveragePassengerFlowChangeData(val);
      this.getStationDailyAverageHourInOutPassengerFlowChangeData(val);
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
    init() {
      tmap.setMapZoomLevel(12);
      tmap.addLayer("BUS_METRO").loadData();
      // tmap.
    },
    // 左一表格
    getMorningAndEveningPeakPassengerFlowData() {
      this.$http
        .$get(
          "gdjc_basicPassengerFlowHandler/getMorningAndEveningPeakPassengerFlowData",
          {
            frequency:this.frequency,// 频率
            staticDate:this.staticDate,//统计时间
            isWorkDay:this.isWorkDay,//是否工作日
            lineCode:this.lineCode,
            dimension:this.dimension1
          }
        )
        .then(res => {
          this.tableData1 = res.slice(0,10);
        });
    },
    // 左二表格
    getDailyAveragePassengerFlowData() {
      this.$http
        .$get(
          "gdjc_basicPassengerFlowHandler/getDailyAveragePassengerFlowData",
                {
                  frequency:this.frequency,// 频率
                  staticDate:this.staticDate,//统计时间
                  isWorkDay:this.isWorkDay,//是否工作日
                  lineCode:this.lineCode,
                  dimension:this.dimension2
                }
        )
        .then(res => {
          this.tableData2 = res.slice(0,10);
        });
    },
    // 右一表格
    getStationDailyAveragePassengerFlowChangeData(val) {
      this.$http
        .$get(
          "gdjc_basicPassengerFlowHandler/getStationDailyAveragePassengerFlowChangeData",
          val
        )
        .then(res => {
          const xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData = [];
          this.titleName1 = res.chartTitle;
          for (const item of res.lineChartData) {
            xAxisData.push(item.time);
            seriesData1.push(item.passengerVolume);
          }
          for (const item of res.lineChartYoyData) {
            seriesData2.push(item.passengerVolume);
          }
          seriesData.push(seriesData1);
          seriesData.push(seriesData2);
          var testData2={
            // title:data.chartTitle,
            unitName:'人次',
            legendData: ["当前客流量", "去年同期客流量"],
            xAxisData: xAxisData,
            seriesData:seriesData,
            interval:4,

          };
          debugger;
          this.option1=this.$utils.echart.createEchartOption_8_1(testData2);

        });
    },
    // 右二表格
    getStationDailyAverageHourInOutPassengerFlowChangeData(val) {
      this.$http
        .$get(
          "gdjc_basicPassengerFlowHandler/getStationDailyAverageHourInOutPassengerFlowChangeData",
          val
        )
        .then(res => {
          const xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData = [];
          this.titleName2 = res.chartTitle;
          for (const item of res.lineChartData) {
            xAxisData.push(item.time);
            seriesData1.push(item.passengerVolume);
          }
          for (const item of res.lineChartYoyData) {
            seriesData2.push(item.passengerVolume);
          }
          seriesData.push(seriesData1);
          seriesData.push(seriesData2);
          var testData2={
            // title:data.chartTitle,
            unitName:'人次',
            legendData: ["进站", "出站"],
            xAxisData: xAxisData,
            seriesData:seriesData,
            interval:3,

          };
          debugger;
          this.option2=this.$utils.echart.createEchartOption_8_1(testData2);

        });
    }
  },
  mounted() {
    window.getBaseInfoHtml = this.getBaseInfoHtml;
    this.init();
    this.getStationPassengerVolumeRank();
    this.getMorningAndEveningPeakPassengerFlowData();
    this.getDailyAveragePassengerFlowData();
  },
  data() {
    return {
      frequency:'年',// 频率
      staticDate:this.$utils.dayjs().format("YYYY"),//统计时间
      isWorkDay:'工作日',//是否工作日
      lineCode:'',//线路编码
      dimension1:'平峰',//时间维度
      dimension2:'总量',//行为维度
      titleTime:this.$utils.dayjs().format("YYYY")+'年',//标题时间
      titleName1: "",
      isShowRightPanel: true,
      titleName2: "",
      option1: {},
      option2: {},
      tableData1: [],
      tableData2: [],
      showPagination: false,
      itemList: [
        { code: "平峰", value: "平峰" },
        { code: "早高峰", value: "早高峰" },
        { code: "晚高峰", value: "晚高峰" }
      ],
      itemList2: [
        { code: "总量", value: "总量" },
        { code: "进站", value: "进站" },
        { code: "出站", value: "出站" }
      ]
    };
  },
  destroyed() {
    tmap.removeChart('stationName');
  }
};
</script>

<style lang="scss" scoped>
.search {
  text-align: right;
}
.testmap {
  height: 100%;
}
.echar-wrap {
  width: 100%;
  height: 305px;
  overflow: hidden;
}
.echars {
  width: 100%;
  height: 100%;
}
</style>