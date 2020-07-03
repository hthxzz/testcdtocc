import echarts from "echarts";
console.log(echarts);

export const option1 =
    {
        grid: {
            left: 50,
            right: 50,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18',
                '20', '22','24'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                    color: '#ffffff',
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
            name:'单位: 辆',
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
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
            data: [2000, 2200, 4000, 3000, 3400, 2040, 2230, 3000, 3030, 2000, 3000, 4000,6000],
            barWidth: 10,
            barGap: 0, //柱间距离
            itemStyle: { //图形样式
                normal: {
                    barBorderRadius: [0, 0, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 1,
                        color: '#FFF100'

                    }], false),
                },
            },
        }
        ]
    };

export const option2 =
    {
        grid: {
            left: 50,
            right: 50,
        },
        legend: {
            top: 20,
            textStyle: {
                color: "#fff",
                data: ['数量', '比率']
            },

            itemWidth: 10,
            itemHeight: 10,
        },
        xAxis: [{
            name:'km',
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['<1', '1-2', '2-3', '3-4', '4-5', '>5'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                    color: '#ffffff',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 10,
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
            name:'单位(辆)',
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
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
            },
        },
        {
            name:'比率',
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
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
            name:'数量',
            type: 'bar',
            data: [2000, 2200, 4000, 3000, 3400, 2040],
            barWidth: 10,
            barGap: 0, //柱间距离
            itemStyle: { //图形样式
                normal: {
                    barBorderRadius: [0, 0, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 1,
                        color: '#2056DD'

                    }], false),
                },
            },
        },
        {
            name: '比率',
            type: 'line',
            data: [0.9, 1.0, 1.8, 1.2, 1.5, 0.9],
            smooth: true, //折线是否平滑
            yAxisIndex: 1,
            areaStyle: {
                opacity: 0
            },
            itemStyle: {
                normal: {
                    color: "#FFF100", //小圆点的颜色
                    lineStyle: {
                        color: "#FFF100" //折线的颜色
                    }
                }
            },
        }
        ]
    };

export const option3 =
    {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['', '出发', '到达', ],
                ['武侯区', 43.3, 85.8],
                ['高新区', 83.1, 73.4],
                ['锦江区', 86.4, 65.2],
                ['郫都区', 72.4, 53.9],
                ['双流区', 69.9, 28.9],
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [
            {type: 'bar'},
            {type: 'bar'}
        ]
    };

var x = 0.0187;
export const option4 = {
    color:['#00FCFF','#2056DD'],
    series: [
        {
            type: 'pie',
            hoverAnimation:false,   // 鼠标悬停不放大
            // hoverAnimation:true,
            radius: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: x},
                {value: 1-x},
            ]
        }
    ]
};
