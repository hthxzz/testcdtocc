<template>
    <div class="major-activities-index-container">
        <BaseLayoutContent>
            <template #leftPanel >
                <div class="badWeatherLeft">
                    <div class="speedChange">
                        <PanelItem title="车辆行驶速度变化">
                            <barOrLine-option :echartData="speedData" echartType="line"
                                              echartTitle="" :ifShowLable="true" :ifBrokenLine="true" :symbol="true"></barOrLine-option>
                        </PanelItem>
                    </div>
                    <div class="trafficFlowRatio">
                        <PanelItem title="车流量占比">
                            <barOrLine-option :echartData="trafficFlowData" echartType="line"
                                              echartTitle="" :ifShowLable="true" :ifBrokenLine="true" :symbol="true"></barOrLine-option>
                        </PanelItem>
                    </div>
                    <div class="suddenCongestion">
                        <PanelItem title="突发交通拥堵统计">
                        </PanelItem>
                    </div>
                </div>
            </template>
            <template #midContent >
                <Basemap></Basemap>
            </template>
            <template #rightPanel >
               <div class="badWeatherRight">
                   <div class="publicTtransport">
                       <PanelItem title="公共交通客运流量">
                           <barOrLine-option :echartData="trafficFlowData" echartType="bar"
                                             echartTitle="" :ifShowLable="false" ></barOrLine-option>
                       </PanelItem>
                   </div>
                   <div class="highwaysClosed">
                       <PanelItem title="高速公路封路信息">
                       </PanelItem>
                   </div>
               </div>
            </template>
        </BaseLayoutContent>
        <div class="dialog">
            aaaaaaaaaaaaaa
        </div>
    </div>
</template>

<script>
import barOrLineOption from "../../../components/echartsOption/barOrLineOption.vue";
    export default {
        name: '',
        components: {
            "barOrLine-option": barOrLineOption,
        },
        data() {
            return {
                trafficFlowData:[
                    ['今日','日常'],
                    ['0:00', ' 1:00', '2:00', '3:00', '4:00', '5:00', ' 6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
                    [1800, 4000, 6000, 2100, 3200,4300, 5100, 6100,7700,8150,6200,6300,5600,4300,6200,3100,4500,5200, 7001,4500],
                    [1500, 4300, 8000, 3100, 4200,2300, 4100, 4100,1700,1150,5200,5300,7600,2300,3200,1100,1500,1200, 1001,2500],
                ],
                speedData:[
                    ['今日','日常'],
                    ['0:00', ' 1:00', '2:00', '3:00', '4:00', '5:00', ' 6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
                    [18, 40, 60, 21, 32,43, 51, 61,77,81.5,62,63,56,43,62,31,45,52, 70.01,45],
                    [15, 43, 80, 31, 42,23, 41, 41,17,11.50,52,53,76,23,32,11,15,12, 10.01,25],
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .major-activities-index-container{
        width: 100%;
        height: 100%;
        .badWeatherLeft{
            height:100%;
            display: flex;
            flex-direction: column;
            .echarts {
                min-height: 140px;
                height: 100%;
                width: 100%;
            }
            .speedChange {
                flex:1;
            }

            .trafficFlowRatio {
                flex:1;
            }

            .suddenCongestion {
                flex:1;
            }
        }
        .badWeatherRight {
            height: 100%;
            display: flex;
            flex-direction: column;

            .echarts {
                min-height: 140px;
                height: 100%;
                width: 100%;
            }

            .publicTtransport {
                flex: 1;
            }
            .highwaysClosed {
                flex: 2;
            }
        }
    }
    .dialog{
        background-color: aqua;
        position: fixed;
        left: 50%;
        top: 50%;
    }
</style>