<template>
  <div class="pop-wrap" v-if="hide" :class="{hide:isHide}">
    <!-- 线路详情 -->
    <!-- <span class="close" @click="close">x</span> -->
    <verticesBorderStyle />
    <i class="el-icon-close close" @click="close"></i>
    <div class="pop-inner">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "popContainer",
  mounted() {},
  methods: {
    close() {
      this.hide = !this.hide;
      this.switchFullscreen(false);
    },
    ...mapMutations({
      switchFullscreen: "app/switchFullscreen" //
    })
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
.pop-wrap {
  position: relative;
  // width: 300px;
  background-color: rgba(7, 18, 49, 0.8);
  border-radius: 2px;
  transition: all 1.6s;
  border: 1px solid rgba(35, 94, 243, 0.4);
  .close {
    position: absolute;
    right: 10px;
    top: 11px;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.9);
    display: inline-block;
    cursor: pointer;
  }
  .pop-inner {
    // height: 100%;
    // width: 100%;
    background-color: rgba(32, 86, 221, 0.15);
    box-sizing: content-box;
    margin: 10px;
    padding: 20px;
  }
}
.hide {
  opacity: 0;
}
</style>