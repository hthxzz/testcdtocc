<template>
  <!-- 车辆报警查询 -->
  <div class="vehicleInfo-wrapper">
    <div class="search-wrapper">
      <div class="time-zone">
        <div class="time-left">
          <label>时间区间</label>
        </div>
        <div class="time-right">
          <el-date-picker
                        v-model="value_TemplateTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-button type="primary" class="searchButton" @click="vehiclesQuery()">查询</el-button>  
      </div>
    </div>
    <div class="result">
      <el-table :data="tableResult" style="width: 100%;overflow-y: auto;" stripe ref="table" >
       <!--<el-table style="width: 100%;height:210px;overflow-y: auto" :data="tableData" stripe ref="table" >-->
            <el-table-column label="序号"  type="index" width="100" ></el-table-column>
            <el-table-column label="车牌号" prop="vehicleNo"></el-table-column>
            <el-table-column label="颜色" prop="vehicleColor"></el-table-column>
            <el-table-column label="报警开始时间" prop="alarmTime">
              <template slot-scope="scope">
                        {{scope.row.alarmTime|formatDate}}
                      </template>
            </el-table-column>
            <el-table-column label="报警结束时间" prop="alarmEndTime">]
              <template slot-scope="scope">
                        {{scope.row.alarmEndTime|formatDate}}
                      </template>
            </el-table-column>
            <el-table-column label="报警类型" prop="alarmTypeName"></el-table-column>
          <!--  <el-table-column label="驾驶员" prop="driver"></el-table-column>
            <el-table-column label="企业编码" prop="ownerCode"></el-table-column>-->
          </el-table>
        <el-pagination small  :pager-count="5" 
                background layout="prev, pager, next,total" 
                :total="queryResult_Area" 
                 @current-change="handleCurrentChange"
          ></el-pagination> 
    </div>
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import dayjs from "dayjs";
import {_formatDate} from "../../../../../../components/common/common.js";
import { daterange } from "@/components/common/searchPanel/SearchPanelConfig";
export default {
  name: "",
    data() {
      return {
        title: "",
        value_TemplateTime:'',
        queryResult_Area:'',
        pickerOptions: daterange,
        tableResult:[],
        searchConfig: {
        }
      };
  },
  mixins: [tableMixins],
  props: ["vehicleNo","vehicleColor_Monitor"],
  filters: {
    formatDate(time) {
      if (time<0) return '0000-00-00 00:00:00';
            let date = new Date(time/1);
            return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分
    }
  },
  methods:{
    vehiclesQuery(vehicleNo,vehicleColor){
      let time = this.value_TemplateTime;
      let timeStart = dayjs(time[0]).format("YYYY-MM-DD HH:mm:ss");
      let timeEnd = dayjs(time[1]).format("YYYY-MM-DD HH:mm:ss");

      let queryFields_temp = [];

      let queryField_VehicleNo = {};
      queryField_VehicleNo.columnName = "vehicleNo";
      queryField_VehicleNo.dataType = "String";
      queryField_VehicleNo.operator = "like";
      queryField_VehicleNo.queryValue = this.vehicleNo;
      //queryField_VehicleNo.queryValue = '川L76800';
      queryFields_temp.push(queryField_VehicleNo);

      let queryField_VehicleColor = {};
      queryField_VehicleColor.columnName = "vehicleColor";
      queryField_VehicleColor.dataType = "int";
      queryField_VehicleColor.operator = "=";
      queryField_VehicleColor.queryValue = this.vehicleColor_Monitor;
      queryFields_temp.push(queryField_VehicleColor);

      let queryField_StartTime = {};
      queryField_StartTime.columnName = "alarmTime";
      queryField_StartTime.dataType = "Date";
      queryField_StartTime.operator = ">=";
      queryField_StartTime.queryValue = timeStart;
      queryFields_temp.push(queryField_StartTime);
      
      let queryField_EndTime = {};
      queryField_EndTime.columnName = "alarmEndTime";
      queryField_EndTime.dataType = "Date";
      queryField_EndTime.operator = "<=";
      queryField_EndTime.queryValue = timeEnd;
      queryFields_temp.push(queryField_EndTime);

      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      search.queryFields = JSON.stringify(queryFields_temp);
      this.$http
        .$post("zdjc_dataAnalysisHandler/getAlarmInfoByPage", search 
          )
        .then(res => {
          //res.vehicleNo = this.vehicleNo;
          this.tableResult = res.results;
          this.queryResult_Area = res.totalRecordNum;
          //this.istrue = false;
        });
    },
    getVehicleInfo1(){
     // alert("");
    },
    handleCurrentChange(current){

    },
    handleDetail(index,row){
      let cph = row.vehiclePlateNum;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehic les/operaterMonitor/vehiclesSearch', query: {"input_cph": cph}});
    }
  },

};
</script>

<style lang="scss" scoped>
    .vehicleInfo-wrapper{
      height: 100%;
      margin:8px 8px 8px 8px;
      background:rgba(0,79,197,.4);
      .search-wrapper{
        .time-zone{
          float: left;
          .time-left{
            margin-top: 12px;
            float: left;
          }
          .time-right{
            float: left;
          }
        }
      }
      .result{
        float: left; 
        width:100%;
        height: 90%;
        .el-table{
          height:85% !important;
        }
      }
    }
</style>

