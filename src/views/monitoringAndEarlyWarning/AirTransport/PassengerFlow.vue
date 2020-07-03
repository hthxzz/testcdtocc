<template>
    <div class="PassengerFlowTrend-wrapper">
        <!-- <h2></h2> -->
        <!-- 搜索开始 -->
        <section class="search-wrapper">
            <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"  @handleQuery="handleQuery"  ></SearchPanel>
        </section>
        <!-- echar图开始 -->
        <section class="echar-wrapper">
            <div class="item">
                <ul>
                    <li>客流量</li>
                    <li>{{passengerTraffic}}</li>
                </ul>
            </div>
            <div class="item">
                <div class="echar-pie">
                    <v-chart :options="option"/>
                </div>
                <div class="btn-wrappper"  >
                    <ChangeEchar :itemList="echarConfig" @getStatues="changeEchar" ></ChangeEchar>
                </div>
            </div>
        </section>
        <!-- 表格开始 -->
        <section class="table-wrapper">
            <div class="item">
                <ChangeEchar :itemList="tableConfigm" @getStatues="changeTable" ></ChangeEchar>
            </div>
            <div class="item" v-if="tableOneShow" >
                <TableAndPagination
                        :showSearchPanel=false

                >
                    <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="时间">
                                        <span>{{ props.row.statisticDate}}</span>
                                    </el-form-item>
                                    <el-form-item label="客流量(乘次)">
                                        <span>{{ props.row.totalPassenger }}</span>
                                    </el-form-item>
                                    <el-form-item label="同比">
                                        <span>{{ props.row. lastYearThanRate }}</span>
                                    </el-form-item>
                                    <el-form-item label="环比">
                                        <span>{{ props.row.lastMonthThanRate }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>

                        <el-table-column label="时间" prop="statisticDate"></el-table-column>
                        <el-table-column label="客流量(乘次)" prop="totalPassenger"></el-table-column>
                        <el-table-column label="同比" prop="lastYearThanRate">
                            <template slot-scope="scope">
                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.lastYearThanRate > 0 ">{{ scope.row.lastYearThanRate }}%⬆</span>
                                <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.lastYearThanRate < 0 ">{{ scope.row.lastYearThanRate - scope.row.lastYearThanRate - scope.row.lastYearThanRate }}%⬇</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="环比" prop="lastMonthThanRate">
                            <template slot-scope="scope">
                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.lastMonthThanRate > 0 ">{{ scope.row.lastMonthThanRate }}%⬆</span>
                                <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.lastMonthThanRate < 0 ">{{ scope.row.lastMonthThanRate - scope.row.lastMonthThanRate - scope.row.lastMonthThanRate }}%⬇</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </TableAndPagination>
            </div>
            <div class="item" v-else >
                <TableAndPagination :showSearchPanel=false>
                    <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="时间">
                                        <span>{{ props.row.a }}</span>
                                    </el-form-item>
                                    <el-form-item label="线路">
                                        <span>{{ props.row.c }}</span>
                                    </el-form-item>
                                    <el-form-item label="客流量(乘次)">
                                        <span>{{ props.row.d }}</span>
                                    </el-form-item>
                                    <el-form-item label="同比">
                                        <span>{{ props.row.e }}</span>
                                    </el-form-item>
                                    <el-form-item label="环比">
                                        <span>{{ props.row.f }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>

                        <el-table-column label="时间2" prop="a"></el-table-column>
                        <el-table-column label="线路2" prop="c"></el-table-column>
                        <el-table-column label="客流量(乘次)2" prop="d"></el-table-column>
                        <el-table-column label="同比2" prop="e">
                            <template slot-scope="scope">
                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.e > 0 ">{{ scope.row.e }}%⬆</span>
                                <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.e < 0 ">{{ scope.row.e - scope.row.e - scope.row.e }}%⬇</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="环比2" prop="f">
                            <template slot-scope="scope">
                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.e > 0 ">{{ scope.row.f }}%⬆</span>
                                <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.e < 0 ">{{ scope.row.f - scope.row.f - scope.row.f }}%⬇</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </TableAndPagination>
            </div>
        </section>
        <DetailForm></DetailForm>
    </div>
</template>

<script>
    import tableMixins from "@/components/common/tableAndPagination/tableMixins";
    import { echarAndTableConfig } from "../../../views/monitoringAndEarlyWarning/common/config";
    import echarts from "echarts";
    // import { option3,option2 } from "../roadTransportOperation/components/options";
    export default {
        name: '',
        mixins: [tableMixins,echarAndTableConfig],
        mounted() {
            const data={};
            var d = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
            let year = d.getFullYear();
            let mon = d.getMonth() + 1;
            let day = d.getDate();
            data. startTime = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
             // data. startTime='2020-04-12';
            this.$http.$get("kyjc_flightStatistic/getPassengerStatisticsList",data).then((param) => {
                this.dealWithData(param);
            });
            this.$http.$get("kyjc_flightStatistic/getPassengerStatisticsPage",data).then((param) => {
                this.dealWithTableData(param);
            });
        },
        methods: {
            dealWithTableData(data){
                if(data.results!=null&&data.results.length>0){
                    this.tableData=data.results;
                }
            },
            dealWithData(data){
                this.passengerTraffic=data.totalPassengerNum==null?0:data.totalPassengerNum;
                if(data.statistics!=null&&data.statistics.length>0){
                    // data.statistics.sort(function(a,b){
                    //     return b.statisticDate - a.statisticDate
                    // });
                    var statisticsData=[], time=[], value1=[], value2=[];
                    var lx=['去年同期','查询时间'];
                    data.statistics.forEach(e =>{
                        time.push(e.statisticDate);
                        value1.push(e.totalPassenger);
                        value2.push(e.lastMonthTotalPassenger);
                    });
                    statisticsData.push(lx);
                    statisticsData.push(time);
                    statisticsData.push(value1);
                    statisticsData.push(value2);
                    this.createLineOption(statisticsData);
                    this.createbarOption(statisticsData);
                }
            },
            createLineOption(data){
                const option =
                    {
                        // postion: '200',
                        // backgroundColor: '#1C2129', //画布背景
                        title: {
                            // text: '饱和度时变趋势',
                            x: "center",
                            y: "-5",
                            textStyle: {
                                fontSize: 16,
                                color: '#fff'
                            }
                        },
                        grid: {
                            left: 50,
                            right:50
                        },
                        legend: {
                            icon: 'line',
                            top: 20,
                            textStyle: {
                                color: "#fff",
                                data: data[0]
                            },

                            itemWidth: 50, // 设置宽度
                            itemHeight: 20, // 设置高度
                        },
                        tooltip: {
                            trigger: 'axis',
                        },
                        xAxis: { //x轴
                            type: 'category',
                            boundaryGap: false, //坐标轴两边留白策略
                            data: data[1],
                            axisLabel: {
                                interval: 0,
                                rotate: -40,
                                textStyle: {
                                    fontSize: 12,
                                    color: '#fff'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#fff'
                                }
                            },
                        },
                        yAxis: { //y轴
                            min: 0,
                            type: 'value',
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    type: 'dashed'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontSize: 12,
                                    color: '#fff'
                                },
                            },
                            axisLine: {
                                "show": false,
                                lineStyle: {
                                    color: '#fff'
                                }
                            },
                        },
                        series: [{
                            name: data[0][0],
                            data: data[2],
                            type: 'line',
                            smooth: false, //折线是否平滑
                            areaStyle: {
                                opacity: 0
                            },
                            itemStyle: {
                                normal: {
                                    color: "#fff", //小圆点的颜色
                                    lineStyle: {
                                        width:2,
                                        color: "#36ff29" //折线的颜色
                                    }
                                }
                            },
                        },
                            {
                                name: data[0][1],
                                data: data[3],
                                type: 'line',
                                smooth: false, //是否平滑
                                areaStyle: {
                                    opacity: 0
                                },
                                markPoint : {
                                    symbolSize:50,
                                    itemStyle:{
                                        normal:{
                                            label:{
                                                show: true,
                                                color: 'red',//气泡中字体颜色
                                                fontSize:12,
                                            }
                                        }
                                    },
                                    data : [
                                        {type : 'max', name : '最大值'},
                                        {type : 'min', name : '最小值'}
                                    ]
                                },
                                symbol:'triangle',
                                symbolSize:14,
                                itemStyle: {
                                    normal: {
                                        color: "#fffc24", //小圆点的颜色
                                        lineStyle: {
                                            color: "#fffc24" ,//折线的颜色
                                            width:2,
                                            type:'dashed'  //'dotted'虚线 'solid'实线
                                        }
                                    }
                                },
                            },
                        ]
                    };
                this.option=this.option2=option;
            },
            createbarOption(data){
                const option =
                    {
                        // backgroundColor: '#23243a',
                        tooltip: { //提示框组件
                            trigger: 'axis',
                            formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            },
                            textStyle: {
                                color: '#fff',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            }
                        },
                        grid: {
                            //    left: '1%',
                            //     right: '4%',
                            //     bottom: '6%',
                            //     top: 30,
                            //     padding: '0 0 10 0',
                            left: 50,
                            right: 50,
                            // containLabel: true,
                        },
                        legend: { //图例组件，颜色和名字
                            // right: 10,
                            // top: 0,
                            // itemGap: 16,
                            // itemWidth: 18,
                            // itemHeight: 10,
                            data: data[0],
                            textStyle: {
                                color: '#a8aab0',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            }
                        },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: true, //坐标轴两边留白
                            data:data[1],
                            axisLabel: { //坐标轴刻度标签的相关设置。
                                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                                margin: 15,
                                textStyle: {
                                    color: '#078ceb',
                                    fontStyle: 'normal',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                }
                            },
                            axisTick: { //坐标轴刻度相关设置。
                                show: false,
                            },
                            axisLine: { //坐标轴轴线相关设置
                                lineStyle: {
                                    color: '#fff',
                                    opacity: 0.2
                                }
                            },
                            splitLine: { //坐标轴在 grid 区域中的分隔线。
                                show: false,
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            splitNumber: 5,
                            axisLabel: {
                                textStyle: {
                                    color: '#a8aab0',
                                    fontStyle: 'normal',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                }
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#fff'],
                                    opacity: 0.06
                                }
                            }

                        }],
                        series: [{
                            name: data[0][0],
                            type: 'bar',
                            data: data[2],
                            barWidth: 10,
                            barGap: 0, //柱间距离
                            label: { //图形上的文本标签
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#a8aab0',
                                        fontStyle: 'normal',
                                        fontFamily: '微软雅黑',
                                        fontSize: 12,
                                    },
                                },
                            },
                            itemStyle: { //图形样式
                                normal: {
                                    barBorderRadius: [5, 5, 0, 0],
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 1,
                                        color: 'rgba(127, 128, 225, 0.7)'
                                    }, {
                                        offset: 0.9,
                                        color: 'rgba(72, 73, 181, 0.7)'
                                    }, {
                                        offset: 0.31,
                                        color: 'rgba(0, 208, 208, 0.7)'
                                    }, {
                                        offset: 0.15,
                                        color: 'rgba(0, 208, 208, 0.7)'
                                    }, {
                                        offset: 0,
                                        color: 'rgba(104, 253, 255, 0.7)'
                                    }], false),
                                },
                            },
                        },
                            {
                                name: data[0][1],
                                type: 'bar',
                                data: data[3],
                                barWidth: 10,
                                barGap: 0.2, //柱间距离
                                label: { //图形上的文本标签
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '#a8aab0',
                                            fontStyle: 'normal',
                                            fontFamily: '微软雅黑',
                                            fontSize: 12,
                                        },
                                    },
                                },
                                itemStyle: { //图形样式
                                    normal: {
                                        barBorderRadius: [5, 5, 0, 0],
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 1,
                                            color: 'rgba(127, 128, 225, 0.7)'
                                        }, {
                                            offset: 0.9,
                                            color: 'rgba(72, 73, 181, 0.7)'
                                        }, {
                                            offset: 0.25,
                                            color: 'rgba(226, 99, 74, 0.7)'
                                        }, {
                                            offset: 0,
                                            color: 'rgba(253, 200, 106, 0.7)'
                                        }], false),
                                    },
                                },
                            }
                        ]
                    };
                this.option3=option;

            },
            getSearchValue(content){
                console.log(content);


            },
            handleQuery(content){
                const data={};
                if(content.time!=""){
                    data. startTime=content.time[0];
                    data.endTime=content.time[1];
                }
                if (content.pc!=""){
                    data.frequency=content.pc;
                }
                if(content.lx!=""){
                    data.comeOrOut=content.lx;
                }
                this.$http.$get("kyjc_flightStatistic/getPassengerStatisticsList",data).then((param) => {
                    this.dealWithData(param);
                });
                this.$http.$get("kyjc_flightStatistic/getPassengerStatisticsPage",data).then((param) => {
                    this.dealWithTableData(param);
                });
            },
            changeEchar(content){
                if (content == "趋势图") {
                    this.option = this.option2;
                }else if(content == "对比图"){
                    this.option = this.option3;
                }
            },
            changeTable(content){
                if (content == "分区间统计数据") {
                    this.tableOneShow = true;
                }else if(content == "分线路统计数据"){
                    this.tableOneShow = false;
                }
            }
        },
        data() {
            return {
                option2:{},
                option3:{},
                passengerTraffic:0,//总客流
                tableOneShow:true,
                option: {},
                tableData:[],
                // ...this.$Mock({'tableData|1-10': [{
                //         // 属性 id 是一个自增数，起始值为 1，每次增 1
                //         'a': '@date',
                //         "c|1": [
                //             "1号线",
                //             "2号线",
                //             "3号线"
                //         ],
                //         "d|-100-100": 100,
                //         "e|-100-100": 100,
                //         "f|-100-100": 100,
                //     }]}
                // ),
                // ...new Array(16).fill({

                // })
                searchConfig: {
                    searchCondition: [
                        {
                            order: 14,
                            otype: 'week',
                            type: "daterange",
                            formate: "yyyy-MM-dd",
                            label: "时间区间",
                            placeholderStart: "开始时间",
                            placeholderEnd: "截止时间",
                            VModelvalue: {
                                name: "time",
                                defaultValue: ""
                            }
                        },
                        {
                            order: 306,
                            type: "select",
                            label: "频次",
                            placeholder: "频次",
                            VModelvalue: {
                                name: "pc",
                                defaultValue: "1"
                            },
                            options: [
                                {
                                    value: "0",
                                    label: "小时"
                                },
                                {
                                    value: "1",
                                    label: "日"
                                },
                                {
                                    value: "2",
                                    label: "月"
                                },
                                {
                                    value: "3",
                                    label: "年"
                                }

                            ]
                        },
                        {
                            order: 36,
                            type: "select",
                            label: "类型",
                            placeholder: "类型",
                            VModelvalue: {
                                name: "lx",
                                defaultValue: "1"
                            },
                            options: [
                                {
                                    value: "1",
                                    label: "进港"
                                },
                                {
                                    value: "2",
                                    label: "出港"
                                }

                            ]
                        },
                    ],
                    searchButtonGroup:
                        [
                            {
                                action: "query",
                                label: "查询"
                            },
                            {
                                action: "export",
                                label: "导出"
                            }
                        ]
                },
                tableConfigm:['分区间统计数据'],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
    .PassengerFlowTrend-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        section:not(:first-child){
            flex: 1;
        }
        .search-wrapper{
            flex-basis: 50px;
        }
    }
    .echar-wrapper{
        display: flex;
        background-image: linear-gradient(to right, rgba(32, 86, 221, .4), #0A1E53);
        .item{
            &:first-child{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                ul{
                    text-align: center;
                    li:nth-child(1){
                        font-size: 26px;
                        color: red;
                    }
                    li:nth-child(2){
                        font-size: 26px;
                        color: red;
                        margin: 20px 0;
                    }
                    li:nth-child(3){
                        font-size: 22px;
                        color: yellow;
                    }
                }
            }
            &:last-child{
                flex: 5;
                position: relative;
                .echar-pie{
                    width: 100%;
                    height: 100%;
                }
                .btn-wrappper{
                    position: absolute;
                    top: 10px;
                    right: 120px;
                    // span{
                    //     display: inline-block;
                    //     cursor: pointer;
                    //     padding: 6px;
                    //     border-radius: 10px;
                    //     font-size: 14px;
                    //     &:first-child{
                    //         background-color: #fff;
                    //         border: 1px solid #fff;
                    //         color: #2056dd;
                    //     }
                    //     &:last-child{
                    //         background-color: aqua;
                    //         margin-left: 20px;
                    //          background-color: #2056dd;
                    //         border: 1px solid #2056dd;
                    //         color: #fff;
                    //     }
                    // }
                }
            }
        }
    }
    .table-wrapper{
        display: flex;
        flex-direction: column;
        .item{
            &:first-child{
                flex-basis: 26px;
                line-height: 26px;
                span{
                    display: inline-block;
                    cursor: pointer;
                    padding: 3px;
                    border-radius: 10px;
                    font-size: 14px;
                    &:first-child{
                        background-color: #fff;
                        border: 1px solid #fff;
                        color: #2056dd;
                    }
                    &:last-child{
                        background-color: aqua;
                        margin-left: 20px;
                        background-color: #485dcc;
                        border: 1px solid #485dcc;
                        color: #fff;
                    }
                }
            }
            &:last-child{
                flex: 1;
                height: calc(100% - 30px);
            }
        }
    }
</style>