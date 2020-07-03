<template>
  <div class="detail-form-container" v-if="show">
    <el-dialog :title="detailTitle" :visible.sync="show" width="50%" :modal-append-to-body="false" :close="close">    
    <section class="table-wrapper">
       <TableAndPagination
          :showSearchPanel="false"
          :totalP="total_AlarmDetail"
          @fetchTableData="fetchTableData"
          @handleDetail="handleDetail"
          @getSearchValue="getSearchValue"
        >
          <el-table
            style="width: 100%;height:100%;overflow-y: auto"
            :data="tableData_AlarmDetail"
            stripe
            ref="table"
          >
            <el-table-column type="index" width="50"></el-table-column>
            
            <el-table-column label="报警开始时间" prop="alarmTime">
              <template slot-scope="scope">{{scope.row.alarmTime|formatDate}}</template>
            </el-table-column>
            <el-table-column label="报警结束" prop="alarmEndTime">
              <template slot-scope="scope">{{scope.row.alarmEndTime|formatDate}}</template>
            </el-table-column>
            <el-table-column label="报警类型" prop="alarmTypeName"></el-table-column>
            <el-table-column label="操作" width="120px;">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="table-detail-btn"
                  @click="GPSLocation(scope.$index, scope.row)"
                >GPS定位</el-button>
              </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>
    </section>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close()" style="cursor: pointer;">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import dayjs from "dayjs";
