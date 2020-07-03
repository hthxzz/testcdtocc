let col = 12;

export default {
    // 搜索框配置
    mounted () {
        // this.$http.$get("dictHandler/getDistrictList").then((data) => {
        //     debugger;
        //     console.log(data);
            
        // })  
        this.searchConfig.searchCondition[0].options.push(
        //     {
        //         value: "武侯区",
        //         label: "武侯区"
        //     }
        )
    },
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getGgEnterpriseinfoList",
            searchConfig: {
                searchCondition: [
                    {
                        order: 36,
                        type: "select",
                        label: "地区",
                        placeholder: "地区",
                        VModelvalue: {
                            name: "cxnx",
                            defaultValue: ""
                        },
                        options: [{
                                value: "全部",
                                label: "全部"
                            }
                            
                        ]
                    },
                    {
                        order: 36,
                        type: "select",
                        label: "频次",
                        placeholder: "频次",
                        VModelvalue: {
                            name: "cxaqnx",
                            defaultValue: "月"
                        },
                        options: [{
                                value: "全部",
                                label: "全部"
                            },
                            {
                                value: "年",
                                label: "年"
                            },
                            {
                                value: "月",
                                label: "月"
                            },
                            {
                                value: "日",
                                label: "日"
                            },
                        ]
                    },
                    {
                        order: 36,
                        type: "select",
                        label: "车辆查询范围",
                        placeholder: "车辆查询范围",
                        VModelvalue: {
                            name: "cxanx",
                            defaultValue: "包车"
                        },
                        options: [{
                                value: "全部",
                                label: "全部"
                            },
                            {
                                value: "班次停班包车",
                                label: "班次停班包车"
                            },
                            {
                                value: "包车",
                                label: "包车"
                            },
                        ]
                    },

                    {
                        order: 1,
                        type: "input",
                        label: "经营企业",
                        // width: "123px",
                        placeholder: "经营企业",
                        VModelvalue: {
                            name: "cxnr",
                            defaultValue: ""
                        }
                    },
                    {
                        order: 14,
                        otype: 'week',
                        type: "daterange",
                        formate: "yyyy-MM-dd",
                        label: "时间",
                        placeholderStart: "开始时间",
                        placeholderEnd: "截止时间",
                        VModelvalue: {
                            name: "sj",
                            defaultValue: ""
                        }
                    }
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