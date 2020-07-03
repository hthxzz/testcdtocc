<template>
    <div class="statistical-analysis-wrap">
        <panelTitle title="线路客运量分担量" :displaySwitch="false"></panelTitle>
        <div class="search">
            <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValueSelf2" @handleQuery="handleQuery2"></SearchPanel>
        </div>
        <div class="t" style="height:280px">
            <div class="left">
                <v-chart :options="option3" :autoresize="true" theme="theme" ref="test"></v-chart>
            </div>
            <div class="right">
                <TableAndPagination
                        :totalP="total"
                        :showSearchPanel="false"
                        @fetchTableData="fetchTableData">
                    <el-table
                            style="width: 100%;height:100%;overflow-y: auto"
                            :height="tableHeight"
                            :data="tableData"
                            stripe
                            ref="table"
                    >
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column label="线路名称" prop="lineName"></el-table-column>
                        <el-table-column label="日均客运量(万人次)" prop="passengerVolume":formatter="this.formateTraffic"></el-table-column>
                        <!-- <el-table-column label="统计方式" prop="hour"></el-table-column> -->
                        <el-table-column label="客运量分担比重" prop="passengerVolumeProp" :formatter="this.formateRate"></el-table-column>
                        <el-table-column label="客运量分单量同比" prop="passengerVolumePropYoy":formatter="this.formateRate"></el-table-column>
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
    </div>
</template>

