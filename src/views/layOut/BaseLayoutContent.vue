<template>
  <div class="base-layout-content-container">
    <div
      class="left-panel panel"
      :class="{full : isFullscreen}"
      :style="{left:leftdistance + 'px'}"
    >
      <slot name="leftPanel"></slot>
    </div>
    <div class="mid-content">
      <slot name="midContent"></slot>
    </div>
    <div
      class="right-panel panel"
      :class="{full : isFullscreen}"
      :style="{right:leftdistance + 'px'}"
    >
      <slot name="rightPanel"></slot>
    </div>
    <div class="full-btn" @click="setFullPageStatus" :style="{right:rightdistance + 'px'}">
      <!-- <div class="full-btn" @click="fullPage" :style="{right:rightdistance + 'px'}"> -->
      <img src="./fullPage.png" alt />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { setOptionSize } from "@/untils/rem.js";
export default {
  name: "BaseLayoutContent",
  computed: mapState({
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    isFullscreen(state) {
      return state.app.isFullscreen;
    },
    opened(state) {
      return state.app.sidebar.opened;
    }
  }),
  watch: {
    isFullscreen() {
      this.$store.dispatch("app/toggleSideBar");
      this.fullPage();
    },
    opened(val) {
      var nomapContentContainer = document.querySelector(
        ".nomap-content-container"
      );
      if (nomapContentContainer && !val) {
        nomapContentContainer.style.left = "60px";
      }
      if (!this.isFullscreen) {
        if (val) {
          this.leftdistance = this.initDistance;
        } else {
          this.leftdistance = setOptionSize(60);
        }
      }
      // this.$store.dispatch("app/toggleSideBar");
      // this.fullPage();
    }
  },
  mounted() {
    let leftPanelWidth = document
      .querySelector(".left-panel")
      .getBoundingClientRect().width;
    let rightPanelWidth = document
      .querySelector(".right-panel")
      .getBoundingClientRect().width;
    let containerWidth = document
      .querySelector(".base-layout-content-container")
      .getBoundingClientRect().width;
    document.querySelector(".left-panel").style.maxWidth =
      leftPanelWidth + "px";
    document.querySelector(".right-panel").style.maxWidth =
      rightPanelWidth + "px";
    this.containerWidth = containerWidth;
    this.rightPanelWidth = rightPanelWidth;
    // this.leftPanelWidth = -leftPanelWidth - 150;
    this.rightdistance = rightPanelWidth + 20;
  },
  methods: {
    ...mapMutations({
      switchFullscreen: "app/switchFullscreen" //
    }),
    // 点击按钮切换是否全屏
    setFullPageStatus() {
      if (!this.isFullscreen) {
        this.switchFullscreen(true);
      } else {
        this.switchFullscreen(false);
      }
      // this.fullPage();
    },
    fullPage() {
      debugger;
      // this.$emit("isFullPage", !this.isFullscreen);
      if (this.isFullscreen) {
        this.rightdistance = 20;
        this.leftdistance = -500;
        // this.leftdistance = this.leftPanelWidth;
      } else {
        this.rightdistance = this.rightPanelWidth;
        this.leftdistance = this.initDistance;
      }
    }
  },
  data() {
    return {
      isFull: false,
      containerWidth: 0,
      leftdistance: setOptionSize(210),
      rightdistance: 410,
      initDistance: setOptionSize(210)
    };
  }
};
</script>

<style lang="scss" scoped>
.base-layout-content-container {
  width: 100%;
  height: 100%;
  position: relative;
  // display: flex;
  .panel {
    transition: all 0.6s;
    position: absolute;
    height: calc(100% - 40px);
    z-index: 6;
    top: 40px;
    width: 410px;
  }
  .left-panel {
    // flex: 410;
    position: absolute;
    left: 0;
  }
  .mid-content {
    position: relative;
    top: 0;
    height: 100%;
    left: 0;
    flex: 1011;
    // border: $base-border;
    transition: all 0.6s;
    transition-timing-function: linear;
  }
  .right-panel {
    position: absolute;
    right: -9px !important;
  }
}
.full-btn {
  position: absolute;
  bottom: 2px;
  right: 430px;
  cursor: pointer;
  z-index: 999;
  transition: all 0.6s;
  img {
    width: 32px;
    height: 32px;
  }
}
.full {
  max-width: 0 !important;
  width: 0;
}
</style>