<template>
    <div class="cntainer">
        <div class="trafficIncident"></div>
    </div>
</template>

<script>
import echarts  from 'echarts';
    export default {
        name: '',
        data() {
            return {
                
            }
        },
        mounted () {
            var myChart = echarts.init(document.querySelector(".trafficIncident"));
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },

                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'信号灯故障',itemStyle:{color:'#72F6FA'}},
                            {value:310, name:'交通管制',itemStyle:{color:'#00B050'}},
                            {value:234, name:'道路施工',itemStyle:{color:'#FFFF00'}},
                            {value:135, name:'交通事故',itemStyle:{color:'#2056DD'}},
                            {value:1548, name:'其它',itemStyle:{color:'#CC91E2'}}
                        ]
                    }
                ]
            };



             myChart.setOption(option);
        }
    }
</script>

<style lang="scss" scoped>
    .cntainer{
        width: 100%;
        height: 100%;
        .trafficIncident{
            width: 100%;
            height: 100%;
        }
    }
</style>