export default {
            timeStart :"2019-08-26 00：00：00",
            timeEnd: "2019-08-26 24：59：59",
            showSearchPanel: true,
            zd:12,
            zg:1,
                option : {
                    tooltip: {
                        trigger: 'axis',
                        showContent: false
                    },
                    dataset: {
                        source: [
                            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                            ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                        ]
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        gridIndex: 0,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },

                    series: [{
                            type: 'line',
                            smooth: true,
                            seriesLayoutBy: 'row'
                        },
                        {
                            type: 'line',
                            smooth: true,
                            seriesLayoutBy: 'row'
                        },
                    ]
                },
            timeType:'小时',
            searchConfigList: [{
                    order: 2,
                    type: "select",
                    label: '行政区域',
                    placeholder: "",
                    VModelvalue: {
                        name: "select",
                        defaultValue: "武侯区"
                    },
                    options: [{
                            value: "选项1",
                            label: "武侯区"
                        },
                        {
                            value: "选项2",
                            label: "青羊区"
                        },
                        {
                            value: "选项3",
                            label: "金牛区"
                        },
                        {
                            value: "选项4",
                            label: "锦江区"
                        },
                        {
                            value: "选项5",
                            label: "双流区"
                        }
                    ]
                }, {
                    order: 22,
                    type: "select",
                    label: '统计维度',
                    placeholder: "",
                    VModelvalue: {
                        name: "wd",
                        defaultValue: "小时"
                    },
                    options: [{
                            value: "选项1",
                            label: "小时"
                        },
                        {
                            value: "选项2",
                            label: "分钟"
                        },
                        {
                            value: "选项3",
                            label: "月"
                        },
                        {
                            value: "选项4",
                            label: "天"
                        },
                        {
                            value: "选项5",
                            label: "周"
                        }
                    ]
                }, {
                    order: 2,
                    type: "select",
                    label: '时间类型',
                    placeholder: "",
                    VModelvalue: {
                        name: "timeType",
                        defaultValue: "节假日"
                    },
                    options: [{
                            value: "选项1",
                            label: "节假日"
                        },
                        {
                            value: "选项2",
                            label: "劳动节"
                        },
                        {
                            value: "选项3",
                            label: "非节假日"
                        }
                    ]
                },
                {
                    order: 3,
                    type: "datetimerange",
                    formate: 'yyyy-MM-dd HH:mm:ss',
                    label: '统计时间',
                    placeholderStart: '开始时间',
                    placeholderEnd: '截止时间',
                    VModelvalue: {
                        name: "date1",
                        defaultValue: "2"
                    }
                }
            ],
            stepLength: 60,
            tableConfig: {
                height: "100"
            },
            tableHeadList: [{
                    prop: "date",
                    label: "时间",
                    align: "center",
                    // width: "56"
                    // formatter:function(row, column, cellValue, index){
                    //     return "<div>"+ cellValue +"</div>";
                    // }
                },
                {
                    prop: "index",
                    label: "平均交通指数",
                    align: "center"
                    // "width":"100"
                },
                {
                    prop: "histroy",
                    align: "center",
                    label: "历史同期",
                    // width: "100"
                },
                {
                    prop: "changeRate",
                    align: "center",
                    label: "变化",
                    // width: "100"
                }
            ],
            tableData: [...new Array(10).fill({
                    date: "2019-08-26  00:00:00",
                    index: "2.5",
                    histroy: "2.3",
                    changeRate: "8.7"
                })

            ]
        }