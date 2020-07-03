<template>
  <div class="xwjc-wrap">
    <!-- 站点监测 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="站点客流TOP10" name="first">
        <ChangeTag :itemList="itemList" @getStatues="getStatues" />
        <listDetail :itemList="listDetailList" />
      </el-tab-pane>
      <el-tab-pane label="站点客流换乘TOP10" name="second">
        <ChangeTag :itemList="itemList" @getStatues="getStatues2" />
        <listDetail :itemList="listDetailList2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import listDetail from "./listDetail";
export default {
  name: "",
  components: {
    listDetail
  },
  mounted() {
    this.getStationPassengerFlowTop();
    this.getStationTransPassengerFlowTop();
  },
  methods: {
    getStatues(val) {
      if (val.value == "总量") {
        this.listDetailList = this.totalPassengerFlowTop;
      } else if (val.value == "进站") {
        this.listDetailList = this.inPassengerFlowTop;
      } else if (val.value == "出站") {
        this.listDetailList = this.outPassengerFlowTop;
      }
    },
    getStatues2(val) {
      if (val.value == "总量") {
        this.listDetailList2 = this.totalPassengerFlowTop2;
      } else if (val.value == "进站") {
        this.listDetailList2 = this.inPassengerFlowTop2;
      } else if (val.value == "出站") {
        this.listDetailList2 = this.outPassengerFlowTop2;
      }
    },
    getStationPassengerFlowTop() {
      this.$http
        .$get("/gdjc_runMonitorHandler/getStationPassengerFlowTop")
        .then(res => {
          const totalPassengerFlowTop = [],
            inPassengerFlowTop = [],
            outPassengerFlowTop = [];

          // 总量
          for (const [index, item] of res.totalPassengerFlowTop &&
            res.totalPassengerFlowTop.entries()) {
            totalPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.totalPassengerFlowTop[0].passengerFlow
            });
          }
          // 进站
          for (const [index, item] of res.inPassengerFlowTop &&
            res.inPassengerFlowTop.entries()) {
            inPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.inPassengerFlowTop[0].passengerFlow
            });
          }
          // 出站
          for (const [index, item] of res.outPassengerFlowTop &&
            res.outPassengerFlowTop.entries()) {
            outPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.outPassengerFlowTop[0].passengerFlow
            });
          }
          this.listDetailList = totalPassengerFlowTop;
          this.totalPassengerFlowTop = totalPassengerFlowTop;
          this.inPassengerFlowTop = inPassengerFlowTop;
          this.outPassengerFlowTop = outPassengerFlowTop;
        });
    },
    // 换乘
    getStationTransPassengerFlowTop() {
      this.$http
        .$get("/gdjc_runMonitorHandler/getStationTransPassengerFlowTop")
        .then(res => {
          const totalPassengerFlowTop = [],
            inPassengerFlowTop = [],
            outPassengerFlowTop = [];

          // 总量
          for (const [index, item] of res.totalPassengerFlowTop &&
            res.totalPassengerFlowTop.entries()) {
            totalPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.totalPassengerFlowTop[0].passengerFlow
            });
          }
          // 进站
          for (const [index, item] of res.inPassengerFlowTop &&
            res.inPassengerFlowTop.entries()) {
            inPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.inPassengerFlowTop[0].passengerFlow
            });
          }
          // 出站
          for (const [index, item] of res.outPassengerFlowTop &&
            res.outPassengerFlowTop.entries()) {
            outPassengerFlowTop.push({
              order: index,
              title: item.stationName,
              traffic: item.passengerFlow,
              rate:
                (100 * item.passengerFlow) /
                res.outPassengerFlowTop[0].passengerFlow
            });
          }
          this.listDetailList2 = totalPassengerFlowTop;
          this.totalPassengerFlowTop2 = totalPassengerFlowTop;
          this.inPassengerFlowTop2 = inPassengerFlowTop;
          this.outPassengerFlowTop2 = outPassengerFlowTop;
        });
    }
  },
  data() {
    return {
      listDetailList: [],
      listDetailList2: [],
      activeName: "first",
      itemList: [
        { code: "总量", value: "总量" },
        { code: "进站", value: "进站" },
        { code: "出站", value: "出站" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.xwjc-wrap {
  width: 100%;
  overflow: hidden;
  display: flex;
  .char-wrap {
    flex: 2;
  }
  .legend-wrap {
    flex: 1;
    text-align: right;
  }
}
.lineIndex {
  width: 20px;
  height: 20px;
  vertical-align: sub;
  display: inline-block;
}
.lineName {
  margin-left: 10px;
  text-align: center;
}
table {
  tr {
    td {
      line-height: 30px;
    }
  }
}
</style>