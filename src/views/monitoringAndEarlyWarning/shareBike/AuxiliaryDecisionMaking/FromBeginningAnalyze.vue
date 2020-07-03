<template>
  <div class="realTimeMonitor-wrapper">
    <BaseLayoutContent>
      <template #leftPanel>
        <TableFrame />
        <panel>
          
          <!-- <PanelItem title :displaySwitch="false"> -->
            <!-- <div class="top back-color">
              <panelTitle title="骑行始终点分析" :displaySwitch="false"></panelTitle>
              <div class="traffic-wrapper">
                <div class="item-wrapper">
                  <section class="search-wrapper">
                    <SearchPanel :searchConfig="searchConfig"></SearchPanel>
                  </section>
                </div>
              </div>
              <div style="margin-top: 10px;">时间特征：</div>
            </div> -->
            <!-- <div>
                <div>所有</div>
                <div>工作日</div>
                <div>非工作日</div>
              </div> -->
          <!-- </PanelItem> -->
          <!-- <PanelItem title :displaySwitch="false">
            <div class="bottom back-color">
              <panelTitle title="重点区域运行情况" :displaySwitch="false"></panelTitle>
              <div class="content" v-calcEleSize>
                <dTebale></dTebale>
              </div>
              <div class="order" style="width: 99%;height: 200px;margin-top: -50px">
                <v-chart :options="options1" :autoresize="true" theme="theme"></v-chart>
              </div>
            </div>
          </PanelItem>
          <PanelItem title :displaySwitch="false">
            <div class="under back-color">
              <panelTitle title="禁停区域违停情况" :displaySwitch="false"></panelTitle>
              <div class="realTime">
                <table>
                  <tr v-for="(item, index) in rmxlList" :key="item.name">
                    <th>NO. {{index + 1 }}</th>
                    <th>{{item.line}}</th>
                    <th>{{item.realFlowTotal}} 人次</th>
                  </tr>
                </table>
              </div>
            </div>
          </PanelItem>-->
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
      </template>
      <template #rightPanel></template>
    </BaseLayoutContent>
  </div>
</template>

