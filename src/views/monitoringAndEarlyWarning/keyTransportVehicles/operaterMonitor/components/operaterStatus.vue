<template>
    <div class="road-line-container">
        <div class="road-line-wrap">          
            <div class="vehicles-list">
                <div class="vehicles-status"><span>运行状态</span></div>
                <div class="road-line-item" v-for="item in roadList" :key="item.uid" >
                    <div class="road-name">
                        {{ item.roadName }}
                    </div>
                    <div class="road-num">
                        <span> {{ item.roadNum }} </span>
                        <span> {{ item.unit }} </span>
                    </div>
                     <!-- 边款的4个顶点样式,用css实现，需要上一级元素自动或者相对定位 -->
                    <div class="verticesBorderStyle">
                        <span class="left-top-border-row"></span>
                        <span class="left-top-border-col"></span>
                        <span class="left-bot-border-row"></span>
                        <span class="left-bot-border-col"></span>
                        <span class="right-top-border-row"></span>
                        <span class="right-bot-border-row"></span>
                        <span class="right-top-border-col"></span>
                        <span class="right-bot-border-col"></span>
                    </div>
                </div>
                                 
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'operaterStatus',
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
                    roadName : '营运车辆',
                    roadNum : '40736辆',
                },
                {
                    pic : require('../img/lw_fsss.png'),
                    roadName : '今日上线车辆',
                    roadNum : '34101辆'
                },{
                    pic : require('../img/lw_fssb.png'),
                    roadName : '实时在线车辆',
                    roadNum : '27723辆',
                },{
                    pic : require('../img/lw_jcss.png'),
                    roadName : '在线率',
                    roadNum : '68.33%',
                }
                ,{
                    pic : require('../img/lw_jcss.png'),
                    roadName : '出域车辆',
                    roadNum : '6833辆',
                },{
                    pic : require('../img/lw_jcss.png'),
                    roadName : '入域车辆',
                    roadNum : '7833辆',
                }
                ]
            }
        }
    }
</script>


<style lang="scss" scoped>
    .road-line-container{
        .road-line-wrap{
            margin-top: 20px;
            width:780px;
            height:70px;
            background:rgba(18, 50, 128, 0.8);
            box-shadow:0px 4px 5px 0px rgba(131, 152, 144, 0.35);
            opacity:0.9;  //透明度           
            float: left;
            .vehicles-list{
                text-align: left;
                padding: 0 21px;
                // overflow-y: hidden;
                height: 76px;
                overflow-y: auto;
                .vehicles-status{
                    width: 50px;
                    height: 72px;
                    font-size: 18px;    
                    font-weight: bold;  
                    line-height: 25px;         
                    color: #FFFFFF;
                    float: left;
                    margin-top: 10px;  
                    cursor: default;                    
                }               
                
                .road-line-item{
                    display: inline-block;
                    margin: 10px 0px 10px 8px;                   
                    border-radius: 2px;
                    width: 105px;
                    cursor: default;
                    height:52px;
                    background:rgba(32, 86, 221, 0.2);
                    position: relative;
                    .road-num{
                        margin: 0 auto;
                        width: 74px;
                        text-align: center;
                        height:24px;
                        // background:rgba(29, 57, 130, 0.8);                        
                        span{
                            width:19px;
                            height:12px;
                            vertical-align: sub;
                            font-size:24px;
                            font-weight:bold;
                            color:#FFFF00;
                            // line-height:30px;
                        }
                    }
                    .road-name{
                        font-size:16px;
                        font-weight: bold;  
                        // font-weight:400;
                        text-align: center;
                        margin-top: 10px;
                        color:rgba(255,255,255,1);
                        line-height:18px;
                        text-shadow:0px 4px 5px rgba(81, 116, 103, 0.35);
                    }
                    .verticesBorderStyle{
                        @mixin row {
                            width: 16px;
                            height: 1px;
                        }
                        @mixin col {
                            width: 1px;
                            height: 16px;
                        }
                        span {
                            position: absolute;
                            background-color: rgba(32, 86, 221, 1);
                        }
                        .left-top-border-row {
                            @include row;
                            left: 0;
                            top: -1px;
                        }
                        .left-top-border-col {
                            @include col;
                            left: 0;
                            top: -1px;
                        }
                        .left-bot-border-row {
                            @include row;
                            left: 0;
                            bottom: -1px;
                        }
                        .left-bot-border-col {
                            @include col;
                            left: 0;
                            bottom: 0;
                        }
                        .right-top-border-row {
                            @include row;
                            right: 0;
                            top: -1px;
                        }
                        .right-top-border-col {
                            @include col;
                            right: 0;
                            top: 0;
                        }
                        .right-bot-border-col {
                            @include col;
                            right: 0;
                            bottom: 0;
                        }
                        .right-bot-border-row {
                            @include row;
                            right: 0;
                            bottom: 0;
                        }
                    }
                }   
            }
        }
    }
</style>