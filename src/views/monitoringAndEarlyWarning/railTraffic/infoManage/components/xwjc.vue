<template>
  <div class="xwjc-wrap">
    <!-- 线网监测 -->
    <div class="char-wrap">
      <v-chart
        :options="option"
        :autoresize="true"
        @dispatchAction="activeItem"
        @getDataURL="getDataURL"
        theme="theme"
        ref="test"
      ></v-chart>
    </div>

    <div class="legend-wrap">
      <table>
        <tr v-for="item in legendList" :key="item.name">
          <td>
            <span class="lineIndex" :style="{backgroundColor:item.color}"></span>
          </td>
          <td class="lineName" width="40%">{{item.name}}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getPassengerVolumeProp();
  },
  methods: {
    activeLengend() {
      let count = this.count;
      let i = 0;
      setInterval(() => {
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
    getLineNO(lineName, NO) {
      switch (lineName) {
        case "1号线":
          this.legendList[0].value = NO;
          break;

        case "2号线":
          this.legendList[1].value = NO;
          break;

        case "3号线":
          this.legendList[2].value = NO;
          break;

        case "4号线":
          this.legendList[3].value = NO;
          break;

        case "5号线":
          this.legendList[4].value = NO;
          break;

        case "7号线":
          this.legendList[5].value = NO;
          break;

        case "10号线":
          this.legendList[6].value = NO;
          break;

        default:
          break;
      }
    },
    getPassengerVolumeProp() {
      this.$http
        .$get("/gdjc_runMonitorHandler/getPassengerVolumeProp")
        .then(res => {
          const seriesData = [];
          let count = 0;
          for (const item of res) {
            seriesData.push({
              name: item.lineName, // 线路
              value: item.passengerVolume // 客流量
            });
            count++;
            this.getLineNO(item.lineName, item.passengerVolume);
          }
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
                      formatter: "{b}: \n{d}%",
                      show: true,
                      fontSize: "16",
                      fontWeight: "bold"
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
  data() {
    return {
      option: {},
      total: 0,
      legendList: [
        {
          name: "1号线",
          color: "rgba(26, 117, 209,1)",
          value: 12345,
        },
        {
          name: "2号线",
          color: "rgb(238, 121, 26)",
          value: 123450
        },
        {
          name: "3号线",
          color: "rgb(238, 75, 129)",
          value: 123450
        },
        {
          name: "4号线",
          color: "rgb(68, 209, 53)",
          value: 123450
        },
        {
          name: "5号线",
          color: "rgb(190, 81, 169)",
          value: 123450
        },
        {
          name: "7号线",
          color: "rgb(118, 214, 222)",
          value: 123450
        },
        {
          name: "10号线",
          color: "rgb(108, 105, 236)",
          value: 123450
        }
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