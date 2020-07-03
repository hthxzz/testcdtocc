<template>
  <div class="bcyslk-wrap">
    <!-- 实时骑行量 -->
    <v-chart :options="option" :autoresize="true" theme="theme" />
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
          this.total = sum;
          xAxisData.reverse();
          ydata.reverse();
          let option = this.$utils.echart.getBarOption(
            {
              // legendData:legendData,
              seriesData: [xAxisData]
            },
            {
              grid: {
                left: 75,
                bottom: 10,
                right: 75
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
                      color: "#fff",
                      offset: [0, 0],
                      position: "right",
                      formatter: param => {
                        let val =
                          param.value > 10000
                            ? (param.value / 10000).toFixed(2) + " 万人次"
                            : param.value + " 人次";
                        return val;
                      }
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
  display: flex;
  overflow: hidden;
}
</style>