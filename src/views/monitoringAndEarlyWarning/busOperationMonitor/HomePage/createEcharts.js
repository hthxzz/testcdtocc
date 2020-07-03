import echarts from "echarts";

export default {
    methods: {
        createPieOption1(title,color){
            var option = {
                title: {
                    text: '{a|'+ title +'}',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        rich:{
                            a: {
                                fontSize: 18,
                                color: '#fff'
                            },
                            b: {
                                fontSize: 14,
                                color: '#29EEF3',
                                padding: [0,0,14,0]
                            },
                            c: {
                                fontSize: 10,
                                color: '#ffffff',
                                padding: [5,0]
                            }
                        }
                    }
                },
                series: [ {
                    name: '',
                    type: 'pie',
                    radius: ['60%', '82%'],
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '1',
                        itemStyle:{
                            color:color
                        }
                    }
                    ]
                },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['0%', '60%'],
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        },
                        hoverAnimation:false,
                        data: [{
                            value: 100,
                            name: '1',
                            itemStyle:{
                                color:'rgb(12,26,75)'
                            }
                        }
                        ]
                    }]
            };
            return option;
        },
        createPieOption(title,int,unit,lineNum,color){
            var option = {
                title: {
                    text: '{a|'+ title +'}\n{b|'+int+'}{c|'+unit+'}\n{d|'+lineNum+'}{e|条}',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        rich:{
                            a: {
                                fontSize: 12,
                                color: '#fff'
                            },
                            b: {
                                fontSize: 14,
                                color: '#fff',
                                padding: [0,0,5,0]
                            },
                            c: {
                                fontSize: 10,
                                color: '#ffffff',
                                padding: [0,0,5,0,]
                            },
                            d: {
                                fontSize: 14,
                                color: '#fff',
                                padding: [0,0,5,0]
                            },
                            e: {
                                fontSize: 10,
                                color: '#fff',
                                padding: [0,0,5,0,]
                            },
                        }
                    }
                },
                series: [ {
                    name: '',
                    type: 'pie',
                    radius: ['60%', '82%'],
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '1',
                        itemStyle:{
                            color:color
                        }
                    }
                    ]
                },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['0%', '60%'],
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        },
                        hoverAnimation:false,
                        data: [{
                            value: 100,
                            name: '1',
                            itemStyle:{
                                color:'rgb(12,26,75)'
                            }
                        }
                        ]
                    }]
            };
            return option;
        },



        creatOption2: function(data, title, unitName, rotate,interval) {
            const option = {

                // backgroundColor: '#23243a',
                tooltip: {
                    //提示框组件
                    trigger: "axis",
                    formatter: "{b}: {c}",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    },
                    textStyle: {
                        color: "#fff",
                        fontStyle: "normal",
                        fontSize: this.$utils.setSize(14)
                    }
                },
                grid: {
                    //    left: '1%',
                    //     right: '4%',
                    //     bottom: '6%',
                    //     top: 30,
                    //     padding: '0 0 10 0',
                    top: 40,
                    left: 20,
                    right: 50,
                    bottom: 40
                    // containLabel: true,
                },

                yAxis: [
                    {
                        type: "category",
                        boundaryGap: true, //坐标轴两边留白
                        inverse:true,
                        data: data[0],
                        name: unitName,
                        nameLocation:"start",
                        nameTextStyle: {
                            color: "#ffffff",
                            padding: [0, 0, 0, 30] // 四个数字分别为上右下左与原位置距离
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: ["#fff"],
                                opacity: 0.06
                            }
                        },
                        axisLabel: {
                            show: false,
                            inside: false
                        },
                    }
                ],
                xAxis: [
                    {
                        type: "value",

                        // nameLocation: 'end',

                        splitNumber: 5,
                        axisLabel: {
                            show: false,
                            inside: false,
                            textStyle: {
                                color: "#a8aab0",
                                fontStyle: "normal",
                                fontSize: this.$utils.setSize(14)
                            }
                        },

                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: ["#fff"],
                                opacity: 0.06
                            }
                        },

                    }
                ],
                series: [
                    {
                        // name: data[1],
                        type: "pictorialBar",
                        symbol: 'rect',
                        symbolSize: [3, 20],
                        symbolOffset: [0, -0],
                        z: 2,
                        tooltip: {
                            show: false
                        },
                        data: data[1],
                        symbolPosition: 'end',
                        label: {
                            //图形上的文本标签
                            normal: {
                                show: true,
                                position: "right",
                                textStyle: {
                                    color: "#a8aab0",
                                    fontStyle: "normal",
                                    fontSize: this.$utils.setSize(14)
                                }
                            }
                        },
                        itemStyle: {
                            //图形样式
                            normal: {
                                color: "#00FFFF"
                            }
                        }
                    },
                    {
                        // name: data[1],
                        type: "bar",
                        data: data[1],
                        barWidth: 20,
                        barGap: 0, //柱间距离
                        label: {
                            normal: {
                                color: '#00FFFF',
                                show: true,
                                position: [0, '-18px'],
                                textStyle: {
                                    fontSize: 12
                                },
                                formatter: function (a, b) {
                                    return a.name
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    1, 0, 0, 0,
                                    [{
                                        offset: 0,
                                        color: 'rgba(0,255,255,0.4)'
                                    },
                                        {
                                            offset: 0.5,
                                            color: 'rgba(0,255,255,0.2)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'transparent'
                                        }
                                    ]
                                )
                            },

                        },
                    }
                ]
            };
            return option;
        },
        creatOption: function(data, title, unitName, rotate,interval) {
            const option = {
                title: {
                    text: title,
                    subtext: "",
                    x: "center",
                    textStyle: { fontSize: this.$utils.setSize(18), color: "#fff",fontWeight:"normal"}
                },
                // backgroundColor: '#23243a',
                tooltip: {
                    //提示框组件
                    trigger: "axis",
                    formatter: "{b}: {c}",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    },
                    textStyle: {
                        color: "#fff",
                        fontStyle: "normal",
                        fontSize: this.$utils.setSize(14)
                    }
                },
                grid: {
                    //    left: '1%',
                    //     right: '4%',
                    //     bottom: '6%',
                    //     top: 30,
                    //     padding: '0 0 10 0',
                    top: 40,
                    left: 50,
                    right: 50,
                    bottom: 40
                    // containLabel: true,
                },
                // legend: { //图例组件，颜色和名字
                //     // right: 10,
                //     // top: 0,
                //     // itemGap: 16,
                //     // itemWidth: 18,
                //     // itemHeight: 10,
                //     data: data[0],
                //     textStyle: {
                //         color: '#a8aab0',
                //         fontStyle: 'normal',
                //         fontFamily: '微软雅黑',
                //         fontSize: 12,
                //     }
                // },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: true, //坐标轴两边留白
                        data: data[0],
                        axisLabel: {
                            //坐标轴刻度标签的相关设置。
                            interval: interval, //设置为 1，表示『隔一个标签显示一个标签』
                            rotate: rotate,
                            margin: 15,
                            textStyle: {
                                color: "#ffffff",
                                fontStyle: "normal",
                                fontSize: this.$utils.setSize(14)
                            }
                        },
                        axisTick: {
                            //坐标轴刻度相关设置。
                            show: false
                        },
                        axisLine: {
                            //坐标轴轴线相关设置
                            show: false,
                            lineStyle: {
                                color: "#fff",
                                opacity: 0.2
                            }
                        },
                        splitLine: {
                            //坐标轴在 grid 区域中的分隔线。
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: unitName,
                        // nameLocation: 'end',
                        nameTextStyle: {
                            color: "#ffffff",
                            padding: [0, 0, 0, -20] // 四个数字分别为上右下左与原位置距离
                        },
                        splitNumber: 5,
                        axisLabel: {
                            textStyle: {
                                color: "#a8aab0",
                                fontStyle: "normal",
                                fontSize: this.$utils.setSize(14)
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: ["#fff"],
                                opacity: 0.06
                            }
                        }
                    }
                ],
                series: [
                    {
                        // name: data[1],
                        type: "pictorialBar",
                        symbol: 'rect',
                        symbolSize: [20, 3],
                        symbolOffset: [0, -0],
                        z: 2,
                        tooltip: {
                            show: false
                        },
                        data: data[1],
                        symbolPosition: 'end',
                        label: {
                            //图形上的文本标签
                            normal: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    color: "#a8aab0",
                                    fontStyle: "normal",
                                    fontSize: this.$utils.setSize(14)
                                }
                            }
                        },
                        itemStyle: {
                            //图形样式
                            normal: {
                                color: "#00FFFF"
                            }
                        }
                    },
                    {
                        // name: data[1],
                        type: "bar",
                        data: data[1],
                        barWidth: 20,
                        barGap: 0, //柱间距离
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [{
                                        offset: 0,
                                        color: 'rgba(0,255,255,0.4)'
                                    },
                                        {
                                            offset: 0.5,
                                            color: 'rgba(0,255,255,0.2)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'transparent'
                                        }
                                    ]
                                )
                            },

                        },
                    }
                ]
            };
            return option;
        },
    }
}