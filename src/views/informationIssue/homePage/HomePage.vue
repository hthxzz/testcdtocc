<template>
  <!-- 综合指标 -->
  <div class="CompositeIndicator-wrapper">
    <div class="left-panel">
      <div class="top">
        <panelTitle title="发布概况" :displaySwitch="false"></panelTitle>
        <div class="hbgk">
          <div class="first part">
            <div class="item">
              <h2>待发布信息</h2>
              <p>{{comeNum}}</p>
              <span>详情</span>
            </div>
            <div class="item">
              <h2>已发布信息</h2>
              <p>{{comeDelayNum}}</p>
              <span>新增</span>
            </div>
            <div class="item">
              <h2>已存在模板</h2>
              <p>{{comeCancelNum}}</p>
              <span>新增</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mid">
        <panelTitle title="发布的信息" :displaySwitch="false"></panelTitle>
        <!-- <PanelItem title="关注路段实时断面交通流量" :displaySwitch="false"> -->
        <PanelItem>
          <div class="content" v-calcEleSize>
            <realTimeInformationIssue></realTimeInformationIssue>
          </div>
        </PanelItem>
      </div>
    </div>
    <div class="mid-panel">
      <div class="panel-wrap">
        <panelTitle title="按行业统计信息发布量" :displaySwitch="false"></panelTitle>
        <div class="gjjc_warpper">
          <img :src="jcxxbg" alt srcset class="jcxxbg" />
          <div class="item item1">
            <div class="imgClass">
              <img :src="jcxxpng" alt srcset class="imgclass" />
              <img :src="gjxlbg" alt srcset class="imgclass" />
            </div>
            <div class="textClass">
              <h2 class="content">公交线路</h2>
              <p class="content">
                {{gjxl}}
                <span>条</span>
              </p>
              <h2 class="content">较上月同期</h2>
              <p class="content up" v-if="gjxlbl>=0">
                {{gjxlbl}}%
                <span>⬆</span>
              </p>
              <p class="content down" v-else>
                {{gjxlbl}}%
                <span>⬇</span>
              </p>
            </div>
          </div>
          <div class="item item2">
            <div class="imgClass">
              <img :src="jcxxpng" alt srcset class="imgclass" />
              <img :src="czslbg" alt srcset class="imgclass" />
            </div>
            <div class="textClass">
              <h2 class="content">场站数量</h2>
              <p class="content">
                {{czsl}}
                <span>个</span>
              </p>
              <h2 class="content">较上月同期</h2>
              <p class="content up" v-if="czslbl>=0">
                {{czslbl}}%
                <span>⬆</span>
              </p>
              <p class="content down" v-else>
                {{czslbl}}%
                <span>⬇</span>
              </p>
            </div>
          </div>
          <div class="item item3">
            <div class="imgClass">
              <img :src="jcxxpng" alt srcset class="imgclass" />
              <img :src="zdslbg" alt srcset class="imgclass" />
            </div>
            <div class="textClass">
              <h2 class="content">站点数量</h2>
              <p class="content">
                {{zdsl}}
                <span>个</span>
              </p>
              <h2 class="content">较上月同期</h2>
              <p class="content up" v-if="zdslbl>=0">
                {{zdslbl}}%
                <span>⬆</span>
              </p>
              <p class="content down" v-else>
                {{zdslbl}}%
                <span>⬇</span>
              </p>
            </div>
          </div>
          <div class="item item4">
            <div class="imgClass">
              <img :src="jcxxpng" alt srcset class="imgclass" />
              <img :src="cyrybg" alt srcset class="imgclass" />
            </div>
            <div class="textClass">
              <h2 class="content">从业人员</h2>
              <p class="content">
                {{cyry}}
                <span>人</span>
              </p>
              <h2 class="content">较上月同期</h2>
              <p class="content up" v-if="cyrybl>=0">
                {{cyrybl}}%
                <span>⬆</span>
              </p>
              <p class="content down" v-else>
                {{cyrybl}}%
                <span>⬇</span>
              </p>
            </div>
          </div>
          <div class="item item5">
            <div class="imgClass">
              <img :src="jcxxpng" alt srcset class="imgclass" />
              <img :src="jsrybg" alt srcset class="imgclass" />
            </div>
            <div class="textClass">
              <h2 class="content">驾驶人员</h2>
              <p class="content">
                {{jsry}}
                <span>人</span>
              </p>
              <h2 class="content">较上月同期</h2>
              <p class="content up" v-if="jsrybl>=0">
                {{jsrybl}}%
                <span>⬆</span>
              </p>
              <p class="content down" v-else>
                {{jsrybl}}%
                <span>⬇</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="top">
        <panelTitle title="发布时间" :displaySwitch="false"></panelTitle>
        <div class="zbjt">
          <div class="item-wrapper">
            <!-- <div class="item first">
                            <p>16</p>
                            <h2>地铁线路</h2>
                        </div>
                        <div class="item second">
                            <p>61</p>
                            <h2>机场大巴</h2>
                        </div>
                        <div class="item three">
                            <p>1</p>
                            <h2>公交线路</h2>
                        </div>
                        <div class="item four">
                            <p>1</p>
                            <h2>客运线路</h2>
            </div>-->
          </div>
        </div>
      </div>
      <div class="mid">
        <panelTitle title="发布渠道统计" :displaySwitch="false"></panelTitle>
        <div style="width:100%;height:100%;">
          <!-- <div style="height:50%;"> -->
          <div style="height:100%;">
            <v-chart :options="publishChannel" theme="theme" />
          </div>
          <!-- <div class="trafficList">
                        <yytsCommon :tssl="tssl" :tsslbl="tsslbl" :clwj="clwj" :clwjbl="clwjbl"></yytsCommon>
          </div>-->
        </div>
      </div>
      <div class="bottom">
        <panelTitle title="发布日志统计" :displaySwitch="false"></panelTitle>
        <div
          style="width:100%;height:100%;display: flex;align-items: center;
                            justify-content: center;"
        >
          <div class="item">
            <p>{{logNumber}}</p>
            <span>日志记录</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="date-float" :style="{visibility:visibility}" > -->
    <div class="date-float" style="visibility:visible;">
      <el-date-picker
        v-model="datevalue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
