import _ from "lodash";
import 'echarts-liquidfill';
import echarts from "echarts";
import {
    setOptionSize
} from "@/untils/rem.js";
const _baseOption = {
    title: {
        text: '',
        textStyle: {
            color: "#fff",
            fontWeight: 100,
            fontSize: setOptionSize(16)
        },
        subtext: '',
        left: 'center',
        top: 10,
    },
    tooltip: {
        trigger: 'axis',
        show: true,
    },
    grid: {
        bottom: '30',
        top: 30,
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
        data: [],
        left: "right",
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
        data: [],
        // data: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        axisLabel: { //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            margin: 15,
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: "14",
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
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: setOptionSize(14),
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
                color: "rgba(255, 255, 255, .2)",
                type: 'dashed',
                opacity: 0.6
            }
        }

    }],
    color: ["rgba(32, 86, 221, 1)", "rgba(255, 255, 0, 1)", "rgba(0, 176, 80, 1)", "rgba(114, 246, 250, 1)", "rgba(204, 145, 226, 1)", "rgba(102, 116, 100, 1)", "rgba(86, 251, 161, 1)", "rgba(32, 161, 221, 1)", "rgba(132, 167, 253, 1)"],
    series: []
};
/**
 * 
 * @param {*} config xAxisData  legendData seriesData
 * @param {*} data legend
 */
const colors = ["rgba(32, 86, 221, 0.8)", "rgba(255, 255, 0, 1)", "rgba(0, 176, 80, 1)", "rgba(114, 246, 250, 1)", "rgba(204, 145, 226, 1)", "rgba(102, 116, 100, 1)", "rgba(86, 251, 161, 1)", "rgba(32, 161, 221, 1)", "rgba(132, 167, 253, 1)"];
const getLineOption = (data = {}, config = {}) => {

    const baseOption = JSON.parse(JSON.stringify(_baseOption));
    const lineOption = _.merge(baseOption, config);
    const series = [];
    if (data.xAxisData) {
        // 设置x轴值
        lineOption.xAxis[0].data = data.xAxisData;
    }
    if (data.legendData) {
        // 设置legend 图例
        lineOption.legend.data = data.legendData;
    }
    if (data.seriesData) {
        // 设置legend 图例
        for (const [index, elem] of data.seriesData.entries()) {
            series.push({
                name: data.legendData && data.legendData[index],
                data: elem,
                type: 'line',
                smooth: true, //折线是否平滑
                areaStyle: {
                    opacity: 0
                },
                itemStyle: {
                    normal: {
                        color: colors[index], //小圆点的颜色
                        width: 6,
                        lineStyle: {
                            color: colors[index], //折线的颜色
                            // width:3
                        }
                    }
                },
            })
        }
        lineOption.series = series;
    }
    return _.merge(baseOption, config, lineOption);
}
// 迁徙图   data = {linesData:[[{fromName:"",  toName:"",  value:"",   coords:[[,],[,]]  }],[]],  pointData:[{name:"",value:[, , ,]}]}
import car from "./car.svg";
const getMigrationOption = (data = {}, config = {}, toolTipName) => {
    // let planePath = "car";
    var planePath = "";
    if (data.seriesData.symbol != undefined && data.seriesData.symbol != "") {
        planePath = data.seriesData.symbol;
    } else {
        planePath = 'path://M345.98 342.433h43.851V886.31H345.98z m84.034 0h43.851V886.31h-43.851z m80.393 0h43.852V886.31h-43.852z m80.384 0h43.852V886.31h-43.852zM157.99 284.994s-16.46-12.449-10.752-21.172c0 0 13.416-41.026 52.499-45.51l18.783 13.984-36.239 17.645z m671.327-2s16.65-12.25 11.074-21.04c0 0-12.8-41.187-51.816-46.127l-18.963 13.73 35.973 18.07z m-506.33 32.853L295.85 327.7l-64.607-116.3 27.136-11.852 64.607 116.3z m344.557 0l27.145 11.852 64.607-116.3-27.145-11.852-64.607 116.3zM663.75 903.32l21.4-18.973 68.124 60.407-21.39 18.972-68.134-60.406z m-413.127 61.525l-21.39-18.963 68.124-60.416 21.4 18.973-68.134 60.406zM682.392 24.652h-374.69c-66.247 0-119.969 47.654-119.969 106.401v778.894c0 58.785 53.703 106.364 119.95 106.364h374.709c66.247 0 119.95-47.616 119.95-106.364V131.053c0-58.747-53.703-106.401-119.95-106.401z m-55.865 17.816s44.667 58.586 51.058 128.474l-22.415-1.536s3.158-68.902-33.611-127.687c0 0 4.295-0.171 4.968 0.749z m-252.957 0c0.674-0.949 4.969-0.768 4.969-0.768-36.77 58.785-33.612 127.706-33.612 127.706l-22.414 1.536c6.428-69.888 51.057-128.474 51.057-128.474zM242.223 75.13s22.642-22.86 74.819-32.322c0 0-64.275 47.047-84.385 69.746-0.029 0 4.257-33.043 9.566-37.424z m501.57 845.018c0 23.875-21.807 43.236-48.753 43.236H295.035c-26.927 0-48.754-19.361-48.754-43.236V263.386c0-14.08 7.586-26.548 19.343-34.475a7.377 7.377 0 0 1-0.692-3.053c0-21.684 103.12-39.262 230.314-39.262s230.315 17.578 230.315 39.262a7.443 7.443 0 0 1-0.797 3.262c11.577 7.898 19.049 20.31 19.049 34.266zM663.212 41.72c52.148 9.481 74.818 32.322 74.818 32.322 5.31 4.38 9.595 37.423 9.595 37.423-20.138-22.727-84.413-69.745-84.413-69.745zM311.419 312.453h367.256q19.048 0 19.048 19.048v567.59q0 19.048-19.048 19.048H311.419q-19.048 0-19.048-19.048v-567.59q0-19.048 19.048-19.048zM212.926 696.974h556.657v34.048H212.926z m0-212.214h556.657v34.048H212.926zM328.799 342.433h332.506q6.248 0 6.248 6.248v531.38q0 6.249-6.248 6.249H328.799q-6.248 0-6.248-6.248v-531.38q0-6.249 6.248-6.249z';

    }
    const MigrationOptionBase = {
        tooltip: {
            show: false,
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
                    res = "<span style='color:#fff;'>" + name + "</span><br/>" + (toolTipName == null || toolTipName == undefined ? '总客流' : toolTipName) + "：" + value;
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
        // geo: {
        //     map: 'cd',
        //     zoom: 1.2,
        //     label: {
        //         emphasis: {
        //             show: false
        //         }
        //     },
        //     roam: true, //是否允许缩放
        //     itemStyle: {
        //         normal: {
        //             color: 'rgba(51, 69, 89, .5)', //地图背景色
        //             borderColor: '#516a89', //省市边界线00fcff 516a89
        //             borderWidth: 1
        //         },
        //         areaStyle: {
        //             color: 'rgba(12, 38, 92, 0.82)',
        //         },
        //         emphasis: {
        //             color: 'rgba(37, 43, 61, .5)' //悬浮背景
        //         }
        //     }
        // }
    };
    const lineOption = Object.assign(MigrationOptionBase, config);

    const series = [];
    if (data.seriesData.pointData) {
        series.push({
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    color: '#fff',
                    fontSize: setOptionSize(16),
                    fontWeight: 'PingFangSC',
                    position: 'right',
                    backgroundColor: 'rgba(12, 38, 92, 0.82)',
                    borderColor: '#FFFFCC',
                    formatter: '{a| {b}}',
                    padding: 6,
                    rich: {
                        a: {
                            color: '#fff',
                            backgroundColor: 'rgba(12, 38, 92, 0.82)',
                            borderColor: '#FFFFCC',
                            // fontWeight: 400,
                            fontFamily: 'PingFangSC',
                            fontSize: setOptionSize(14)
                        }
                    }
                },

            },
            symbolSize: function (val) {
                return val[3];
            },
            symbol: 'circle',
            itemStyle: {
                normal: {
                    color: "#0ff",
                    fontSize: 60,
                }
            },
            data: data.seriesData.pointData
        })

    }
    if (data.seriesData.linesData) {
        // 设置legend 图例
        for (const [index, elem] of data.seriesData.linesData.entries()) {
            series.push({
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: [10, 20],
                },
                lineStyle: {
                    normal: {
                        color: "#00ffff",
                        width: 3,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: elem
            })
        }


    }
    lineOption.series = series;
    return _.merge(lineOption, config);
}
const getBarOption = (data = {}, config = {}) => {
    const baseOption = JSON.parse(JSON.stringify(_baseOption));
    const lineOption = Object.assign(baseOption);
    // const lineOption = Object.assign(baseOption, config);
    const series = [];
    if (data.xAxisData) {
        // 设置x轴值
        lineOption.xAxis[0].data = data.xAxisData;
    }
    if (data.legendData) {
        // 设置legend 图例
        lineOption.legend.data = data.legendData;
    }
    if (data.seriesData) {
        // 设置legend 图例
        for (const [index, elem] of data.seriesData.entries()) {
            series.push({
                name: data.legendData && data.legendData[index],
                type: 'bar',
                data: elem,
                barWidth: 12,
                barGap: "15%", //柱间距离
                label: { //图形上的文本标签
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#fff',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: setOptionSize(14),
                        },
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        barBorderRadius: [5, 5, 5, 5],
                        color: colors[index], //小圆点的颜色
                        lineStyle: {
                            color: colors[index] //折线的颜色
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
            })
        }
        lineOption.series = series;
    }
    // const lineOption = 
    return _.merge(baseOption, lineOption, config);
}

const getBarAndLineOption = (data = {}, config = {}) => {
    const baseOption = JSON.parse(JSON.stringify(_baseOption));
    const lineOption = Object.assign(baseOption, config);
    const series = [];
    if (data.xAxisData) {
        // 设置x轴值
        lineOption.xAxis.data = data.xAxisData;
    }
    if (data.legendData) {
        // 设置legend 图例
        lineOption.legend.data = data.legendData;
    }
    if (data.seriesData) {
        // 设置legend 图例
        for (const [index, elem] of data.seriesData.entries()) {
            series.push({
                name: data.legendData[index],
                type: 'bar',
                data: elem,
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
                        color: colors[index], //小圆点的颜色
                        lineStyle: {
                            color: colors[index] //折线的颜色
                        }
                    },
                },
            })
        }
        lineOption.series = series;
    }
    // const lineOption = 
    return Object.assign(baseOption, lineOption, config);
}
const getPieOption = (data = {}, config = {}) => {
    const baseOption = JSON.parse(JSON.stringify(_baseOption));
    const lineOption = Object.assign(baseOption, {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            position: ['50%', '50%']
        },
        xAxis: [{
            axisLine: {
                show: false
            }
        }],
    });
    const series = [];
    // if (data.xAxisData) {
    //     // 设置x轴值
    //     lineOption.xAxis.data = data.xAxisData;
    // }
    if (data.legendData) {
        // 设置legend 图例
        lineOption.legend.data = data.legendData;
    }
    // seriesData = [[{name:"aaa",value:"111"}],[{name:"bbb",value:"222"}]]
    if (data.seriesData) {
        // 设置legend 图例
        for (const [index, elem] of data.seriesData.entries()) {

            series.push({
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    fontSize: setOptionSize(14),
                    // position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,

                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: elem
            })
        }
        lineOption.series = series;
    }
    // const lineOption = 
    return _.merge(baseOption, lineOption, config);
}
const getRadarOption = (data = {}, config = {}) => {
    const baseOption = JSON.parse(JSON.stringify(_baseOption));
    const lineOption = Object.assign(baseOption, config, {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            position: ['50%', '50%']
        },
        xAxis: [{
            axisLine: {
                show: false
            }
        }],
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: data.indicator
        }
    });
    const series = [];
    // if (data.xAxisData) {
    //     // 设置x轴值
    //     lineOption.xAxis.data = data.xAxisData;
    // }
    if (data.legendData) {
        // 设置legend 图例
        lineOption.legend.data = data.legendData;
    }
    // seriesData = [[{name:"aaa",value:"111"}],[{name:"bbb",value:"222"}]]
    if (data.seriesData) {
        // 设置legend 图例
        for (const [index, elem] of data.seriesData.entries()) {

            series.push({
                name: '',
                type: 'radar',
                label: {
                    show: true,
                    fontSize: '14',
                    // position: 'center'
                },
                labelLine: {
                    show: true
                },
                data: elem
            })
        }
        lineOption.series = series;
    }
    // const lineOption = 
    return _.merge(baseOption, lineOption, config);
}
// val = 0.66
const getLiquidOption = (value, config = {}) => {

    const baseOption = JSON.parse(JSON.stringify(_baseOption));
    var data = [value, value, value, ];
    const lineOption = {
        series: [{
            type: 'liquidFill',
            radius: '70%',
            center: ['50%', '40%'],
            data: data,
            // backgroundStyle: {
            //     borderWidth: 1,
            //     borderColor: '#1daaeb',
            //     color: '#fff'
            // },
            color: ["rgba(32, 86, 221, .8)"],
            outline: {
                show: false
            },
            label: {
                normal: {
                    formatter: (value * 100) + '%',
                    textStyle: {
                        fontSize: 14
                    }
                }
            }
        }]
    }
    return Object.assign(baseOption, lineOption, config);
}
// 饼图 
const getGaugeOption = (value, config = {}) => {

    const baseOption = JSON.parse(JSON.stringify({
        tooltip: {
            formatter: "{a} <br/>{c} {b}"
        },
        title: {
            text: '一环',
            left: 'center',
            bottom: '1%',
            textStyle: {
                color: '#FFFFFF',
                fontSize: '14'
            }
        },
    }));
    const lineOption = {
        series: [{
                name: '速度',
                type: 'gauge',
                min: 0,
                max: 140,
                splitNumber: 10,
                radius: '100%',
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.142857142857, 'rgba(40, 183, 77, 1)'],
                            [0.5, 'rgba(146, 208, 80, 1)'],
                            [0.78571428571, 'rgba(255, 192, 0, 1)'],
                            [1, 'rgba(255, 0, 0, 1)'],
                        ],
                        width: 3,
                        // shadowColor : '#fff', //默认透明
                        // shadowBlur: 10
                    }
                },
                // pointer:{
                //     // show:false,
                //     width:6
                // },
                axisLabel: { // 坐标轴小标记
                    // textStyle: {       // 属性lineStyle控制线条样式
                    //     fontWeight: 'bolder',
                    //     color: '#fff',
                    //     shadowColor : '#fff', //默认透明
                    //     shadowBlur: 10
                    // }
                },
                axisTick: { // 坐标轴小标记
                    length: 8, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto',
                        // shadowColor : '#fff', //默认透明
                        // shadowBlur: 10
                    }
                },
                splitLine: { // 分隔线
                    length: 11, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 3,
                        color: '#fff',
                        // shadowColor : '#fff', //默认透明
                        // shadowBlur: 10
                    }
                },
                title: {
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 10,
                        fontStyle: 'italic',
                        color: '#fff',
                        // shadowColor : '#fff', //默认透明
                        // shadowBlur: 10
                    }
                },
                detail: {
                    // backgroundColor: 'rgba(30,144,255,0.8)',
                    // borderWidth: 1,
                    fontSize: 16,
                    // borderColor: '#fff',
                    // shadowColor : '#fff', //默认透明
                    // shadowBlur: 5,
                    offsetCenter: [0, '50%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data: [{
                    value: value,
                    name: ''
                }]
            }

        ]
    }
    return _.merge(baseOption, lineOption, config);
}

