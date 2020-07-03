<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">
    <RollNumber title="总客运量" :value="PassengerFlow"></RollNumber>
    <v-chart :options="option" />
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getPassengerFlow();
  },
  methods: {
    getPassengerFlow() {
      this.$http
        .$get("kyjc_stationTransportState/getPassengerFlow")
        .then(data => {
          let todaynum = data.today,
            todayNO = [],
            xAxisData = [],
            legendData = ["今日", "昨日", "去年同期"],
            yesterday = data.yesterday,
            yesterdayNo = [],
            seriesData = [];
          let totalNO = todaynum.reduce((total, item) => {
            todayNO.push(item.num);
            xAxisData.push(item.time);
            return total + item.num;
          }, 0);
          this.PassengerFlow = totalNO;
          for (const item of yesterday) {
            yesterdayNo.push(item.num);
          }
          seriesData.push(todayNO);
          seriesData.push(yesterdayNo);
          let option = this.$utils.echart.getLineOption({
            xAxisData: xAxisData,
            legendData: legendData,
            seriesData: seriesData
          });

          console.log(option);

          this.option = option;
        });
    }
  },

  data() {
    return {
      PassengerFlow: 0,
      option: {},
      tableData: [
        ...new Array(6).fill({
          ydxl: "成渝高速K12+300",
          yxcl: "300辆",
          yxxc: "成都-资阳,成都-内江"
        })
      ],
      stepLength: 60,
      tableConfig: {
        height: "100"
      },
      tableHeadList: [
        {
          prop: "date",
          label: "排名",
          align: "center",
          width: "56"
          // formatter:function(row, column, cellValue, index){
          //     return "<div>"+ cellValue +"</div>";
          // }
        },
        {
          prop: "name",
          label: "路段名称",
          align: "center"
          // "width":"100"
        },
        {
          prop: "address",
          align: "center",
          label: "交通延时指数",
          width: "100"
        }
      ]
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
    position: relative;
    margin-top: 10px;
  }
}
.echarts {
  width: 100%;
  height: 260px;
}
</style>