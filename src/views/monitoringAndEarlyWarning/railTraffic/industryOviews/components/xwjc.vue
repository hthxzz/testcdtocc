<template>
  <div class="xwjc-wrap">
    <!-- 线网监测 -->
    <div class="char-wrap">
      <v-chart :options="option" :autoresize="true" theme="theme" ref="test"></v-chart>
    </div>

    <div class="legend-wrap">
      <table>
        <tr
          v-for="(item,index) in legendList"
          :key="item.name"
          @click="getStationInOutPassengerVolumeByLineCode(item.code)"
        >
          <td>
            <span class="lineIndex" :style="{backgroundColor:item.color}">{{item.order}}</span>
          </td>
          <!-- <td class="lineName" width="40%">{{item.name}}</td> -->
          <td>
            <a href="javascript:void(0)" class="hvr-underline-from-center">
              <count-to :startVal="0" :endVal="item.value" :duration="4000" />
            </a>
          </td>
          <!-- <td class="unit">
            人次
          </td>-->
        </tr>
      </table>
    </div>
    <div class="aa">
      <section class="pop-wrap">
        <div ref="xwInfo" class="lightSpeedIn xwInfo" v-if="isShowzdInfo">
          <popContainer ref="popht">
            <div class="xwInfo-wrap">
              <v-chart :options="optiona" :autoresize="true" theme="theme" />
            </div>
          </popContainer>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import mapAnimation from "@/components/common/map/animation/mapAnimation";