const creatBarOrLineOption = (data, type, title, ifShowLable, ifBrokenLine, symbolSize, symbol, Width, unitName, areaStyle, rotate, markPoint) => {
    var arraylist = []; //
    for (var i = 2; i < data.length; i++) {
        var mydata = {};

        mydata["name"] = data[0][i - 2] != undefined ? data[0][i - 2] : "";
        mydata["type"] = type;
        if (type == 'line' && areaStyle == true) {
            mydata['areaStyle'] = {};
        }
        if (type == "line") {
            if (ifBrokenLine == false) { //平滑曲线
                mydata["smooth"] = true;
            } else {
                mydata["smooth"] = false;
            }
            if (symbol == false) {
                mydata["symbol"] = "none";
            } else {
                if (symbolSize != undefined) {
                    mydata["symbolSize"] = symbolSize;
                } else {
                    mydata["symbolSize"] = 10;
                }

            }
        } else {
            if (Width != undefined) {
                mydata["barWidth"] = Width;
                // mydata['barGap']=2;
            }
        }
        mydata["data"] = data[i];
        if (markPoint != undefined && markPoint == i - 2) {
            mydata["markPoint"] = {
                // symbol:'pin',
                symbolSize: [80, 60],
                // symbolOffset:[0, '-50%'],
                // itemStyle:{
                //     normal:{
                //         color:'rgba(0,0,0,.3)',
                //     }
                // },
                label: {
                    show: true,
                    // color:'rgba(0,0,0,1)',
                    formatter: '{b}\n{c}'
                },
                data: [{
                        type: 'max',
                        name: '最大值'
                    },
                    {
                        type: 'min',
                        name: '最小值'
                    }
                ]
            }
        }

        mydata["itemStyle"] = {
            normal: {
                label: {
                    show: ifShowLable,
                    position: 'top',
                    formatter: "{c}",
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        }
        if (type == "line" & Width != undefined) {
            mydata.itemStyle.normal.lineStyle = {
                width: Width
            };
        }
        arraylist.push(mydata);
    }
    var option = {
        /*title: {
                text: title,
                subtext: '',
                x: 'center',
                textStyle: {fontSize: 16, color: '#266CB4'}
            },*/

        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        /*      toolbox: {
                      show: true,
                      feature: {
                          mark: {show: true},
                          dataView: {show: true, readOnly: false},
                          magicType: {show: true, type: ['bar', 'line', 'stack', 'tiled']},
                          restore: {show: true},
                          saveAsImage: {show: true}
                      }
                  },*/
        /*  legend: { // 图例配置
                  x: 'center',
                  y: 'top',
                  padding: 5, // 图例内边距，单位px，默认上下左右内边距为5
                  itemGap: 10, // Legend各个item之间的间隔，横向布局时为水平间隔，纵向布局时为纵向间隔
                  data: data[0]//图例名称
              },*/
        grid: {
            /*x: 80,
                x2: 40,*/
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
        },
        xAxis: [{
            type: 'category',
            data: data[1], //X轴名称
            // name: '时间',
            splitLine: {
                show: false,

            },
            axisLabel: {
                interval: 0, //坐标轴间隔设置
                rotate: rotate | 0,
                //倾斜度 -90 至 90 默认为0  
                margin: 8,
                textStyle: {
                    fontSize: 14
                },
                formatter: function (value) {
                    if (value.length > 3) {
                        return value.substring(0, 3) + '..'
                    } else {
                        return value
                    }
                }
            },
        }],
        yAxis: [{
            type: 'value',
            name: unitName,
            // nameLocation: 'end',
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(0,0,0,.2)",
                    width: 2
                }
            }

        }],
        series: arraylist
    };
    if (title != "") {
        option.title = {
            text: title,
            subtext: '',
            x: 'center',
            textStyle: {
                fontSize: 16,
                color: '#fff'
            }
        };
    }
    if (data[0].length > 1) {
        option.legend = {
            y: 'top',
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            icon: 'rect',
            data: data[0]
        };
        // if(type=='line'){
        //     option.legend.icon='line';
        // }

    }
    return option;
}

