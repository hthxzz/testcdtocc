<template>
  <div class="rollNumber-container">
    <div class="rollNumber-wrap">
      <!-- <label for>{{ title }}</label> -->
      <div class="number rubberBand animated">
        <div class="item" v-for="item in numberList">
          <!-- {{ item }} -->
        </div>
        <count-to :startVal="0" :endVal="value" separator :duration="5000" />
      </div>
      <label for>辆</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleTotalNumber",
  props: {
    title: {},
    value: {
      type: Number,
      default: 0
    },
    unit: {}
  },
  computed: {
    numberList() {
      return String(this.value).split("");
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.rollNumber-container {
  .rollNumber-wrap {
    display: flex;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    label {
      font-size: 14px;
      color:rgba(255,255,255,.6);
    }
    .number {
      animation-delay: 5.3s;
      animation-iteration-count: 3;
      margin-left: -4px;
      display: flex;
      position: relative;
      .item {
        font-size: 36px;
        text-align: center;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 0, 1);
        /*line-height:30px;*/
        text-shadow: 0px 5px 0px rgba(0, 0, 0, 0.35);
        background-image: url(./../../../../../image/common/big_data_bg.png);
        font-weight: 400;
        margin-left: 1px;
        color: rgba(255, 255, 0, 1);
        /*line-height:30px;*/
        width: 40px;
        height: 40px;
        box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.35);
        text-shadow: 0px 5px 0px rgba(0, 0, 0, 0.35);
        // box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);
        border-radius: 8px;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
<style  scoped>
.number >>> span {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 40px;
  color: yellow;
  letter-spacing: 17px;
  margin-left: 11px;
}
</style>