<template>
  <div class="kylqk-wrapper">
    <panelTitle title="客运量情况" :displaySwitch="false"></panelTitle>
    <div class="number-wrapper">
      <RollNumber title="总客运量" :value="rollNo"></RollNumber>
    </div>

    <div class="list-wrapper">
      <ul>
        <li v-for="(item,index) in newitemList" :key="item.order">
          <img :src="srcbg" alt class="item" />
          <span class="item">{{ index + 1 }}</span>
          <h2 class="item">{{ item.stationName }}</h2>
          <div class="bar-wrapper item">
            <span></span>
            <span :style="{width: item.rate + '%'}"></span>
          </div>
          <span class="item">{{ item.traffic }}人</span>
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
        return b.traffic - a.traffic;
      });
      this.itemList.forEach((element, val, index) => {
        element.rate = (100 * element.traffic) / this.itemList[0].traffic;
      });
      return this.itemList;
    }
  },
  mounted() {
    this.$http.$get("kyjc_stationTransport/getStationTraficList").then(data => {
      this.itemList = data.stations;
      this.rollNo = data.totalTraffic;
    });
  },
  data() {
    return {
      srcbg: require("../../../roadTransportOperation/img/dlys_num_bg.png"),
      rollNo: 0,
      itemList: [
        {
          order: 1,
          title: "成都东站客运站",
          traffic: 6951
        },
        {
          order: 2,
          title: "茶店子客运站",
          traffic: 1281
        },
        {
          order: 3,
          title: "成都石羊客运站",
          traffic: 4119
        },
        {
          order: 4,
          title: "昭觉寺客运站",
          traffic: 3619
        },
        {
          order: 5,
          title: "北门汽车站",
          traffic: 2619
        },
        {
          order: 6,
          title: "旅游集散中心",
          traffic: 4619
        },
        {
          order: 7,
          title: "成都汽车总站",
          traffic: 6619
        },
        {
          order: 8,
          title: "国际商贸城客运站",
          traffic: 4619
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
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      margin-top: 6px;
      justify-content: center;
      align-items: center;
      justify-items: center;
      .item:nth-child(1) {
        width: 50px;
        height: 50px;
      }
      .item:nth-child(2) {
        position: absolute;
        text-align: center;
        width: 50px;
        height: 50px;
        left: 0;
        line-height: 50px;
      }
      .item:nth-child(3) {
        flex-basis: 110px;
      }
      .item:nth-child(4) {
        flex: 1;
        position: relative;
        span:nth-child(1) {
          border-radius: 6px;
          width: 100%;
          height: 20px;
          display: inline-block;
          background-color: #364b7b;
          // background-image: linear-gradient(to right, rgb(30, 89, 219), rgb(3, 225, 234));
        }
        span:nth-child(2) {
          border-radius: 6px;
          position: absolute;
          left: 0;
          width: 90%;
          height: 20px;
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
        flex-basis: 60px;
        font-size: 16px;
        color: rgba(1, 233, 235, 1);
      }
    }
  }
}
</style>