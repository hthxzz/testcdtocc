<template>
    <div class="container">
        <div class="left-panel panel">
            <div class="first item">
                <!-- <VerticesBorderStyle/> -->
                <span></span>
                <div class="panel-title">
                    <panelTitle title="人口迁移人数统计"></panelTitle>
                </div>
                <div class="panel-content">
                    <div class="title">
                        <h2>交通方式</h2>
                        <h2>迁入</h2>
                        <h2>迁出</h2>
                        <h2>TOP5</h2>
                    </div>
                    <div class="char" v-calcEleSize>
                        <v-chart :options="polar" theme="theme" />
                        <!-- <div class="pic-char"></div> -->
                        <div class="bar">
                            <outOf></outOf>
                        </div>
                    </div>
                </div>
            </div>
            <div class="second item">
                <div class="panel-title">
                    <panelTitle title="市内居民出行方式统计"></panelTitle>
                </div>
                <div class="panel-content">
                    <jmcxfs></jmcxfs>
                </div>   
            </div>
            <div class="three item">
                <div class="panel-title">
                    <panelTitle title="重点运输车辆运营统计"></panelTitle>
                </div>
                <div class="panel-content">
                    <!-- <div> -->
                         <KeyTransportVehicle />
                    <!-- </div> -->
                   
                </div>    
            </div>
        </div>
        <div class="content">
            <div class="map-wrap">
                <mapWrap></mapWrap>
            </div>
            <div class="speed">
                <div class="panel-title">
                    <panelTitle title="路段平均车速"></panelTitle>
                </div>
                <div class="panel-content">
                    <gauge></gauge>
                </div>   
            </div>
            <div class="float-map-menu">
                <MapFloatMenu></MapFloatMenu>
            </div>
        </div>
        <div class="right-panel panel">
            <div class="four item">
                <div class="panel-title">
                    <panelTitle title="区域车流量统计"></panelTitle>
                </div>
                <div class="panel-content">
                    <trafficFlow></trafficFlow>
                </div>    
            </div>
            <div class="five item">
                <div class="panel-title">
                    <panelTitle title="预警预测统计"></panelTitle>
                </div>
                <div class="panel-content">
                    <EarlyWarning></EarlyWarning>
                </div>            
            </div>
            <div class="six item">
                <div class="panel-title">
                    <panelTitle title="拥堵路段TOP10"></panelTitle>
                </div>
                <div class="panel-content">
                    <ydld></ydld>
                </div>       
            </div>
        </div>
    </div>
</template>

