<template>
  <div class="bcyslk-wrap">
    <!-- 站点客运量 -->
    <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getStationFlow();
  },
  methods: {
    getStationFlow() {
      this.$http.$get("/kyjc_indexHandler/getStationFlow").then(data => {
        let xAxisData = [],
          ydata = [];
        for (const item of data) {
          xAxisData.push(item.flowTotal);
          ydata.push(item.station);
        }
        xAxisData.reverse();
        ydata.reverse();
        let option = this.$utils.echart.getBarOption(
          {
            // legendData:legendData,
            seriesData: [xAxisData]
          },
          {
            grid: {
              left: 135,
              top: 0,
              bottom: 1
            },
            xAxis: [
              {
                type: "value",
                show: false,
                axisLabel: {
                  textStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "category",
                data: ydata,
                axisLabel: {
                  textStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            series: [
              {
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      color: "rgba(255,255,255,0.6)"
                    },
                    color: "rgba(255,255,255,0.6)",
                    position: "right",
                    offset: [-10, 0],
                    formatter: "{c} 人次"
                  }
                }
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
  height: 500px;
  overflow: hidden;
}
</style>