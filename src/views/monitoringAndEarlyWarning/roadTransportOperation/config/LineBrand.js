let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getDlPassengerBoardList",
            searchConfig: {
                searchCondition: [{
                        type: "input",
                        label: "线路名",
                        // width: "123px",
                        placeholder: "线路名",
                        VModelvalue: {
                            name: "shuttleName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "车牌号",
                        // width: "123px",
                        placeholder: "车牌号",
                        VModelvalue: {
                            name: "vehiclePlateId",
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
                url: '/kyjc_basicinfoHandler/getDlPassengerBoardById',
                show: false,
                title: '线路牌详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '线路名',
                        key: 'shuttleName',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '车牌号',
                        key: 'vehiclePlateId',
                        col: col
                    }],
                    [{
                        label: '企业电话号码',
                        key: 'enterpriseTel',
                        col: col,
                        formate: function (val) {
                            if (val == 1) {
                                return '男';
                            } else if (val == 0) {
                                return '女';
                            } else {
                                return val;
                            }


                        }
                    }, {
                        label: '起点站名',
                        key: 'startStationName',
                        col: col
                    }],
                    [{
                        label: '终点站名',
                        key: 'endStationName',
                        col: col
                    }, {
                        label: '线路牌有效期',
                        key: 'startTime',
                        formate: function (val) {
                            return this.formateTime("", "", val)
                        },
                        col: col
                    }],
                    [{
                        label: '线路牌号',
                        key: 'shuttlePlateNo',
                        col: col
                    }],
                    [{
                        label: '状态',
                        key: 'state',
                        col: 24
                    }]
                ]
            }
        }
    }

}