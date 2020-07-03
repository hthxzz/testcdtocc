import echarts from "echarts";

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
                data: ['去年同期', '查询时间']
            },

            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: { //x轴
            type: 'category',
            boundaryGap: true, //坐标轴两边留白策略
            data: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                '16:00', '17:00', '18:00',
                '20:00', '21:00', '22:00', '23:00', '23:55'
            ],
            axisLabel: {
                interval: 0,
                margin: 15,
                textStyle: {
                    fontSize: 12,
                    color: '#a8aab0'
                }
            },
            axisTick: { //坐标轴刻度相关设置。
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    opacity: 0.2
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
                type: 'dashed',
                opacity: 0.6
            }
        },
        yAxis: { //y轴
            min: 0,
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: "#a8aab0",
                    opacity: 0.6
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 12,
                    color: '#a8aab0'
                },
            },

            axisTick: {
                show: false
            },
            axisLine: {
                "show": false,
                lineStyle: {
                    color: '#fff'
                }
            },
        },
        series: [{
                name: '去年同期',
                data: [0.3, 0.9, 0.7, 1.1, 0.5, 0.4, 0.3, 0.8, 0.9, 0.6, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.9, 0.8, 0.3],
                type: 'line',
                smooth: true, //折线是否平滑
                areaStyle: {
                    opacity: 0
                },
                itemStyle: {
                    normal: {
                        color: "rgba(32, 86, 221, 1)", //小圆点的颜色
                        width:6,
                        lineStyle: {
                            color: "rgba(32, 86, 221, 1)", //折线的颜色
                            // width:3
                        }
                    }
                },
            },
            {
                name: '查询时间',
                data: [0.4, 0.7, 0.5, 0.9, 0.6, 0.5, 0.4, 0.3, 0.7, 0.4, 0.4, 0.6, 0.7, 0.4, 0.6, 0.5, 0.7, 0.6, 0.2],
                type: 'line',
                smooth: true, //是否平滑
                areaStyle: {
                    opacity: 0
                },
                itemStyle: {
                    normal: {
                        color: "rgba(255, 255, 0, 1)", //小圆点的颜色
                        lineStyle: {
                            color: "rgba(255, 255, 0, 1)" //折线的颜色
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
                    name: '去年同期',
                    //icon:'image://../wwwroot/js/url2.png', //路径
                },
                {
                    name: '查询时间',
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
                    color: '#a8aab0',
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
                type: 'dashed',
                opacity: 0.6
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
                    color: ['#a8aab0'],
                    type: 'dashed',
                    opacity: 0.6
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
                        color: "rgba(32, 86, 221, 1)", //小圆点的颜色
                        lineStyle: {
                            color: "rgba(32, 86, 221, 1)" //折线的颜色
                        }
                        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        //     offset: 1,
                        //     color: 'rgba(127, 128, 225, 0.7)'
                        // }, {
                        //     offset: 0.9,
                        //     color: 'rgba(72, 73, 181, 0.7)'
                        // }, {
                        //     offset: 0.31,
                        //     color: 'rgba(0, 208, 208, 0.7)'
                        // }, {
                        //     offset: 0.15,
                        //     color: 'rgba(0, 208, 208, 0.7)'
                        // }, {
                        //     offset: 0,
                        //     color: 'rgba(104, 253, 255, 0.7)'
                        // }], false),
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
                        color: "rgba(255, 255, 0, 1)", //小圆点的颜色
                        lineStyle: {
                            color: "rgba(255, 255, 0, 1)" //折线的颜色
                        }
                        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        //     offset: 1,
                        //     color: 'rgba(127, 128, 225, 0.7)'
                        // }, {
                        //     offset: 0.9,
                        //     color: 'rgba(72, 73, 181, 0.7)'
                        // }, {
                        //     offset: 0.25,
                        //     color: 'rgba(226, 99, 74, 0.7)'
                        // }, {
                        //     offset: 0,
                        //     color: 'rgba(253, 200, 106, 0.7)'
                        // }], false),
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


    var chinaGeoCoordMap = {
        "福建": [119.4543, 25.9222],
        "泉州": [118.4543, 25.0222],
        '大庆': [126.9688, 45.868],
        '内蒙古': [110.3467, 41.4899],
        "吉林": [125.8154, 44.2584],
        '北京': [116.4551, 40.2539],
        "辽宁": [123.1238, 42.1216],
        "河北": [114.4995, 38.1006],
        "天津": [117.4219, 39.4189],
        "山西": [112.3352, 37.9413],
        "陕西": [109.1162, 34.2004],
        "甘肃": [103.5901, 36.3043],
        "宁夏": [106.3586, 38.1775],
        "青海": [101.4038, 36.8207],
        "新疆": [87.9236, 43.5883],
        "西藏": [91.11, 29.97],
        "四川": [103.9526, 30.7617],
        "重庆": [108.384366, 30.439702],
        "山东": [117.1582, 36.8701],
        "河南": [113.4668, 34.6234],
        "江苏": [118.8062, 31.9208],
        "安徽": [117.29, 32.0581],
        "湖北": [114.3896, 30.6628],
        "浙江": [119.5313, 29.8773],
        '黑龙江': [127.9688, 45.368],
        "江西": [116.0046, 28.6633],
        "湖南": [113.0823, 28.2568],
        "贵州": [106.6992, 26.7682],
        "云南": [102.9199, 25.4663],
        "广东": [113.12244, 23.009505],
        "广西": [108.479, 23.1152],
        "海南": [110.3893, 19.8516],
        '上海': [121.4648, 31.2891]
    };
var chinaDatas = [
    [{
        name: '黑龙江',
        value: 0.88
    }],
    [{
        name: '内蒙古',
        value: 0.12
    }],
    [{
        name: '吉林',
        value: 0.89
    }],
    [{
        name: '辽宁',
        value: 0.86
    }],
    [{
        name: '河北',
        value: 0.88
    }],
    [{
        name: '北京',
        value: 0.83
    }],
    [{
        name: '天津',
        value: 0.71
    }],
    [{
        name: '山西',
        value: 0.63
    }],
    [{
        name: '陕西',
        value: 0.56
    }],
    [{
        name: '宁夏',
        value: 0.17
    }],
    [{
        name: '云南',
        value: 0.11
    }],
    [{
        name: '四川',
        value: 1
    }],
    [{
        name: '重庆',
        value: 0.80
    }],
    [{
        name: '山东',
        value: 0.77
    }],
    [{
        name: '河南',
        value: 0.75
    }],
    [{
        name: '江苏',
        value: 0.88
    }],
    [{
        name: '安徽',
        value: 0.73
    }],
    [{
        name: '湖北',
        value: 0.75
    }],
    [{
        name: '浙江',
        value: 0.82
    }],
    [{
        name: '福建',
        value: 0.67
    }],
    [{
        name: '江西',
        value: 0.71
    }],
    [{
        name: '湖南',
        value: 0.75
    }],
    [{
        name: '广东',
        value: 0.78
    }],
    [{
        name: '海南',
        value: 0.1
    }],
    [{
        name: '新疆',
        value: 0
    }],
    [{
        name: '上海',
        value: 0.91
    }]
];

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = chinaGeoCoordMap[dataItem[0].name];
        var toCoord = [119.4543, 25.9222]; //目的点
        if (fromCoord && toCoord) {
            res.push([{
                coord: fromCoord,
                value: dataItem[0].value
            }, {
                coord: toCoord,
            }]);
        }
    }
    return res;
};
var series = [];
[
    ['泉州', chinaDatas]
].forEach(function (item, i) {
    series.push({
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 5, //图标大小
            },
            lineStyle: {
                normal: {
                    width: 1, //尾迹线条宽度
                    opacity: 1, //尾迹线条透明度
                    curveness: .3 //尾迹线条曲直度
                }
            },
            data: convertData(item[1])
        }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: { //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                normal: {
                    show: true,
                    position: 'right', //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: function (params) { //圆环显示文字
                        return params.data.name;
                    },
                    fontSize: 13
                },
                emphasis: {
                    show: true
                }
            },
            symbol: 'circle',
            symbolSize: function (val) {
                return 5 + val[2] * 5; //圆环大小 
            },
            itemStyle: {
                normal: {
                    show: false,
                    color: '#f00'
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[0].name,
                    value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                };
            }),
        },
        //被攻击点
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                period: 4,
                brushType: 'stroke',
                scale: 4
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    //offset:[5, 0],
                    // 
                    color: '#0f0',
                    formatter: '{b}',
                    textStyle: {
                        color: "#0f0"
                    }
                },
                emphasis: {
                    show: true,
                    color: "#f60"
                }
            },
            symbol: 'pin',
            symbolSize: 50,
            data: [{
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
            }],
        }
    );
});






export const option5 = {
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(166, 200, 76, 0.82)',
        borderColor: '#FFFFCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
            return res;
        }
    },
    backgroundColor: "#013954",
    visualMap: { //图例值控制
        min: 0,
        max: 1,
        calculable: true,
        show: true,
        color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        zoom: 1.2,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true, //是否允许缩放
        itemStyle: {
            normal: {
                color: 'rgba(51, 69, 89, .5)', //地图背景色
                borderColor: '#516a89', //省市边界线00fcff 516a89
                borderWidth: 1
            },
            emphasis: {
                color: 'rgba(37, 43, 61, .5)' //悬浮背景
            }
        }
    },
    series: series
};