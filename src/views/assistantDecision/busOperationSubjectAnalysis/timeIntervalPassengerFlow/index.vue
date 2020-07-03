<template>
    <div class="timeIntervalPassengerFlow nomap-content-container">
        <el-tabs >
            <el-tab-pane label="时段客运量分析">
                <div style="height:100%">
                    <SDKL/>
                </div>
            </el-tab-pane>
            <el-tab-pane  label="线路时段客运量分析">
                <div style="height:100%">
                    <XLSDKL/>
                    <!--                    <BusCrowdedDegree />-->
                </div>
            </el-tab-pane>
            <el-tab-pane  label="站点时段客运量分析">
                <div style="height:100%">
                    <ZDSDKL/>
                    <!--                    <BusPunctuality />-->
                </div>
            </el-tab-pane>
            <el-tab-pane  label="重点区域时段客运量分析">
                <div style="height:100%">
                    <QYSDKL/>
                    <!--                    <BusPunctuality />-->
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import SDKL from './timeInterval';
    import XLSDKL from './lineTimeInterval';
    import ZDSDKL from './stationTimeInterval';
    import QYSDKL from './areaTimeInterval';

    export default {
        name: '',
        components: { SDKL,XLSDKL, ZDSDKL,QYSDKL},
        methods: {

        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

    .timeIntervalPassengerFlow{
        width: 100%;
        height: 100%;

    }

</style>
