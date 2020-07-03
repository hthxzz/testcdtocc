<template>
    <!-- 公交运行监测 -- 综合 监测 -->
    <div class="comprehensiveMonitor-wrapper">
         <section class="left">
             <div class="top">
                 <bcyxbc />
             </div>
             <div class="mid">
                <bcyslk />
             </div>
             <div class="bottom">
                <bccql />
             </div>
             
         </section>
         <section class="mid">
             <div class="top">
                 <div class="base-info-wrappper">
                     <img :src="src4" alt="" >
                     <!-- <h2>基础信息</h2> -->
                     <div class="info-wrapper">
                         <div class="item item1">
                            <h2>经营业户</h2>
                            <p> {{jyyh}}</p>
                            <p>
                                <span>较去年</span>
                                <!-- <em>{{jyyhRate}}</em> -->
                                <i style="color:green" v-if="Number.parseFloat(jyyhRate) < 0 " > {{jyyhRate}} ⬇</i> 
                                <i style="color:red" v-if="Number.parseFloat(jyyhRate) > 0 " > {{jyyhRate}} ⬆</i> 
                                <i v-if="Number.parseFloat(jyyhRate) == NaN " >{{jyyhRate}}</i>
                            </p>
                        </div>
                        <div class="item item2">
                            <h2>省级客运包车(辆)</h2>
                            <p> {{sjkybc}}</p>
                            <p>
                                <span>较去年</span>
                                <!-- <em>{{sjkybcRate}}</em> -->
                                <i style="color:green" v-if="Number.parseFloat(sjkybcRate) < 0 " > {{sjkybcRate}} ⬇</i> 
                                <i style="color:red" v-if="Number.parseFloat(sjkybcRate) > 0 " > {{sjkybcRate}} ⬆</i> 
                                <i v-if="Number.parseFloat(sjkybcRate) == NaN " >{{sjkybcRate}}</i>
                            </p>
                        </div>
                        <div class="item item3">
                            <h2>市级客运包车(辆)</h2>
                            <p> {{shijkybc}}</p>
                             <p>
                                <span>较去年</span>
                                <!-- <em>{{shijkybcRate}}</em> -->
                                <i style="color:green" v-if="Number.parseFloat(shijkybcRate) < 0 " >  {{shijkybcRate}}  ⬇</i> 
                                <i style="color:red" v-if="Number.parseFloat(shijkybcRate) > 0 " >  {{shijkybcRate}}  ⬆</i> 
                                <i v-if="Number.parseFloat(shijkybcRate) == NaN " >{{shijkybcRate}}</i>
                            </p>
                        </div>
                        <div class="item item4">
                            <h2>县级客运包车(辆)</h2>
                            <p> {{xjkybc}}</p>
                            <p>
                                <span>较去年</span>
                                <!-- <em>{{xjkybcRate}}</em> -->
                                <i style="color:green" v-if="Number.parseFloat(xjkybcRate) < 0 " > {{xjkybcRate}} ⬇</i> 
                                <i style="color:red" v-if="Number.parseFloat(xjkybcRate) > 0 " > {{xjkybcRate}} ⬆</i> 
                                <i v-if="Number.parseFloat(xjkybcRate) == NaN " >{{xjkybcRate}}</i>
                            </p>
                        </div>
                     </div>
                     

                 </div>
                 <!-- <verticesBorderStyle /> -->
             </div>
             <div class="bottom">
                 <panelTitle title="包车热点线路" :displaySwitch=false ></panelTitle>
                 <rmysxl></rmysxl>
                 <!-- <verticesBorderStyle /> -->
             </div>
         </section>
         <section class="right">
             <div class="top">
                    <panelTitle title="安全违法情况" :displaySwitch=false ></panelTitle>
                    <aqwf></aqwf>
             </div>
             <div class="mid">
                    <panelTitle title="营运投诉情况" :displaySwitch=false ></panelTitle>
                    <yyts></yyts>
                 <!-- <verticesBorderStyle /> -->
             </div>
             <div class="bottom">
                    <panelTitle title="包车运行异常" :displaySwitch=false ></panelTitle>
                    <qyts></qyts>
                 <!-- <verticesBorderStyle /> -->
             </div>
         </section>
         <div class="date-float" :style="{visibility:visibility}" >
             <el-date-picker
                v-model="datevalue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
         </div>
    </div>
</template>

