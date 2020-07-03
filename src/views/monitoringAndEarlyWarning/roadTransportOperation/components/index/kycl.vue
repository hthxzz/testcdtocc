<template>
  <div class="bcyslk-wrap">
    <!-- 客运车俩 -->
    <div class="echar-wrap">
      <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
    </div>
    <section class="pop-wrap">
      <kyclDetail :baseInfo="baseInfo" ref="kyclInfo" />
    </section>
    <div class="kyzsl">
      <table>
        <tr>
          <th>注册车辆</th>
          <th>运营车辆</th>
          <th class="zxcl" @click="getzxcl">在线车辆</th>
        </tr>
        <tr>
          <td>
            <count-to :startVal="0" :endVal="registerNum" :duration="1000" />
          </td>
          <td>
            <count-to :startVal="0" :endVal="operationNum" :duration="1000" />
          </td>
          <td class="zxcl" @click="getzxcl">
            <count-to :startVal="0" :endVal="onlineNum" :duration="1000" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import mapAnimation from "@/components/common/map/animation/mapAnimation";
import kyclDetail from "./kyclDetail";
export default {
  name: "",
  mixins: [mapAnimation],
  components: {
    kyclDetail
  },
  mounted() {
    this.getVehicleInfo();
  },
  methods: {
    getLineStaticInfo(vehicleNo) {
      this.$http
        .$get("kyjc_indexHandler/getVehicleByVehicleNo", {
          vehicleNo: vehicleNo
        })
        .then(res => {
          this.baseInfo = res;
        });
    },
    getzxcl() {
      tmap.removeLayer();
      this.removePoPHtml();
      this.point2point(
        [104.06324665471999, 30.65995220349631],
        1000,
        null,
        13,
        () => {
          mapConfig.vectorlayers.bxzxcl.onLayerFeatureClick = this.getkyclpop;
          tmap.addLayer("bxzxcl").loadData();
        }
      );
    },
    // 地图弹窗
    getkyclpop(params) {
      debugger;
      this.getLineStaticInfo(params.values_.vehicleNo);
      let hide = this.$refs.kyclInfo.hide;
      if (!hide) {
        this.$refs.kyclInfo.open();
      }
      let kyclInfo = this.$refs.kyclInfo.$el;
      this.addPoPHtml([params.values_.lon, params.values_.lat], kyclInfo);
    },
    getVehicleInfo() {
      this.$http.$get("/kyjc_indexHandler/getVehicleNum").then(res => {
        this.registerNum = res.registerNum;
        this.operationNum = res.operationNum;
        this.onlineNum = res.onlineNum;
        let option = this.$utils.echart.getPieOption(
          {
            // legendData:legendData,
            seriesData: [
              [
                {
                  name: "在线车辆",
                  value: res.onlineNum
                }
              ],
              [
                {
                  name: "运营车辆",
                  value: res.operationNum
                }
              ],

              [
                {
                  name: "注册车辆",
                  value: res.registerNum
                }
              ]
            ]
          },
          {
            tooltip: {
              trigger: "item",
              formatter: "{b}:<br/>{c}"
            },
            series: [
              { radius: [0, "20%"], label: { show: false } },
              { radius: ["50%", "60%"], label: { show: false } },
              { radius: ["90%", "100%"], label: { show: false } }
            ]
          }
        );
        this.option = option;
      });
    }
  },
  data() {
    return {
      baseInfo: {},
      option: {},
      registerNum: 0,
      operationNum: 0,
      onlineNum: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.bcyslk-wrap {
  position: relative;
  width: 100%;
  // height: 160px;
  overflow: hidden;
  .echar-wrap {
    height: 160px;
  }
}
.kyzsl,
.jyyh,
.realTime {
  width: 100%;
  height: 100px;
  table {
    width: 100%;
    height: 66px;
    tr {
      th {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: normal;
        vertical-align: middle;
      }
      td {
        text-align: center;
        font-size: 36px;
        color: #00ffff;
        letter-spacing: 2px;
        vertical-align: bottom;
        font-family: "datafont";
        font-weight: bold;
        animation: turn 8s ease-in-out infinite;
      }
    }
  }
}
.zxcl {
  cursor: pointer;
}
.pop-wrap {
  position: absolute;
  right: 390px;
  z-index: -1;
  // top: 40px;
}
</style>