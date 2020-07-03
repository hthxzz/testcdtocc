<template>
  <!-- 公交运行监测 -- 综合 监测 -->
  <div class="comprehensiveMonitor-wrapper nomap-content-container">
    <section class="left">
      <panel>
        <PanelItem>
          <div class="top">
            <kylqk></kylqk>
          </div>
          <div class="bottom">
            <panelTitle title="运营情况" :displaySwitch="false"></panelTitle>
            <div class="yyqk-wrapper">
              <div class="item">
                <img :src="srcbg" class="bg" />
                <img :src="src1" class="pic" />
                <h2>实际发班班次</h2>
                <p class="bc">{{ bc }}</p>
              </div>
              <div class="item">
                <img :src="srcbg" alt class="bg" />
                <img :src="src2" alt class="pic" />
                <h2>准班率</h2>
                <p class="zbl">{{ zbl }}</p>
              </div>
              <div class="item">
                <img :src="srcbg" alt class="bg" />
                <img :src="src3" alt class="pic" />
                <h2>上座率</h2>
                <p class="szl">{{ szl }}</p>
              </div>
            </div>
            <!-- <verticesBorderStyle /> -->
          </div>
        </PanelItem>
      </panel>
    </section>

    <section class="mid">
      <div class="top">
        <div class="base-info-wrappper">
          <img :src="src4" alt />
          <h2>基础信息</h2>
          <div class="info-wrapper">
            <div class="item item1">
              <h2>客运站数量</h2>
              <p>
                <count-to :startVal="0" :endVal="kyzsl" :duration="4000" />
                <span v-if="showdw">个</span>
              </p>
            </div>
            <div class="item item2">
              <h2>客运线路</h2>
              <p>
                <count-to :startVal="0" :endVal="kyxl" :duration="4000" />
                <span v-if="showdw">条</span>
              </p>
            </div>
            <div class="item item3">
              <h2>客运车辆</h2>
              <p>
                <count-to :startVal="0" :endVal="kycl" :duration="4000" />
                <span v-if="showdw">辆</span>
              </p>
            </div>
            <div class="item item4">
              <h2>经营业户</h2>
              <p>
                <count-to :startVal="0" :endVal="jyth" :duration="4000" />
                <span v-if="showdw">家</span>
              </p>
            </div>
            <div class="item item5">
              <h2>从业人员</h2>
              <p>
                <count-to :startVal="0" :endVal="cyry" :duration="4000" />
                <span v-if="showdw">人</span>
              </p>
            </div>
          </div>
        </div>
        <!-- <verticesBorderStyle /> -->
      </div>
      <div class="bottom">
        <panelTitle title="热门运输线路" :displaySwitch="false"></panelTitle>
        <rmysxl></rmysxl>
        <!-- <verticesBorderStyle /> -->
      </div>
    </section>
    <section class="right">
      <div class="top">
        <panelTitle title="安全违法情况" :displaySwitch="false"></panelTitle>
        <aqwf></aqwf>
      </div>
      <div class="mid">
        <panelTitle title="营运投诉情况" :displaySwitch="false"></panelTitle>
        <yyts></yyts>
        <!-- <verticesBorderStyle /> -->
      </div>
      <div class="bottom">
        <panelTitle title="经营企业到期情况" :displaySwitch="false"></panelTitle>
        <qyts></qyts>
        <!-- <verticesBorderStyle /> -->
      </div>
    </section>
    <div class="date-float" :style="{visibility:visibility}">
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
import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";
import qyts from "./components/ComprehensiveMonitor/qyts.vue";
import aqwf from "./components/ComprehensiveMonitor/aqwf.vue";
import yyts from "./components/ComprehensiveMonitor/yyts.vue";
import kylqk from "./components/ComprehensiveMonitor/kylqk.vue";
import rmysxl from "./components/ComprehensiveMonitor/rmysxl.vue";
export default {
  name: "",
  components: {
    qyts,
    yyts,
    kylqk,
    rmysxl,
    aqwf
  },
  mounted() {
    setTimeout(() => {
      // 防止时间组件闪烁
      this.visibility = "visible";
    }, 1000);
    this.$http
      .$get("kyjc_stationTransport/getPassengerTransportInfo")
      .then(data => {
        this.bc = data.shuttleCount;
        this.zbl = data.shuttleOntimeRate;
        this.szl = data.seatRate;
      });
    this.$http.$get("kyjc_stationTransport/getBaseInfo").then(data => {
      if (data) {
        this.kyzsl = data.stationTotal;
        this.kyxl = data.lineTotal;
        this.kycl = data.vehicleTotal;
        this.jyth = data.enterpriseTotal;
        this.cyry = data.personTotal;
        this.showdw = true;
      } else {
        this.kyzsl = "-";
        this.kyxl = "-";
        this.kycl = "-";
        this.jyth = "-";
        this.cyry = "-";
        this.showdw = false;
      }
    });
  },

  data() {
    return {
      srcbg: require("./img/dlys_yy_bg.png"),
      src1: require("./img/dlys_sjfb.png"),
      src2: require("./img/dlys_zbl.png"),
      src3: require("./img/dlys_szl.png"),
      src4: require("./img/dlys_jcxx_bg.png"),
      bc: 0,
      zbl: 0,
      szl: 0,
      showdw: true,
      kyzsl: 0,
      kyxl: 0,
      kycl: 0,
      jyth: 0,
      cyry: 0,

      rollNo: 902143,
      datevalue: "",
      pickerOptions: dateRang,
      visibility: "hidden"
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
  // background:rgba(0,0,0,1);
  border: 1px solid rgba(17, 46, 120, 0.2);
}

.comprehensiveMonitor-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  // 左边
  & > section {
    overflow: hidden;
  }
  .left > div {
    flex-basis: 0% !important;
  }
  .left {
    flex: 500;
    // @include flexLayOut;
    position: relative;
    // 左上
    .top {
      @include panelBg;
      flex: 650;
      position: relative;
    }
    // 左下
    .bottom {
      flex: 220;
      @include panelBg;
      position: relative;
      margin-top: 10px;
      .yyqk-wrapper {
        display: flex;
        margin-top: 10px;
        .item {
          flex: 1;
          position: relative;
          .bg {
            width: 100%;
            height: 100%;
          }
          .pic {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 30px;
            width: 50px;
            height: 50px;
          }
          h2 {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 80px;
            font-size: 16px;
          }
          p {
            position: absolute;
            width: 100%;
            // margin-top: 10px;
            text-align: center;
            top: 105px;
            font-size: 26px;
          }
        }
      }
    }
  }
  // 中部
  .mid > div {
    // flex-basis: 0% !important;
  }
  .mid {
    @include flexLayOut;
    flex: 830;
    margin: 0 10px;
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
          top: 22px;
        }
        .info-wrapper {
          .item {
            // position: absolute;
            top: 110px;
            height: 60px;
            width: 140px;
            // left: 36px;
            margin-top: 30px;
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
              top: 36px;
              font-size: 22px;
              margin-top: 10px;
              // span {
              //   font-size: 14px;
              // }
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
            left: 10px;
            p {
              color: #ffff00;
            }
          }
          .item2 {
            left: 166px;
            p {
              color: #ffff00;
            }
          }
          .item3 {
            left: 346px;
            p {
              color: #00ffff;
            }
          }
          .item4 {
            left: 516px;
            p {
              color: #00ffff;
            }
          }
          .item5 {
            left: 680px;
            p {
              color: #00ffff;
            }
          }
        }
      }
    }
    // 中下
    .bottom {
      @include panelBg;
      flex: 610;
      position: relative;
      // margin: 10px 0 0 0;
      // height: calc(100% - 50px);
    }
  }
  // 右边
  .right > div {
    flex-basis: 0% !important;
  }
  .right {
    @include flexLayOut;
    flex: 500;
    // 右上
    .top {
      flex: 366;
      position: relative;
      @include panelBg;
    }
    // 右中
    .mid {
      margin: 10px 0 0 0;
      flex: 211;
      @include panelBg;
    }
    // 右下
    .bottom {
      flex: 281;
      position: relative;
      margin-top: 10px;
      @include panelBg;
    }
  }
}
.date-float {
  position: fixed;
  right: 20px;
  top: 80px;
  visibility: hidden;
}
.bc {
  color: #ffff00;
}
.zbl {
  color: #01e9eb;
}
.szl {
  color: #01e9eb;
}
</style>