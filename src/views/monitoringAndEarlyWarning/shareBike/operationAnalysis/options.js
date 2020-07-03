import echarts from "echarts";
console.log(echarts);
// 折线图
export const option2 =
    {
        // postion: '200',
        // backgroundColor: '#1C2129', //画布背景
        // text: '饱和度时变趋势',
        title: {
            x: "center",
            y: "-5",
            textStyle: {
                fontSize: 16,
                color: '#fff'
            }
        },
        grid: {
            left: 50,
            right:50
        },
        legend: {
            icon: 'line',
            top: 20,
            textStyle: {
                color: "#fff",
                data: ['原方案', '建议方案']
            },

            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: { //x轴
            type: 'category',
            boundaryGap: false, //坐标轴两边留白策略
            data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10',
                '2019-11', '2019-12',
            ],
            axisLabel: {
                interval: 0,
                rotate: -40,
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
        },
        yAxis: { //y轴
            name:'万辆',
            min: 0,
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                },
            },
            axisLine: {
                "show": false,
                lineStyle: {
                    color: '#fff'
                }
            },
        },
        series: [{
            data: [20000, 22000, 40000, 30000, 34000, 20450, 20230, 30000, 30030, 20000, 30000, 40000],
            type: 'line',
            smooth: true, //折线是否平滑
            areaStyle: {
                opacity: 0
            },
            itemStyle: {
                normal: {
                    color: "#197CD8", //小圆点的颜色
                    lineStyle: {
                        color: "#197CD8" //折线的颜色
                    }
                }
            },
        },
        ]
    };



export const option3 =
    {
        // backgroundColor: '#23243a',
        tooltip: { //提示框组件
            trigger: 'axis',
            formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
            axisPointer: {
                type: 'shadow',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        grid: {
            //    left: '1%',
            //     right: '4%',
            //     bottom: '6%',
            //     top: 30,
            //     padding: '0 0 10 0',
            left: 50,
            right: 50,
            // containLabel: true,
        },
        legend: { //图例组件，颜色和名字
            // right: 10,
            // top: 0,
            // itemGap: 16,
            // itemWidth: 18,
            // itemHeight: 10,
            // data: [{
            //         name: '流入',
            //         //icon:'image://../wwwroot/js/url2.png', //路径
            //     },
            //     {
            //         name: '流出',
            //     }
            // ],
            textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10',
                '2019-11', '2019-12'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                    color: '#078ceb',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisTick: { //坐标轴刻度相关设置。
                show: false,
            },
            axisLine: { //坐标轴轴线相关设置
                lineStyle: {
                    color: '#fff',
                    opacity: 0.2
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
            }
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#fff'],
                    opacity: 0.06
                }
            }

        }],
        series: [{
            type: 'bar',
            data: [20000, 22000, 40000, 30000, 34000, 20450, 20230, 30000, 30030, 20000, 30000, 40000],
            barWidth: 10,
            barGap: 0, //柱间距离
            label: { //图形上的文本标签
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#a8aab0',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    },
                },
            },
            itemStyle: { //图形样式
                normal: {
                    barBorderRadius: [5, 5, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 1,
                        color: 'rgba(127, 128, 225, 0.7)'
                    }, {
                        offset: 0.9,
                        color: 'rgba(72, 73, 181, 0.7)'
                    }, {
                        offset: 0.31,
                        color: 'rgba(0, 208, 208, 0.7)'
                    }, {
                        offset: 0.15,
                        color: 'rgba(0, 208, 208, 0.7)'
                    }, {
                        offset: 0,
                        color: 'rgba(104, 253, 255, 0.7)'
                    }], false),
                },
            },
        }
        ]
    };

export const option5 =
    {
        // postion: '200',
        // backgroundColor: '#1C2129', //画布背景
        // text: '饱和度时变趋势',
        title: {
            x: "center",
            y: "-5",
            textStyle: {
                fontSize: 16,
                color: '#fff'
            }
        },
        grid: {
            left: 50,
            right:50
        },
        legend: {
            icon: 'line',
            top: 20,
            textStyle: {
                color: "#fff",
                data: ['原方案', '建议方案']
            },

            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: { //x轴
            type: 'category',
            boundaryGap: false, //坐标轴两边留白策略
            data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10',
                '2019-11', '2019-12',
            ],
            axisLabel: {
                interval: 0,
                rotate: -40,
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
        },
        yAxis: { //y轴
            name:'车辆数',
            min: 0,
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                },
            },
            axisLine: {
                "show": false,
                lineStyle: {
                    color: '#fff'
                }
            },
        },
        series: [{
            data: [20000, 22000, 40000, 30000, 34000, 20450, 20230, 30000, 30030, 20000, 30000, 40000],
            type: 'line',
            smooth: true, //折线是否平滑
            areaStyle: {
                opacity: 0
            },
            itemStyle: {
                normal: {
                    color: "#197CD8", //小圆点的颜色
                    lineStyle: {
                        color: "#197CD8" //折线的颜色
                    }
                }
            },
        },
            {
                data: [20020, 32000, 20400, 30400, 34000, 30450, 30230, 40000, 20030, 40000, 30000, 20000],
                type: 'line',
                smooth: true, //是否平滑
                areaStyle: {
                    opacity: 0
                },
                itemStyle: {
                    normal: {
                        color: "#2B9F50", //小圆点的颜色
                        lineStyle: {
                            color: "#2B9F50" //折线的颜色
                        }
                    }
                },
            },
            {
                data: [30020, 22000, 30400, 30400, 24000, 20450, 20230, 40000, 20030, 30000, 20000, 40000],
                type: 'line',
                smooth: true, //是否平滑
                areaStyle: {
                    opacity: 0
                },
                itemStyle: {
                    normal: {
                        color: "#2B9F50", //小圆点的颜色
                        lineStyle: {
                            color: "#2B9F50" //折线的颜色
                        }
                    }
                },
            },
        ]
    };



