<template>

    <div class="statistical-analysis-container ">
        <section>
            <div class="search">
                <section class="search-wrapper">
                    <SearchPanel
                            :searchConfig="searchConfig"
                            @getSearchValue="getSearchValue"
                            @handleQuery="handleQuery"
                    ></SearchPanel>
                </section>
            </div>
            <div class="indexContent" style="height:580px">
                <div class="top">
                    <v-chart :options="option3" :autoresize="true"/>
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
                                :height="308"
                                :data="tableData"
                                stripe
                                ref="table"
                        >
                            <el-table-column type="index" width="50"></el-table-column>
                            <el-table-column label="日期" prop="lineName"></el-table-column>
                            <el-table-column label="平均小时客运量（万人次）" prop="stationName" :formatter="this.formateTraffic"></el-table-column>
                            <el-table-column label="小时客运量占比%" prop="passengerVolumeYoy" :formatter="this.formateRate"> </el-table-column>
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
        name: "passengerFlow",
        mixins: [tableMixins],
        mounted() {
            // this.setSearchInitValue();
            // this.getPassengerFlowByPage();
            // this.handleSearch();
            // this.getAllLineData();
            this.handleQuery();
        },
        methods: {
            getAllLineData(){
                this.$http.$get('/gdjc_infoManagerHandler/getLine').then(res => {
                    if(res!=null&&res.length>0){
                        res.forEach(e=>{
                            this.searchConfig.searchCondition[0].options.push({value:e.lineCode,label:e.lineName})
                        })
                    }
                });
            },
            getSearchValue(val) {
                // this.searchConfig.searchCondition[1].options=[{value:"",label:"全部站点"}];
                // if (val.lineCode!=""){
                //     this.$http.$get('/gdjc_infoManagerHandler/getStationByLine',{lineCode:val.lineCode}).then(res => {
                //         if(res!=null&&res.length>0){
                //             res.forEach(e=>{
                //                 this.searchConfig.searchCondition[1].options.push({value:e.stationName,label:e.stationName});
                //             })
                //         }
                //     });
                // }else{
                //     val.stationName='';
                // }


                // this.getSearchTableValue(val);
                // this.getPassengerFlowByPage(search);
            },
            handleQuery(val) {
                if(val==undefined){
                    val={};
                    val.frequency="年";
                    val.startStaticDate=this.$utils.dayjs().format("YYYY");
                    val.endStaticDate=this.$utils.dayjs().format("YYYY");
                }
                this.getSearchTableValue(val);
                this.$http.$get("gdjc_basicPassengerFlowHandler/getCustomizeQueryStaticDataChart", val).then(res => {
                    this.getPassengerFlowByPage(res,val);
                });
            },
            //   设置搜索初始值




            // 第三个图
            getPassengerFlowByPage(data,serchVal) {
                debugger;
                var time=[],ky=[],qn=[];
                // if(data.lineChartData&&data.lineChartData.length>0){
                //     data.lineChartData.forEach(e=>{
                //         time.push(e.time);
                //         ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
                //     })
                // }
                // if(data.lineChartYoyData&&data.lineChartYoyData.length>0){
                //     data.lineChartYoyData.forEach(e=>{
                //         qn.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
                //     })
                // }
                var xData = function() {
                    var data = [];
                    for (var i = 1; i < 31; i++) {
                        data.push(i + "日");
                    }
                    return data;
                }();
                ky=[
                    509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117,2000,1455,1210,719,
                    733,944,2285,2208,3372,3936,3693,2962,2810,3519,2455,2610,2719,2484,2078
                ];
                var testData2= {
                    title: data.chartTitle,
                    unitName: '万人次',
                    xAxisData: xData,
                    legendData:['小时客运量'],
                    seriesData:[ky],
                };
                this.option3 =this.$utils.echart.creatEchartOption_15_1(testData2);

            }
        },
        data() {
            return {
                grid: Object.freeze({
                    left: 70
                }),
                url: "/gdjc_basicPassengerFlowHandler/getCustomizeQueryStaticDataList",
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
                            order: 3,
                            width: "120px",
                            type: "select",
                            label: "区域",
                            filterable: true,
                            placeholder: "所有",
                            operator: "=",
                            VModelvalue: {
                                name: "areaCode",
                                defaultValue: ""
                            },
                            options: [
                                {
                                    value: "",
                                    label: "所有"
                                },
                                {
                                    value: "1",
                                    label: "5+1城区"
                                },
                            ]
                        },


                        {
                            order: 14,
                            type: "date",
                            formate: "yyyy-MM-dd",
                            label: "",
                            placeholder: "开始时间",
                            VModelvalue: {
                                name: "startStaticDate",
                                defaultValue:this.$utils.dayjs().format("YYYY-MM")+"-01",
                            }
                        },
                        {
                            order: 14,
                            type: "date",
                            formate: "yyyy-MM-dd",
                            label: "",
                            placeholder: "结束时间",
                            VModelvalue: {
                                name: "endStaticDate",
                                defaultValue:this.$utils.dayjs().format("YYYY-MM-DD"),
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
    }
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
            margin-bottom: 0px;
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
        height:310px;
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