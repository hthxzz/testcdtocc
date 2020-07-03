<template>
  <div class="railSearch-wrap">
    <div class="search">
      <el-select v-model="value1" placeholder="请选择" @change="changeDate" style="width:90px">
        <el-option
          v-for="item in searchoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="date-wrapper">
        <el-date-picker
          v-model="value2"
          :type="type"
          placeholder="选择年"
          :value-format="valueFormate"
        ></el-date-picker>
      </div>
      <div class="btn-wrapper">
        <el-button size="mini" class="table-detail-btn search-detail" @click="handleSearch()">统计</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.initial();
  },

  methods: {
    initial() {
      this.value2 = this.$utils.dayjs().format("YYYY");
    },
    changeDate(a) {
      if (a == "year") {
        this.type = "year";
        this.valueFormate = "yyyy";
        this.value2 = this.$utils.dayjs().format("YYYY");
        //     this.startTime = this.$utils.dayjs().format("YYYY");
        //     this.endTime = this.$utils.dayjs().format("YYYY");
      }
      if (a == "month") {
        this.type = "month";
        this.valueFormate = "yyyy-MM";
        this.value2 = this.$utils.dayjs().format("YYYY-MM");
        //     this.startTime = this.$utils.dayjs().format("YYYY-MM");
        //     this.endTime = this.$utils.dayjs().format("YYYY-MM");
      }
      if (a == "day") {
        this.type = "date";
        this.valueFormate = "yyyy-MM-dd";
        this.value2 = this.$utils.dayjs().format("YYYY-MM-DD");
        // this.startTime = this.$utils.dayjs().format("YYYY-MM-DD");
        // this.endTime = this.$utils.dayjs().format("YYYY-MM-DD");
      }
    }
  },
  data() {
    return {
      type: "year",
      value1: "year",
      value2: "",
      valueFormate: "yyyy",
      searchoptions: [
        {
          value: "year",
          label: "年"
        },
        {
          value: "month",
          label: "月"
        }
        // {
        //   value: "day",
        //   label: "日"
        // }
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
    border-width: 2px;
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
  top: 68%;
}
.zhjc-wrap {
  width: 80%;
  margin: 0 auto;
}
.swiper-slide:not(.swiper-slide-active) {
  transform: scale(0.8);
}
.swiper-slide-active > .item {
  background-color: rgba(32, 86, 221, 0.6) !important;
}
.date-wrapper,
.btn-wrapper {
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