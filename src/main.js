import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import ElementUI from 'element-ui';
import ECharts from 'vue-echarts';
import './untils/rem.js';
// import './untils/element-variables.scss';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/css/swiper.css';
// import 'animate/animate.css';
import './style/common.scss';
import './style/reset.css';
import './untils/color-theme.js';
import './test/china2.js';
import './test/chengqu.js';
import './untils/componentRegister.js'
import "./directive/relativeEleSize.js";
import vueVideoPlayer from "vue-video-player";
import "videojs-flash";
import "videojs-contrib-hls";
import store from './store/index.js'
import request from "./request/axios.js";
import {
  Mock
} from "./mock/mock";
import 'video.js/dist/video-js.css';
import countTo from 'vue-count-to';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import daysjs from "dayjs";
// 重置浏览器默认样式
// 全局组件注册
// import VerticesBorderStyle from "./components/common/verticesBorderStyle.vue";
// import panel from "./components/common/panel.vue";
import getOption from "./components/businessComponent/echarOption/setEcharOption";
import BaseLayoutContent from "./views/layOut/BaseLayoutContent.vue";
Vue.use(vueVideoPlayer);
Vue.component('BaseLayoutContent', BaseLayoutContent);
Vue.config.productionTip = false
Vue.prototype.$http = request;
const $utils = {};
import {
  setOptionSize
} from "@/untils/rem.js";
$utils.echart = getOption;
$utils.dayjs = daysjs;
$utils.setSize = setOptionSize;
$utils.getNum = (min, max, len, isInteger) => {
  const arr = [];
  while (arr.length < len || arr.length == len) {
    if (arr.length == len) {
      return arr
    } else {
      arr.push(getRandom(min, max, len, isInteger));
    }
  }
};
const getRandom = (min, max) => {
  let num = (Math.random() * max).toFixed(0);
  while (num > min) {
    return num;
  }
}
Vue.prototype.$utils = $utils;

Vue.prototype.$Mock = Mock;
Vue.component('v-chart', ECharts);
Vue.component('countTo', countTo);

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')