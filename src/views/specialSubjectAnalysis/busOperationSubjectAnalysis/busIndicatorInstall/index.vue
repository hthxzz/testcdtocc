<template>
    <div class="indicator-manage-wrap nomap-content-container">
        <div class="indicator-manage-content">
            <!-- 基础信息管理内容 -->
            <div class="first">
                <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label">
                          <div class="imgWrap">
                            <img class="imgstyle"src="./img/jtyy.png" alt/>
                          </div>
                          <div for="交通运营">交通运营</div>
                        </span>
                        <div class="jtyy">
                            <el-tabs >
                                <el-tab-pane  v-for="item in jtyyList"  :label="item.name" >
                                    <div style="height:100%">
                                        <busindicatorInstallView  :title="item.name" :indexCode="item.indexCode" :content="item.content"/>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="安全事故">
                        <span slot="label">
                          <div class="imgWrap">
                            <img  class="imgstyle"src="./img/aqsg.png" alt/>
                          </div>
                          <div for="安全事故">安全事故</div>
                        </span>
                        <div class="aqsg">
                            <el-tabs >
                                <el-tab-pane  v-for="item in aqsgList"  :label="item.name">
                                    <div style="height:100%">
                                        <BusindicatorInstallView  :title="item.name" :indexCode="item.indexCode" :content="item.content"/>
                                    </div>
                                </el-tab-pane>

                            </el-tabs>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="线网运行">
                        <span slot="label">
                          <div class="imgWrap">
                            <img  class="imgstyle"src="./img/xwyy.png" alt/>
                          </div>
                          <div for="线网运行">线网运行</div>
                        </span>
                        <div class="xwyx">
                            <el-tabs >
                                <el-tab-pane  v-for="item in xwyxList"  :label="item.name">
                                    <div style="height:100%">
                                        <BusindicatorInstallView :title="item.name" :indexCode="item.indexCode":content="item.content"/>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="服务保障">
                        <span slot="label">
                          <div class="imgWrap">
                            <img class="imgstyle"src="./img/fwbz.png" alt/>
                          </div>
                          <div foar="道路设备">服务保障</div>
                        </span>
                        <div class="fwbz">
                            <el-tabs >
                                <el-tab-pane  v-for="item in fwbzList"  :label="item.name">
                                    <div style="height:100%">
                                        <BusindicatorInstallView   :title="item.name" :indexCode="item.indexCode" :content="item.content"/>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane  label="早晚高峰时段公共交通平均拥挤度">
                                    <div style="height:100%">
                                        <BusCrowdedDegree />
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane  label="公共交通正点率">
                                    <div style="height:100%">
                                        <BusPunctuality />
                                    </div>
                                </el-tab-pane>

                            </el-tabs>
                        </div>
                    </el-tab-pane>

                </el-tabs>
                <!-- <img class="bgimg" src="./img/search_bg.png" alt /> -->
            </div>
        </div>
    </div>
</template>

