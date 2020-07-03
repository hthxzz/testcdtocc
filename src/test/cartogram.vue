<template>
    <div class="container">
        <div class="left-panel panel">
            <div class="first item">
                <span></span>
                <div class="panel-title">
                    <panelTitle title="echar图表"></panelTitle>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption2" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption3" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption4" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption5" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption6" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption7" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
                <div class="panel-content">
                    <div class="char" style="width:600px;">
                        <v-chart :options="echarOption8" theme="theme"/>
                        <!-- <div class="pic-char"></div> -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import panelTitle from "@/components/index/panelTitle.vue";

    import echarts from 'echarts';

    export default {
        name: '',
        components: {
            panelTitle

        },
        created() {
            console.log('menugeta');
            //速度表
            this.$http.$get("getOptionSpeedometer").then((param) => {
                this.$data.echarOption5 = param.option;
            });
            //玫瑰图
            this.$http.$get("getOptionRose").then((param) => {
                this.$data.echarOption4 = param.option;
            });
            //雷达图
            this.$http.$get("getOptionRadar").then((param) => {
                this.$data.echarOption6 = param.option;
            });
            this.creatOption(this.echarTestData, "bar", "柱状图、折线图");
            this.creatOption2();
            this.creatOption3();
            this.creatOption7();
            this.creatOption8();
            // this.creatOption4();

        },
        data() {
            return {
                echarOption: {},
                echarOption2: {},
                echarOption3: {},
                echarOption4: {},
                echarOption5: {},
                echarOption6: {},
                echarOption7: {},
                echarOption8: {},
                echarTestData: [
                    ["当前", "历史"],
                    ["绕城内", "绕城外", "三环内", "三环外", "进城", "出城"],
                    [10, 9, 20, 30, 100, 80],
                    [20, 80, 100, 200, 150, 60]],

            }
        },
        mounted(){
            // this.$http.$get("getOptionSpeedometer").then((param) => {
            //     debugger;
            //     console.log(this);
            //     this.$data.echarOption5 = param.data;
            // });
        },
        methods: {
            creatOption8:function(){
                var option = {
                    calculable: true,
                    //color:colorList,
                    series: [
                        {
                            name:'漏斗图',
                            type:'funnel',
                            left: '5%',
                            right:'35%',
                            top: '10%',
                            bottom: '10%',
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'ascending',
                            label: {
                                show: true,
                                formatter: "{a|{c}}\n{b|{b}}",
                                rich: {
                                    a: {
                                        color: 'rgba(222,240,255,1)',
                                        fontSize: 30
                                    },
                                    b: {
                                        color: 'rgba(101,166,196,1)',
                                        fontSize: 14
                                    }
                                }
                            },
                            labelLine: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            data: [
                                {value: 1, name: '处置数'},
                                {value: 2, name: '新建数'},
                                {value: 3, name: '修改数'},
                                {value: 4, name: '已完成'}
                            ]
                        }
                    ]
                }
                this.echarOption8=option;
            },
            creatOption7:function(){
                var weekDay = 0;
                var data = [{
                    name: '可可慕斯',
                    value: [1, 2, 5, 7, 6, 7, 1]
                }, {
                    name: '马卡龙',
                    value: [3, 4, 5, 8, 2, 9, 10]
                }, {
                    name: '布朗尼',
                    value: [2, 4, 5, 7, 3, 9, 11]
                }]

                var option = {
                    title: {
                        text: 'Snow蛋糕店-本周各类蛋糕销量',
                        subtext: '点击极坐标系下即可与圆环图交互',
                        textAlign: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        padding: 10,
                        backgroundColor: '#222',
                        borderColor: '#777',
                        borderWidth: 1,
                        //formatter: tooltipFormatter,

                    },
                    angleAxis: {
                        type: 'category',
                        data: [{
                            value: '星期一',
                            textStyle: {
                                fontSize: 25,
                            }
                        }, '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                        z: 10
                    },
                    polar: {
                        center: ['50%', '50%'],
                        radius: 100,
                    },
                    radiusAxis: {},
                    series: [{
                        type: 'bar',
                        data: [
                            data["0"].value["0"],
                            data["0"].value["1"],
                            data["0"].value["2"],
                            data["0"].value["3"],
                            data["0"].value["4"],
                            data["0"].value["5"],
                            data["0"].value["6"],
                        ],
                        coordinateSystem: 'polar',
                        name: data["0"].name,
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                //borderWidth: 4,
                               // borderColor: '#ffffff',
                            },
                            emphasis: {
                                borderWidth: 0,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }, {
                        type: 'bar',
                        data: [
                            data["1"].value["0"],
                            data["1"].value["1"],
                            data["1"].value["2"],
                            data["1"].value["3"],
                            data["1"].value["4"],
                            data["1"].value["5"],
                            data["1"].value["6"],
                        ],
                        coordinateSystem: 'polar',
                        name: data["1"].name,
                        stack: 'a',
                        itemStyle: {
                            normal: {
                               // borderWidth: 4,
                                //borderColor: '#ffffff',
                            },
                            emphasis: {
                                borderWidth: 0,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }, {
                        type: 'bar',
                        data: [
                            data["2"].value["0"],
                            data["2"].value["1"],
                            data["2"].value["2"],
                            data["2"].value["3"],
                            data["2"].value["4"],
                            data["2"].value["5"],
                            data["2"].value["6"],
                        ],
                        coordinateSystem: 'polar',
                        name: data["2"].name,
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                //borderWidth: 3,
                                //borderColor: '#ffffff',
                            },
                            emphasis: {
                                borderWidth: 3,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    } /*,{
                        name: '每天销量',
                        type: 'pie',
                        radius: ['95%', '100%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                formatter: '{b} : {c} ({d}%)'

                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '15',
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                            value: data["0"].value["0"],
                            name: data["0"].name
                        }, {
                            value: data["1"].value["0"],
                            name: data["1"].name
                        }, {
                            value: data["2"].value["0"],
                            name: data["2"].name
                        }],
                        legend: {
                            show: true,
                            orient: 'vertical',
                            x: 'right',
                            y: 'top',
                            data: [data["0"].name, data["1"].name, data["2"].name, ]
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 3,
                                borderColor: '#ffffff',
                            },
                            emphasis: {
                                borderWidth: 3,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }*/
                    ]
                }
                this.echarOption7=option;

            },
            creatOption5: function () {
                var option = {
                    // backgroundColor: '#1b1b1b',
                    tooltip: {
                        formatter: "{a} <br/>{c} {b}"
                    },
                    title: {
                        text: '一环',
                        left: '48%',
                        bottom: 10,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: '14'
                        }
                    },
                    series: [
                        {
                            name: '速度',
                            type: 'gauge',
                            min: 0,
                            max: 140,
                            splitNumber: 7,
                            radius: '100%',
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: [[0.142857142857, 'rgba(255, 0, 0, 1)'], [0.5, 'rgba(255, 192, 0, 1)'], [0.78571428571, 'rgba(146, 208, 80, 1)'], [1, 'rgba(40, 183, 77, 1)']],
                                    width: 3,
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            // pointer:{
                            //     // show:false,
                            //     width:6
                            // },
                            axisLabel: {            // 坐标轴小标记
                                // textStyle: {       // 属性lineStyle控制线条样式
                                //     fontWeight: 'bolder',
                                //     color: '#fff',
                                //     shadowColor : '#fff', //默认透明
                                //     shadowBlur: 10
                                // }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 8,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto',
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 11,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    width: 3,
                                    color: '#fff',
                                    // shadowColor : '#fff', //默认透明
                                    // shadowBlur: 10
                                }
                            },
                            title: {
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
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
                                offsetCenter: [0, '50%'],       // x, y，单位px
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    color: '#fff'
                                }
                            },
                            data: [{value: 40, name: 'km/h'}]
                        }

                    ]
                }
                this.echarOption5 = option;
            },
            creatOption4: function () {
                var option = {
                    title: {
                        text: '南丁格尔玫瑰图',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        position: ['50%', '50%'],
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    // legend: {
                    //     x : 'center',
                    //     y : 'bottom',
                    //     data:['rose1','rose2','rose3']
                    // },
                    calculable: true,
                    series: [

                        {
                            name: '交通方式',
                            type: 'pie',
                            radius: [14, '70%'],
                            // center : ['50%', '50%'],
                            roseType: 'area',
                            data: [{value: 10, name: '火车'},
                                {value: 30, name: '飞机'},
                                {value: 40, name: '汽车'}]
                        }
                    ]
                };
                this.echarOption4 = option;
            },
            creatOption3: function () {
                var dataStyle = {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        shadowBlur: 40,
                        borderWidth: 10,
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                };
                var placeHolderStyle = {
                    normal: {
                        color: '#393d50',
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: '#393d50'
                    }
                };
                var option = {
                    // backgroundColor: '#142058',
                    title: {
                        text: '多重环状图',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 24,
                            color: "#fff",
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: "{b} : <br/>{c} :{d}%",
                        // backgroundColor: 'rgba(0,0,0,0.7)', // 背景
                        padding: [8, 10], //内边距
                        extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                    },
                    legend: {
                        orient: 'vertical',
                        // icon: 'circle',
                        left: 'left',
                        top: '20',
                        itemGap: 20,
                        data: ['四级匹配度', '三级匹配度', '二级匹配度', '一级匹配度'],
                        textStyle: {
                            color: '#fft'
                        }
                    },
                    series: [{
                        name: 'Line 1',
                        type: 'pie',
                        radius: ['75%', '85%'],
                        center: ['50%', '50%'],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        startAngle: 90,
                        clockWise: true,
                        label: {
                            borderRadius: '10',
                        },
                        data: [{
                            value: 54.6,
                            name: '四级匹配度',
                            itemStyle: {
                                normal: {
                                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    //     offset: 0,
                                    //     color:color[0]
                                    // }, {
                                    //     offset: 1,
                                    //     color: color[1]
                                    // }])
                                    color: 'rgba(32, 86, 221, 1)'
                                }
                            }
                        },
                            {
                                value: 45.4,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: placeHolderStyle
                            },
                        ]
                    },
                        {
                            name: 'Line 2',
                            type: 'pie',
                            radius: ['60%', '70%'],
                            center: ['50%', '50%'],
                            itemStyle: dataStyle,
                            clockWise: true,
                            hoverAnimation: false,
                            startAngle: 90,
                            data: [{
                                value: 56.7,
                                name: '三级匹配度',
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(255, 255, 0, 1)'
                                    }
                                }
                            },
                                {
                                    value: 43.3,
                                    name: '',
                                    tooltip: {
                                        show: false
                                    },
                                    itemStyle: placeHolderStyle
                                },
                            ]
                        },
                        {
                            name: 'Line 3',
                            type: 'pie',
                            radius: ['45%', '55%'],
                            center: ['50%', '50%'],
                            itemStyle: dataStyle,
                            hoverAnimation: false,
                            startAngle: 90,
                            data: [{
                                value: 30,
                                name: '二级匹配度',
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(0, 176, 80, 1)'
                                    }
                                }
                            },
                                {
                                    value: 10,
                                    name: '',
                                    tooltip: {
                                        show: false
                                    },
                                    itemStyle: placeHolderStyle
                                },
                            ]
                        },
                        {
                            name: 'Line 4',
                            type: 'pie',
                            radius: ['30%', '40%'],
                            center: ['50%', '50%'],
                            itemStyle: dataStyle,
                            hoverAnimation: false,
                            startAngle: 90,
                            data: [{
                                value: 30,
                                name: '一级匹配度',
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(114, 246, 250, 1)'
                                    }
                                }
                            },
                                {
                                    value: 26,
                                    name: '',
                                    tooltip: {
                                        show: false
                                    },
                                    itemStyle: placeHolderStyle
                                },
                            ]
                        }
                    ]
                };
                this.echarOption3 = option;
            },
            creatOption2: function () {
                var option = {
                    title: {
                        text: '环状图',
                        x: 'center',
                        // y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 24,
                            color: "#fff",
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    graphic: [{ //环形图中间添加文字
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '45%',
                        style: {
                            text: '访问来源',
                            textAlign: 'center',
                            fill: '#ffffff', //文字的颜色
                            width: 30,
                            height: 30,
                            fontSize: 20,
                            fontFamily: "Microsoft YaHei"
                        }
                    }],

                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    formatter: ' {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
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
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        }
                    ]
                }
                this.echarOption2 = option;
            },
            creatOption: function (data, type, title) {
                var arraylist = [];//
                for (var i = 2; i < data.length; i++) {
                    var mydata = {};
                    mydata["name"] = data[0][i - 2];
                    mydata["type"] = type;
                    mydata["data"] = data[i];
                    var lable = {};
                    var normal = {};
                    normal["show"] = true;
                    normal["position"] = '\"top\"';
                    //normal["formatter"]=formate(params);
                    lable["normal"] = normal;
                    mydata["lable"] = lable;
                    arraylist[i - 2] = mydata;
                }

                var option = {
                    title: {
                        text: title,
                        subtext: '',
                        x: 'center',
                        textStyle: {fontSize: 16, color: '#266CB4'}
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['bar', 'line', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: { // 图例配置
                        x: 'center',
                        y: 'bottom',
                        padding: 5, // 图例内边距，单位px，默认上下左右内边距为5
                        itemGap: 10, // Legend各个item之间的间隔，横向布局时为水平间隔，纵向布局时为纵向间隔
                        data: data[0]//图例名称
                    },
                    grid: {
                        x: 60,
                        x2: 40,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: data[1],//X轴名称
                            name: '时间'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: ''
                        }
                    ],
                    series: arraylist
                };
                this.echarOption = option;
            }
        }
    }


