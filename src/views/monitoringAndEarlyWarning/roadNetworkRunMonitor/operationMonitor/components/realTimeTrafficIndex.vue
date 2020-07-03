<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">
    <!-- <RollNumber title="总客运量" :value="PassengerFlow"></RollNumber> -->
    <v-chart :options="option" />
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.nowAndStatTrafficIndex();
  },
  methods: {
    nowAndStatTrafficIndex() {
      this.$http
        .$get("lkfx_trafficIndexHandler/nowAndStatTrafficIndex")
        .then(data => {
          let todayIndex = [],
            lastWeekIndex = [],
            xAxisData = [],
            legendData = ["今日拥堵指数", "上周同期拥堵指数", "去年同期"],
            seriesData = [];
          for (const item of data.trafficIndexStatInfos) {
            xAxisData.push(item.hour);
            todayIndex.push(item.todayIndex);
            lastWeekIndex.push(item.lastWeekIndex);
          }
          seriesData.push(todayIndex);
          seriesData.push(lastWeekIndex);
          let option = this.$utils.echart.getLineOption(
            {
              xAxisData: xAxisData,
              legendData: legendData,
              seriesData: seriesData
            },
            {
              grid: {
                bottom: 40
              },
              xAxis: [
                {
                  type: "category",
                  axisLabel: {
                    interval: 3,
                    color: "#fff"
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
      PassengerFlow: 0,
      option: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.trafficJam-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    overflow: hidden;
  }
  .trafficJam-content {
    height: 300px;
    // position: relative;
    margin-top: 10px;
  }
}
.echarts {
  width: 100%;
  height: 260px;
}
</style>