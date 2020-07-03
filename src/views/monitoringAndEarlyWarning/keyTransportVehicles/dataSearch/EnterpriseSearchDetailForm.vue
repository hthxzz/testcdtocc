<template>
  <div class="detail-form-container" v-if="show">
    <el-dialog title="经营业户详情" :visible.sync="show" width="50%" :modal-append-to-body="false" :close="close">
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
          <span>企业质量信誉等级评定信息</span>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>企业名称：</label><span> {{ item_EnterpriseCredit.enterpriseName }} </span>
          </div>
          <div class="vehicles-right">
            <label>企业统一社会信用：</label><span> {{ item_EnterpriseCredit.registerCode }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>考核项目：</label><span> {{ item_EnterpriseCredit.evaluItemCode }} </span>
          </div>
          <div class="vehicles-right">
            <label>考核项目分值：</label><span> {{ item_EnterpriseCredit.itemScore }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>考核项目限值：</label><span> {{ item_EnterpriseCredit.itemLimit }} </span>
          </div>
          <div class="vehicles-right">
            <label>考核累计分值：</label><span> {{ item_EnterpriseCredit.accuScore }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>考核机构：</label><span> {{ item_EnterpriseCredit.evaluOrg }} </span>
          </div>
          <div class="vehicles-right">
            <label>信誉考核年度：</label><span> {{ item_EnterpriseCredit.evluaYear }} </span>
          </div>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>信誉等级：</label><span> {{ item_EnterpriseCredit.credit_level_code }} </span>
          </div>
          <div class="vehicles-right">
            <label></label><span></span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>企业等级登记信息</span>
        </div>
        <div class="vehicles-line-two">
          <div class="vehicles-left">
            <label>企业等级：</label><span> {{ item_EnterpriseGrade.enterpriseLevelCode }} </span>
          </div>
          <div class="vehicles-right">
            <label>等级评定日期：</label><span> {{ item_EnterpriseGrade.assessDate }} </span>
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
  name: "EnterpriseSearchDetailForm",
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  props: ['show','enterpriseId','enterpriseName'],
  created() {
    // generateHTMLStructure()
  },
  methods: {
    getEnterpriseDetails(enterpriseId,enterpriseName){
      this.$http
        .$get("zdjc_basicDataQueryHandler/getEnterpriseDetails",{enterpriseId:enterpriseId||this.enterpriseId,enterpriseName:enterpriseName||this.enterpriseName})
        .then(res => {
          debugger;
          if(res!=null && res!=undefined){
          //  this.item_EnterpriseCredit = res.ggEnterpriseCredit;
          //  this.item_EnterpriseGrade = res.ggEnterpriseGrade;
          }
        });
    }
    ,close(){
      this.$emit("hideDetailForm");
    }
  },
  data() {
    return {
      show:false,
      item_vehicleInfo:{},
      item_EnterpriseCredit:{},
      item_EnterpriseGrade:{}
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
