<template>
    <div class="dong-passengerDepot-index-container">
        <baseLayoutCntent>
            <template #leftPanel>
                <panel>
                    <PanelItem title="实时流量监测">
                        <span>站内客流量</span>
                        <Count figure="322" widthNum="32px" fontNum="28px"></Count>
                        <span>客流密度</span>
                        <Count figure="0.2" widthNum="32px" fontNum="28px">
                            <template #suffix>
                                <span style="font-size: 28px">人/M</span>
                            </template>
                        </Count>
                    </PanelItem>
                    <PanelItem title="当前预警列表">
                    </PanelItem>
                </panel>
            </template>
            <template #midContent>
                <div style="position:absolute">
                    <span>今日机场发送量 </span>
                    <Count figure="9126" ></Count>
                </div>
                <div class="migrationClass">
                    <v-chart :options="migrationEcharOption" theme="theme"/>
                </div>
            </template>
            <template #rightPanel>
                <panel>
                    <PanelItem title="重点区域监测">
                        <span>客流量监测</span>
                        <div class="barOrLineClass">
                            <barOrLine-option :echartData="passengerTrafficData" echartType="bar"
                                              echartTitle="" ifShowLable="true"></barOrLine-option>
                        </div>

                        <span>客流密度及客流流速监测</span>
                        <div class="barOrLineClass">
                            <barOrLine-option :echartData="densityAndVelocityData" echartType="line"
                                              echartTitle="" :ifShowLable="true" :ifBrokenLine="true" :symbol="true"></barOrLine-option>
                        </div>
                        <span>视频监测</span>
                        <div>
                            <ul class="videoClass">
                                <li v-for="item in videoData">
                                    <video src="item.url" preload height=80 width=100 style="background: #000000;"></video>
                                    <span>{{item.name}}</span>
                                    <p>{{item.num}}</p>
                                </li>

                            </ul>

                        </div>

                    </PanelItem>
                </panel>
            </template>
        </baseLayoutCntent>
        <div class="dialog">
            aaaaaaaaaaaaaa
        </div>
    </div>
</template>

