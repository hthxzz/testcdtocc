<template>
    <div class="qyts-wrapper">
        <img :src="src1" alt="" srcset="">
        <div class="item item1">
            <p>{{xkzdqkyz}}</p>
            <h2>经营许可证到期客运站</h2>
        </div>
        <div class="item item2">
            <p>{{expireEnterpriseNum}}</p>
            <h2>已到期车辆企业</h2>
        </div>
        <div class="item item3">
            <p>{{onexkzdqkyz}}</p>
            <h2>1个月内经营许可证到期客运站</h2>
        </div>
        <div class="item item4">
            <p>{{expireEnterpriseMonthNum}}</p>
            <h2>1个月内到期车辆企业</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        mounted () {
            this.$http.$get('kyjc_basicStatisticHandler/getEnterpriseExpireInfo').then((data)=>{
                this.expireEnterpriseMonthNum = data.expireEnterpriseMonthNum;  // 一个月内到期企业
                this.expireEnterpriseNum = data.expireEnterpriseNum;  // 已到期企业
            })
        },
        data() {
            return {
                xkzdqkyz:"--", // 经营许可证到期客运站
                onexkzdqkyz:"--", // 1个月内经营许可证到期客运站
                expireEnterpriseMonthNum:"--",
                expireEnterpriseNum:"--",
                src1:require('../../../roadTransportOperation/img/dlys_jyqydq_bg.png')
            }
        }
    }
</script>

<style lang="scss" scoped>
    
    .qyts-wrapper{
        width: 100%;
        height: 100%;
        position: relative;
        img{
            width: 496px;
            height: 231px;
            position: relative;
        }
        .item{
            position: absolute;
            text-align: center;
            height: 200px;
            width: 200px;
            p{
                font-size: 26px;
                font-weight: bolder;
            }
            h2{
                margin-top: 10px;
                font-size: 14px;
            }
        }
        .item1{
            top: 36px;
            left: 130px;
        }
        .item2{
            top: 36px;
            left: 300px;
        }
        .item3{
            top: 126px;
            left: 1px;
        }
        .item4{
            top: 136px;
            left: 210px;
        }
    }
</style>