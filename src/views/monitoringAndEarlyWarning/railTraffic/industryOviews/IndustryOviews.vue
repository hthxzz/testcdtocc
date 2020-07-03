<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="线网总客运量" :displaySwitch="false">
            <div class="item-content number-wrapper">
              <RollNumber title="线网总客运量" :value="rollNo" unit="人次" />
            </div>
          </PanelItem>
          <PanelItem title="线网客运量分担情况[人次]" :displaySwitch="false">
            <xwjc @setSklx="setSklx" />
          </PanelItem>
          <PanelItem title="站点客流情况[人次]" :displaySwitch="false">
            <zdjc />
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <!-- <div class="lengend-container" :class="{isFullPagefrolen:isShowLineInfo}"> -->
        <MapLegend :mapLegend="mapLegend" :right="MapLegendDistance" />
        <!-- </div> -->
        <div class="testmap">
          <railTrafficMap @getLineInfo="getLineInfo" />
        </div>
        <div class="line-detail-container" :class="{isFullPage:isShowLineInfo}">
          <lineDetail ref="lineDetail" />
        </div>
        <div class="num-wrapper">
          <mapDataCenterData :itemList="itemList"></mapDataCenterData>
        </div>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title="客流刷卡类型统计[次]" :displaySwitch="false">
            <klsklxtj ref="klsklxtj" />
          </PanelItem>
          <!-- <PanelItem title="客流刷卡类型统计[次]" :displaySwitch="false">
            <div class="chartdiv" id="chartdiv"></div>
          </PanelItem>-->
          <PanelItem title="乘坐车站数分布[人次]" :displaySwitch="false">
            <czczsfb />
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
  </div>
</template>

