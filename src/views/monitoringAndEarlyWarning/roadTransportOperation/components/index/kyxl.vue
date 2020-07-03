<template>
  <div class="bcyslk-wrap">
    <!-- 客运线路 -->
    <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getPassengerLine();
  },
  methods: {
    getPassengerLine() {
      this.$http.$get("/kyjc_indexHandler/getPassengerLine").then(res => {
        // let xAxisData = [],
        // seriesData = [],
        // legendData = [],
        // ydata = [];
        // for (const item of data.list) {
        //     xAxisData.push(item.hour.split("-")[0].split(':')[0]);
        //     ydata.push(item.bikeNum);
        // }
        // seriesData.push(ydata);
        let option = this.$utils.echart.getPieOption({
          // legendData:legendData,
          seriesData: [
            [
              {
                name: "省外",
                value: res.outsideProvince
              },
              {
                name: "市内",
                value: res.insideCity
              },
              {
                name: "省内市外",
                value: res.inProvinceOutCity
              }
            ]
          ]
        });
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
  height: 160px;
  overflow: hidden;
}
</style>