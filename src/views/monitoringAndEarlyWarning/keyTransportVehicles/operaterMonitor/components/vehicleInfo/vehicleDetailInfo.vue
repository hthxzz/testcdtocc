<template>
  <div class="vehicleDetail-wrap">
    <div class="content-left">
      <div class="vehicles-title">
        <label>车辆信息</label>
      </div>
     <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>车牌号码：</label><span> {{ item_vehicleInfo.vehicleNo }} </span>
        </div>
        <div class="vehicles-right">
          <label>车牌颜色：</label><span> {{ item_vehicleInfo.plateColorCode }} </span>
        </div>
      </div>
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>车辆状态：</label><span> {{ item_vehicleInfo.statusName }} </span>
        </div>
        <div class="vehicles-right">
          <label>车辆车高：</label><span> {{ item_vehicleInfo.vehicleHeight }}(米) </span>
        </div>
      </div>
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>厂牌型号：</label><span> {{ item_vehicleInfo.brandModel }} </span>
        </div>
        <div class="vehicles-right">
          <label>车辆类型：</label><span> {{ item_vehicleInfo.vehicleTypeCode }} </span>
        </div>
      </div>
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>是否新能源：</label><span> {{ item_vehicleInfo.ifEnergy }} </span>
        </div>
        <div class="vehicles-right">
          <label>行驶里程：</label><span> {{ item_vehicleInfo.operaDistance }} </span>
        </div>
      </div>
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>首次登记日期：</label><span> {{ item_vehicleInfo.registerDate }} </span>
        </div>
        <div class="vehicles-right">
          <label>购车日期：</label><span> {{ item_vehicleInfo.purchaseDate }} </span>
        </div>
      </div>
      <div class="vehicles-line-two">
        <div class="vehicles-left">
          <label>出厂日期</label><span> {{ item_vehicleInfo.manuDate }} </span>
        </div>
        <div class="vehicles-right">
          <label>落户日期：</label><span> {{ item_vehicleInfo.settleDate }} </span>
        </div>
      </div>
      


      <!-- <div class="vehicles-line-one">
        <label>车牌号码：</label><span> {{ item.bcky }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>车牌颜色：</label><span> {{ item.bcky }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>厂牌型号：</label><span> {{ item.bcky }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>所属行业：</label><span> {{ item.bcky }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>管辖机构：</label><span> {{ item_vehicleInfo.bcky }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>发证机构：</label><span> {{ item_vehicleInfo.bcky }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>车辆营运状态：</label><span> {{ item_vehicleInfo.bcky }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>道路运输许可证号：</label><span> {{ item_vehicleInfo.bcky }} </span>
      </div>-->
    </div>
    <div class="content-right">
      <div class="vehicles-title">
        <label>企业信息</label>
      </div>
      <div class="vehicles-line-one">
        <label>运输企业名称：</label><span> {{ item_enterpriseInfo.enterpriseName }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>经营许可证号：</label><span> {{ item_enterpriseInfo.licenseId }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>法定代表：</label><span> {{ item_enterpriseInfo.legalName }} </span>
      </div>
      <div class="vehicles-line-one">
        <label>法人联系方式：</label><span> {{ item_enterpriseInfo.legalTel }} </span>
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
  props: ["vehicleNo"],
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
      item_vehicleInfo:{},
      item_enterpriseInfo:{},
      colorName:'',
      vehiclesType:''
    };
  },
  mounted() {
    //if (this.istrue) {
      //this.getVehicleInfo(this.vehicleNo);
    //}
  },
  methods: {
    moreInfo(){
      let cph = this.data.vehicleNo ;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});

    },
    getVehicleInfo(vehicleNo) {
      this.hide = true;
      this.$http
        .$get("zdjc_dataAnalysisHandler/getVehicleInfoByVehicleNo", {  
          vehicleNo: vehicleNo || this.vehicleNo
        })
        .then(res => {
          res.vehicleNo = this.vehicleNo;
          res.vehicleHeight = res.vehicleHeight/1000; //将毫米转换成米

          let color = res.plateColorCode;
          this.colorTransfer(color);
          res.plateColorCode = this.colorName;
          this.getEnterpriseNameByEnterpriserId(res.enterpriseId);

          this.vehicleTypeTransfer(res.vehicleTypeCode);

          let registerDate = res.registerDate;
          res.registerDate = (registerDate==null || registerDate== undefined || registerDate=='')?'':dayjs(parseInt(registerDate)).format("YYYY-MM-DD");

          let purchaseDate = res.purchaseDate;
          res.purchaseDate = (purchaseDate==null || purchaseDate== undefined || purchaseDate=='')?'':dayjs(parseInt(purchaseDate)).toString().format("YYYY-MM-DD");
          
          let manuDate = res.manuDate;
          res.manuDate = (manuDate==null || manuDate== undefined || manuDate=='')?'':dayjs(parseInt(manuDate)).format("YYYY-MM-DD");
          
          let settleDate = res.settleDate;
          res.settleDate = (settleDate==null || settleDate== undefined || settleDate=='')?'':dayjs(parseInt(settleDate)).format("YYYY-MM-DD");
          
          this.item_vehicleInfo = res;
          this.istrue = false;
        });
    },
    getEnterpriseNameByEnterpriserId(enterpriseId){
       this.$http
        .$get("zdjc_dataAnalysisHandler/getEnterpriseById", {  
          enterpriseId: enterpriseId
        })
        .then(res => {
          this.item_enterpriseInfo = res;
        });
    },
    colorTransfer(color){
      switch(color){
            case 1:
              this.colorName='蓝色';
              break;
            case 2:
              this.colorName='黄色';
              break;
            case 3:
              this.colorName='黑色';
              break;
            case 4:
              this.colorName='白色';
              break;
            case 5:
              this.colorName='绿色';
              break;
            case 6:
              this.colorName='其他';
              break;
          }
    },
    vehicleTypeTransfer(vehicleType){
      switch(vehicleType){
        case 'B11' :this.vehiclesType='重型普通半挂车';break;
        case 'B12' :this.vehiclesType='重型厢式半挂车';break;
        case 'B13' :this.vehiclesType='重型罐式半挂车';break;
        case 'B15' :this.vehiclesType='重型集装箱半挂车';break;
        case 'B17' :this.vehiclesType='重型特殊结构半挂车';break;
        case 'B18' :this.vehiclesType='重型仓栅式半挂车';break;
        case 'H11' :this.vehiclesType='重型普通货车';break;
        case 'H12' :this.vehiclesType='重型厢式货车';break;
        case 'H14' :this.vehiclesType='重型罐式货车';break;
        case 'H18' :this.vehiclesType='重型特殊结构货车';break;
        case 'H19' :this.vehiclesType='重型仓栅式货车';break;
        case 'H21' :this.vehiclesType='中型普通货车';break;
        case 'H22' :this.vehiclesType='中型厢式货车';break;
        case 'H24' :this.vehiclesType='中型罐式货车';break;
        case 'H28' :this.vehiclesType='中型特殊结构货车';break;
        case 'H29' :this.vehiclesType='中型仓栅式货车';break;
        case 'H31' :this.vehiclesType='轻型普通货车';break;
        case 'H32' :this.vehiclesType='轻型厢式货车';break;
        case 'H33' :this.vehiclesType='轻型封闭货车';break;
        case 'H34' :this.vehiclesType='轻型罐式货车';break;
        case 'H38' :this.vehiclesType='轻型特殊结构货车';break;
        case 'K11' :this.vehiclesType='大型普通客车';break;
        case 'K21' :this.vehiclesType='中型普通客车';break;
        case 'K31' :this.vehiclesType='小型普通客车';break;
        case 'K33' :this.vehiclesType='小型轿车';break;
        case 'Q11' :this.vehiclesType='重型半挂牵引车';break;
        case '' :this.vehiclesType='未知';break;
      }
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
        line-height: 25px;
    float:left;
    width:660px;
    height:100%;
    margin:0px 10px 0px 8px;
    background:rgba(0,79,197,.4);
    //opacity:0.8;
    border-radius:4px;
    .vehicles-title{
      margin:8px 0px 11.5px 6.5px;
    }
    .vehicles-line-one{
      //margin-top:10px;
      margin:10px 0px 10px 8px;
      label{
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(153,153,153,1);
        }
    }
    .vehicles-line-two{
     // margin-top:10px;
      margin:10px 0px 10px 8px;
      .vehicles-left{
        float:left;
        //width:200px;
        width:60%;
        label{
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(153,153,153,1);
        }
      }
      .vehicles-right{
        float:left;
        width:38%;
        label{
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(153,153,153,1);
        }
      }
      
    }
  }
  .content-right{
    float:left;
    width:425px;
    height:100%;
    //margin-top:8px;
    background:rgba(0,79,197,.4);
    //opacity:0.8;
    border-radius:4px;
    .vehicles-title{
      margin:8px 0px 11.5px 6.5px;
    }
    .vehicles-line-one{
      margin:10px 0px 10px 8px;
      label{
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(153,153,153,1);
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