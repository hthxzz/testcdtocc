<template>
  <div class="xwjc-wrap">
    <!-- 客流刷卡类型统计 -->
    <div class="char-wrap">
      <v-chart :options="option" :autoresize="true" theme="theme" ref="test"></v-chart>
    </div>

    <div class="legend-wrap">
      <table>
        <tr v-for="item in legendList" :key="item.name">
          <td class="itemRadius">
            <span class="lineIndex" :style="{backgroundColor:item.color}"></span>
          </td>
          <td class="lineName" width="40%">{{item.name}}</td>
          <td class="dt_skdt">
            <count-to :startVal="0" :endVal="item.value" :duration="1000" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getBikeNum();
  },
  watch: {
    total() {
      this.$emit("setTotalNO", this.total);
    }
  },
  methods: {
    activeLengend() {
      let count = this.count;
      let i = 0;
      this.xwjcAuto = setInterval(() => {
        if (i == count) {
          i = 0;
        }
        this.$refs.test.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: i
        });
        if (i == 0) {
          this.$refs.test.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: count - 1
          });
        } else {
          this.$refs.test.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: i - 1
          });
        }
        i++;
      }, 3000);
    },
    clear() {
      if (this.xwjcAuto) {
        clearInterval(this.xwjcAuto);
      }
    },
    getBikeNum(val) {
      this.$http
        .$get("/gdjc_runMonitorHandler/getSwipeTypeStaticByLine", {
          lineCode: val
        })
        .then(res => {
          this.clear();
          const seriesData = [];
          const types = {
            "6": "员工卡",
            "2": "单程票",
            "3": "老年卡",
            "4": "学生卡",
            "5": "二维码",
            "7": "普通卡",
            "9": "其它"
          };
          const type2Color = {
            "6": "rgba(204, 145, 226, 1)",
            "2": "rgba(32, 86, 221, 1)",
            "3": "rgba(255, 255, 0, 1)",
            "4": "rgba(0, 176, 80, 1)",
            "5": "rgba(114, 246, 250, 1)",
            "7": "rgba(102, 116, 100, 1)",
            "9": "rgba(86, 251, 161, 1)"
          };
          const legendList = [];
          let count = 0;
          res.sort((a, b) => {
            return b.passengerNum - a.passengerNum;
          });
          var tem = {};
          for (const item of res) {
            seriesData.push({
              name: types[item.swipeType], // 企业简称
              value: item.passengerNum // 车辆数量
            });
            if (item.swipeType != "9") {
              legendList.push({
                name: types[item.swipeType], // 企业简称
                color: type2Color[item.swipeType], // 企业简称
                value: item.passengerNum // 车辆数量
              });
            } else {
              tem.name = types[item.swipeType]; // 企业简称
              tem.color = type2Color[item.swipeType]; // 企业简称
              tem.value = item.passengerNum; // 车辆数量
            }

            this.AreaList = seriesData;

            this.total = item.total;
            count++;
          }
          legendList.push(tem);
          this.legendList = legendList;
          this.count = count;
          let option = this.$utils.echart.getPieOption(
            {
              // legendData:legendData,
              seriesData: [seriesData]
            },
            {
              xAxis: [
                {
                  axisLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    label: {
                      formatter: "{b} \n{d}%",
                      show: true,
                      color: "#fff",
                      fontSize: "14",
                      fontWeight: "100 "
                    }
                  }
                }
              ]
            }
          );

          this.option = option;
          this.activeLengend();
        });
    }
  },
  destroyed() {
    this.clear();
  },
  data() {
    return {
      option: {},
      total: 0,
      legendList: []
    };
  }
};
</script>

<style lang="scss" scoped>
.xwjc-wrap {
  width: 100%;
  overflow: hidden;
  // display: flex;
  .char-wrap {
    // flex: 1;
    width: 100%;
    height: 240px;
  }
  .legend-wrap {
    // flex: 1;
    text-align: right;
    width: 100%;
  }
}
.lineIndex {
  width: 6px;
  height: 6px;
  vertical-align: sub;
  display: inline-block;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: inherit;
}
.lineName {
  margin-left: 10px;
  text-align: left;
}
table {
  width: 90%;
  tr {
    td {
      line-height: 36px;
    }
    .itemRadius {
      text-align: left;
      width: 15px;
    }
  }
}
.dt_skdt {
  text-align: right;
  font-size: 16px;
  color: #fff;
  // font-family: "datafont";
  span {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>