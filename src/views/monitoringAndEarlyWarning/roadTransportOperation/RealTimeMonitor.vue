<template>
  <!-- 公交运行监测 -- 实时 监测 -->
  <div class="comprehensiveMonitor-wrapper">
    <!-- 地图工具栏 -->
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <!-- 左边搜索条件 -->
          <PanelItem title :displaySwitch="false">
            <!-- <section class="search-wrapper"> -->
            <SearchPanel
              :searchConfig="searchConfig"
              @getSearchValue="getSearchValue"
              @handleQuery="handleQuery"
            ></SearchPanel>
            <!-- </section> -->
          </PanelItem>
          <div class="zbdl">
            <PanelItem title="客流量情况" :displaySwitch="false">
              <kllyc />
            </PanelItem>
          </div>
          <div class="yxqk-container">
            <PanelItem title="今日运行情况" :displaySwitch="false">
              <div class="yxqk-wrapper">
                <div class="item-wrapper">
                  <div class="item" @click="qk1">
                    <h2>区域客流异常</h2>
                    <p>
                      {{abnormalAreaCount}}
                      <span>处</span>
                    </p>
                  </div>
                  <div class="item" @click="qk2">
                    <h2>脱线行驶车辆</h2>
                    <p>
                      {{offlineVehicleCount}}
                      <span>辆</span>
                    </p>
                  </div>
                </div>
                <div class="item-wrapper bj">
                  <div class="item" @click="qk3">
                    <h2>延班线路车辆</h2>
                    <p>
                      {{delayLineCount}}
                      <span>辆</span>
                    </p>
                  </div>
                  <div class="item" @click="qk4">
                    <h2>脱班车辆</h2>
                    <p>
                      {{offdutyVehicleCount}}
                      <span>辆</span>
                    </p>
                  </div>
                </div>
                <div class="item-wrapper">
                  <div class="item" @click="qk5">
                    <h2>路网异常</h2>
                    <p>
                      {{abnormalRoadCount}}
                      <span>处</span>
                    </p>
                  </div>
                  <div class="item" @click="qk6">
                    <h2>运能异常线路</h2>
                    <p>
                      {{abncapacityLineCount}}
                      <span>条</span>
                    </p>
                  </div>
                </div>
              </div>
              <!-- 详情 -->
              <div class="detail-wrapper">
                <div class="detail">
                  <qyklyc v-if="p1" />
                  <tlxlcl v-if="p2" />
                  <ybxl v-if="p3" />
                  <tbcl v-if="p4" />
                  <lwyc v-if="p5" />
                  <ynycxl v-if="p6" />
                </div>
              </div>
            </PanelItem>
          </div>
        </panel>
      </template>
      <template #midContent>
        <section class="maptool-wrapper">
          <MapTool :mapToolList="mapToolList" @activeLayer="activeLayer" />
        </section>
        <Basemap></Basemap>
        <!-- 地图上面大数字展示 -->
        <div class="top">
          <div class="traffic-wrapper">
            <div class="item-wrapper">
              <mapDataCenterData :itemList="itemList"></mapDataCenterData>
            </div>
          </div>
        </div>
      </template>
    </BaseLayoutContent>

    <!-- 地图工具搜索详情 -->
    <section class="tool-detail">
      <kyzmbxq />
    </section>
    <div class="panel-wrapper left"></div>
  </div>
</template>

