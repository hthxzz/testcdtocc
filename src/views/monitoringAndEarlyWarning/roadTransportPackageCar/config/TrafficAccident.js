let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/charteredCar_MonitoringDataHandler/getTrafficAccidentData",
            searchConfig: {
                searchCondition: [
                    {
                        type: "input",
                        label: "经营企业",
                        // width: "123px",
                        placeholder: "经营企业",
                        VModelvalue: {
                            name: "enterprise",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "车牌号",
                        // width: "123px",
                        placeholder: "车牌号",
                        VModelvalue: {
                            name: "carNumber",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "驾驶员",
                        // width: "123px",
                        placeholder: "驾驶员",
                        VModelvalue: {
                            name: "driver",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "时间区间",
                        // width: "123px",
                        placeholder: "时间区间",
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
                        key: 'enterpriseName',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '法人代表',
                        key: 'legalName',
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
                        label: '经营许可证',
                        key: 'licenseAbbr',
                        col: col
                    }],
                    [{
                        label: '经营范围',
                        key: 'bussinessScopeCode',
                        col: col
                    }, {
                        label: '经营状态',
                        key: 'operaStatus',
                        col: col
                    }],
                    [{
                        label: '业户类型',
                        key: 'enterpriseTypeCode',
                        col: col
                    }],
                    [{
                        label: '内容',
                        key: 'content',
                        col: 24
                    }]
                ]
            }
        }
    }

}