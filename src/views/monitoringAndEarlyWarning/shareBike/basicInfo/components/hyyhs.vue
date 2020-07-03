<template>
  <div class="bcyslk-wrap">
    <!-- 接入车俩总数 -->
    <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getActiveUser();
  },
  watch: {
    hyclt() {
      this.$emit("setTotalNO", this.hyclt);
    }
  },
  methods: {
    getActiveUser() {
      this.$http.$get("/gxdc_bikeBasicInfoHandler/getActiveUser").then(res => {
        let val = 0;
        const seriesData = [];
        const colors = {
          哈罗单车: "rgba(0, 150, 255,0.6)",
          青桔单车: "rgba(21, 208, 181,0.6)",
          摩拜科技: "rgba(255, 70, 17,0.6)"
        };
        for (const item of res) {
          seriesData.push({
            name: item.enterprise, // 企业简称
            value: item.num, // 车辆数量
            itemStyle: {
              color: colors[item.enterprise]
            }
          });
          val = item.total;
        }
        let values = val > 10000 ? (val / 10000).toFixed(2) : val;
        if (val > 10000) {
          this.hyclt = "活跃用户数(" + values + ") 万人";
        } else {
          this.hyclt = "活跃用户数(" + values + ") 人";
        }
        let option = this.$utils.echart.getPieOption(
          {
            // legendData:legendData,
            seriesData: [seriesData]
          },
          {
            series: [
              {
                radius: "50%",
                label: {
                  position: "outside",
                  color: "#fff",
                  formatter: param => {
                    // let val = param.value;
                    let val =
                      param.value > 10000
                        ? (param.value / 10000).toFixed(2) + "万"
                        : param.value;
                    return param.name + "\n" + val;
                  }
                }
              }
            ],
            xAxis: [
              {
                axisLine: {
                  show: false
                }
              }
            ]
          }
        );
        let test = _.merge(JSON.parse(JSON.stringify(option.series[0])), {
          label: {
            position: "inside",
            formatter: "{d}%"
          }
        });
        option.series.push(test);
        this.option = option;
      });
    }
  },
  data() {
    return {
      option: {},
      hyclt: 0
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