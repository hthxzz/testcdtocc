<template>
    <div class="container">
        <div class="left">
            <div class="left-top">
                <div class="wrap">
                    <div class="first">
                        <img src='../../assets/index/index/jtyxzs.png' alt="" >
                    </div>
                    <div class="second">
                        <div class="basic-score">基本畅通</div>
                        <div class="basic-score">交通运行指数</div>
                    </div>
                    <div class="score">3.1</div>
                </div>
            </div>
            <div class="left-bootom">
                <div class="item top">
                    <h2>交通事件数量</h2>
                    <div class="nums">
                        <div class="num"  v-for="no in tanfficNumber" >
                            {{no}}
                        </div>
                    </div>
                </div>
                <div class="item mid">
                    <div class="pie">
                        <TrafficIncident></TrafficIncident>
                    </div>
                </div>
                <div class="item bott">
                    <span class="content alerm">告警</span>
                    <span class="content jdqk">交通瘫痪</span>
                    <span class="content lcd">6</span>
                    <span class="content lcc">12</span>
                    <span class="content yd">严重拥堵</span>
                     <img src='../../assets/index/index/warning_bg.png' alt="" >
                </div>
            </div>
        </div>
        <div class="right">
            <cdMap></cdMap>
        </div>
    </div>
</template>

<script>
import TrafficIncident from "./TrafficIncident.vue";
import cdMap from "./cdMap.vue";
    export default {
        name: '',
        components: {
            TrafficIncident,
            cdMap
        },
        data() {
            return {
                tanfficNumber: ["6","2","1","3"]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin border {
        background:rgba(5,12,38,.4);
        border:1px solid rgba(32,86,221,1);
        color:rgba(255,255,255,1);
    }
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        font-size:14px;
        font-family:MicrosoftYaHei;
        .left{
            flex: 270;
            display: flex;
            margin: 11px;
            flex-direction: column;
            .left-top{
                flex: 88;
                display: flex;
                @include border;
                .wrap{
                    display: flex;
                    width: 100%;
                    .first{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 48px;
                            height: 48px;
                            flex: 68;
                        }
                    }
                    .second{
                        display: flex;
                        flex: 150;
                        flex-direction: column;
                        > div:nth-child(1){
                            font-size:22px;
                            margin-top: 11px;
                            font-family:MicrosoftYaHei;
                            font-weight:400;
                            color:rgba(0,176,80,1);
                        }
                        > div:nth-child(2){
                            // margin-top: 10px;
                        }                        
                    }
                    .score{
                        flex: 102;
                        font-size:48px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        // line-height:24px;
                    }
                }
            }
            .left-bootom{
                flex: 561;
                margin-top: 11px;
                display: flex;
                flex-direction: column;
                @include border;
                .item{
                    flex: 1;
                    margin: 0 10px;
                    border-bottom: 1px solid rgba(32,86,221,1);
                }
                .top{
                    h2{
                        margin-top: 21px;
                        font-size: 18px;
                    }
                    .nums{
                        display: flex;
                        margin-top: 13px;
                        .num{
                            width:60px;
                            // height:74px;
                            font-size:72px;
                            font-family:MicrosoftYaHei;
                            font-weight:400;
                            color:rgba(255,255,0,1);
                            // line-height:30px;
                            text-shadow:0px 5px 0px rgba(0, 0, 0, 0.35);
                            background:rgba(32,86,221,1);
                            // box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);
                            border-radius:8px;
                            background: url('../../assets/index/index/big_data_bg.png') no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
                .mid{
                    .pie{
                        width: 100%;
                        height: 100%;
                    }
                }
                .bott{
                    border: 0 !important;
                    position: relative;
                    .content{
                        position: absolute;
                    }
                    .alerm{
                        top: 38px;
                        left: 98px;
                        font-size:20px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                        color:rgba(255,0,0,1);
                    }
                    .jdqk{
                        width:40px;
                        // height:31px;
                        left: 30px;
                        top: 60px;
                        font-size:14px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        line-height:19px;
                    }
                    .lcd{
                        // height:31px;
                        left: 85px;
                        top: 89px;
                        font-size:14px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        line-height:19px;
                    }
                    .lcc{
                        left: 148px;
                        top: 121px;
                        font-size:14px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        line-height:19px;
                    }
                    .yd{
                        width:40px;
                        // height:31px;
                        left: 197px;
                        top: 101px;
                        font-size:14px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        line-height:19px;
                    }
                    img{
                        width: 203px;
                        height: 157px;
                    }
                }
            }
        }
        .right{
            flex: 779;
        }
    }
</style>