const createEchartOption_8_1 = (data) => {
    const option = {
        color: ['#01FFFD', '#FFFF00'],
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: data.legendData,
            top: 10,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
            type: 'category',
            // boundaryGap: false,
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: data.interval||0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            name: data.unitName,
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(240,199,37,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        }],
        series: [{
                name: data.legendData[0],
                type: 'line',
                smooth: true,
                // symbolSize: 0,
            symbol: 'circle',
            showAllSymbol: false ,
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: "#01FFFD",
                    // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 5,
                    // shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#01FFFD',
                }
            },
            itemStyle: {
                color: "#01FFFD",
                borderColor: "#fff",
                borderWidth: 3,
                // shadowColor: 'rgba(0, 0, 0, .3)',
                // shadowBlur: 0,
                // shadowOffsetY: 2,
                // shadowOffsetX: 2,
            },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(1,255,253,0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(1,255,253,0.01)'
                    }])
                },
                data: data.seriesData[0],
                barWidth: '30%',
                // itemStyle: {
                //     normal: {
                //         color: '#01FFFD'
                //     }
                // }
            },
            {
                name: data.legendData[1],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                showAllSymbol: false ,
                lineStyle: {
                    normal: {
                        color: "#FFFF00",
                        // shadowColor: 'rgba(0, 0, 0, .3)',
                        // shadowBlur: 0,
                        // shadowOffsetY: 5,
                        // shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#FFFF00',
                    }
                },
                itemStyle: {
                    color: "#FFFF00",
                    borderColor: "#fff",
                    borderWidth: 3,
                    // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 2,
                    // shadowOffsetX: 2,
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,255,0,0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(255,255,0,0.01)'
                    }])
                },
                data: data.seriesData[1],
                barWidth: '30%',
                // itemStyle: {
                //     normal: {
                //         color: '#FFFF00'
                //     }
                // }
            },
            {
                name: data.legendData[2],
                type: 'line',
                smooth: true,
                symbolSize: 10,
                showAllSymbol: false ,
                lineStyle: {
                    normal: {
                        color: "#00AF4F",
                        // shadowColor: 'rgba(0, 0, 0, .3)',
                        // shadowBlur: 0,
                        // shadowOffsetY: 5,
                        // shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#00AF4F',
                    }
                },
                itemStyle: {
                    color: "#00AF4F",
                    borderColor: "#fff",
                    borderWidth: 3,
                    // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 2,
                    // shadowOffsetX: 2,
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,175,79,0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(0,175,79,0.01)'
                    }])
                },
                data: data.seriesData[2],
                barWidth: '30%',
                // itemStyle: {
                //     normal: {
                //         color: '#00AF4F'
                //     }
                // }
            }
        ]
    };
    return option;
}
const creatEchartOption_4_3 = (data) => {
    const option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        legend: {
            data: data.legendData,
            top: 10,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            icon: 'rect',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                show: false
            },
            data: data.xAxisData,

        }],

        yAxis: [{
            type: 'value',
            name: data.unitName,
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            },
            axisLabel: {
                interval: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        }],
        series: [{
                name: data.legendData[0],
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#01FFFD",
                        // shadowColor: 'rgba(0, 0, 0, .3)',
                        // shadowBlur: 0,
                        // shadowOffsetY: 5,
                        // shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#01FFFD',
                    }
                },
                itemStyle: {
                    color: "#01FFFD",
                    borderColor: "#fff",
                    borderWidth: 3,
                    // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 2,
                    // shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1,255,253,.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(1,255,253,0.01)'
                            }
                        ], false),
                        shadowColor: 'rgba(1,255,253, 0.6)',
                        shadowBlur: 20
                    }
                },
                data: data.seriesData[0]
            },
            {
                name: data.legendData[1],
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#FFFF00",
                        // shadowColor: 'rgba(0, 0, 0, .3)',
                        // shadowBlur: 0,
                        // shadowOffsetY: 5,
                        // shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#FFFF00',
                    }
                },

                itemStyle: {
                    color: "#FFFF00",
                    borderColor: "#fff",
                    borderWidth: 3,
                    // // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 2,
                    // shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,255,0,0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,0,0.01)'
                            }
                        ], false),
                        shadowColor: 'rgba(255,255,0, 0.6)',
                        shadowBlur: 20
                    }
                },
                data: data.seriesData[1],
            },
        ]
    };
    return option;
}
const creatEchartOption_9_1 = (data) => {
    var option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: data.legendData,
            top: 10,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
            type: 'category',
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            name: data.unitName,
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(240,199,37,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        }],
        series: [{
                name: data.legendData[0],
                type: 'bar',
                barWidth: 16,
                barGap: '60%',
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#01FFFD'
                        }, {
                            offset: 1,
                            color: '#2056DD'
                        }]),
                        barBorderRadius: 12,
                    },
                },
                data: data.seriesData[0]
            },
            {
                name: data.legendData[1],
                type: 'bar',
                barWidth: 16,
                barGap: '60%',
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#FFFF00'
                        }, {
                            offset: 1,
                            color: '#fcab16'
                        }]),
                        barBorderRadius: 12,
                    }

                },
                data: data.seriesData[1]
            }
        ]
    };
    return option;
}
const creatEchartOption_3_1 = (data) => {
    var colors = ['rgba(251,210,73,0.7)', 'rgba(251,210,73,0.7)', 'rgba(124,213,253,0.7)', 'rgba(124,213,253,0.7)', 'rgba(124,213,253,0.7)', 'rgba(124,213,253,0.7)', 'rgba(124,213,253,0.7)', 'rgba(124,213,253,0.7)', 'rgba(181,236,69,0.7)', 'rgba(181,236,69,0.7)', 'rgba(136,243,227,0.7)', 'rgba(136,243,227,0.7)', 'rgba(136,243,227,0.7)', 'rgba(136,243,227,0.7)'];
    var aCategorys = data.xAxisData;
    var topdata = []; //峰值data
    for (var i = 0; i < data.seriesData[0].length; i++) {
        var num = data.seriesData[0][i];
        if (num < data.seriesData[1][i]) {
            num = data.seriesData[1][i];
        }
        topdata.push(num);
    }
    var aSeries = [{
        name: data.legendData[0],
        type: 'line',
        symbol: 'circle',
        symbolSize: 12,
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#c8d8e3'
            }
        },
        itemStyle: {
            normal: {
                color: '#01FFFD',
                borderColor: "#ffffff",
                borderWidth: 2
            }
        },
        lineStyle: {
            normal: {
                opacity: 0
            }
        },

        data: data.seriesData[0]
    }, {
        name: data.legendData[1],
        type: 'line',
        symbol: 'circle',
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#c8d8e3'
            }
        },
        symbolSize: 12,
        itemStyle: {
            normal: {
                color: '#FFFF00',
                borderColor: "#ffffff",
                borderWidth: 2
            }
        },

        lineStyle: {
            normal: {
                opacity: 0
            }
        },
        data: data.seriesData[1]
    }];

    aCategorys.forEach(function (v, i, a) {
        var name = v;
        if (v !== '') {
            var data = [];

            for (var j = 0; j < aCategorys.length; j++) {
                data.push('-');
            }
            data[i] = topdata[i];

            aSeries.push({
                name: name,
                type: 'pictorialBar',
                smooth: false,
                legendHoverLink: false,
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                barCategoryGap: '70%',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colors[i]
                        }, {
                            offset: 1,
                            color: colors[i]
                        }]),
                    },
                },
                areaStyle: {
                    normal: {
                        color: colors[i] // 0% 处的颜色
                    }
                },
                data: data,
            });
        }
    });

    var option = null;
    option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                console.log(params)
                var rValue = params[0].name + '<br>';
                params.forEach(function (v, i, a) {
                    if (v.data !== 0 && v.data !== "-" && v.seriesType == "line") {
                        rValue += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + v.color + '"></span>' + v.seriesName + ':' + v.data + '<br>';
                    }
                })
                return rValue;
            }
        },
        legend: {
            data: data.legendData,
            top: 10,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
            type: 'category',
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            name: data.unitName,
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(240,199,37,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        }],
        series: aSeries
    };
    return option;
}
const creatEchartOption_5_3 = (data) => {
    var bgImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAFmCAYAAAAxnvlXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMDI2MDNmOS1lNTEyLTlmNGEtODQxNC02MDNmODc1YWVjMjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDM3MjdEOUJBQTM0MTFFQUExMzdFNjJFRUQyNzVBREQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDM3MjdEOUFBQTM0MTFFQUExMzdFNjJFRUQyNzVBREQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZDAyNjAzZjktZTUxMi05ZjRhLTg0MTQtNjAzZjg3NWFlYzI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmQwMjYwM2Y5LWU1MTItOWY0YS04NDE0LTYwM2Y4NzVhZWMyNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkeToJEAAARoSURBVHja7N3dUhNJGAbgJoAoiu79X+OuLkGiGwJZWicnrhOq+2DDO/10VcpYVKrmSebrzpv5+c72+335dazK0+Hp1Y//Zo268f/8fPLfTb848sKPz48PJXPcPz9uf/eHY5/em5I7Zrd9VQYbwMADgR+DXU9zfzi2LN1O6MR1+H7uj2cvfPGIHr/74qGGgYGBgV/zOLYOnz0/rqd/k0ZdZ7/Nffk4Bv40gRNH/eHic+sufRG8556rYWDg8cC7YNeuNw8/BK/D8rAaBgYGBk7OwzVxvA98U+o6+7XMHEh46fjwu+AP8q/WXfp8iaVq0gIGXi54G+za9sbDoc7TKocXqmFgYGBg4NPn4cspIiauw3dzXz6OgW+mLx6Jox48+LN1l07e3c/UMDDweOBvwa7uw6Wrknd8uI7H3jz8pIaBgYGBgV9HHq7R8I+SeZ5WPcfseyu4Xjucesj0Zg686smUahgYOAK8Hw28CUXXbXY5rRoGBgYGBg7Lw+/C8/Cm9RNOvFj6EGvf9+zS8jAwsDx8ypm6eVm6m96QxMt47uRhNQwMDAwcHg/rOA9dh7vu41Ej1qfQD/Ju7svH6oUfAFLHWzUMDDweODkydeXh9fRCeVgeNmkBAwMDnyYPJ97Woq6z33vAye2H6rHhv1t36eT2Q5dqGBh4PLD2Q0FY50urYWBgYOD0PKz9UNCo0fZL6y59scQ916QFDLxc8EOwq+u0pXp8eBu6Dnf9Ln20b5EaBgYGBgb+f/Ow9kNhH6T2QyYtYOBlg5Mb03S3H3oTmod/gHtut7xVw8DAwMDAryMPaz8UNLQfMmkBAy8frP1Q0NB+SA0DAwMDp+dh7YeChvZDJi3gAcHDtR+6D01LdZu/9ubh6OFyWmBgYOAlxcNDgEiMh133tUxuP7QuM/fyWGr7oeueGpaHgYHl4VPO1M3LUmr7ocNpS/KwGgYGBgZOz8PaD4UM7YdMWsDAywcnR6bu2y3XFyb+TOv4sBoGBgYGXkIeflty2w/tW8HaDwUN7YeAgQcEJ7cfeuzNw7vQPLyRh9UwMDAwcHge1n4oaNRrnz+37tLJ7YfO1TAw8Hhg7YeC1mHth9QwMDAwcHoeronjQ8ltP7RrBSe3H6oflvZDJi1g4GWDk9sPzW77S4dLL0vm9cMPP5+03275QQ0DAwMDA7+OPJzafuhwe6nm9kMVm9p+qG57c/uh5NtLaT8EDDwgeBPsGqr90H7KxNoPqWFgYGDg5Dys/VDQ0H7IpAU8IFj7oZCh/ZAaBgYGBl5CPDwEiGHaD11PeThx3JaO9kPJt1vWfsgsDSwPxy1NzcuS9kPysEkLGBgY+LR5OPEynrrObnvAN9MjcdQf4tetu/RV8J57pYaBgccDJ0emrjy8nl6YuA7Lw2oYGBgYeAl5WPuhkKH9kEkLGHj54F2wq6v90HpCJ67D9/KwGgYGBgYOz8P1zbgumedpbUpH+6GPJbf9UI222g+ZtICBlw3WfigoD8+2H/pXgAEADbJI2x8Je8AAAAAASUVORK5CYII=\n';
    var fillImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAFmCAYAAAAxnvlXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMDI2MDNmOS1lNTEyLTlmNGEtODQxNC02MDNmODc1YWVjMjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEFENUVBNTdBQTM0MTFFQTkxOUVFQ0RDODhEMjEyNzciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEFENUVBNTZBQTM0MTFFQTkxOUVFQ0RDODhEMjEyNzciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZDAyNjAzZjktZTUxMi05ZjRhLTg0MTQtNjAzZjg3NWFlYzI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmQwMjYwM2Y5LWU1MTItOWY0YS04NDE0LTYwM2Y4NzVhZWMyNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhY9bYsAAAgDSURBVHja7F19aJZVFL/v68c256az5dx00wnGgggj+pAsBqkFBQ36EIk+JpVI9DEqmFSk68NRmpmU0gglGIXSBxEVKuEfFYoR+6/IcHPT2dqcOffxbqVv577PI1u19+k996/nnPs78GOT18F+O/eec37nuc89iXQ6bf5t0/vG7JdywrOEmUaWjRDeInSMlU7/z4dTJ/2R4G9gf+g+I9OuJNw22QfJiB+qMHKtPNsHSeOZRS1plQYPT/Bw2jcPfyeY17fZPkhMmod7Mnk4QbiVUCKM7ADhIOHCWFnOeTh9aUkf1LakJ/WwZvMuSoMwCPtQeITyULzlLg/HFYdoPcwtLaGHoYehh5GWoIehh6GHoYehhxGlQRiEQRgNADQA0ABAAwANADQAkJbQAEADAA0ANADQAECUBmEQ9q3wyOseVUFutCKPVWldTdhCmCMwD28gHMk5LeWdynj4C8IdQp1rq8Tlo/N5Hp4leDUXI2ghSnvSAMjStcwwviCY1wXekk5nsJeQDr+Xhn3ZVumkaSm/M3Xp2zJCoTDv2r70aftNqiqfvYd7oIeRlkAYhEE4boVHfntKBblUNS8trSLsIswWxnOQ8BTh09wLj+MZDx8grBDq3KOE61OLc/Zw5o+QL3g15yNoIUr/Y2P76eE/BfP6y0UP7yQMC9TCo4QdLD1ccGxExfIdWVLA1sPqDHoYhEFYYeFR8POwjihdMwMeTmYrLQn3EgYJaWFIEeqzlcdRHl5v5DXhrdmHwk+w9nBYeEzTFpsQpX0oLeHhCR6WnIyH2ZubrMkEj0uLBJJ90cXD9ujPUshDBC0QBmEQjlseLmwbUkFuaGkhKw9bqzbyjg+fI/zqkoefJmwT6txNhI3cPVwneDXXuXh4isZgjCgdeFhvuQkPT9jDZwTz6mcRTgRfniOMCs3DTS4ePkZYDT2MoAXCIAzCccvDMw+fV0Fu8MYilh623l9pIl5cjKvuJ+w3WQ6nReXh5rD4kGjvEdZx9/Aywat5Ga+0xNNDP9QSPKzdw12CeZ3iEQ6sgdBpZF4v9baLh+2rtI3QwwhaIAzCIBy3PFx8aEAFuYHaYlYetqerHzDyXqe13YtWE/SnWXl4O+ERoc6tNVmuio7awzWCV3MN1FL0Hk57Rhh6WDvh4LXUNqFXS43/7rku6fD58DMmOEIssS/9icsetpdMfwQ9jKAFwiAMwnGrtGZ9/YcKcudun81KSx6NHwpM5fihKA+rHD8UVVpCHiItKfOwZD+nXTz8jWDCh5gezvyBNhK+MjLfHz7MIzxuR6CHEaVBGIRBOG6FR8lnZ1WQO1tXwqq0VI4fisrDr5nggLhE20pYzq20MH4IehiEZedhleOHot552Eu4xchsce1zkYfvEj42gscPuexhjB+CeABhEAbh2FVacz48o4Jc/5rLWHlY5fihqDxs3x2uFujYkrABkDvhsJZUOX4IagkNAC8IB4wlj4ofc/Hwm4SrTHDlsiSzRcRWF8JfEuZBHiJKgzAIg3Dc8nDp7j4V5PrqS1ny0Jod9DJDGE/bpk0x83AmVa0h7A5JSzI7oPLJUMuz9vBjAslamxb+7uxKa6rg7YvxQ2gAeO3h8HHpoGBeQ+zNbYLjwzZzS7xu+XmXPWzPOV0HPYygBcIgDMJxy8OX7/xdBbne9XPZpaUn44cC82f8UDh/uC78KhF1LvOHVY4fgjz0tAHg57ylXsG8+lz2sL1eyl7oIfFai80uebidsBZ6GFEahEEYhONWeJRt0/FuR09DGavSsp/dSZgrjKd9+flzk+VgXVQeft0Esx4k2h5CPbfSktyEvxZBC3oYHvbPwycE8+pkeTgxPiX+FyPvnJbNv7tc9LDtGjRBDyNKgzAIg3DcCo95m0+rIPfbhnJWpWUv8HlIaB7+gNDPzcP22bDUvvTNhLu5tfQVglfzEl5pCbWEtKTNw34+H24TzKvNRR5i/BD0MKI0CIMwCMeh8Kh4qVsFue5NFaw8XGmC938knpe2j3qPcUtLe3HJPUKdaw+2r+DuYcmXlsyFPESUhofNRcG8nMYPHRBMeL/Lkn7FBFdMSczDP7g0AKz9CD2MtATCIAzCcau05jeeVEHuVPMCVlq6JpSIEscANhK+5xYerxJqhTr3DcJN3D1cJHg1F0EtIUp74uGoIw8qxw8ls3o4bVoJF8PvJSEd/u4ceZj53y0meM4qbVjceRPxsvf/6eEzIaCHkZZAGIRBODaFx4KGLhXkTm6rZKUljB8SYpHjh6L2sD/jhxLQw9r1sGJBHBW0VI4filrStkUr8UIPjB+CPARhEAZhXXm48vFOFeS63qliyUNrBQJFhC2Yhl3y8IOE9428ITX2BKG9g2RHzns4EaCeMDUx/m8pSBLWJhzEg+TxQ1NcljTSknZ56J2HMX5IiGH8EPQwCIMwCOsqPKoePaGCXGfLQrYetpfalgjjOUA4mq1ejHqY9gLhZaHO3WKCx7257uHMkbaVRuAxvBCrsgmCpNKAloBaQh5GA0D0odJ+Fz1sw/qoUD3c5ELY3oOxGnoYQQuEQRiE45aHFz7coYLciT2LWGnJo/FDQabyZ/xQqK1Ujh/C4VLoYRDWS/i4YF7tLnvYvgrzk5H3Go99nbbFRQ/b2cPN0MMIWiAMwiAct9Jy0f3tKsh1tFaz0pLNv+uMzOfDNg/3cvPwdhOcmZZoNxDu4u7hxYJXczXkIdKSz2kpYXwbPxScDWmTe6Yl/N0nsb8FGABze+RJ3cqRyAAAAABJRU5ErkJggg==';
    var chartData = [

    ];

    var bgData = [];
    var itemData = [];

    // 取出每一条数据value,作为显示数据
    data.seriesData[0].forEach(function (items, index) {
        // itemData.push(items.value);
        chartData.push({
            name: data.xAxisData[index],
            value: items
        })
    })
    var maxValue = Math.max.apply(null, data.seriesData[0]);
    // 取出所有数据最大值,作为背景象形柱图数据
    data.xAxisData.forEach(function (items, index) {
        bgData.push({
            name: items,
            // value: Math.max.apply(null, itemData)
            value: maxValue
        });
    })

    // 所有数据最大值


    // 字体 distance放大参数
    var scale = 1;

    //富文本配置
    var rich = {
        white: {
            color: "#fff",
            align: 'left',
            fontSize: 18 * scale,
            // padding: [0, 0]
        },
    };

    var option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b} : {c}' + data.unitName,
        },
        legend: {
            data: data.legendData,
            top: 10,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
            type: 'category',
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            name: data.unitName,
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(240,199,37,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        }],
        series: [
            //背景
            {
                name: 'bg',
                type: 'pictorialBar',
                barWidth: '45%',
                // barGap: '0%',
                silent: true,
                // label: {
                //     normal: {
                //         show: true,
                //         position: "top",
                //         distance: 20 * scale,
                //         formatter: function(params) {
                //             var stuNum = 0;
                //             chartData.forEach(function(value, index, array) {
                //                 if (params.name == value.name) {
                //                     stuNum = value.value;
                //                 }
                //             })
                //             return stuNum + '{white| 人}';
                //         },
                //         textStyle: {
                //             color: "#ffc72b",
                //             fontSize: 20 * scale
                //         },
                //         rich: rich
                //     }
                // },
                symbol: 'image://' + bgImg,
                symbolClip: false,
                symbolBoundingData: maxValue,
                symbolSize: [52, '100%'],
                data: bgData
            },
            {
                name: '数据',
                type: 'pictorialBar',
                barWidth: '45%',
                barGap: '-100%',
                data: chartData,
                z: 3,
                label: {
                    show: true,
                    position: 'top',
                    color: '#ffffff',
                    fontWeight: 'bolder',
                    fontSize: 20,
                    // rich: rich
                },
                symbol: 'image://' + fillImg,
                symbolClip: true,
                symbolBoundingData: maxValue,
                symbolSize: [52, '100%']
            },
        ]
    };
    return option;
}
const creatEchartOption_4_1 = (data) => {

    var seriesData1 = [],
        seriesData2 = [];
    data.seriesData[0].forEach(e => {
        seriesData1.push({
            value: e,
            symbolPosition: 'end'
        })
    })
    data.seriesData[1].forEach(e => {
        seriesData2.push({
            value: e,
            symbolPosition: 'end'
        })
    })

    var option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            data: data.legendData,
            top: 10,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
            type: 'category',
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            name: data.unitName,
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(240,199,37,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        }],
        series: [

            {
                name: data.legendData[0],
                type: 'pictorialBar',
                symbol: 'rect',
                symbolSize: [17, 3],
                symbolOffset: [-12, 0],
                z: 2,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#01FFFD'
                    }
                },
                data: seriesData1
            },
            {
                name: data.legendData[1],
                type: 'pictorialBar',
                symbol: 'rect',
                symbolSize: [17, 3],
                symbolOffset: [12, 0],
                z: 2,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#FFFF00'
                    }
                },
                data: seriesData2
            },
            {
                name: data.legendData[0],
                type: 'bar',
                barWidth: 18,

                z: 1,
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: 'rgba(1,255,253,.7)'
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(1,255,253,.3)'
                                },
                                {
                                    offset: 1,
                                    color: 'transparent'
                                }
                            ]
                        )
                    },

                },
                data: data.seriesData[0],

            },
            {
                name: data.legendData[1],
                type: 'bar',

                z: 1,
                barWidth: 18,
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: 'rgba(255,255,0,.7)'
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(255,255,0,.3)'
                                },
                                {
                                    offset: 1,
                                    color: 'transparent'
                                }
                            ]
                        )
                    },

                },
                data: data.seriesData[1],

            }
        ]
    };
    return option;
}
const creatEchartOption_11_1 = (allData) => {
    const option = {
        title: {
            text: '',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            show: false,
            orient: 'vertical',
            top: 'auto',
            left: 'right',
            data: ['地点', '线路'],
            textStyle: {
                color: '#fff'
            }
        },
        // geo: {
        //     map: '江门市',
        //     label: {
        //         //normal:{
        //         //show: true,
        //         //textStyle:{
        //         //color:'#fff',
        //         //}
        //         //},
        //         emphasis: {
        //             show: false,
        //             textStyle:{
        //                 color:'#fff',
        //             }
        //         }
        //     },
        //     roam: true,
        //     itemStyle: {
        //         normal: {
        //             areaColor: '#2a333d',
        //             borderColor: '#404a59',
        //             borderWidth:1,
        //         },
        //         emphasis: {
        //             areaColor: '#2a333d'
        //         }
        //     }
        // },
        series: [{
            name: '地点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke',
                period: 5,
                scale: 8
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                },
                emphasis: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: 2,
            showEffectOn: 'render',
            itemStyle: {
                normal: {
                    color: '#46bee9'
                }
            },
            data: allData.citys
        }, {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            large: true,
            effect: {
                show: true,
                constantSpeed: 50,
                symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolSize: 10,
                trailLength: 0,
            },
            data: allData.moveLines
        }]
    };
    return option;
}
const creatEchartOption_9_1_1 = (data) => {
    var option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: data.legendData,
            top: 5,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            // icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
            type: 'category',
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
                type: 'value',
                name: data.unitName[0],
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: data.unitName[1],
                position: 'right',
                offset: -25,
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, -90] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: data.unitName[2],
                position: 'right',
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, 40] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        ],
        series: [{
                name: data.legendData[0],
                type: 'bar',
                barWidth: 16,
                barGap: '60%',
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#01FFFD'
                        }, {
                            offset: 1,
                            color: '#2056DD'
                        }]),
                        barBorderRadius: 12,
                    },
                },
                data: data.seriesData[0]
            },
            {
                name: data.legendData[1],
                type: 'bar',
                barWidth: 16,
                barGap: '60%',
                yAxisIndex: 1,
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#FFFF00'
                        }, {
                            offset: 1,
                            color: '#fcab16'
                        }]),
                        barBorderRadius: 12,
                    }

                },
                data: data.seriesData[1]
            },
            {
                name: data.legendData[2],
                type: 'line',
                barWidth: 16,
                barGap: '60%',
                yAxisIndex: 2,
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#49FEFE'
                        }, {
                            offset: 1,
                            color: '#49FEFE'
                        }]),
                        barBorderRadius: 12,
                    }

                },
                data: data.seriesData[2]
            }
        ]
    };
    return option;
}
const creatEchartOption_9_1_2 = (data) => {
    var option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: data.legendData,
            top: 5,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            // icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
            type: 'category',
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
                type: 'value',
                name: data.unitName[0],
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: data.unitName[1],
                position: 'right',
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, 40] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        ],
        series: [{
                name: data.legendData[0],
                type: 'bar',
                barWidth: 16,
                barGap: '60%',
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#01FFFD'
                        }, {
                            offset: 1,
                            color: '#2056DD'
                        }]),
                        barBorderRadius: 12,
                    },
                },
                data: data.seriesData[0]
            },

            {
                name: data.legendData[1],
                type: 'line',
                barWidth: 16,
                barGap: '60%',
                yAxisIndex: 1,
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#c8d8e3'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#49FEFE'
                        }, {
                            offset: 1,
                            color: '#49FEFE'
                        }]),
                        barBorderRadius: 12,
                    }

                },
                data: data.seriesData[1]
            }
        ]
    };
    return option;
}

