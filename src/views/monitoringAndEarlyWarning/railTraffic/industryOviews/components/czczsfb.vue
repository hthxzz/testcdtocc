<template>
  <div class="bcyslk-wrap">
    <!-- 骑行距离分布 -->
    <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getRealTimeDistance();
  },
  methods: {
    getRealTimeDistance() {
      this.$http
        .$get("/gdjc_runMonitorHandler/getRideStationDistributed")
        .then(data => {
          let xAxisData = [],
            ydata = [];
          for (const item of data) {
            xAxisData.push(item.passengerFlow);
            ydata.push(item.rideStationNum + " 站");
          }
          xAxisData.reverse();
          ydata.reverse();
          let option = this.$utils.echart.getBarOption(
            {
              // legendData:legendData,
              seriesData: [xAxisData]
            },
            {
              tooltip: {
                show: false
              },
              grid: {
                left: 60
              },
              xAxis: [{ type: "value", show: false }],
              yAxis: [
                {
                  type: "category",
                  data: ydata
                }
              ],
              series: [
                {
                  // 内
                  type: "bar",
                  barWidth: 10,
                  legendHoverLink: false,
                  silent: true,
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        var color;
                        if (params.dataIndex == 19) {
                          color = {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                              {
                                offset: 0,
                                color: "#0ff" // 0% 处的颜色
                              },
                              {
                                offset: 1,
                                color: "#2056DD" // 100% 处的颜色
                              }
                            ]
                          };
                        } else if (params.dataIndex == 18) {
                          color = {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                              {
                                offset: 0,
                                color: "#0ff" // 0% 处的颜色
                              },
                              {
                                offset: 1,
                                color: "#2056DD" // 100% 处的颜色
                              }
                            ]
                          };
                        } else if (params.dataIndex == 17) {
                          color = {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                              {
                                offset: 0,
                                color: "#0ff" // 0% 处的颜色
                              },
                              {
                                offset: 1,
                                color: "#2056DD" // 100% 处的颜色
                              }
                            ]
                          };
                        } else {
                          color = {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                              {
                                offset: 0,
                                color: "#0ff" // 0% 处的颜色
                              },
                              {
                                offset: 1,
                                color: "#2056DD" // 100% 处的颜色
                              }
                            ]
                          };
                        }
                        return color;
                      },
                      barBorderRadius: [0, 0, 0, 0]
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      formatter(res) {
                        return res.value < 10000
                          ? res.value
                          : (res.value / 10000).toFixed(2) + "万";
                      },
                      // formatter: '{b}: {@score}',
                      textStyle: {
                        color: "rgba(255,255,255,0.6)"
                      },
                      position: "right"
                    }
                  }
                },
                {
                  // 分隔
                  type: "pictorialBar",
                  itemStyle: {
                    normal: {
                      color: "#061348"
                    }
                  },
                  symbolRepeat: "fixed",
                  symbolMargin: 6,
                  symbol: "rect",
                  symbolClip: true,
                  symbolSize: [1, 21],
                  symbolPosition: "start",
                  symbolOffset: [1, -1],
                  symbolBoundingData: this.total,
                  data: xAxisData,
                  z: 2,
                  animationEasing: "elasticOut"
                }
              ]
            }
          );

          this.option = option;
        });
    }
  },
  data() {
    return {
      option: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.bcyslk-wrap {
  width: 100%;
  height: 450px;
  overflow: hidden;
}
</style>