<!--右侧车辆信息 -->
<template>
    <div class="vehicles-info-container">
        <div class="vehicles-info-wrap">  
            <div class="vehicles-list">
                <div class="vehicles-info-title">车辆信息</div>
                <div class="vehicles-line-item" v-for="item in roadList" :key="item.uid" >
                    <div class="vehicles-line">
                        <div class="vehicles-left">
                            <label>班车客运：</label><span> {{ item.bcky }} </span>
                        </div>
                        <div class="vehicles-right">
                            <label>公交运输：</label><span> {{ item.gjys }} </span>
                        </div>
                    </div>
                    <div class="vehicles-line">   
                        <div class="vehicles-left">
                            <label>包车客运：</label><span> {{ item.bcky }} </span>
                        </div>
                        <div class="vehicles-right">
                            <label>巡游出租：</label><span> {{ item.xycz }} </span>
                        </div>
                    </div>
                    <div class="vehicles-line">
                        <div class="vehicles-left">
                            <label>危货运输：</label><span> {{ item.whys }} </span>
                        </div>
                        <div class="vehicles-right">
                            <label>网约车：</label><span> {{ item.wyc }} </span>
                        </div>
                    </div>
                    <div class="vehicles-line">
                        <div class="vehicles-left">
                            <label>重载及牵引挂车：</label><span> {{ item.zajqygc }} </span>
                        </div>
                        <div class="vehicles-right">
                            <label>汽车租赁：</label><span> {{ item.qczl }} </span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VehiclesInfo',
        props:{
            show : {
                default : false,
                type : Boolean
            }
        },
        data() {
            return {
                roadList : [{
                    bcky:10023,
                    gjys:784,   
                    bcky:523,  
                    xycz:12732,
                    whys:7723,
                    wyc:1723,  
                    zajqygc: 5723,
                    qczl:723
                }               
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vehicles-info-container{
        .vehicles-info-wrap{
            width:360px;
            height:180px;
            box-shadow:0px 4px 5px 0px rgba(131, 152, 144, 0.35);
            opacity:0.9;  //透明度
            float: left;
            border:solid 2px #1b49b7;
            .vehicles-list{
                text-align: left;
                overflow-y: hidden;
                height: 196px;
                overflow-y: auto;            
                .vehicles-info-title{
                    width: 360px;
                    margin: 10px 0px 10px 10px; 
                    font-size:18px;
                    font-weight: bold;  
                }    
                .vehicles-line-item{
                    width:360px;
                    border:solid 2px #1b49b7;                   
                    .vehicles-line{
                        margin: 8px 0px 0px 10px;
                        line-height: 20px;
                        float: left;
                          
                        .vehicles-left{
                            width: 194px;
                            float: left;
                            lable{
                                font-size:16px;
                            }
                            span{
                                font-size:18px;
                                font-weight: bold;
                            }
                        }
                        .vehicles-right{
                            width: 154px;
                            float: left;
                            lable{
                                font-size:16px;
                            }
                            span{
                                font-size:18px;
                                font-weight: bold;
                            }
                        }
                    }
                }                       
            }
        }
    }
</style>