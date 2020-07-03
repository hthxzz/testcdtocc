<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="综合监测" :displaySwitch="false">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="item in roadList">
                <div class="item">
                  <div class="circle">
                    <span></span>
                  </div>
                  <p>1号线</p>
                </div>
              </swiper-slide>
              <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            </swiper>
          </PanelItem>
          <PanelItem title="2019断面客流排名" :displaySwitch="false"></PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap />
        </div>
      </template>
    </BaseLayoutContent>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  mounted() {},

  data() {
    return {
      roadList: ["1号线", "2号线", "3号线", "4号线", "5号线", "6号线"],
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 15,
        width: 60,
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        // Some Swiper option/callback...
        scrollbar: {
          hide: false
        }
        // autoplay: {
        //   delay: 3000
        // }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.jyyh,
.realTime {
  width: 100%;
  table {
    width: 100%;
    height: 66px;
    tr {
      th {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: normal;
        vertical-align: middle;
      }
      td {
        text-align: center;
        font-size: 24px;
        color: #00ffff;
        letter-spacing: 2px;
        vertical-align: bottom;
        font-family: "datafont";
        animation: turn 8s ease-in-out infinite;
      }
    }
  }
}
.line-detail-container {
  position: absolute;
  right: 410px;
  top: 10px;
}
.item {
  width: 50px;
  height: 50px;
  display: flex;
  background-color: #00ffff;
  justify-content: center;
  align-items: center;
  .circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
  p {
  }
}
</style>