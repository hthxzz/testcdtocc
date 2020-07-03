<template>
  <div class="panel-title-container" v-if="show">
    <div class="wrap">
      <span class="pro"></span>
      <h2>{{title}}</h2>
      <span class="tip"></span>
      <span class="info" @click="moreInfo"></span>
      <img
        src="../../image/common/up_slide.png"
        v-if="displaySwitch"
        :style="{transform:rotate}"
        class="toggle"
        ref="toggle"
        @click="showPanel"
        alt
      />
    </div>

    <!-- <div class="line">
            <div class="cntent"></div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    displaySwitch: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rotate: ""
      // show: true
    };
  },
  methods: {
    showPanel() {
      console.log("aaaaaaaaa");
      if (this.rotate == "rotate(180deg)") {
        this.rotate = "rotate(0deg)";
      } else {
        this.rotate = "rotate(180deg)";
      }

      this.$emit("showPanel");
    },

    moreInfo() {
      this.$emit("moreInfo");
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-title-container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(32, 86, 221, 0.4);
  .wrap {
    // width: 4.1rem;
    // height: .47rem;
    display: flex;
    // max-width: 4.1rem;
    margin-top: 23px;
    margin-bottom: 8px;
    position: relative;
    .pro {
      width: 6px;
      height: 20px;
      // margin-left: .23rem;
      // margin-top: .23rem;
      display: inline-block;
      background: rgba(32, 86, 221, 1);
    }
    .tip {
      width: 12px;
      height: 14px;
      position: relative;
      top: 5px;
      left: 6px;
      //  margin-top: .23rem;
      //  margin-left: 10px;
      background: url("../../assets/index/index/trans.png") no-repeat;
      background-size: 100% 100%;
    }
    h2 {
      // width:1.52rem;
      // height:.19rem;
      // margin-top: .23rem;
      margin-left: 10px;
      display: inline-block;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      // line-height:30px;
    }
    .info {
      width: 23px;
      height: 5px;
      //  margin-top: .23rem;
      //  margin-right: 20px;
      position: absolute;
      right: 30px;
      top: 3px;
      background: url("../../assets/index/index/more.png") no-repeat;
      background-size: 100% 100%;
    }
    .toggle {
      font-size: 12px;
      color: aliceblue;
      position: absolute;
      right: 0;
      cursor: pointer;
    }
  }
  .line {
    width: 100%;
    margin-top: 8px;
    display: flex;
    .cntent {
      width: 370px;
      height: 1px;
      justify-content: center;
      margin-left: 14px;
      background: rgba(32, 86, 221, 1);
    }
  }
}
</style>