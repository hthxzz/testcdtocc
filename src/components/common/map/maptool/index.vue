<template>
  <div class="MapTool-wrapper tool">
    <ul class="menu">
      <li>
        <span :class="{activeLayer:!showImg}">工具</span>
        <img :src="src2" v-if="showImg" class="toggle active" @click="showImgStatus" />
        <img :src="src1" v-if="!showImg" class="toggle" @click="showImgStatus" />
        <ul class="submenu" @click="selectLayers">
          <li v-for="item in mapToolList" :key="item">
            <a href="javascript:void(0)">{{item}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "MapTool",
  props: ["mapToolList"],
  mounted() {
    this.activeFirstEle();
  },
  methods: {
    // 激活第一个元素
    activeFirstEle() {
      $(".submenu > li")
        .first()
        .addClass("active-layer");
    },
    // 切换图片按钮
    showImgStatus() {
      this.showImg = !this.showImg;
    },
    // 激活图层
    selectLayers(e) {
      let $target = $(e.target);
      let text = $target.text();
      let $e = $(e.target).parent();
      if ($e.hasClass("active-layer")) {
        $e.removeClass("active-layer");
        this.$emit("activeLayer", {
          text: text,
          isActive: false
        });
      } else {
        $e.addClass("active-layer");
        this.$emit("activeLayer", {
          text: text,
          isActive: true
        });
      }
    }
  },
  data() {
    return {
      showImg: false,
      t1: "进港",
      t2: "出港",
      src1: require("../img/gjl.png"),
      src2: require("../img/gjl_ed.png"),
      kyz: require("../img/kyz.png"),
      sfz: require("../img/sfz.png")
    };
  }
};
</script>

<style lang="scss" scoped>
.MapTool-wrapper {
  height: 200px;
  // width: 200px;
  //   position: absolute;
  //   top: 250px;
  //   right: 1200px;
  img {
    width: 90px;
    height: 30px;
    cursor: pointer;
    float: right;
    border-radius: 5px;
    margin-bottom: 6px;
  }
  img:first-child:not(.active) {
    background: rgba(255, 255, 255, 0.8);
    float: right;
  }
}

.menu {
  height: 58px;
}
ul {
  // width: 200px;
}
ul > li {
  list-style: none;
}
.submenu li {
  // background: -moz-linear-gradient(#292929, #252525);
  // background: -ms-linear-gradient(#292929, #252525);
  // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #292929), color-stop(100%, #252525));
  // background: -webkit-linear-gradient(#292929, #252525);
  // background: -o-linear-gradient(#292929, #252525);
  // filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#292929', endColorstr='#252525');
  // -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#292929', endColorstr='#252525')";
  // background: linear-gradient(#292929, #252525);
  background-color: #123087;
  border-bottom: 2px solid #123087;
  border-top: 2px solid #123087;
  // min-width: 160px;
}
.menu > li {
  display: block;
  float: left;
  width: 90px;
  position: relative;
}
.menu > li > span {
  position: absolute;
  color: #fff;
  left: 11px;
  top: 9px;
  font-size: 16px;
}
.menu > li:first-child {
  border-radius: 5px 0 0;
}
.menu a {
  border-left: 3px solid rgba(0, 0, 0, 0);
  color: #fff;
  display: block;
  font-family: "Lucida Console";
  padding-left: 10px;
  text-decoration: none;
  text-transform: uppercase;
}

/* onhover styles */
.submenu li:hover {
  background-color: rgba(3, 222, 243, 0.4);
}
.menu li:hover > a {
  border-radius: 5px 0 0 0;
}

.submenu {
  left: 0;
  max-height: 0;
  position: absolute;
  top: 100%;
  z-index: 0;

  -webkit-perspective: 400px;
  -moz-perspective: 400px;
  -ms-perspective: 400px;
  -o-perspective: 400px;
  perspective: 400px;
}
.submenu li {
  width: 90px;
  opacity: 1;
  border-bottom: 1px solid #134fa6;
  -webkit-transform: rotateY(90deg);
  -moz-transform: rotateY(90deg);
  -ms-transform: rotateY(90deg);
  -o-transform: rotateY(90deg);
  transform: rotateY(90deg);

  -webkit-transition: opacity 0.4s, -webkit-transform 0.5s;
  -moz-transition: opacity 0.4s, -moz-transform 0.5s;
  -ms-transition: opacity 0.4s, -ms-transform 0.5s;
  -o-transition: opacity 0.4s, -o-transform 0.5s;
  transition: opacity 0.4s, transform 0.5s;
}
.menu .submenu li:hover a {
  border-radius: 0;
  color: #ffffff;
}

