import echarts from "echarts";
console.log(echarts);

// 饼图
export const option1 ={
    backgroundColor: '#04243E',
    title: {
        text: '50%',
        x: '49%',
        y: '48%',
        textAlign: 'center',
        textStyle: {
            fontWeight: 'bold',
            fontSize: '100%',
            color: '#fff'
        }
    },
    data: [{
        name: '完成率'
    }],
    series: [{ // 主圆环
        name: '完成率',
        type: 'pie',
        radius: ['40%', '70%'],
        startAngle: 225,
        color: [{
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [{
                offset: 0,
                color: 'rgba(47,172,234,1)' // 0% 处的颜色
            }, {
                offset: 1,
                color: 'rgba(47,172,234,.1)' // 100% 处的颜色
            }]
        }, 'transparent'],
        hoverAnimation: true,
        legendHoverLink: false,
        z: 10,
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
            value: 75 * 50 / 100
        }, {
            value: 100 - (75 * 50 / 100)
        }]
    }, { // 背景圆环
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        silent: true,
        startAngle: 225,
        labelLine: {
            normal: {
                show: false
            }
        },
        z: 5,
        data: [{
            value: 75,
            itemStyle: {
                color: '#1A3B4C',
                borderWidth: 2,
                borderColor: '#1c516b'
            }
        }, {
            value: 25,
            itemStyle: {
                color: 'transparent'
            }
        }]
    }, { // 底部
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        startAngle: 230,
        labelLine: {
            show: false
        },
        z: 15,
        silent: true,
        label: {
            show: true,
            rich: {
                a: {
                    color: '#fff',
                    fontSize: '100%',
                    padding: [0, -30, -60, 0]
                },
                b: {
                    color: '#fff',
                    fontSize: '100%',
                    padding: [0, 0, -60, -40]
                }
            },
            formatter: function (val) { // 底部0和100
                if (val.dataIndex === 0) {
                    return '{a|0}'
                }
                if (val.dataIndex === 2) {
                    return '{b|100}'
                }
            }
        },
        data: [{ // 底部两条线
            value: 1,
            itemStyle: {
                color: '#0096e0'
            }
        }, {
            value: 800,
            itemStyle: {
                color: 'transparent'
            }
        }, {
            value: 1,
            itemStyle: {
                color: '#0096e0'
            }
        }, {
            value: 230,
            itemStyle: {
                color: 'transparent'
            }
        }]
    }, { // 背景
        name: '',
        type: 'pie',
        cursor: 'default',
        radius: ['0', '80%'],
        hoverAnimation: false,
        legendHoverLink: false,
        itemStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: 'rgba(38,64,76,0.8)' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: 'rgba(38,64,76,0)' // 100% 处的颜色
                }]
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
            value: 1
        }]
    }, { // 中间圈
        name: '',
        z: 5,
        type: 'pie',
        cursor: 'default',
        radius: ['32%', '32%'],
        hoverAnimation: false,
        legendHoverLink: false,
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
            value: 1,
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(2,144,214,0.8)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(2,144,214,0)' // 100% 处的颜色
                        }]
                    }
                }
            }
        }]
    }]
}



// 折线图

export const option2 =
     {
        // postion: '200',
        // backgroundColor: '#1C2129', //画布背景
        title: {
            // text: '饱和度时变趋势',
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
            data: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                '16:00', '17:00', '18:00',
                '20:00', '21:00', '22:00', '23:00', '23:55'
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
                name: '原方案',
                data: [0.3, 0.9, 0.7, 1.1, 0.5, 0.4, 0.3, 0.8, 0.9, 0.6, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.9, 0.8, 0.3],
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
                name: '建议方案',
                data: [0.4, 0.7, 0.5, 0.9, 0.6, 0.5, 0.4, 0.3, 0.7, 0.4, 0.4, 0.6, 0.7, 0.4, 0.6, 0.5, 0.7, 0.6, 0.2],
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
            data: [{
                    name: '流入',
                    //icon:'image://../wwwroot/js/url2.png', //路径
                },
                {
                    name: '流出',
                }
            ],
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
            data: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
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
                name: '流入',
                type: 'bar',
                data: [4.9, 7.3, 9.2, 5.6, 7.7, 5.6, 4.2, 3.6, 6, 6.4],
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
                name: '流出',
                type: 'bar',
                data: [2.9, 5, 4.4, 2.7, 5.7, 4.6, 1.2, 2.7, 4.8, 6.0],
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