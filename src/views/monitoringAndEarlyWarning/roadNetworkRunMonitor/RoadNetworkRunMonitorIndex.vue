<template>
    <div class="road-network-index-container">
            <div class="left panel">
                <panel>
                    <PanelItem title="车流量统计">
                        <div class="testechar" v-calcEleSize >
                            <v-chart :options="polar"/>
                        </div>
                        <div>1</div>
                    </PanelItem>
                    <PanelItem title="车流量占比">
                        <div class="content">路网运行监测</div>
                    </PanelItem>
                    <PanelItem title="平均速度">
                        <div class="content">路网运行监测</div>
                    </PanelItem>
                </panel>          
            </div>
            <div class="mid">
                <div class="float-map-menu">
                    <MapFloatMenu></MapFloatMenu>
                </div>
                <Amap @getMapInstance="getMapInstance"  />
                <VerticesBorderStyle/>
            </div>
            <div class="right panel">
                <panel>
                    <PanelItem  title="拥堵路段TOP10">
                        <div class="content">
                            <ydld />
                        </div>
                    </PanelItem>
                    <PanelItem title="交通事故事件统计">
                        <div class="content">22222222222222</div>
                    </PanelItem>
                    <PanelItem title="预警预测统计">
                        <div class="content">33333333333</div>
                    </PanelItem>
                </panel>
            </div>
    </div>
</template>

<script>

import ydld from "@/components/index/ydld.vue";
    export default {
        name: '',
        components: {
            ydld
        },
        methods: {
            getMapInstance(map){
                console.log(map);
                map.setZoom(16)
            }
        },
        data() {
            let data = []
            for (let i = 0; i <= 360; i++) {
                let t = i / 180 * Math.PI
                let r = Math.sin(2 * t) * Math.cos(2 * t)
                data.push([r, i])
            }
            return {
                



      polar: {
        title: {
        //   text: '极坐标双数值轴'
        },
        // legend: {
        // //   data: ['line']
        // },
        polar: {
          center: ['50%', '50%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }





            }
        }
    }
</script>

<style lang="scss" scoped>
    .road-network-index-container{
        width: 100%;
        height: 100%;
        display: flex;
        .panel{
            flex: 410;
            display: flex;
            flex-direction: column;
            // margin-top: 10px;
            padding-top: 10px;
        }
        .left{
            flex: 410;
        }
        .mid{
            flex: 1011;
            margin: 10px 10px 0  0;
            position: relative;
            border: 1px solid rgba(32, 86, 221, 0.4);
            .float-map-menu{
                z-index: 99999;
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }  
        .content{
            height: 256px;
            color: aliceblue;
        }
        .right{
            flex: 410;
        } 
    }
    // .testechar{
    //     width: 100%;
    //     height: 100%;
    // }
    .echarts{
        min-height: 161px;
        width: 100%;
        height: 100%;
    }
</style>