<script>
import TableFrame from './components/tableFrame'
// import dTebale from "./components/table";
// import { option1, option2 } from "./options";
export default {
  name: "",
  components: {
    TableFrame
    // dTebale
  },
  // 运行情况
  mounted() {
    // this.getHourChange();
    // this.$http
    //   .$get("/gxdc_bikeOperationQueryHandler/getRunningCondition", {
    //     startDate: '""',
    //     endDate: '""'
    //   })
    //   .then(data => {
    //     if (data) {
    //       this.itemList[0].number = data.orderNumber + "次";
    //       this.itemList[1].number = data.carActive + "%";
    //       this.itemList[2].number = data.carRevolve;
    //     }
    //   });
  },
  methods: {
    // 获取当天时间
    // getNowFormatDate() {
    //   var date = new Date();
    //   var seperator1 = "-";
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1;
    //   var strDate = date.getDate();
    //   if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    //   }
    //   if (strDate >= 0 && strDate <= 9) {
    //     strDate = "0" + strDate;
    //   }
    //   var currentdate = year + seperator1 + month + seperator1 + strDate;
    //   return currentdate;
    // },
    // // 每小时订单变化情况
    // getHourChange() {
    //   this.$http
    //     .$get("/gxdc_bikeOperationQueryHandler/getAllOrderEchras", {
    //       startsDate: this.getNowFormatDate(),
    //       endDate: '""'
    //     })
    //     .then(data => {
    //       let xAxisData = [],
    //         seriesData = [],
    //         legendData = ["每小时订单变化情况"],
    //         ydata = [];
    //       for (const item of data) {
    //         xAxisData.push(item.hour);
    //         ydata.push(item.orderNumber);
    //       }
    //       seriesData.push(ydata);
    //       let option = this.$utils.echart.getLineOption(
    //         {
    //           xAxisData: xAxisData,
    //           legendData: legendData,
    //           seriesData: seriesData
    //         },
    //         {
    //           xAxis: [
    //             {
    //               name: "单位:(/h)",
    //               axisLabel: {
    //                 interval: 1
    //               }
    //             }
    //           ]
    //         }
    //       );
    //       this.options1 = option;
    //     });
    // }
  },
  data() {
    return {
      searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 14,
            type: "monthrange",
            formate: "yyyy-MM",
            label: "月份",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "statisticsDate",
              defaultValue: ""
            }
          }
        ]
      }
      // rmxlList: [
      //   {
      //     line: "2020-1-17 12：30",
      //     realFlowTotal: "XXXX共享单车企业，有车辆停靠A区域"
      //   },
      //   {
      //     line: "2020-1-17 12：30",
      //     realFlowTotal: "XXXX共享单车企业，有车辆停靠A区域"
      //   },
      //   {
      //     line: "2020-1-17 12：30",
      //     realFlowTotal: "XXXX共享单车企业，有车辆停靠A区域"
      //   },
      //   {
      //     line: "2020-1-17 12：30",
      //     realFlowTotal: "XXXX共享单车企业，有车辆停靠A区域"
      //   },
      //   {
      //     line: "2020-1-17 12：30",
      //     realFlowTotal: "XXXX共享单车企业，有车辆停靠A区域"
      //   }
      // ],
      // options1: {},
      // itemList: [
      //   {
      //     id: "1",
      //     sub: "订单数量",
      //     number: "--"
      //   },
      //   {
      //     id: "2",
      //     sub: "车辆活跃率",
      //     number: "--"
      //   },
      //   {
      //     id: "3",
      //     sub: "车辆周转率",
      //     number: "--"
      //   }
      // ]
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
.realTimeMonitor-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  .left {
    flex: 7;
    @include flexLayOut;
    .top {
      width: 400px;
      flex: 7;
      position: relative;
      .traffic-wrapper {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        .item-wrapper {
          height: 90px;
          display: flex;
          justify-content: space-around;
          .item {
            width: 110px;
            height: 70px;
            border: 2px solid rgba(32, 86, 221, 0.4);
            border-radius: 8px;
            background-color: rgba(32, 86, 221, 0.4);
            @include v-center;
          }
        }
      }
    }
    .bottom {
      width: 400px;
      flex: 3;
      position: relative;
      margin-top: 10px;
      .content {
        width: 400px;
      }
    }
    .under {
      width: 400px;
      flex: 3;
      position: relative;
      margin-top: 10px;
      .back-color {
        .wt {
          p {
            font-size: 12px;
            color: #fff100;
          }
        }
      }
    }
  }
  .mid {
    @include flexLayOut;
    flex: 830;
    margin: 0 20px;
  }
}
.back-color {
  padding-left: 10px;
  //背景颜色
}
.date-float {
  position: absolute;
  right: 20px;
  top: -10px;
  visibility: hidden;
}
.orderBtn {
  display: inline-block;
  cursor: pointer;
  padding: 6px;
  border-radius: 10px;
  font-size: 12px;
  background-color: aqua;
  margin-left: 70px;
  background-color: #2056dd;
  border: 1px solid #ffffff;
  color: #fff;
}

.realTime {
  margin-top: 10px;
  margin-left: 10px;
  padding-left: 10px;
  table {
    width: 100%;
    tr {
      &:hover th {
        color: rgba(0, 255, 255, 1);
      }
      th {
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        font-weight: normal;
        color: rgba(0, 255, 255, 0.8);
      }
      th:nth-child(1) {
        width: 15%;
        // color: rgba(32, 86, 221, $capcity);
      }
      th:nth-child(2) {
        text-align: left;
        // color: rgba(114, 246, 250, $capcity);
      }
      th:nth-child(3) {
        // color: rgba(255, 255, 0, $capcity);
      }
    }
    tr:nth-child(2n) {
      background-color: rgba(32, 86, 221, 0.1);
    }
  }
}
</style>