import realTimeInformationIssue from "./components/realTimeInformationIssue.vue";
import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";
// import {option2, option3} from "../roadTransportOperation/components/options";
export default {
  name: "",
  components: {
    realTimeInformationIssue
  },
  mounted() {
    setTimeout(() => {
      // 防止时间组件闪烁
      this.visibility = "visible";
    }, 1000);
    // this.$http.$get("kyjc_flightStatistic/getFlightStatistic").then((param) => {
    //     // this.dealWithData(param);
    // });
  },
  created() {
    // this.creatRingOption(this.travelData);
    this.createPublishChannel();
  },
  methods: {
    createPublishChannel() {
      var data = [
        {
          name: "APP",
          value: 10
        },
        {
          name: "短信",
          value: 10
        },
        {
          name: "网站",
          value: 10
        },
        {
          name: "其他",
          value: 10
        }
      ];
      var option = {
        color: [
          "#A0CE3A",
          "#31C5C0",
          "#1E9BD1",
          "#0F347B",
          "#585247",
          "#7F6AAD",
          "#009D85",
          "rgba(250,250,250,0.3)"
        ],
        //  backgroundColor: '#000',
        title: {
          //  text: '总数',
          subtext: 7789,
          textStyle: {
            color: "#f2f2f2",
            fontSize: 24
            // align: 'center'
          },
          subtextStyle: {
            fontSize: 20,
            color: ["#ff9d19"]
          },
          x: "center",
          //  y: 'center',
          y: "28%" //设置附标题显示的位置
        },
        grid: {
          bottom: 150,
          left: 100,
          right: "10%"
        },
        legend: [
          {
            //  orient: 'vertical',
            //  top: "middle",
            //  right: "5%",
            // y: '1%',
            orient: "horizontal",
            left: "center",
            // left: '10%',
            // right: '30%',
            bottom: "bottom",
            itemGap: 60,
            itemWidth: 10,
            itemHeight: 10,
            lineHeight: 56,
            // padding: [0,0,10,0],
            textStyle: {
              color: "#f2f2f2",
              fontSize: 16
            },
            icon: "roundRect",
            data: data
          }
        ],
        series: [
          // 主要展示层的
          {
            //  radius: ['30%', '61%'],
            radius: ["25%", "37%"], // 调整饼状图的大小
            center: ["50%", "35%"], //调整饼状图的位置 第一个元素控制x轴坐标 第二个 y轴
            type: "pie",
            label: {
              normal: {
                show: false,
                formatter: "{c}%",
                textStyle: {
                  fontSize: 16
                },
                position: "outside"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 10,
                length2: 25
              },
              emphasis: {
                show: true
              }
            },
            name: "民警训练总量",
            data: data
          },
          // 边框的设置
          {
            radius: ["25%", "26%"],
            center: ["50%", "35%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: "rgba(250,250,250,0.3)"
                }
              }
            ]
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "35%"],
            radius: ["42%", "42%"],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 9,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    borderColor: "#0b5263"
                  }
                }
              }
            ]
          }
        ]
      };
      this.publishChannel = option;
    },

    creatRingOption: function(data) {
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%"
        },
        legend: {
          show: false,
          // orient: 'vertical',//图例列表布局朝向
          x: "right",
          y: "top",
          data: data[0]
        },

        grid: {
          top: 0,
          /*x: 80,
                        x2: 40,*/
          //top: 60,
          bottom: 0
        },
        series: [
          {
            name: "出行分担率",
            type: "pie",
            center: ["50%", "55%"],
            radius: ["20%", "45%"],
            avoidLabelOverlap: false,
            labelLine: {
              normal: {
                show: true,
                length: 15,
                length2: 60,
                lineStyle: {
                  width: 2
                  // color: '#d3d3d3'
                },
                align: "right"
              },
              // color: "#000",
              emphasis: {
                show: true
              }
            },
            label: {
              normal: {
                //formatter: ' {c}%   ',
                formatter: function(params) {
                  var total = 0; //考生总数量
                  var percent = 0; //考生占比
                  data[1].forEach(function(value, index, array) {
                    total += value.value;
                  });
                  percent = ((params.value / total) * 100).toFixed(1);
                  var str =
                    "{nameStyle|" +
                    params.name +
                    "}" +
                    "{rate|" +
                    percent +
                    "%}";
                  return str;
                },
                padding: [0, -30],
                height: 45,
                // backgroundColor: '#eee',
                // borderColor: '#aaa',
                // borderWidth: 1,
                // borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  nameStyle: {
                    fontSize: 12,
                    color: "#fff",
                    align: "left"
                  },
                  rate: {
                    fontSize: 14,
                    color: "#fff",
                    align: "left"
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            // labelLine: {
            //     normal: {
            //         show: true
            //     }
            // },
            data: data[1]
          },
          {
            //仪表刻度
            name: "",
            center: ["50%", "55%"],
            type: "gauge",
            radius: "59%",
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 12,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 5,
              lineStyle: {
                width: 2,
                color: "rgba(17,26,120,0.8)",
                type: "solid",
                // shadowBlur: 8,
                // shadowColor: '#fff',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 0.9
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0,
                name: ""
              }
            ]
          },
          {
            //仪表小刻度
            name: "",
            center: ["50%", "55%"],
            type: "gauge",
            radius: "59%",
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 60,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 3,
              lineStyle: {
                width: 1,
                color: "rgba(17,26,120,0.5)",
                type: "solid",
                // shadowBlur: 8,
                // shadowColor: '#fff',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 0.9
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0,
                name: ""
              }
            ]
          },
          {
            type: "pie",
            center: ["50%", "55%"],
            radius: ["75%", "90%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: false //显示提示框
            },
            name: "",
            itemStyle: {
              normal: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0.8,
                      color: "rgba(160,247,255,0.23)" // 100% 处的颜色
                    },
                    {
                      offset: 0.95,
                      color: "rgba(0,0,0,0.23)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0,0.5)" // 0% 处的颜色
                      // color: 'rgba(160,247,255,0.23)' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: [{ value: 0 }]
            // data: [{
            //     name: '',
            //     value: 0,
            //     itemStyle: {
            //         normal: {
            //             color: "rgba(32,86,221,0.2)"
            //         }
            //     }
            // }]
          },
          {
            type: "pie",
            center: ["50%", "55%"],
            radius: ["60%", "61%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            name: "",
            tooltip: {
              show: false //显示提示框
            },
            data: [
              {
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#112E78"
                  }
                }
              }
            ]
          }
        ]
      };
      this.travelEcharOption = option;
    },
    dealWithData: function(data) {
      this.comeNum = data.comeNum == null ? 0 : data.comeNum;
      this.comeDelayNum = data.comeDelayNum == null ? 0 : data.comeDelayNum;
      this.comeCancelNum = data.comeCancelNum == null ? 0 : data.comeCancelNum;
      this.outNum = data.outNum == null ? 0 : data.outNum;
      this.outDelayNum = data.outDelayNum == null ? 0 : data.outDelayNum;
      this.outCancelNum = data.outCancelNum == null ? 0 : data.outCancelNum;
      this.alertNum = data.alertNum == null ? 0 : data.alertNum;
      this.blueAlertNum = data.blueAlertNum == null ? 0 : data.blueAlertNum;
      this.yellowAlertNum =
        data.yellowAlertNum == null ? 0 : data.yellowAlertNum;
      this.redAlertNum = data.redAlertNum == null ? 0 : data.redAlertNum;
      this.orangeAlertNum =
        data.orangeAlertNum == null ? 0 : data.orangeAlertNum;
      this.numberList = String(
        (this.realComePersonNum =
          data.realComePersonNum == null ? 0 : data.realComePersonNum)
      ).split("");
      this.realOutPersonNum =
        data.realOutPersonNum == null ? 0 : data.realOutPersonNum;
      this.logNumber = data.logNumber == null ? 0 : data.logNumber;
    },
    changeComeOrOut(content) {
      if (content == "进港") {
        this.numberList = String(this.realComePersonNum).split("");
      } else if (content == "出港") {
        this.numberList = String(this.realOutPersonNum).split("");
      }
    }
  },
  data() {
    return {
      logNumber: 123345, //日志数量
      numberList: ["0"], //客运量
      realComePersonNum: 0, //实际进港人数
      realOutPersonNum: 0, //实际出港人数
      comeNum: 0, //进港航班数量
      comeDelayNum: 0, //进港延误数量
      comeCancelNum: 0, //进港取消数量
      outNum: 0, //出港航班数量
      outDelayNum: 0, //出港延误数量
      outCancelNum: 0, //出港取消数量
      alertNum: 0, //预警数量
      blueAlertNum: 0, //蓝色预警数量
      yellowAlertNum: 0, //黄色预警数量
      redAlertNum: 0, //红色预警数量
      orangeAlertNum: 0, //橙色预警数量
      comeOrOutConfig: ["进港", "出港"],
      // srcbg: require('../roadTransportOperation/img/dlys_num_bg.png'),
      travelEcharOption: {},
      publishChannel: {
        // tooltip : {
        //     trigger: 'item',
        //     position: ['50%', '50%'],
        //     formatter: "{a} <br/>{b} : {c} ({d}%)"
        // },
        // // legend: {
        // //     x : 'center',
        // //     y : 'bottom',
        // //     data:['rose1','rose2','rose3']
        // // },
        // calculable : true,
        // series : [
        //     {
        //         name:'交通方式',
        //         type:'pie',
        //         radius : [13, 40],
        //         // center : ['50%', '50%'],
        //         roseType : 'area',
        //         data:[
        //             {value:10, name:'火车'},
        //             {value:30, name:'飞机'},
        //             {value:40, name:'汽车'}
        //         ]
        //     }
        // ]
      },
      travelData: [
        ["出租车", "公交", "地铁", "大巴", "其它"],
        [
          { value: 15, name: "出租车" },
          { value: 45, name: "公交" },
          { value: 12, name: "地铁" },
          { value: 15, name: "大巴" },
          { value: 13, name: "其它" }
        ]
      ],
      title: "客流总体情况",
      datevalue: "",
      pickerOptions: dateRang,
      visibility: "hidden",
      itemList: [
        {
          order: 1,
          title: "",
          traffic: 6951
        },
        {
          order: 2,
          title: "",
          traffic: 1281
        },
        {
          order: 3,
          title: "",
          traffic: 4119
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin flexLayOut {
  position: relative;
  display: flex;
  flex-direction: column;
}

.CompositeIndicator-wrapper {
  display: flex;
  height: 100%;
  .left-panel {
    flex: 400;
    width: 410px;

    @include flexLayOut;
    .top {
      flex: 76;
      position: relative;
      .hbgk {
        // background: url('./img/zhjc_hb_bg.png') no-repeat;
        background-size: 203px 118px;
        .part {
          display: flex;
          /*height: 50%;*/
          justify-content: space-evenly;
          .item {
            @include allCenter;
            flex-direction: column;
            text-align: center;
            width: 110px;
            height: 100px;
            border: 2px solid rgba(32, 86, 221, 0.4);
            border-radius: 8px;
            background-color: rgba(32, 86, 221, 0.4);
            h2 {
              width: 100%;
            }
            p {
              width: 100%;
              color: #00ffff;
              font-size: 24px;
              margin: 10px 0;
            }
            span {
              color: #00ffff;
              font-size: 16px;
            }
          }
        }
        .first {
          margin-top: 20px;
          align-items: flex-end;
          margin-bottom: 10px;
        }
      }
    }
    .mid {
      flex: 308;
      position: relative;
      margin: 10px 0;
      .ywyj {
        height: calc(100% - 45px);
        //height: 100%;
        // background: url('./img/zhjc_hb_hbyw_bg.png') no-repeat;
        background-size: 316px 158px;
        background-position: center center;
        position: relative;
        .total {
          font-size: 14px;
          padding: 20px;
          .a {
            margin-left: 20px;
          }
          .b {
            margin: 0 6px;
            font-size: 18px;
            color: yellow;
          }
          .number {
            color: rgba(255, 0, 0, 1);
            font-size: 18px;
            margin: 0 6px;
          }
          .up {
            color: red;
          }
          .bottom {
            color: green;
          }
        }
        .item {
          width: 59px;
          height: 59px;
          border-radius: 50%;
          position: absolute;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;

          p {
            font-size: 16px;
          }
          h2 {
            font-size: 14px;
            margin-top: 10px;
          }
          &:nth-child(2) {
            left: 160px;
            top: 60px;
            background: linear-gradient(
              180deg,
              rgba(255, 241, 0, 1),
              rgba(255, 138, 0, 1)
            );
          }
          &:nth-child(3) {
            right: 20px;
            top: 30px;
            width: 69px;
            height: 70px;
            background: linear-gradient(
              180deg,
              rgba(242, 136, 23, 1),
              rgba(154, 50, 13, 1)
            );
          }
          &:nth-child(4) {
            left: 60px;
            bottom: 10px;
            width: 91px;
            height: 91px;
            background: linear-gradient(
              180deg,
              rgba(0, 255, 255, 1),
              rgba(8, 49, 150, 1)
            );
          }
          &:nth-child(5) {
            right: 80px;
            bottom: 18px;
            width: 80px;
            height: 80px;
            background: linear-gradient(
              180deg,
              rgba(251, 46, 59, 1),
              rgba(91, 5, 5, 1)
            );
            border-radius: 50%;
          }
        }
      }
    }
  }
  .mid-panel {
    flex: 700;
    position: relative;
    margin: 0 10px;
    /*background: rgba(12, 12, 12, 0.62);*/
    display: flex;
    flex-direction: column;
    .panel-wrap {
      flex: 50;
    }
    .percent-wrapper {
      display: flex;
      /*margin-top: 30px;*/
      flex: 150;
      /*background: rgba(12, 12, 12, 0.62);*/
      .title-item {
        flex: 1;
        margin-left: 20px;
      }
      .title-item:last-child {
        margin-right: 20px;
      }
      .btn-wrappper {
        position: absolute;
        right: 10px;
        margin-top: 10px;
      }
      .number-wrapper {
        width: 100%;
        margin-top: 40px;
        .rollNumber-container {
          margin-left: 100px;
        }
        .rollNumber-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          label {
            font-size: 16px;
          }
          .number {
            margin-left: 10px;
            display: flex;
            .item {
              font-size: 60px;
              text-align: center;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(255, 255, 0, 1);
              line-height: 88px;
              text-shadow: 0px 5px 0px rgba(0, 0, 0, 0.35);
              // background-image: url('./img/zhjc_klzt_data_bg.png');
              font-weight: 400;
              margin-left: -8px;
              color: rgba(255, 255, 0, 1);
              /*line-height:30px;*/
              width: 80px;
              height: 88px;
              /*box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);*/
              text-shadow: 0px 5px 0px rgba(0, 0, 0, 0.35);
              // box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);
              border-radius: 8px;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .map {
      margin-top: 20px;
      flex: 700;
    }
  }
  .right-panel {
    flex: 380;
    position: relative;
    display: flex;
    flex-direction: column;

    .top {
      position: relative;
      flex: 100;
      .zbjt {
        height: calc(100% - 45px);
        // background: url('./img/zhjc_zbjt_bg.png') no-repeat;  *
        background-size: 427px 269px;
        background-position: center center;
        text-align: center;
        position: relative;
        @include allCenter;
        .item-wrapper {
          width: 427px;
          height: 269px;
          position: relative;
          .item {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
              font-size: 24px;
            }
            h2 {
              margin-top: 10px;
              font-size: 14px;
            }
          }
          .first {
            left: 161px;
            top: 1px;
            width: 110px;
            height: 120px;
          }
          .second {
            right: 1px;
            top: 1px;
            width: 110px;
            height: 120px;
          }
          .three {
            left: 1px;
            bottom: 1px;
            width: 170px;
            height: 180px;
          }
          .four {
            right: 80px;
            bottom: 1px;
            width: 120px;
            height: 140px;
          }
        }
      }
    }
    .mid {
      flex: 190;
    }
    .bottom {
      margin-top: 0px;
      position: relative;
      margin-bottom: 5px;
      flex: 100;
      .item {
        @include allCenter;
        flex-direction: column;
        text-align: center;
        width: 110px;
        height: 70px;
        border: 2px solid rgba(32, 86, 221, 0.4);
        border-radius: 8px;
        background-color: rgba(32, 86, 221, 0.4);
        // h2{
        //     width: 100%;
        // }
        p {
          width: 100%;
          color: #00ffff;
          font-size: 24px;
          margin: 10px 0;
        }
        span {
          color: #00ffff;
          font-size: 16px;
        }
      }
    }
  }
  .back_color {
    //背景颜色
    background-color: rgba(0, 0, 0, 0.6);
  }
}
.date-float {
  position: absolute;
  right: 20px;
  top: -10px;
  visibility: hidden;
}
</style>