<template>
  <div class="average-speed-container">
    <div class="average-speed-wrap">
      <div class="average-speed-left" v-if="hasFocusROad">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="item in focusROadList">
            <v-chart :options="item" />
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
      <div class="no-data" v-else>
        <h2>没有添加关注路段拥堵指数到首页！</h2>
        <p @click="gotoAddIndex">现在去添加</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "",
  mounted() {
    // this.swiper.slideTo(3, 1000, false)
    this.roadTrafficIndexTop10();
  },
  methods: {
    gotoAddIndex() {
      this.$router.push({
        name: "monitoringAndEarlyWarning_roadNetworkRunMonitor_inforManage"
      });
    },
    roadTrafficIndexTop10() {
      this.$http.$get("lkfx_roadSpeedHandler/focusRoadIndexInfo").then(res => {
        for (const item of res) {
          this.focusROadList.push(
            this.$utils.echart.getGaugeOption(item.index, {
              title: {
                text: item.startEndName
              },
              series: [
                {
                  min: 0,
                  max: 10
                }
              ]
            })
          );
        }
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    hasFocusROad() {
      return this.focusROadList.length == 0 ? false : true;
    }
  },
  data() {
    return {
      focusROadList: [],
      swiperOptions: {
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        // Some Swiper option/callback...
        scrollbar: {
          hide: true
        },
        autoplay: {
          delay: 3000
        }
      },
      content: [
        { uid: _.uniqueId("tags"), tag: "一环" },
        { uid: _.uniqueId("tags"), tag: "二环" },
        { uid: _.uniqueId("tags"), tag: "三环" },
        { uid: _.uniqueId("tags"), tag: "绕城内" },
        { uid: _.uniqueId("tags"), tag: "绕城外" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.average-speed-container {
  .average-speed-wrap {
    .average-speed-left {
      overflow: hidden;
    }
  }
}
.echarts {
  min-height: 161px;
  // width: 200px;
  height: 100%;
}
.no-data {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  > h2 {
    // width: 100%;
  }
  p {
    cursor: pointer;
    margin-top: 20px;
    padding: 16px;
    color: #fff;
    border-radius: 6px;
    background-color: rgba(32, 86, 221, 1);
  }
}
</style>