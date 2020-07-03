<template>
    <div class="RealtimeMonitore-wrapper">
        <basemap />
        <div class="top">
            <div class="traffic-wrapper">
                <div class="item-wrapper">
                    <mapDataCenterData :itemList="itemList" ></mapDataCenterData>
                </div>
            </div>
        </div>
        <div class="panel-wrapper left">
            <panel>
                <div class="tq">
                    <h2>
                        航班延误黄色预警：11月21日，
                        成都机场预计6：30左右至9：30左右受能见度低影响，
                        机场保障能力下降30%，期间进出航班受到影响。
                    </h2>
                </div>
                <!-- 今日运行情况 -->
                <div class="yxqk-container">
                    <PanelItem title="今日运行情况" :displaySwitch=false >
                        <div class="yxqk-wrapper">
                            <div class="item-wrapper">
                                <div class="item" @click="qk1">
                                    <h2>进港总量</h2>
                                    <p>{{comeNum}} <span>架次</span>  </p>
                                </div>
                                <div class="item" @click="qk2">
                                    <h2>出港总量</h2>
                                    <p>{{outNum}} <span>架次</span>  </p>
                                </div>
                            </div>
                            <div class="item-wrapper bj">
                                <div class="item" @click="qk3">
                                    <h2>进港延误</h2>
                                    <p>{{comeDelayNum}} <span>架次</span>  </p>
                                </div>
                                <div class="item" @click="qk4">
                                    <h2>出港延误</h2>
                                    <p>{{outDelayNum}} <span>架次</span>  </p>
                                </div>
                            </div>
                            <div class="item-wrapper">
                                <div class="item">
                                    <h2>进港取消航班</h2>
                                    <p>{{comeCancelNum}} <span>架次</span>  </p>
                                </div>
                                <div class="item">
                                    <h2>出港取消航班</h2>
                                    <p>{{outCancelNum}} <span>架次</span>  </p>
                                </div>
                            </div>
                        </div>
                        <!-- 详情 -->
                        <div class="detail-wrapper">
                            <h2>{{ yxqkdetail }}</h2>
                            <p v-if="p1" >出港 <span>{{cgsl}} 架次/小时</span> ,最新出港 <span> {{zxcg}} </span> </p>
                            <p v-if="p2">进港 <span>{{jgsl}} 架次/小时</span> ,最新进港 <span> {{zxjg}} </span> </p>
                            <p v-if="p3">延误率 <span>{{ywl}}</span> ,平均延误 <span> {{pjyw}} </span> </p>
                            <div class="detail">
                                <trafficJam></trafficJam>
                            </div>
                        </div>
                    </PanelItem>

                </div>

                <div class="zbdl">
                    <PanelItem title="机场周边道路拥堵情况" :displaySwitch=false >
                        <jczbdl />
                    </PanelItem>
                </div>
            </panel>

        </div>
        <div class="panel-wrapper right">
            <panel>
                <!-- 公交基础情况 -->
                <div class="gj-container">
                    <PanelItem title="公交基础情况" :displaySwitch=false >
                        <div class="gjjcqk">
                            <ul>
                                <li>
                                    <div class="pic"><img :src="imgsrc" alt=""></div>
                                    <div class="word">
                                        <span>机场专线1号线路（6:30-05:30）</span>
                                        <p>双流国际机场—人民南路二段（岷山饭店）</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic"><img :src="imgsrc" alt=""></div>
                                    <div class="word">
                                        <span>机场专线2号线路（6:30-20:00）</span>
                                        <p>双流国际机场—火车北站公交站</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic"><img :src="imgsrc" alt=""></div>
                                    <div class="word">
                                        <span>826路</span>
                                        <p>华阳客运中心站←→机场公交站</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </PanelItem>
                </div>
                <div class="cz-container">
                    <PanelItem title="今日出租车运营情况（含巡游车与网约车）" :displaySwitch=false >
                        <div class="cz-jcxx" style="margin-top: 10px">
                            <ul>
                                <li>区域内剩余空车数:<lable style="color:#73ff5f">321</lable>辆</li>
                                <li>车辆平均等待时间:<lable style="color:#FFFF00">4.5</lable>分钟</li>
                            </ul>
                        </div>
                        <div>
                            <div class="comeorout">
                                <ChangeEchar :itemList="comeOrOutConfig" @getStatues="" ></ChangeEchar>
                            </div>
                            <div class="totalTraffic">
                                <div class="number-wrapper">
                                    <RollNumber title="累计班次" :value="rollNo" unit="次"></RollNumber>
                                </div>
                                <div class="item">
                                    <section class="three section">
                                        <h2 >较昨日</h2>
                                        <p>2.0%⬆</p>
                                    </section>
                                </div>
                            </div>

                        </div>
                        <div style="height:150px">
                            <v-chart :options="czOption" :autoresize="true" theme="theme"></v-chart>
                        </div>


                    </PanelItem>
                </div>
                <div class="dt-container">
                    <PanelItem title="今日地铁客流情况" :displaySwitch=false >
                        <div >
                            <div class="comeorout">
                                <ChangeEchar :itemList="comeOrOutConfig" @getStatues="" ></ChangeEchar>
                            </div>
                            <div class="totalTraffic">
                                <div class="number-wrapper">
                                    <RollNumber title="累计客流" :value="rollNo" unit="人"></RollNumber>
                                </div>
                                <div class="item">
                                    <section class="three section">
                                        <h2 >较昨日</h2>
                                        <p>2.0%⬆</p>
                                    </section>
                                </div>
                            </div>

                        </div>
                        <div style="height:150px">
                            <v-chart :options="czOption" :autoresize="true" theme="theme"></v-chart>
                        </div>
                    </PanelItem>
                </div>
                <div class="gl-container">
                    <PanelItem title="今日机场客运公路客流" :displaySwitch=false >
                        <div >
                            <div class="comeorout">
                                <ChangeEchar :itemList="comeOrOutConfig" @getStatues="" ></ChangeEchar>
                            </div>
                            <div class="totalTraffic">
                                <div class="number-wrapper">
                                    <RollNumber title="累计客流" :value="rollNo" unit="人"></RollNumber>
                                </div>
                                <div class="item">
                                    <section class="three section">
                                        <h2 >较昨日</h2>
                                        <p>2.0%⬆</p>
                                    </section>
                                </div>
                            </div>

                        </div>
                        <div style="height:150px">
                            <v-chart :options="czOption" :autoresize="true" theme="theme"></v-chart>
                        </div>
                    </PanelItem>
                </div>
            </panel>

        </div>

    </div>
