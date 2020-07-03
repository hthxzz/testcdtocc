











export  const searchConfig  = {
searchConfig: {
    searchCondition: [{
            type: "input",
            label: "",
            placeholder: "事件名称",
            VModelvalue: {
                name: "name",
                defaultValue: "a"
            }
        },
        {
            type: "input",
            label: "",
            placeholder: "路线编码",
            VModelvalue: {
                name: "lxbm",
                defaultValue: "11111111111"
            }
        },
        {
            type: "select",
            label: "",
            placeholder: "事件类型",
            VModelvalue: {
                name: "select",
                defaultValue: ""
            },
            options: [{
                    value: "选项1",
                    label: "全部"
                },
                {
                    value: "选项2",
                    label: "拥堵事件"
                },
                {
                    value: "选项3",
                    label: "预警事件"
                },
                {
                    value: "选项4",
                    label: "阻断事件"
                },
                {
                    value: "选项5",
                    label: "管制事件"
                },
                {
                    value: "选项6",
                    label: "交通事件"
                }
            ]
        },
        {
            type: "datetimerange",
            formate: "yyyy-MM-dd HH:mm:ss",
            label: "",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
                name: "date1",
                defaultValue: "2"
            }
        }
    ],
    searchButton: [{
            order: 1,
            label: "查询"
        },
        {
            order: 2,
            label: "添加"
        }
    ]
}

}