<template>
    <div class="contain">
        <div class="wrap">
            <div class="left">
                <div class="left-top">
                    <img :src="picUrls" :alt="name">
                </div>
                <div class="left-bottom">
                    <h2>{{ name }}</h2>
                </div>
            </div>
            <div class="right">
                <div class="right-top">
                    <h2 :style="{backgroundImage: 'url(' +bgPicUrl+')'}">{{ newpersonNo }}</h2>
                    <span>人</span>
                </div>
                <div class="right-bottom">
                    <div class="progress">
                        <span class="total"></span>
                        <span class="per"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props:{
            name : {
                type : String
            },
            picUrl : {
                type : String
            },
            bgPicUrl : {
                type : String,
                 default: require('@/assets/index/index/data_bg.png')
            },
            personNo : {
                type : String,
                default : "1"
            }
        },
        computed: {
            newpersonNo : function () {
                return this.personNo.toLocaleString();
            }
        },
        data() {
            return {
                 picUrls : require('@/assets/index/index/'+ this.picUrl +'.png')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contain{
        font-family:'MicrosoftYaHei';
        height: 100%;
        width: 100%;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-size: 14px;
        .wrap{
            display: flex;
            .left{
                flex: 46;
                text-align: left;
                .left-bottom{
                    h2{
                        // width:29px;
                        // height:12px;
                        font-size:14px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        // line-height:30px;
                    }
                }
            }
            .right{
                flex: 145;
                text-align: left;
                .right-top{
                    display: flex;

                    h2{
                        flex: 3;
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        // line-height:30px;
                    }
                    span{
                        flex: 2;
                        font-size:14px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        text-align: center;
                        color:rgba(255,255,255,1);
                        line-height:1.7;
                    }
                }
                .right-bottom{
                    .progress{
                        position: relative;
                        .total{
                            display: inline-block;
                            width:100%;
                            height:6px;
                            position: relative;
                            background:rgba(2,61,131,1);
                            opacity:0.4;
                            border-radius:3px;
                        }
                        .per{
                            display: inline-block;
                            width:46px;
                            height:6px;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            background:linear-gradient(-90deg,rgba(107,223,232,1),rgba(32,86,221,1));
                        }
                    }
                }
            }
        }
    }
    img{
        width: 30px;
        height: 29px;
    }
</style>