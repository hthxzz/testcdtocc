<template>
  <div class="bcyslk-wrap">
    <!-- 包车运送旅客 -->
    <panelTitle title="包车运送旅客" :displaySwitch="false"></panelTitle>
    <SelectTag :content="list" @activeTag="activeTag"></SelectTag>
    <div class="content-wrap">
      <div class="item">
        <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
      </div>
      <div class="item item2">
        <section>
          <div class="left"></div>
          <div class="right">
            <h2>省级(环比)</h2>
            <p>
              50000
              <i>人次</i>
              <span style="color:red">10%⬆</span>
            </p>
          </div>
        </section>
        <section>
          <div class="left"></div>
          <div class="right">
            <h2>市级(环比)</h2>
            <p>
              65200
              <i>人次</i>
              <span style="color:red">10%⬆</span>
            </p>
          </div>
        </section>
        <section>
          <div class="left"></div>
          <div class="right">
            <h2>县级(环比)</h2>
            <p>
              511000
              <i>人次</i>
              <span style="color:red">10%⬆</span>
            </p>
          </div>
        </section>
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
    activeTag(content) {},
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
          let option = this.$utils.echart.getPieOption({
            // legendData:legendData,
            seriesData: [
              [
                {
                  name: "省级环比",
                  value: 10000
                },
                {
                  name: "市级环比",
                  value: 6000
                },
                {
                  name: "县级环比",
                  value: 5000
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
.bcyslk-wrap {
  width: 100%;
  height: 100%;
  .content-wrap {
    width: 100%;
    display: flex;
    height: calc(100% - 51px);
    .item {
      flex: 1;
      .char {
        width: 100%;
        height: 100%;
      }
    }
    .item2 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
    }
  }
}
section {
  width: 100%;
  flex: 1;
  align-items: center;
  display: flex;
  .left {
    width: 3px;
    height: 60%;
    line-height: 100%;
  }
  .right {
    // float: left;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    margin-left: 6px;
    h2 {
      font-size: 14px;
    }
    p {
      margin-top: 3px;
      font-size: 24px;
      color: rgba(0, 255, 255, 1);
      i {
        font-size: 14px;
        color: rgba(0, 255, 255, 1);
        font-style: inherit;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
.item2 section:nth-child(1) .left {
  background-color: rgba(32, 86, 221, 1);
}
.item2 section:nth-child(2) .left {
  background-color: rgba(255, 255, 0, 1);
}
.item2 section:nth-child(3) .left {
  background-color: rgba(0, 176, 80, 1);
}
</style>