let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getZfLawcaseList",
            searchConfig: {
                searchCondition: [
                    {
                        type: "input",
                        label: "当事人姓名",
                        // width: "123px",
                        placeholder: "当事人姓名",
                        VModelvalue: {
                            name: "partyName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "车牌号",
                        // width: "123px",
                        placeholder: "车牌号",
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
                url: '/kyjc_basicinfoHandler/getZfLawcaseById',
                show: false,
                title: '行政处罚详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '当事人单位',
                        key: 'partyUnit',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '当事人证件号',
                        key: 'partyCardId',
                        col: col
                    }],
                    [{
                        label: '车属单位',
                        key: 'vehicleUnit',
                        col: col,
                        // formate: function (val) {
                        //     if (val == 1) {
                        //         return '男';
                        //     } else if (val == 0) {
                        //         return '女';
                        //     } else {
                        //         return val;
                        //     }
                        // }
                    }, {
                        label: '车牌号',
                        key: 'vehiclePlateId',
                        col: col
                    }],
                    [{
                        label: '联系电话',
                        key: 'contactTel',
                        col: col
                    }, {
                        label: '车牌颜色',
                        key: 'plateColorCode',
                        col: col
                    }],
                    [
                        {
                            label: '处罚理由',
                            key: 'punishReason',
                            col: col
                        },{
                            label: '案件类别',
                            key: 'caseType',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '处罚机构',
                            key: 'punishUnit',
                            col: col
                        },{
                            label: '审核时间',
                            key: 'headAuditTime',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '审核结果',
                            key: 'headAudit',
                            col: col
                        },{
                            label: '所属大队',
                            key: 'belongGroup',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '企业法人姓名',
                            key: 'legalPerson',
                            col: col
                        },{
                            label: '当事人姓名',
                            key: 'partyName',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '处罚金额',
                            key: 'punishMoney',
                            col: col
                        },{
                            label: '车辆类型',
                            key: 'vehicleType',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '检查情况',
                            key: 'inspection',
                            col: col
                        },{
                            label: '检查地点',
                            key: 'checkAddr',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '处罚决定书编号',
                            key: 'punishDecisionNo',
                            col: col
                        },{
                            label: '联系人',
                            key: 'contactName',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '检查起始时间',
                            key: 'checkStartTime',
                               formate: function (val) {
                               return this.formateTime("","",val)

                               },
                            col: col
                        },{
                            label: '处罚依据',
                            key: 'punishBase',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '案件编号',
                            key: 'caseNo',
                            col: col
                        },{
                            label: '检查单位',
                            key: 'checkUnit',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '案由',
                            key: 'caseReason',
                            col: col
                        },{
                            label: '车籍地',
                            key: 'vehicleAddr',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '当事人住址',
                            key: 'partyAddr',
                            col: col
                        },{
                            label: '检查终止时间',
                            key: 'checkEndTime',
                              formate: function (val) {
                                  return this.formateTime("", "", val)

                              },
                            col: col
                        }
                    ],
                    [
                        {
                            label: '入库时间',
                            key: 'createTime',
                            formate: function (val) {
                                return this.formateTime("", "", val)

                            },
                            col: col
                        },{
                            label: '当事人电话',
                            key: 'partyTel',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '检查人姓名',
                            key: 'checkerName',
                            col: col
                        },{
                            label: '处罚机构地址',
                            key: 'punishUnitAddr',
                            col: col
                        }
                    ],
                    [
                        {
                            label: '处置措施',
                            key: 'disposeMean',
                            col: col
                        }
                    ],
                ]
            }
        }
    }

}