// 立体圆形壮壮图 一般用于地图上面
const creatEchartOption_12_1 = (data = {}) => {

    var barWidth = 20;
    var symbolSize = [barWidth, 10];
    var symbolOffsetT = [-15, -3]; //修改绿色柱子头部椭圆位置
    var symbolOffsetB = [-15, 8]; //修改绿色柱子底部椭圆位置
    var normalColor = "#94a1a9";
    var fontSize = setOptionSize(20);
    var labelcolor = "#fff";
    var color1 = "rgb(32, 86, 221,.8)";
    var color2 = "rgb(255, 255, 0, .8)";
    var datas = {
        xdata: ['2016', '2017', '2018', '2019'],
        yData1: [],
        yData2: [],
        legendData: ['增长电量', '增售电量'],
    }
    if (data && data.seriesData) {
        datas.yData1 = data.seriesData[0];
        datas.yData2 = data.seriesData[1];
    }
    return {
        // animation: false, //去除加载时缓动动画
        // legend: {
        //     show: true,
        //     selectedMode: false, //取消图例上的点击事件
        //     data: datas.legendData
        // },
        // title: {
        //     text: data.title,
        //     bottom: '-26',
        //     left: 'center'
        // },
        grid: {
            left: "40%",
            // right: "50%",
            // top: '22',
            width: "100%",
            bottom: '90'

        },
        xAxis: {
            show: false,
            axisLine: {
                lineStyle: {
                    color: normalColor
                }
            },
            axisTick: {
                "show": false
            },
            axisLabel: {
                textStyle: {
                    color: normalColor,
                    fontSize: fontSize
                },
                margin: 20
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: normalColor
                }
            },
            data: datas.xdata,
        },
        yAxis: [{
                type: 'value',
                show: false,
                name: "万千瓦时/万千瓦",
                nameTextStyle: {
                    fontSize: fontSize
                },
                color: normalColor,
                axisTick: {
                    "show": false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: normalColor
                    }
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: normalColor,
                        fontSize: fontSize
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: normalColor
                    }
                },

            },
            // {
            //     type: 'value',
            //     name: "万千瓦时/万元",
            //     nameTextStyle: {
            //         fontSize: fontSize
            //     },
            //     color: normalColor,
            //     axisTick: {
            //         "show": false
            //     },
            //     splitLine: {
            //         show: false,
            //     },
            //     axisLabel: {
            //         formatter: '{value}',
            //         textStyle: {
            //             color: normalColor,
            //             fontSize: fontSize
            //         }
            //     },
            //     axisLine: {
            //         lineStyle: {
            //             color: normalColor
            //         }
            //     },

            // }
        ],
        series: [{ // 绿色柱子
                // name: datas.legendData[0],
                tooltip: {
                    show: true
                },
                type: 'bar',
                barWidth: barWidth, //柱子宽度
                barGap: 0.5, //柱子之间间距
                emphasis: {
                    itemStyle: { //填充部分鼠标移上去颜色
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                    offset: 0,
                                    color: color1
                                },
                                {
                                    offset: 1,
                                    color: color1
                                }
                            ]),
                    }
                },
                label: {
                    show: true,
                    position: "left",
                    offset: [10, 0],
                    padding: 10,
                    textStyle: {
                        fontSize: fontSize,
                        color: labelcolor
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(64, 91, 154,.6)'
                                },
                                {
                                    offset: 1,
                                    color: color1
                                }
                            ]),
                        borderWidth: '1',
                        borderColor: color1,
                    }
                },
                data: datas.yData1,
                // barGap: 0,
                legendHoverLink: false,
            }, {
                // 绿色柱子底部椭圆
                name: datas.legendData[0],
                tooltip: {
                    show: true
                },
                type: 'pictorialBar',
                itemStyle: {
                    normal: { //未填充部分鼠标移上去颜色
                        color: color1,
                        borderWidth: 1,
                        borderColor: color1
                    }
                },
                // symbol: 'image://data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAA/ElEQVQ4ja2VOw7CMBBEHyEV4iAUdIC4BxId3xbOk5qAoEIcBNFSUHAGKkQJaKUYmfgTJ8pISbHr3Zkd20ljdPoQiDaQ3B+8gTXwCimLjYgdXeAIdLJsHxgDN+tqDZERMbEAzlpzMsILMDNWlyAQS7bABmgZ2eK8lyBYoWNCL4G3wAElaOojkJF3RSN7YK1XBE4FFfDnQFTRkiL8BNv2oC5I71heKdADrjU2lws4lP2IcoHUWFoeB2CgBOsWybdlmT3PCo1V/USvt+1BqisIhNMBGwG+Agv2PkEuAn3kucMylZe747Q05JjK7cwrDJ4w9H+gGiZAE1gFHQTgC/m7OlXDmboLAAAAAElFTkSuQmCC',
                symbolRotate: 0,
                symbolSize: symbolSize,
                symbolOffset: symbolOffsetB,
                symbolPosition: 'start',
                data: datas.yData1,
                z: 3
            },
            {
                // 绿色柱子头部椭圆
                name: datas.legendData[0],
                tooltip: {
                    show: false
                },
                type: 'pictorialBar',
                itemStyle: {
                    normal: {
                        color: color1,
                        borderWidth: 1,
                        borderColor: color1
                    }
                },

                // symbol: 'image://data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAABIElEQVQ4jaWVMWoCQRSGv0iKFIm3MLVFYshFbGxMEwTTeQxrBTuFVMkRPMBWhhQpAh5CEBEJhMgjb2T0ze7Mrh8sLPNm5h++nZm9GMz/SKQOjLVrD9ikDLs0LWGawBvQ0GoLaAOfwd4eNdNieQYyb3L0PdNaIUUBN8ArMAGuTPW/baJ9rk1VyQsQJQugYyoW6fOhYwyhgJCSGLnK/ICYkhhBZS6gjJIYHZ2r6QKqKIlx65RJwAr4iQyowq/MKwHvwF3KoSnBl845dd9gCTx6V8E5TIEH4JuTXbQD+noFrCsEyN30pM/WNYbOQRVlouReV39EKABP2chULEdKUgNQZS8FykRJ91RJmQBHSJlTMosNTv0fOGVDvQZkM+Su+gCwB/qVO5cbNt4bAAAAAElFTkSuQmCC',
                symbolRotate: 0,
                symbolSize: symbolSize,
                symbolOffset: symbolOffsetT,
                symbolPosition: 'end',
                data: datas.yData1,
                z: 3
            }, {
                // 红色柱子
                name: datas.legendData[1],
                type: 'bar',
                // stack: 1,
                barWidth: barWidth, //柱子宽度
                barGap: 0.5, //柱子之间间距
                // yAxisIndex: 1, //选择第二个y轴 不写的话 双y轴无法实现 
                emphasis: {
                    itemStyle: { //左侧未填充部分鼠标移上去颜色
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                    offset: 0,
                                    color: color2
                                },
                                {
                                    offset: 1,
                                    color: color2
                                }
                            ]),
                        barBorderColor: color2
                    }
                },
                label: {
                    show: true,
                    position: "right",
                    offset: [-10, 0],
                    padding: 10,
                    textStyle: {
                        fontSize: fontSize,
                        color: labelcolor
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(138, 138, 31,.6)'
                                },
                                {
                                    offset: 1,
                                    color: color2
                                }
                            ]),
                        barBorderColor: color2
                    }
                },
                data: datas.yData2,
            }, {
                // 红色柱子底部椭圆
                name: datas.legendData[1],
                tooltip: {
                    show: false
                },
                type: 'pictorialBar',

                itemStyle: {
                    normal: {
                        color: color2,
                        borderWidth: 1,
                        borderColor: color2
                    }
                },
                // symbol: 'image://data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAA/ElEQVQ4ja2VOw7CMBBEHyEV4iAUdIC4BxId3xbOk5qAoEIcBNFSUHAGKkQJaKUYmfgTJ8pISbHr3Zkd20ljdPoQiDaQ3B+8gTXwCimLjYgdXeAIdLJsHxgDN+tqDZERMbEAzlpzMsILMDNWlyAQS7bABmgZ2eK8lyBYoWNCL4G3wAElaOojkJF3RSN7YK1XBE4FFfDnQFTRkiL8BNv2oC5I71heKdADrjU2lws4lP2IcoHUWFoeB2CgBOsWybdlmT3PCo1V/USvt+1BqisIhNMBGwG+Agv2PkEuAn3kucMylZe747Q05JjK7cwrDJ4w9H+gGiZAE1gFHQTgC/m7OlXDmboLAAAAAElFTkSuQmCC',
                symbolRotate: 0,
                symbolSize: symbolSize,
                symbolOffset: [15, 7],
                symbolPosition: 'start',
                data: datas.yData2,
                z: 7
            },
            {
                // 红色柱子头部椭圆
                name: datas.legendData[1],
                tooltip: {
                    show: false
                },
                type: 'pictorialBar',
                itemStyle: {
                    normal: {
                        color: color2,
                        borderWidth: 1,
                        borderColor: color2,
                    }
                },
                // symbol: 'image://data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAABIElEQVQ4jaWVMWoCQRSGv0iKFIm3MLVFYshFbGxMEwTTeQxrBTuFVMkRPMBWhhQpAh5CEBEJhMgjb2T0ze7Mrh8sLPNm5h++nZm9GMz/SKQOjLVrD9ikDLs0LWGawBvQ0GoLaAOfwd4eNdNieQYyb3L0PdNaIUUBN8ArMAGuTPW/baJ9rk1VyQsQJQugYyoW6fOhYwyhgJCSGLnK/ICYkhhBZS6gjJIYHZ2r6QKqKIlx65RJwAr4iQyowq/MKwHvwF3KoSnBl845dd9gCTx6V8E5TIEH4JuTXbQD+noFrCsEyN30pM/WNYbOQRVlouReV39EKABP2chULEdKUgNQZS8FykRJ91RJmQBHSJlTMosNTv0fOGVDvQZkM+Su+gCwB/qVO5cbNt4bAAAAAElFTkSuQmCC',
                symbolRotate: 0,
                symbolSize: symbolSize,
                symbolOffset: ['15', '-7'],
                symbolPosition: 'end',
                data: datas.yData2,
                z: 7
            }
        ]
    };
}
const creatEchartOption_15_1 = (data = {}) => {
    const option = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 60,
            // containLabel: true
        },
        legend: {
            x: '46%',
            top: '2%',
            textStyle: {
                color: '#90979c',
            },
            data: data.legendData,
        },


        calculable: true,


        xAxis: [{
            type: 'category',
            // data: data.xAxisData,
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            name: data.unitName,
            nameTextStyle: {
                color: '#ffffff',
                padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(240,199,37,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        }],
        dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 0,

            "start": 10,
            "end": 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#5B3AAE",
            },
            textStyle: {
                color: "rgba(204,187,225,0.5)",
            },
            fillerColor: "rgba(67,55,160,0.4)",
            borderColor: "rgba(204,187,225,0.5)",

        }, {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
        }],
        series: [{
                name: data.legendData[0],
                type: "line",
                symbolSize: 10,
                symbol: 'circle',
                lineStyle: {
                    normal: {
                        color: "#01FFFD",

                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#01FFFD',
                    }
                },
                itemStyle: {
                    color: "#01FFFD",
                    borderColor: "#fff",
                    borderWidth: 3,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1,255,253,.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(1,255,253,0.01)'
                            }
                        ], false),
                        shadowColor: 'rgba(1,255,253, 0.6)',
                        shadowBlur: 20
                    }
                },
                data: data.seriesData[0],
            },
            {
                name: data.legendData[1],
                type: "line",
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#FFFF00",
                        // shadowColor: 'rgba(0, 0, 0, .3)',
                        // shadowBlur: 0,
                        // shadowOffsetY: 5,
                        // shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#FFFF00',
                    }
                },

                itemStyle: {
                    color: "#FFFF00",
                    borderColor: "#fff",
                    borderWidth: 3,
                    // // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 2,
                    // shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,255,0,0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,0,0.01)'
                            }
                        ], false),
                        shadowColor: 'rgba(255,255,0, 0.6)',
                        shadowBlur: 20
                    }
                },
                data: data.seriesData[1],
            },
            {
                name: data.legendData[2],
                type: "line",
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "rgba(205,18,38,1)",
                        // shadowColor: 'rgba(0, 0, 0, .3)',
                        // shadowBlur: 0,
                        // shadowOffsetY: 5,
                        // shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'rgba(205,18,38,1)',
                    }
                },

                itemStyle: {
                    color: "rgba(205,18,38,1)",
                    borderColor: "#fff",
                    borderWidth: 3,
                    // // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 2,
                    // shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(205,18,38,0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(205,18,38,0.01)'
                            }
                        ], false),
                        shadowColor: 'rgba(205,18,38, 0.6)',
                        shadowBlur: 20
                    }
                },
                data: data.seriesData[2],
            },
        ]
    }
    return option;
}

