<template>
  <div class="kylqk-wrapper">
    <div class="list-wrapper">
      <ul>
        <li
          v-for="(item,index) in itemList"
          :key="item.order"
          :class="'item'+index"
          class="slideInRight animated"
        >
          <img :src="srcbg" alt class="item" />
          <span class="item">{{ index + 1 }}</span>
          <h2 class="item">{{ item.title }}</h2>
          <div class="bar-wrapper item">
            <span></span>
            <span :style="{width: item.rate + '%'}"></span>
          </div>
          <span class="item num">
            <!-- {{item.traffic}} -->
            <count-to :startVal="0" :endVal="item.traffic" :duration="4000" />
          </span>
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
      //   this.itemList.sort((a, b) => {
      //     return b.traffic - a.traffic;
      //   });
      this.itemList.forEach((element, val, index) => {
        element.rate = (100 * element.traffic) / this.itemList[0].traffic;
      });
      return this.itemList;
    }
  },
  props: ["itemList"],
  //   mounted() {
  //     this.$http.$get("kyjc_stationTransport/getStationTraficList").then(data => {
  //       this.itemList = data.stations;
  //       this.rollNo = data.totalTraffic;
  //     });
  //   },
  data() {
    return {
      srcbg: require("../../../roadTransportOperation/img/dlys_num_bg.png"),
      rollNo: 0
      //   itemList: [
      //     {
      //       order: 1,
      //       title: "成都东站客运站",
      //       traffic: 6951
      //     },
      //     {
      //       order: 2,
      //       title: "茶店子客运站",
      //       traffic: 1281
      //     },
      //     {
      //       order: 3,
      //       title: "成都石羊客运站",
      //       traffic: 4119
      //     },
      //     {
      //       order: 4,
      //       title: "昭觉寺客运站",
      //       traffic: 3619
      //     },
      //     {
      //       order: 5,
      //       title: "北门汽车站",
      //       traffic: 2619
      //     },
      //     {
      //       order: 6,
      //       title: "旅游集散中心",
      //       traffic: 4619
      //     },
      //     {
      //       order: 7,
      //       title: "成都汽车总站",
      //       traffic: 6619
      //     },
      //     {
      //       order: 8,
      //       title: "国际商贸城客运站",
      //       traffic: 4619
      //     }
      //   ]
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
  ul {
    display: flex;
    flex-direction: column;
    margin-top:10px;
    li {
      display: flex;
      margin-top: 6px;
      justify-content: center;
      align-items: center;
      justify-items: center;
      animation-iteration-count: 1;
      width:96%;
      .item:nth-child(1) {
        width: 40px;
        height: 40px;
      }
      .item:nth-child(2) {
        position: absolute;
        text-align: center;
        width: 40px;
        height: 40px;
        left: 0;
        line-height: 40px;
      }
      .item:nth-child(3) {
        flex-basis: 110px;
        font-weight: normal;
      }
      .item:nth-child(4) {
        flex: 1;
        position: relative;
        span {
          position: absolute;
          left: 0;
          height: 4px;
          top: 0;
          border-radius: 6px;
        }
        span:nth-child(1) {
          width: 100%;
          background-color: #364b7b;
          // background-image: linear-gradient(to right, rgb(30, 89, 219), rgb(3, 225, 234));
        }
        span:nth-child(2) {
          width: 90%;
          background-image: linear-gradient(
            to right,
            rgb(30, 89, 219),
            rgb(3, 225, 234)
          );
        }
      }
      .item:nth-child(5) {
        margin-left: 16px;
        flex-basis: 80px;
        font-size: 16px;
        // color: rgba(1, 233, 235, 1);
      }
    }
  }
}
.num {
  // text-align: right;
  span{color:rgba(255,255,255,.6);}
}
// li:nth-child(1) {
//   animation-delay: 0.1s;
// }
// li:nth-child(2) {
//   animation-delay: 0.3s;
// }
// li:nth-child(3) {
//   animation-delay: 0.5s;
// }
// li:nth-child(4) {
//   animation-delay: 0.7s;
// }
// li:nth-child(5) {
//   animation-delay: 0.9s;
// }
// li:nth-child(6) {
//   animation-delay: 1s;
// }
// li:nth-child(7) {
//   animation-delay: 1.1s;
// }
@for $i from 1 through 11 {
  .item#{$i} {
    animation-delay: $i * 0.1s;
  }
}
</style>