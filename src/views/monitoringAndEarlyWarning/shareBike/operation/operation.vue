<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem
            :title="zcyhsT"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="ssqxlxq"
          >
            <div class="kyzsl">
              <ssqxl @setTotalNO="setzcyhsNO" />
            </div>
          </PanelItem>
          <PanelItem
            title="骑行距离分布"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="qxjlfbxq"
          >
            <div class="qxjl">
              <qxjlfb />
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
        <div class="tag-wrap">
          <ChangeTag :itemList="itemList" @getStatues="getStatues" />
        </div>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title="重点区域运行情况" :displaySwitch="false" :isShowDeatilBtn="false">
            <div class="keyarea">
              <table>
                <tr>
                  <th>重点区域</th>
                  <th>订单数量</th>
                </tr>
                <tr v-for="item in AreaList" :key="item.areaName">
                  <th>{{item.areaName}}</th>
                  <td>{{item.orderNum}}</td>
                </tr>
              </table>
            </div>
          </PanelItem>
          <PanelItem
            title="公交地铁站点开关锁TOP10"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="rldxq"
          >
            <div class="content">
              <kgstop10 />
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
  </div>
</template>

<script>
import qxjlfb from "./components/qxjlfb.vue";
import ssqxl from "./components/ssqxl.vue";
import kgstop10 from "./components/kgstop10.vue";
// import zdkyl from "./components/index/zdkyl.vue";
export default {
  name: "",
  components: { qxjlfb, ssqxl, kgstop10 },
  mounted() {
    this.getPassengerLine();
    this.getRealTimeOperation();
    this.getEnterpriseAndEmployee();
    this.getStationNumByGrade();
    this.getKeyArea();
    this.getOrderNumOfArea();
  },
  methods: {
    setzcyhsNO(val) {
      debugger;
      this.zcyhsT = "实时骑行总量(" + val + ")";
    },
    getOrderNumOfArea() {
      this.$http
        .$get("/gxdc_bikeOperateHandler/getOrderNumOfArea")
        .then(res => {
          const AreaList = [];
          for (const item of res) {
            AreaList.push({
              areaName: item.areaName,
              orderNum: item.orderNum
            });
          }
          this.AreaList = AreaList;
        });
    },
    getPassengerLine() {
      this.$http.$get("/kyjc_indexHandler/getPassengerLine").then(res => {
        this.kyxlt = "客运线路(" + res.total + ")条";
        let option = this.$utils.echart.getPieOption({
          // legendData:legendData,
          seriesData: [
            [
              {
                name: "省外",
                value: res.outsideProvince
              },
              {
                name: "市内",
                value: res.insideCity
              },
              {
                name: "省内市外",
                value: res.inProvinceOutCity
              }
            ]
          ]
        });
        this.option = option;
      });
    },
    getStatues(val) {
      tmap.removeLayer();
      if (val && val.value == "重点区域") {
        tmap.addLayer("SHAREBIKE_FOCUS_AREA_ALL").loadData();
      }
      if (val && val.value == "开锁热力点") {
        tmap.addLayer("HEATMAP_SHAREBIKE").loadData("type=1");
      }
      if (val && val.value == "关锁热力点") {
        tmap.addLayer("HEATMAP_SHAREBIKE").loadData("type=2");
      }
    },
    getKeyArea() {
      tmap.addLayer("HEATMAP_SHAREBIKE").loadData("type=1");
    },
    getRealTimeOperation() {
      this.$http.$get("/kyjc_indexHandler/getRealTimeOperation").then(data => {
        this.dispatchNum = data.dispatchNum; // 已发班次
        this.ticketNum = data.ticketNum; //  已售票数
        this.flowTotal = data.flowTotal; // 已发旅客
      });
    },
    getEnterpriseAndEmployee() {
      this.$http
        .$get("/kyjc_indexHandler/getEnterpriseAndEmployee")
        .then(data => {
          this.enterprise = data.enterprise; // 经营业户数量
          this.employee = data.employee; //  从业人员数量
        });
    },
    getStationNumByGrade() {
      this.$http.$get("/kyjc_indexHandler/getStationNumByGrade").then(data => {
        this.total = data.total; // 客运站总数量
        this.one = data.one; //  一级客运站总数量
        this.two = data.two; //  二级客运站总数量
        this.three = data.three; //  三级客运站总数量
      });
    },
    ssqxlxq() {
      this.$router.push({
        name: "shareBikeVehicleOrders"
      });
    },
    qxjlfbxq() {
      this.$router.push({
        name: "shareBikeRidingDistance"
      });
    },
    rldxq() {
      this.$router.push({
        name: "shareBikeRidingPoint"
      });
    }
  },
  data() {
    return {
      zcyhsT: "实时骑行总量",
      AreaList: [
        {
          areaName: "",
          orderNum: ""
        }
      ],
      dispatchNum: "--",
      ticketNum: "--",
      flowTotal: "--",
      enterprise: "--",
      employee: "--",
      total: "--",
      one: "--",
      two: "--",
      three: "--",
      option: {},
      kyxlt: 0,
      itemList: [
        { code: 1, value: "开锁热力点" },
        { code: 2, value: "关锁热力点" },
        { code: 3, value: "重点区域" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.char-wrap {
  width: 100%;
  height: 360px;
  overflow: hidden;
}
.dialog {
  background-color: aqua;
  position: fixed;
  left: 20%;
  top: 20%;
}
.testmap {
  width: 100%;
  height: 100%;
}
.kyzsl {
  width: 100%;
  table {
    width: 100%;
    height: 66px;
    tr {
      th {
        color: #fff;
        font-size: 16px;
        vertical-align: middle;
      }
      th:nth-child(1) {
        background-color: rgba(32, 86, 221, 0.4);
      }
      th:nth-child(2) {
        background-color: rgba(114, 246, 250, 0.4);
      }
      th:nth-child(3) {
        background-color: rgba(255, 255, 0, 0.4);
      }
      th:nth-child(4) {
        background-color: rgba(0, 176, 80, 0.4);
      }
      td {
        text-align: center;
        font-size: 14px;
        letter-spacing: 2px;
        vertical-align: bottom;
      }
    }
  }
}
.keyarea {
  width: 100%;
  table {
    width: 100%;
    height: 66px;
    tr:nth-child(2n) {
      background-color: rgba(32, 86, 221, 0.1);
    }
    tr {
      th {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: normal;
        vertical-align: middle;
        line-height: 40px;
      }
      td {
        text-align: center;
        font-size: 24px;
        line-height: 40px;
        color: #00ffff;
        letter-spacing: 2px;
        vertical-align: bottom;
        font-family: "datafont";
        animation: turn 8s ease-in-out infinite;
      }
    }
  }
}
.jyyh {
  width: 100%;
  table {
    width: 100%;
    height: 66px;
    tr {
      th {
        color: #fff;
        vertical-align: middle;
      }
      th:nth-child(1) {
        background-color: rgba(32, 86, 221, 0.4);
        font-size: 14px;
        width: 20%;
      }
      th:nth-child(2) {
        background-color: rgba(114, 246, 250, 0.4);
        font-size: 18px;
        letter-spacing: 3px;
      }
      th:nth-child(3) {
        background-color: rgba(32, 86, 221, 0.4);
        font-size: 14px;
        width: 20%;
      }
      th:nth-child(4) {
        background-color: rgba(114, 246, 250, 0.4);
        font-size: 18px;
        letter-spacing: 3px;
      }
    }
  }
}
.kyxl {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.tag-wrap {
  position: absolute;
  right: 410px;
  top: 20px;
}
</style>