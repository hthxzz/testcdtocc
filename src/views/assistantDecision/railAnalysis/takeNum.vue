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
                            <el-table-column label="乘坐站数" prop="rideStationNum"></el-table-column>
                            <!-- <el-table-column label="统计方式" prop="hour"></el-table-column> -->
                            <el-table-column label="日均次数(万次)" prop="passengerFlow" :formatter="this.formateTraffic"></el-table-column>
                            <el-table-column label="同比" prop="passengerFlowYoy" :formatter="this.formateRate"></el-table-column>
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
            getSearchValue(val) {
                const search = {};
                for (const item of val) {
                    if (item.columnName == "date") {
                        search["startTime"] = item.queryValue.split("|")[0];
                        search["endTime"] = item.queryValue.split("|")[1];
                    } else {
                        search[item.columnName] = item.queryValue;
                    }
                }
                this.getSearchTableValue(val);
                this.getPassengerFlowByPage(search);
            },
            handleQuery(data) {
                debugger;
                if(data==undefined){
                    data={};
                    data.frequency="年";
                    data.staticDate=this.$utils.dayjs().format("YYYY");
                }
                this.getSearchTableValue(data);
                this.$http.$get("gdjc_travelCharacteristicsHandler/getRideStationAnalysis", data).then(res => {
                    this.getPassengerFlowByPage(res);
                });
            },




            // 第三个图
            getPassengerFlowByPage(val) {
                debugger;
                var time=[],ky=[],qn=[];
                if(val&&val.length>0){
                    val.forEach(e=>{
                        time.push(e.rideStationNum);
                        ky.push(((e.passengerFlow!=null?e.passengerFlow:0)/10000).toFixed(2));
                        qn.push(((e.passengerFlowYoy!=null?e.passengerFlowYoy:0)/10000).toFixed(2));
                    })
                }
                var testData2= {
                    title: "乘坐车站数分析",
                    unitName: '万次/日',
                    legendData: ['客运量', '去年'],
                    xAxisData: time,
                    seriesData:[ky,qn]
                }
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

            },
        },
        data() {
            return {
                grid: Object.freeze({
                    left: 70
                }),
                url: "/gdjc_travelCharacteristicsHandler/getRideStationAnalysisList",
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