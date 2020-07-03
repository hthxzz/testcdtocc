<template>
  <div class="lineDetail-wrap lightSpeedIn" v-if="hide" :class="{hide:isHide}">
    <!-- 线路详情 -->
    <popContainer ref="popContainer">
      <i class="el-icon-close close" @click="close"></i>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <!-- <i class="el-icon-close close" @click="close"></i> -->
          <div class="lineDetail-inner">
            <table>
              <tr>
                <th class="t_label">购车日期:</th>
                <td class="t_content">{{baseInfo&&baseInfo.purchaseDate}}</td>
                <th class="t_label">标台系数:</th>
                <td class="t_content">{{baseInfo&&baseInfo&&baseInfo&&baseInfo.typicalCoefficient}}</td>
              </tr>
              <tr>
                <th class="t_label">车身颜色:</th>
                <td class="t_content">{{baseInfo&&baseInfo.bodyColor}}</td>
                <th class="t_label">GPS编号:</th>
                <td class="t_content">{{baseInfo&&baseInfo.gpsId}}</td>
              </tr>
              <tr>
                <th class="t_label">厂牌型号:</th>
                <td class="t_content">{{baseInfo&&baseInfo.brandModel}}</td>
                <th class="t_label">落户日期:</th>
                <td class="t_content">{{baseInfo&&baseInfo.settleDate | capitalize}}</td>
              </tr>
              <tr>
                <th class="t_label">出厂日期:</th>
                <td class="t_content">{{baseInfo&&baseInfo.manuDate | capitalize}}</td>
                <th class="t_label">使用年限:</th>
                <td class="t_content">{{baseInfo&&baseInfo.serviceTerm}}</td>
              </tr>
              <tr>
                <th class="t_label">车辆车高(mm):</th>
                <td class="t_content">{{baseInfo&&baseInfo.vehicleHeight}}</td>
                <th class="t_label">行驶里程:</th>
                <td class="t_content">{{baseInfo&&baseInfo.operaDistance}}</td>
              </tr>
              <tr>
                <th class="t_label">首次登记日期:</th>
                <td class="t_content">{{baseInfo&&baseInfo.registerDate | capitalize}}</td>
                <th class="t_label">车辆号牌:</th>
                <td class="t_content">{{baseInfo&&baseInfo.vehiclePlateNum}}</td>
              </tr>
              <tr>
                <th class="t_label">发动机功率:</th>
                <td class="t_content">{{baseInfo&&baseInfo.enginePower}}</td>
                <th class="t_label">车辆车长(mm):</th>
                <td class="t_content">{{baseInfo&&baseInfo.vehicleLength}}</td>
              </tr>
              <tr>
                <th class="t_label">车辆车宽(mm):</th>
                <td class="t_content">{{baseInfo&&baseInfo.vehicleWidth}}</td>
                <th class="t_label">燃料消耗量:</th>
                <td class="t_content">{{baseInfo&&baseInfo.fuelConsum}}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="运营信息" name="second">暂无数据</el-tab-pane>
        <el-tab-pane label="车载视频" name="third">暂无数据</el-tab-pane>
        <el-tab-pane label="驾驶人员" name="fourth">暂无数据</el-tab-pane>-->
      </el-tabs>
    </popContainer>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: ["baseInfo"],
  filters: {
    capitalize: value => {
      return value && dayjs(parseInt(value)).format("YYYY-MM-DD");
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    close() {
      this.hide = false;
    },
    open() {
      this.hide = true;
      // this.$utils.dayjs(parseInt(cellValue)).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      activeName: "first",
      ddlk: 1600,
      fslk: 1500,
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
  width: 550px;
  background-color: rgba(7, 18, 49, 0.8);
  border-radius: 2px;
  transition: all 1.6s;
  // border: 2px solid rgba(35, 94, 243, 0.4);
  animation-duration: 0.6s;
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
      td {
        text-align: left;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
      th {
        text-align: left;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
}
.hide {
  opacity: 0;
}
.t_label {
}
.t_content {
}
</style>