<script>
import panelTitle from "@/components/index/panelTitle.vue";
import jmcxfs from "@/components/index/jmcxfs.vue";
import mapWrap from "@/components/index/mapWrap.vue";
import gauge from "@/components/index/gauge.vue";
import KeyTransportVehicle from "@/components/index/KeyTransportVehicle.vue";
import ydld from "@/components/index/ydld.vue";
import serchPanel from "@/components/common/serchPanel.vue";
import trafficFlow from "@/components/index/trafficFlow.vue";
import EarlyWarning from "@/components/index/EarlyWarning.vue";
import outOf from "@/components/index/outOf.vue";
import MapFloatMenu from "@/components/common/MapFloatMenu.vue";
import echarts  from 'echarts';
    export default {
        name: '',
        components: {
            panelTitle,
            jmcxfs,
            mapWrap,
            gauge,
            KeyTransportVehicle,
            ydld,
            serchPanel,
            trafficFlow,
            EarlyWarning,
            outOf,
            MapFloatMenu
            
        },
        beforeCreate () {
            
        },
        created () {
        //   this.$loading();  
        },
        mounted () {
        },
        data() {
            return {
                backgroundColor: "#fff",
                animation:true,
                polar:{
              
                tooltip : {
                    trigger: 'item',
                    position: ['50%', '50%'],
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     x : 'center',
                //     y : 'bottom',
                //     data:['rose1','rose2','rose3']
                // },
                calculable : true,
                series : [

                    {
                        name:'交通方式',
                        type:'pie',
                        radius : [13, 40],
                        // center : ['50%', '50%'],
                        roseType : 'area',
                        data:[
                            {value:10, name:'火车'},
                            {value:30, name:'飞机'},
                            {value:40, name:'汽车'}
                        ]
                    }
                ]
            }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        height:100%;
        width: 100%;
        display: flex;
        .panel{
            flex: 410;
            margin-left: .1rem /* 10/100 */;
            display: flex;
            flex-direction: column;
            .item{
                // width:410px;
                // height:342px;
                display: flex;
                flex: 1;
                position: relative;
                flex-direction: column;
                background:rgba(5,12,38,0.4) no-repeat;
                background-position: bottom center;
                background-image: url('../../assets/index/index/echart_bg.png') ;
                border:1px solid rgba(32,86,221,1);
                // opacity:0.4;
                 .panel-title{
                    flex:50;
                    margin:0 20px;
                }
                .panel-content{
                    margin-left: 0;
                    flex:291;
                    display: flex;
                    flex-direction: column;
                }
            }
            .first{
                flex: 1;
                flex-direction:column;
                // .panel-title{
                //     flex:50;
                //     margin:0 20px;
                // }
                .panel-content{
                    // margin-left: 0;
                    // flex:291;
                    // display: flex;
                    // flex-direction: column;
                    .title{
                        // width:133px;
                        // height:16px;
                        display: flex;
                        flex: 23;
                        justify-content: space-between;
                        h2{
                            margin-top: .22rem /* 22/100 */;
                            font-size:16px;
                            font-family:MicrosoftYaHei;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            line-height:30px;
                        }
                        h2:nth-child(1){
                            margin-left: .21rem /* 22/100 */;
                        }
                        h2:nth-child(2){
                            // margin-left: 1.62rem /* 162/100 */;
                            cursor: pointer;
                        }
                        h2:nth-child(3){
                            margin-left: .22rem /* 22/100 */;
                            color: #2056DD;
                            cursor: pointer;
                        }
                        h2:nth-child(4){
                            margin-right: .27rem /* 22/100 */;
                             color: #2056DD;
                             
                        }


                    }
                    .char{
                        flex: 253;
                        display: flex;
                    }
                    .char > div {
                        flex: 1;
                    }
                }
            }
            .first::before{
                width: 1px;
                content: '';
                height: 1px;
            }
            .second, .five,.six{
                flex: 1;
             
                margin-top: .1rem /* 10/100 */;
            }
            .three{
                flex: 1;
                margin-top: .1rem /* 10/100 */;
            }
        }
        .content{
            flex: 1060;
            display: flex;
            flex-direction: column;
            margin: 0 0 0 10px;
            position: relative;
            .map-wrap{
                flex: 681;
                // width:1060px;
                // height:682px;
                background:radial-gradient(circle,rgba(32,86,221,.4),rgba(7,22,54,.4));
                border:1px solid rgba(32,86,221,1);
            }
            .float-map-menu{
                position: absolute;
                right: 10px;
                top: 10px;
            }
            .speed{
                flex: 268;
                margin-top: 10px;
                // width:1060px;
                // height:269px;
                display: flex;
                flex-direction: column;
                background:rgba(5,12,38,.4);
                border:1px solid rgba(32,86,221,1);
                // opacity:0.4;
                .panel-title{
                    flex: 47;
                }
                .panel-content{
                    display: flex;
                    flex-direction: row;
                    // height: 100%;
                    flex: 211;
                    .gauge{
                        flex: 1;
                        height: 100%;
                    }
                }
            }
        }
        .right-panel{
            margin-right: 10px;
        }
    }
    .echarts{
        // min-height: 161px;
        // width: 100px /* 200/100 */;
        // height: 100px;
        height: 100%;
        width: 100%;
    }
</style>