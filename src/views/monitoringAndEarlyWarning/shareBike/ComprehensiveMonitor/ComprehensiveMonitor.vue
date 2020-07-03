<template>
  <div class="comprehensiveMonitor-wrapper">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <div class="top back-color">
              <panelTitle title="各个时间段单车使用情况[单/小时]" :displaySwitch="false"></panelTitle>
              <div class="content">
                <div class="dc" style="width: 99%;height: 180px">
                  <v-chart :options="options1" :autoresize="true" theme="theme"></v-chart>
                </div>
              </div>
            </div>
          </PanelItem>
          <PanelItem title :displaySwitch="false">
            <div class="bottom back-color">
              <panelTitle title="骑行距离分布[单]" :displaySwitch="false"></panelTitle>
              <div class="qx" style="width: 99%;height: 180px">
                <v-chart :options="options2" :autoresize="true" theme="theme"></v-chart>
              </div>
            </div>
          </PanelItem>
          <PanelItem title :displaySwitch="false">
            <div class="under back-color">
              <panelTitle title="骑行地区路径分布" :displaySwitch="false"></panelTitle>
              <div class="dq" style="width: 99%;height: 180px">
                <v-chart :options="options3" :autoresize="true" theme="theme"></v-chart>
              </div>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <div class="top back-color">
              <panelTitle title="订单情况[单]" :displaySwitch="false" />
              <img :src="src2" width="100%" alt />
              <div class="order">
                <h2>订单总数</h2>
                <p v-html="orderNum"></p>
              </div>
              <dc></dc>
            </div>
          </PanelItem>
          <PanelItem title :displaySwitch="false">
            <div class="mid back-color">
              <panelTitle title="车辆活跃率" :displaySwitch="false"></panelTitle>
              <div class="yh">
                <v-chart :options="options4" :autoresize="true" theme="theme"></v-chart>
                <div class="hyl">
                  <span class="hylBl">{{ hy }}</span>
                  <h2 class="hylBtl">活跃率</h2>
                </div>
              </div>
            </div>
          </PanelItem>
          <PanelItem title :displaySwitch="false">
            <div class="bottom back-color">
              <panelTitle title="共享单车违停情况[辆]" :displaySwitch="false"></panelTitle>
              <div class="qyts-wrapper">
                <div class="item item2">
                  <h2>{{ exceptionMb }}</h2>
                  <p>摩拜</p>
                </div>
                <div class="item item3">
                  <h2>{{ exceptionQj }}</h2>
                  <p>青桔</p>
                </div>
                <div class="item item4">
                  <h2>{{ exceptionHl }}</h2>
                  <p>哈啰</p>
                </div>
              </div>
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>

    <div class="mid-content">
      <div class="top">
        <div class="base-info-wrappper">
          <img :src="src1" alt />
          <div class="info-wrapper">
            <div class="item item1">
              <h2>企业数量(家)</h2>
              <p v-html="enterpriseNum"></p>
            </div>
            <div class="item item2">
              <h2>车辆数量(辆)</h2>
              <p v-html="carNum"></p>
            </div>
            <div class="item item3">
              <h2>用户数量(人)</h2>
              <p v-html="userNum"></p>
            </div>
          </div>
          <div class="info-wrapper">
            <div class="item item4">
              <h2>正常车辆(辆)</h2>
              <p v-html="normalCar"></p>
            </div>
            <div class="item item5">
              <h2>维修车辆(辆)</h2>
              <p v-html="maintainCar"></p>
            </div>
            <div class="item item6">
              <h2>报废车辆(辆)</h2>
              <p v-html="scrapCar"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { option1, option2, option3, option4 } from "./options";
