<template>

    <div class="statistical-analysis-container  nomap-content-container">
        <section>
            <div class="search">
                <section class="search-wrapper">
                    <SearchPanel
                            :searchConfig="searchConfig"
                            @getSearchValue="getSearchValueSelf"
                            @handleQuery="handleQuery"
                    ></SearchPanel>
                </section>
            </div>
            <div class="indexContent" style="height:100%">
                <div class="top">
                    <v-chart :options="option3" />
                </div>
                <div class="OperationComplaint-wrapper">
                    <!-- <h2>营运投诉</h2> -->
                    <TableAndPagination
                            :totalP="total"
                            :showSearchPanel="false"
                            @fetchTableData="fetchTableData"
                    >
                        <el-table
                                style="width: 100%;height:100%;overflow-y: auto"
                                :height="tableHeight"
                                :data="tableData"
                                stripe
                                ref="table"
                        >
                            <el-table-column type="index" width="50"></el-table-column>
                            <el-table-column label="统计时间" prop="staticDate"></el-table-column>
                            <el-table-column label="刷卡类型" prop="swipeType"></el-table-column>
                            <!-- <el-table-column label="统计方式" prop="hour"></el-table-column> -->
                            <el-table-column label="日均刷卡次数(万次)" prop="passengerNum" :formatter="this.formateTraffic"></el-table-column>
                            <el-table-column label="同比" prop="yoyPassengerNum" :formatter="this.formateRate"></el-table-column>
                            <!-- <el-table-column label="操作">
                              <template slot-scope="scope">
                                <el-button
                                  size="mini"
                                  class="table-detail-btn"
                                  @click="handleDetail( scope.row)"
                                >详情</el-button>
                              </template>
                            </el-table-column>-->
                        </el-table>
                    </TableAndPagination>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import tableMixins from "@/components/common/tableAndPagination/tableMixins";
    export default {
        name: "",
        mixins: [tableMixins],
        mounted() {
             this.handleQuery();
        },
        methods: {

            handleQuery(data) {
                if(data==undefined){
                    data={};
                    data.frequency="年";
                    data.staticDate=this.$utils.dayjs().format("YYYY");
                }
                this.getSearchTableValue(data);
                this.$http.$get("gdjc_travelCharacteristicsHandler/getSwipeTypeAnalysis", data).then(res => {
                    this.getPassengerFlowByPage(res);
                });
            },
            //   设置搜索初始值



            // 第三个图
            getPassengerFlowByPage(val) {
                 debugger;
                var time=[],ky=[],qn=[];
                if(val&&val.length>0){
                    val.forEach(e=>{
                        time.push(e.swipeType);
                        ky.push(((e.passengerNum!=null?e.passengerNum:0)/10000).toFixed(2));
                        qn.push(((e.yoyPassengerNum!=null?e.yoyPassengerNum:0)/10000).toFixed(2));
                    })
                }
                var testData2={
                    title:"乘客刷卡类型分析",
                    unitName:'万次/日',
                    legendData:['客运量','去年'],
                    xAxisData: time,
                    seriesData:[ky,qn]
                }


                        // var testData2={
                        //     title:"乘客刷卡类型分析",
                        //     unitName:'万次/日',
                        //     legendData:['当前','去年'],
                        //     xAxisData: ['单程票','老年卡','学生卡','二维码','普通卡'],
                        //     seriesData:[[3,4,5,1,3],
                        //         [8,7,6,9,4]]
                        //
                        //
                        // }
                        this.option3 =this.$utils.echart.creatEchartOption_9_1(testData2);

            },
            getSearchValueSelf(content){
                if(content.frequency=='年'){
                    this.searchConfig.searchCondition[1].type='year';
                    this.searchConfig.searchCondition[1].formate="yyyy";
                    this.searchConfig.searchCondition[1].VModelvalue.defaultValue=this.$utils.dayjs().format("YYYY");
                    if(content.staticDate.length>4){
                        content.staticDate=content.staticDate.split('-')[0]
                    }

                }else{
                    this.searchConfig.searchCondition[1].type='month';
                    this.searchConfig.searchCondition[1].formate="yyyy-MM";
                    this.searchConfig.searchCondition[1].VModelvalue.defaultValue=this.$utils.dayjs().format("YYYY-MM");
                    if(content.staticDate.length<5){
                        content.staticDate= content.staticDate+'-01'
                    }

                }
                // this.getSearchTableValue(content);
                // this.time=content[1]?content[1].queryValue:'';
                // this.timeType=content[0]?content[0].queryValue:'year';
                // var queryparam={};
                // queryparam.indexCode=this.indexCode;
                // queryparam.type=this.timetype;
                // queryparam.time=this.time;
                // this.getSearchTableValue(content);
                // this.getdata(queryparam);

            },

        },
        data() {
            return {
                grid: Object.freeze({
                    left: 70
                }),
                url: "/gdjc_travelCharacteristicsHandler/getSwipeTypeAnalysisList",
                option1: {},
                option2: {},
                option3: {},
                stationName: "",
                valueFormate: "yyyy",
                value1: "year",
                value2: "",
                staStationName: "",
                startTime: "",
                cycleType: "year",
                staStationNameList: "",
                endTime: "",
                type: "year",
                searchConfig: {
                    isKeyV: true,
                    searchCondition: [
                        {
                            order: 36,
                            type: "select",
                            label: "",
                            placeholder: "",
                            VModelvalue: {
                                name: "frequency",
                                defaultValue: "年"
                            },
                            options: [
                                {
                                    value: "年",
                                    label: "年"
                                },
                                {
                                    value: "月",
                                    label: "月"
                                }
                            ]
                        },
                        {
                            order: 14,
                            type: "year",
                            formate: "yyyy",
                            label: "",
                            VModelvalue: {
                                name: "staticDate",
                                defaultValue:this.$utils.dayjs().format("YYYY"),
                            }
                        },

                    ],
                    searchButtonGroup: [
                        {
                            action: "query",
                            label: "查询"
                        }
                    ]
                },
                searchoptions: [
                    {
                        value: "year",
                        label: "年"
                    },
                    {
                        value: "month",
                        label: "月"
                    },
                    {
                        value: "day",
                        label: "日"
                    }
                ],
                searchoptionsForStation: [],
                value: ""
            };
        }
    };
