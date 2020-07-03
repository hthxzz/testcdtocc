<template>
  <div class="qyts-wrapper">
    <div class="item item2">
      <p>6</p>
      <h2>脱离线路</h2>
    </div>
    <div class="item item3">
      <p>13456</p>
      <h2>跨区域运行</h2>
    </div>
    <div class="item item4">
      <p>6</p>
      <h2>疑似班线客运</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      src1: require("../../img/zhjc_hb_hbyw_bg.png")
    };
  }
};
</script>

<style lang="scss" scoped>
.qyts-wrapper {
  background-size: 100% 100%;
  height: 86%;
  background: url("../../img/zhjc_hb_hbyw_bg.png") no-repeat;
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
      font-size: 26px;
      font-weight: bolder;
    }
    h2 {
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .item1 {
    top: 36px;
    left: 130px;
  }
  .item2 {
    top: 16px;
    right: 50px;
    @include linearGradient(70px, 70px, 180deg, #933ff1, #640fca);
  }
  .item3 {
    bottom: 40px;
    left: 10px;
    @include linearGradient(100px, 100px, 180deg, #01f0f6, #0944a2);
  }
  .item4 {
    right: 96px;
    bottom: 40px;
    @include linearGradient(90px, 90px, 180deg, #fe616f, #e30972);
  }
}
</style>