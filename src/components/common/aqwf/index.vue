<template>
    <div class="aqwf-wrapper">
        <!-- 1 -->
        <section class="item-wrap item-wrap1">
            <div class="item item1">
                <img :src="srcbg" alt="" class="srcbg" >
                <img :src="gj_aqwf_xcsg" alt="" class="gj_aqwf_xcsg" >
            </div>
            <div class="item item2">
                <h2>行车事故</h2>
                <p>{{xcsg}} <span>起</span> </p>
            </div>
            <div class="item item3">
                <h2>较上月同期</h2>
                <p class="up" v-if="xcsgbl>=0">{{xcsgbl}}%  <span>⬆</span> </p>
                <p class="down" v-else>{{xcsgbl}}%  <span>⬇</span> </p>

            </div>
            <div class="item item4">
                <img :src="right_line" alt="" >
            </div>
            
        </section>
        <!-- 2 -->
        <section class="item-wrap" style="flex-direction: row-reverse" >
            <div class="item item1">
                <img :src="srcbg" alt="" class="srcbg" >
                <img :src="gj_aqwf_xzcf" alt="" class="gj_aqwf_xcsg" >
            </div>
            <div class="item item2">
                <h2>行政处罚</h2>
                <p> {{xzcf}} <span>起</span> </p>
            </div>
            <div class="item item3">
                <h2>较上月同期</h2>
                <p class="up" v-if="xzcfbl>=0">{{xzcfbl}}%  <span>⬆</span> </p>
                <p class="down" v-else>{{xzcfbl}}%  <span>⬇</span> </p>
            </div>
            <div class="item item4">
                <img :src="left_line" alt="" >
            </div>
            
        </section>
        <!-- 3 -->
        <section class="item-wrap item-wrap3">
            <div class="item item1">
                <img :src="srcbg" alt="" class="srcbg" >
                <img :src="gj_aqwf_jtwf" alt="" class="gj_aqwf_xcsg" >
            </div>
            <div class="item item2">
                <h2>交通违法</h2>
                <p> {{jtwf}} <span>起</span> </p>
            </div>
            <div class="item item3">
                <h2>较上月同期</h2>
                <p class="up" v-if="jtwfbl>=0">{{jtwfbl}}%  <span>⬆</span> </p>
                <p class="down" v-else>{{jtwfbl}}%  <span>⬇</span> </p>
            </div>
            <div class="item item4">
                <img :src="right_line" alt="" >
            </div>
            
        </section>
    </div>
</template>

<script>
    export default {
        name: 'aqwfCommon',
        props:{
            xcsg:{
                default : '--'
            },
            xcsgbl:{
                default : '--'
            },
            xzcf:{
                default : '--'
            },
            xzcfbl:{
                default : '--'
            },
            jtwf:{
                default : '--'
            },
            jtwfbl:{
                default : '--'
            },
        },
        mounted () {
            //  this.$http.$get('kyjc_basicStatisticHandler/getIlleailStats').then((data)=>{
            //     this.jtwf = data.countNum;
            //     this.jtwfbl = data.growthRate;
            // });
            //  this.$http.$get('kyjc_basicStatisticHandler/ZfLawcasesStats').then((data)=>{
            //     this.xzcf = data.countNum;
            //     this.xzcfbl = data.growthRate;
            // });
            //  this.$http.$get('kyjc_basicStatisticHandler/getTrafficAccidents').then((data)=>{
            //     this.xcsg = data.countNum;
            //     this.xcsgbl = data.growthRate;
            // });
        },
        data() {
            return {
                // xcsg:0,
                // xcsgbl:0,
                // xzcf:0,
                // xzcfbl:0,
                // jtwf:0,
                // jtwfbl:0,
                srcbg: require('../../../views/monitoringAndEarlyWarning/roadTransportOperation/img/lbx.png'),
                right_line: require('../../../views/monitoringAndEarlyWarning/roadTransportOperation/img/right_line.png'),
                left_line: require('../../../views/monitoringAndEarlyWarning/roadTransportOperation/img/left_line.png'),
                gj_aqwf_xzcf: require('../../../views/monitoringAndEarlyWarning/roadTransportOperation/img/gj_aqwf_xzcf.png'),
                gj_aqwf_jtwf: require('../../../views/monitoringAndEarlyWarning/roadTransportOperation/img/gj_aqwf_jtwf.png'),
                gj_aqwf_xcsg: require('../../../views/monitoringAndEarlyWarning/roadTransportOperation/img/gj_aqwf_xcsg.png'),
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin layoutCenter{
        display: flex;
        flex-direction: column;
        justify-content: center;
        
    }
        .aqwf-wrapper{
            width: 100%;
            height: calc(100% - 45px);
            display: flex;
            flex-direction: column;
            section{
                display: flex;
                flex-direction: row;
                flex: 1;
                .item{
                    flex: 1;
                }
                .item1{
                    flex: 1;
                    position: relative;
                    @include layoutCenter;
                    .srcbg{
                        width: 78px;
                        height: 91px;
                    }
                    .gj_aqwf_xcsg{
                        width: 46px;
                        height: 46px;
                        position: absolute;
                        // top: 26px;
                        left: 16px;
                    }
                }
                .item2{
                    flex: 1;
                    @include layoutCenter;
                    
                    p{
                        margin-top: 6px;
                        font-size: 26px;
                        color: #FFFF00;
                        span{
                            font-size: 14px;
                        }
                    }
                }
                .item3{
                    flex: 1;
                    @include layoutCenter;
                    h2{
                        color: rgba(255, 255, 255, .4);
                        font-size: 12px;
                    }
                    p{
                        margin-top: 6px;
                        font-size: 16px;
                    }
                    p.up{
                        color: #ea2022;
                    }
                    p.down{
                        color: #00B050;
                    }
                }
                .item4{
                    flex: 1;
                    @include layoutCenter;
                    img{
                        width: 186px;
                        height: 15px;
                    }
                }
            }
            
        }
        .item-wrap1{
            margin-top:10px;
        }
        .item-wrap3{
            /*margin-bottom: 10px;*/
        }
</style>