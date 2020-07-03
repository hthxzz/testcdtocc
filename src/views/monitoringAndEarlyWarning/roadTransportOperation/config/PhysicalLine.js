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
                        label: "线路类型",
                        dataType: "int",
                        // width: "123px",
                        placeholder: "线路类型",
                        VModelvalue: {
                            name: "shuttleTypeCode",
                            defaultValue: ""
                        },
                        options: [{
                                label: "一类",
                                value: 1
                            },
                            {
                                label: "二类",
                                value: 2
                            },
                            {
                                label: "三类",
                                value: 3
                            },
                            {
                                label: "四类",
                                value: 4
                            },
                        ]
                    },
                    {
                        type: "input",
                        label: "线路名称",
                        // width: "123px",
                        placeholder: "线路名称",
                        VModelvalue: {
                            name: "shuttleName",
                            defaultValue: ""
                        }
                    },

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