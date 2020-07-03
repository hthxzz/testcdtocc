<template>
    <div class="bcyxbc-wrap">
        <!-- 包车运行班次 -->
        <panelTitle title="包车运行班次" :displaySwitch=false ></panelTitle>
        <SelectTag :content="list"></SelectTag>
        <div class="bcyxbc-content-wrap">
            <div class="left item">
                <div class="aa top">
                    <p>全市包车运行次数</p>
                    <span>123456</span><sub>次</sub>
                </div>
                <div class="aa bot">
                    <p>省级(环比)</p>
                    <span>1123456</span><sub>次</sub>
                </div>
            </div>
            <div class="mid item">
                <v-chart :options="option" :autoresize="true" theme="theme" ></v-chart>
            </div>
            <div class="right item">
                <div class="aa top">
                    <p>市级(环比)</p>
                    <span>123456</span><sub>次</sub>
                </div>
                <div class="aa bot">
                    <p>县级(环比)</p>
                    <span>123456</span><sub>次</sub>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        mounted () {
            this.getPassengerFlow();
        },
        methods: {
                 // 各个时间段单车使用情况
            getPassengerFlow() {
                this.$http
                    .$get("/gxdc_bikeIntegratedMonitoringHandler/getWebBikeUseInfoByHour")
                    .then(data => {
                        // let xAxisData = [],
                        // seriesData = [],
                        // legendData = [],
                        // ydata = [];
                        // for (const item of data.list) {
                        //     xAxisData.push(item.hour.split("-")[0].split(':')[0]);
                        //     ydata.push(item.bikeNum);
                        // }
                        // seriesData.push(ydata);
                        let option =  this.$utils.echart.getPieOption({
                            // legendData:legendData,
                            seriesData:[
                                [
                                    {
                                        name:"全市环比",
                                        value:10000,
                                    },
                                    {
                                        name:"其它环比",
                                        value:600,
                                    },
                                ]
                            ],
                        }
                        );
                        this.option = option;
                    });
            },  
        },
        data() {
            return {
                option:{},
                list:[
                    {
                        uid:"1",
                        tag:"总体"
                    },
                    {
                        uid:"2",
                        tag:"包车"
                    },
                    {
                        uid:"3",
                        tag:"含停班班线车"
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bcyxbc-wrap{
        height: 100%;
        color: #fff;
        .bcyxbc-content-wrap{
            height: calc(100% - 60px);
            display: flex;
            .item{
                flex: 1;
                height: 100%;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                .aa{
                    flex: 1;
                    background:rgba(32,86,221,.15);
                    // opacity:0.15;
                    border-radius:8px;
                    p{
                        color: #fff;
                        font-size: 14px;
                        padding-top: 16px;
                    }
                    span{
                        color: rgba(0, 255, 255, 1);
                        padding-top: 10px;
                        display: inline-block;
                        &:nth-of-type(1){
                            font-size: 24px;
                        }
                        &:nth-of-type(2){
                            font-size: 14px;
                        }
                        
                    }
                    sub{
                            margin-left: 10px;
                    }
                }
                .top{
                    flex: 1;
                    margin: 30px 10px;
                }
                .bot{
                    flex: 1;

                    margin: 0 10px 30px 10px;
                }
            }
        }
    }
    
</style>