<script>
    // import baseLayoutCntent from "../../layOut/baseLayoutCntent.vue";
    import barOrLineOption from "../../../components/echartsOption/barOrLineOption.vue";

    export default {
        name: '',
        components: {
            // baseLayoutCntent,
            "barOrLine-option": barOrLineOption,
        },
        created() {
            this.creatRingOption(this.travelData);
            this.creatMigrationOption();
            this.$http.$get("getVideoData").then((param) => {//获取摄像机数据
                this.$data.videoData = param.data;
            });
        },
        data() {
            return {
                videoData:[],
                migrationEcharOption: {},
                travelEcharOption: {},
                travelData: [
                    ['出租车', '公交', '地铁', '大巴', '其它'],
                    [
                        {value: 15, name: '出租车'},
                        {value: 45, name: '公交'},
                        {value: 12, name: '地铁'},
                        {value: 15, name: '大巴'},
                        {value: 13, name: '其它'}]
                ],
                passengerTrafficData: [
                    ['客流量'],
                    ['候车区', '出租上客区', '售票大厅', '地铁售票区', '汽车候车区'],
                    [8500, 7600, 5500, 4980, 4800]
                ],
                densityAndVelocityData: [
                    ["客流流速", "客流密度"],
                    ['候车区', '出租上客区', '售票大厅', '地铁售票区', '汽车候车区'],
                    [0.9, 1, 0.9, 0.8, 0.9],
                    [0.5, 1, 0.6, 1.2, 0.4]],
            }
        },
        methods: {
            creatRingOption: function (data) {
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}%"
                    },
                    legend: {
                        // orient: 'vertical',//图例列表布局朝向
                        x: 'right', y: 'top',
                        data: data[0]
                    },

                    grid: {
                        /*x: 80,
                        x2: 40,*/
                        //top: 60,
                        bottom: 0,
                    },
                    series: [
                        {
                            name: '出行分担率',
                            type: 'pie',
                            center:['50%','60%'],
                            radius: ['20%', '58%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    formatter: ' {c}%   ',
                                    // backgroundColor: '#eee',
                                    // borderColor: '#aaa',
                                    // borderWidth: 1,
                                    // borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: data[1]
                        },
                        {
                            type: 'pie',
                            center:['50%','60%'],
                            radius: ["65%", "66%"],
                            hoverAnimation: false,
                            labelLine: {
                                normal: {
                                    show: false,
                                    length: 30,
                                    length2: 55
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            name: "",
                            data: [{
                                name: '',
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: "rgba(32,86,221,0.2)"
                                    }
                                }
                            }]
                        },
                        {
                            type: 'pie',
                            center:['50%','60%'],
                            radius: ["20%", "28%"],
                            hoverAnimation: false,
                            labelLine: {
                                normal: {
                                    show: false,
                                    length: 30,
                                    length2: 55
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            name: "",
                            data: [{
                                name: '',
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: "rgba(255,255,255,0.4)"
                                    }
                                }
                            }]
                        }
                    ]
                }
                this.travelEcharOption = option;
            },
            creatMigrationOption: function () {
                var geoCoordMap = {
                    '福州': [119.4543, 25.9222],
                    '太原': [112.3352, 37.9413],
                    '长春': [125.8154, 44.2584],
                    '重庆': [107.7539, 30.1904],
                    '西安': [109.1162, 34.2004],
                    '成都': [103.9526, 30.7617],
                    '常州': [119.4543, 31.5582],
                    '北京': [116.4551, 40.2539],
                    '北海': [109.314, 21.6211],
                    '海口': [110.3893, 19.8516],
                    '广州': [113.5107, 23.2196]
                };

                var CDData = [
                    [{name: '成都'}, {name: '福州', value: 95}],
                    [{name: '成都'}, {name: '太原', value: 90}],
                    [{name: '成都'}, {name: '长春', value: 80}],
                    [{name: '成都'}, {name: '重庆', value: 70}],
                    [{name: '成都'}, {name: '西安', value: 60}],
                    [{name: '成都'}, {name: '广州', value: 50}],
                    [{name: '成都'}, {name: '常州', value: 40}],
                    [{name: '成都'}, {name: '北京', value: 30}],
                    [{name: '成都'}, {name: '北海', value: 20}],
                    [{name: '成都'}, {name: '海口', value: 10}]
                ];

                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i];
                        var fromCoord = geoCoordMap[dataItem[0].name];
                        var toCoord = geoCoordMap[dataItem[1].name];
                        if (fromCoord && toCoord) {
                            res.push({
                                fromName: dataItem[0].name,
                                toName: dataItem[1].name,
                                value: dataItem[1].value,
                                coords: [fromCoord, toCoord]
                            });
                        }
                    }
                    return res;
                };

                var color = ['#F4E925'];
                var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
                var series = [];
                [['成都', CDData]].forEach(function (item, i) {
                    series.push(
                        {
                            name: item[0] + ' Top10',
                            type: 'lines',
                            zlevel: 2,
                            symbol: ['none', 'arrow'],
                            symbolSize: 5,
                            effect: {
                                show: true,
                                period: 6,
                                symbol: planePath,
                                trailLength: 0,
                                // symbol: 'arrow',
                                symbolSize: 20,
                                color: 'rgb(255,255,255,0.6)'
                            },
                            lineStyle: {
                                normal: {
                                    color: color[i],
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },
                            data: convertData(item[1])
                        },
                        {
                            name: item[0] + ' Top10',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] / 8;
                            },
                            itemStyle: {
                                normal: {
                                    color: color[i]
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[1].name,
                                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                                };
                            })
                        });
                });

                var option = {
                    //backgroundColor: '#404a59',
                    tooltip: {
                        trigger: 'item',
                        // formatter: "{b}: {c}"
                        formatter: function (params) {
                            var res = params.seriesName + "<br/>";
                            if (params.seriesType === 'effectScatter') {
                                res += params.data.name + ':' + params.data.value[2];
                            } else {
                                res += params.data.toName + ':' + params.data.value;
                            }

                            return res;
                        }
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false,
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#404a59'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: series
                };
                this.migrationEcharOption = option;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dong-passengerDepot-index-container {
        width: 100%;
        height: 100%;
        .ringClass {
            .echarts {
                min-height: 161px;
                width: 450px; /* 200/100 */
                height: 200px;
            }
        }
        .barOrLineClass {
            .echarts {
                min-height: 161px;
                width: 450px; /* 200/100 */
                height: 200px;
            }
        }
        .migrationClass {
            .echarts {
                min-height: 161px;
                width: 860px; /* 200/100 */
                height: 800px;
            }
        }


        .dialog {
            background-color: aqua;
            position: fixed;
            left: 50%;
            top: 50%;
        }
        .carNum li {
            display: block;
            float: left;
            width: 32%;
            margin-right: 1%;
            height: 100px;
            background: url('../../../image/emergencyCoordination/ShuangliuAirport/data_yj_bg.png') left no-repeat;
        }
        .videoClass li{
            display: block;
            float: left;
            width: 32%;
            margin-right: 1%;
            height: 150px;

        }
        .videoClass li p{
            text-align: center;
            width:44px;
            height:20px;
            background:rgba(32,86,221,1);
            border-radius:4px;
            margin-right: auto;
            margin-left: auto;
        }
    }





</style>