<script>
import xwjc from "./components/xwjc.vue";
import lineDetail from "./components/lineDetail.vue";
import czczsfb from "./components/czczsfb.vue";
import zdjc from "./components/zdjc.vue";
import klsklxtj from "./components/klsklxtj.vue";
import railTrafficMap from "../analysis/components/railTrafficMap";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    lineDetail,
    czczsfb,
    klsklxtj,
    xwjc,
    railTrafficMap,
    zdjc
  },
  computed: mapState({
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    isFullscreen(state) {
      return state.app.isFullscreen;
    }
  }),
  watch: {
    isFullscreen(val) {
      if (val) {
        this.MapLegendDistance = this.$utils.setSize(1) + "px";
        this.isShowLineInfo = val;
      } else {
        this.MapLegendDistance = this.$utils.setSize(410) + "px";
        this.isShowLineInfo = val;
      }
    }
  },
  mounted() {
    this.getTrackBaseStaticInfo();
    this.getTotalPassengerVolume();
    this.getLonAndLatInfo("市");
    this.init("市");
    // this.test("市");
  },
  methods: {
    test() {
      am4core.useTheme(am4themes_animated);
      // Themes end

      let chart = am4core.create("chartdiv", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = [
        {
          country: "Lithuania",
          litres: 501.9
        },
        {
          country: "Czech Republic",
          litres: 301.9
        },
        {
          country: "Ireland",
          litres: 201.1
        },
        {
          country: "Germany",
          litres: 165.8
        },
        {
          country: "Australia",
          litres: 139.9
        },
        {
          country: "Austria",
          litres: 128.3
        }
      ];

      chart.innerRadius = am4core.percent(36);
      chart.depth = 120;

      // chart.legend = new am4charts.Legend();

      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "litres";
      series.dataFields.depthValue = "litres";
      series.dataFields.category = "country";
      series.slices.template.cornerRadius = 5;
      series.colors.step = 3;
    },
    init() {
      tmap.setMapZoomLevel(14);
    },
    setSklx(val) {
      this.$refs.klsklxtj.getBikeNum(val);
      this.$refs.lineDetail.getLineStaticInfo(val);
    },
    getLineInfo(id) {
      this.$refs.lineDetail.getLineStaticInfo(id);
    },
    getStationBar(x, y, inNum, outNum) {
      let option = this.$utils.echart.getBarOption(
        {
          seriesData: [[inNum, outNum]],
          xAxisData: ["进站", "出站"]
        },
        {
          grid: {
            left: 0,
            right: 0,
            top: 25,
            bottom: 30
          }
        }
      );

      tmap.addChart(x, option, x, y, {
        width: 100,
        height: 150,
        positioning: "bottom-left"
      });
      this.charId = x;
    },
    getLonAndLatInfo(type) {
      this.$http
        .$get("/gdjc_trackMonitorHandler/getTodayStationInfo", {
          time: "2020-04-21"
        })
        .then(res => {
          const pointData = [];
          const switchPointConfig = [];
          for (const item of res) {
            pointData.push({
              name: item.stationName,
              value: [item.longitude, item.latitude, item.inNum, item.outNum]
            });
            switchPointConfig.push({
              switchPoint: [item.longitude, item.latitude],
              inNum: item.inNum,
              outNum: item.outNum
            });
          }
          this.switchPointConfig = switchPointConfig;
          // this.autoSwitchView();
          let option = this.$utils.echart.getMigrationOption(
            {
              seriesData: {
                pointData: pointData
                // linesData: [res]
              }
            },
            {
              // tooltip: {
              //   formatter: function(params, ticket, callback) {
              //     //根据业务自己拓展要显示的内容
              //     if (params.seriesType == "effectScatter") {
              //       var res = "";
              //       var name = params.data.name;
              //       var value = params.data.value[2];
              //       var value2 = params.data.value[3];
              //       res =
              //         "<span style='color:#fff;'>" +
              //         name +
              //         "</span><br/>客流量：" +
              //         value +
              //         "</span><br/>班次数量：" +
              //         value2;
              //       return res;
              //     }
              //   }
              // }
            }
          );

          // if (type == "市") {
          //   tmap.addChart("cityLayer", option);
          // } else {
          //   tmap.addChart("provinceLayer", option);
          // }
          // resolve(option);
        });
      // });
    },
    autoSwitchView() {
      let i = 0,
        switchPointConfig = this.switchPointConfig,
        len = switchPointConfig.length;
      this.autohand = setInterval(() => {
        if (i == len) {
          i = 0;
        }
        this.switchView(
          switchPointConfig[i]["switchPoint"],
          switchPointConfig[i]["inNum"],
          switchPointConfig[i]["outNum"]
        );
        i++;
      }, 11000);
    },
    switchView(point, inNum, outNum) {
      if (this.charId) {
        tmap.removeChart(this.charId);
      }
      const duration = 6000;
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
        },
        ev => {
          this.getStationBar(point[0], point[1], inNum, outNum);
        }
      );
    },
    getTotalPassengerVolume() {
      this.$http
        .$get("gdjc_runMonitorHandler/getTotalPassengerVolume")
        .then(data => {
          this.rollNo = data;
        });
    },
    getTrackBaseStaticInfo() {
      this.$http
        .$get("gdjc_runMonitorHandler/getTrackBaseStaticInfo")
        .then(res => {
          this.itemList[0]["number"] = res.lineNum;

          this.itemList[1]["number"] =
            res.stationNum + "/" + res.transStationNum;
          this.itemList[2]["number"] = res.mileage;
        });
    }
  },
  beforeDestroy() {
    if (this.autohand) {
      window.clearInterval(this.autohand);
    }
  },

  destroyed() {
    if (this.autohand) {
      window.clearInterval(this.autohand);
    }
  },
  data() {
    return {
      isShowLineInfo: false,
      MapLegendDistance: this.$utils.setSize(410) + "px",
      mapLegend: {
        list: [
          {
            color: "rgba(26, 117, 209,1)",
            name: "1号线" // 圖例名字
          },
          {
            color: "rgb(238, 121, 26)",
            name: "2号线"
          },
          {
            color: "rgb(238, 75, 129)",
            name: "3号线"
          },
          {
            color: "rgb(68, 209, 53)",
            name: "4号线"
          },
          {
            color: "rgb(190, 81, 169)",
            name: "5号线"
          },
          {
            color: "rgb(118, 214, 222)",

            name: "7号线"
          },
          {
            color: "rgb(108, 105, 236)",
            name: "10号线"
          }
        ]
      },
      rollNo: 0,
      itemList: [
        {
          id: "1",
          sub: "地铁线路",
          number: 7,
          unite: "条"
          // rateUnite: "较上月",
          // rate: -6
        },
        {
          id: "2",
          sub: "站点/换乘站点",
          number: 221 / 21,
          unite: "座"
          // rateUnite: "较上月",
          // rate: 6
        },
        {
          id: "3",
          sub: "地铁运营里程",
          number: 297,
          unite: "公里"
          // rateUnite: "较上月",
          // rate: -16
        },
        {
          id: "4",
          sub: "有轨电车线路",
          number: 1,
          unite: "条"
          // rateUnite: "较上月",
          // rate: 12
        },
        {
          id: "5",
          sub: "有轨电车",
          number: 89,
          unite: "辆"
          // rateUnite: "较上月",
          // rate: 12
        },
        {
          id: "46",
          sub: "有轨运营里程",
          number: 45,
          unite: "公里"
          // rateUnite: "较上月",
          // rate: 12
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.isFullPage {
  position: absolute;
  transition: all 0.6s;
  right: 10px !important;
  top: 10px !important;
}
.isFullPagefrolen {
  position: absolute;
  transition: all 0.6s;
  right: 10px !important;
  bottom: 60px !important;
}
.line-detail-container {
  position: absolute;
  transition: all 0.6s;
  right: 410px;
  top: 140px;
}
.lengend-container {
  position: absolute;
  transition: all 0.6s;
  right: 0;
  bottom: 60px;
}
.num-wrapper {
  // padding: 0 0 0 20px;
  position: absolute;
  left: 50%;
  top: 50px;
  // width: 710px;
  height: 90px;
  transform: translateX(-50%);
}
.panel-wrap {
  position: absolute;
  right: 10px;
  top: 10px;
}
.chartdiv {
  height: 360px;
  width: 100%;
}
</style>