.active-layer a {
  // border-left: 3px solid rgba(3, 222, 243, 1);
  border-radius: 0;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  color: #ffffff;
}
.active-layer {
  background-color: rgba(3, 222, 243, 0.6) !important;
}
.activeLayer {
  color: #00ffff !important;
}
// .menu > li:hover .submenu {
//     max-height: 2000px;
//     z-index: 10;
// }
.menu > li > .active + .submenu li {
  display: flex;
  align-items: center;
  font-size: 14px;
  opacity: 1;
  height: 30px;
  -webkit-transform: none;
  -moz-transform: none;
  -ms-transform: none;
  -o-transform: none;
  transform: none;
}

/* CSS3 delays for transition effects */
.menu li:hover .submenu li:nth-child(1) {
  -webkit-transition-delay: 0s;
  -moz-transition-delay: 0s;
  -ms-transition-delay: 0s;
  -o-transition-delay: 0s;
  transition-delay: 0s;
}
.menu li:hover .submenu li:nth-child(2) {
  -webkit-transition-delay: 50ms;
  -moz-transition-delay: 50ms;
  -ms-transition-delay: 50ms;
  -o-transition-delay: 50ms;
  transition-delay: 50ms;
}
.menu li:hover .submenu li:nth-child(3) {
  -webkit-transition-delay: 100ms;
  -moz-transition-delay: 100ms;
  -ms-transition-delay: 100ms;
  -o-transition-delay: 100ms;
  transition-delay: 100ms;
}
.menu li:hover .submenu li:nth-child(4) {
  -webkit-transition-delay: 150ms;
  -moz-transition-delay: 150ms;
  -ms-transition-delay: 150ms;
  -o-transition-delay: 150ms;
  transition-delay: 150ms;
}
.menu li:hover .submenu li:nth-child(5) {
  -webkit-transition-delay: 200ms;
  -moz-transition-delay: 200ms;
  -ms-transition-delay: 200ms;
  -o-transition-delay: 200ms;
  transition-delay: 200ms;
}
.menu li:hover .submenu li:nth-child(6) {
  -webkit-transition-delay: 250ms;
  -moz-transition-delay: 250ms;
  -ms-transition-delay: 250ms;
  -o-transition-delay: 250ms;
  transition-delay: 250ms;
}
.menu li:hover .submenu li:nth-child(7) {
  -webkit-transition-delay: 300ms;
  -moz-transition-delay: 300ms;
  -ms-transition-delay: 300ms;
  -o-transition-delay: 300ms;
  transition-delay: 300ms;
}
.menu li:hover .submenu li:nth-child(8) {
  -webkit-transition-delay: 350ms;
  -moz-transition-delay: 350ms;
  -ms-transition-delay: 350ms;
  -o-transition-delay: 350ms;
  transition-delay: 350ms;
}

.submenu li:nth-child(1) {
  height: 40px;
  -webkit-transition-delay: 350ms;
  -moz-transition-delay: 350ms;
  -ms-transition-delay: 350ms;
  -o-transition-delay: 350ms;
  transition-delay: 350ms;
}
.submenu li:nth-child(2) {
  -webkit-transition-delay: 300ms;
  -moz-transition-delay: 300ms;
  -ms-transition-delay: 300ms;
  -o-transition-delay: 300ms;
  transition-delay: 300ms;
}
.submenu li:nth-child(3) {
  -webkit-transition-delay: 250ms;
  -moz-transition-delay: 250ms;
  -ms-transition-delay: 250ms;
  -o-transition-delay: 250ms;
  transition-delay: 250ms;
}
.submenu li:nth-child(4) {
  -webkit-transition-delay: 200ms;
  -moz-transition-delay: 200ms;
  -ms-transition-delay: 200ms;
  -o-transition-delay: 200ms;
  transition-delay: 200ms;
}
.submenu li:nth-child(5) {
  -webkit-transition-delay: 150ms;
  -moz-transition-delay: 150ms;
  -ms-transition-delay: 150ms;
  -o-transition-delay: 150ms;
  transition-delay: 150ms;
}
.submenu li:nth-child(6) {
  -webkit-transition-delay: 100ms;
  -moz-transition-delay: 100ms;
  -ms-transition-delay: 100ms;
  -o-transition-delay: 100ms;
  transition-delay: 100ms;
}
.submenu li:nth-child(7) {
  -webkit-transition-delay: 50ms;
  -moz-transition-delay: 50ms;
  -ms-transition-delay: 50ms;
  -o-transition-delay: 50ms;
  transition-delay: 50ms;
}
.submenu li:nth-child(8) {
  -webkit-transition-delay: 0s;
  -moz-transition-delay: 0s;
  -ms-transition-delay: 0s;
  -o-transition-delay: 0s;
  transition-delay: 0s;
}
</style>