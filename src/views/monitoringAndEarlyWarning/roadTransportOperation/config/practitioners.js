let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getGgPersoninfoList",
            searchConfig: {
                searchCondition: [
                    // {
                    //     type: "input",
                    //     label: "行政区划",
                    //     // width: "123px",
                    //     placeholder: "行政区划",
                    //     VModelvalue: {
                    //         name: "enterpriseName",
                    //         defaultValue: ""
                    //     }
                    // },
                    {
                        type: "input",
                        label: "姓名",
                        // width: "123px",
                        placeholder: "姓名",
                        VModelvalue: {
                            name: "personName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "从业资格证号",
                        // width: "123px",
                        placeholder: "从业资格证号",
                        VModelvalue: {
                            name: "enterpseName",
                            defaultValue: ""
                        }
                    },
                    {
                        type: "input",
                        label: "身份证号",
                        // width: "123px",
                        placeholder: "身份证号",
                        VModelvalue: {
                            name: "enterpreName",
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
                url: '/kyjc_basicinfoHandler/getGgPersoninfoById',
                show: false,
                title: '从业人员详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '姓名',
                        key: 'personName',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '从业资格证号',
                        key: 'legalName',
                        col: col
                    }],
                    [{
                        label: '联系电话',
                        key: 'tel',
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
                        label: '联系地址',
                        key: 'addr',
                        col: col
                    }],
                    [{
                        label: '资格证有效期',
                        key: 'bussinessScopeCode',
                        col: col
                    }, {
                        label: '从业资格类别',
                        key: 'operaStatus',
                        col: col
                    }],
                    [{
                        label: '驾驶证号',
                        key: 'enterpriseTypeCode',
                        col: col
                    }],
                    // [{
                    //     label: '内容',
                    //     key: 'content',
                    //     col: 24
                    // }]
                ]
            }
        }
    }

}