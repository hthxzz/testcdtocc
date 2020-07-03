<template>
  <div class="bccql-wrap">
    <!-- 包车出勤率 -->
    <panelTitle title="包车出勤率" :displaySwitch="false"></panelTitle>
    <SelectTag :content="list"></SelectTag>
    <div class="liquid-wrap">
      <div class="item">
        <div class="echar">
          <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
        </div>
        <h2>整体</h2>
        <p>
          环比
          <span>21% ⬆</span>
        </p>
      </div>
      <div class="item">
        <div class="echar">
          <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
        </div>
        <h2>省级</h2>
        <p>
          环比
          <span>21% ⬆</span>
        </p>
      </div>
      <div class="item">
        <div class="echar">
          <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
        </div>
        <h2>市级</h2>
        <p>
          环比
          <span>21% ⬆</span>
        </p>
      </div>
      <div class="item">
        <div class="echar">
          <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
        </div>
        <h2>县级</h2>
        <p>
          环比
          <span>21% ⬆</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getPassengerFlow();
  },
  methods: {
    // 各个时间段单车使用情况
    getPassengerFlow() {
      this.$http
        .$get("/kyjc_basicinfoHandler/getDlPassengerBoardList")
        .then(data => {
          // let xAxisData = [],
          // seriesData = [],
          // legendData = [],
          // ydata = [];
          // for (const item of data.list) {
          //     xAxisData.push(item.hour.split("-")[0].split(':')[0]);
          //     ydata.push(item.bikeNum);
          // }
          // seriesData.push(ydata);
          let option = this.$utils.echart.getLiquidOption(0.16);
          this.option = option;
        });
    }
  },
  data() {
    return {
      option: {},
      list: [
        {
          uid: "1",
          tag: "总体"
        },
        {
          uid: "2",
          tag: "包车"
        },
        {
          uid: "3",
          tag: "含停班班线车"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.bccql-wrap {
  width: 100%;
  height: 100%;
  .liquid-wrap {
    height: calc(100% - 29px);
    width: 100%;
    text-align: center;
    display: flex;
    .item {
      flex: 1;
      font-size: 14px;
      .echar {
        height: calc(100% - 70px);
        width: 100%;
      }
      h2 {
      }
      p {
      }
    }
  }
}
</style>