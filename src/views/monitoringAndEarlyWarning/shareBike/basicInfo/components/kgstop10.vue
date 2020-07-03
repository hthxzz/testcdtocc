<template>
  <div class="bcyslk-wrap">
    <!-- 公交地铁站点开关锁TOP10 -->
    <div class="tag-wrap">
      <ChangeTag :itemList="itemList" @getStatues="getStatues" />
    </div>

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
    getStatues(val) {
      this.getStationFlow(val.code);
    },
    getStationFlow(val) {
      let s = val || "open";
      let stationType = "subway";
      this.$http
        .$get(
          "/gxdc_bikeOperateHandler/getBusSubwayTop10?type=" +
            s +
            "&stationType=" +
            stationType
        )
        .then(data => {
          let xAxisData = [],
            ydata = [];
          for (const item of data && data.slice(0, 5)) {
            if (val != "lock") {
              xAxisData.push(item.openCount);
            } else {
              xAxisData.push(item.lockCount);
            }

            ydata.push(item.stationName);
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
                left: 75
                // top: 10,
                // bottom: 20
              },
              xAxis: [
                {
                  type: "value",
                  axisLine: {
                    show: false
                  }
                }
              ],

              yAxis: [
                {
                  type: "category",
                  data: ydata,
                  axisLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  label: {
                    normal: {
                      show: true,
                      position: "right",
                      formatter: "{c} 次"
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
      option: {},
      itemList: [
        { code: "open", value: "开锁热力点" },
        { code: "lock", value: "关锁热力点" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.bcyslk-wrap {
  width: 100%;
  height: 310px;
  overflow: hidden;
}
.tag-wrap {
  width: 100%;
  height: 26px;
  overflow: hidden;
}
</style>