<template>
    <!-- 公交运行监测 -- 实时 监测 -->
    <div class="comprehensiveMonitor-wrapper">
        <Basemap></Basemap>
        <div class="top">
            <div class="traffic-wrapper">
                <div class="item-wrapper">
                    <mapDataCenterData :itemList="itemList" ></mapDataCenterData>
                </div>
            </div>
        </div>
        <div class="panel-wrapper left">
            <panel>
              <!--   <div class="tq">
                    <h2>
                        航班延误黄色预警：11月21日，
                        成都机场预计6：30左右至9：30左右受能见度低影响，
                        机场保障能力下降30%，期间进出航班受到影响。
                    </h2>
                </div> -->
                <!-- 今日运行情况 -->
                <div class="yxqk-container">
                    <PanelItem title="今日运行情况" :displaySwitch=false >
                        <div class="yxqk-wrapper">
                            <div class="item-wrapper">
                                <div class="item" @click="qk1">
                                    <h2>跨区域经营</h2>
                                    <p>{{kqyjydata}} <span>辆</span>  </p>
                                </div>
                                <div class="item" @click="qk2">
                                    <h2>脱离线路行驶</h2>
                                    <p>{{tlxlxsdata}} <span>辆</span>  </p>
                                </div>
                            </div>
                            <div class="item-wrapper bj">
                                <div class="item" @click="qk3">
                                    <h2>可疑运行班线</h2>
                                    <p>{{kyyxbxdata}} <span>辆</span>  </p>
                                </div>
                                <div class="item" @click="qk4">
                                    <h2>路网异常</h2>
                                    <p>{{lwycdata}} <span>处</span>  </p>
                                </div>
                            </div>
                        </div>
                        <!-- 详情 -->
                        <div class="detail-wrapper">
                            <div class="detail">
                                <lwyc v-if="p4" />
                                <kqyjy v-if="p1" />
                                <kyyxbx v-if="p3" />
                                <tlxlxs v-if="p2" />
                            </div>
                        </div>
                    </PanelItem>

                </div>

                <div class="zbdl">
                    <!-- <PanelItem title="今日包车行程情况" :displaySwitch=false >
                        <jczbdl />
                    </PanelItem> -->
                </div>
            </panel>

        </div>
    </div>
</template>