<script>
import qyklyc from "./components/RealTimeMonitor/qyklyc.vue";
import tlxlcl from "./components/RealTimeMonitor/tlxlcl.vue";
import ybxl from "./components/RealTimeMonitor/ybxl.vue";
import tbcl from "./components/RealTimeMonitor/tbcl.vue";
import lwyc from "./components/RealTimeMonitor/lwyc.vue";
import ynycxl from "./components/RealTimeMonitor/ynycxl.vue";
import kllyc from "./components/RealTimeMonitor/kllyc.vue";
import kyzmbxq from "./components/RealTimeMonitor/kyzmbxq.vue";
export default {
  name: "",
  mounted() {
    tmap.addLayer("luk");
    this.getAbnormalInfo();
    this.getTodayCharteredCarInfo();
    this.getStartStations();
    // map.addLayer("luk");
    tmap.addLayer("clxxxq").loadData();
  },
  components: {
    qyklyc,
    tlxlcl,
    ybxl,
    tbcl,
    lwyc,
    ynycxl,
    kyzmbxq,
    kllyc
  },
  methods: {
    activeLayer(content) {
      let text = content.text,
        isActive = content.isActive;
      debugger;
      switch (text) {
        case "实时路况":
          if (isActive) {
            tmap.addLayer("luk");
          } else {
            tmap.removeLayer("luk");
          }
          break;

        case "收费站":
          if (isActive) {
            // mapProxy.removeLayer("luk");
            this.preAddEchar();
          } else {
            this.addSfz();
          }
          break;
        case "路网视频":
          if (isActive) {
            mapProxy.removeLayer("LWJC_MONITOR_PLACE");
            // this.preAddEchar();
          } else {
            this.addLwsp();
          }
          break;
        case "客运站":
          if (isActive) {
            this.addKyz();
          } else {
            tmap.removeLayer("PASSENGER_STATION");
          }
          break;
        case "营运车辆":
          if (isActive) {
            mapProxy.removeLayer();
            mapProxy.removeLayer("LWJC_LKYWCAR");
          } else {
          }
          break;
        case "放射线路":
          if (isActive) {
            mapProxy.clearLines();
          } else {
            this.addFsx();
          }
          break;

        default:
          break;
      }
    },
    temp_bike_gps_OnMoveEnd() {
      //共享单车
      if (!mapProxy.getLayer("LWJC_BICYCLE")) return;
      //获取地图范围及层级
      var extent = mapProxy.getMapExtent();
      var str_extent = JSON.stringify(extent);
      var level = mapProxy.getMapZoomLevel();
      //移除之前计算的聚合结果，重新计算
      mapProxy.removeLayer("LWJC_BICYCLE");
      //加载图层
      var m_url =
        "api/tocc/lkfx_gpsDeviceOnlineHandler/getBicycleSeggregations?level=" +
        level +
        "&extent=" +
        extent;
      mapProxy.addLayer("LWJC_BICYCLE", "", "", m_url, "districtId=1");
    },
    temp_gps_OnMoveEnd() {
      //营运车辆
      if (!mapProxy.getLayer("LWJC_LKYWCAR")) return;
      //获取地图范围及层级
      var extent = mapProxy.getMapExtent();
      var str_extent = JSON.stringify(extent);
      var level = mapProxy.getMapZoomLevel();
      //移除之前计算的聚合结果，重新计算
      mapProxy.removeLayer("LWJC_LKYWCAR");
      mapProxy.removeLayer("luk"); //
      mapProxy.removeLayer("");
      mapProxy.clearLines();
      var m_url =
        "api/tocc/lkfx_gpsDeviceOnlineHandler/getLkywSeggregations?level=" +
        level +
        "&extent=" +
        extent;
      mapProxy.addLayer("LWJC_LKYWCAR", "", "", m_url, "districtId=1");
    },
    getBaseInfoHtml(type, data, feaCoordinate, titleText, width, height) {
      var content = "";
      if (type.indexOf("PASSENGER_STATION") !== -1) {
        sessionStorage.setItem("stationId", data.station_id);
        content = [
          {
            name: "摄像机信息",
            height: 450,
            width: 900,
            url: "/#/videoList?station=" + data.station_id
            // url: "/#/test"
          }
        ];
      } else if (type.indexOf("LWJC_MONITOR_PLACE") !== -1) {
        content = [
          {
            name: "摄像机信息",
            height: 450,
            width: 900,
            url: "/#/playVideo?cameraCode=" + data.DEVICE_CODE
            // url: "/#/test"
          }
        ];
      } else {
        content = null;
        console.warn("图层：" + type + "没有配置弹窗展示内容！");
      }
      return content;
    },

    // 路段通行量TOP10
    addYycl() {
      //营运车辆
      debugger;
      var extent = mapProxy.getMapExtent();
      var str_extent = JSON.stringify(extent);
      var level = mapProxy.getMapZoomLevel();
      //移除之前计算的聚合结果，重新计算
      mapProxy.removeLayer("LWJC_LKYWCAR");
      mapProxy.removeLayer("luk"); //
      mapProxy.removeLayer("");
      mapProxy.clearLines();
      var m_url =
        "api/tocc/lkfx_gpsDeviceOnlineHandler/getLkywSeggregations?level=" +
        level +
        "&extent=" +
        extent;
      mapProxy.addLayer("LWJC_LKYWCAR", "", "", m_url, "districtId=1");

      tmap.onMoveEnd(this.temp_gps_OnMoveEnd); //绑定缩放事件
      // this.temp_gps_OnMoveEnd();
      // this.temp_gps_OnMoveEnd();
    },
    addKyz() {
      //客运站
      mapProxy.addLayer("PASSENGER_STATION").loadData(); //加载客运站图层；
      mapProxy.setMapZoomLevel(12);
      mapProxy.centerAt(104.072421, 30.663317);

      var name = [
        "十陵车站",
        "石羊车站",
        "北门车站",
        "商贸城车站",
        "昭觉车站",
        "五桂桥车站",
        "新南门车站",
        "茶店子车站",
        "成北客运中心",
        "成都东站汽车客运站",
        "机场车站"
      ];
      const array = [
        [104.164578, 30.665525],
        [104.032012, 30.585239],
        [104.085504, 30.682858],
        [104.081945, 30.795386],
        [104.104552, 30.704947],
        [104.128268, 30.63551],
        [104.073919, 30.644838],
        [104.013773, 30.705633],
        [104.066913, 30.695277],
        [104.142514, 30.624819],
        [103.957189, 30.574247]
      ];
    },
    addFsx() {
      //放射线
      var colorArr = ["#008000", "#99cc00", "#ffff00", "#ff9900", "#ff0000"];
      var a = this.fsx;
      // this.preAddEchar();
      // mapProxy.removeLayer();
      // mapProxy.removeLayer("luk");
      if (a != null && a.length > 0) {
        a.forEach(ele => {
          var b = ele.roadSections;
          if (b != null && b.length > 0) {
            b.forEach(e => {
              mapProxy.addLine(
                e.linkId,
                e.coordinates,
                5,
                colorArr[e.color - 1]
              );
            });
          }
        });
      }
    },
    addLwsp() {
      //路网视频
      mapProxy.addLayer("LWJC_MONITOR_PLACE").loadData(); //加载摄像头图层；
      mapProxy.setMapZoomLevel(12);
      mapProxy.centerAt(104.072421, 30.663317);
    },
    getSearchValue() {},
    handleQuery() {},
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
    getAbnormalInfo() {
      this.$http
        .$get("kyjc_stationTransportState/getAbnormalInfo")
        .then(res => {
          if (res) {
            this.abnormalAreaCount = res.abnormalAreaCount; //客流异常区域数量,单位个
            this.offlineVehicleCount = res.offlineVehicleCount; //脱线车辆数，单位辆
            this.delayLineCount = res.delayLineCount; //延班路线车辆数，单位辆
            this.offdutyVehicleCount = res.offdutyVehicleCount; //脱班车辆数，单位辆
            this.abnormalRoadCount = res.abnormalRoadCount; //路网异常，单位处
            this.abncapacityLineCount = res.abncapacityLineCount; //运能异常线路，单位条
          }
        });
    },
    getTodayCharteredCarInfo() {
      this.$http
        .$get("kyjc_stationTransportState/getPassengerFlowInfo")
        .then(res => {
          if (res) {
            this.itemList[0]["number"] = res.dispatchNum
              ? res.dispatchNum
              : "--"; // 发班班次
            this.itemList[0]["rate"] = res.dispatchNumRatio
              ? res.dispatchNumRatio
              : "--"; // 发班班次

            this.itemList[1]["number"] = res.vehicleNum ? res.vehicleNum : "--"; // 营运车辆
            this.itemList[1]["rate"] = res.vehicleNumRatio
              ? res.vehicleNumRatio
              : "--"; // 营运车辆较上周期比率

            this.itemList[2]["number"] = res.flowTotal ? res.flowTotal : "--"; // 运送旅客
            this.itemList[2]["rate"] = res.flowTotalRatio
              ? res.flowTotalRatio
              : "--"; // 运送旅客

            this.itemList[3]["number"] = res.ticketNum ? res.ticketNum : "--"; // 售票数量
            this.itemList[3]["rate"] = res.ticketNumRatio
              ? res.ticketNumRatio
              : "--"; // 售票数量
          }
        });
    },
    qk1() {
      this.p1 = true;
      this.p2 = false;
      this.p3 = false;
      this.p4 = false;
      this.p5 = false;
      this.p6 = false;
    },
    qk2() {
      this.p1 = false;
      this.p2 = true;
      this.p3 = false;
      this.p4 = false;
      this.p5 = false;
      this.p6 = false;
    },
    qk3() {
      this.p1 = false;
      this.p2 = false;
      this.p3 = true;
      this.p4 = false;
      this.p5 = false;
      this.p6 = false;
    },
    qk4() {
      this.p1 = false;
      this.p2 = false;
      this.p3 = false;
      this.p4 = true;
      this.p5 = false;
      this.p6 = false;
    },
    qk5() {
      this.p1 = false;
      this.p2 = false;
      this.p3 = false;
      this.p4 = false;
      this.p5 = true;
      this.p6 = false;
    },
    qk6() {
      this.p1 = false;
      this.p2 = false;
      this.p3 = false;
      this.p4 = false;
      this.p5 = false;
      this.p6 = true;
    }
  },
  data() {
    return {
      mapToolList: ["实时路况", "客运站", "客运车辆", "客运线路", "收费站"],
      searchConfig: {
        searchCondition: [
          {
            order: 3,
            width: "3.6rem" /* 410/100 */,
            type: "select",
            label: "",
            filterable: true,
            placeholder: "客运站名称",
            VModelvalue: {
              name: "enterprName",
              defaultValue: ""
            },
            options: [
              // {
              //   value: "1",
              //   label: "全部"
              // }
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
      searchConfig1: {
        searchCondition: [
          {
            order: 3,
            width: "130px",
            type: "input",
            label: "",
            filterable: true,
            placeholder: "客运站名称",
            VModelvalue: {
              name: "enterpr1Name",
              defaultValue: ""
            }
          },
          {
            order: 13,
            width: "130px",
            type: "checkbox",
            label: "",
            checkboxList: [
              {
                value: "实时路况",
                label: "实时路况"
              }
            ],
            VModelvalue: {
              name: "enterpaar1Name",
              defaultValue: ""
            }
          },
          {
            order: 3,
            width: "130px",
            type: "input",
            label: "",
            filterable: true,
            placeholder: "客运站名称",
            VModelvalue: {
              name: "enterpr1Name",
              defaultValue: ""
            }
          },
          {
            order: 3,
            width: "130px",
            type: "radio",
            label: "",
            radioList: [
              {
                value: "客运站",
                label: "客运站"
              },
              {
                value: "客运车辆",
                label: "客运车辆"
              },
              {
                value: "客运线路",
                label: "客运线路"
              },
              {
                value: "收费站",
                label: "收费站"
              }
            ],
            VModelvalue: {
              name: "enterprName",
              defaultValue: ""
            }
          }
        ]
        //   searchButtonGroup: [
        //     {
        //       action: "query",
        //       label: "查询"
        //     }
        //   ]
      },
      abnormalAreaCount: "--",
      offlineVehicleCount: "--",
      delayLineCount: "--",
      offdutyVehicleCount: "--",
      abnormalRoadCount: "--",
      abncapacityLineCount: "--",
      p1: true,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
      itemList: [
        {
          id: "1",
          sub: "发班班次",
          number: "--",
          unite: "次",
          rateUnite: "较昨日",
          rate: "--"
        },
        {
          id: "2",
          sub: "营运车辆",
          number: "--",
          unite: "辆",
          rateUnite: "较昨日",
          rate: "--"
        },
        {
          id: "3",
          sub: "发送旅客",
          number: "--",
          unite: "人次",
          rateUnite: "较昨日",
          rate: "--"
        },
        {
          id: "4",
          sub: "售票数量",
          number: "--",
          unite: "张",
          rateUnite: "较昨日",
          rate: "--"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.comprehensiveMonitor-wrapper {
  .maptool-wrapper {
    position: absolute;
    right: 60px;
    z-index: 100;
    top: 10px;
  }
  height: 100%;
  position: relative;
  .mid-wrapper {
    position: absolute;
    left: 45%;
    top: 1%;
  }
}
.comprehensiveMonitor-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .panel-wrapper {
    height: 100%;
    // padding: 10px 0;
    position: absolute;
    top: 30px;
    width: 410px;
    // border: 1px solid red;
  }
  .left {
    left: 0;
  }
  .top {
    position: absolute;
    top: 10px;
    left: 50%;
    width: 640px;
    height: 90px;
    // border: 0.02rem solid #2056dd;
    border-radius: 16px;
    transform: translateX(-50%);
    justify-content: center;
    .traffic-wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      .bj {
        margin: 20px 0;
      }
      .item-wrapper {
        display: flex;
        justify-content: space-around;
        .item {
          width: 110px;
          height: 70px;
          border: 2px solid rgba(32, 86, 221, 0.4);
          border-radius: 8px;
          background-color: rgba(32, 86, 221, 0.4);
          .section {
            p {
              font-size: 12px;
              color: #ea1c2f;
            }
          }
          @include v-center;
          h2 {
            font-size: 14px;
          }
          p {
            margin-top: 6px;
            font-size: 18px;
            color: #ead72c;
            span {
              font-size: 14px;
            }
          }
        }
      }
      .data-time {
        p {
          color: #00ff00;
        }
      }
    }
  }
  .right {
    right: 0;
    .gj-container {
      height: 250px;
      overflow: auto;
      .gjjcqk {
        ul {
          display: flex;
          flex-direction: column;

          li {
            height: 56px;
            display: flex;
            /*justify-content: center;*/
            align-items: center;
            justify-items: center;
            font-size: 14px;
            background: rgba(32, 86, 221, 0.2);
            margin-top: 4px;
            .word {
              float: left;
              line-height: 20px;
              margin-left: 15px;
              margin-top: 4px;
              span {
                color: #fff;
              }
              p {
                color: rgba(255, 255, 255, 0.4);
              }
            }
            .pic {
              width: 40px;
              height: 40px;
              float: left;
            }
          }
        }
      }
    }
    .cz-container {
      height: 350px;
      .cz-jcxx {
        ul {
          li {
            line-height: 18px;
          }
        }
      }
    }
    .dt-container {
      height: 300px;
    }
    .gl-container {
      height: 300px;
    }
    .comeorout {
      margin-left: 60%;
      /*float:right;*/
    }
    .totalTraffic {
      flex: 1;
      display: flex;
      margin-top: 2px;
      .item {
        margin-left: 10px;
        .section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          h2 {
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.4);
          }
          p {
            color: #ff0000;
            margin-top: 6px;
          }
        }
      }
    }
  }
}
.tq {
  width: 96%;
  padding: 2%;
  line-height: 1.5em;
  background: rgba(255, 0, 0, 0.2);
  h2 {
    text-indent: 26px;
    font-size: 16px;
    color: #ff0000;
  }
}

.yxqk-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .bj {
    margin: 20px 0;
  }
  .item-wrapper {
    display: flex;
    justify-content: space-around;
    .item {
      width: 110px;
      height: 60px;
      border: 2px solid rgba(32, 86, 221, 0.4);
      border-radius: 8px;
      background-color: rgba(32, 86, 221, 0.4);
      @include v-center;
      h2 {
        font-size: 14px;
        font-weight: normal;
      }
      p {
        margin-top: 6px;
        font-size: 18px;
        color: #ead72c;
        span {
          font-size: 14px;
        }
      }
    }
  }
}
.detail-wrapper {
  .detail {
    margin-top: 20px;
  }
  margin-left: 31px;
  h2 {
    padding: 10px 0 0 30px;
    font-size: 16px;
  }
  p {
    padding: 10px 0 0 30px;
    font-size: 14px;
    span {
      color: #ead72c;
      font-size: 16px;
    }
  }
}
.zbdl {
  // height: 230px;
  overflow: hidden;
  margin-top: 16px;
}
.search-wrapper {
  position: absolute;
  width: 400px;
  left: 0;
  top: 0;
}
.tool-detail {
  height: 450px;
  width: 250px;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>