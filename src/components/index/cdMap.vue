<template>
    <div class="container">
        <div class="cdmap">
            aaaaa
        </div>
    </div>
</template>

<script>
import echarts  from 'echarts';
import {cddata}  from "../../test/china.js";
    export default {
        name: '',
        data() {
            return {
                
            }
        },
        mounted () {
            console.log(data);
             
            var myChart1 = echarts.init(document.querySelector(".cdmap"));
            echarts.registerMap("cd",cddata)
            // 11111111111111111111111111111

var chinaGeoCoordMap = {
		'武侯区': [104.059702,30.633487],
		'锦江区': [104.156862,30.578036],
		"成华区": [104.171523,30.682695],
		'金牛区': [104.058264,30.697105],
		"青羊区": [104.030668,30.676235],
		"双流区": [103.968578,30.573061],
		"郫县": [103.955642,30.739576],
		"龙泉驿": [104.262072,30.568334]
	
	};
	


var geoCoordMap = {
        '成都':[104.06,	30.67],
        '锦江区':[104.08 ,30.67],
        '青羊区':[104.05,30.68],
        '金牛区':[104.05 ,30.70],
        '武侯区':[104.05 ,30.65],
        '成华区':[104.10 ,30.67],
        '龙泉驿区':[104.27 ,30.57],
        '青白江区':[104.23 ,30.88],
        '新都区':[104.15 ,30.83],
        '温江区':[103.83 ,30.70],
        '金堂县':[104.43 ,30.85],
        '双流县':[103.92 ,30.58],
        '郫县':[103.88 ,30.82],
        '大邑县':[103.52 ,30.58],
        '蒲江县':[103.50 ,30.20],
        '新津县':[103.82 ,30.42],
        '都江堰市':[103.62 ,31.00],
        '彭州市':[103.93 ,30.98],
        '邛崃市':[103.47 ,30.42],
        '崇州市':[103.67 ,30.63],
    };
    var data = [
        {name:'成都',value:190},
        {name:'锦江区',value:190},
        {name:'青羊区',value:190},
        {name:'金牛区',value:190},
        {name:'武侯区',value:190},
        {name:'成华区',value:90},
        {name:'龙泉驿区',value:120},
        {name:'青白江区',value:120},
        {name:'新都区',value:120},
        {name:'温江区',value:120},
        {name:'金堂县',value:190},
        {name:'双流县',value:190},
        {name:'郫县',value:190},
        {name:'大邑县',value:190},
        {name:'蒲江县',value:190},
        {name:'新津县',value:190},
        {name:'都江堰市',value:90},
        {name:'彭州市',value:190},
        {name:'邛崃市',value:190},
        {name:'崇州市',value:90},
    ];
    var max = 480, min = 9; // todo 
    var maxSize4Pin = 100, minSize4Pin = 20;

  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};


var     option = {
        backgroundColor: '#091c3d',
        title: {
            top:20,
            text: '',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#ccc'
            }
        },    

        tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if(typeof(params.value)[2] == "undefined"){
              	return params.name + ' : ' + params.value;
              }else{
              	return params.name + ' : ' + params.value[2];
              }
            }
        },
        legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['pm2.5'],
        textStyle: {
            color: '#fff'
        }
        }, 
        geo: {
            show: true,
            map: 'cd',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#3fdaff',
                    borderWidth: 2,
                    shadowColor: 'rgba(63, 218, 255, 0.5)',
                    shadowBlur: 30
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series : [

         {
            type: 'map',
            map: 'cd',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#FFFFFF',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            })),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },

         
    ]}











             myChart1.setOption(option);
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        width:100%;
        height:100%;
        .cdmap{
            width:100%;
            height:100%;
        }
    }
</style>