<script>
import lwyc from "./components/RealTimeMonitor/lwyc.vue";
import kqyjy from "./components/RealTimeMonitor/kqyjy.vue";
import kyyxbx from "./components/RealTimeMonitor/kyyxbx.vue";
import tlxlxs from "./components/RealTimeMonitor/tlxlxs.vue";
    export default {
        name: '',
        mounted () {
            this.getAbnormalInfo();
            this.getTodayCharteredCarInfo();
        },
        components: {
            lwyc,
            kqyjy,
            kyyxbx,
            tlxlxs,
        },
        methods: {
            getAbnormalInfo(){
                this.$http.$get("charteredCar_RealTimeMonitoringHandler/getAbnormalInfo").then((res)=>{
                    if (res) {
                        this.kqyjydata = res.cross;
                        this.tlxlxsdata = res.outOfLine;
                        this.kyyxbxdata = res.suspicious;
                        this.lwycdata = res.abnormal;
                    }
                })
            },
            getTodayCharteredCarInfo(){
                this.$http.$get("charteredCar_RealTimeMonitoringHandler/getTodayCharteredCarInfo").then((res)=>{
                    if (res) {
                        this.itemList[0]["number"] = res.count; // 包车次数
                        this.itemList[0]["rate"] = res.countRatio; // 包车次数较上周期比率

                        
                        this.itemList[1]["number"] = res.vehicleNum; // 营运车辆
                        this.itemList[1]["rate"] = res.vehicleNumRatio; // 营运车辆较上周期比率

                        this.itemList[2]["number"] = res.passenger; // 预计旅客
                        this.itemList[2]["rate"] = res.passengerRatio; // 预计旅客较上周期比率


                    }
                })
            },
          qk1(){
              this.p1 = true;
              this.p2 = false;
              this.p3 = false;
              this.p4 = false;
          },
          qk2(){
              this.p1 = false;
              this.p2 = true;
              this.p3 = false;
              this.p4 = false;
          },
          qk3(){
              this.p1 = false;
              this.p2 = false;
              this.p3 = true;
              this.p4 = false;
          },
          qk4(){
              this.p1 = false;
              this.p2 = false;
              this.p3 = false;
              this.p4 = true;
          },
        },
        data() {
            return {
                kqyjydata:"--",
                tlxlxsdata:"--",
                kyyxbxdata:"--",
                lwycdata:"--",
                p1:true,
                p2:false,
                p3:false,
                p4:false,
                itemList: [
                {
                    id: "1",
                    sub: "包车次数",
                    number: "--",
                    unite: "次",
                    rateUnite: "较昨日",
                    rate: "--"
                    },
                    {
                    id: "2",
                    sub: "营运车辆",
                    number: "--",
                    unite: "量",
                    rateUnite: "较昨日",
                    rate: "--"
                    },
                    {
                    id: "3",
                    sub: "预计旅客",
                    number: "--",
                    unite: "万人次",
                    rateUnite: "较昨日",
                    rate: "--"
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comprehensiveMonitor-wrapper{
        height: 100%;
        position: relative;
        .mid-wrapper{
            position: absolute;
            left: 45%;
            top: 1%;
        }
    }
    .comprehensiveMonitor-wrapper{
        height: 100%;
        width: 100%;
        position: relative;
        .panel-wrapper{
            height: 100%;
            // padding: 10px 0;
            position: absolute;
            top: 0;
            width: 410px;
            // border: 1px solid red;
        }
        .left{
            left: 0;
        }
        .top{
            position: absolute;
            top :10px;
            left:50%;
            width:640px;
            height:90px;
            // border: 0.02rem solid #2056dd;
            border-radius:16px;
            transform: translateX(-50%);
            justify-content: center;
            .traffic-wrapper{
                display: flex;
                flex-direction: column;
                margin-top: 10px;
                .bj{
                    margin: 20px 0;
                }
                .item-wrapper{
                    display: flex;
                    justify-content: space-around;
                    .item{
                        width: 110px;
                        height: 70px;
                        border:2px solid rgba(32,86,221,.4);
                        border-radius:8px;
                        background-color: rgba(32, 86, 221, .4);
                        .section{
                            p{
                                font-size: 12px;
                                color: #ea1c2f;
                            }
                        }
                        @include v-center;
                        h2{
                            font-size: 14px;
                        }
                        p{
                            margin-top: 6px;
                            font-size: 18px;
                            color: #ead72c;
                            span{
                                font-size: 14px;
                            }
                        }

                    }
                }
                .data-time{
                    p{
                        color:#00ff00;
                    }
                }
            }
        }
        .right{
            right: 0;
            .gj-container{
                height:250px;
                overflow: auto;
                .gjjcqk{
                    ul {
                        display: flex;
                        flex-direction: column;

                        li {
                            height:56px;
                            display: flex;
                            /*justify-content: center;*/
                            align-items: center;
                            justify-items: center;
                            font-size: 14px;
                            background: rgba(32, 86, 221, 0.2);
                            margin-top:4px;
                            .word{
                                float: left;
                                line-height: 20px;
                                margin-left: 15px;
                                margin-top:4px;
                                span{
                                    color:#fff;
                                }
                                p{
                                    color:rgba(255,255,255,0.4);
                                }
                            }
                            .pic {
                                width: 40px;
                                height: 40px;
                                float: left;
                            }


                        }
                    }
                }
            }
            .cz-container{
                height:350px;
                .cz-jcxx{
                    ul{
                        li{
                            line-height: 18px;
                        }
                    }
                }
            }
            .dt-container{
                height:300px;
            }
            .gl-container{
                height:300px;
            }
            .comeorout{
                margin-left: 60%;
                /*float:right;*/

            }
            .totalTraffic{
                flex: 1;
                display: flex;
                margin-top: 2px;
                .item{
                    margin-left: 10px;
                    .section{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        h2{
                            font-size:14px;
                            font-weight:400;
                            color:rgba(255,255,255,.4);
                        }
                        p{
                            color: #FF0000;
                            margin-top: 6px;
                        }
                    }
                }
            }

        }
    }
    .tq{
        width: 96%;
        padding: 2%;
        line-height: 1.5em;
        background: rgba(255, 0, 0, 0.2);
        h2{
            text-indent: 26px;
            font-size: 16px;
            color: #ff0000;

        }
    }

    .yxqk-wrapper{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .bj{
            margin: 20px 0;
        }
        .item-wrapper{
            display: flex;
            justify-content: space-around;
            .item{
                width: 110px;
                height: 60px;
                border:2px solid rgba(32,86,221,.4);
                border-radius:8px;
                background-color: rgba(32, 86, 221, .4);
                @include v-center;
                h2{
                    font-size: 14px;
                }
                p{
                    margin-top: 6px;
                    font-size: 18px;
                    color: #ead72c;
                    span{
                        font-size: 14px;
                    }
                }
                
            }
        }

    }
    .detail-wrapper{

        h2{
            padding: 10px 0 0 30px;
            font-size: 16px;
        }
        p{
            padding: 10px 0 0 30px;
            font-size: 14px;
            span{
                color: #ead72c;
                font-size: 16px;
            }
        }
    }
    .zbdl{
        height: 230px;
        margin-top: 16px;
    }
   
</style>