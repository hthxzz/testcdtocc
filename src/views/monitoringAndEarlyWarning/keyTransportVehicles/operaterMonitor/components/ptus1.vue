<template>
  <div class="lineDetail-wrap lightSpeedIn" v-if="hide" :class="{hide:isHide}">
    <!-- 线路详情 -->
    <ul class="ptusTap">
      <li
        v-for="(item,index) in arr"
        :key="index"
        @click="handleClick(index)"
        :class="{active:cur==index}"
      >{{item}}</li>
    </ul>
    <i class="el-icon-close close" @click="close"></i>
    <div class="lineDetail-inner" v-show="cur==0">
      <table>
        <tr>
          <th>车牌号</th>
          <td class="line_name">{{data.vehicleNo}}</td>
        </tr>
        <tr>
          <th>当前车速</th>
          <td>
            {{data.speed}}
            <span class="unit">km/h</span>
          </td>
        </tr>
        <tr>
          <th>经营企业</th>
          <td>
            {{data.enterpriseName}}
            <!-- <span class="unit">班次</span> -->
          </td>
        </tr>
        <tr>
          <th width="40%">联系电话</th>
          <td width="60%">{{data.picTel}}</td>
        </tr>
        <tr>
          <th>联系人</th>
          <td>{{data.picName}}</td>
        </tr>
        <tr>
          <th width="40%">报警类型</th>
          <td width="60%">{{data.alarmTypeName}}</td>
        </tr>
        <tr>
          <th>报警时间</th>
          <td>{{data.alarmTime}}</td>
        </tr>
     <!--   <tr>
          <th>时间</th>
          <p>
            <el-date-picker
              style="width: 117px;height:20px;margin-left:-120px;"
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
            <span class="unit poscit">至</span>
            <el-date-picker
              style="width: 117px;height:20px;"
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              @change="changeFn"
            ></el-date-picker> 
            <button class="playback" @click="moreInfo()">更多信息>></button>-->
      <tr>
            <p class="playback" @click="moreInfo()">更多信息>></p>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import qs from "qs";
export default {
  name: "",
  props: ["test","alarmTypeName","alarmTime"],
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
      //arr: ["基本信息", "线路牌信息", "车载视频"],
      arr: ["基本信息"],
      cur: 0,
      data: {},
      value1: "",
      value2: "",
      istrue: true
    };
  },
  mounted() {
    //   console.log(this.test);
    if (this.istrue) {
      this.getVehicle();
    }
  },
  methods: {
    moreInfo(){
      let cph = this.data.vehicleNo ;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});

    },
    changeFn() {
      let time = dayjs(this.value1).format("YYYY-MM-DD");
      let time2 = dayjs(this.value2).format("YYYY-MM-DD");
      // console.log(time);
      // console.log(time2);
      if (time2 != time) {
        // this.fige = false;
        // // console.log(111111);
        // this.$message({
        //   message: '和前面日期不一致',
        //   type: 'warning'
        // });
      } else {
        // this.fige = true;
      }
    },
    playbackFn() {
      if (this.value1 == "" || this.value2 == "") {
        this.$message({
          message: "日期不能为空",
          type: "warning"
        });
      } else {
        // console.log(this.data.vehicleNo);
        let date = dayjs(this.value1).format("YYYYMMDD");
        let vehicleNo = this.data.vehicleNo;
        let start = new Date(
          dayjs(this.value1)
            .format("YYYY-MM-DD HHmmss")
            .substr(11)
        ).getTime();
        let finish = new Date(
          dayjs(this.value2)
            .format("YYYY-MM-DD HHmmss")
            .substr(11)
        ).getTime();
        let gnss_time= {
              "gt": 568971792000000,
              "lt": 1515680352000000
          }
        // console.log(start);
        // console.log(finish);
        // let param = '{"query": {"bool": {"must": {"match_phrase": {"vehicle_no": vehicleNo}},"filter":{"range": {"gnss_time": {"gt": start,"lt": finish}}}}},"from": 0,"size": 3000}'
        let param = {"query": {"bool": {"must": {"match_phrase": {"vehicle_no": '川Z55963'}},"filter":{"range": {"gnss_time": {"gt": 568971792000000,"lt": 1515680352000000}}}}},"from": 0,"size": 3000}
        // let str = JSON.stringify(param)
        // console.log(param);
        axios({
          url:'/api/gov/lkyw/20200413',
          mounted:'get',
          params:{
            vehicle_no:'川Z55963',
            gnss_time:gnss_time
          }
        }).then(res=>{
          console.log(res);
        })
        // axios.get('/api/gov/lkyw/20200413',{
        //   // data:JSON.stringify(param)
        //   "query": {
        //       "bool": {
        //           "must": {
        //               "match_phrase": {
        //                 "vehicle_no": "川Z55963"
        //               }
        //           },
        //           "filter":{
        //               "range": {
        //                 "gnss_time": {
        //                     "gt": 568971792000000,
        //                     "lt": 1515680352000000
        //                 }
        //               }
        //           }
        //       }
        //   },
        //   "from": 0,
        //   "size": 3000
        // }).then(res=>{
        //   console.log(res);
        // })
        // axios.get('/api/gov/lkyw/'+date,{
        //   params:{
        //     source:param,
        //     source_content_type:'application/json'
        //   }
        // }).then(res=>{
        //   console.log(res);
        // })
      //   axios({
      //     url: "/api/gov/lkyw/"+date+_search,
      //     //   {
            // "query": {
            //     "bool": {
            //         "must": {
            //             "match_phrase": {
            //               "vehicle_no": "川Z55963"
            //             }
            //         },
            //         "filter":{
            //             "range": {
            //               "gnss_time": {
            //                   "gt": 568971792000000,
            //                   "lt": 1515680352000000
            //               }
            //             }
            //         }
            //     }
            // },
            // "from": 0,
            // "size": 3000,
      //     // },
      //     method: "get"
      //   }).then(res => {
      //     console.log(res.data);
      //   });
      }
      
    },
    getVehicle(vehicleNo) {
      this.hide = true;
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getVehicleEnterpriseInfoByNo", {
          vehicleNo: vehicleNo || this.test
        })
        .then(res => {
          res.alarmTypeName = this.alarmTypeName ;
          res.alarmTime = this.alarmTime;
          this.data = res;
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

  // disInterv() {
  //   if (this.auto) {
  //     window.clearInterval(this.auto);
  //   }
  // },
  // addHide() {
  //   let i = 1,
  //     linecode = ["01", "02", "03", "04", "05", "07", "10"];
  //   this.auto = setInterval(() => {
  //     if (i == 6) {
  //       i = 0;
  //     }
  //     this.getLineStaticInfo(linecode[i]);

  //     i++;
  //   }, 6000);

  //     getLineStaticInfo(lineCode) {
  //       this.hide = false;
  //       this.$http
  //         .$get("gdjc_runMonitorHandler/getLineStaticInfo", {
  //           lineCode: lineCode || "01"
  //         })
  //         .then(res => {
  //           this.content = res;
  //           this.hide = true;
  //         });
  //     }
  //   },
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
  width: 300px;
  background-color: rgba(7, 18, 49, 0.8);
  border-radius: 2px;
  transition: all 1.6s;
  border: 2px solid rgba(35, 94, 243, 0.4);
  animation-duration: 0.6s;
  .poscit {
    display: inline-block;
    // margin-left: -120px;
  }
  .playback {
    position: absolute;
    right: 10px;
    width: 70px;
    bottom: 2px;
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