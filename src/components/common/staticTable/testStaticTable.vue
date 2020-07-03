<template>
    <div class="testStaticTable-container" >
        <div class="testStaticTable-wrap">
            <StaticTable :tableData="tableData" :tableHeadList="tableHeadList" :stepLength="stepLength" ></StaticTable>
        </div>
        <!-- ul>li>div>(table>tr*5>td{aaaaaaa}*5)+span -->
    </div>
</template>

<script>
    export default {
        name: 'testStaticTable',
        data() {
            return {
                stepLength:60,
                tableHeadList : [{
                    "prop":"date",
                    "label":"日期",
                    "width":"180"
                },{
                    "prop":"name",
                    "label":"姓名",
                    "width":"180"
                },{
                    "prop":"address",
                    "label":"地址",
                    "width":"180"
                }],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]        
            }
        }
    }
</script>

<style lang="scss" scoped>
    .testStaticTable-wrap{
        width: 900px;
        height: 250px;
    }
</style>