export const option6 =
    {
        // backgroundColor: '#23243a',
        tooltip: { //提示框组件
            trigger: 'axis',
            formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
            axisPointer: {
                type: 'shadow',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        grid: {
            //    left: '1%',
            //     right: '4%',
            //     bottom: '6%',
            //     top: 30,
            //     padding: '0 0 10 0',
            left: 50,
            right: 50,
            // containLabel: true,
        },
        legend: { //图例组件，颜色和名字
            // right: 10,
            // top: 0,
            // itemGap: 16,
            // itemWidth: 18,
            // itemHeight: 10,
            // data: [{
            //         name: '流入',
            //         //icon:'image://../wwwroot/js/url2.png', //路径
            //     },
            //     {
            //         name: '流出',
            //     }
            // ],
            textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10',
                '2019-11', '2019-12'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                    color: '#078ceb',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisTick: { //坐标轴刻度相关设置。
                show: false,
            },
            axisLine: { //坐标轴轴线相关设置
                lineStyle: {
                    color: '#fff',
                    opacity: 0.2
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
            }
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#fff'],
                    opacity: 0.06
                }
            }

        }],
        series: [{
            type: 'bar',
            data: [20000, 22000, 40000, 30000, 34000, 20450, 20230, 30000, 30030, 20000, 30000, 40000],
            barWidth: 10,
            barGap: 0, //柱间距离
            label: { //图形上的文本标签
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#a8aab0',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    },
                },
            },
            itemStyle: { //图形样式
                normal: {
                    barBorderRadius: [5, 5, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 1,
                        color: 'rgba(127, 128, 225, 0.7)'
                    }, {
                        offset: 0.9,
                        color: 'rgba(72, 73, 181, 0.7)'
                    }, {
                        offset: 0.31,
                        color: 'rgba(0, 208, 208, 0.7)'
                    }, {
                        offset: 0.15,
                        color: 'rgba(0, 208, 208, 0.7)'
                    }, {
                        offset: 0,
                        color: 'rgba(104, 253, 255, 0.7)'
                    }], false),
                },
            },
        },
            {
                type: 'bar',
                data: [20020, 32000, 20400, 30400, 34000, 30450, 30230, 40000, 20030, 40000, 30000, 20000],
                barWidth: 10,
                barGap: 0.2, //柱间距离
                label: { //图形上的文本标签
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#a8aab0',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        },
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1,
                            color: 'rgba(127, 128, 225, 0.7)'
                        }, {
                            offset: 0.9,
                            color: 'rgba(72, 73, 181, 0.7)'
                        }, {
                            offset: 0.25,
                            color: 'rgba(226, 99, 74, 0.7)'
                        }, {
                            offset: 0,
                            color: 'rgba(253, 200, 106, 0.7)'
                        }], false),
                    },
                },
            },
            {
                type: 'bar',
                data: [30020, 22000, 30400, 30400, 24000, 20450, 20230, 40000, 20030, 30000, 20000, 40000],
                barWidth: 10,
                barGap: 0.2, //柱间距离
                label: { //图形上的文本标签
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#a8aab0',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        },
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1,
                            color: 'rgba(127, 128, 225, 0.7)'
                        }, {
                            offset: 0.9,
                            color: 'rgba(72, 73, 181, 0.7)'
                        }, {
                            offset: 0.25,
                            color: 'rgba(226, 99, 74, 0.7)'
                        }, {
                            offset: 0,
                            color: 'rgba(253, 200, 106, 0.7)'
                        }], false),
                    },
                },
            }
        ]
    };



var data = [{
    name: '装备制造',
    value: 54
}
]

var titleArr = [],
    seriesArr = [],
    colors = [
        ['#389af4', '#dfeaff'],
        ['#ff8c37', '#ffdcc3'],
        ['#ffc257', '#ffedcc'],
        ['#fd6f97', '#fed4e0'],
        ['#a181fc', '#e3d9fe']
    ];
data.forEach(function (item, index) {
    titleArr.push({
        text: item.name,
        left: index * 20 + 10 + '%',
        top: '65%',
        textAlign: 'center',
        textStyle: {
            fontWeight: 'normal',
            fontSize: '16',
            color: colors[index][0],
            textAlign: 'center',
        },
    });
    seriesArr.push({
        name: item.name,
        type: 'pie',
        clockWise: false,
        radius: [60, 70],
        itemStyle: {
            normal: {
                color: colors[index][0],
                shadowColor: colors[index][0],
                shadowBlur: 0,
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
            }
        },
        hoverAnimation: false,
        center: [index * 20 + 10 + '%', '50%'],
        data: [{
            value: item.value,
            label: {
                normal: {
                    formatter: function (params) {
                        return params.value + '%';
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold',
                        color: colors[index][0]
                    }
                }
            },
        }, {
            value: 100 - item.value,
            name: 'invisible',
            itemStyle: {
                normal: {
                    color: colors[index][1]
                },
                emphasis: {
                    color: colors[index][1]
                }
            }
        }]
    })
});


export const option4  = {
    backgroundColor: "#09193e",
    title: titleArr,
    series: seriesArr
}