<script>
    // import BusRouteNetRatioManage from './BusRouteNetRatioManage';
    import BusindicatorInstallView from './busindicatorInstallView';
    import BusCrowdedDegree from "./BusCrowdedDegree";
    import BusPunctuality from "./BusPunctuality";
    export default {
        name: "",
        components:{
            // BusRouteNetRatioManage,
            BusindicatorInstallView,
            BusCrowdedDegree,
            BusPunctuality
        },
        mixins: [],
        mounted() {
            // this.$http.$get("gjjc_cityIndexSet/queryAllIndexList").then((param) => {
            // });
        },
        methods: {


        },
        data() {
            return {
                indxCode:"",
                dialogFormVisible: false,
                searchButtonList: [
                    {
                        order: 1,
                        label: "查询"
                    },
                    {
                        order: 2,
                        label: "添加"
                    }
                ],
                jtyyList:[
                    {
                        name:'公共汽电车进场率',
                        indexCode:'busTramEntranceRate',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共汽电车车辆总数',//除数名称
                                divisor:'',
                                dividendName:'公共汽电车每日进场停放车辆数',//被除数名称
                                dividend:'',
                                ifShowSum:true,
                                ifShowPercent:true,
                                if365:true,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共交通投诉处理完结率',
                        indexCode:'PubTransportComplaintSetRate',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共交通投诉案件总量',//除数名称
                                divisor:'',
                                dividendName:'处理完结的公共交通投诉案件数',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共交通乘车一卡通使用率',
                        indexCode:'PubTransportCardUseRate',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共交通客运总量',//除数名称
                                divisor:'',
                                dividendName:'使用一卡通的城市公共交通客运总量',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共交通职工收入水平',
                        indexCode:'PubTransportemployeesIncomeLevel',
                        content:{
                            install:{
                                url:'',
                                divisorName:'当地社会职工平均工资',//除数名称
                                divisor:'',
                                dividendName:'公共交通在岗职工平均工资',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                ],
                aqsgList:[
                    {
                        name:'公共汽电车责任事故死亡率',
                        indexCode:'PubCarTramAccidentMortalityRate',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共汽电车运营总里程',//除数名称
                                divisor:'',
                                dividendName:'公共汽电车责任事故死亡人数',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:false,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'轨道交通责任事故死亡率',
                        indexCode:'RailTrafficLiabilityAccidentMortalityRate',
                        content:{
                            install:{
                                url:'',
                                divisorName:'轨道交通运营总里程',//除数名称
                                divisor:'',
                                dividendName:'轨道交通责任事故死亡人数',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:false,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },

                ],
                xwyxList:[
                    {
                        name:'公共交通机动化出行分担率',
                        indexCode:'publicTransportMobilityShare',
                        content:{
                            install:{
                                url:'',
                                divisorName:'机动化出行总量',//除数名称
                                divisor:'',
                                dividendName:'公共交通出行量',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共交通出行分担率（不含步行）',
                        indexCode:'PubTransportTripsShare',
                        content:{
                            install:{
                                url:'',
                                divisorName:'不含步行的居民出行总量',//除数名称
                                divisor:'',
                                dividendName:'公共交通出行量',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共交通站点500米覆盖率',
                        indexCode:'pubTransitStationFiveMCoverage',
                        content:{
                            install:{
                                url:'',
                                divisorName:'中心城区的建成区面积',//除数名称
                                divisor:'',
                                dividendName:'公共交通站点500米半径覆盖面积',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共交通站点300米覆盖率',
                        indexCode:'pubTransitStationThreeMCoverage',
                        content:{
                            install:{
                                url:'',
                                divisorName:'中心城区建成区面积',//除数名称
                                divisor:'',
                                dividendName:'公共交通站点300米半径覆盖面积',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公交专用车道设置比率',
                        indexCode:'BusLaneSetRatio',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共汽电车线路网总长度',//除数名称
                                divisor:'',
                                dividendName:'设置公交专用车道的道路长度',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共汽电车线路网密度',
                        indexCode:'BusNetworkDensity',
                        content:{
                            install:{
                                url:'',
                                divisorName:'中心城区的建成区面积',//除数名称
                                divisor:'',
                                dividendName:'公共汽电车线路网长度',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:false,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共汽电车平均运营时速（早晚高峰）',
                        indexCode:'MorningAndEveningPeakHourAvgSpeed',
                        content:{
                            install:{
                                url:'',
                                divisorName:'早晚高峰时段班次总数',//除数名称
                                divisor:'',
                                dividendName:'早晚高峰时段班次平均运行车速',//被除数名称
                                dividend:'',
                                ifShowSum:true,
                                ifShowPercent:false,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共汽电车线路网比率',
                        indexCode:'busLineNetworkRatio',
                        content:{
                            install:{
                                url:'',
                                divisorName:'城市道路网长度',//除数名称
                                divisor:'',
                                dividendName:'公共汽电车线路网长度',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },

                ],
                fwbzList:[
                    {
                        name:'万人公共交通车辆保有量',
                        indexCode:'PubTransitVehiclePopulationPerople',
                        content:{
                            install:{
                                url:'',
                                divisorName:'市区人口',//除数名称
                                divisor:'',
                                dividendName:'公共交通车辆标台总数',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:false,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'绿色公共交通车辆比率',
                        indexCode:'GreenPubTransPortVehicleRatio',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共交通车辆标台总数',//除数名称
                                divisor:'',
                                dividendName:'绿色公共交通车辆标台数',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'城乡客运线路公交化运营比率',
                        indexCode:'UrbanRuralPassLineTransitOperationRatio',
                        content:{
                            install:{
                                divisorName:'城乡客运线路总数',//除数名称
                                dividendName:'公交化运营的城乡客运线路数',//被除数名称
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公交优先通行交叉口比率',
                        indexCode:'BusPriorityIntersectionRatio',
                        content:{
                            install:{
                                url:'',
                                divisorName:'城市主干道交叉口数量',//除数名称
                                divisor:'',
                                dividendName:'公交优先通行交叉口数量',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共汽电车平均车龄',
                        indexCode:'BusTramsAvgAge',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共汽电车车辆总数',//除数名称
                                divisor:'',
                                dividendName:'公共汽电车单车使用年数',//被除数名称
                                dividend:'',
                                ifShowSum:true,
                                ifShowPercent:false,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共汽电车车均场站面积',
                        indexCode:'PubTransportharborStopSetRate',
                        content:{
                            install:{
                                url:'',
                                divisorName:'公共汽电车标台总数',//除数名称
                                divisor:'',
                                dividendName:'公共汽电车场站总面积',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:false,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },
                    {
                        name:'公共汽电车港湾式停靠站设置率',
                        indexCode:'PubTransportharborStopSetRate',
                        content:{
                            install:{
                                url:'',
                                divisorName:'停靠站点总数',//除数名称
                                divisor:'',
                                dividendName:'设置港湾式停靠站的站点个数',//被除数名称
                                dividend:'',
                                ifShowSum:false,
                                ifShowPercent:true,
                                if365:false,

                            },
                            table:{
                                url:'',
                                tableColumn:['',''],
                            }
                        }
                    },


                ]
            };
        }
    };
</script>
<style  lang="css"  scoped>
    .first >>> .el-tabs__content{
        margin-top: 0 !important;
    }
</style>
<style lang="scss" scoped>
    .indicator-manage-wrap {
        // width: 100%;
        height: 100%;
        // border: 1px solid rgba(32, 86, 221, 1);
        display: flex;
        flex-direction: column;
        .indicator-manage-content {
            flex: 910;
            .first{
                height:100%;
                /*margin-top: 22px;*/
                .jtyy{
                    height:100%;
                    .jcl{
                        height:100%;
                    }
                }
                .aqsg{
                    height:100%;
                }
                .fwbz{
                    height:100%;
                }
            }
            .xwyx{
                height:100%;
            }

        }
        .active {
            color: #fff !important;
        }
    }

    .road-network-event-wrap {
        // width:100%;
        height: 100%;
        background: rgba(5, 12, 38, 1);
        border: 1px solid rgba(32, 86, 221, 0.6);
        // background-image: url("./img/search_bg.png");
        background-size: 124px 120px;
        background-repeat: no-repeat;
        background-position: right top;
    }
    .road-network-event-content {
        height: 100%;
        width: 100%;
    }
    .bgimg {
        position: absolute;
        top: 45px;
        right: 19px;
        width: 124px;
        height: 120px;
    }
    .imgWrap {
        width: 48px;
        height: 48px;
        background: rgba(32, 86, 221, 1);
        border-radius: 50%;
        text-align: center;
        .imgstyle{
            width: 36px;
            height:36px;
            margin: 0 auto;
        }
    }
    .imgWrap > img {
        width: 34px;
        height: 34px;
        vertical-align: bottom;
    }

</style>