<template>
    <div class="road-line-container">
        <div class="road-line-wrap">
            <div class="search">
                <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
            </div>
            <div class="road-list">
                <div class="road-line-item" v-for="item in roadList" :key="item.uid" >
                    <div class="img-wrap">
                        <img :src="item.pic" alt="" >
                    </div>
                    <div class="road-num">
                        <span> {{ item.roadNum }} </span>
                    </div>
                    <div class="road-name">
                        {{ item.roadName }}
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
            show : {
                default : false,
                type : Boolean
            }
        },
        data() {
            return {
                roadList : [{
                    pic : require('../img/lw_jcss.png'),
                    roadName : '基础设施',
                    roadNum : '9'
                },
                {
                    pic : require('../img/lw_fsss.png'),
                    roadName : '附属设施',
                    roadNum : '6'
                },{
                    pic : require('../img/lw_fssb.png'),
                    roadName : '附属设备',
                    roadNum : '15',
                },{
                    pic : require('../img/lw_jcss.png'),
                    roadName : '基础设施',
                    roadNum : '11',
                }
                ,{
                    pic : require('../img/lw_jcss.png'),
                    roadName : '基础设施',
                    roadNum : '161',
                }
                
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .road-line-container{
        .road-line-wrap{
            width:400px;
            height:421px;
            background:rgba(9,28,74,1);
            box-shadow:0px 4px 5px 0px rgba(81, 116, 103, 0.35);
            opacity:0.9;
            .search{
                // width: 316px;
                // margin: 0 auto;
                padding: 21px;
            }
            .road-list{
                text-align: left;
                padding: 0 21px;
                overflow-y: hidden;
                height: 316px;
                // overflow-y: auto;
                &:hover{
                    overflow-y: auto;
                }
                &:hover > .road-line-item{
                    width: 106px;
                }
                .road-line-item:nth-child(3n - 1){
                    margin: 0 10px;
                }
                .road-line-item:nth-child(3n - 2){
                    margin-top: 10px;
                }
                .road-line-item{
                    display: inline-block;
                    width:110px;
                    cursor: pointer;
                    height:142px;
                    background:rgba(32,86,221,.8);
                    .img-wrap{
                        width:48px;
                        height:48px;
                        margin: 7px auto 10px auto;
                        background:rgba(32,86,221,1);
                        box-shadow:0px 4px 5px 0px rgba(81, 116, 103, 0.35);
                        border-radius:8px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 33px;
                            height: 34px;
                        }
                    }
                    .road-num{
                        margin: 0 auto;
                        width:64px;
                        text-align: center;
                        height:24px;
                        background:rgba(255,255,255,.8);
                        border-radius:4px;
                        span{
                            width:19px;
                            height:12px;
                            vertical-align: sub;
                            font-size:16px;
                            font-weight:bold;
                            color:rgba(255,255,255,1);
                            // line-height:30px;
                        }
                    }
                    .road-name{
                        font-size:14px;
                        font-weight:400;
                        text-align: center;
                        margin-top: 10px;
                        color:rgba(255,255,255,1);
                        line-height:18px;
                        text-shadow:0px 4px 5px rgba(81, 116, 103, 0.35);
                    }
                }
            }
        }
    }
</style>