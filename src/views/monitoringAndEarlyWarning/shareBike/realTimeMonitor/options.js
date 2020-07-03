import echarts from "echarts";

export const option1 =
    {
        grid: {
            left: 50,
            right: 50,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['0','1' ,'2' ,'3' ,'4','5', '6','7', '8','9', '10','11', '12','13', '14','15',
                '16','17', '18'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 1, //设置为 1，表示『隔一个标签显示一个标签』
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
            data: [2000, 2200, 4000, 3000, 3400, 2040, 2230, 3000, 3030, 2000, 3000, 4000,6000
            ,2000,3500.4987,4511,3200,5000,1000],
            barWidth: 5,
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
        ]
    };

export const option2 =
    {
        grid: {
            left: 50,
            right: 50,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['0','1' ,'2' ,'3' ,'4','5', '6','7', '8','9', '10','11', '12','13', '14','15',
                '16','17', '18'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 1, //设置为 1，表示『隔一个标签显示一个标签』
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
            data: [3000, 1200, 4000, 3000, 3400, 2040, 2230, 3000, 3030, 2000, 3000, 4000,6000
                ,3000,3500.3987,4511,4200,1000,5000],
            barWidth: 5,
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
        }]
    };
