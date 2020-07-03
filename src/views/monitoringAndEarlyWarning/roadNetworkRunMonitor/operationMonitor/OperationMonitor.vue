<template>
  <div class="shuangliu-airport-index-container">
    <router-view>a</router-view>
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="未解除路网事件" :displaySwitch="false" @moreInfo="unwindNetworkEvent">
            <div class="testechar" v-calcEleSize>
              <unwindNetworkEvent></unwindNetworkEvent>
            </div>
          </PanelItem>
          <PanelItem title="实时交通运行指数" :displaySwitch="false">
            <div class="content">
              <realTimeTrafficIndex></realTimeTrafficIndex>
            </div>
          </PanelItem>
          <PanelItem title="当前关注路段拥堵指数" :displaySwitch="false">
            <div class="content">
              <averagespeed></averagespeed>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <MapLegend :mapLegend="mapLegend" :right="MapLegendDistance" />
        <div class="testmap">
          <Basemap></Basemap>
        </div>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title="拥堵路段Top10" :displaySwitch="false">
            <div class="content">
              <trafficJam></trafficJam>
            </div>
          </PanelItem>
          <PanelItem title="关注路段实时断面交通流量" :displaySwitch="false">
            <div class="content" v-calcEleSize>
              <realTimeTrafficFlow></realTimeTrafficFlow>
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
    <div class="dialog video-play">
      <!-- <player></player> -->
    </div>
  </div>
</template>

<script>
import unwindNetworkEvent from "./components/unwindNetworkEvent.vue";
import realTimeTrafficIndex from "./components/realTimeTrafficIndex.vue";
import averagespeed from "./components/averagespeed.vue";
import trafficJam from "./components/trafficJam.vue";
import realTimeTrafficFlow from "./components/realTimeTrafficFlow.vue";
export default {
  name: "",
  components: {
    unwindNetworkEvent,
    realTimeTrafficIndex,
    averagespeed,
    trafficJam,
    realTimeTrafficFlow
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      tmap.addLayer("luk");
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
      mapLegend: {
        list: [
          {
            color: "rgb(253, 2, 0)",
            name: "重度拥堵" // 圖例名字
          },
          {
            color: "rgb(254, 192, 2)",
            name: "中度拥堵"
          },
          {
            color: "rgb(246, 249, 89)",
            name: "轻度拥堵"
          },
          {
            color: "rgb(146, 208, 83)",
            name: "基本畅通"
          },
          {
            color: "rgb(2, 176, 82)",
            name: "畅通"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.shuangliu-airport-index-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.dialog {
  background-color: aqua;
  position: fixed;
  left: 20%;
  top: 20%;
}
.testmap {
  width: 100%;
  height: 100%;
}
</style>