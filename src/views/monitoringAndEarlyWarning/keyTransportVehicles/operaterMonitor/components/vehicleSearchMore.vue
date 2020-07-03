<template>
  <div class="lineDetail-wrap lightSpeedIn" v-if="hide" :class="{hide:isHide}">
    <div class="header">
     <!-- <SelectTag :content="content_Title" @activeTag="activeTag"></SelectTag> -->
      <ChangeTagItem :tagitemList="contentItemList" @getStatues="getStatues" />
      <i class="el-icon-close close" @click="close"></i>
    </div>
    <div class="trafficJam-content">
      <div class="lineDetail-inner" v-show="cur==1">
        <VehicleDetailInfo  :vehicleNo='vehicleNo' ref="vehicleDetailInfoRef" ></VehicleDetailInfo>
      </div>
      <div class="lineDetail-inner" v-show="cur==2">
        <HistoryTrackDrivingRoad></HistoryTrackDrivingRoad>
      </div>
      <div class="lineDetail-inner" v-show="cur==3">
        <VehicleVideo></VehicleVideo>
      </div>
      <div class="lineDetail-inner" v-show="cur==4">
       <!-- <VehicleAlarm ref="vehicleAlarmRef" ></VehicleAlarm>-->
       <VehicleAlarm :vehicleNo='vehicleNo' :vehicleColor_Monitor='vehicleColor_Monitor' ref="vehicleAlarmRef" ></VehicleAlarm>
      </div>
      <div class="lineDetail-inner" v-show="cur==5">运单信息</div>
      <div class="lineDetail-inner" v-show="cur==6">
        <VehicleDriver></VehicleDriver>
      </div>
      <div class="lineDetail-inner" v-show="cur==7">
        <VehicleMonitor :vehicleNo='vehicleNo' :vehicleColor_Monitor='vehicleColor_Monitor' :vehicleType_Monitor='vehicleType_Monitor' ref="vehicleMonitorRef" ></VehicleMonitor>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import VehicleDetailInfo from "./vehicleInfo/vehicleDetailInfo.vue";
import HistoryTrackDrivingRoad from "./vehicleInfo/historyTrackDrivingRoad.vue";
import VehicleAlarm from "./vehicleInfo/vehicleAlarm.vue";
import VehicleDriver from "./vehicleInfo/vehicleDriver.vue";
import VehicleMonitor from "./vehicleInfo/vehicleMonitor.vue";
import VehicleVideo from "./vehicleInfo/vehicleVideo.vue";
import qs from "qs";
import ChangeTagItem from "./../components/changeTag.vue";