<script>
    import tableMixins from "@/components/common/tableAndPagination/tableMixins";
    import { _formatDate } from "../../../../components/common/common.js";
    export default {
        name: "klfd",
        mixins: [tableMixins],
        mounted() {
            // this.setSearchInitValue();
            // this.handleSearch();
            // this.getPassengerVolumeProp();
            this.handleQuery2();
        },
        methods: {
            handleQuery2(data){
                debugger;
                if(data==undefined){
                    data={};
                    data.frequency="年";
                    data.staticDate=this.$utils.dayjs().format("YYYY");
                }
                this.$http.$get("gdjc_basicPassengerFlowHandler/getLinePassengerVolumeProp",data).then(res => {
                    debugger;
                    this.getPassengerVolumeProp(res);
                });
            },
            getSearchValue(val) {
                // debugger;
                // const search = {};
                // for (const item of val) {
                //   if (item.columnName == "date") {
                //     search["startTime"] = item.queryValue.split("|")[0];
                //     search["endTime"] = item.queryValue.split("|")[1];
                //   } else {
                //     search[item.columnName] = item.queryValue;
                //   }
                // }
                this.getSearchTableValue(val);
            },
            // handleQuery() {},
            //   设置搜索初始值




            getSearchValueSelf2(content){
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
                this.getSearchTableValue(content);

            },
            getPassengerVolumeProp(data) {
                // this.$http
                //     .$get("/gdjc_basicPassengerFlowHandler/getLinePassengerVolumeProp")
                //     .then(res => {
                if (this.xwjcAuto) {
                    clearInterval(this.xwjcAuto);
                }
                        const seriesData = [],legendData=[];
                        let count = 0;
                        this.colors=[];
                        for (const item of data) {
                            seriesData.push({
                                name: item.lineName, // 线路
                                value: item.passengerVolume // 客流量
                            });
                            count++;
                            legendData.push(item.lineName);
                            this.getLineNO(item.lineName, item.passengerVolume);
                        }
                        this.count = count;
                        let color = this.colors;
                        let option3 = this.$utils.echart.getPieOption(
                            {
                                 // legendData:legendData,
                                seriesData: [seriesData]
                            },
                            {
                                title: {
                                    left: 'center',
                                    text: '线路客运分担情况',
                                    textStyle:{
                                        color:'#FFFFFF',
                                        fontSize:'16',
                                    }
                                },
                                color: color,
                                xAxis: [
                                    {
                                        axisLine: {
                                            show: false
                                        }
                                    }
                                ],
                                legend: {
                                    orient: 'vertical',
                                    data:legendData,
                                    top: "middle",
                                    right: 20,
                                    padding: 5,
                                    itemHeight: 12,
                                    itemWidth: 12,
                                    itemGap: 5,
                                    textStyle: {
                                        color: '#ffffff'
                                    },
                                    icon: 'rect',
                                },
                                series: [
                                    {
                                        type: "pie",
                                        radius: ["50%", "70%"],
                                        avoidLabelOverlap: false,
                                        label: {
                                            show: false,
                                            position: "center"
                                        },
                                        emphasis: {
                                            label: {
                                                formatter: "{b} \n{d}%",
                                                show: true,
                                                color: "#fff",
                                                fontSize: "14",
                                                fontWeight: "100 "
                                            }
                                        }
                                    }
                                ]
                            }
                        );
                        this.option3 = option3;
                        this.activeLengend();
                    // });
            },
            getLineNO(lineName, NO) {
                for(var i=0;i<this.legendList.length;i++){
                    if(this.legendList[i].name==lineName){
                        this.legendList[i].value = NO;
                        this.colors.push(this.legendList[i].color);
                        break;
                    }
                }
            },
            activeLengend() {
                let count = this.count;
                let i = 0;
                this.xwjcAuto = setInterval(() => {
                    if (i == count) {
                        i = 0;
                    }
                    this.$refs.test.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: i
                    });
                    if (i == 0) {
                        this.$refs.test.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: count - 1
                        });
                    } else {
                        this.$refs.test.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: i - 1
                        });
                    }
                    i++;
                }, 3000);
            },

        },
        destroyed() {
            if (this.xwjcAuto) {
                clearInterval(this.xwjcAuto);
            }
        },
        data() {
            return {
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
                timetype:'year',
                time:'',
                grid: Object.freeze({
                    left: 70
                }),
                url: "/gdjc_basicPassengerFlowHandler/getLinePassengerVolumePropList",
                option1: {},
                option2: {},
                option3: {},
                colors: [],
                count:0,
                legendList: [
                    {
                        order: 1,
                        code: "01",
                        name: "1号线",
                        color: "rgba(26, 117, 209,1)",
                        value: 0
                    },
                    {
                        order: 2,
                        code: "02",
                        name: "2号线",
                        color: "rgb(238, 121, 26)",
                        value: 0
                    },
                    {
                        order: 3,
                        name: "3号线",
                        code: "03",
                        color: "rgb(238, 75, 129)",
                        value: 0
                    },
                    {
                        order: 4,
                        name: "4号线",
                        code: "04",
                        color: "rgb(68, 209, 53)",
                        value: 0
                    },
                    {
                        order: 5,
                        name: "5号线",
                        code: "05",
                        color: "rgb(190, 81, 169)",
                        value: 0
                    },
                    {
                        order: 7,
                        code: "07",
                        name: "7号线",
                        color: "rgb(118, 214, 222)",
                        value: 0
                    },
                    {
                        order: 10,
                        code: "10",
                        name: "10号线",
                        color: "rgb(108, 105, 236)",
                        value: 0
                    }
                ]

            };
        }
    };
</script>

<style lang="scss" scoped>
    $backgroundColor: rgba(5, 12, 38, 1);
    .statistical-analysis-wrap {
        // width:100%;
        height: calc(100% - 36px);
        margin-top: 36px;
        // overflow-y: auto;
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
    .date-wrapper,
    .btn-wrapper {
        display: inline-block;
        margin-left: 20px;
    }
    .top > div {
        width: 100%;
        height: 280px;
    }
    .t {
        display: flex;
        flex-direction: row;
        .left {
            flex: 1;
            height: 100%;
            ul {
                margin-left: 30px;
                margin-top:10px;
                li{
                    height:30px;
                    line-height: 30px;
                    position: relative;
                }
                li.item1{
                    font-size: 14px;
                    span.smallPoint{
                        width:8px;
                        height:8px;
                        background:linear-gradient(180deg,rgba(0,246,255,1),rgba(52,83,244,1));
                        border-radius:50%;
                        display: block;
                        position: absolute;
                        top:40%;
                    }
                    lable{
                        margin-left: 20px;
                    }
                }
                li.item2{
                    margin-left: 20px;
                    font-size: 18px;
                    color:#00FFFF;
                    span.unit{
                        font-size: 10px;
                        color:#fff;
                    }

                }

            }
        }
        .right {
            flex: 4;
            height: 100%;
        }
    }
</style>