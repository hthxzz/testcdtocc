<template>
  <div class="bcyslk-wrap">
    <!-- 接入车俩总数 -->
    <div class="char-wrap">
      <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
    </div>

    <div class="keyarea">
      <table>
        <tr>
          <th>企业名称</th>
          <th>车辆数</th>
        </tr>
        <tr v-for="item in AreaList" :key="item.areaName">
          <th>{{item.name}}</th>
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
      AreaList: [
        {
          areaName: "",
          orderNum: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.bcyslk-wrap {
  width: 100%;

  overflow: hidden;

  .char-wrap {
    height: 260px;
  }
}
.keyarea {
  width: 100%;
  table {
    width: 100%;
    height: 66px;
    tr:nth-child(2n) {
      background-color: rgba(32, 86, 221, 0.1);
    }
    tr {
      th {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: normal;
        vertical-align: middle;
        line-height: 40px;
      }
      td {
        text-align: center;
        font-size: 24px;
        line-height: 40px;
        color: #00ffff;
        letter-spacing: 2px;
        vertical-align: bottom;
        font-family: "datafont";
        animation: turn 8s ease-in-out infinite;
      }
    }
  }
}
</style>