<template>
    <div class="container">
        <div class="trafficFlow"></div>
    </div>
</template>

<script>
import echarts  from 'echarts';
// import  '../../untils/color-theme.js';
// import 'echarts/theme/shine';
    export default {
        name: '',
        data() {
            return {
                
            }
        },
        mounted () {
            var myChart = echarts.init(document.querySelector(".trafficFlow"));
            var option = {

                xAxis: {
                    type: 'category',
                    data: ["绕城内","绕城外","三环内", "三环外", "进城","出城"],
                    nameGap :'1',
                    axisLabel:{
                        color:'#fff',
                        fontSize:'12'
                    },
                    splitLine:{
                        show:false
                    }
                },
                // legend:{
                //     data:["当前","历史"],
                //     right:'right',
                //     top:'top',
                //     padding:0,
                //     width:200,
                //     // textStyle:{
                //     //     fontSize:'10%'
                //     // }
                // },
                yAxis: {
                    type: 'value',
                    axisLabel:{
                        color:'#fff'
                    },
                    splitLine:{
                        show:false
                    }
                },
                grid:{
                    left:'11%',
                    right:'6%',
                    bottom:'16%',
                    top:'6%'
                },
                series: [{
                    data: [120, 130, 123, 80, 70, 89],
                    type: 'bar',
                    barWidth:'16%',
                    name:'当前',
                    itemStyle:{
                        color:"#2056DD"
                    }
                },
                {
                    data: [91, 126, 106, 96, 73, 110],
                    type: 'bar',
                    barWidth:'16%',
                     name:'历史',
                    itemStyle:{
                        color:"#FFFF00"
                    }
                },
            
                
                
                ]
            };


             myChart.setOption(option);
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        .trafficFlow{
            width: 100%;
            height: 100%;
        }
    }
</style>