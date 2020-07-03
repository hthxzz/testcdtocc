<template>

    <div class="statistical-analysis-container nomap-content-container">
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
                            <el-table-column label="统计时间" prop="lineName"></el-table-column>
                            <el-table-column label="经营业户" prop="stationName" :formatter="this.formateTraffic"></el-table-column>
                            <el-table-column label="百万公里事故数" prop="stationName" :formatter="this.formateTraffic"></el-table-column>
                            <el-table-column label="年事故数" prop="stationName" :formatter="this.formateTraffic"></el-table-column>
                            <!-- <el-table-column label="统计方式" prop="hour"></el-table-column> -->
                            <el-table-column label="行车事故伤人数" prop="staticDate" ></el-table-column>
                            <el-table-column label="行车事故死亡数" prop="passengerVolumeYoy" :formatter="this.formateTraffic"> </el-table-column>
                            <el-table-column label="责任" prop="passengerVolumeYoy" :formatter="this.formateTraffic"> </el-table-column>
                            <el-table-column label="非责任" prop="passengerVolumeYoy" :formatter="this.formateTraffic"> </el-table-column>
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
        name: "linePassengerFlow",
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
                if(val.frequency=='年'){
                    this.titleName1="与上年比（行政处罚次数）";
                    this.titleName2="与上年比（平均单车处罚次数）";
                    this.searchConfig.searchCondition[3].type=this.searchConfig.searchCondition[2].type='year';
                    this.searchConfig.searchCondition[3].formate=this.searchConfig.searchCondition[2].formate="yyyy";
                    this.searchConfig.searchCondition[3].VModelvalue.defaultValue=this.searchConfig.searchCondition[2].VModelvalue.defaultValue=this.$utils.dayjs().format("YYYY");
                    if(val.startStaticDate.length>4){
                        val.startStaticDate=val.startStaticDate.split('-')[0];
                        val.endStaticDate=val.endStaticDate.split('-')[0];
                    }

                }else if(val.frequency=='月'){
                    this.titleName1="与上月比（行政处罚次数）";
                    this.titleName2="与上月比（平均单车处罚次数）";
                    this.searchConfig.searchCondition[3].type=this.searchConfig.searchCondition[2].type='month';
                    this.searchConfig.searchCondition[3].formate=this.searchConfig.searchCondition[2].formate="yyyy-MM";
                    this.searchConfig.searchCondition[3].VModelvalue.defaultValue=this.searchConfig.searchCondition[4].VModelvalue.defaultValue=this.$utils.dayjs().format("YYYY-MM");

                    if(val.startStaticDate.length<5){
                        val.startStaticDate= val.startStaticDate+'-01';
                        val.endStaticDate=val.endStaticDate+'-01';
                    }else if(val.startStaticDate.length>9&&val.startStaticDate.length<11) {
                        val.startStaticDate = val.startStaticDate.split('-')[0] + '-01';
                        val.endStaticDate = val.endStaticDate.split('-')[0] + '-01';
                    }

                }

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
                var time=[],yy=[],fw=[],aq=[];
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
                var testData2={
                    title:"",
                    unitName:['次/百万\n公里','次/年',"人/年"],
                    legendData:['百万公里事故数','年事故数','行车事故伤人数','行车事故死亡'],
                    xAxisData:["公司1", "公司2", "公司3", "公司4"],
                    seriesData:[
                        [65, 60, 76.5,41],
                        [93, 93, 93.4,52],
                        [87, 87, 88.3,63],
                        [36, 36, 36.4,74],
                    ]
                }
                this.option3 =this.$utils.echart.creatEchartOption_16_1(testData2);

            }
        },
        data() {
            return {
                titleName1:'与上年比（行政处罚次数）',
                titleName2:'与上年比（平均单车处罚次数）',
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
                            width: "220px",
                            type: "select",
                            label: "经营企业",
                            filterable: true,
                            placeholder: "全部",
                            operator: "=",
                            VModelvalue: {
                                name: "company",
                                defaultValue: ""
                            },
                            options: []
                        },

                        {
                            order: 14,
                            type: "year",
                            formate: "yyyy",
                            label: "",
                            placeholder: "开始时间",
                            VModelvalue: {
                                name: "startStaticDate",
                                defaultValue:(this.$utils.dayjs().year()-4).toString(),
                            }
                        },
                        {
                            order: 3,
                            width: "220px",
                            type: "select",
                            label: "事故类型",
                            filterable: true,
                            placeholder: "全部",
                            operator: "=",
                            VModelvalue: {
                                name: "leixing",
                                defaultValue: ""
                            },
                            options: [

                            ]
                        },
                        {
                            order: 3,
                            width: "220px",
                            type: "select",
                            label: "责任范围",
                            filterable: true,
                            placeholder: "全部",
                            operator: "=",
                            VModelvalue: {
                                name: "zeren",
                                defaultValue: ""
                            },
                            options: [
                                {
                                    value: "",
                                    label: "全部"
                                },
                                {
                                    value: "1",
                                    label: "责任"
                                },
                                {
                                    value: "2",
                                    label: "非责任"
                                },
                            ]
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

