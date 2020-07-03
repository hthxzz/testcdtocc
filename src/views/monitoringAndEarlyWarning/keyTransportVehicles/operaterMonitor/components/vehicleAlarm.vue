<!--车辆报警信息 -->
<template>
    <div class="vehicles-alarm-container">
        <div class="vehicles-alarm-wrap">  
            <div class="vehicles-list">
                <div class="vehicles-info-title">车辆报警</div>
                <div class="vehicles-line-item" v-for="item in alarmVehicleList" :key="item.uid" >
                    <span>{{item.id}}、{{item.cph}}进入区域报警</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VehiclesAlarm',
        props:{
            show : {
                default : false,
                type : Boolean
            }
        },
        data() {
            return {
                alarmVehicleList : [{
                        id:1,
                        cph:'川A12345'
                    },{
                        id:2,
                        cph:'川A12345'
                    // },
                    // {
                    //     id:3,
                    //     cph:'川A12345'
                    // },{
                    //     id:4,
                    //     cph:'川A12345'
                    // },{
                    //     id:5,
                    //     cph:'川A12345'
                    // },
                    // {
                    //     id:6,
                    //     cph:'川A12345'
                    }              
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vehicles-alarm-container{
        .vehicles-alarm-wrap{
            width:140px;
            height:140px;
            box-shadow:0px 4px 5px 0px rgba(131, 152, 144, 0.35);
            opacity:0.9;  //透明度
            float: left;
            border:solid 2px #1b49b7;
            .vehicles-list{
                text-align: left;
                overflow-y: hidden;
                height: 136px;
                overflow-y: auto;            
                .vehicles-info-title{
                    width: 130px;
                    margin: 10px 0px 10px 10px; 
                    font-size:18px;
                    font-weight: bold;  
                }    
                .vehicles-line-item{
                    width:130px;
                    margin: 5px 0px 0px 5px;           
                    .vehicles-line{
                        float: left;
                    }
                    span{
                        font-size: 16px;
                        color: #ff0;
                    }
                }                       
            }
        }
    }
</style>