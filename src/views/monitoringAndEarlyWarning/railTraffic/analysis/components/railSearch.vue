<template>
  <div class="railSearch-wrap">
    <div class="search">
      <el-select
        v-model="searchData.frequency"
        placeholder="请选择"
        @change="changeDate"
        style="width:90px"
      >
        <el-option
          v-for="item in searchoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="date-wrapper">
        <el-date-picker
          v-model="searchData.staticDate"
          :type="type"
          placeholder="选择年"
          :value-format="valueFormate"
        ></el-date-picker>
      </div>
      <!-- <div class="btn-wrapper">
        <el-button size="mini" class="table-detail-btn search-detail" @click="handleSearch()">查询</el-button>
      </div>-->
    </div>
    <div class="swiperClass">
      <swiper
              ref="mySwiper"
              :options="swiperOptions"
              @slideChangeTransitionEnd="slideChangeTransitionEnd"
      >
        <swiper-slide v-for="item in roadList" :key="item.name">
          <div class="item">
            <div class="circle" :style="{borderColor:item.color}"></div>
            <p :data-lineCode="item.lineCode">{{item.lineName}}</p>
          </div>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->

      </swiper>
    </div>

    <div class="swiper-button-prev"></div>
    <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <div class="swiper-button-next"></div>
    <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->

    <div class="festvil-wrap">
      <ChangeTag :itemList="itemList" @getStatues="getStatues" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "",
  mounted() {
    this.initial();
    console.log(this.$refs.mySwiper);
  },
  watch: {
    // 监测到搜索值变化时向上一级发送搜索值
    searchData: {
      handler(newData) {
        this.$emit("getSearchVal", newData);
      },
      deep: true
    }
  },
  methods: {
    slideChangeTransitionEnd() {
      let lineCode = $(".swiper-slide-active .item p").data("linecode");
      if (lineCode) {
        this.searchData.lineCode = lineCode;
      }
    },
    getLine() {
      this.$http.$get("gdjc_infoManagerHandler/getLine").then(res => {
        const colors = {
          "01": "rgba(26, 117, 209,1)",
          "02": "rgb(238, 121, 26)",
          "03": "rgb(238, 75, 129)",
          "04": "rgb(68, 209, 53)",
          "05": "rgb(190, 81, 169)",
          "07": "rgb(118, 214, 222)",
          "10": "rgb(108, 105, 236)"
        };
        var items=[{lineCode:'',lineName:'全部线路'}];
        for (const item of res) {
          item["color"] = colors[item.lineCode];
          items.push(item);
        }

        this.roadList = items;
      });
    },
    getStatues(val) {
      this.searchData.isWorkDay = val.code;
    },
    initial() {
      this.searchData.staticDate = this.$utils.dayjs().format("YYYY");
      this.getLine();
    },
    changeDate(a) {
      if (a == "年") {
        this.type = "year";
        this.valueFormate = "yyyy";
        this.searchData.staticDate = this.$utils.dayjs().format("YYYY");
        //     this.startTime = this.$utils.dayjs().format("YYYY");
        //     this.endTime = this.$utils.dayjs().format("YYYY");
      }
      if (a == "月") {
        this.type = "month";
        this.valueFormate = "yyyy-MM";
        this.searchData.staticDate = this.$utils.dayjs().format("YYYY-MM");
        //     this.startTime = this.$utils.dayjs().format("YYYY-MM");
        //     this.endTime = this.$utils.dayjs().format("YYYY-MM");
      }
      if (a == "day") {
        this.type = "date";
        this.valueFormate = "yyyy-MM-dd";
        this.searchData.staticDate = this.$utils.dayjs().format("YYYY-MM-DD");
        // this.startTime = this.$utils.dayjs().format("YYYY-MM-DD");
        // this.endTime = this.$utils.dayjs().format("YYYY-MM-DD");
      }
    }
  },
  data() {
    return {
      itemList: [
        { code: "工作日", value: "工作日" },
        { code: "非工作日", value: "非工作日" }
      ],
      searchData: {
        frequency: "年",
        staticDate: "",
        isWorkDay: "工作日",
        lineCode: ""
      },
      type: "year",
      frequency: "年",
      staticDate: "",
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 15,
        loop: true,
        centeredSlides: "center",
        initialSlide: 0,
        // width: 160,
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        // Some Swiper option/callback...
        scrollbar: {
          hide: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // autoplay: {
        //   delay: 3000
        // }
      },
      valueFormate: "yyyy",
      searchoptions: [
        {
          value: "年",
          label: "年"
        },
        {
          value: "月",
          label: "月"
        }
        // {
        //   value: "day",
        //   label: "日"
        // }
      ],
      roadList: [
        {
          name: "1号线",
          color: "rgba(26, 117, 209,1)",
          value: 0
        },
        {
          name: "2号线",
          color: "rgb(238, 121, 26)",
          value: 0
        },
        {
          name: "3号线",
          color: "rgb(238, 75, 129)",
          value: 0
        },
        {
          name: "4号线",
          color: "rgb(68, 209, 53)",
          value: 0
        },
        {
          name: "5号线",
          color: "rgb(190, 81, 169)",
          value: 0
        },
        {
          name: "7号线",
          color: "rgb(118, 214, 222)",
          value: 0
        },
        {
          name: "10号线",
          color: "rgb(108, 105, 236)",
          value: 0
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.item {
  //   width: 50px;
  //   height: 60px;
  display: flex;
  padding: 10px 0;
  border-radius: 2px;
  cursor: pointer;
  background-color: rgb(14, 35, 91);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  .circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-width: 4px;
    border-style: solid;
  }
  p {
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    padding-top: 6px;
    color: rgba(255, 255, 255, 0.8);
  }
}
.swiper-container {
  --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 10px; /* 设置按钮大小 */
}
.swiper-button-next {
  font-size: 16px;
}
.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  font-size: 16px;
}
.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  font-size: 16px;
}
.swiper-button-prev,
.swiper-button-next {
  top: 50%;
  color:#ffffff;
}
.zhjc-wrap {
  width: 80%;
  margin: 0 auto;
}
.swiperClass{
  padding-right: 20px;
}
.swiper-slide:not(.swiper-slide-active) {
  transform: scale(0.8);
}
.swiper-slide-active > .item {
  background-color: rgba(32, 86, 221, 0.6) !important;
}
.date-wrapper {
  display: inline-block;
  margin-left: 10px;
}
.search {
  margin: 0 auto 21px 15px;
}
.festvil-wrap {
  margin-top: 21px;
  text-align: center;
}
</style>