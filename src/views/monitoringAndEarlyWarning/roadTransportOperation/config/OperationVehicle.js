let col = 12;

export default {
    // 搜索框配置
    data() {
        return {
            url: "/kyjc_basicinfoHandler/getVehicleInfoModelList",
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
                        label: "车牌号",
                        // width: "123px",
                        placeholder: "车牌号",
                        VModelvalue: {
                            name: "vehiclePlateNum",
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
                url: '/kyjc_basicinfoHandler/getVehicleInfoModelById',
                show: false,
                title: '企业信息详情',
                // 是否显示x按钮
                showCancel: true,
                id: '',
                data: [
                    [{
                        label: '车牌号',
                        key: 'vehiclePlateNum',
                        col: col,
                        formate: function (val) {
                            return val;
                        }
                    }, {
                        label: '准载客数',
                        key: 'seatNum',
                        col: col
                    }],
                    [{
                        label: '保险有效期',
                        key: 'insuranceExpires',
                        col: col,
                    }, {
                        label: '额定座数',
                        key: 'seatsCount',
                        col: col
                    }],
                    [{
                        label: '车站名称',
                        key: 'station',
                        col: col
                    }, {
                        label: '车牌颜色',
                        key: 'plateColorCode',
                        col: col
                    }],
                ]
            }
        }
    }

}