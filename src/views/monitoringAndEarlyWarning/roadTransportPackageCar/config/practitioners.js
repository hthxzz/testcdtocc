let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/charteredCar_BasicDataHandler/getBusinessOperators",
            searchConfig: {
                searchCondition: [
                    {
                        type: "input",
                        label: "行政区划",
                        // width: "123px",
                        placeholder: "行政区划",
                        VModelvalue: {
                            name: "enterpriseName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "姓名",
                        // width: "123px",
                        placeholder: "姓名",
                        VModelvalue: {
                            name: "enterpriseName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "从业资格证号",
                        // width: "123px",
                        placeholder: "从业资格证号",
                        VModelvalue: {
                            name: "enterpriseName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "身份证号",
                        // width: "123px",
                        placeholder: "身份证号",
                        VModelvalue: {
                            name: "enterpriseName",
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
                url: '/kyjc_basicinfoHandler/getGgEnterpriseinfoById',
                show: false,
                title: '企业信息详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '业户名称',
                        key: 'name',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '法人代表',
                        key: 'represent',
                        col: col
                    }],
                    [{
                        label: '企业电话号码',
                        key: 'phone',
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
                        label: '经营许可证',
                        key: 'license',
                        col: col
                    }],
                    [{
                        label: '经营状态',
                        key: 'status',
                        col: col
                    }, {
                        label: '经营范围',
                        key: 'scope',
                        col: col
                    }]
                ]
            }
        }
    }

}