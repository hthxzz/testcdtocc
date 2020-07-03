<template>
  <div class="xwjc-wrap">
    <!-- 站点监测 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="站点客流TOP10" name="first">
        <ChangeTag :itemList="itemList" @getStatues="getStatues" />
        <listDetail :itemList="listDetailList" />
      </el-tab-pane>
      <el-tab-pane label="换乘站点客流TOP10" name="second">
        <ChangeTag :itemList="itemList" @getStatues="getStatues2" />
        <listDetail :itemList="listDetailList2" />
      </el-tab-pane>
    </el-tabs>
    <section class="pop-wrap">
      <div ref="zdInfo" class="lightSpeedIn zdInfo" v-if="isShowzdInfo">
        <popContainer ref="popht">
          <div class="zdInfo-wrap">
            <v-chart :options="option" :autoresize="true" theme="theme" />
          </div>
        </popContainer>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import listDetail from "./listDetail";
import { migration } from "../../../../../components/common/map/echars/migration";
import mapAnimation from "@/components/common/map/animation/mapAnimation";
export default {
  name: "",
  mixins: [migration, mapAnimation],
  components: {
    listDetail
  },
  mounted() {
    this.getStationPassengerFlowTop(); // 所有站点

    this.init();
  },
  methods: {
    init() {
      // tmap.setMapZoomLevel(14);
    },
    handleClick(tab, event) {
      let activeName = this.activeName;
      tmap.removeChart("stationName");
      if (activeName == "first") {
        tmap.removeChart("hczl");
        tmap.addChart("klzl", this.klzl);
        this.getStationPassengerFlowTop();
      } else if (activeName == "second") {
        this.getStationTransPassengerFlowTop(); // 换乘站点
        tmap.removeChart("klzl");
        // tmap.addChart("hczl", this.hczl);
      }
    },
    getStatues(val) {
      if (val.value == "总量") {
        this.listDetailList = this.totalPassengerFlowTop;
      } else if (val.value == "进站") {
        this.listDetailList = this.inPassengerFlowTop;
      } else if (val.value == "出站") {
        this.listDetailList = this.outPassengerFlowTop;
      }
    },
    getStatues2(val) {
      if (val.value == "总量") {
        this.listDetailList2 = this.totalPassengerFlowTop2;
      } else if (val.value == "进站") {
        this.listDetailList2 = this.inPassengerFlowTop2;
      } else if (val.value == "出站") {
        this.listDetailList2 = this.outPassengerFlowTop2;
      }
    },
    //  站点top10
    getStationPassengerFlowTop() {
      this.$http
        .$get("/gdjc_runMonitorHandler/getStationPassengerFlowTop")
        .then(res => {
          const totalPassengerFlowTop = [],
            inPassengerFlowTop = [],
            outPassengerFlowTop = [],
            pointData = [];

          // 总量
          for (const [index, item] of res.totalPassengerFlowTop &&
            res.totalPassengerFlowTop.entries()) {
            totalPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.totalPassengerFlowTop[0].passengerFlow
            });
            pointData.push({
              name: item.stationName + "(Top" + (parseInt(index) + 1) + ")",
              value: [
                item.longitude,
                item.latitude,
                item.passengerFlow,
                30 - index * 2,
                res.inPassengerFlowTop[index]["passengerFlow"],
                res.outPassengerFlowTop[index]["passengerFlow"]
              ]
            });
          }
          // 进站
          for (const [index, item] of res.inPassengerFlowTop &&
            res.inPassengerFlowTop.entries()) {
            inPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.inPassengerFlowTop[0].passengerFlow
            });
          }
          // 出站
          for (const [index, item] of res.outPassengerFlowTop &&
            res.outPassengerFlowTop.entries()) {
            outPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.outPassengerFlowTop[0].passengerFlow
            });
          }
          //  站点top10
          let klzl = this.$utils.echart.getMigrationOption(
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
                        "{c|总客流} {b|{@[2]}}"
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
          this.klzl = klzl;
          let char = tmap.addChart("klzl", klzl).$chart.on("click", params => {
            this.switchFullscreen(true);
            let name = params.name.split("(")[0];

            this.moveToPoint(
              [
                parseFloat(params.value[0]) + 0.020370486890897155,
                parseFloat(params.value[1]) + 0.01544952392578125
              ],
              1000,
              () => {
                this.getPeriodPassengerVolume(name);
                this.getPopHtml([params.value[0], params.value[1]]);
              }
            );
          });

          this.listDetailList = totalPassengerFlowTop;
          this.totalPassengerFlowTop = totalPassengerFlowTop;
          this.inPassengerFlowTop = inPassengerFlowTop;
          this.outPassengerFlowTop = outPassengerFlowTop;
        });
    },
    ...mapMutations({
      switchFullscreen: "app/switchFullscreen" //
    }),
    getPopHtml(point) {
      let hide = this.$refs.popht.hide;
      if (!hide) {
        this.$refs.popht.hide = true;
      }
      let zdInfo = this.$refs.zdInfo;

      let omap = tmap.omap;
      this.addPoPHtml(point, zdInfo);
    },
    // 换乘
    getStationTransPassengerFlowTop() {
      this.$http
        .$get("/gdjc_runMonitorHandler/getStationTransPassengerFlowTop")
        .then(res => {
          const totalPassengerFlowTop = [],
            inPassengerFlowTop = [],
            outPassengerFlowTop = [],
            pointData = [];

          // 总量
          for (const [index, item] of res.totalPassengerFlowTop &&
            res.totalPassengerFlowTop.entries()) {
            totalPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.totalPassengerFlowTop[0].passengerFlow
            });
            pointData.push({
              name: item.stationName,
              value: [
                item.longitude,
                item.latitude,
                item.passengerFlow,
                36 - index * 2
              ]
            });
          }
          let hczl = this.$utils.echart.getMigrationOption(
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
                        "{c|总客流} {b|{@[2]}}"
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
          console.log(hczl);

          this.hczl = hczl;
          let char = tmap.addChart("hczl", hczl).$chart.on("click", params => {
            this.switchFullscreen(true);
            let name = params.name.split("(")[0];

            this.moveToPoint(
              [
                parseFloat(params.value[0]) + 0.020370486890897155,
                parseFloat(params.value[1]) + 0.01544952392578125
              ],
              1000,
              () => {
                this.getPeriodPassengerVolume(name);
                this.getPopHtml([params.value[0], params.value[1]]);
              }
            );
          });
          // 进站
          for (const [index, item] of res.inPassengerFlowTop &&
            res.inPassengerFlowTop.entries()) {
            inPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.inPassengerFlowTop[0].passengerFlow
            });
          }
          // 出站
          for (const [index, item] of res.outPassengerFlowTop &&
            res.outPassengerFlowTop.entries()) {
            outPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.outPassengerFlowTop[0].passengerFlow
            });
          }
          this.listDetailList2 = totalPassengerFlowTop;
          this.totalPassengerFlowTop2 = totalPassengerFlowTop;
          this.inPassengerFlowTop2 = inPassengerFlowTop;
          this.outPassengerFlowTop2 = outPassengerFlowTop;
        });
    },
    getPeriodPassengerVolume(name) {
      this.option = {};
      this.$http
        .$get(
          "gdjc_runMonitorHandler/getStationInOutPassengerVolumeHourChange",
          {
            stationName: name
          }
        )
        .then(res => {
          if (res) {
            let xAxisData = [],
              inPassengerVolume = [],
              outPassengerVolume = [],
              seriesData = [];
            for (const item of res.stationPassengerFlowHourChange) {
              xAxisData.push(item.time);
              inPassengerVolume.push(item.inPassengerVolume);
              outPassengerVolume.push(item.outPassengerVolume);
            }
            seriesData.push(inPassengerVolume);
            seriesData.push(outPassengerVolume);

            this.option = this.$utils.echart.getLineOption(
              {
                xAxisData: xAxisData,
                legendData: ["进站", "出站"],
                // legendData: ["进站客流量", "出站客流量"],
                seriesData: seriesData
              },
              {
                title: {
                  text: "{a|" + name + "} 进出站客流量小时变化情况",
                  textStyle: {
                    rich: {
                      a: {
                        color: "#00ffff",
                        fontSize: 16
                      }
                    }
                  },
                  top: "top",
                  left: "left"
                },
                grid: this.grid,
                xAxis: [
                  {
                    type: "category",
                    axisLabel: {
                      // interval: 3,
                      color: "#fff"
                    }
                  }
                ]
              }
            );
          }
        });
    }
  },
  data() {
    return {
      isShowzdInfo: true,
      option: {},
      listDetailList: [],
      listDetailList2: [],
      activeName: "first",
      itemList: [
        { code: "总量", value: "总量" },
        { code: "进站", value: "进站" },
        { code: "出站", value: "出站" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.xwjc-wrap {
  width: 100%;
  overflow: hidden;
  display: flex;
  .char-wrap {
    flex: 2;
  }
  .legend-wrap {
    flex: 1;
    text-align: right;
  }
}
.lineIndex {
  width: 20px;
  height: 20px;
  vertical-align: sub;
  display: inline-block;
}
.lineName {
  margin-left: 10px;
  text-align: center;
}
table {
  tr {
    td {
      line-height: 30px;
    }
  }
}
.pop-wrap {
  position: relative;
  left: 20px;
}
.zdInfo-wrap {
  width: 500px;
  height: 310px;
}
.zdInfo {
  transition: all 1.6s;
  animation-duration: 0.6s;
}
</style>