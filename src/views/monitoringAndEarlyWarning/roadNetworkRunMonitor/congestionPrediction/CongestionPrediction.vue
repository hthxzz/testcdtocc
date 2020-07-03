<template>
    <div class="congestion-Prediction-container">
        <BaseLayoutContent>
            <template #leftPanel >
              <panel>
                    <PanelItem title="道路拥堵预测条件设置" :displaySwitch=false>
                        <div class="" v-calcEleSize >
                            <RoadPredictionConditionSetting></RoadPredictionConditionSetting>
                        </div>
                    </PanelItem>
                    <PanelItem title="路段时刻拥堵预测情况" :displaySwitch=false>
                        <div class="content" >
                            <RoadCongestionPrediction></RoadCongestionPrediction>
                        </div>
                    </PanelItem>
                </panel>  
            </template>
            <template #midContent >
                <Basemap></Basemap>
            </template>
            <template #rightPanel >
                <panel>
                    <PanelItem title="路段流量预测变化情况" :displaySwitch=false>
                            <div class="content" v-calcEleSize >
                                <SectionFlowForecastChanges></SectionFlowForecastChanges>
                            </div>
                    </PanelItem>
                    <PanelItem title="路段延时指数预测变化情况" :displaySwitch=false>
                            <div class="content" v-calcEleSize >
                                <RoadDelayIndexPredictsChange />
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
import RoadCongestionPrediction from "./components/RoadCongestionPrediction.vue";
import SectionFlowForecastChanges from "./components/SectionFlowForecastChanges.vue";
import RoadDelayIndexPredictsChange from "./components/RoadDelayIndexPredictsChange.vue";
import RoadPredictionConditionSetting from "./components/RoadPredictionConditionSetting.vue";
// import realTimeTrafficFlow from "./components/realTimeTrafficFlow.vue";
    export default {
        name: '',
        components: {
            RoadCongestionPrediction,
            SectionFlowForecastChanges,
            RoadDelayIndexPredictsChange,
            RoadPredictionConditionSetting
        //     realTimeTrafficFlow
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .congestion-Prediction-container{
        width: 100%;
        height: 100%;
    }
    .dialog{
        background-color: aqua;
        position: fixed;
        left: 20%;
        top: 20%;
    }
</style>