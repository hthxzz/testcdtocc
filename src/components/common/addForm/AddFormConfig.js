import {
    cascader
} from "./cascader.js";
export const AddFormConfig = {
    title: "添加用户", //标题
    dialogFormVisible: false, //开启或者关闭弹窗
    url: '/users/saveUser', //  数据保存地址
    // 配置的弹窗对象  type可以为input select | radio | switch | checkbox | textarea | file | date | daterange 
    // type  label name value 为必填项
    itemList: [ // 配置的弹窗对象
        [{
                type: "input",
                label: "活动名称", // 字段名称
                name: "hdmc", //字段name
                value: 'aaaaa', //字段初始值
                placeholder: "", //输入框原始提示信息
                
                rules: [ //输入框验证规则 
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ]
            },
            {
                type: "select",
                label: "活动区域",
                name: "hdqy",
                value: 'beijing', //value 等于optionList里面value的值 相当于默认选中项
                optionList: [ //下拉选择框的值
                    {
                        label: "北京",
                        value: "beijing"
                    },
                    {
                        label: "深圳",
                        value: "shenzhen"
                    }
                ]
            }
        ],
        [{
                type: "switch", //switch
                label: "及时配送",
                name: "jsps"
            },
            {
                type: "radio",
                label: "特殊资源",
                name: "tszy",
                value: '线下场地免费',
                radiOptionList: [ //单项选择的值
                    {
                        label: '线上品牌商赞助',
                        value: ''
                    },
                    {
                        label: '线下场地免费',
                        value: ''
                    }
                ]
            },
        ],
        [

            {
                type: "checkbox",
                label: "活动性质",
                name: "hdxz",
                value: ['地推活动'],
                checkboxList: [{
                        label: "美食/餐厅线上活动"
                    },
                    {
                        label: "地推活动"
                    },
                    {
                        label: "线下主题活动"
                    },
                    {
                        label: "单纯品牌曝光1"
                    }
                ]
            }, {
                type: "switch", //switch
                label: "及时配送",
                name: "jsps"
            }
        ],
        [{
            type: "textarea",
            label: "活动形式",
            name: "hdxs",
            value: '活动形式a',
            rows: '6',
            colNumber: 24, //24表示该行占有所有列
        }],
        [{
                type: "file",
                label: "文件",
                colNumber: 24,
                name: "file"
            },

        ],
        [{
                type: "date",
                label: "开始时间",
                name: "kssj"
            },
            // {
            //     type: "daterange",
            //     label: "日期范围",
            //     name: "rqfw"
            // }
        ],
        [{
            type: "cascader",
            label: "级联选择",
            name: "ssq",
            value: [],
            options: cascader
        }]
    ]
}