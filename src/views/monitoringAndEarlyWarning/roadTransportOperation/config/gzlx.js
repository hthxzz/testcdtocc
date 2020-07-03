let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getGgEnterpriseinfoList",
            searchConfig: {
                // isKeyV:true,
                searchCondition: [{
                        type: "input",
                        label: "行政区域",
                        // width: "123px",
                        placeholder: "行政区域",
                        VModelvalue: {
                            name: "enterpriseName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "路段名称",
                        // width: "123px",
                        placeholder: "路段名称",
                        VModelvalue: {
                            name: "road",
                            defaultValue: ""
                        }
                    },
                    // {
                    //     type: "daterange",
                    //     formate: "yyyy-MM-dd",
                    //     label: "",
                    //     placeholderStart: "开始时间",
                    //     placeholderEnd: "截止时间",
                    //     VModelvalue: {
                    //         name: "date1",
                    //         defaultValue: ""
                    //     }
                    // }
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