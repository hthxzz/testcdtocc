<template>
  <div class="detail-form-container" v-if="show">
    <el-dialog title="从业人员详情" :visible.sync="show" width="50%" :modal-append-to-body="false" :close="close">
      <!--<el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
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
            <label>车牌号码：</label><span> {{ item_vehicleInfo.vehicleNo }} </span>
          </div>
          <div class="vehicles-right">
            <label>车牌颜色：</label><span> {{ item_vehicleInfo.plateColorCode }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>车牌号码：</label><span> {{ item_vehicleInfo.vehicleNo }} </span>
          </div>
          <div class="vehicles-right">
            <label>车牌颜色：</label><span> {{ item_vehicleInfo.plateColorCode }} </span>
          </div>
        </div>
      </el-card>-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>人员驾驶证信息</span>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>驾驶证号：</label><span> {{ item_personDriverlicense.licenseId }} </span>
          </div>
          <div class="vehicles-right">
            <label>准假车型：</label><span> {{ item_personDriverlicense.allowVehicleCode }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>初次领证日期：</label><span> {{ item_personDriverlicense.initialDate }} </span>
          </div>
          <div class="vehicles-right">
            <label>驾驶证有效期限：</label><span> {{ item_personDriverlicense.licensePeriod }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>驾驶证有效期起：</label><span> {{ item_personDriverlicense.effectiveDate }} </span>
          </div>
          <div class="vehicles-right">
            <label>驾驶证有效期止：</label><span> {{ item_personDriverlicense.expireDate }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>发证机关：</label><span> {{ item_personDriverlicense.issueAutho }} </span>
          </div>
          <div class="vehicles-right">
            <label></label><span></span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>人员从业资格证信息</span>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>人员证件号：</label><span> {{ item_personQualify.cardId }} </span>
          </div>
          <div class="vehicles-right">
            <label>从业资格证号：</label><span> {{ item_personQualify.certifyId }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>证件类别：</label><span> {{ item_personQualify.certifyTypeCode }} </span>
          </div>
          <div class="vehicles-right">
            <label>证件状态：</label><span> {{ item_personQualify.certifyStatus }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>资格证有效期起：</label><span> {{ item_personQualify.certifySdate }} </span>
          </div>
          <div class="vehicles-right">
            <label>资格证有效期止：</label><span> {{ item_personQualify.certifyEdate }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>发证机关：</label><span> {{ item_personQualify.certifyAutho }} </span>
          </div>
          <div class="vehicles-right">
            <label>发证日期</label><span> {{ item_personQualify.issueDate }} </span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>人员服务质量信誉考核信息</span>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>人员证件号：</label><span> {{ item_personQualify.cardId }} </span>
          </div>
          <div class="vehicles-right">
            <label>考核等级：</label><span> {{ item_personQualify.evaluLevelCode }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>证件类别：</label><span> {{ item_personQualify.cardTypeCode }} </span>
          </div>
          <div class="vehicles-right">
            <label>考核日期：</label><span> {{ item_personQualify.evaluDate }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>考核机构：</label><span> {{ item_personQualify.evaluOrg }} </span>
          </div>
          <div class="vehicles-right">
            <label></label><span></span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>人员专业技术证书信息</span>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>证书名称：</label><span> {{ item_personSkillcertify.techCertify }} </span>
          </div>
          <div class="vehicles-right">
            <label>证书分类：</label><span> {{ item_personSkillcertify.techTypeId }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>人员证件号：</label><span> {{ item_personSkillcertify.cardId }} </span>
          </div>
          <div class="vehicles-right">
            <label>技术等级：</label><span> {{ item_personSkillcertify.techLevelCode }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>证件类别：</label><span> {{ item_personSkillcertify.cardTypeCode }} </span>
          </div>
          <div class="vehicles-right">
            <label>发放日期：</label><span> {{ item_personSkillcertify.issueDate }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>有效期始：</label><span> {{ item_personSkillcertify.effectiveDate }} </span>
          </div>
          <div class="vehicles-right">
            <label>有效期止：</label><span> {{ item_personSkillcertify.expireDate }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>发证机关：</label><span> {{ item_personSkillcertify.issueAutho }} </span>
          </div>
          <div class="vehicles-right">
            <label>有效期限</label><span>{{ item_personSkillcertify.certifyPeriod }} </span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>人员继续教育培训信息</span>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>证书编号：</label><span> {{ item_personTrain.trainCertifyId }} </span>
          </div>
          <div class="vehicles-right">
            <label>证件类别：</label><span> {{ item_personTrain.cardTypeCode }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>证件号码：</label><span> {{ item_personTrain.cardId }} </span>
          </div>
          <div class="vehicles-right">
            <label>培训日期：</label><span> {{ item_personTrain.trainDate }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>培训内容：</label><span> {{ item_personTrain.trainContent }} </span>
          </div>
          <div class="vehicles-right">
            <label>培训机构：</label><span> {{ item_personTrain.trainOrg }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>培训成绩：</label><span> {{ item_personTrain.trainScore }} </span>
          </div>
          <div class="vehicles-right">
            <label></label><span></span>
          </div>
        </div>
      </el-card>
      
      
    <!--  <el-row v-for="items in itemList" :key="items.title">
        <el-col v-for="item in items" :span="item.col || 12" :key="item.name">
          <label class="label detail-form-label" style>{{ item.label }} :</label>
          <span class="detail-form-content">{{ item.value }}</span>
        </el-col>
      </el-row>-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close()" style="cursor: pointer;">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "EmployedDetailForm",
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  props: ['show','personId','personName','cardId'],
  created() {
    // generateHTMLStructure()
  },
  methods: {
    getPersonDetails(personId,personName,cardId){
      this.$http
        .$get("zdjc_basicDataQueryHandler/getPersonDetails",{personId:personId||this.personId,personName:personName||this.personName,cardId:cardId||this.cardId})
        .then(res => {
          debugger;
          if(res!=null && res!=undefined){
            // this.item_personDriverlicense = res.ggPersonDriverlicense;
            // this.item_personQualify = res.ggPersonQualify;
            // this.item_personServiceqa =res.ggPersonServiceqa;
            // this.item_personSkillcertify = res.ggPersonSkillcertify;
            // this.item_personTrain = res.ggPersonTrain;
          }
        });
    }
    ,close(){
      this.$emit("hideDetailForm");
    }
  },
  data() {
    return {
      // show:this.detailFormConfig.show
      show:false,
      item_vehicleInfo:{},
      item_personDriverlicense:{},
      item_personQualify:{},
      item_personServiceqa:{},
      item_personSkillcertify:{},
      item_personTrain:{}
    };
  }
};
</script>

<style lang="scss" scoped>
.detail-form-container {
  text-align: left;
  color: #fff;
  .box-card{
    background-color: rgba(32, 86, 221, 0.64);
    color: #FFFFFF;
    margin-bottom:10px;
    border-width: 0px;
    line-height: 30px;
    
    .vehicles-line-two{
      .vehicles-left{
        float:left;
        width:50%;
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
        width:49%;
        label{
          color: #999999;
          font-family:Source Han Sans CN;
          font-weight:400;
        }
      }
    }
  }

}
.label {
  color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  display: inline-block;
  height: 30px;
  font-size: 14px;
}
</style>
