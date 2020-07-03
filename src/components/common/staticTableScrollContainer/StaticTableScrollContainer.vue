<template>
  <div class="static-table-scroll-container" :class="[dynamiContainer]" ref="dynamiContainer">
    <div class="static-table-scroll-wrap" :class="[dynamicWrap]" ref="dynamicWrap">
      <slot></slot>
    </div>
    <!-- <div class="testtran"></div> -->
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "StaticTableScrollContainer",
  props: {
    //   默认一次向上滚动60px
    stepLength: {
      type: Number,
      default: 60
    },
    //   默认刷新频率
    time: {
      type: Number,
      default: 5200
    }
  },
  beforeCreate() {
    _.uniqueId("staticTable-");
  },
  methods: {
    autoScroll() {
      let containerHeight = this.$refs.dynamiContainer.getBoundingClientRect()
        .height;
      let wrapHeight = this.$refs.dynamicWrap.getBoundingClientRect().height;
      let distance = wrapHeight - containerHeight;
      let minTop = -this.stepLength;
      this.StaticTableTime = setInterval(() => {
        this.$refs.dynamicWrap.style.top = minTop + "px";
        minTop = minTop - this.stepLength;
        let containerHeight = this.$refs.dynamiContainer.getBoundingClientRect()
          .height;
        let wrapHeight = this.$refs.dynamicWrap.getBoundingClientRect().height;
        distance = wrapHeight - containerHeight;
        if (-minTop > distance + 50) {
          minTop = -this.stepLength;
        }
      }, 3000);
    }
  },
  mounted() {
    this.autoScroll();
    // let stepLengthinner = this.stepLength,
    //   timeinner = this.time,
    //   containerHeight = document
    //     .querySelector(`.${this.dynamiContainer}`)
    //     .getBoundingClientRect().height,
    //   wrapHeight = document
    //     .querySelector(`.${this.dynamicWrap}`)
    //     .getBoundingClientRect().height,
    //   minTop = undefined,
    //   distance = 0;
    // this.$nextTick(() => {
    //   wrapHeight = document
    //     .querySelector(`.${this.dynamicWrap}`)
    //     .getBoundingClientRect().height;
    //   minTop = wrapHeight - containerHeight + 20;
    //   console.log(wrapHeight);
    // });
    // this.StaticTableTime = setInterval(
    //   () => {
    //     console.log(this.dynamicWrap);

    //     if (distance > -minTop) {
    //       document.querySelector(`.${this.dynamicWrap}`).style.top =
    //         distance + "px";
    //     } else {
    //       distance = 0;
    //       document.querySelector(`.${this.dynamicWrap}`).style.top =
    //         distance + "px";
    //     }

    //     distance = distance - stepLengthinner;
    //   },
    //   timeinner,
    //   stepLengthinner,
    //   distance
    // );
  },
  beforeDestroy() {
    // 销毁定时器
    clearInterval(this.StaticTableTime);
  },
  data() {
    return {
      dynamiContainer: _.uniqueId("static-table-scroll-container-"),
      dynamicWrap: _.uniqueId("static-table-scroll-wrap-"),
      //   定时器句柄
      StaticTableTime: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.static-table-scroll-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top:20px;
  .static-table-scroll-wrap {
    overflow: hidden;
    position: absolute;
    width: 100%;
    transition: all 3s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    position: absolute;
    top: 0;
  }
}
</style>