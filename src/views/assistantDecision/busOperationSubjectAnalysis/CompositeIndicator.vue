<template>
<!-- 综合指标 -->
    <div class="CompositeIndicator-wrapper">
        <div class="left-panel">
            <div class="top">
                <TrafficOperationCorrelation></TrafficOperationCorrelation>
                <!-- <verticesBorderStyle /> -->
            </div>
            <div class="bottom">
                <SafetyAccidents />
                <verticesBorderStyle />
            </div>
        </div>
        <div class="mid-panel">
            <div class="panel-wrap">
                <panelTitle :title="title" :displaySwitch=false></panelTitle>
            </div>
            
            <section class="percent-wrapper">
                <div class="title-item" v-for="item in itemList" :key="item.title" >
                    <NoDisplay :title="item.title" :percent="item.number" :color="item.color" ></NoDisplay>
                </div>
            </section>
            <section class="map">
                <Basemap></Basemap>
            </section>
            <!-- <verticesBorderStyle /> -->
        </div>
        <div class="right-panel">
            <ServiceGuarantee />
            <verticesBorderStyle />
        </div>
        <div class="date-float" :style="{visibility:visibility}" >
             <el-date-picker
                v-model="datevalue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
         </div>
    </div>
</template>

<script>
    import NoDisplay from "./components/NoDisplay.vue";
    import ServiceGuarantee from "./components/ServiceGuarantee.vue";
    import TrafficOperationCorrelation from "./components/TrafficOperationCorrelation.vue";
    import SafetyAccidents from "./components/SafetyAccidents.vue";
    import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";
    export default {
        name: '',
        components: {
            NoDisplay,
            TrafficOperationCorrelation,
            SafetyAccidents,
            ServiceGuarantee
        },
        mounted () {
            
            setTimeout(() => {
                // 防止时间组件闪烁
                this.visibility = "visible"
            }, 1000);
        },
        data() {
            return {
                title: '线网运行相关',
                datevalue: '',
                pickerOptions: dateRang,
                visibility:"hidden",
                itemList:[
                    {
                        title: '机动化出行分担率',
                        number: '67',
                        color:"#fff101"
                    },
                    {
                        title: '出行分担率',
                        number: '82',
                        color:"#fff101"
                    },
                    {
                        title: '站点500米覆盖率',
                        number: '95',
                        color:"#01fefe"
                    },
                    {
                        title: '站点300米覆盖率',
                        number: '77',
                        color:"#01fefe"
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin flexLayOut{
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .CompositeIndicator-wrapper{
        display: flex;
        height: 100%;
        .left-panel{
            flex: 400;
            @include flexLayOut;
            .top{
                flex: 5;
            }
            .bottom{
                flex: 2;
                margin-top: 10px;
            }
        }
        .mid-panel{
            flex: 700;
            position: relative;
            margin: 0 10px;
            background: rgba(5, 12, 38, 0.4);
            display: flex;
            flex-direction: column;
            .panel-wrap{
                flex: 50;
            }
            .percent-wrapper{
                display: flex;
                margin-top: 30px;
                flex: 100;
                .title-item{
                    flex: 1;
                    margin-left: 20px;
                }
                .title-item:last-child {
                    margin-right: 20px;
                }
            }
            .map{
                margin-top: 20px;
                flex: 700;
            }
        }
        .right-panel{
            flex: 400;
            position: relative;
        }
    }
    .date-float{
        position: absolute;
        right: 20px;
        top: -10px;
        visibility: hidden;
    }
</style>