export default {
  name: "",
  components: {
    VehicleDetailInfo,ChangeTagItem,HistoryTrackDrivingRoad,VehicleAlarm,VehicleDriver,VehicleMonitor,VehicleVideo
  },
  props: ["test"],
  //   mounted() {
  //     this.getLineStaticInfo();
  //     // this.addHide();
  //   },
  //   beforeDestroy() {
  //     this.disInterv();
  //   },
  data() {
    return {
      // fige:true,
      content: {},
      hide: true,
      isHide: false,
      contentItemList : [
                    { code: "1", value: "基本信息" },
                    { code: "2", value: "历史轨迹及行驶道路" },
                    { code: "3", value: "车载视频" },
                    { code: "4", value: "车辆报警" },
                    { code: "5", value: "运单信息" },
                    { code: "6", value: "车辆驾驶员/押运员" },
                    { code: "7", value: "监控" }
                ],
      content_Title: [
        { uid: _.uniqueId("tags"), tag: "基本信息", code: 1 },
        { uid: _.uniqueId("tags"), tag: "历史轨迹及行驶道路", code: 2 },
        { uid: _.uniqueId("tags"), tag: "车载视频", code: 3 },
        { uid: _.uniqueId("tags"), tag: "车辆报警", code: 4 },
        { uid: _.uniqueId("tags"), tag: "运单信息", code: 5 },
        { uid: _.uniqueId("tags"), tag: "车辆驾驶员/押运员", code: 6 },
        { uid: _.uniqueId("tags"), tag: "监控", code: 7 }
      ],
      arr: ["基本信息","历史轨迹及行驶道路","车载视频","车辆报警","运单信息","车辆驾驶员/押运员","监控"],
      cur: 1,
      data: {},
      value1: "",
      value2: "",
      istrue: true,
      vehicleNo:'',
      vehicleColor_Monitor:'',
      vehicleType_Monitor:''
           
    };
  },
  mounted() {
    console.log(this.test);
    
    this.vehicleNo = this.test;
    if (this.istrue) {
      //this.getVehicle(this.test);
    }
  },
  methods: {
     getStatues(content_Title){//获取tag选择状态
      this.cur= content_Title.code;
      if(content_Title.code == 7 ){
        this.$refs.vehicleMonitorRef.getVehicleInfo1(this.test,this.vehicleType_Monitor,this.vehicleColor_Monitor);
      }else if(content_Title.code == 4 ){
        this.$refs.vehicleAlarmRef.vehiclesQuery(this.test,this.vehicleColor_Monitor);
      }else{
       // this.cur = 1;
      }
     },
    getVehicle(vehicleNo) {
      this.hide = true;
      this.$http
        .$get("zdjc_dataAnalysisHandler/getVehicleInfoByVehicleNo", {
          vehicleNo: vehicleNo || this.test
        })
        .then(res => {
          
          this.data = res;
          this.vehicleNo = this.test;   
          this.vehicleColor_Monitor = res.plateColorCode;
          this.vehicleType_Monitor = res.vehicleType;
          this.$refs.vehicleDetailInfoRef.getVehicleInfo(vehicleNo||this.test);
          this.istrue = false;
        });
    },

    handleClick(i) {
      this.cur = i;
    },
    close() {
      this.hide = !this.hide;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input__prefix {
  display: none;
}
.el-input__inner {
  width: 109px;
  height: 20px;
  margin-left: -70px;
}
.el-input__suffix {
  display: none;
}
.el-input--prefix {
  padding-left: 0;
}
.el-input--suffix {
  padding-right: 0;
}
</style>
<style lang="scss" scoped>
.lineDetail-wrap {
  position: relative;
  width: 100%;
  height:340px;
  //height:294px;
  //background-color: rgba(7, 18, 49, 0.8);
  background-image: url(../img/bk@2x.png);
  border-radius: 2px;
  transition: all 1.6s;
  border: 2px solid rgba(35, 94, 243, 0.4);
  animation-duration: 0.6s;

  .header {
    margin:8px 0px 8px 8px;
    overflow: hidden;
    .select-tags-container{
      width:95%;
    }
    .el-icon-close{
      z-index:999;
    }
  }
  .trafficJam-content{
    height:290px;
  }

  .poscit {
    display: inline-block;
    // margin-left: -120px;
  }
  .playback {
    position: absolute;
    right: 10px;
    width: 100px;
    bottom: 5px;
    font-size: 12px;
  }
  .ptusTap {
    list-style: none;
    position: absolute;
    top: 5px;
    left: 5px;
    bottom: 10px;
    display: flex;
    li {
      padding: 0 15px;
      cursor: pointer;
    }
  }
  .ptusTap li.active {
    border: 1px #fff solid;
    height: 20px;
    background: #fff;
    color: #000;
    line-height: 20px;
  }
  .close {
    position: absolute;
    right: 10px;
    top: 1px;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.9);
    display: inline-block;
    cursor: pointer;
  }
  .lineDetail-inner {
    height: 100%;
    width: 100%;
    // padding: 20px;
    //margin-top: 30px;
    //margin-left: 10px;
  }
  table {
    padding-top: 20px;
    width: 100%;
    tr {
      line-height: 36px;
      td {
        position: absolute;
        left: 100px;
        // text-align: left;
        // font-size: 24px;
        // font-family: "datafont";
        // color: #00ffff;
        span.unit {
          font-size: 14px;
          color: #fff;
        }
      }
      th {
        text-align: left;
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
}
.hide {
  opacity: 0;
}
</style>