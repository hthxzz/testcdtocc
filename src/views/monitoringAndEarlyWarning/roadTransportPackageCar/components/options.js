import echarts from "echarts";
import {
    scdata
} from "./scMapData.js";
echarts.registerMap("cd", scdata)
// 饼图
export const option1 = {
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

export const option2 = {
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
        right: 50
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
            name: '去年同期',
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
            name: '查询时间',
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



export const option3 = {
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
            name: '去年同期',
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
            name: '查询时间',
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
}]

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


export const option4 = {
    backgroundColor: "#09193e",
    title: titleArr,
    series: seriesArr
}


var geoCoordMap = {
    '上海': [121.4648, 31.2891],
    '东莞': [113.8953, 22.901],
    '东营': [118.7073, 37.5513],
    '中山': [113.4229, 22.478],
    '临汾': [111.4783, 36.1615],
    '临沂': [118.3118, 35.2936],
    '丹东': [124.541, 40.4242],
    '丽水': [119.5642, 28.1854],
    '乌鲁木齐': [87.9236, 43.5883],
    '佛山': [112.8955, 23.1097],
    '保定': [115.0488, 39.0948],
    '兰州': [103.5901, 36.3043],
    '包头': [110.3467, 41.4899],
    '北京': [116.4551, 40.2539],
    '北海': [109.314, 21.6211],
    '南京': [118.8062, 31.9208],
    '南宁': [108.479, 23.1152],
    '南昌': [116.0046, 28.6633],
    '南通': [121.1023, 32.1625],
    '厦门': [118.1689, 24.6478],
    '台州': [121.1353, 28.6688],
    '合肥': [117.29, 32.0581],
    '呼和浩特': [111.4124, 40.4901],
    '咸阳': [108.4131, 34.8706],
    '哈尔滨': [127.9688, 45.368],
    '唐山': [118.4766, 39.6826],
    '嘉兴': [120.9155, 30.6354],
    '大同': [113.7854, 39.8035],
    '大连': [122.2229, 39.4409],
    '天津': [117.4219, 39.4189],
    '太原': [112.3352, 37.9413],
    '威海': [121.9482, 37.1393],
    '宁波': [121.5967, 29.6466],
    '宝鸡': [107.1826, 34.3433],
    '宿迁': [118.5535, 33.7775],
    '常州': [119.4543, 31.5582],
    '广州': [113.5107, 23.2196],
    '廊坊': [116.521, 39.0509],
    '延安': [109.1052, 36.4252],
    '张家口': [115.1477, 40.8527],
    '徐州': [117.5208, 34.3268],
    '德州': [116.6858, 37.2107],
    '惠州': [114.6204, 23.1647],
    '成都': [103.9526, 30.7617],
    '扬州': [119.4653, 32.8162],
    '承德': [117.5757, 41.4075],
    '拉萨': [91.1865, 30.1465],
    '无锡': [120.3442, 31.5527],
    '日照': [119.2786, 35.5023],
    '昆明': [102.9199, 25.4663],
    '杭州': [119.5313, 29.8773],
    '枣庄': [117.323, 34.8926],
    '柳州': [109.3799, 24.9774],
    '株洲': [113.5327, 27.0319],
    '武汉': [114.3896, 30.6628],
    '汕头': [117.1692, 23.3405],
    '江门': [112.6318, 22.1484],
    '沈阳': [123.1238, 42.1216],
    '沧州': [116.8286, 38.2104],
    '河源': [114.917, 23.9722],
    '泉州': [118.3228, 25.1147],
    '泰安': [117.0264, 36.0516],
    '泰州': [120.0586, 32.5525],
    '济南': [117.1582, 36.8701],
    '济宁': [116.8286, 35.3375],
    '海口': [110.3893, 19.8516],
    '淄博': [118.0371, 36.6064],
    '淮安': [118.927, 33.4039],
    '深圳': [114.5435, 22.5439],
    '清远': [112.9175, 24.3292],
    '温州': [120.498, 27.8119],
    '渭南': [109.7864, 35.0299],
    '湖州': [119.8608, 30.7782],
    '湘潭': [112.5439, 27.7075],
    '滨州': [117.8174, 37.4963],
    '潍坊': [119.0918, 36.524],
    '烟台': [120.7397, 37.5128],
    '玉溪': [101.9312, 23.8898],
    '珠海': [113.7305, 22.1155],
    '盐城': [120.2234, 33.5577],
    '盘锦': [121.9482, 41.0449],
    '石家庄': [114.4995, 38.1006],
    '福州': [119.4543, 25.9222],
    '秦皇岛': [119.2126, 40.0232],
    '绍兴': [120.564, 29.7565],
    '聊城': [115.9167, 36.4032],
    '肇庆': [112.1265, 23.5822],
    '舟山': [122.2559, 30.2234],
    '苏州': [120.6519, 31.3989],
    '莱芜': [117.6526, 36.2714],
    '菏泽': [115.6201, 35.2057],
    '营口': [122.4316, 40.4297],
    '葫芦岛': [120.1575, 40.578],
    '衡水': [115.8838, 37.7161],
    '衢州': [118.6853, 28.8666],
    '西宁': [101.4038, 36.8207],
    '西安': [109.1162, 34.2004],
    '贵阳': [106.6992, 26.7682],
    '连云港': [119.1248, 34.552],
    '邢台': [114.8071, 37.2821],
    '邯郸': [114.4775, 36.535],
    '郑州': [113.4668, 34.6234],
    '鄂尔多斯': [108.9734, 39.2487],
    '重庆': [107.7539, 30.1904],
    '金华': [120.0037, 29.1028],
    '铜川': [109.0393, 35.1947],
    '银川': [106.3586, 38.1775],
    '镇江': [119.4763, 31.9702],
    '长春': [125.8154, 44.2584],
    '长沙': [113.0823, 28.2568],
    '长治': [112.8625, 36.4746],
    '阳泉': [113.4778, 38.0951],
    '青岛': [120.4651, 36.3373],
    '韶关': [113.7964, 24.7028],

    '德阳': [104.408064, 31.13457],
    '南充': [106.119012, 30.849273],
    '遂宁': [105.603888, 30.543212],
    '自贡': [104.77601, 29.345528],
    '乐山': [103.773357, 29.558887],
    '雅安': [103.00527, 30.016266],
    '泸州': [105.45671, 28.872932],
    '宜宾': [104.647229, 28.759507],
    '都江堰': [103.584785, 31.043527],
    '广元': [105.852252, 32.458363],
    '绵阳': [104.656427, 31.486035],
    '达州': [107.475813, 31.268994],
    '甘孜州': [101.280523, 31.075205],
    '阿坝州': [102.756906, 32.820293],

};

var GZData = [
    [{
        name: '成都'
    }, {
        name: '德阳',
        value: 95
    }],
    [{
        name: '成都'
    }, {
        name: '南充',
        value: 90
    }],
    [{
        name: '成都'
    }, {
        name: '遂宁',
        value: 80
    }],
    [{
        name: '成都'
    }, {
        name: '自贡',
        value: 70
    }],
    [{
        name: '成都'
    }, {
        name: '乐山',
        value: 60
    }],
    [{
        name: '成都'
    }, {
        name: '雅安',
        value: 50
    }],
    [{
        name: '成都'
    }, {
        name: '泸州',
        value: 40
    }],
    [{
        name: '成都'
    }, {
        name: '宜宾',
        value: 30
    }],
    [{
        name: '成都'
    }, {
        name: '都江堰',
        value: 20
    }],
    [{
        name: '成都'
    }, {
        name: '广元',
        value: 10
    }],
    [{
        name: '成都'
    }, {
        name: '甘孜州',
        value: 100
    }],
    [{
        name: '成都'
    }, {
        name: '阿坝州',
        value: 106
    }]
];

var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
var type = "流出";
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if ("流入" == type) {
            fromCoord = geoCoordMap[dataItem[1].name];
            toCoord = geoCoordMap[dataItem[0].name];
        }
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[1].value
            });
        }
    }
    return res;
};

