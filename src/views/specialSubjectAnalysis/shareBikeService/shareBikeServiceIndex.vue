<template>
    <div class="share-bike-service-index-container">
        <div class="share-bike-service-index-wrap">
            <div class="share-bike-left">
                <PanelItem title="骑行OD分析">
                    <div class="wrap">
                        <div class="bicycleFlowClass">
                            <v-chart :options="bicycleFlowOption" theme="theme"/>
                        </div>
                        <div class="bicycleOutAndInClass">
                            <div class="cdMapClass">
                                <v-chart :options="mapOption" theme="theme"/>
                            </div>
                            <div class="cdOutAndInClass">
                                <v-chart :options="bicycleOutOrInOption" theme="theme"/>
                            </div>
                        </div>
                    </div>

                </PanelItem>

            </div>
            <div class="share-bike-right">
                <div class="item">
                    <PanelItem title="骑行周转率分析">
                        <div class="turnoverRateClass">
                            <div class="top10Class">
                                <v-chart :options="turnoverRateOption" theme="theme" />
                            </div>

                        </div>

                    </PanelItem>
                </div>
                <div class="item">
                    <PanelItem title="骑行距离分析">
                        <div class="DistanceClass">
                            <div class="top10Class">
                                <v-chart :options="DistanceOption" theme="theme" />
                            </div>

                        </div>
                    </PanelItem>
                </div>
                <div class="item">
                    <PanelItem title="节能减排分析">
                        <div>
                            <div>

                                <Count figure="29345" widthNum="32px" fontNum="28px">
                                    <template #prefix>
                                        <span>今日二氧化碳排放量减少</span>
                                    </template>
                                    <template #suffix>
                                        <span style="font-size: 12px">吨</span>
                                    </template>
                                </Count>
                            </div>
                            <div class="energySavingClass">
                                <div>
                                    <v-chart :options="energySavingPieOption" theme="theme" />
                                </div>
                                <div class="top10Class">
                                    <v-chart :options="energySavingTop10Option" theme="theme" />
                                </div>
                            </div>
                        </div>
                    </PanelItem>
                </div>
            </div>
        </div>
    </div>
