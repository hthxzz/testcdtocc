<template>
  <div class="vehicleDetail-wrap">
    <div class="content-left">
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>车牌号：</label><span> {{ item.vehicleNo }}</span>
        </div>
        <div class="vehicles-right">
          <label>车牌颜色：</label><span> {{ item.vehicleColor }} </span>
        </div>
      </div>
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>高度：</label><span> {{ item.altitude }} (米)</span>
        </div>
        <div class="vehicles-right">
          <label>方向：</label><span> {{ item.direction }} </span>
        </div>
      </div>
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>状态：</label><span> {{ item.status }} </span>
        </div>
        <div class="vehicles-right">
          <label>行驶里程：</label><span> {{ item.mileage }}公里 </span>
        </div>
      </div>
      <div class="vehicles-line-one">
        <label>速度：</label><span> {{ item.drivingSpeed }}Km/h </span>
      </div>
      <div class="vehicles-line-one">
        <label>经度/纬度：</label><span> {{ item.lon }} /{{ item.lat }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>行驶记录仪速度：</label><span> {{ item.gnssSpeed }}Km/h </span>
      </div>
      <div class="vehicles-line-one">
        <label>GPS时间：</label><span> {{ item.gnssTime }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>当前位置：</label><span> {{ item.bcky }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import qs from "qs";
export default {
  name: "",
  props: ["vehicleNo","vehicleColor_Monitor","vehicleType_Monitor"],
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
      arr: ["基本信息"],
      cur: 0,
      data: {},
      value1: "",
      value2: "",
      istrue: true,
      item:{}
    };
  },
  mounted() {
    //   console.log(this.test);
    //if (this.istrue) {
     // this.getVehicleInfo1();
    //}
  },
  methods: {
     getVehicleInfo1(vehicleNo,vehicleType,vehicleColor) {
       
      this.hide = true;
      console.log("detail:"+this.vehicleNo);
      
      this.$http
        .$get("zdjc_dataAnalysisHandler/getMonitorInfoByVehicleNo", {  
          vehicleNo: vehicleNo || this.vehicleNo,
          "vehicleColor":vehicleColor||this.vehicleColor_Monitor,"vehicleType":vehicleType||this.vehicleType_Monitor
        })
        .then(res => {
          res.vehicleNo = this.vehicleNo;
          this.item = res;
          this.istrue = false;
        });
    },
    moreInfo(){
      let cph = this.data.vehicleNo ;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});

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
.vehicleDetail-wrap{
  position: relative;
  width: 100%;
  height: 100%;

  //background-color: rgba(7, 18, 49, 0.8);
 // border-radius: 2px;
  transition: all 1.6s;
  //border: 2px solid rgba(35, 94, 243, 0.4);
  animation-duration: 0.6s;
  .content-left{
    float:left;
    width:1092px;
    line-height:2;
    height:100%;
    margin:0px 10px 0px 8px;
    background:rgba(0,79,197,.4);
    //opacity:0.8;
    border-radius:4px;
    .vehicles-line-one{
      //margin-top:10px;
      margin:0px 0px 0px 8px;
      label{
        color: #999999;
        font-family:Source Han Sans CN;
        font-weight:400;
      }
    }
    .vehicles-line-two{
     // margin-top:10px;
      margin:0px 0px 0px 8px;
      .vehicles-left{
        float:left;
        //width:200px;
        width:60%;
        label{
          color: #999999;
          font-family:Source Han Sans CN;
          font-weight:400;
        }
      }
      .vehicles-line-two :nth-child(0) {
        margin-top:20px;
      }
      .vehicles-right{
        float:left;
        width:39%;
        label{
          color: #999999;
          font-family:Source Han Sans CN;
          font-weight:400;
        }
      }
      
    }
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
    color:#2056DD;
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
    margin-top: 30px;
    margin-left: 10px;
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