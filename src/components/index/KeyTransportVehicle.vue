<template>
  <div class="container">
    <div class="left item">
      <div class="keyVehicle"></div>
    </div>
    <div class="right item">
      <div class="wrap" :key="res.number" v-for="res in KeyTransportVehicleInfo">
        <div class="content">
          <span class="aaa" :style="{backgroundColor:res.color}"></span>
          <span class="aaa">{{ res.number }}</span>
          <span class="aaa">辆</span>
        </div>
        <h2>{{ res.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      KeyTransportVehicleInfo: [
        { color: "rgba(32, 86, 221, 1)", name: "班线客运车辆", number: "1023" },
        { color: "rgba(255, 255, 0, 1)", name: "旅游包车", number: "4531" },
        {
          color: "rgba(0, 176, 80, 1)",
          name: "危险品货运车辆",
          number: "6435"
        },
        {
          color: "rgba(114, 246, 250, 1)",
          name: "12吨以上重型货运车辆",
          number: "2356"
        }
      ]
    };
  },
  mounted() {
    var myChart1 = echarts.init(document.querySelector(".keyVehicle"));
    var color = [
      "#fb734e",
      "#e32f46",
      "#94d96c",
      "#0bbcb7",
      "#1a9bfc",
      "#7049f0"
    ];
    var dataStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        shadowBlur: 40,
        borderWidth: 10,
        shadowColor: "rgba(0, 0, 0, 0)" //边框阴影
      }
    };
    var placeHolderStyle = {
      normal: {
        color: "#393d50",
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: "#393d50"
      }
    };
    var option = {
      // backgroundColor: '#142058',
      // title: {
      //     text: '匹配度',
      //     x: 'center',
      //     y: 'center',
      //     textStyle: {
      //         fontWeight: 'normal',
      //         fontSize: 24,
      //         color: "#fff",
      //     }
      // },
      tooltip: {
        trigger: "item",
        show: true,
        formatter: "{b} : <br/>{d}%",
        // backgroundColor: 'rgba(0,0,0,0.7)', // 背景
        padding: [8, 10], //内边距
        extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);" //添加阴影
      },
      // legend: {
      //     orient: 'vertical',
      //     // icon: 'circle',
      //     left: 'left',
      //     top: '20',
      //     itemGap:20,
      //     data: ['二级匹配度', '三级匹配度', '四级匹配度', '04', '05', '06'],
      //     textStyle: {
      //         color: '#fft'
      //     }
      // },
      series: [
        {
          name: "Line 1",
          type: "pie",
          radius: ["75%", "85%"],
          center: ["50%", "50%"],
          itemStyle: dataStyle,
          hoverAnimation: false,
          startAngle: 90,
          clockWise: true,
          label: {
            borderRadius: "10"
          },
          data: [
            {
              value: 54.6,
              name: "四级匹配度",
              itemStyle: {
                normal: {
                  // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  //     offset: 0,
                  //     color:color[0]
                  // }, {
                  //     offset: 1,
                  //     color: color[1]
                  // }])
                  color: "rgba(32, 86, 221, 1)"
                }
              }
            },
            {
              value: 45.4,
              name: "",
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }
          ]
        },
        {
          name: "Line 2",
          type: "pie",
          radius: ["60%", "70%"],
          center: ["50%", "50%"],
          itemStyle: dataStyle,
          clockWise: true,
          hoverAnimation: false,
          startAngle: 90,
          data: [
            {
              value: 56.7,
              name: "三级匹配度",
              itemStyle: {
                normal: {
                  color: "rgba(255, 255, 0, 1)"
                }
              }
            },
            {
              value: 43.3,
              name: "",
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }
          ]
        },
        {
          name: "Line 3",
          type: "pie",
          radius: ["45%", "55%"],
          center: ["50%", "50%"],
          itemStyle: dataStyle,
          hoverAnimation: false,
          startAngle: 90,
          data: [
            {
              value: 30,
              name: "二级匹配度",
              itemStyle: {
                normal: {
                  color: "rgba(0, 176, 80, 1)"
                }
              }
            },
            {
              value: 10,
              name: "",
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }
          ]
        },
        {
          name: "Line 4",
          type: "pie",
          radius: ["30%", "40%"],
          center: ["50%", "50%"],
          itemStyle: dataStyle,
          hoverAnimation: false,
          startAngle: 90,
          data: [
            {
              value: 30,
              name: "二级匹配度",
              itemStyle: {
                normal: {
                  color: "rgba(114, 246, 250, 1)"
                }
              }
            },
            {
              value: 26,
              name: "",
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }
          ]
        }
      ]
    };
    myChart1.setOption(option);
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  text-align: left;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 86, 221, 1);
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    .keyVehicle {
      width: 100%;
      height: 100%;
    }
    .wrap {
      flex: 1;
      .content {
        color: rgba(255, 255, 255, 1);
        span:nth-child(1) {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        span:nth-child(2) {
          margin-left: 12px;
          font-size: 16px;
          display: inline-block;
          height: 18px;
        }
        span:nth-child(3) {
          margin-left: 30px;
        }
      }
      h2 {
        font-size: 14px;
        margin-left: 20px;
      }
    }
  }
}
</style>