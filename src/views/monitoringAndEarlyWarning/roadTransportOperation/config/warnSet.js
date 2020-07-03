let col = 12;

export default {
    // 搜索框配置
    methods: {
        ShuttleTypeCode(row, column, cellValue) {
            const config = {
                "1": "一类",
                "2": "二类",
                "3": "三类",
                "4": "四类",
            };
            return config[cellValue.toString()];
        }
    },
    data() {
        return {
            url: "/gjjc_busBaseInfo/getGgEnterpriseinfoList",
            searchConfig: {
                searchCondition: [{
                        type: "select",
                        label: "设置对象",
                        dataType: "int",
                        // width: "123px",
                        placeholder: "设置对象",
                        VModelvalue: {
                            name: "shu1ttleTypeCode",
                            defaultValue: ""
                        },
                        options: [{
                                label: "东客站",
                                value: 1
                            },
                            {
                                label: "茶店子客运站",
                                value: 2
                            },
                            {
                                label: "北门车站",
                                value: 3
                            },
                            {
                                label: "石羊车站",
                                value: 4
                            },
                        ]
                    },
                    {
                        type: "select",
                        label: "设置区域",
                        dataType: "int",
                        // width: "123px",
                        placeholder: "设置区域",
                        VModelvalue: {
                            name: "shuttleTyp1eCode",
                            defaultValue: ""
                        },
                        options: [{
                                label: "全部",
                                value: 1
                            },
                            {
                                label: "候客区",
                                value: 2
                            },
                            {
                                label: "闸机口",
                                value: 3
                            },
                            // {
                            //     label: "四类",
                            //     value: 4
                            // },
                        ]
                    },
                    {
                        type: "select",
                        label: "预警类型",
                        dataType: "int",
                        // width: "123px",
                        placeholder: "预警类型",
                        VModelvalue: {
                            name: "shuttleTypeC1ode",
                            defaultValue: ""
                        },
                        options: [{
                                label: "大客流",
                                value: 1
                            },
                            // {
                            //     label: "二类",
                            //     value: 2
                            // },
                            // {
                            //     label: "三类",
                            //     value: 3
                            // },
                            // {
                            //     label: "四类",
                            //     value: 4
                            // },
                        ]
                    },
                    {
                        type: "select",
                        label: "预警阈值",
                        dataType: "int",
                        // width: "123px",
                        placeholder: "预警阈值",
                        VModelvalue: {
                            name: "shuttl1eTypeCod1e",
                            defaultValue: ""
                        },
                        options: [{
                                label: "20人/分钟",
                                value: 1
                            },
                            {
                                label: "30人/分钟",
                                value: 2
                            },
                            {
                                label: "40人/分钟",
                                value: 3
                            },
                            {
                                label: "50人/分钟",
                                value: 4
                            },
                        ]
                    },
                    {
                        type: "select",
                        label: "阈值状态",
                        dataType: "int",
                        // width: "123px",
                        placeholder: "阈值状态",
                        VModelvalue: {
                            name: "shuttleTyp1eCo1de",
                            defaultValue: ""
                        },
                        options: [{
                                label: "一级预警",
                                value: 1
                            },
                            {
                                label: "二级预警",
                                value: 2
                            },
                            {
                                label: "三级预警",
                                value: 3
                            },
                            {
                                label: "四级预警",
                                value: 4
                            },
                        ]
                    },
                    // {
                    //     type: "input",
                    //     label: "线路名称",
                    //     // width: "123px",
                    //     placeholder: "线路名称",
                    //     VModelvalue: {
                    //         name: "shuttleName",
                    //         defaultValue: ""
                    //     }
                    // },

                ],
                searchButtonGroup: [{
                        action: "query",
                        label: "查询"
                    },
                    {
                        action: "export",
                        label: "导出"
                    }
                ]
            },

            // 表单详情配置
            detailFormConfig: {
                // 表单详情请求地址
                url: '/kyjc_basicinfoHandler/getDlPassengerLineById',
                show: false,
                title: '企业信息详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '线路名称',
                        key: 'shuttleName',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '出发城市',
                        key: 'startCity',
                        col: col
                    }],
                    [{
                        label: '线路类别',
                        key: 'shuttleTypeCode',
                        col: col,
                        formate: function (val) {
                            return this.ShuttleTypeCode("", "", val)


                        }
                    }, {
                        label: '到达城市',
                        key: 'endCity',
                        col: col
                    }],
                    [{
                        label: '线路里程',
                        key: 'mile',
                        col: col
                    }, {
                        label: '主要途经区域',
                        key: 'keyArea',
                        col: col
                    }],
                    [{
                        label: '线路状态',
                        key: 'routeStateCode',
                        col: col
                    }],
                ]
            }
        }
    }

}