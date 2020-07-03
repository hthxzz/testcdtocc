<template>
  <div class="map-data-center-container">
    <ul class="data_box">
      <li v-for="item in itemList" :key="item.id">
        <span class="data_name">{{ item.sub }}</span>
        <span class="unit" v-if="item.unite==''||item.unite==undefined"></span>
        <span class="unit" v-else>({{ item.unite }})</span>
        <div class="layer_cont">
          <!-- <div class="data_left"></div>
          <div class="data_right"></div>-->
          <!--亮色边角-->
          <div class="data data_bg">
            <span class="blue_data" v-if="/^[0-9]*$/.test(item.number)">
              <count-to :startVal="0" :endVal="item.number" :duration="4000" />
            </span>
            <span class="blue_data" v-else>{{item.number}}</span>

            <!-- <p>
              {{ item.rateUnite }} &nbsp;
              <span
                class="add"
                v-if="item.rate > 0"
              >+&nbsp;{{ item.rate }}%</span>
              <span class="reduce" v-if="item.rate < 0">&nbsp;{{ item.rate }}%</span>
              <span class="reduce" v-if="item.rate == ''">&nbsp;{{ item.rate }}%</span>
            </p>-->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mapDataCenterList",
  props: ["itemList"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.data_box li {
  display: block;
  float: left;
  list-style: none;
  margin-right: 10px;
  // background: rgba(32, 86, 221, 0.4);
  border-radius: 2px;
  // border: 1px solid rgb(32, 86, 221);
  // border-top: 0px;
}
.data_name {
  font-size: 14px;
  color: rgba(255,255,255,1);
  text-align: center;
  display: block;
  margin-bottom: 12px;
  display: inline-block;
}
.layer_cont {
  position: relative;
  border-radius: 4px;
  // margin-top: 5px;
  background: url(../img/top_data_bg.png) center no-repeat;
  /*background-size: 100%;*/
  height: 60px;
  line-height: 60px;
  padding: 0px 20px;
  animation: turn 14s ease-in-out;
}
.data_left,
.data_right {
  position: absolute;
  width: 50px;
  height: 80px;
  background-size: 100% 100%;
}
.data_left {
  left: -6px;
  background: url(./../img/left_data.png) 0px center no-repeat;
}
.data_right {
  right: -6px;
  background: url(./../img/right_data.png) 0px center no-repeat;
}
.data_bg span {
  font-weight: bold;
  font-size: 36px;
  letter-spacing: 3px;
  font-family: "datafont";
}
.data_bg span.cut {
  font-size: 12px;
  color: #fff;
  font-family: "Microsoft YaHei";
}
span.unit {
  display: inline-block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.data {
  font-size: 24px;
  text-align: center;
}
.data p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin: 0px;
  margin-top: 1px;
}
.data p span {
  font-size: 14px;
}
.yellow {
  color: #ffff00;
  font-size: 24px;
}
.blue_data {
  color: #00ffff;
  text-align: center;
}
.red,
.add {
  color: #ff0000;
}
.reduce {
  color: #00ff00;
}
.data_box li .layer_cont {
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transition: 0.4s;
  -webkit-transition: 0.4s;
  -ms-transition: 0.4s;
  -moz-transition: 0.4s;
  animation: turn 10s ease-in-out infinite;
  -webkit-animation: turn 10s ease-in-out infinite;
  -moz-animation: turn 10s ease-in-out infinite;
}
@keyframes turn {
  0% {
    transform: translateZ(0px) rotateX(0deg);
    -webkit-transform: translateZ(0px) rotateX(0deg);
    -ms-transform: translateZ(0px) rotateX(0deg);
    -moz-transform: translateZ(0px) rotateX(0deg);
  }
  25% {
    transform: translateZ(30px) rotateX(360deg);
    -webkit-transform: translateZ(30px) rotateX(360deg);
    -ms-transform: translateZ(30px) rotateX(360deg);
    -moz-transform: translateZ(30px) rotateX(360deg);
  }
  50% {
    transform: translateZ(30px) rotateX(360deg);
    -webkit-transform: translateZ(30px) rotateX(360deg);
    -ms-transform: translateZ(30px) rotateX(360deg);
    -moz-transform: translateZ(30px) rotateX(360deg);
  }

  75% {
    transform: translateZ(30px) rotateX(360deg);
    -webkit-transform: translateZ(30px) rotateX(360deg);
    -ms-transform: translateZ(30px) rotateX(360deg);
    -moz-transform: translateZ(30px) rotateX(360deg);
  }
  100% {
    transform: translateZ(30px) rotateX(360deg);
    -webkit-transform: translateZ(30px) rotateX(360deg);
    -ms-transform: translateZ(30px) rotateX(360deg);
    -moz-transform: translateZ(30px) rotateX(360deg);
  }
}

@keyframes xuanzh {
  10% {
    margin-top: 0px;
  }
  25% {
    margin-top: 5px;
  }
  50% {
    margin-top: 0px;
  }
  75% {
    margin-top: 10px;
  }
  100% {
    margin-top: 0px;
  }
}
// @font-face {
//   font-family: "datafont";
//   src: url("./../font/KizoLight.ttf") format("truetype");
// }
</style>