</template>
共享单车
<script>
    export default {
        name: '',
        created() {
            this.creatBicycleFlowOption(this.bicycleFlowData);
            this.creatMapOption();
            this.creatOutAndInOption(this.builderJson);
            this.creatTurnoverRateOption(this.turnoverRateData);
            this.creatDistanceOption(this.DistanceData);
            this.creatPieOption(this.energySavingPieData);
            this.creatEnergySavingTop10Option(this.energySavingTop10Data);
        },
        data() {
            return {
                energySavingTop10Option:{},
                energySavingPieOption:{},
                DistanceOption:{},
                turnoverRateOption:{},
                mapOption:{},
                bicycleFlowOption: {},
                bicycleFlowData:[
                    ['武侯区>锦江区','锦江区>青羊区','武侯区>青羊区','武侯区>金牛区','武侯区>成华区','锦江区>青羊区','锦江区>金牛区'],
                    [8,7.5,7,6.7,6.5,6,5.5],
                ],
                builderJson :{
                    "InArea": {
                        "锦江区": 2788,
                        "金牛区": 9575,
                        "青羊区": 9400,
                        "武侯区": 9466,
                        "成华区": 9266,
                        "高新区": 3419,
                        "双流区": 2984,
                        "龙泉驿区": 2739,
                        "温江区": 2744,
                        "新都区": 2466,
                        "郫都区": 3034,
                        "天府新区": 1945

                    },
                    "OutArea": {
                        "天府新区": 1945,
                        "锦江区": 6788,
                        "金牛区": 7575,
                        "成华区": 9266,
                        "高新区": 3419,
                        "双流区": 2984,
                        "龙泉驿区": 3739,
                        "温江区": 2744,
                        "新都区": 2466,
                        "郫都区": 3034,
                        "青羊区": 8400,
                        "武侯区": 9466

                    }
                },
                turnoverRateData:{
                    "legend":['总周转率','摩拜','青桔','OFO','哈啰','其它'],
                    "high":[
                        ['武侯','青羊','锦江','成华','高新','金牛','双流','龙泉驿','新都','郫都'],
                        [90,85,80,78,75,70,66,63,58,53],
                        [100,25,40,88,55,10,16,53,28,73],
                        [80,45,50,18,45,20,26,43,38,63],
                        [90,65,60,28,35,30,36,33,48,53],
                        [60,85,20,38,25,40,46,23,58,43],
                        [90,95,30,48,15,50,56,13,68,33],
                    ],
                    "low":[
                        ['武侯','青羊','锦江','成华','高新','金牛','双流','龙泉驿','新都','郫都'],
                        [90,85,80,78,75,70,66,63,58,53],
                        [100,25,40,88,55,10,16,53,28,73],
                        [80,45,50,18,45,20,26,43,38,63],
                        [90,65,60,28,35,30,36,33,48,53],
                        [60,85,20,38,25,40,46,23,58,43],
                        [90,95,30,48,15,50,56,13,68,33],
                    ]
                },
                DistanceData:{
                    "legend":['总距离','摩拜','青桔','OFO','哈啰','其它'],
                    "high":[
                        ['武侯','青羊','锦江','成华','高新','金牛','双流','龙泉驿','新都','郫都'],
                        [90,85,80,78,75,70,66,63,58,53],
                        [100,25,40,88,55,10,16,53,28,73],
                        [80,45,50,18,45,20,26,43,38,63],
                        [90,65,60,28,35,30,36,33,48,53],
                        [60,85,20,38,25,40,46,23,58,43],
                        [90,95,30,48,15,50,56,13,68,33],
                    ],
                    "low":[
                        ['武侯','青羊','锦江','成华','高新','金牛','双流','龙泉驿','新都','郫都'],
                        [90,85,80,78,75,70,66,63,58,53],
                        [100,25,40,88,55,10,16,53,28,73],
                        [80,45,50,18,45,20,26,43,38,63],
                        [90,65,60,28,35,30,36,33,48,53],
                        [60,85,20,38,25,40,46,23,58,43],
                        [90,95,30,48,15,50,56,13,68,33],
                    ]
                },
                energySavingPieData:[
                    {value: 335, name: '青白江区'},
                    {value: 310, name: '锦江区'},
                    {value: 234, name: '武侯区'},
                    {value: 135, name: '青羊区'},
                    {value: 1548, name: '金牛区'},
                    {value: 335, name: '新都区'},
                    {value: 310, name: '成华区'},
                    {value: 234, name: '双流区'},
                    {value: 135, name: '高新区'},
                    {value: 1548, name: '天府新区'},
                    {value: 335, name: '郫都区'},
                    {value: 310, name: '龙泉驿区'},
                    {value: 234, name: '都江堰市'}
                ],
                energySavingTop10Data:[
                    ['高新区','武侯区','青羊区','成华区','锦江区','金牛区','双流区','龙泉驿区','新都区','温江区'],
                    [980,870,760,650,540,430,320,210,110,90]
                ]

            }
        },
        methods: {
            creatEnergySavingTop10Option:function(energySavingTop10Data){
                var option = {
                    title: {
                        text: '碳减少排放量（万吨）',
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: 14
                        }
                    },
                    grid: {
                        left: '2%',
                        right: 0,
                        bottom: 0,
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: energySavingTop10Data[0],
                        /*axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#ffffff",
                                width: 1,
                                type: "solid",
                                opacity: 0.3
                            }
                        },*/
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 50,
                            show: true,
                            textStyle: {
                                color: "#ffffff",
                            }
                        },
                    }],
                    yAxis: [{
                        // name:'万吨',
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#00c7ff",
                                width: 1,
                                type: "solid"
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#ffffff",
                            }
                        },
                        axisTick: {
                            show: false
                        },

                    }],
                    series: [{
                        type: 'bar',
                        data: energySavingTop10Data[1],
                        barWidth: 15, //柱子宽度
                        //barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                label: {
                                    show : true,
                                    position : 'top',
                                    formatter : "{c}",
                                    textStyle : {color: '#ffffff' }
                                },

                                opacity: 1,
                            }
                        }
                    }]
                };
                this.energySavingTop10Option=option;

            },
            creatPieOption:function(energySavingPieData){
                var option = {
                    title:{
                        text: '节能减排量（吨）',
                        top: 0,
                        left: 0,
                        textStyle: {
                            fontSize: 14
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center:['60%', '60%'],
                            label: {
                                normal: {
                                    formatter: '{b|{b}}\n{hr|}\n{c|{c}吨}',
                                    rich: {
                                        b: {
                                            fontSize: 12,
                                            color: '#fff',
                                            align: 'left',
                                            padding: 4
                                        },
                                        hr: {
                                            borderColor: 'rgba(255,255,255,0.4)',
                                            width: '100%',
                                            borderWidth: 1,
                                            height: 0
                                        },
                                        d: {
                                            fontSize: 12,
                                            color: '#fff',
                                            align: 'left',
                                            padding: 4
                                        },
                                        c: {
                                            fontSize: 12,
                                            color: '#fff',
                                            align: 'center',
                                            padding: 4
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 20,
                                    length2: 20,
                                    lineStyle: {
                                        type: 'solid',
                                        width: 2
                                    }
                                }
                            },
                            data: energySavingPieData
                        }
                    ]
                }
                this.energySavingPieOption=option;
            },
            creatDistanceOption:function(distanceData){
                var arraylist = [];//

                for (var i = 1; i < distanceData.high.length; i++) {
                    var mydata = {};
                    mydata["name"] = distanceData.legend[i-1];
                    mydata["type"] = 'bar';
                    mydata["symbolSize"]=10;
                    // mydata["barWidth"]=15;
                    mydata["xAxisIndex"]= 0,
                        mydata["yAxisIndex"]= 0,
                        mydata["data"] = distanceData.high[i];
                    arraylist.push (mydata);
                }
                for (var i = 1; i < distanceData.low.length; i++) {
                    var mydata = {};
                    mydata["name"] = distanceData.legend[i-1];
                    mydata["type"] = 'bar';
                    mydata["symbolSize"]=10;
                    // mydata["barWidth"]=15;
                    mydata["xAxisIndex"]= 1,
                        mydata["yAxisIndex"]= 1,
                        mydata["data"] = distanceData.low[i];
                    arraylist.push (mydata);
                }

                var option ={

                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}"+"<br>"+"{a}: {c}(公里)"
                    },
                    legend:{
                        x: 'right',
                        y:'top',
                        padding:3,
                        itemGap:2,
                        data:distanceData.legend
                    },
                    title: [
                        {
                            text: '骑行距离最高TOP10（公里）',
                            top: 20,
                            left: 0,
                            textStyle: {
                                fontSize: 14
                            }

                        },
                        {
                            text: '骑行距离最低TOP10（公里）',
                            top:20,
                            left: '51%',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                    ],
                    grid: [{
                        top: 50,
                        width: '49.5%',
                        bottom: 0,
                        left: 0,
                        containLabel: true
                    }, {
                        top: 50,
                        width: '49.5%',
                        bottom: 0,
                        left: '50.1%',
                        containLabel: true
                    }],
                    xAxis: [{
                        gridIndex: 0,
                        type: 'category',
                        data: distanceData.high[0],
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                fontSize: 10,
                                color: '#fff',
                            },
                        },
                        splitLine: {
                            show: false
                        }
                    },
                        {
                            gridIndex: 1,
                            type: 'category',
                            data: distanceData.low[0],
                            axisLabel: {
                                interval: 0,
                                rotate: 0,
                                textStyle: {
                                    fontSize: 10,
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false
                            }
                        }],
                    yAxis: [{
                        gridIndex: 0,
                        show:true,
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    }, {
                        show:true,
                        type: 'value',
                        gridIndex: 1,
                        splitLine: {
                            show: false
                        }
                    }],
                    series: arraylist
                }


                this.DistanceOption=option;

            },
            creatTurnoverRateOption:function(turnoverRateData){
                var arraylist = [];//

                for (var i = 1; i < turnoverRateData.high.length; i++) {
                    var mydata = {};
                    mydata["name"] = turnoverRateData.legend[i-1];
                    mydata["type"] = 'bar';
                    mydata["symbolSize"]=10;
                    // mydata["barWidth"]=15;
                    mydata["xAxisIndex"]= 0,
                    mydata["yAxisIndex"]= 0,
                    mydata["data"] = turnoverRateData.high[i];
                    arraylist.push (mydata);
                }
                for (var i = 1; i < turnoverRateData.low.length; i++) {
                    var mydata = {};
                    mydata["name"] = turnoverRateData.legend[i-1];
                    mydata["type"] = 'bar';
                    mydata["symbolSize"]=10;
                    // mydata["barWidth"]=15;
                    mydata["xAxisIndex"]= 1,
                        mydata["yAxisIndex"]= 1,
                        mydata["data"] = turnoverRateData.low[i];
                    arraylist.push (mydata);
                }

                var option ={

                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}"+"<br>"+"{a}: {c}%"
                    },
                    legend:{
                        x: 'right',
                        y:'top',
                        padding:3,
                        itemGap:2,
                        data:turnoverRateData.legend
                    },
                    title: [
                        {
                            text: '周转率最高Top10',
                            top: 20,
                            left: 0,
                            textStyle: {
                                fontSize: 14
                            }

                        },
                        {
                            text: '周转率最低Top10',
                            top:20,
                            left: '51%',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                    ],
                    grid: [{
                        top: 50,
                         width: '49.5%',
                        bottom: 0,
                        left: 0,
                        containLabel: true
                    }, {
                        top: 50,
                         width: '49.5%',
                        bottom: 0,
                        left: '50.1%',
                        containLabel: true
                    }],
                    xAxis: [{
                        gridIndex: 0,
                        type: 'category',
                        data: turnoverRateData.high[0],
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                fontSize: 10,
                                color: '#fff',
                            },
                        },
                        splitLine: {
                            show: false
                        }
                    },
                        {
                            gridIndex: 1,
                            type: 'category',
                            data: turnoverRateData.low[0],
                            axisLabel: {
                                interval: 0,
                                rotate: 0,
                                textStyle: {
                                    fontSize: 10,
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false
                            }
                        }],
                    yAxis: [{
                        gridIndex: 0,
                        show:true,
                        max:100,
                        axisLabel: {
                            formatter: "{value}%"
                        },
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    }, {
                        show:true,
                        type: 'value',
                        max:100,
                        axisLabel: {
                            formatter: "{value}%"
                        },
                        gridIndex: 1,
                        splitLine: {
                            show: false
                        }
                    }],
                    series: arraylist
                }


                this.turnoverRateOption=option;
            },
            creatOutAndInOption:function(builderJson){

                var option = {

                    tooltip: {},
                    legend:{
                        x: 'left',
                        y:'top',
                        padding:3,
                        itemGap:5,
                        data:['进区','出区']
                    },
                    // title: [{
                    //     text: '在线构建',
                    //     subtext: '总计 ' + builderJson.all,
                    //     x: '25%',
                    //     textAlign: 'center'
                    // }],
                    grid: [{
                        top: 20,
                        // width: '50%',
                        bottom: '50.5%',
                        left: 0,
                        containLabel: true
                    }, {
                        top: '51%',
                        // width: '50%',
                        bottom: 0,
                        left: 0,
                        containLabel: true
                    }],
                    xAxis: [{
                        gridIndex: 0,
                        show:false,
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    }, {
                        show:false,
                        type: 'value',
                        gridIndex: 1,
                        splitLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        gridIndex: 0,
                        type: 'category',
                        data: Object.keys(builderJson.InArea),
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                fontSize: 10,
                                color: '#fff',
                            },
                        },
                        splitLine: {
                            show: false
                        }
                    },
                        {
                        gridIndex: 1,
                        type: 'category',
                        data: Object.keys(builderJson.OutArea),
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                fontSize: 10,
                                color: '#fff',
                            },
                        },
                        splitLine: {
                            show: false
                        }
                    },{
                            gridIndex: 0,
                            type: 'category',
                            show: true,
                            inverse: true,
                            data:Object.keys(builderJson.InArea).map(function (key) {
                                return builderJson.InArea[key];
                            }).reverse(),
                            axisLabel: {
                                    interval: 0,
                                    rotate: 0,
                                textStyle: {
                                    fontSize: 10,
                                    color: '#fff',
                                },
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }

                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            show: true,
                            inverse: true,
                            data: Object.keys(builderJson.OutArea).map(function (key) {
                                return builderJson.OutArea[key];
                            }).reverse(),
                            axisLabel: {
                                interval: 0,
                                rotate: 0,
                                textStyle: {
                                    fontSize: 10,
                                    color: '#fff',
                                },

                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }

                        }],
                    series: [{
                        name:'进区',
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        barWidth:4,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                            }
                        },
                        label: {
                            normal: {
                                position: 'right',
                                show: false
                            }
                        },
                        data: Object.keys(builderJson.InArea).map(function (key) {
                            return builderJson.InArea[key];
                        })
                    },{
                        name:'出区',
                        type: 'bar',
                        stack: 'component',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        z: 3,
                        barWidth:4,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                            }
                        },
                        label: {
                            normal: {
                                position: 'right',
                                show: false
                            }
                        },
                        data: Object.keys(builderJson.OutArea).map(function (key) {
                            return builderJson.OutArea[key];
                        })
                    }]
                }
                this.bicycleOutOrInOption=option;

            },
            creatMapOption:function(){
                var geoCoordMap = {
                    '成都':[104.06,	30.67],
                    '锦江区':[104.08 ,30.67],
                    '青羊区':[104.05,30.68],
                    '金牛区':[104.05 ,30.70],
                    '武侯区':[104.05 ,30.65],
                    '成华区':[104.10 ,30.67],
                    '龙泉驿区':[104.27 ,30.57],
                    '青白江区':[104.23 ,30.88],
                    '新都区':[104.15 ,30.83],
                    '温江区':[103.83 ,30.70],
                    '金堂县':[104.43 ,30.85],
                    '双流区':[103.92 ,30.58],
                    '郫县':[103.88 ,30.82],
                    '大邑县':[103.52 ,30.58],
                    '蒲江县':[103.50 ,30.20],
                    '新津县':[103.82 ,30.42],
                    '都江堰市':[103.62 ,31.00],
                    '彭州市':[103.93 ,30.98],
                    '邛崃市':[103.47 ,30.42],
                    '崇州市':[103.67 ,30.63],
                    '简阳市':[104.550339, 30.390666],
                };
                var data = [
                    {name:'成都',value:190},
                    {name:'锦江区',value:190},
                    {name:'青羊区',value:190},
                    {name:'金牛区',value:190},
                    {name:'武侯区',value:190},
                    {name:'成华区',value:90},
                    {name:'龙泉驿区',value:120},
                    {name:'青白江区',value:120},
                    {name:'新都区',value:120},
                    {name:'温江区',value:120},
                    {name:'金堂县',value:190},
                    {name:'双流区',value:190},
                    {name:'郫县',value:190},
                    {name:'大邑县',value:190},
                    {name:'蒲江县',value:190},
                    {name:'新津县',value:190},
                    {name:'都江堰市',value:90},
                    {name:'彭州市',value:190},
                    {name:'邛崃市',value:190},
                    {name:'崇州市',value:90},
                    {name:'简阳市',value:90},
                ];
                var max = 480, min = 9; // todo
                var maxSize4Pin = 100, minSize4Pin = 20;

                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };


                var     option = {
                    // backgroundColor: '#091c3d',
                    title: {
                        top:20,
                        text: '',
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            color: '#ccc'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            if(typeof(params.value)[2] == "undefined"){
                                return params.name + ' : ' + params.value;
                            }else{
                                return params.name + ' : ' + params.value[2];
                            }
                        }
                    },
                    grid: {
                        left: '5%',
                        right: 0,
                        bottom: 0,
                        top: '15%',
                        containLabel: true
                    },
                    legend: {
                        orient: 'vertical',
                        y: 'bottom',
                        x:'right',
                        data:['pm2.5'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        show: true,
                        map: 'cd',
                        zoom: 1.2,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#110b18',
                                borderColor: '#404a59'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series : [

                        {
                            type: 'map',
                            map: 'cd',
                            geoIndex: 0,
                            // aspectScale: 1.5, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: false,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#FFFFFF',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: data
                        },
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(data.sort(function (a, b) {
                                return b.value - a.value;
                            })),
                            symbolSize: function (val) {
                                return val[2] / 10;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F4E925',
                                    shadowBlur: 10,
                                    // shadowColor: '#05C3F9'
                                }
                            },
                            zlevel: 1
                        },


                    ]}
                    this.mapOption=option;
            },
            creatBicycleFlowOption: function (data) {
                var option = {
                    title: {
                        text: '车流量（万辆）',
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: 14
                        }
                    },
                    grid: {
                        left: '5%',
                        right: 0,
                        bottom: 0,
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: data[0],
                        /*axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#ffffff",
                                width: 1,
                                type: "solid",
                                opacity: 0.3
                            }
                        },*/
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 50,
                            show: true,
                            textStyle: {
                                color: "#ffffff",
                            }
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#00c7ff",
                                width: 1,
                                type: "solid"
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#ffffff",
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        // splitLine: {
                        //     lineStyle: {
                        //         color: "#ffffff",
                        //         opacity: 0.15,
                        //         type: 'dotted'
                        //     }
                        // }
                    }],
                    series: [{
                        type: 'pictorialBar',
                        symbol: 'path://M35,0L35,70L0,70z M35,0L35,70L70,70z',
                        data: data[1],
                        barWidth: 15, //柱子宽度
                        //barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                label: {
                                    show : true,
                                    position : 'top',
                                    formatter : "{c}",
                                    textStyle : {color: '#ffffff' }
                                },
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#0788EE'
                                    }, {
                                        offset: 0.5,
                                        color: '#0788EE'
                                    }, {
                                        offset: 0.5,
                                        color: '#15B8F9'
                                    }, {
                                        offset: 1,
                                        color: '#15B8F9'
                                    }]
                                },
                                opacity: 1,
                            }
                        }
                    }]
                };
                this.bicycleFlowOption=option;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .share-bike-service-index-container {
        width: 100%;
        height: 100%;

        .share-bike-service-index-wrap {
            width: 100%;
            height: 100%;
            display: flex;

            .share-bike-left {
                border: $base-border;
                flex: 895;
                height: 100%;
            }

            .share-bike-right {
                flex: 946;
                margin: 0 10px;
                display: flex;
                flex-direction: column;

                .item {
                    border: $base-border;
                    flex: 1;
                }

                .item:not(:first-child) {
                    margin-top: 10px;
                }
            }

        }
        .bicycleFlowClass{
            height:40%;
            .echarts {
                min-height: 161px;
                width: 400px; /* 200/100 */
                height: 100%;
            }

        }



        .wrap {
            display: flex;
            flex-direction: column;
            height: 100%;
            /* > div{
                flex: 1;
            }*/
            .bicycleFlowClass {
                flex: 2;

                .echarts {
                    min-height: 161px;
                    width: 400px; /* 200/100 */
                    height: 100%;
                }

            }

            .bicycleOutAndInClass {
                flex: 3;
                display: flex;
                flex-direction: row;

                .echarts {
                    min-height: 161px;
                    width: 100%; /* 200/100 */
                    height: 100%;
                }

                .cdMapClass {
                    flex: 3;
                    float: left;


                }

                .cdOutAndInClass {
                    width: 300px;
                    float: left;
                    flex: 2;
                }
            }
        }
        .turnoverRateClass {
            width:100%;
            height:100%;

            .top10Class{
           /*     width:500px;*/
                .echarts {
                    min-height: 161px;
                    width: 100%; /* 200/100 */
                    height: 100%;
                }
            }
        }
        .DistanceClass{
            width:100%;
            height:100%;

            .top10Class{
                /*     width:500px;*/
                .echarts {
                    min-height: 161px;
                    width: 100%; /* 200/100 */
                    height: 100%;
                }
            }
        }
        .energySavingClass{
            display: flex;
            flex-direction: row;
            height: 100%;
            > div{
                flex: 1;
            }
            .echarts {
                min-height: 200px;
                width: 100%; /* 200/100 */
                height: 100%;
            }
        }
    }

</style>