<template>
    <div class="jmcxfs">
        <div class="left">
            <div class="gj">
                <way2Travel name="公交" picUrl="bus" personNo="123456"></way2Travel>
            </div>
            <div class="dt">
                <way2Travel name="地铁" picUrl="subway" personNo="654321"></way2Travel>
            </div>
        </div>
        <div class="right">
            <div class="cz">
                <way2Travel name="出租"  picUrl="taxi" personNo="666321"></way2Travel>
            </div>
            <div class="dc">
                <way2Travel name="单车"  picUrl="bicycle" personNo="656321"></way2Travel>
            </div>
        </div>
    </div>
</template>

<script>
import way2Travel from "./way2Travel.vue";
    export default {
        name: '',
        components: {
            way2Travel
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .jmcxfs{
        width: 100%;
        height: 100%;
        display: flex;
        .left{
            margin: 0 20px;
            .gj{
                margin-top: 26px;
            }
        }
        .right{
            .cz{
                margin-top: 26px;
            }
        }
        > div{
            flex: 1;
            display: flex;
            flex-direction: column;
            > div{
                flex: 1;
            }
        }
    }
</style>