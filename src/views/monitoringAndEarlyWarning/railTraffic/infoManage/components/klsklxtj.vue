<template>
  <div class="xwjc-wrap">
    <!-- 客流刷卡类型统计 -->
    <div class="char-wrap">
      <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
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
    this.getBikeNum();
  },
  watch: {
    total() {
      this.$emit("setTotalNO", this.total);
    }
  },
  methods: {
    getBikeNum() {
      this.$http.$get("/gxdc_bikeBasicInfoHandler/getBikeNum").then(res => {
        const seriesData = [];
        for (const item of res) {
          if (item.enterprise != "摩拜单车") {
            seriesData.push({
              name: item.enterprise, // 企业简称
              value: item.num // 车辆数量
            });
          }

          this.AreaList = seriesData;
          this.total = item.total;
        }
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
          value: 12345
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