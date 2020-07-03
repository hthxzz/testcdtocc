export default {
    methods: {
        creatPie2Option:function(data){
          var  option = {
                // title: {
                //     text: '嵌套饼图'
                // },
              tooltip : {
                  trigger: 'item',
                  formatter: "{b} : {c} "
              },
                series: [
                    {
                        type: 'pie',
                        data: [
                            {
                                name: data[0][0],
                                value: data[1][0],
                            },
                            {
                                name: data[0][1],
                                value: data[1][1],
                            },
                        ],
                        label: {
                            position: 'inside',
                        },
                        // radius: [0, 120],
                        radius : '35%',
                        center: ['50%', '50%'],
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#FFFFFF',
                        },
                        clockwise: true,
                        animation: false,
                    },
                    {
                        type: 'pie',
                        data: [
                            {
                                name: data[2][0],
                                value: data[3][0],
                            },
                            {
                                name: data[2][1],
                                value: data[3][1],
                            },

                        ],
                        label: {
                            // position: 'inside',
                        },
                        radius : ['45%','75%'],
                        center: ['50%', '50%'],
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#FFFFFF',
                        },
                        animation: false,
                    },
                ],
                // backgroundColor: '#FFFFFF',
            };
          return option;
        },
        creatOption: function (data, type, title, ifShowLable, ifBrokenLine, symbolSize, symbol, barWidth, unitName, areaStyle) {
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
                    if (barWidth != undefined) {
                        mydata["barWidth"] = barWidth;
                    }
                }
                mydata["data"] = data[i];

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
                    top: 30,
                    right: 30,
                    bottom: 40,
                },
                xAxis: [{
                    type: 'category',
                    data: data[1], //X轴名称
                    // name: '时间',

                    axisLabel: {
                            interval: 0,//坐标轴间隔设置
                            rotate: 45,
                            //倾斜度 -90 至 90 默认为0  
                            margin: 5,
                            textStyle: {
                                fontSize: 12
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
                        color: '#266CB4'
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
                if(type=='line'){
                    option.legend.icon='line';
                }

            }
            return option;
        }
    }
}