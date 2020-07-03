<template>
    <div class="major-activities-index-container">
        <BaseLayoutContent>
            <template #leftPanel>
                <PanelItem title="交通数据监测">
                    <div class="trafficData">
                        <div class="overallAituationClass">

                        </div>
                        <div class="congestionIndexClass">
                            <span>交通拥堵指数</span>
                            <v-chart :options="congestionIndexOption" theme="theme"/>
                        </div>
                        <div class="trafficFlowClass">
                            <span>区域车流量</span>
                            <v-chart :options="trafficFlowOption" theme="theme"/>
                        </div>
                        <div class="averageSpeedClass">
                            <span>区域平均车速</span>
                            <v-chart :options="averageSpeedOption" theme="theme"/>
                        </div>
                    </div>
                </PanelItem>
            </template>
            <template #midContent >
                <Basemap></Basemap>
            </template>
            <template #rightPanel >
               <div class="surroundingCircumstances">
                   <div class="parkingLot">
                       <PanelItem title="周边停车场运行情况">
                       </PanelItem>
                   </div>
                   <div class="trafficControl">
                       <PanelItem title="区域交通管制监测">
                       </PanelItem>
                   </div>
                   <div class="realtimeTraffic">
                       <PanelItem title="区域实时客流量监测">
                           <barOrLine-option :echartData="realtimeTrafficData" echartType="line"
                                             echartTitle="" :ifShowLable="false" :ifBrokenLine="false"></barOrLine-option>
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
        created() {
            this.creatCongestionIndexOption(this.congestionIndexData);
            this.creatTrafficFlowOption(this.trafficFlowData);
            this.creatAverageSpeedOption();
        },
        data() {
            return {
                realtimeTrafficData: [
                    ["公交车", "出租车","轨道交通"],
                    ['0:00', ' 1:00', '2:00', '3:00', '4:00', '5:00', ' 6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
                    [1800, 4000, 6000, 2100, 3200,4300, 5100, 6100,7700,8150,6200,6300,5600,4300,6200,3100,4500,5200, 7001,4500],
                    [1500, 4300, 8000, 3100, 4200,2300, 4100, 4100,1700,1150,5200,5300,7600,2300,3200,1100,1500,1200, 1001,2500],
                    [2800, 2000, 6500, 1100, 2200,5300, 6100, 7100,5700,9150,7200,6300,8600,6300,6200,8100,9500,5200, 6001,7500],
                ],
                congestionIndexOption:{},
                trafficFlowOption:{},
                averageSpeedOption:{},
                congestionIndexData:[
                    ['0:00', ' 1:00', '2:00', '3:00', '4:00', '5:00', ' 6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
                    [1.8, 4, 6, 2.1, 3.2,4.3, 5.1, 6.1,7.7,8.15,6.2,6.3,5.6 ,4.3,6.2,3.1,4.5,5.2, 7.1,4.5]
                ],
                trafficFlowData:[
                    ['0:00', ' 1:00', '2:00', '3:00', '4:00', '5:00', ' 6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
                    [1800, 4000, 6000, 2100, 3200,4300, 5100, 6100,7700,8150,6200,6300,5600,4300,6200,3100,4500,5200, 7001,4500]
                ]
            }
        },
        methods:{
            creatAverageSpeedOption:function(){
                var option = {
                    // backgroundColor: '#1b1b1b',
                    tooltip : {
                        formatter: "{a} <br/>{c} {b}"
                    },

                    series : [
                        {
                            name:'速度',
                            type:'gauge',
                            min:0,
                            max:140,
                            z:1,
                            splitNumber:7,
                            radius: '66%',
                            axisLine: {            // 坐标轴线
                                show:false,
                                lineStyle: {       // 属性lineStyle控制线条样式
                                   // color: [[0.142857142857, 'rgba(255, 0, 0, 1)'],[0.5, 'rgba(255, 192, 0, 1)'],[0.78571428571, 'rgba(146, 208, 80, 1)'],[1, 'rgba(40, 183, 77, 1)']],
                                   color:[[1,'#2b25ff']],
                                    width: 5,
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            splitLine: {show: false},
                            axisTick: {show: false},
                            axisLabel: {show: false},
                            splitLabel: {show: false},
                            pointer: {show: false},
                            detail : {show: false}

                        },
                        {
                            name:'速度',
                            type:'gauge',
                            min:0,
                            max:140,
                            splitNumber:7,
                            radius: '60%',
                            axisLine: {// 坐标轴线

                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: [[0.142857142857, 'rgba(255, 0, 0, 1)'],[0.5, 'rgba(255, 192, 0, 1)'],[0.78571428571, 'rgba(146, 208, 80, 1)'],[1, 'rgba(40, 183, 77, 1)']],
                                    width: 3,
                                    opacity:0,
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            // pointer:{
                            //     // show:false,
                            //     width:6
                            // },
                            axisLabel: {            // 坐标轴小标记
                                // textStyle: {       // 属性lineStyle控制线条样式
                                //     fontWeight: 'bolder',
                                //     color: '#fff',
                                //     shadowColor : '#fff', //默认透明
                                //     shadowBlur: 10
                                // }
                            },
                            axisTick: {            // 坐标轴小标记
                                length :8,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto',
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            splitLine: {           // 分隔线
                                length :11,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    width:3,
                                    color: '#fff',
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            title : {
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    fontSize: 10,
                                    fontStyle: 'italic',
                                    color: '#fff',
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            detail : {
                                // backgroundColor: 'rgba(30,144,255,0.8)',
                                // borderWidth: 1,
                                fontSize:16,
                                // borderColor: '#fff',
                                // shadowColor : '#fff', //默认透明
                                // shadowBlur: 5,
                                offsetCenter: [0, '50%'],       // x, y，单位px
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    color: '#fff'
                                }
                            },
                            data:[{value: 40, name: 'km/h'}]
                        }

                    ]
                };

              this.averageSpeedOption=option;
            },
            creatTrafficFlowOption:function(trafficFlowData){
                var option = {
                    grid:{
                        left:50,
                        right:0,
                        top:20,
                        bottom:20,
                    },
                    tooltip: {
                        trigger: 'axis',
                        // formatter: '{a0}  : {c0}<br/>{a1}  :{c1}'
                    },

                    xAxis: {
                        type: 'category',
                        // name: 'shi',
                        axisTick:{
                            alignWithLabel:true,
                            interval:0
                        },
                        // nameLocation:'bottom',
                        splitLine: {show: false},
                        data:trafficFlowData[0]
                    },

                    yAxis: {
                        type: 'value',
                        axisLabel:{
                            show:true
                        },
                        // interval:6,
                        // name: 'y'
                    },
                    series: [
                        {
                            name: '区域车流量',
                            type: 'line',
                            smooth:true,
                            symbol: "none",
                            itemStyle: {
                                normal: {
                                    label: {
                                        show : true,
                                        position : 'top',
                                        formatter : "{c}",
                                        textStyle : {color: '#ffffff' }
                                    },
                                    areaStyle: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 1,
                                            x2: 0,
                                            y2: 0,
                                            colorStops: [{
                                                offset: 0,
                                                color: 'rgba(73,255,255,0.01)'
                                            }, {
                                                offset: 0.5,
                                                color: 'rgba(31,30,215,0.1)'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(31,30,215)'
                                            }]
                                        },
                                    },

                                },
                                opacity:1,
                            },
                            lineStyle:{
                                normal:{type:'solid'}
                            },

                            data: trafficFlowData[1]
                        },

                    ]
                };

                this.trafficFlowOption=option;

            },
            creatCongestionIndexOption:function(congestionIndexData){
                var option = {
                    grid:{
                        left:20,
                        right:0,
                        top:20,
                        bottom:20,
                    },
                    tooltip: {
                        trigger: 'axis',
                        // formatter: '{a0}  : {c0}<br/>{a1}  :{c1}'
                    },

                    xAxis: {
                        type: 'category',
                        // name: 'shi',
                        axisTick:{
                            alignWithLabel:true,
                            interval:0
                        },
                        // nameLocation:'bottom',
                        splitLine: {show: false},
                        data:congestionIndexData[0]
                    },

                    yAxis: {
                        type: 'value',
                        max:10,
                        axisLabel:{
                            show:true
                        },
                        // interval:6,
                        // name: 'y'
                    },
                    visualMap: {
                        top: 10,
                        right: 10,
                        textGap:5,
                        itemWidth:15,
                        show:false,
                        orient:'horizontal',
                        left:'center',
                        pieces: [
                            {
                                gt: 0,
                                lte: 4,
                                color: '#6aff31'
                            },{
                                gt: 4,
                                lte: 5,
                                color: '#99991f'
                            }, {
                                gt: 5,
                                lte: 6,
                                color: '#ffde33'
                            }, {
                                gt: 6,
                                lte: 7,
                                color: '#ff9933'
                            }, {
                                gt: 7,
                                lte: 8,
                                color: '#992d11'
                            }, {
                                gt: 8,
                                lte: 10,
                                color: '#7e0023'
                            }
                        ],
                    },
                    series: [
                        {
                            name: '交通拥堵指数',
                            type: 'line',
                            smooth:false,
                            symbol: "none",
                            itemStyle: {
                                normal: {
                                    label: {
                                        show : true,
                                        position : 'top',
                                        formatter : "{c}",
                                        textStyle : {color: '#ffffff' }
                                    },
                                    areaStyle: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 1,
                                            x2: 0,
                                            y2: 0,
                                            colorStops: [{
                                                offset: 0,
                                                color: 'rgba(255,255,255,0.01)'
                                            }, {
                                                offset: 0.4,
                                                color: 'rgba(75,215,71)'
                                            }, {
                                                offset: 0.6,
                                                color: 'rgba(239,249,79)'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(153,14,14)'
                                            }]
                                        },
                                    },

                                },
                                opacity:0.4,
                            },
                            lineStyle:{
                                normal:{type:'solid'}
                            },

                            data: congestionIndexData[1]
                        },

                    ]
                };

                this.congestionIndexOption=option;
            }

        }
    }
</script>

<style lang="scss" scoped>
    .major-activities-index-container{
        width: 100%;
        height: 100%;
        .trafficData{
            /*width: 100%;*/
            height:100%;
            display:flex;
            flex-direction: column;
            .echarts{
                min-height: 200px;
                height: 100%;
                width:100%;
            }
            .overallAituationClass{
                flex :1;
            }
            .congestionIndexClass{
                flex:3;
            }
            .trafficFlowClass{
                flex:3;
            }
            .averageSpeedClass{
                flex:3;
            }
        }

        .surroundingCircumstances {
            height: 100%;
            display: flex;
            flex-direction: column;

            .echarts {
                min-height: 200px;
                height: 100%;
                width: 100%;
            }

            .parkingLot {
                flex:1;
            }

            .trafficControl {
                flex:1;
            }

            .realtimeTraffic {
                flex:1;
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