<script>
import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";
import qyts from "./components/ComprehensiveMonitor/qyts.vue";
import aqwf from "./components/ComprehensiveMonitor/aqwf.vue";
import yyts from "./components/ComprehensiveMonitor/yyts.vue";
import bcyxbc from "./components/ComprehensiveMonitor/bcyxbc.vue";
import bccql from "./components/ComprehensiveMonitor/bccql.vue";
import bcyslk from "./components/ComprehensiveMonitor/bcyslk.vue";
import rmysxl from "./components/ComprehensiveMonitor/rmysxl.vue";
import cdMap from "../../../components/index/cdMap.vue";
    export default {
        name: '',
        components: {
          qyts,
          bcyslk,
          bccql,
          yyts,
          bcyxbc,
          rmysxl,
          cdMap,
          aqwf
        },
        mounted () {
            
            setTimeout(() => {
                // 防止时间组件闪烁
                this.visibility = "visible"
            }, 1000);
            this.$http.$get('kyjc_stationTransport/getPassengerTransportInfo').then((data)=>{
                this.bc = data.shuttleCount;
                this.zbl = data.shuttleOntimeRate;
                this.szl = data.seatRate;
            });
            this.$http.$get('kyjc_stationTransport/getBaseInfo').then((data)=>{
                
            });
        },
        
        data() {
            return {
                srcbg:require('./img/bc_center_bg.png'),
                src1:require('./img/dlys_sjfb.png'),
                src2:require('./img/dlys_zbl.png'),
                src3:require('./img/dlys_szl.png'),
                src4:require('./img/bc_center_bg.png'),
                bc:1,
                zbl:2,
                szl:3,
                showdw:true,
                jyyh:10,
                sjkybc:123,
                shijkybc:456,
                xjkybc:789,

                jyyhRate:"-1%",
                sjkybcRate:"6.1%",
                shijkybcRate:"1.1%",
                xjkybcRate:"--",
                
                rollNo:902143,
                datevalue: '',
                pickerOptions: dateRang,
                visibility:"hidden"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin flexLayOut{
            position: relative;
            display: flex;
            flex-direction: column;
    }
    @mixin panelBg{
        // background:rgba(0,0,0,1);
        border:1px solid rgba(17,46,120,.2);
    }

    .comprehensiveMonitor-wrapper{
        display: flex;
        height: 100%;
        width: 100%;
        // 左边
        & > section{
            overflow: hidden;
        }
        .left > div{
            flex: 1;
        }
        .left{
            flex: 500;
            @include flexLayOut;
            // 左上
            .top{
                @include panelBg;
                position: relative;
                
            }
            // 左下
            .bottom{
                // flex: 220;
                @include panelBg;
                position: relative;
                margin-top: 10px;
                .yyqk-wrapper{
                    display: flex;
                    margin-top: 10px;
                    .item{
                        flex: 1;
                        position: relative;
                        .bg{
                            width: 100%;
                            height: 100%;

                        }
                        .pic{
                            position: absolute;
                            left: 60px;
                            top: 30px;
                            width: 50px;
                            height: 50px;
                        }
                        h2{
                            position: absolute;
                            width: 100%;
                            text-align: center;
                            top: 90px;
                        }
                        p{
                            position: absolute;
                            width: 100%;
                            margin-top: 10px;
                            text-align: center;
                            top: 110px;
                            font-size: 26px;
                        }
                    }
                }
            }
        }
        // 中部
        .mid > div{
            // flex-basis: 0% !important;
        }
        .mid{
            @include flexLayOut;
            flex: 830;
            margin: 0 30px;
            // 中上
            .top{
                flex: 250;
                position: relative;
                .base-info-wrappper{
                    position: relative;
                    @include panelBg;
                    img{
                        // width: 786px;
                        width: 100%;
                        height: 100%;
                    }
                    & > h2{
                        position: absolute;
                        width: 100%;
                        text-align: center;
                        top: 22px;
                    }
                    .info-wrapper{
                        .item{
                            position: absolute;
                            // top: 110px;
                            height: 60px;
                            width: 140px;
                            // left: 36px;
                            margin-top: 30px;
                            bottom: 26px;
                            h2{
                                // position: absolute;
                                width: 100%;
                                text-align: center;
                                top: 14px;
                                font-weight: bold;
                                font-size: 14px;
                            }
                            p{
                                // color: #01E9EB;
                                text-align: center;
                                width: 100%;
                                // position: absolute;
                                top: 36px;
                                font-size: 14px;
                                margin-top: 3px;
                                span{
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                    .info-wrapper{
                        position: absolute;
                        width: 100%;
                        top: 0;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-evenly;
                        align-items: center;
                        height: 100%;
                        .item{
                            h2{
                                
                            }
                            p:nth-child(2){
                                letter-spacing: 2px;
                                font-size: 24px;
                                color: rgba(0, 255, 255, 1);
                            }
                            p:nth-child(3){
                                span{
                                    color: #fff;
                                }
                                em{
                                    font-style: unset;
                                    margin: 0 10px;
                                }
                                i{
                                    font-style: unset;
                                }
                            }
                    }
                        .item1{
                            left: 10px;
                            margin-top: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            top: 26px;
                            p:nth-of-type(1){
                                font-size: 36px;
                            }
                            
                        }
                        .item2{
                            left: 26px;
                            bottom: 40px;
                            p{
                                // color: #FFFF00;
                            }
                        }
                        .item3{
                            left: 50%;
                            transform: translateX(-50%);
                            p{
                                // color: #00FFFF;
                            }
                        }
                        .item4{
                            right: 26px;
                            bottom: 40px;
                            p{
                                // color: #00FFFF;
                            }
                        }
                        // .item5{
                        //     left: 680px;
                        //     p{
                        //         color: #00FFFF;
                        //     }
                        // }
                    }
                }
            }
            // 中下
            .bottom{
                @include panelBg;
                flex: 610;
                position: relative;
                // margin: 10px 0 0 0;
                // height: calc(100% - 50px);
            }
        }
        // 右边
        .right > div{
            // flex-basis: 0% !important;
        }
        .right{
            @include flexLayOut;
            flex: 500;
            // 右上
            .top{
                flex: 306;
                position: relative;
                @include panelBg;
            }
            // 右中
            .mid{
                 margin: 10px 0 0 0;
                 flex: 211;
                 @include panelBg;
            }
            // 右下
            .bottom{
                flex: 281;
                position: relative;
                // margin-top: 10px;
                @include panelBg;
            }
        }

    }
    .date-float{
        position: fixed;
        right: 20px;
        top: 110px;
        visibility: hidden;
    }
    .bc{
        color: #FFFF00;
    }
    .zbl{
        color: #01E9EB;
    }
    .szl{
        color: #01E9EB;
    }
</style>