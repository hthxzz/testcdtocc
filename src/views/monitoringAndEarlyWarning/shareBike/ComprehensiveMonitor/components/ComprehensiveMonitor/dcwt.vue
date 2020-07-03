<template>
    <div class="qyts-wrapper">
        <img :src="src1" alt="" srcset="">
        <div class="item item2">
            <h2>{{ exceptionMb }}</h2>
            <span>摩拜</span>
        </div>
        <div class="item item3">
            <h2>{{ exceptionQj }}</h2>
            <span>青桔</span>
        </div>
        <div class="item item4">
            <h2>{{ exceptionHl }}</h2>
            <span>哈啰</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                src1:require('../../img/mxjt_dcwt.png')
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
            width: 351px;
            height: 138px;
            position: relative;
        }
        .item{
            position: absolute;
            text-align: center;
            height: 80px;
            width: 80px;
            p{
                font-size: 26px;
                font-weight: bolder;
            }
            h2{
                margin-top: 10px;
                font-size: 14px;
            }
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