<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="活跃和周转率" :displaySwitch="false">
            <div class="jyyh">
              <table>
                <tr>
                  <th>车俩活跃率</th>
                  <th>车俩周转率</th>
                </tr>
                <tr>
                  <td>{{activeRatio}}</td>
                  <td>{{turnoverRatio}}</td>
                </tr>
              </table>
            </div>
          </PanelItem>
          <PanelItem :title="jrclT" :displaySwitch="false">
            <div class>
              <jrcl @setTotalNO="setjrclNO" />
            </div>
          </PanelItem>
          <PanelItem :title="hyclt" :displaySwitch="false">
            <div class="kyxl">
              <!-- <kyxl /> -->
              <v-chart :options="option" :autoresize="true" theme="theme"></v-chart>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title="企业数量" :displaySwitch="false">
            <div class="realTime">
              <table>
                <tr>
                  <th>注册企业数</th>
                  <th>接入企业数</th>
                </tr>
                <tr>
                  <td>{{register}}</td>
                  <td>{{access}}</td>
                </tr>
              </table>
            </div>
          </PanelItem>
          <PanelItem :title="zcyhsT" :displaySwitch="false">
            <div class="content">
              <zcyhs @setTotalNO="setzcyhsNO" />
            </div>
          </PanelItem>
          <PanelItem :title="hyyhsT" :displaySwitch="false">
            <div class="content">
              <hyyhs @setTotalNO="sethyyhsNO" />
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
  </div>
</template>

<script>
import jrcl from "./components/jrcl.vue";
import zcyhs from "./components/zcyhs.vue";
import hyyhs from "./components/hyyhs.vue";
export default {
  name: "",
  components: { jrcl, zcyhs, hyyhs },
  mounted() {
    this.getPassengerLine();
    this.getEnterpriseInfo();
    this.getRatio();
    this.getStationNumByGrade();
    this.addGxdcLayer();
    // this.getVehicleInfo();
  },
  methods: {
    setjrclNO(val) {
      this.jrclT = "接入车俩总数(" + val + ")辆";
    },
    setzcyhsNO(val) {
      this.zcyhsT = "注册用户总数(" + val + ")";
    },
    sethyyhsNO(val) {
      this.hyyhsT = "活跃用户数(" + val + ")人";
    },
    addGxdcLayer() {
      var extent = mapProxy.getMapExtent();
      var str_extent = JSON.stringify(extent);
      var level = mapProxy.getMapZoomLevel();
      //移除之前计算的聚合结果，重新计算
      mapProxy.removeLayer("LWJC_BICYCLE");
      //加载图层
      var m_url =
        "api/tocc/lkfx_gpsDeviceOnlineHandler/getBicycleSeggregations?level=" +
        level +
        "&extent=" +
        extent;
      mapProxy.addLayer("LWJC_BICYCLE", "", "", m_url, "districtId=1");
      mapProxy.onMoveEnd(this.addGxdcLayer);
    },
    getPassengerLine() {
      this.$http
        .$get("/gxdc_bikeBasicInfoHandler/getActiveBikeNum")
        .then(res => {
          let total = 0;

          const seriesData = [],
            indicator = [];
          for (const item of res) {
            seriesData.push(
              item.num // 车辆数量
            );
            indicator.push({
              name: item.enterprise, // 企业简称
              max: item.num // 车辆数量
            });
            total = item.total;
          }
          this.hyclt = "活跃车俩总数(" + total + ")辆";
          debugger;
          let option = this.$utils.echart.getRadarOption({
            // legendData:legendData,
            seriesData: [[{ value: seriesData }]],
            indicator: indicator
          });
          console.log(option);

          this.option = option;
        });
    },
    getEnterpriseInfo() {
      this.$http
        .$get("/gxdc_bikeBasicInfoHandler/getEnterpriseInfo")
        .then(data => {
          this.register = data.register; // 注册企业数
          this.access = data.access; //  接入企业数
        });
    },
    getRatio() {
      this.$http.$get("/gxdc_bikeBasicInfoHandler/getRatio").then(data => {
        this.activeRatio = data.activeRatio; // 活跃率
        this.turnoverRatio = data.turnoverRatio; //   周转率
      });
    },
    getStationNumByGrade() {
      this.$http.$get("/kyjc_indexHandler/getStationNumByGrade").then(data => {
        this.total = data.total; // 客运站总数量
        this.one = data.one; //  一级客运站总数量
        this.two = data.two; //  二级客运站总数量
        this.three = data.three; //  三级客运站总数量
      });
    },
    unwindNetworkEvent() {
      this.$router.push({
        name: "roadNetworkEvent",
        params: { search: "123" }
      });
    }
  },
  data() {
    return {
      register: "--",
      access: "--",
      flowTotal: "--",
      enterprise: "--",
      employee: "--",
      total: "--",
      one: "--",
      two: "--",
      ca: "--",
      nca: "--",
      three: "--",
      option: {},
      kyxlt: 0,
      jrclT: "接入车俩总数",
      zcyhsT: "注册用户数",
      hyclt: "活跃车俩总数",
      hyyhsT: "活跃用户数",
      activeRatio: "--", //   活跃率
      turnoverRatio: "--" // 周转率
    };
  }
};
</script>

<style lang="scss" scoped>
.testmap {
  width: 100%;
  height: 100%;
}
.jyyh,
.realTime {
  width: 100%;
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
        font-size: 24px;
        color: #00ffff;
        letter-spacing: 2px;
        vertical-align: bottom;
        font-family: "datafont";
        animation: turn 8s ease-in-out infinite;
      }
    }
  }
}
.kyxl {
  width: 100%;
  height: 310px;
  overflow: hidden;
}
</style>