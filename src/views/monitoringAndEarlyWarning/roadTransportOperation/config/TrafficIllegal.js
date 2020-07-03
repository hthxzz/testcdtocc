let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getJgTrafficIlleailList",
            searchConfig: {
                // isKeyV:true,
                searchCondition: [
                    {
                        type: "input",
                        label: "驾驶员姓名",
                        // width: "123px",
                        placeholder: "驾驶员姓名",
                        VModelvalue: {
                            name: "ntrrseNme",
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
                    {
                        type: "input",
                        label: "违法时间",
                        // width: "123px",
                        placeholder: "违法时间",
                        VModelvalue: {
                            name: "illegalTime",
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
                url: '/kyjc_basicinfoHandler/getJgTrafficIlleailById',
                show: false,
                title: '交通违法行为详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '驾驶员姓名',
                        key: 'driverName',
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
                        label: '车牌颜色',
                        key: 'plateColorCode',
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
                        label: '描述',
                        key: 'describeStr',
                        col: col
                    }],
                    [{
                        label: '交通违法编号',
                        key: 'illegalId',
                        col: col
                    }, {
                        label: '违法地点',
                        key: 'illealLocation',
                        col: col
                    }],
                    [{
                        label: '驾驶证号',
                        key: 'licenseId',
                        col: col
                    }],
                    [{
                        label: '违法时间',
                        key: 'illegalTime',
                        formate: function (val) {
                            return this.formateTime("", "",val)

                        },
                        col: 24
                    }]
                ]
            }
        }
    }

}