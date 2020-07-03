<template>
  <!-- 车辆运行监测 -- 营运车辆查询数据 -- 车辆信息 -->
  <div class="vehicleInfo-wrapper nomap-content-container">
        <TableAndPagination 
                  :searchConfig="searchConfig" 
                  :totalP=total
                  @fetchTableData="fetchTableData"
                  @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="序号"  type="index" width="100" ></el-table-column>
            <el-table-column label="车牌号" prop="vehiclePlateNum"></el-table-column>
            <el-table-column label="行业类型" prop="vehicleCharacter">
              <template slot-scope="scope"> 
                <label v-if="scope.row.vehicleCharacter==111">公路客运</label>
                <label v-else-if="scope.row.vehicleCharacter==112">公交客运</label>
                <label v-else-if="scope.row.vehicleCharacter==113">出租客运</label>
                <label v-else-if="scope.row.vehicleCharacter==114">旅游客运</label>
                <label v-else-if="scope.row.vehicleCharacter==115">网约客运</label>
                <label v-else-if="scope.row.vehicleCharacter==120">租赁</label>
                <label v-else-if="scope.row.vehicleCharacter==130">教练</label>
                <label v-else-if="scope.row.vehicleCharacter==140">货运</label>
                <label v-else-if="scope.row.vehicleCharacter==141">危化品运输</label>
                <label v-else></label>
              </template>
            </el-table-column>
            <el-table-column label="企业编号" prop="enterpriseName"></el-table-column>
            <!--<el-table-column label="车辆类型" prop="vehicleType"></el-table-column>-->
            <el-table-column label="车辆厂牌型号" prop="brandModel"></el-table-column>
            <el-table-column label="年审状态" prop="statusName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" class="table-detail-btn" @click="handleDetail(scope.$index,scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>

  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import {_formatDate} from "../../../../components/common/common.js";
export default {
  name: "",
  mixins: [tableMixins],
  filters: {
            formatDate(time) {
            if (time<0) return '0000-00-00 00:00:00';
            let date = new Date(time/1);
            return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分
            }
        },
  methods:{
    handleDetail(index,row){
      let cph = row.vehiclePlateNum;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});
    },
    getAdministrativeDivision(){
      this.$http
        .$get("zdjc_AlertSettingHandler/getAdministrativeDivision")
        .then(res => {
          let options = [{
                        value: '0',
                        label: '全部'
                    }];
          for(let i in res){
            let option = [];
            //option.value = res[i].codeValue;
            option.value = res[i].codeName;
            option.label = res[i].codeName;
            options.push(option);
          }

          let searchConfig = this.searchConfig;
          let searchCondition = searchConfig.searchCondition;
          searchCondition[0].options = options ;

        });
    }, 
    /**getSearchValue(content){
      debugger;
                 let vehicleNo = "";
                 let enterpriseName = "";
                 for(let i in content){
                   if(content[i].columnName == "vehicleNo"){
                    vehicleNo = content[i].queryValue;
                   }
                   if(content[i].columnName == "enterpriseName"){
                    enterpriseName = content[i].queryValue;
                   }

                 }
                 
                 let page = 1;
                 let pageSize = 10;
             this.$http.$get("zdjc_basicDataQueryHandler/getOnlineVehicleByPage",{"vehicleNo":vehicleNo,"enterpriseName":enterpriseName,"page":page}).then((param) => {
                //this.dealWithData(param);
                this.tableData = param.results;
                this.total = param.totalRecordNum;
              });
    }*/
  },
  mounted() {
   this.getAdministrativeDivision();
  },
  data() {
    return {
      title: "",
      url: "zdjc_basicDataQueryHandler/getVehicleByPage",
      searchConfig: {
        searchCondition: [
          {
            order: 36,
            type: "select",
            label: "行政区划",
            placeholder: "",
            VModelvalue: {
              name: "areaName",
              defaultValue: ""
            },
            options: []
          },
          {
            order: 3,
            type: "input",
            label: "车牌号",
            placeholder: "",
            VModelvalue: {
              name: "vehiclePlateNum",
              defaultValue: ""
            },
          },
          {
            order: 36,
            type: "select",
            label: "行业类型",
            placeholder: "",
            VModelvalue: {
              name: "vehicleCharacter",
              defaultValue: ""
            },              
            options: [{
                        value: '0',
                        label: '全部'
                    },{
                        value: '111',
                        label: '班线客运'
                    }, {
                        value: '114',
                        label: '包车客运'
                    }, {
                        value: '140',
                        label: '危货运输'
                    }, {
                        value: '112',
                        label: '公交运输'
                    }, {
                        value: '113',
                        label: '巡游出租'
                    }, {
                        value: '115',
                        label: '网约出租'
                    }
          
            ]
          }
        ],
        searchButtonGroup:  [
          {
            action: "query",
            label: "查询"
          },
          {
            action: "export",
            label: "导出"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
    .vehicleInfo-wrapper{
      height: calc(100% - 40px);
      margin-top: 40px;   
      
    }
</style>