</script>

<style lang="scss" scoped>
    $backgroundColor: rgba(5, 12, 38, 1);
    .statistical-analysis-wrap {
        // width:100%;
        height: 100%;
        // overflow-y: auto;
        padding-bottom: 10px;
        // background: rgba(5, 12, 38, 1);
        // border: 1px solid rgba(32, 86, 221, 0.6);
        // background-image: url("./img/search_bg.png");
        background-size: 124px 120px;
        background-repeat: no-repeat;
        background-position: right top;
        .statistical-analysis-container {
            margin: 0 21px;
        }
    }
    .search {
        margin-top: 1px;
    }
    .indexContent {
        height: 100%;
        // background: rgba(32, 86, 221, 0.2);
        margin-top: 10px;
        // opacity:0.2;
        display: flex;
        flex-direction: column;
        > div {
            flex: 1;
            margin-bottom: 20px;
        }
    }
    .echarts {
        width: 100%;
        height: 100%;
    }
    .OperationComplaint-wrapper {
        height: 350px;
    }
    .top{
        height:380px;
    }
    .date-wrapper {
        display: inline-block;
        margin-left: 10px;
    }
    .btn-wrapper {
        display: inline-block;
        margin-left: 10px;
        // height: 145px;
    }
    .search-detail {
        width: 71px;
    }
</style>
<style lang="css" scoped>
    .btn-wrapper >>> .table-detail-btn {
        height: 40px;
    }
</style>