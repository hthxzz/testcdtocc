<template>
  <div class="panel-title-container" v-if="show">
    <div class="wrap">
      <span class="pro"></span>
      <h2>{{title}}</h2>
      <span class="tip" :title="tip" v-if="isTip"></span>
      <span class="info" v-if="isShowDeatilBtn" @click="moreInfo"></span>
      <span class="panel-title-close" v-if="isShowCloseBtn" @click="close">x</span>
      <img
        src="../img/up_slide.png"
        v-if="displaySwitch"
        :style="{transform:rotate}"
        class="toggle"
        ref="toggle"
        @click="showPanel"
        alt
      />
      <!-- <div class="line1"></div>
      <div class="line2"></div>-->
    </div>

    <!-- <div class="line">
            <div class="cntent"></div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "panelTitle",
  props: {
    // 是否显示搜索 展开按钮
    displaySwitch: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索 展开按钮
    tip: {
      type: String,
      default: ""
    },

    // 标题
    title: {
      type: String,
      default: ""
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    isShowCloseBtn: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    isTip: {
      type: Boolean,
      default: false
    },
    // 是否显示详情按钮
    isShowDeatilBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rotate: ""
    };
  },
  methods: {
    //  触发关闭事件
    close() {
      this.$emit("close");
    },
    showPanel() {
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
  // border-bottom: 1px solid;
  // border-bottom-color:  rgba(32,86,221,.4)
  // border-bottom-color: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
  // border-image: linear-gradient(rgba(32,86,221,.6), rgba(32,86,221,.4)) 20 20;
  .wrap {
    // width: 4.1rem;
    // height: .47rem;
    display: flex;
    // max-width: 4.1rem;
    margin-top: 9px;
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
    .line1 {
      position: absolute;
      width: 145px;
      height: 2px;
      background-color: rgba(32, 86, 221, 1);
      bottom: -10px;
    }
    .line2 {
      position: absolute;
      width: calc(100% - 145px);
      left: 145px;
      height: 2px;
      background-color: rgba(32, 86, 221, 0.6);
      bottom: -10px;
    }
    .tip {
      width: 12px;
      height: 14px;
      position: relative;
      top: 5px;
      left: 6px;
      background: url("../img/trans.png") no-repeat;
      background-size: 100% 100%;
    }
    .panel-title-close {
      width: 12px;
      height: 14px;
      position: absolute;
      top: 5px;
      right: 6px;
      cursor: pointer;
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
      position: absolute;
      right: 30px;
      top: 3px;
      background: url("../img/more.png") no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .toggle {
      font-size: 12px;
      color: aliceblue;
      position: absolute;
      right: 0;
      cursor: pointer;
      transition: all 0.6s;
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