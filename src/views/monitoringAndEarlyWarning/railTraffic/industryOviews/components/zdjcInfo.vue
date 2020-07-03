<template>
  <div class="lineDetail-wrap rotateInDownRight animated" v-if="hide" :class="{hide:isHide}">
    <!-- 线路详情 -->
    <!-- <span class="close" @click="close">x</span> -->
    <i class="el-icon-close close" @click="close"></i>
    <div class="lineDetail-inner">
      <table>
        <tr>
          <th>线路名称</th>
          <td class="line_name">{{content.lineName}}</td>
        </tr>
        <tr>
          <th>营运里程</th>
          <td>
            <count-to :startVal="0" :endVal="content.mileage" :duration="2000" />
            <span class="unit">公里</span>
          </td>
        </tr>
        <tr>
          <th>营运里程占比</th>
          <td>
            {{content.mileageProp}}
            <span class="unit">%</span>
          </td>
        </tr>
        <tr>
          <th width="40%">线路客流</th>
          <td width="60%">
            <count-to :startVal="0" :endVal="content.linePassengerFlow" :duration="4000" />
            <span class="unit">人次</span>
          </td>
        </tr>
        <tr>
          <th>线路客流占比</th>
          <td>
            {{content.passengerFlowProp}}
            <span class="unit">%</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  // props: ["content"],
  mounted() {
    this.getLineStaticInfo();
    this.addHide();
  },
  beforeDestroy() {
    this.disInterv();
  },
  methods: {
    disInterv() {
      if (this.auto) {
        window.clearInterval(this.auto);
      }
    },
    addHide() {
      let i = 1,
        linecode = ["01", "02", "03", "04", "05", "07", "10"];
      this.auto = setInterval(() => {
        if (i == 6) {
          i = 0;
        }
        this.getLineStaticInfo(linecode[i]);

        i++;
      }, 6000);
    },
    close() {
      this.hide = !this.hide;
    },
    getLineStaticInfo(lineCode) {
      this.hide = false;
      this.$http
        .$get("gdjc_runMonitorHandler/getLineStaticInfo", {
          lineCode: lineCode || "01"
        })
        .then(res => {
          this.content = res;
          this.hide = true;
        });
    }
  },
  data() {
    return {
      content: {},
      hide: true,
      isHide: false
    };
  }
};
</script>

<style lang="scss" scoped>
.lineDetail-wrap {
  position: relative;
  width: 300px;
  background-color: rgba(7, 18, 49, 0.8);
  border-radius: 2px;
  transition: all 1.6s;
  border: 2px solid rgba(35, 94, 243, 0.4);
  .close {
    position: absolute;
    right: 10px;
    top: 11px;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.9);
    display: inline-block;
    cursor: pointer;
  }
  .lineDetail-inner {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
  table {
    padding-top: 20px;
    width: 100%;
    tr {
      line-height: 36px;
      td:not(.line_name) {
        text-align: left;
        font-size: 24px;
        // font-family: "datafont";
        color: #00ffff;
        span.unit {
          font-size: 14px;
          color: #fff;
        }
      }
      th {
        text-align: left;
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
}
.hide {
  opacity: 0;
}
</style>