var color = ['rgba(255,255,255,0.8)', '#ffa022', 'rgba(32, 86, 221, 0.8)'];
var series = [];
var tempData = ['成都', GZData];
series.push({
    name: tempData[0],
    type: 'lines',
    zlevel: 1,
    effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 3
    },
    lineStyle: {
        normal: {
            color: color[0],
            width: 0,
            curveness: 0.2
        }
    },
    data: convertData(tempData[1])
}, {
    name: tempData[0],
    type: 'lines',
    zlevel: 2,
    effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: 'circle',
        symbolSize: 15
    },
    lineStyle: {
        normal: {
            color: color[0],
            width: 1,
            opacity: 0.4,
            curveness: 0.2
        }
    },
    data: convertData(tempData[1])
}, {
    name: tempData[0],
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 2,
    rippleEffect: {
        brushType: 'stroke'
    },
    symbol: 'circle',
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
            color: color[0]
        }
    },
    data: tempData[1].map(function (dataItem) {
        return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
        };
    })
});






export const option5 = {
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(12, 38, 92, 0.82)',
        borderColor: '#FFFFCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            if (params.seriesType == "effectScatter") {
                var res = "";
                var name = params.data.name;
                var value = params.data.value[2];
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }

        }
    },
    backgroundColor: "transparent",
    // visualMap: { //图例值控制
    //     min: 0,
    //     max: 1,
    //     calculable: true,
    //     show: true,
    //     color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
    //     textStyle: {
    //         color: '#fff'
    //     }
    // },
    geo: {
        map: 'cd',
        zoom: 1.2,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true, //是否允许缩放
        itemStyle: {
            normal: {
                color: 'rgba(12, 38, 92, .5)', //地图背景色
                borderColor: '#516a89', //省市边界线00fcff 516a89
                borderWidth: 1
            },
            areaStyle:{
                color: 'rgba(12, 38, 92, 0.82)',
            },
            emphasis: {
                color: 'rgba(37, 43, 61, .5)' //悬浮背景
            }
        }
    },
    series: series
};