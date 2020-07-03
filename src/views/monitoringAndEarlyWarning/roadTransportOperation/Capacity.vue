
<template>
  <!-- <h2>客流趋势分析</h2> -->
  <!-- 搜索开始 -->
  <!-- <div class="PassengerFlowTrend-wrapper"> -->
  <div class="infor-manage-wrap nomap-content-container">
    <div class="infor-manage-title">
      <div class="item"></div>
      <div class="item basicInfor active" @click="activeTab1($event)">站点运力</div>
      <div class="item">|</div>
      <div class="item argumentSet" @click="activeTab2($event)">线路运力</div>
      <div class="line1"></div>
      <div class="line2"></div>
    </div>
    <div class="infor-manage-content">
      <!-- 基础信息管理内容 -->
      <div class="first" v-if="showFirst">
        <zdkll />
      </div>
      <!-- 参数设置内容 -->
      <div class="second" v-if="!showFirst">
        <xlkl />
      </div>
    </div>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins.js";
import zdkll from "./components/OperationAnalysis/zdyl.vue";
import xlkl from "./components/OperationAnalysis/xlyl.vue";
export default {
  name: "",
  components: {
    zdkll,
    xlkl
  },
  mixins: [tableMixins],
  mounted() {
    document
      .querySelector(".basicInfor")
      .addEventListener("click", function() {});
  },
  methods: {
    activeTab1($event) {
      let index = Array.from($event.srcElement.classList).indexOf("active");
      if (index != -1) {
        return;
      } else {
        $event.srcElement.classList.add("active");
        document.querySelector(".argumentSet").classList.remove("active");
        // document.querySelector(".first").style.display = "block";
        // document.querySelector(".second").style.display = "none";
        this.showFirst = true;
      }
    },
    activeTab2($event) {
      let index = Array.from($event.srcElement.classList).indexOf("active");
      if (index != -1) {
        return;
      } else {
        $event.srcElement.classList.add("active");
        document.querySelector(".basicInfor").classList.remove("active");
        // document.querySelector(".second").style.display = "block";
        // document.querySelector(".first").style.display = "none";
        this.showFirst = false;
      }
    }
  },
  data() {
    return {
      showFirst: true,
      searchConfig: {
        searchCondition: [
          {
            order: 1,
            type: "input",
            label: "",
            // width: "123px",
            placeholder: "路段名称",
            VModelvalue: {
              name: "name",
              defaultValue: ""
            }
          },
          {
            order: 3,
            type: "datetimerange",
            formate: "yyyy-MM-dd HH:mm:ss",
            label: "",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "date1",
              defaultValue: "2"
            }
          }
        ],
        searchButton: [
          {
            order: 1,
            label: "查询"
          },
          {
            order: 2,
            label: "添加"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.infor-manage-wrap {
  // width: 100%;
  height: 100%;
  // background: rgba(5, 12, 38, 1);
  // border: 1px solid rgba(32, 86, 221, 1);
  display: flex;
  flex-direction: column;
  .infor-manage-title {
    flex: 50;
    display: flex;
    margin-left: 23px;
    margin-right: 16px;
    position: relative;
    .line1 {
      position: absolute;
      width: 145px;
      height: 1px;
      background-color: rgba(32, 86, 221, 1);
      bottom: -4px;
    }
    .line2 {
      position: absolute;
      width: calc(100% - 145px);
      left: 145px;
      height: 1px;
      background-color: rgba(32, 86, 221, 0.6);
      bottom: -4px;
    }
    .item {
      width: 260px;
      height: 20px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 21px;
      // line-height:30px;
      // margin-bottom: 8px;
    }
    .item:nth-child(1) {
      width: 6px;
      height: 20px;
      cursor: pointer;
      background: rgba(32, 86, 221, 1);
      // margin-left: 23px;
    }
    .item:nth-child(2) {
      width: 120px;
      // height:20px;
      // background:rgba(32,86,221,1);
      color: #fff;
      margin-left: 8px;
      color: rgba(32, 86, 221, 1);
      cursor: pointer;
    }
    .item:nth-child(3) {
      width: 6px;
      height: 20px;
      // background:rgba(32,86,221,1);
      margin-left: 10px;
    }
    .item:nth-child(4) {
      width: 160px;
      height: 20px;
      // background:rgba(32, 86, 221, 1);
      color: rgba(32, 86, 221, 1);
      margin-left: 10px;
      text-align: left;
      cursor: pointer;
    }
  }
  .infor-manage-content {
    height: calc(100% - 30px);
    flex: 910;
  }
  .active {
    color: #fff !important;
  }
}

$backgroundColor: rgba(5, 12, 38, 1);
.road-network-event-wrap {
  // width:100%;
  height: 100%;
  // background: rgba(5, 12, 38, 1);
  border: 1px solid rgba(32, 86, 221, 0.6);
  // background-image: url("./img/search_bg.png");
  background-size: 124px 120px;
  background-repeat: no-repeat;
  background-position: right top;
}
.road-network-event-content {
  height: 100%;
  width: 100%;
}
.bgimg {
  position: absolute;
  top: 45px;
  right: 19px;
  width: 124px;
  height: 120px;
}
.imgWrap {
  width: 48px;
  height: 48px;
  background: rgba(32, 86, 221, 1);
  border-radius: 50%;
}
.imgWrap > img {
  width: 34px;
  height: 34px;
  vertical-align: bottom;
}
.first,
.second {
  margin-top: 22px;
  height: 100%;
}
</style>