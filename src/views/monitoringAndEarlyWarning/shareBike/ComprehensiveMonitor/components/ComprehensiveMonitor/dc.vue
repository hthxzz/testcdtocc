<template>
  <div class="kylqk-wrapper">
    <div class="list-wrapper">
      <ul>
        <li v-for="(item,index) in newitemList" :key="item.order">
          <img :src="srcbg" alt class="item" />
          <span class="item">{{ index + 1 }}</span>
          <h2 class="item">{{ item.enterpriseName.substr(0,2) }}</h2>
          <div class="bar-wrapper item">
            <span></span>
            <span :style="{width: item.rate + '%'}"></span>
          </div>
          <span
            class="item"
          >{{ item.enterpriseNum>10000?(((item.enterpriseNum-item.enterpriseNum%1000)/10000 + '万')):(item.enterpriseNum) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  computed: {
    newitemList() {
      let count = 0;
      this.itemList.sort((a, b) => {
        return b.enterpriseNum - a.enterpriseNum;
      });
      this.itemList.forEach((element, val, index) => {
        element.rate =
          (100 * element.enterpriseNum) / this.itemList[0].enterpriseNum;
      });
      return this.itemList;
    }
  },
  mounted() {
    this.$http
      .$get("/gxdc_bikeIntegratedMonitoringHandler/getWebTodayOrder", {
        time: getNowFormatDate()
      })
      .then(data => {
        this.itemList = data.list;
      });
    // 获取当天时间
    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  data() {
    return {
      srcbg: require("../../../../roadTransportOperation/img/dlys_num_bg.png"),
      itemList: [
        {
          order: 1,
          enterpriseName: "青桔",
          enterpriseNum: 9421
        },
        {
          order: 2,
          enterpriseName: "摩拜",
          enterpriseNum: 8866
        },
        {
          order: 3,
          enterpriseName: "哈啰",
          enterpriseNum: 7759
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.number-wrapper {
  margin-top: 10px;
  margin-left: 16px;
}
.list-wrapper {
  position: relative;
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
      justify-items: center;
      .item:nth-child(1) {
        width: 50px;
        height: 50px;
      }
      .item:nth-child(2) {
        position: absolute;
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
        left: 0;
        line-height: 50px;
      }
      .item:nth-child(3) {
        flex-basis: 40px;
      }
      .item:nth-child(4) {
        flex: 1;
        position: relative;
        span:nth-child(1) {
          border-radius: 6px;
          width: 100%;
          height: 6px;
          display: inline-block;
          background-color: #364b7b;
          // background-image: linear-gradient(to right, rgb(30, 89, 219), rgb(3, 225, 234));
        }
        span:nth-child(2) {
          border-radius: 6px;
          position: absolute;
          left: 0;
          top:8px;
          width: 90%;
          height: 6px;
          display: inline-block;
          background-image: linear-gradient(
            to right,
            rgb(30, 89, 219),
            rgb(3, 225, 234)
          );
        }
      }
      .item:nth-child(5) {
        margin-left: 16px;
        flex-basis: 100px;
        font-size: 16px;
        color: rgba(255,255,255,.6);
      }
    }
  }
}
</style>