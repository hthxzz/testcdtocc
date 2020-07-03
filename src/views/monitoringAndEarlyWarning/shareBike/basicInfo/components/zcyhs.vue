<template>
  <div class="bcyslk-wrap">
    <!-- 注册用户总数 -->
    <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getPassengerLine();
  },
  watch: {
    total() {
      this.$emit("setTotalNO", this.total);
    }
  },
  methods: {
    getPassengerLine() {
      this.$http.$get("/gxdc_bikeBasicInfoHandler/getUser").then(res => {
        this.zcyhst = "注册用户总数(" + res.total + ")";
        const seriesData = [[]],
          xAxisData = [];
        for (const item of res) {
          seriesData[0].push(
            item.num // 车辆数量
          );
          xAxisData.push(item.enterprise);
          this.total = item.total;
        }
        let option = this.$utils.echart.getBarOption(
          {
            // legendData:legendData,
            xAxisData: xAxisData,
            seriesData: seriesData
          },
          {
            grid: { left: 10, right: 0 },
            yAxis: [
              {
                show: false
              }
            ],
            xAxis: [
              {
                type: "category",
                axisLabel: {
                  interval: 1,
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
      option: {},
      total: 0
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
</style>