const creatEchartOption_15_1_1 = (data = {}) => {
    const option = {

        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 60,
            // containLabel: true
        },
        legend: {
            x: '46%',
            top: '2%',
            textStyle: {
                color: '#90979c',
            },
            data: data.legendData,
        },


        calculable: true,


        xAxis: [{
            type: 'category',
            // data: data.xAxisData,
            data: data.xAxisData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                color: '#c1cadf'
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
                type: 'value',
                name: data.unitName[0],
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf',
                    formatter: '{value} %'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: data.unitName[1],
                position: 'right',
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, 20] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        ],
        dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 0,

            "start": 10,
            "end": 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#5B3AAE",
            },
            textStyle: {
                color: "rgba(204,187,225,0.5)",
            },
            fillerColor: "rgba(67,55,160,0.4)",
            borderColor: "rgba(204,187,225,0.5)",

        }, {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
        }],
        series: [{
            name: data.legendData[0],
            type: "line",
            symbolSize: 10,
            symbol: 'circle',
            lineStyle: {
                normal: {
                    color: "#01FFFD",

                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#01FFFD',
                }
            },
            itemStyle: {
                color: "#01FFFD",
                borderColor: "#fff",
                borderWidth: 3,
            },
            tooltip: {
                show: true
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1,255,253,.5)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(1,255,253,0.01)'
                        }
                    ], false),
                    shadowColor: 'rgba(1,255,253, 0.6)',
                    shadowBlur: 20
                }
            },
            data: data.seriesData[0],
        }, {
            name: data.legendData[1],
            type: "line",
            yAxisIndex: 1,
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: "#FFFF00",
                    // shadowColor: 'rgba(0, 0, 0, .3)',
                    // shadowBlur: 0,
                    // shadowOffsetY: 5,
                    // shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#FFFF00',
                }
            },

            itemStyle: {
                color: "#FFFF00",
                borderColor: "#fff",
                borderWidth: 3,
                // // shadowColor: 'rgba(0, 0, 0, .3)',
                // shadowBlur: 0,
                // shadowOffsetY: 2,
                // shadowOffsetX: 2,
            },
            tooltip: {
                show: true
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,255,0,0.5)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,255,0,0.01)'
                        }
                    ], false),
                    shadowColor: 'rgba(255,255,0, 0.6)',
                    shadowBlur: 20
                }
            },
            data: data.seriesData[1],
        }, ]
    }
    return option;
}
const creatEchartOption_16_1 = (data) => {
    var color = ['#1F55DD', '#01FFFD', '#FFFF00', 'rgb(255,0,0)', '#1a9bfc', '#7049f0', '#1F55DD', '#e32f46', '#94d96c', '#0bbcb7', '#1a9bfc', '#7049f0'];
    var option = {
        title: {
            left: 'center',
            text: data.title,
            textStyle: {
                color: '#FFFFFF',
                fontSize: '16',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: data.legendData,
            top: 5,
            right: 20,
            padding: 5,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 5,
            textStyle: {
                color: '#ffffff'
            },
            // icon: 'rect',
        },
        grid: {
            left: 50,
            top: 50,
            right: 30,
            bottom: 40,
            // containLabel: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: [{
                type: 'category',
                data: data.xAxisData,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    rotate: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisPointer: {
                    show: false,
                    type: 'none'
                },
                data: data.xAxisData,
            },
            {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisPointer: {
                    show: false,
                    type: 'none'
                },
                data: data.xAxisData,
            }
        ],
        yAxis: [{
                type: 'value',
                name: data.unitName[0],
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: data.unitName[1],
                position: 'right',
                offset: -35,
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, 10] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: data.unitName[2],
                position: 'right',
                nameTextStyle: {
                    color: '#ffffff',
                    padding: [0, 0, 0, 40] // 四个数字分别为上右下左与原位置距离
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(240,199,37,0.5)'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#c1cadf'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        ],
        series: [{
                name: data.legendData[0],
                type: 'bar',

                xAxisIndex: 0,
                data: data.seriesData[0],
                barWidth: 8,
                barGap: 4,
                itemStyle: {
                    normal: {
                        color: color[0]

                    }
                },
                z: 2
            },
            {
                name: data.legendData[0],
                type: 'bar',
                xAxisIndex: 1,
                barGap: '150%',
                data: formateNum(data.seriesData[0]),
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: '#0e2147',
                        barBorderRadius: 5,
                    }
                },
                z: 1
            },
            {
                name: data.legendData[0],
                type: 'bar',
                xAxisIndex: 2,
                data: formateNum1(data.seriesData[0]),
                barWidth: 20,
                barGap: 1,
                itemStyle: {
                    normal: {
                        color: color[0],
                        barBorderRadius: 5,
                    }
                },
                z: 0
            },

            {
                name: data.legendData[1],
                type: 'bar',
                yAxisIndex: 1,
                xAxisIndex: 0,
                data: data.seriesData[1],
                barWidth: 8,
                barGap: 4,
                itemStyle: {
                    normal: {
                        color: color[1]
                    }
                },
                z: 2
            },
            {
                name: data.legendData[1],
                type: 'bar',
                yAxisIndex: 1,
                xAxisIndex: 1,
                barGap: '150%',
                data: formateNum(data.seriesData[1]),
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: '#0e2147',
                        barBorderRadius: 5,
                    }
                },
                z: 1
            },
            {
                name: data.legendData[1],
                type: 'bar',
                xAxisIndex: 2,
                yAxisIndex: 1,
                data: formateNum1(data.seriesData[1]),
                barWidth: 20,
                barGap: 1,
                itemStyle: {
                    normal: {
                        color: color[1],
                        barBorderRadius: 5,
                    }
                },
                z: 0
            },

            {
                name: data.legendData[2],
                type: 'bar',
                yAxisIndex: 2,
                xAxisIndex: 0,
                data: data.seriesData[2],
                barWidth: 8,
                barGap: 4,
                itemStyle: {
                    normal: {
                        color: color[2],
                    }
                },
                z: 2
            },
            {
                name: data.legendData[2],
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 2,
                barGap: '150%',
                data: formateNum(data.seriesData[2]),
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: '#0e2147',
                        barBorderRadius: 5,
                    }
                },
                z: 1
            },
            {
                name: data.legendData[2],
                type: 'bar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: formateNum1(data.seriesData[2]),
                barWidth: 20,
                barGap: 1,
                itemStyle: {
                    normal: {

                        color: color[2],
                        barBorderRadius: 5,
                    }
                },
                z: 0
            },

            {
                name: data.legendData[3],
                type: 'bar',
                yAxisIndex: 2,
                xAxisIndex: 0,
                data: data.seriesData[3],
                barWidth: 8,
                barGap: 4,
                itemStyle: {
                    normal: {
                        color: color[3],
                    }
                },
                z: 2
            },
            {
                name: data.legendData[3],
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 2,
                barGap: '150%',
                data: formateNum(data.seriesData[3]),
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: '#0e2147',
                        barBorderRadius: 5,
                    }
                },
                z: 1
            },
            {
                name: data.legendData[3],
                type: 'bar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: formateNum1(data.seriesData[3]),
                barWidth: 20,
                barGap: 1,
                itemStyle: {
                    normal: {
                        color: color[3],
                        barBorderRadius: 5,
                    }
                },
                z: 0
            },
        ]
    };
    return option;
}

function formateNum(data) {
    var data1 = [];
    data.forEach(e => {
        data1.push(e + 10)
    })
    return data1;
}

function formateNum1(data) {
    var data1 = [];
    data.forEach(e => {
        data1.push(e + 10.5)
    })
    return data1;
}
export default {
    getLineOption,
    getBarOption,
    getBarAndLineOption,
    getPieOption,
    getRadarOption,
    getLiquidOption,
    getGaugeOption,
    getMigrationOption, // 迁徙图

    creatBarOrLineOption,
    createEchartOption_8_1,
    creatEchartOption_4_3,
    creatEchartOption_9_1,
    creatEchartOption_3_1,
    creatEchartOption_5_3,
    creatEchartOption_4_1,
    creatEchartOption_11_1,
    creatEchartOption_9_1_1,
    creatEchartOption_9_1_2,
    creatEchartOption_12_1,
    creatEchartOption_15_1,
    creatEchartOption_15_1_1,
    creatEchartOption_16_1,
};