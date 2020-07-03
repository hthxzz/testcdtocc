<template>
    <div class="PassengerFlowTrend-wrapper nomap-content-container">
        <el-tabs >
            <el-tab-pane label="客运量趋势分析">
                <div style="height:100%">
                    <KYLQS/>
                </div>
            </el-tab-pane>
            <el-tab-pane  label="线路客运量趋势">
                <div style="height:100%">
                    <XLKYLQS/>
<!--                    <BusCrowdedDegree />-->
                </div>
            </el-tab-pane>
            <el-tab-pane  label="站客运量趋势">
                <div style="height:100%">
                    <ZDKYLQS/>
<!--                    <BusPunctuality />-->
                </div>
            </el-tab-pane>
            <el-tab-pane  label="重点区域客运量趋势">
                <div style="height:100%">
                    <QYKYLQS/>
                    <!--                    <BusPunctuality />-->
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import KYLQS from './passengerFlowTrend/passengerFlow';
    import XLKYLQS from './passengerFlowTrend/linePassengerFlow';
    import ZDKYLQS from './passengerFlowTrend/stationPassengerFlow';
    import QYKYLQS from './passengerFlowTrend/areaPassengerFlow';

    export default {
        name: '',
        components: { KYLQS,XLKYLQS, ZDKYLQS,QYKYLQS},
        methods: {

        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

    .PassengerFlowTrend-wrapper{
        width: 100%;
        height: 100%;

    }

</style>