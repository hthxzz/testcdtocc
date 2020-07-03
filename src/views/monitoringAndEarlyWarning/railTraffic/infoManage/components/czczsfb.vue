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
        .$get("/gxdc_bikeOperateHandler/getRealTimeDistance")
        .then(data => {
          let xAxisData = [],
            ydata = [];
          for (const item of data) {
            xAxisData.push(item.orderNum);
            ydata.push(item.distance + " m");
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
                left: 100
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
                      position: "right"
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
  height: 550px;
  overflow: hidden;
}
</style>