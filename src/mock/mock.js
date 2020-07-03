




// import mock from "mockjs";


export const Mock = require('mockjs').mock;
//  const Mock = require('mockjs').mock;
var data = Mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'tableData|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'a': '@date',
        "c|1": [
            "1号线",
            "2号线",
            "3号线"
        ],
        "d|-100-100": 100,
        "e|-100-100": 100,
        "f|-100-100": 100,
    }]
})
// 输出结果
// console.log(JSON.stringify(data, null, 4))



 