</template>

<script>
    import trafficJam from "./components/trafficJam.vue";
    import jczbdl from "./components/jczbdl.vue";
    import echartContent from"./echartContent";
    export default {
        name: '',
        components: {
            trafficJam,
            jczbdl,
        },
        mixins: [echartContent],
        mounted() {
            this.czOption=this.creatOption(this.czData,"line","",false,false,6,true,10, "人次");
            this.$http.$get("kyjc_flightStatistic/getFlightStatistic").then((param) => {
                this.dealWithData(param);
            });
        },
        data() {
            return {
                itemList: [
                {
                    id: "1",
                    sub: "预计出港旅客",
                    number: 12312345,
                    unite: "人次",
                    rateUnite: "较昨日",
                    rate: -6
                    },
                    {
                    id: "2",
                    sub: "累计出港旅客",
                    number: 4567,
                    unite: "人次",
                    rateUnite: "较昨日",
                    rate: 6
                    },
                    {
                    id: "3",
                    sub: "预计进港旅客",
                    number: 12345,
                    unite: "人次",
                    rateUnite: "较昨日",
                    rate: -16
                    },
                    {
                        id: "4",
                        sub: "累计进港旅客",
                        number: 12545,
                        unite: "人次",
                        rateUnite: "较昨日",
                        rate: 12
                    },
                ],
                imgsrc:require("./img/cxky.png"),
                rollNo:1234,
                comeOrOutConfig:['到达','出发'],
                yxqkdetail:'出港航班情况',
                cgsl:21,
                zxcg:'CA502',
                jgsl:100,
                zxjg:'ZA1234',
                ywl:'21%',
                pjyw:'112m',
                p1:true,
                p2:false,
                p3:false,
                czOption:{},
                czData:[
                    ['今日','昨日'],
                    ['1：00','2：00','3：00','4：00','5：00'],
                    [2000,5431,3421,7625,8282],
                    [6532,2625,8756,7252,4352]
                ],
                comeNum:0,
                comeDelayNum:0,
                comeCancelNum:0,
                outNum:0,
                outDelayNum:0,
                outCancelNum:0,


            }
        },
        methods: {
            dealWithData:function(data){
                this.comeNum=data.comeNum==null?0:data.comeNum;
                this.comeDelayNum=data.comeDelayNum==null?0:data.comeDelayNum;
                this.comeCancelNum=data.comeCancelNum==null?0:data.comeCancelNum;
                this.outNum=data.outNum==null?0:data.outNum;
                this.outDelayNum=data.outDelayNum==null?0:data.outDelayNum;
                this.outCancelNum=data.outCancelNum==null?0:data.outCancelNum;
                this.itemList[3].number=data.realComePersonNum==null?0:data.realComePersonNum;//实际进港
                this.itemList[2].number=data.expectComePersonNum==null?0:data.expectComePersonNum;//预计进港旅客数量
                this.itemList[0].number=data.expectOutPersonNum==null?0:data.expectOutPersonNum;//预计出港
                this.itemList[1].number=data.realOutPersonNum==null?0:data.realOutPersonNum;//实际出港旅客数量
                },
            qk1(){
                this.yxqkdetail = '出港航班情况';
                this.p1 = true;
                this.p2 = false;
                this.p3 = false;
            },
            qk2(){
                this.yxqkdetail = '进港航班情况';
                this.p1 = false;
                this.p2 = true;
                this.p3 = false;
            },
            qk3(){
                this.yxqkdetail = '出港延误';
                this.p1 = false;
                this.p2 = false;
                this.p3 = true;
            },
            qk4(){
                this.yxqkdetail = '进港延误';
                this.p1 = false;
                this.p2 = false;
                this.p3 = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .RealtimeMonitore-wrapper{
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