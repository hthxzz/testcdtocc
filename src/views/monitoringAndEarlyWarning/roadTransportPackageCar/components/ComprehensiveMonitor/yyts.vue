<template>
    <div class="yyts-wrapper">
        <img :src="srcbg" alt="" srcset="" class="srcbg" >
        <img :src="gj_gjts_tssl" alt="" srcset="" class="gj_gjts_tssl" >
        <img :src="gj_gjts_clwj" alt="" srcset="" class="gj_gjts_clwj" >
        <div class="item item1">
            <h2 class="content" >投诉数量</h2>
            <p class="content" >{{tssl}} <span>起</span> </p>
            <h2 class="content" >较上月同期</h2>
            <p class="content">{{tsslbl}} <span>⬇</span> </p>
        </div>
        <div class="item item2">
            <h2 class="content" >处理完结</h2>
            <p class="content" >{{clwj}} <span>起</span> </p>
            <h2 class="content" >处理完成</h2>
            <p class="content">{{clwjbl}} </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        mounted () {
            this.$http.$get('kyjc_basicStatisticHandler/getComplaintsStats').then((data)=>{
                this.tssl = data.complaintCount;
                this.tsslbl = data.ingCount;
                this.clwj = data.endCount;
                this.clwjbl = data.endRate;
            })
        },
        data() {
            return {
                tssl:0,
                tsslbl:0,
                clwj:0,
                clwjbl:0,
                srcbg: require('../../../roadTransportOperation/img/double_list_bg.png'),
                gj_gjts_clwj: require('../../../roadTransportOperation/img/gj_gjts_clwj.png'),
                gj_gjts_tssl: require('../../../roadTransportOperation/img/gj_gjts_tssl.png'),
            }
        }
    }
</script>

<style lang="scss" scoped>
    .yyts-wrapper{
        position: relative;
        // text-align: center;
        justify-items: center;
        align-items: center;
        justify-content: center;
        display: flex;
        height: calc(100% - 45px);
        .srcbg{
            width: 450px;
            height: 130px;
        }
        .gj_gjts_tssl{
            position: absolute;
            left: 80px;
            height: 60px;
            width: 60px;
        }
        .gj_gjts_clwj{
            position: absolute;
            right: 80px;
            height: 60px;
            width: 60px;
        }
        .item1{
            right: 66px;
        }
        .item2{
            left: 66px;
        }
        .item{
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
            .content:nth-child(1){
                font-size: 14px;
                font-weight: bold;
            }
            .content:nth-child(2){
                font-size: 26px;
                margin: 6px 0 16px 0;
                color: rgba(255, 255, 0, 1);
                span{
                    font-size: 14px;
                }
            }
            .content:nth-child(3){
                font-size: 14px;
            }
            .content:nth-child(4){
                font-size: 16px;
                margin-top: 6px;
                color: rgba(0, 176, 80, 1);
            }
        }
    }
</style>