import { _formatDate } from "../../../../../components/common/common.js";
//import { option3 } from "./options";
import _ from "lodash";
export default {
  name: "",
  mixins: [tableMixins],
  filters: {
    formatDate(time) {
      if (time < 0) return "0000-00-00 00:00:00";
      let date = new Date(time / 1);
      return _formatDate(date, "yyyy-MM-dd hh:mm:ss"); //年-月-日 时分
    }
  },
  props: ['show','vehicleNo','detailTitle','alarmTime','alarmEndTime','vehicleType'],
  mounted() {   
  },
  methods: {
    getVehicleAlarm(vehicleNo,vehicleType,alarmTime,alarmEndTime){  

      let queryFields_temp = [];
      if (vehicleNo != null && vehicleNo != undefined && vehicleNo != "") {

        let queryField_vehicleNo = {};
        queryField_vehicleNo.columnName = "vehicleNo";
        queryField_vehicleNo.dataType = "String";
        queryField_vehicleNo.operator = "like";
        queryField_vehicleNo.queryValue = vehicleNo;
        queryFields_temp.push(queryField_vehicleNo);
      }
      if (vehicleType != null && vehicleType != undefined && vehicleType != "") {
         let queryField_vehicleType = {};
         queryField_vehicleType.columnName = "vehicleType";
         queryField_vehicleType.dataType = "int";
         queryField_vehicleType.operator = "=";
         queryField_vehicleType.queryValue = vehicleType;
         queryFields_temp.push(queryField_vehicleType);
      }

      if (alarmTime != null && alarmTime != undefined && alarmTime != "") {

        let queryField_alarmTime = {};
        queryField_alarmTime.columnName = "alarmTime";
        queryField_alarmTime.dataType = "Date";
        queryField_alarmTime.operator = ">=";
        queryField_alarmTime.queryValue = alarmTime;
        queryFields_temp.push(queryField_alarmTime);
      }

      if (alarmEndTime != null && alarmEndTime != undefined && alarmEndTime != "") {

        let queryField_alarmEndTime = {};
        queryField_alarmEndTime.columnName = "alarmEndTime";
        queryField_alarmEndTime.dataType = "Date";
        queryField_alarmEndTime.operator = "<=";
        queryField_alarmEndTime.queryValue = alarmEndTime;
        queryFields_temp.push(queryField_alarmEndTime);
      }

      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      search.queryFields = JSON.stringify(queryFields_temp);

      this.$http
        .$post(
          "zdjc_IllegalWarningHandler/getVehicleAlarmListByVehicleNo",
          search
        )
        .then(res => {
          debugger;
          this.tableData_AlarmDetail = res.results;
          this.total_AlarmDetail = res.totalRecordNum;
        });
    },
    handleEdit(index, row) {
      this.isShowDetail = true;
      let vehicleNo = row.vehicleNo;
      let industry = row.vehicleType;

      let queryFields_temp = [];
      if (vehicleNo != null && vehicleNo != undefined && vehicleNo != "") {
        let queryField_vehicleNo = {};
        queryField_vehicleNo.columnName = "vehicleNo";
        queryField_vehicleNo.dataType = "String";
        queryField_vehicleNo.operator = "like";
        queryField_vehicleNo.queryValue = vehicleNo;
        queryFields_temp.push(queryField_vehicleNo);
      }
      if (industry != null && industry != undefined && industry != "") {
        let queryField_industry = {};
        queryField_industry.columnName = "vehicleType";
        queryField_industry.dataType = "int";
        queryField_industry.operator = "=";
        queryField_industry.queryValue = industry;
        queryFields_temp.push(queryField_industry);
      }
      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      search.queryFields = JSON.stringify(queryFields_temp);

      this.$http
        .$post(
          "zdjc_IllegalWarningHandler/getVehicleAlarmListByVehicleNo",
          search
        )
        .then(res => {
          debugger;
          this.tableData_AlarmDetail = res.results;
          this.total_AlarmDetail = res.totalRecordNum;
        });
    },
    close(){
      this.$emit("hideDetailForm");
    },
    GPSLocation(index, row) {
      //跳转到 车辆高级查询，平带着车牌号
      let cph = row.vehicleNo;
      this.$router.push({
        path:
          "/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch",
        query: { input_cph: cph }
      });
    },
    getSearchValue(val) {
      this.getSearchTableValue(val);
      let isKeyV = this.searchConfig.isKeyV;
      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      if (isKeyV) {
        Object.assign(search, val);
      } else {
        search.queryFields = JSON.stringify(val);
      }
      this.$http.$post(this.url, search).then(data => {
        if (this.showPagination) {
          this.tableData = data.results;
          this.total = data.totalRecordNum;
        } else {
          this.tableData = data;
        }
        let xAxisData = [],
          seriesData = [],
          legendData = ["工作日", "节假日"],
          ydata = [],
          ydata2 = [];
        for (const item of data.results) {
          xAxisData.push(item.hour);
          ydata.push(item.workNum == null ? 0 : item.workNum);
          ydata2.push(item.restNum == null ? 0 : item.restNum);
        }
        seriesData.push(ydata);
        seriesData.push(ydata2);
        let option = this.$utils.echart.getBarOption({
          xAxisData: xAxisData,
          legendData: legendData,
          seriesData: seriesData
        });
        this.option = option;
      });
    }
  },
  data() {
    return {
      url: "zdjc_IllegalWarningHandler/getVehicleAlarmDetails",
      input_enterprise: "",
      input_cph: "",
      administrativeDivisionTemp: {},
      industryTemp: {},
      alarmTypeTemp: {},
      datevalue: "",
      value_AdministrativeDivision: "",
      options_AdministrativeDivision: [],
      value_AdministrativeDivision: "",
      options_AlarmType: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "超速报警"
        },
        {
          value: "2",
          label: "违法上路报警"
        },
        {
          value: "3",
          label: "疲劳驾驶报警"
        },
        {
          value: "4",
          label: "违法通行报警"
        },
        {
          value: "5",
          label: "运行线路报警"
        },
        {
          value: "6",
          label: "教练车跨区域教学报警"
        }
      ],
      value_AlarmType: "0",
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "111",
          label: "班线客运"
        },
        {
          value: "114",
          label: "包车客运"
        },
        {
          value: "140",
          label: "危货运输"
        },
        {
          value: "112",
          label: "公交运输"
        },
        {
          value: "113",
          label: "巡游出租"
        },
        {
          value: "115",
          label: "网约出租"
        }
      ],
      value_Industry: "0", //此处默认 下拉列 什么都不选中

      option: {},
      tableData_AlarmInfo: [],
      total_AlarmInfo: 0,
      total_AlarmDetail: 0,
      tableData_AlarmDetail: [],
      isShowDetail: false
    };
  }
};
</script>

<style lang="scss" scoped>
.CyclingTime-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  section:not(:first-child) {
    flex: 1;
  }
  .search-wrapper {
    //flex-basis: 50px;
    .firstLineCondition {
      height: 45px;
      .searchCondition {
        float: left;
        margin-left: 10px;
      }
    }
    .secondLineCondition {
      margin: 5px 0px 10px 0px;
      .searchCondition {
        float: left;
        margin-left: 10px;
      }
    }
  }
}
.table-wrapper {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  height: 540px;
}
</style>