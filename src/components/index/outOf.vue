<template>
    <div class="cntainer">
        <div class="wrap">
            <div class="item">
                <div class="bar"><span></span><span></span></div>
                <div class="content"><span>河北</span><span>3231</span></div>
            </div>
            <div class="item">
                <div class="bar"><span></span><span></span></div>
                <div class="content"><span>山西</span><span>2231</span></div>
            </div>
            <div class="item">
                <div class="bar"><span></span><span></span></div>
                <div class="content"><span>河南</span><span>1231</span></div>
            </div>
            <!-- <div class="item">
                <div class="bar"><span></span><span></span></div>
                <div class="content"><span>辽宁</span><span>831</span></div>
            </div> -->
            <!-- <div class="item">
                <div class="bar"><span></span><span></span></div>
                <div><span>河北</span><span>3231</span></div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cntainer{
        width: 100%;
        height: 100%;
        .wrap{
            display: flex;
            flex-direction: column;
            position: relative;
            height: 100%;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
            // line-height:30px;
            .item{
                flex: 1;
                .bar{
                    position: relative;
                    span:nth-child(1){
                        width:140px;
                        height:8px;
                        display: inline-block;
                        position: relative;
                        background:rgba(32,86,221,1);
                        // opacity:0.4;
                    }
                    span:nth-child(2){
                        width:66px;
                        height:8px;
                        left: 32px;
                        top: 10px;
                        display: inline-block;
                        position: absolute;
                        background:linear-gradient(-90deg,rgba(107,223,232,1),rgba(32,86,221,1));
                    }
                
                }
                .content{
                    display: flex;
                    justify-content: space-around;
                }
            }
        }
    }
</style>