import { mapMutations } from "vuex";
export default {
  name: "",
  mixins: [mapAnimation],
  mounted() {
    this.getPassengerVolumeProp();
  },
  methods: {
    getStationInOutPassengerVolumeByLineCode(val) {
      this.$emit("setSklx", val);
      tmap.removeChart("hczl");
      tmap.removeChart("klzl");
      this.globleSearch(val);
      this.$http
        .$get(
          "/gdjc_runMonitorHandler/getStationInOutPassengerVolumeByLineCode",
          {
            lineCode: val
          }
        )
        .then(res => {
          const pointData = [];
          let sum = res.reduce((total, val) => {
            return total + parseInt(val.inPassengerNum);
          }, 0);

          for (const item of res) {
            pointData.push({
              name: item.stationName,
              value: [
                item.longitude,
                item.latitude,

                item.inPassengerNum,

                (item.inPassengerNum * 500) / sum,
                item.outPassengerNum
              ]
            });
          }
          console.log(pointData);

          let option = this.$utils.echart.getMigrationOption(
            {
              seriesData: {
                pointData: pointData
              }
            },
            {
              series: [
                {
                  label: {
                    normal: {
                      show: true,
                      position: "right",
                      formatter: [
                        "{a|{b}}",
                        "{b|进站} {c|{@[2]}},",
                        "{b|出站} {c|{@[4]}}"
                      ].join("\n"),
                      rich: {
                        a: {
                          color: "rgba(0,255,255,1)",
                          fontFamily: "幼圆",
                          fontSize: this.$utils.setSize(16),
                          fontWeight: 400
                        },
                        b: {
                          // height: 40
                          padding: [3, 0],
                          color: "rgba(0,255,255,.6)",
                          fontSize: this.$utils.setSize(14),
                          fontFamily: "幼圆"
                        },
                        c: {
                          // height: 40
                          padding: [3, 0],
                          color: "rgba(0,255,255,1)",
                          fontFamily: "幼圆",
                          fontSize: this.$utils.setSize(16)
                        },
                        x: {
                          fontSize: 18,
                          fontFamily: "幼圆",
                          borderColor: "#449933",
                          borderRadius: 4
                        }
                      }
                    }
                  }
                }
              ]
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
          console.log(option);

          // let stationName = tmap.addChart("stationName", option);
          let stationName = tmap
            .addChart("stationName", option)
            .$chart.on("click", params => {
              // debugger;
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
          // this.activeRightPanel(stationName.$chart);
        });
    },
    ...mapMutations({
      switchFullscreen: "app/switchFullscreen" //
    }),
    getPeriodPassengerVolume(name) {
      this.optiona = {};
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

            this.optiona = this.$utils.echart.getLineOption(
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
    },
    activeLengend() {
      let count = this.count;
      let i = 0;
      this.xwjcAuto = setInterval(() => {
        if (i == count) {
          i = 0;
        }
        this.$refs.test.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: i
        });
        if (i == 0) {
          this.$refs.test.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: count - 1
          });
        } else {
          this.$refs.test.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: i - 1
          });
        }
        i++;
      }, 3000);
    },
    getLineNO(lineName, NO) {
      switch (lineName) {
        case "1号线":
          this.legendList[0].value = NO;
          this.colors.push(this.legendList[0].color);
          break;

        case "2号线":
          this.legendList[1].value = NO;
          this.colors.push(this.legendList[1].color);
          break;

        case "3号线":
          this.legendList[2].value = NO;
          this.colors.push(this.legendList[2].color);
          break;

        case "4号线":
          this.legendList[3].value = NO;
          this.colors.push(this.legendList[3].color);
          break;

        case "5号线":
          this.legendList[4].value = NO;
          this.colors.push(this.legendList[4].color);
          break;

        case "7号线":
          this.legendList[5].value = NO;
          this.colors.push(this.legendList[5].color);
          break;

        case "10号线":
          this.legendList[6].value = NO;
          this.colors.push(this.legendList[6].color);
          break;

        default:
          break;
      }
    },
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
      this.switchView(points[val]);
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
    getPopHtml(point) {
      let hide = this.$refs.popht.hide;
      if (!hide) {
        this.$refs.popht.hide = true;
      }
      let xwInfo = this.$refs.xwInfo;

      let omap = tmap.omap;
      this.addPoPHtml(point, xwInfo);
    },
    getPassengerVolumeProp() {
      this.$http
        .$get("/gdjc_runMonitorHandler/getPassengerVolumeProp")
        .then(res => {
          const seriesData = [];
          let count = 0;
          for (const item of res) {
            seriesData.push({
              name: item.lineName, // 线路
              value: item.passengerVolume // 客流量
            });
            count++;
            this.getLineNO(item.lineName, item.passengerVolume);
          }
          this.count = count;
          let color = this.colors;
          let option = this.$utils.echart.getPieOption(
            {
              // legendData:legendData,
              seriesData: [seriesData]
            },
            {
              color: color,
              xAxis: [
                {
                  axisLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    label: {
                      formatter: "{b} \n{d}%",
                      show: true,
                      color: "#fff",
                      fontSize: "14",
                      fontWeight: "100 "
                    }
                  }
                }
              ]
            }
          );
          this.option = option;
          this.activeLengend();
        });
    }
  },
  destroyed() {
    if (this.xwjcAuto) {
      clearInterval(this.xwjcAuto);
    }
  },
  data() {
    return {
      isShowzdInfo: true,
      option: {},
      optiona: {},
      total: 0,
      colors: [],
      legendList: [
        {
          order: 1,
          code: "01",
          name: "1号线",
          color: "rgba(26, 117, 209,1)",
          value: 0
        },
        {
          order: 2,
          code: "02",
          name: "2号线",
          color: "rgb(238, 121, 26)",
          value: 0
        },
        {
          order: 3,
          name: "3号线",
          code: "03",
          color: "rgb(238, 75, 129)",
          value: 0
        },
        {
          order: 4,
          name: "4号线",
          code: "04",
          color: "rgb(68, 209, 53)",
          value: 0
        },
        {
          order: 5,
          name: "5号线",
          code: "05",
          color: "rgb(190, 81, 169)",
          value: 0
        },
        {
          order: 7,
          code: "07",
          name: "7号线",
          color: "rgb(118, 214, 222)",
          value: 0
        },
        {
          order: 10,
          code: "10",
          name: "10号线",
          color: "rgb(108, 105, 236)",
          value: 0
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.xwjc-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  .char-wrap {
    flex: 2;
  }
  .legend-wrap {
    text-align: left;
    flex: 1;
  }
}
.lineIndex {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  // vertical-align: sub;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  margin-right: 10px;
}
.lineName {
  margin-left: 10px;
  text-align: center;
}
table {
  tr {
    td {
      line-height: 40px;
      span {
        color: rgba(255, 255, 255, 0.6);
      }
      cursor: pointer;
    }
    td.unit {
      font-size: 14px;
    }
  }
}
.pop-wrap {
  // position: absolute;
  // float: left;
  // position: absolute;
  // left: 200px;
  top: 10px;
}
.aa {
  position: absolute;
  left: 400px;
  z-index: -1;
}
.xwInfo-wrap {
  width: 500px;
  height: 310px;
}
.xwInfo {
  transition: all 1.6s;
  animation-duration: 0.6s;
}
</style>