</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        width: 100%;
        display: flex;

        .panel {
            flex: 410;
            margin-left: .1rem /* 10/100 */
        ;
            display: flex;
            flex-direction: column;

            .item {
                // width:410px;
                // height:342px;
                display: flex;
                flex: 1;
                position: relative;
                flex-direction: column;
                background: rgba(5, 12, 38, 0.4) no-repeat;
                background-position: bottom center;
                background-image: url('../assets/index/index/echart_bg.png');
                border: 1px solid rgba(32, 86, 221, 1);
                // opacity:0.4;
                .panel-title {
                    flex: 50;
                    margin: 0 20px;
                }

                .panel-content {
                    float: left;
                    margin-left: 0;
                    flex: 291;
                    display: flex;
                    flex-direction: column;
                }
            }

            .first {
                flex: 1;
                flex-direction: column;
                // .panel-title{
                //     flex:50;
                //     margin:0 20px;
                // }
                .panel-content {
                    // margin-left: 0;
                    // flex:291;
                    // display: flex;
                    // flex-direction: column;
                    .title {
                        // width:133px;
                        // height:16px;
                        display: flex;
                        flex: 23;
                        justify-content: space-between;

                        h2 {
                            margin-top: .22rem /* 22/100 */
                        ;
                            font-size: 16px;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            line-height: 30px;
                        }

                        h2:nth-child(1) {
                            margin-left: .21rem /* 22/100 */
                        ;
                        }

                        h2:nth-child(2) {
                            // margin-left: 1.62rem /* 162/100 */;
                            cursor: pointer;
                        }

                        h2:nth-child(3) {
                            margin-left: .22rem /* 22/100 */
                        ;
                            color: #2056DD;
                            cursor: pointer;
                        }

                        h2:nth-child(4) {
                            margin-right: .27rem /* 22/100 */
                        ;
                            color: #2056DD;

                        }


                    }

                    .char {
                        flex: 253;
                        display: flex;
                    }

                    .char > div {
                        flex: 1;
                    }
                }
            }

            .first::before {
                width: 1px;
                content: '';
                height: 1px;
            }

            .second, .five, .six {
                flex: 1;

                margin-top: .1rem /* 10/100 */
            ;
            }

            .three {
                flex: 1;
                margin-top: .1rem /* 10/100 */
            ;
            }
        }

        .content {
            flex: 1060;
            display: flex;
            flex-direction: column;
            margin: 0 0 0 10px;
            position: relative;

            .map-wrap {
                flex: 681;
                // width:1060px;
                // height:682px;
                background: radial-gradient(circle, rgba(32, 86, 221, .4), rgba(7, 22, 54, .4));
                border: 1px solid rgba(32, 86, 221, 1);
            }

            .float-map-menu {
                position: absolute;
                right: 10px;
            }

            .speed {
                flex: 268;
                margin-top: 10px;
                // width:1060px;
                // height:269px;
                display: flex;
                flex-direction: column;
                background: rgba(5, 12, 38, .4);
                border: 1px solid rgba(32, 86, 221, 1);
                // opacity:0.4;
                .panel-title {
                    flex: 47;
                }

                .panel-content {
                    display: flex;
                    flex-direction: row;
                    // height: 100%;
                    flex: 211;

                    .gauge {
                        flex: 1;
                        height: 100%;
                    }
                }
            }
        }

        .right-panel {
            margin-right: 10px;
        }
    }

    .echarts {
        /* min-height: 161px;*/
        width: 600px ;/* 200/100 */
        height: 400px;
    }
</style>