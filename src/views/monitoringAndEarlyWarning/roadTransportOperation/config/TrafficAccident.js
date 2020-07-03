let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getJgStatsAccidentList",
            searchConfig: {
                searchCondition: [
                    {
                        type: "input",
                        label: "驾驶员姓名",
                        // width: "123px",
                        placeholder: "驾驶员姓名",
                        VModelvalue: {
                            name: "driverName",
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
                        label: "驾驶证号码",
                        // width: "123px",
                        placeholder: "驾驶证号码",
                        VModelvalue: {
                            name: "licenseId",
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
                url: '/kyjc_basicinfoHandler/getJgTrafficAccidentById',
                show: false,
                title: '交通事故详情',
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
                        label: '行政区划',
                        key: 'districtCode',
                        col: col
                    }],
                    [{
                        label: '责任类型',
                        key: 'dutyType',
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
                        label: '交通事故原因',
                        key: 'accidentReasonCode',
                        col: col
                    }],
                    [{
                        label: '事故发生时间',
                        key: 'occurTime',
                         formate: function (val) {
                             return this.formateTime("", "", val)

                         },
                        col: col
                    }, {
                        label: '车牌号',
                        key: 'vehiclePlateId',
                        col: col
                    }],
                    [{
                        label: '车牌颜色',
                        key: 'plateColorCode',
                        col: col
                    }],
                    [
                        {
                            label: '当事人属性',
                            key: 'personAttr',
                            col: col
                        },
                        {
                            label: '事故发生位置',
                            key: 'locationDescribe',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '交通事故原因',
                            key: 'accidentReason',
                            col: col
                        },
                        {
                            label: '驾驶证种类',
                            key: 'licenseType',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '路段管辖单位',
                            key: 'squadronName',
                            col: col
                        },
                        {
                            label: '死亡人数',
                            key: 'deathNum',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '驾驶证号码',
                            key: 'licenseId',
                            col: col
                        },
                        {
                            label: '经度',
                            key: 'longitude',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '事故类型',
                            key: 'accidentTypeCode',
                            col: col
                        },
                        {
                            label: '当事人所属机构',
                            key: 'orgName',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '事故来源',
                            key: 'accidentSource',
                            col: col
                        },
                        {
                            label: '事故描述',
                            key: 'accidentDescribe',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '受伤人数',
                            key: 'injuredNum',
                            col: col
                        },
                        {
                            label: '驾驶员性别',
                            key: 'sex',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '准驾车型代码',
                            key: 'vehicleCode',
                            col: col
                        },
                        {
                            label: '交通事故类型',
                            key: 'accidentType',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '财产损失',
                            key: 'propertyLoss',
                            col: col
                        },
                        {
                            label: '驾驶员证件号码',
                            key: 'certifyId',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '失踪人数',
                            key: 'unaccountedNum',
                            col: col
                        },
                        {
                            label: '事故责任类型',
                            key: 'accidentLiability',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '驾驶员年龄',
                            key: 'age',
                            col: col
                        },
                        {
                            label: '事故编号',
                            key: 'accidentId',
                            col: col
                        },
                    ],
                    [
                        {
                            label: '事故责任类型',
                            key: 'accidentLiabilityCode',
                            col: col
                        },
                    ],
                ]
            }
        }
    }

}