<template>
  <div class="bcyslk-wrap">
    <!-- 实时骑行量 -->
    <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getRealTimeRidingTimes();
  },
  watch: {
    total() {
      this.$emit("setTotalNO", this.total);
    }
  },
  methods: {
    getRealTimeRidingTimes() {
      this.$http
        .$get("/gxdc_bikeOperateHandler/getRealTimeRidingTimes")
        .then(data => {
          let xAxisData = [],
            ydata = [],
            sum = 0;
          for (const item of data) {
            xAxisData.push(item.num);
            ydata.push(item.enterprise);
            sum = sum + item.num;
          }
          debugger;
          this.total = sum;
          // xAxisData.reverse();
          // ydata.reverse();
          let option = this.$utils.echart.getBarOption(
            {
              // legendData:legendData,
              seriesData: [xAxisData]
            },
            {
              grid: {
                left: 100,
                bottom: 10
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
                  label: {
                    normal: {
                      show: true,
                      position: "insideTop"
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
      total: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.bcyslk-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
</style>