import dc from "./components/ComprehensiveMonitor/dc.vue";
export default {
  name: "",
  components: {
    dc
  },
  mounted() {
    this.getPassengerFlow();
    this.getRidingDistance();
    // 活跃率
    let param = "2020-01-12";
    this.$http
      .$get("/gxdc_bikeIntegratedMonitoringHandler/getWebActivityRate", {
        time: param
      })
      .then(data => {
        if (data) {
          this.hy = data;
        }
      });
    // 查询当天订单及各企业的订单量
    this.$http
      .$get("/gxdc_bikeIntegratedMonitoringHandler/getWebTodayOrder", {
        time: this.getNowFormatDate()
      })
      .then(data => {
        if (data) {
          // 总订单xinzainishisheideyingxiong
          this.orderNum = this.tranNumber(data.totalNum, 2);
        }
      });
    // 获取企业车辆和用户信息
    this.$http
      .$get(
        "/gxdc_bikeIntegratedMonitoringHandler/getWebEnterpriseBikeUserInfo"
      )
      .then(data => {
        if (data) {
          // 企业数量
          this.enterpriseNum = this.tranNumber(data.enterpriseNum, 2);
          // 单车数量
          this.carNum = this.tranNumber(data.bikeNum, 2);
          // 用户数量
          this.userNum = this.tranNumber(data.userNum, 2);
          let arr = data.list;
          for (let i = 0, len = arr.length; i < len; i++) {
            let flag = arr[i].code;
            // 正常车辆
            if (flag === 0) {
              this.normalCar = this.tranNumber(arr[i].num, 2);
            }
            if (flag === 2) {
              // 维修车辆
              this.maintainCar = this.tranNumber(arr[i].num, 2);
            }
            if (flag === 3) {
              // 报废车辆
              this.scrapCar = this.tranNumber(arr[i].num, 2);
            }
          }
        }
      });
  },
  methods: {
    // 各个时间段单车使用情况
    // 获取当天时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getPassengerFlow() {
      this.$http
        .$get("/gxdc_bikeIntegratedMonitoringHandler/getWebBikeUseInfoByHour", {
          stime: this.getNowFormatDate()
        })
        .then(data => {
          let xAxisData = [],
            seriesData = [],
            legendData = ["单车使用数量"],
            ydata = [];
          for (const item of data.list) {
            xAxisData.push(item.hour.split("-")[0].split(":")[0]);
            ydata.push(item.bikeNum);
          }
          seriesData.push(ydata);
          let option = this.$utils.echart.getLineOption(
            {
              xAxisData: xAxisData,
              legendData: legendData,
              seriesData: seriesData
            },
            {
              xAxis: [
                {
                  name: "单位:(/h)",
                  axisLabel: {
                    interval: 1
                  }
                }
              ]
            }
          );
          this.options1 = option;
        });
    },
    getRidingDistance() {
      this.$http
        .$get("/gxdc_bikeIntegratedMonitoringHandler/getWebDistanceInfo")
        .then(data => {
          let xAxisData = [],
            seriesData = [],
            legendData = ["订单量", "比率"],
            ydata = [],
            bdata = [],
            temp1 = [], // <1
            temp2 = [], // 1-2
            temp3 = [], // 2-3
            temp4 = [], // 3-4
            temp5 = [], // 4-5
            temp6 = []; // >5
          xAxisData.push("<1");
          xAxisData.push("1-2");
          xAxisData.push("2-3");
          xAxisData.push("3-4");
          xAxisData.push("4-5");
          xAxisData.push(">5");
          // 比率缓冲数组
          let rate1 = [],
            rate2 = [],
            rate3 = [],
            rate4 = [],
            rate5 = [],
            rate6 = [];
          for (const item of data) {
            if (item.distance <= 1000) {
              var sum1 = 0;
              var bl1 = 0.0;
              temp1.push(item.orderNum);
              rate1.push(item.ratio.substring(0, item.ratio.length - 1));
              if (temp1) {
                temp1.forEach(ele => {
                  sum1 += ele;
                });
                rate1.forEach(f => {
                  bl1 += f * 1;
                });
              } else {
                ydata.push(temp1);
              }
            } else if (1000 < item.distance && item.distance <= 2000) {
              var sum2 = 0;
              var bl2 = 0.0;
              temp2.push(item.orderNum);
              rate2.push(item.ratio.substring(0, item.ratio.length - 1));
              if (temp2) {
                temp2.forEach(ele => {
                  sum2 += ele;
                });
                rate2.forEach(f => {
                  bl2 += f * 1;
                });
              } else {
                ydata.push(temp2);
              }
            } else if (2000 < item.distance && item.distance <= 3000) {
              var sum3 = 0;
              var bl3 = 0.0;
              temp3.push(item.orderNum);
              rate3.push(item.ratio.substring(0, item.ratio.length - 1));
              if (temp3) {
                temp3.forEach(ele => {
                  sum3 += ele;
                });
                rate3.forEach(f => {
                  bl3 += f * 1;
                });
              } else {
                ydata.push(temp3);
              }
            } else if (3000 < item.distance && item.distance <= 4000) {
              var sum4 = 0;
              var bl4 = 0.0;
              temp4.push(item.orderNum);
              rate4.push(item.ratio.substring(0, item.ratio.length - 1));
              if (temp4) {
                temp4.forEach(ele => {
                  sum4 += ele;
                });
                rate4.forEach(f => {
                  bl4 += f * 1;
                });
              } else {
                ydata.push(temp4);
              }
            } else if (4000 < item.distance && item.distance <= 5000) {
              var sum5 = 0;
              var bl5 = 0.0;
              temp5.push(item.orderNum);
              rate5.push(item.ratio.substring(0, item.ratio.length - 1));
              if (temp5) {
                temp5.forEach(ele => {
                  sum5 += ele;
                });
                rate5.forEach(f => {
                  bl5 += f * 1;
                });
              } else {
                ydata.push(temp5);
              }
            } else if (item.distance > 5000) {
              var sum6 = 0;
              var bl6 = 0.0;
              temp6.push(item.orderNum);
              rate6.push(item.ratio.substring(0, item.ratio.length - 1));
              if (temp6) {
                temp6.forEach(ele => {
                  sum6 += ele;
                });
                rate6.forEach(f => {
                  bl6 += f * 1;
                });
              } else {
                ydata.push(temp6);
              }
            }
          }
          ydata.push(typeof sum1 == "undefined" ? 0 : sum1);
          ydata.push(typeof sum2 == "undefined" ? 0 : sum2);
          ydata.push(typeof sum3 == "undefined" ? 0 : sum3);
          ydata.push(typeof sum4 == "undefined" ? 0 : sum4);
          ydata.push(typeof sum5 == "undefined" ? 0 : sum5);
          ydata.push(typeof sum6 == "undefined" ? 0 : sum6);

          bdata.push(typeof bl1 == "undefined" ? 0 : bl1.toFixed(2));
          bdata.push(typeof bl2 == "undefined" ? 0 : bl2.toFixed(2));
          bdata.push(typeof bl3 == "undefined" ? 0 : bl3.toFixed(2));
          bdata.push(typeof bl4 == "undefined" ? 0 : bl4.toFixed(2));
          bdata.push(typeof bl5 == "undefined" ? 0 : bl5.toFixed(2));
          bdata.push(typeof bl6 == "undefined" ? 0 : bl6.toFixed(2));

          seriesData.push(ydata);
          seriesData.push(bdata);
          var option2 = this.$utils.echart.getBarOption(
            {
              xAxisData: xAxisData,
              legendData: legendData,
              seriesData: seriesData
            },
            // {
            //     xAxis: [{
            //         name:'km',
            //         nameLocation:'center',
            //     }]
            // },
            {
              series: [
                {},
                {
                  type: "line",
                  yAxisIndex: 1
                }
              ],
              yAxis: [
                {},
                {
                  type: "value"
                }
              ]
            }
          );
          this.options2 = option2;
        });
    },
    // 数字转化
    tranNumber(num, point) {
      let numStr = num.toString();
      // 十万以内直接返回
      if (numStr.length < 6) {
        return numStr;
      }
      //大于6位数是十万 (以10W分割 10W以下全部显示)
      else if (numStr.length > 5) {
        let decimal = numStr.substring(
          numStr.length - 4,
          numStr.length - 4 + point
        );
        return (
          parseFloat(parseInt(num / 10000) + "." + decimal).toFixed(2) +
          '<span style="font-size: 12px">万</span>'
        );
      }
    }
  },
  data() {
    return {
      options1: {},
      options2: {},
      options3: option3,
      options4: option4,
      src1: require("./img/mxjt_bg_center.png"),
      src2: require("./img/mxjt_ddzl.png"),
      src3: require("./img/mxjt_clhyl.png"),
      src4: require("./img/mxjt_dcwt.png"),
      showdw: true,
      enterpriseNum: "--",
      carNum: "--",
      userNum: "--",
      normalCar: "--",
      maintainCar: "--",
      scrapCar: "--",
      orderNum: "--",
      mb: "--",
      qj: "--",
      hl: "--",
      hy: "--",
      exceptionMb: 129,
      exceptionQj: 82,
      exceptionHl: 73
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
@mixin panelBg {
  border: 1px solid rgba(17, 46, 120, 0.2);
}
.comprehensiveMonitor-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  .mid-content {
    flex: 830;
    // 中上
    .top {
      flex: 250;
      position: relative;
      .base-info-wrappper {
        position: relative;
        @include panelBg;
        img {
          // width: 786px;
          width: 100%;
          height: 100%;
        }
        & > h2 {
          position: absolute;
          width: 100%;
          text-align: center;
          /*top: 22px;*/
        }
        .info-wrapper {
          .item {
            // position: absolute;
            top: 50px;
            height: 60px;
            width: 140px;
            left: 36px;
            h2 {
              // position: absolute;
              width: 100%;
              text-align: center;
              top: 14px;
              font-weight: bold;
              font-size: 14px;
            }
            p {
              color: #01e9eb;
              text-align: center;
              width: 100%;
              // position: absolute;
              top: 6px;
              font-size: 22px;
              /*margin-top: 10px;*/
              span {
                font-size: 14px;
              }
            }
          }
        }
        .info-wrapper {
          position: absolute;
          width: 100%;
          top: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          height: 100%;
          .item1 {
            margin-top: -75px;
            p {
              margin-top: 5px;
              color: #00ffff;
            }
          }
          .item2 {
            margin-top: -75px;
            margin-left: 140px;
            p {
              margin-top: 5px;
              color: #00ffff;
            }
          }
          .item3 {
            margin-top: -75px;
            margin-left: 130px;
            p {
              margin-top: 5px;
              color: #00ffff;
            }
          }
          .item4 {
            margin-top: 122px;
            p {
              margin-top: 2px;
              color: #00ffff;
            }
          }
          .item5 {
            margin-top: 122px;
            margin-left: -200px;
            p {
              margin-top: 2px;
              color: #fff100;
            }
          }
          .item6 {
            margin-top: 122px;
            margin-left: -200px;
            p {
              margin-top: 2px;
              color: #fff100;
            }
          }
        }
      }
    }
  }
  .right > div {
    flex-basis: 0% !important;
  }
  .right {
    @include flexLayOut;
    flex: 500;
    // 右上
    .top {
      flex: 356;
      position: relative;
      @include panelBg;
    }
    // 右中
    .mid {
      margin: 10px 0 0 0;
      flex: 260;
      @include panelBg;
    }
    // 右下
    .bottom {
      flex: 300;
      margin-top: 10px;
      text-align: center;
      @include panelBg;
      h2 {
        font-size: 22px;
        font-weight: bolder;
      }
      p {
        font-size: 14px;
      }
      .mb {
        margin-left: -350px;
        margin-top: -75px;
      }
      .qj {
        margin-left: 80px;
        margin-top: -20px;
      }
      .hl {
        margin-top: -130px;
        margin-left: 360px;
      }
    }
  }
}
.back-color {
  //背景颜色
  position: relative;
  // padding-left: 20px;
  .yh {
    background: url("./img/mxjt_clhyl.png") center no-repeat;
    height: 200px;
    width: 99%;
    background-size: 120%;
  }
  .hyl {
    width: 100%;
    text-align: center;
    margin-top: -31%;
    .hylBl {
      font-size: 18px;
      color: #00ffff;
    }
    .hylBt {
      font-size: 12px;
      color: #fff;
    }
  }
}
.date-float {
  position: absolute;
  right: 20px;
  top: -10px;
  visibility: hidden;
}
.mid-content {
  width: 830px;
  position: absolute;
  left: 50%;
  @include panelBg;
  transform: translateX(-50%);
}
.order {
  position: absolute;
  top: 50px;
  left: 100px;
  height: 60px;
  width: 140px;
  h2 {
    // position: absolute;
    width: 100%;
    text-align: center;
    top: 14px;
    font-weight: bold;
    font-size: 14px;
  }
  p {
    color: #01e9eb;
    text-align: center;
    width: 100%;
    // position: absolute;
    font-size: 36px;
    font-weight: bold;
    margin-top: 5px;
    font-family: datafont;
    animation: turn 8s ease-in-out infinite;
    span {
      font-size: 14px;
    }
  }
}
.qyts-wrapper {
  background-size: 100% 100%;
  height: 260px;
  background: url("./img/zhjc_hb_hbyw_bg.png") center no-repeat;
  position: relative;
  // position: relative;
  .item {
    position: absolute;
    text-align: center;
    height: 100px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 14px;
      font-weight: bolder;
    }
    h2 {
      margin-top: 10px;
      font-size: 26px;
    }
  }
  .item1 {
    top: 36px;
    left: 130px;
  }
  .item2 {
    top: 16px;
    right: 150px;
    @include linearGradient(70px, 70px, 180deg, #ef5849, #99352a);
  }
  .item3 {
    bottom: 40px;
    left: 10px;
    @include linearGradient(100px, 100px, 180deg, #13ccb1, #0c8977);
  }
  .item4 {
    right: 96px;
    bottom: 40px;
    @include linearGradient(90px, 90px, 180deg, #01a7f7, #016798);
  }
}
</style>