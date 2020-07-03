<template>
    <div class="hightSpeedToll-monitor-container">

        <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="当前节假日"  @moreInfo="unwindNetworkEvent">
            <div class="testechar" v-calcEleSize>
              <unwindNetworkEvent></unwindNetworkEvent>
            </div>
          </PanelItem>
          <PanelItem title="实时路网事件状况" >
            <div class="content" v-calcEleSize>
              <RealTimeRoadNetworkEvent></RealTimeRoadNetworkEvent>
            </div>
          </PanelItem>
          <PanelItem title="实时拥堵里程变化状况" >
            <div class="content">
              <averagespeed></averagespeed>
            </div>
          </PanelItem>
          <PanelItem title="实时拥堵状况" >
            <div class="content">
              <RealtimeTraffic @openDetail="openDetail" ></RealtimeTraffic>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
          <Basemap></Basemap>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title="实时收费站入口排队情况" >
            <div class="content" v-calcEleSize>
              <!-- <trafficJam></trafficJam> -->
              <RealtimeTraffic @openDetail="openDetail" ></RealtimeTraffic>
            </div>
          </PanelItem>
          <PanelItem title="出入口流量情况" >
            <div class="content" v-calcEleSize>
              <!-- <realTimeTrafficFlow></realTimeTrafficFlow> -->
              <unwindNetworkEvent></unwindNetworkEvent>
            </div>
          </PanelItem>
          <PanelItem title="车型变化情况" >
            <div class="content" v-calcEleSize>
              <!-- <realTimeTrafficFlow></realTimeTrafficFlow> -->
              <averagespeed></averagespeed>
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>

    <div class="video-wrap">
      <DetailFormForTab :show="detailShow" @hideDetailForm="hideDetailForm" />
    </div>
    </div>
</template>

<script>
import RealTimeRoadNetworkEvent from "./components/RealTimeRoadNetworkEvent.vue";
import RealtimeTraffic from "./components/RealtimeTraffic.vue";
import DetailFormForTab from "./components/DetailFormForTab.vue";
    export default {
        name: '',
        components: {
            RealTimeRoadNetworkEvent,
            RealtimeTraffic,
            DetailFormForTab
        },
        methods: {
          openDetail(){
            this.detailShow =true;
          },
          hideDetailForm(){
            
            this.detailShow =false;
            
          }
        },
        data() {
            return {
                detailShow:false,
            }
        }
    }
</script>

<style lang="scss" scoped>
.hightSpeedToll-monitor-container{
  position: relative;
}    

.video-wrap{
  position: absolute;
  top: 10%;
  left: 10%;
 
  // width: 950px;
  height: 350px;
}
</style>