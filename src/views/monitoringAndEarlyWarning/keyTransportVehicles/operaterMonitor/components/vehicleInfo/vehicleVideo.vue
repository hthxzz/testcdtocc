<template>
  <div class="vehicleDetail-wrap">
    <!-- 车载视频 -->
    <div class="content">
     <ul class="graphy_box video">
      <li v-for="item in videoList">
        <div class="graphy_detail">
          <videoPlayerTocc :url="item.url"></videoPlayerTocc>
        </div>
        <div class="graphy_title">车厢视频(前)</div>
      </li>
      <li v-for="item in videoList">
        <div class="graphy_detail">
          <videoPlayerTocc :url="item.url"></videoPlayerTocc>
        </div>
        <div class="graphy_title">车厢视频(中)</div>
      </li>
      <li v-for="item in videoList">
        <div class="graphy_detail">
          <videoPlayerTocc :url="item.url"></videoPlayerTocc>
        </div>
        <div class="graphy_title">车厢视频(路)</div>
      </li>
      <li v-for="item in videoList">
        <div class="graphy_detail">
          <videoPlayerTocc :url="item.url"></videoPlayerTocc>
        </div>
        <div class="graphy_title">车厢视频(中门)</div>
      </li>
     </ul>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import videoConfig from "@/components/common/video/index.js";
import videoPlayerTocc from "@/components/common/video/index.vue";
import qs from "qs";
export default {
  name: "",
  props: ["test"],
  mixins: [videoConfig],
  components:{
    videoPlayerTocc
  },
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
      videoList:[],
      content: {},
      arr: ["基本信息"],
      cur: 0,
      data: {},
      value1: "",
      value2: "",
      istrue: true,
      item:{
        bcky:'川A909',
        gjys:'df'
      },playersOptions:{
        // videojs options
        muted: true,
        autoplay: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        html5: {
          hls: {
            withCredentials: false
          }
        },
        flash: {
          hls: {
            withCredentials: false
          }
        },
        sources: [
          {
            // type: "rtmp/flv",
            type: "application/x-mpegURL",
            src: this.url
            // src: "http://172.18.0.142:83/openUrl/9VWCkne/live.m3u8"
          }
          // {
          //     type: "video/mp4",
          //     src: "https://www.runoob.com/try/demo_source/movie.mp4"
          // }
        ]
      }
    };
  },
  mounted() {
    //   console.log(this.test);
    //此处控制video中的自动播放的开关
    //this.$refs.changeState.modifyAutoPalyState(false);
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
.vehicleDetail-wrap{
  position: relative;
  width: 100%;
  height: 100%;

  //background-color: rgba(7, 18, 49, 0.8);
 // border-radius: 2px;
  transition: all 1.6s;
  //border: 2px solid rgba(35, 94, 243, 0.4);
  animation-duration: 0.6s;
  .content{
    float:left;
    width:956px;
    line-height:2;
    height:100%;
    margin:0px 10px 0px 8px;
    background:rgba(0,79,197,.4);
    //opacity:0.8;
    border-radius:4px;
    .graphy_box {
      height: 200px;
      margin-top:10px;
      li {
        width: 24.7%;
        height: 100%;
        float:left;
        .graphy_title{
          text-align: center;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
      li:nth-child(1) {
        margin-left:10px;
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
}
.hide {
  opacity: 0;
}
</style>
<style lang="css" scoped>
  li>>>.video-js{
    width:225px;
    height:200px;
  }
</style>
