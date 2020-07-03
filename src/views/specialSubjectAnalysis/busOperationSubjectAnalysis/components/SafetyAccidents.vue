<template>
    <!-- 安全事故 -->
    <div class="SafetyAccidents-wrapper">
        <section class="panel-wrap">
            <div class="char">
                <v-chart :options="option"/>
                <h2>公共汽电车
                    <div>责任事故死亡率</div>
                </h2>
            </div>

        </section>
        <section class="panel-wrap">
            <div class="char">
                <v-chart :options="option2"/>
                <h2>
                    轨道交通
                    <div>责任事故死亡率</div>
                </h2>
            </div>


        </section>
    </div>
</template>

<script>
    import createOption from "./options";

    export default {
        name: '',
        mixins: [createOption],
        props:{qcswl:{default:0},gdswl:{default:0},coefficient:{default:100}},
        mounted() {
          this.option=this.createPieOption2(this.qcswl,this.qcswl/this.coefficient,'#EE4D60','#2056DD','人/百万车公里');
          this.option2=this.createPieOption2(this.gdswl,this.gdswl/this.coefficient,'#FA5D2D','#2056DD','人/百万车公里');
        },
        data() {
            return {
                option: {},
                option2:{},
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
                top: 200px;
                left: 50%;
                transform: translateX(-50%);
                width: 96%;
                font-size: 14px;
                text-align: center;
                div{
                    margin-top: 6px;
                }
            }
            .char{
                width: 215px;
                height:270px;
                background: url("../img/gj_aqsg_bg.png")  no-repeat;
            @media only screen and (max-width: 1366px){
                background-size: 70%;
            }
                background-position: center;
            }
            &:last-child{
                margin-left: 10px;
            }
        }
    }
</style>