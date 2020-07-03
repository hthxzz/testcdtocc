let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getDlPassengerComplaintList",
            searchConfig: {
                searchCondition: [
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
                        label: "所属企业名称",
                        // width: "123px",
                        placeholder: "所属企业名称",
                        VModelvalue: {
                            name: "enterpriseName",
                            defaultValue: ""
                        }
                    },
                    // {
                    //     type: "input",
                    //     label: "时间区间",
                    //     // width: "123px",
                    //     placeholder: "时间区间",
                    //     VModelvalue: {
                    //         name: "enterpriseName",
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
                url: '/kyjc_basicinfoHandler/getDlPassengerComplaintById',
                show: false,
                title: '营运投诉详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '车牌号',
                        key: 'vehiclePlateId',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '发生地点',
                        key: 'occurTime',
                        col: col
                    }],
                    [{
                        label: '违章分类一级名称',
                        key: 'violationOne',
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
                        label: '违章分类代码',
                        key: 'violationTypeCode',
                        col: col
                    }],
                    [{
                        label: '投诉时间',
                        key: 'complaintTime',
                        col: col
                    }, {
                        label: '投诉分类代码',
                        key: 'complaintTypeCode',
                        col: col
                    }],
                    [{
                        label: '投诉处理状态',
                        key: 'handleState',
                        col: col
                    }],
                    [
                        {
                            label: '违章分类',
                            key: 'violationType',
                            col: col
                        },
                        {
                            label: '违章分类一级代码',
                            key: 'violationOneCode',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '车牌颜色代码',
                            key: 'plateColorId',
                            col: col
                        },
                        {
                            label: '所属企业名称',
                            key: 'enterpriseName',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '投诉人联系电话',
                            key: 'complainantTel',
                            col: col
                        },
                        {
                            label: '行业分类',
                            key: 'tradeType',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '行业分类代码',
                            key: 'tradeTypeCode',
                            col: col
                        },
                        {
                            label: '违章分类二级名称',
                            key: 'violationTwo',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '投诉渠道',
                            key: 'complaintChannel',
                            col: col
                        },
                        {
                            label: '处理时间',
                            key: 'handleTime',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '处理人',
                            key: 'handleName',
                            col: col
                        },
                        {
                            label: '投诉人姓名',
                            key: 'complainantName',
                            col: col
                        },
                    ],
                    [{
                            label: '投诉内容',
                            key: 'complaintContent',
                            col: 24
                        }],
                    [
                        {
                            label: '投诉渠道代码',
                            key: 'complaintChannelCode',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '投诉单号',
                            key: 'complaintId',
                            col: col
                        },
                        {
                            label: '违章分类二级代码',
                            key: 'violationTwoCode',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '所属企业ID',
                            key: 'enterpriseId',
                            col: col
                        },
                    ],
                ]
            }
        }
    }

}