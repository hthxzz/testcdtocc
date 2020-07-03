<template>
  <div class="unwind-network-event-container">
    <div class="unwind-network-event-wrap">
      <div class="event-wrap" v-for="item in eventList" :key="item.title">
        <div class="event-left">
          <img :src="item.icon" alt />
        </div>
        <div class="event-right">
          <h2>{{ item.number }}</h2>
          <p>{{ item.title }}</p>
        </div>
        <!-- <verticesBorderStyle/> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.noDisposeRoadEventStat();
  },
  methods: {
    noDisposeRoadEventStat() {
      this.$http
        .$get("lkfx_roadEventHandler/noDisposeRoadEventStat")
        .then(data => {
          this.eventList[0].number = data.blockCount;
          this.eventList[1].number = data.publicCount;
          this.eventList[2].number = data.congestionCount;
          this.eventList[3].number = data.trafficCount;
        });
    }
  },
  data() {
    return {
      eventList: [
        {
          icon: require("../img/wjcsj_jhx.png"),
          number: "--",
          title: "计划性养护施工"
        },
        {
          icon: require("../img/wjcsj_qt.png"),
          number: "--",
          title: "公共预警事件"
        },
        {
          icon: require("../img/wjcsj_jt.png"),
          number: "--",
          title: "拥堵预警事件"
        },
        {
          icon: require("../img/wjcsj_ggyj.png"),
          number: "--",
          title: "交通事件"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.unwind-network-event-container {
  width: 100%;
  height: 190px;
  .unwind-network-event-wrap {
    display: flex;
    width: 370px;
    flex-wrap: wrap;
    .event-wrap {
      width: 48%;
      display: flex;
      cursor: pointer;
      border-radius: 6px;
      // margin: 11px 11px;
      margin-bottom: 10px;
      position: relative;
      background: rgba(32, 86, 221, 0.2);
      .event-left {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-self: center;
        margin-left: 22px;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .event-right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1.5;
        h2 {
          flex: 1;
          font-size: 24px;
          margin-left: 16px;
          margin-top: 11px;
        }
        p {
          flex: 1;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 19px;
        }
      }
    }
  }
}
.event-wrap:nth-child(odd) {
  margin-left: 0;
}
.event-wrap:nth-child(even) {
  margin-left: 11px;
}
</style>