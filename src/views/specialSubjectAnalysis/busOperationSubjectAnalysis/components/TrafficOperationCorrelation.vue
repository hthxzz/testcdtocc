<template>
    <!-- SafetyAccidents -->
    <div class="TrafficOperationCorrelation-container">
        <div class="TrafficOperationCorrelation-wrapper">
            <div class="top">
                <div class="item">
                    <v-chart :options="jclOption"/>
                    <h2>
                        公共汽电车
                        <div>进场率</div>
                        <img :src=src1 alt="">
                    </h2>
                </div>
                <div class="item">
                    <v-chart :options="wjlOption"/>
                    <h2>
                        公共交通
                        <div>投诉完结率</div>
                        <img :src=src2 alt="" srcset="">
                    </h2>
                </div>
            </div>
            <div class="bottom">
                <div class="item">
                    <v-chart :options="sylOption"/>
                    <h2>
                        公共交通
                        <div>一卡通使用率</div>
                        <img :src=src3 alt="" srcset="">
                    </h2>
                </div>
                <div class="item">
                    <v-chart :options="srspOption"/>
                    <h2>
                        公共交通
                        <div>职工收入水平</div>
                        <img :src=src4 alt="" srcset="">
                    </h2>
                </div>
            </div>
        </div>
        <div class="mid-pic">
            <img class="picStyle":src=src5 alt="" srcset="">
        </div>
    </div>
</template>

<script>
    import createOption from "./options";
    export default {
        name: '',
        mixins: [createOption],
        props:{jcl:{default:0},wjl:{default:0},syl:{default:0},srsp:{default:0}},
        mounted() {
            this.jclOption=this.createPieOption(this.jcl,'#FFF100');
            this.wjlOption=this.createPieOption(this.wjl,'#06DAEE');
            this.sylOption=this.createPieOption(this.syl,'#00B050');
            this.srspOption=this.createPieOption(this.srsp,'#2056DD');
        },
        data() {
            return {
                src1:require('../img/yy_ggqdc.png'),
                src2:require('../img/yy_tswjl.png'),
                src3:require('../img/yy_yktsyl.png'),
                src4:require('../img/yy_zgsrsp.png'),
                src5:require('../img/gj_yy_bg.png'),
                // option: option1,
                jclOption:{},
                wjlOption:{},
                sylOption:{},
                srspOption:{},

            }
        },
        methods:{

        },
    }
</script>

<style lang="scss" scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
    .TrafficOperationCorrelation-container{
        height: 100%;
        width: 100%;
        position: relative;
        .mid-pic{
            position: absolute;
            // border: 1px solid red;
            height: 75px;
            width: 98px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .picStyle{
                height: 75px;
                width: 98px;
            }
        }

    }
    .TrafficOperationCorrelation-wrapper{
        display: flex;
        flex-direction: column;
        height: calc(100% - 35px);
        width: 100%; 
        .top, .bottom{
            &:last-child{
                /*margin-top: 10px;*/
            }
            flex: 1;
            display: flex;
            .item{
                width:220px;
                height: 211.5px;
                display: inline-block;
                position: relative;
                flex: 1;
                h2{
                    position: absolute;
                    top:200px;
                    /*bottom: 0px;*/
                    font-size: 14px;
                    text-align: center;
                    left: 50%;
                    transform: translateX(-50%);
                    div{
                        margin-top: 6px;
                    }
                    img{
                        width: 50px;
                        height: 50px;
                        // border: 1px solid red;
                        display: inline-block;
                        position: absolute;
                        left: 50%;
                        top: -60px;
                        transform: translateX(-50%);


                    }
                }
                &:last-child{
                    /*margin-left: 10px;*/
                }
            }
        }
      
    }
</style>