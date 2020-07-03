<template>
    <!-- 安全事故 -->
    <div class="SafetyAccidents-wrapper">
        <section class="panel-wrap">
            <div class="char">
                <v-chart :options="option"/>
            </div>
            
            <h2>公共汽电车
                <div>责任事故死亡率</div>
            </h2>
        </section>
        <section class="panel-wrap">
            <div class="char">
                <v-chart :options="option"/>
            </div>
            
            <h2>
                轨道交通
                <div>责任事故死亡率</div>
            </h2>

        </section>
    </div>
</template>

<script>
    import { option1 } from "./options";
    export default {
        name: '',
        data() {
            return {
                option: option1
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
    .SafetyAccidents-wrapper{
        height: 100%;
        width: 100%;
        display: flex;
        section{
            flex: 1;
            position: relative;
            h2{
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 96%;
                font-size: 16px;
                text-align: center;
            }
            .char{
                width: 100%;
                height: 100%;
            }
            &:last-child{
                margin-left: 10px;
            }
        }
    }
</style>