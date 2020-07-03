<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="客运站数量" :displaySwitch="false" :isShowDeatilBtn="true" @moreInfo="kyzxq">
            <div class="kyzsl">
              <table>
                <tr>
                  <th @click="localtionKyz('all')">客运站数量</th>
                  <th @click="localtionKyz('1.0')">一级</th>
                  <th @click="localtionKyz('2.0')">二级</th>
                  <th @click="localtionKyz('3.0')">三级</th>
                </tr>
                <tr>
                  <!-- <td>37</td>
                  <td>11</td>
                  <td>20</td>
                  <td>6</td>-->
                  <td @click="localtionKyz('all')">{{total}}</td>
                  <td @click="localtionKyz('1.0')">{{one}}</td>
                  <td @click="localtionKyz('2.0')">{{two}}</td>
                  <td @click="localtionKyz('3.0')">{{three}}</td>
                </tr>
              </table>
            </div>
          </PanelItem>
          <PanelItem
            :title="kyxlt"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="kyxlxq"
          >
            <div class="kyxl" v-loading="loading">
              <!-- <kyxl /> -->
              <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
            </div>
            <div class="kyzsl">
              <table>
                <tr>
                  <th @click="getLonAndLatInfo('province')">省际</th>
                  <th @click="getLonAndLatInfo('city')">市际</th>
                  <th @click="getLonAndLatInfo('chengdu')">市内</th>
                </tr>
                <tr>
                  <td @click="getLonAndLatInfo('province')">
                    <count-to :startVal="0" :endVal="sw" :duration="1000" />
                  </td>
                  <td @click="getLonAndLatInfo('city')">
                    <count-to :startVal="0" :endVal="slsw" :duration="1000" />
                  </td>

                  <td @click="getLonAndLatInfo('chengdu')">{{sl}}</td>
                  <!-- <td>{{total}}</td>
                  <td>{{one}}</td>
                  <td>{{two}}</td>
                  <td>{{three}}</td>-->
                </tr>
              </table>
            </div>
          </PanelItem>
          <PanelItem title="经营业户和从业驾驶员" :displaySwitch="false">
            <div class="jyyh">
              <table>
                <tr>
                  <th @click="jyyh">经营业户</th>
                  <th @click="cyry">从业驾驶员</th>
                </tr>
                <tr>
                  <td>
                    <count-to :startVal="0" :endVal="enterprise" :duration="1000" />
                  </td>
                  <td>
                    <count-to :startVal="0" :endVal="employee" :duration="1000" />
                  </td>
                </tr>
              </table>
            </div>
          </PanelItem>
          <PanelItem title="客运车辆" :displaySwitch="false" :isShowDeatilBtn="true" @moreInfo="kyclxq">
            <div class="content">
              <kycl />
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
        <MapLegend :mapLegend="mapLegend" :right="MapLegendDistance" />
        <!-- 地图工具栏 -->
        <!-- <section class="maptool-wrapper">
          <MapTool :mapToolList="mapToolList" @activeLayer="activeLayer" />
        </section>-->
        <section class="pop-wrap">
          <lineDetail :baseInfo="baseInfo" ref="kyzInfo" />
        </section>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem
            title="中心城区11个客运站实时运营情况"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="ssyyxq"
          >
            <div class="realTime">
              <table>
                <tr>
                  <th>已发班次(班)</th>
                  <th>已送旅客(人次)</th>
                  <th>已售票数(张)</th>
                </tr>
                <tr>
                  <td>
                    <count-to :startVal="0" :endVal="dispatchNum" :duration="1000" />
                  </td>
                  <td>
                    <count-to :startVal="0" :endVal="flowTotal" :duration="1000" />
                  </td>
                  <td>
                    <count-to :startVal="0" :endVal="ticketNum" :duration="1000" />
                  </td>
                </tr>
              </table>
            </div>
          </PanelItem>
          <PanelItem
            title="热门目的地"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="rmxlxq"
          >
            <div class="content">
              <rmxl @setHotDes="setHotDes" />
            </div>
          </PanelItem>
          <PanelItem
            title="站点客运量排名"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="zdkylxq"
          >
            <div class="content">
              <zdkyl />
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import kycl from "./components/index/kycl.vue";
import lineDetail from "./components/index/lineDetail.vue";
import rmxl from "./components/index/rmxl.vue";
import zdkyl from "./components/index/zdkyl.vue";
import mapAnimation from "../../../components/common/map/animation/mapAnimation";
import videoConfig from "../../../components/common/video/index.js";
import videoPlayerTocc from "../../../components/common/video/index.vue";
import { mapState } from "vuex";
export default {
  name: "",
  components: { kycl, rmxl, zdkyl, lineDetail, videoPlayerTocc },
  mixins: [mapAnimation, videoConfig],
  mounted() {
    this.getPassengerLine();
    this.getRealTimeOperation();
    this.getEnterpriseAndEmployee();
    this.getStationNumByGrade();
    // this.getQxtOption();
    // this.changeLayer();
    // this.getLonAndLatInfo("县");
    this.init();
    this.getVehicleInfo();
    // this.getVehicleDetailInfo();
    // this.addKyzInfo();
  },
  methods: {
    init() {
      tmap.setMapZoomLevel(11);
      this.localtionKyz("all");
    },
    setHotDes(type) {
      tmap.removeLayer();
      this.removePoPHtml();
      // tmap.addLayer("bxky_index_rmmdd");
      this.$http
        .$get("kyjc_indexHandler/getHotLine", { type: type })
        .then(res => {
          const types = {
            province: 5,
            all: 7,
            city: 9
          };
          const colors = [
            "#25272b",
            "#464f61",
            "#445577",
            "#48659e",
            "#436bbb",
            "#226ea7",
            "#0e43b1",
            "#1457e0",
            "#2056dd",
            "#2056dd"
          ];

          this.point2point(
            [104.06349699335493, 30.66057447598776],
            2000,
            tmap.getMapZoomLevel(),
            types[type],
            () => {
              // tmap.addChart("setHotDes", option);
              debugger;
              const symbols =
                mapConfig.vectorlayers.bxky_index_rmmdd.zoomSymbols[0].symbols; // minValue   maxValue
              const pointData = [];
              const kyl = res.map(val => {
                return val.value;
              });
              const kylMax = Math.max(...kyl);
              const kylMaxSplit = (kylMax + 1) / 10;
              for (let index = 0; index < 10; index++) {
                symbols[index].minValue = kylMaxSplit * index;
                symbols[index].maxValue = kylMaxSplit * (index + 1);
              }
              for (const [index, item] of res.entries()) {
                // pointData.push({
                //   name: item.toName + "(Top" + (index + 1) + ")",
                //   value: item.coords[1].concat(
                //     item.shifts,
                //     36 - index * 2,
                //     item.value
                //   )
                // });
                item["geomstr"] = [item["coordinates"]];
                tmap.addFeatureOnLayer(
                  "bxky_index_rmmdd",
                  {
                    geomstr: item["coordinates"],
                    value: item["value"],
                    shifts: item["shifts"],
                    toName: item["toName"]
                  },
                  "bxky_index_rmmdd",
                  false,
                  false
                );
              }
            }
          );

          // let option = this.$utils.echart.getMigrationOption(
          //   {
          //     seriesData: {
          //       pointData: pointData
          //       // linesData: [res]
          //     }
          //   },
          //   {
          //     series: [
          //       {
          //         label: {
          //           normal: {
          //             show: true,
          //             formatter: [
          //               "{a|{b}}",
          //               "{c|客流量} {b|{@[4]}}",
          //               "{c|班次数} {b|{@[2]}}"
          //             ].join("\n"),
          //             rich: {
          //               a: {
          //                 padding: [6, 0, 0, 0],
          //                 color: "rgba(0,255,255,1)",
          //                 fontSize: this.$utils.setSize(16),
          //                 fontWeight: 400,
          //                 fontFamily: "幼圆"
          //               },
          //               b: {
          //                 color: "rgba(0,255,255,1)",
          //                 fontSize: this.$utils.setSize(16),
          //                 // fontWeight: 400,
          //                 fontFamily: "幼圆"
          //                 // lineHeight:20
          //               },
          //               c: {
          //                 color: "rgba(0,255,255,.6)",
          //                 fontSize: this.$utils.setSize(14),
          //                 fontFamily: "幼圆"
          //                 // lineHeight:30
          //               }
          //             }
          //           }
          //         }
          //       }
          //     ],
          //     tooltip: {
          //       show: false,
          //       formatter: function(params) {
          //         //根据业务自己拓展要显示的内容
          //         if (params.seriesType == "effectScatter") {
          //           var res = "";
          //           var name = params.data.name;
          //           var value = params.data.value[2];
          //           var value2 = params.data.value[3];
          //           res =
          //             "<span style='color:#fff;'>" +
          //             name +
          //             "</span><br/>客流量：" +
          //             value +
          //             "</span><br/>班次数量：" +
          //             value2;
          //           return res;
          //         }
          //       }
          //     }
          //   }
          // );
        });
    },
    localtionKyz(stationType) {
      const zoom = {
        all: 11,
        "1.0": 12,
        "2.0": 10,
        "3.0": 9
      };
      tmap.removeLayer();
      this.removePoPHtml();
      this.getAllStationLonAndLat(stationType);
      this.point2point(
        [104.06324665471999, 30.65995220349631],
        1000,
        null,
        zoom[stationType],
        () => {
          mapConfig.vectorlayers.banxianindex.onLayerFeatureClick = this.getDlPassengerStation;
          if (stationType == "all") {
            tmap.addLayer("banxianindex").loadData();
          } else {
            tmap
              .addLayer("banxianindex")
              .loadData("stationType=" + stationType);
          }
        }
      );
    },
    addKyzInfo(params) {
      this.isShowKyzInfo = true;
      let hide = this.$refs.kyzInfo.$refs.popContainer.hide;
      if (!hide) {
        this.$refs.kyzInfo.$refs.popContainer.close();
      }
      let kyzInfo = this.$refs.kyzInfo.$el;

      this.addPoPHtml(
        [params.values_.longitude, params.values_.latitude],
        kyzInfo
      );
    },
    getAllStationLonAndLat(stationType) {
      this.$http
        .$get(
          "kyjc_indexHandler/getStationLonAndLatInfo",
          stationType != "all"
            ? {
                stationType: stationType
              }
            : {}
        )
        .then(res => {
          var xAxisData = [];
          var seriesData = [];
          var capacityNum = [];
          var shuttleCount = [];
          for (const item of res) {
            if (item.flow == 0 && item.ticket == 0) {
              continue;
            }
            xAxisData.push(item.stationName);
            capacityNum.push(item.flow);
            shuttleCount.push(item.ticket);

            seriesData.push(capacityNum, shuttleCount);
            let option = this.$utils.echart.creatEchartOption_12_1({
              seriesData: seriesData,
              title: item.stationName
            });
            console.log(option);

            // let option = this.$utils.echart.getBarOption(
            //   {
            //     xAxisData: xAxisData,
            //     // legendData: ["客流量", "售票量"],
            //     seriesData: seriesData
            //   },
            //   {
            //     grid: {
            //       height: 60,
            //       width: 60,
            //       bottom: 1
            //     },
            //     series: [
            //       {
            //         name: "客流量",
            //         label: {
            //           normal: {
            //             show: true,
            //             offset: [0, -2],
            //             position: "top"
            //             // rotate: "-90"
            //           }
            //         }
            //       },
            //       {
            //         name: "售票数",
            //         label: {
            //           normal: {
            //             show: true,
            //             offset: [0, -13],
            //             position: "top"
            //             // rotate: "-90",
            //             // textStyle: {
            //             //   color: "rgba(32, 86, 221, 0.8)"
            //             // }
            //           }
            //         }
            //       }
            //     ],
            //     xAxis: [{ show: false }],
            //     yAxis: [{ show: false }]
            //   }
            // );

            tmap
              .addChart(
                item.stationName,
                option,
                item.longitude,
                item.latitude,
                {
                  width: 250,
                  height: 190
                }
              )
              .$chart.on("click", params => {
                this.addKyzInfo(params);
              });
            // this.switchFullscreen(true);
            (xAxisData = []),
              (seriesData = []),
              (capacityNum = []),
              (shuttleCount = []);
          }
        });
    },
    getVehicleInfo() {
      this.$http.$get("/kyjc_indexHandler/getVehicleInfo").then(res => {
        this.ca = res.isA;
        this.nca = res.notA;
      });
    },
    // 根据站点查询站点信息
    getDlPassengerStation(params) {
      this.$http
        .$get("/kyjc_indexHandler/getDlPassengerStation", {
          stationName: params.values_.stationName
        })
        .then(res => {
          this.baseInfo = res;
          this.addKyzInfo(params);
        });
    },

    getVehicleDetailInfo() {
      this.$http.$get("/kyjc_indexHandler/getVehicleDetailInfo").then(res => {
        var randomCount = res.length;
        var data = [];
        // 构造数据
        while (randomCount--) {
          data.push({
            geometry: {
              type: "Point",
              coordinates: [res[randomCount]["lon"], res[randomCount]["lat"]]
            }
          });
        }

        var dataSet = new mapv.DataSet(data);

        var options = {
          // shadowColor: 'rgba(255, 250, 50, 1)',
          // shadowBlur: 10,
          fillStyle: "rgba(255, 50, 0, 1.0)", // 非聚合点的颜色
          size: 5, // 非聚合点的半径
          minSize: 8, // 聚合点最小半径
          maxSize: 31, // 聚合点最大半径
          globalAlpha: 0.8, // 透明度
          clusterRadius: 250, // 聚合像素半径
          methods: {
            click: function() {}
          },
          maxZoom: 19, // 最大显示级别
          label: {
            // 聚合文本样式
            show: true, // 是否显示
            fillStyle: "white"
            // shadowColor: 'yellow',
            // font: '20px Arial',
            // shadowBlur: 10,
          },
          gradient: {
            0: "blue",
            0.5: "yellow",
            1.0: "rgb(255,0,0)"
          }, // 聚合图标渐变色
          draw: "cluster"
        };

        mapv.OpenlayersLayer(tmap.omap, dataSet, options);
      });
    },
    changeLayer() {
      //
      let map = tmap.omap;
      map.getView().on("change:resolution", () => {
        // tmap.addLayer("clxxxq").loadData();
        var zoom = map.getView().getZoom(); //获取当前地图的缩放级别
        if (zoom == 6 || zoom == 7 || zoom == 8) {
          this.getLonAndLatInfo("city");
        } else if (zoom == 10 || zoom == 9) {
          this.getLonAndLatInfo("chengdu");
        } else if (zoom == 11 || zoom == 12) {
          tmap.addLayer("banxianindex").loadData();
        } else {
          // tmap.removeLayer();
        }
      });
    },
    getQxtOption() {
      tmap.setMapZoomLevel(8);
    },
    // 获取地图上面 各市县 经纬度 客运量和班次数量
    getLonAndLatInfo(type) {
      // return new Promise(function(resolve) {
      const types = {
        province: 5,
        city: 8,
        chengdu: 10
      };
      const csize = {
        province: 40,
        city: 200,
        chengdu: 90
      };
      this.point2point(
        [104.06349699335493, 30.66057447598776],
        2000,
        tmap.getMapZoomLevel(),
        types[type]
      );
      // tmap.setMapZoomLevel(types[type]);
      tmap.removeLayer();
      this.removePoPHtml();
      this.$http
        .$get("/kyjc_indexHandler/getLonAndLatInfo", { type: type })
        .then(res => {
          const pointData = [];
          let sum = res.reduce((total, val) => {
            return total + parseInt(val.value);
          }, 0);
          for (const [index, item] of res.entries()) {
            pointData.push({
              name: item.toName + "(Top" + (index + 1) + ")",
              value: item.coords[1].concat(
                item.value,
                (item.value * csize[type]) / sum,
                item.shifts
              )
            });
          }
          let option = this.$utils.echart.getMigrationOption(
            {
              seriesData: {
                pointData: pointData,
                linesData: [res]
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
                        "{c|客流量} {b|{@[2]}}",
                        "{c|班次数} {b|{@[4]}}"
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
                formatter: function(params) {
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

          if (type == "市") {
            tmap.addChart("cityLayer", option).$chart.on("click", params => {
              if (params.seriesType == "effectScatter") {
                this.addKyzInfo([params.data.value[0], params.data.value[1]]);
              }
            });
          } else {
            tmap.addChart("provinceLayer", option);
          }
          // resolve(option);
        });
      // });
    },
    getPassengerLine() {
      this.$http.$get("/kyjc_indexHandler/getPassengerLine").then(res => {
        this.kyxlt = "客运线路(" + res.total + ")条";
        this.slsw = res.inProvinceOutCity;
        this.sw = res.outsideProvince;
        this.sl = res.insideCity;
        let option = this.$utils.echart.getPieOption({
          // legendData:legendData,
          seriesData: [
            [
              {
                name: "省际",
                value: res.outsideProvince
              },
              {
                name: "市内",
                value: res.insideCity
              },
              {
                name: "市际",
                value: res.inProvinceOutCity
              }
            ]
          ]
        });
        this.option = option;
        this.loading = false;
      });
    },
    getRealTimeOperation() {
      this.$http.$get("/kyjc_indexHandler/getRealTimeOperation").then(data => {
        this.dispatchNum = data.dispatchNum; // 已发班次
        this.ticketNum = data.ticketNum; //  已售票数
        this.flowTotal = data.flowTotal; // 已发旅客
      });
    },
    getEnterpriseAndEmployee() {
      this.$http
        .$get("/kyjc_indexHandler/getEnterpriseAndEmployee")
        .then(data => {
          this.enterprise = data.enterprise; // 经营业户数量
          this.employee = data.employee; //  从业人员数量
        });
    },
    getStationNumByGrade() {
      this.$http.$get("/kyjc_indexHandler/getStationNumByGrade").then(data => {
        this.total = data.total; // 客运站总数量
        this.one = data.one; //  一级客运站总数量
        this.two = data.two; //  二级客运站总数量
        this.three = data.three; //  三级客运站总数量
      });
    },
    kyzxq() {
      console.log(this.$router);

      this.$router.push({
        name: "lineRoadBusStation"
      });
    },
    kyxlxq() {
      this.$router.push({
        name: "lineRoadPhysicalLine"
      });
    },
    jyyh() {
      this.$router.push({
        name: "lineRoadBusinessOwner"
      });
    },
    cyry() {
      this.$router.push({
        name: "lineRoadpractitioners"
      });
    },
    kyclxq() {
      this.$router.push({
        name: "lineRoadOperationVehicle"
      });
    },
    ssyyxq() {
      this.$router.push({
        name: "lineRoadrealTimeMonitor"
      });
    },
    rmxlxq() {
      this.$router.push({
        name: "lineRoadPhysicalLine"
      });
    },
    zdkylxq() {
      this.$router.push({
        name: "lineRoadOperationAnalysis"
      });
    },
    activeLayer(content) {
      let text = content.text,
        isActive = content.isActive;
      tmap.removeLayer();
      this.removePoPHtml();
      switch (text) {
        case "省级车辆":
          if (isActive) {
            this.getLonAndLatInfo("chengdu");
            mapProxy.setMapZoomLevel(7);
            this.point2point(
              [104.06752291866177, 30.658497277962656],
              1000,
              null,
              7
            );
          } else {
            tmap.removeLayer();
            this.removePoPHtml();
          }
          break;
        case "市内车辆":
          if (isActive) {
            this.getLonAndLatInfo("city");
            this.point2point(
              [104.06752291866177, 30.658497277962656],
              1000,
              null,
              9
            );
          } else {
            tmap.removeLayer();
            this.removePoPHtml();
          }
          break;
        case "客运站":
          if (isActive) {
            tmap.addLayer("banxianindex").loadData();
            this.point2point(
              [104.06752291866177, 30.658497277962656],
              1000,
              null,
              11
            );
          } else {
            tmap.removeLayer("banxianindex");
            this.removePoPHtml();
          }
          break;
      }
    }
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
  data() {
    return {
      baseInfo: {},
      mapLegend: {
        list: [
          {
            color: "rgba(32, 86, 221, 1)",
            name: "客运量" // 圖例名字
          },
          {
            color: "rgba(255, 255, 0, 1)",
            name: "售票数"
          }
        ]
      },
      MapLegendDistance: this.$utils.setSize(410) + "px",
      isShowKyzInfo: true,
      mapToolList: ["省级车辆", "市内车辆", "客运站"],
      dispatchNum: 0,
      ticketNum: 0,
      flowTotal: 0,
      enterprise: 0,
      employee: 0,
      total: "--",
      one: "--",
      two: "--",
      three: "--",
      slsw: 0,
      sw: 0,
      sl: "--",
      ca: "--",
      nca: "--",
      option: {},
      kyxlt: 0,
      loading: true
    };
  }
};
</script>

<style lang="scss" scoped>
.maptool-wrapper {
  position: absolute;
  right: 390px;
  z-index: 100;
  top: 40px;
}
.pop-wrap {
  position: absolute;
  // right: 390px;
  z-index: 100;
  // top: 40px;
}
.testmap {
  width: 100%;
  height: 100%;
}
.kyzsl,
.jyyh,
.realTime {
  width: 100%;
  table {
    width: 100%;
    height: 66px;
    tr {
      th {
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
        font-weight: normal;
        vertical-align: middle;
        cursor: pointer;
      }
      td {
        text-align: center;
        font-size: 36px;
        color: #00ffff;
        letter-spacing: 2px;
        vertical-align: bottom;
        font-family: "datafont";
        animation: turn 8s ease-in-out infinite;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
.kyxl {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
</style>