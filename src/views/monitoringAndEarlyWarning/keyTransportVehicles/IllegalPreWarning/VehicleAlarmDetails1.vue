<template>
  <div class="CyclingTime-wrapper nomap-content-container">
    <section class="search-wrapper">
      <!--   <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"></SearchPanel> -->
      <div class="firstLineCondition">
        <div class="searchCondition">
          <label>行政区划</label>
          <el-select
            v-model="value_AdministrativeDivision"
            placeholder="请选择"
            @change="handleAdministrativeDivisionChange"
          >
            <el-option
              v-for="item in options_AdministrativeDivision"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="searchCondition">
          <label>所属行业</label>
          <el-select v-model="value_Industry" placeholder="请选择" @change="handleIndustryChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="searchCondition">
          <label>业户名称</label>
          <el-input v-model="input_enterprise" placeholder style="width: 160px;"></el-input>
        </div>
        <div class="searchCondition">
          <label>车牌号</label>
          <el-input v-model="input_cph" placeholder style="width: 160px;"></el-input>
        </div>
        
        
      </div>
      <div class="secondLineCondition">
        <div class="searchCondition">
          <label>报警类型</label>
          <el-select v-model="value_AlarmType" placeholder="请选择" @change="handleAlermTypeChange">
            <el-option
              v-for="item in options_AlarmType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="searchCondition">
          <label>时间范围</label>
          <el-date-picker
            v-model="datevalue"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div class="searchCondition">
          <el-button type="primary" class="searchButton" @click="vehiclesQuery()">查询</el-button>
          <el-button type="primary" class="exportButton" @click="exportInfo()">导出</el-button>
        </div>
      </div>
    </section>
    <section class="echar-wrapper">
      <div class="item">
        <div class="result-table">
          <el-table
            :data="tableData_AlarmInfo"
            style="width:100%;height:100%;overflow-y: auto;"
            stripe
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="车牌号" prop="vehicleNo"></el-table-column>
            <el-table-column label="车牌颜色" prop="color" ></el-table-column>
            <el-table-column label="行政区划" prop="divisionName" ></el-table-column>
            <el-table-column label="报警类型" prop="alarmTypeName" ></el-table-column>
            <el-table-column label="报警次数" prop="alarmNum" ></el-table-column>
            <el-table-column label="报警开始时间" prop="alarmTime" width="" show-overflow-tooltip></el-table-column>
            <el-table-column label="报警结束时间" prop="alarmEndTime" width="" show-overflow-tooltip></el-table-column>
            <el-table-column label="所属行业" prop="vehicleType">
              <template slot-scope="scope">
                <label v-if="scope.row.vehicleType==111">班线客运</label>
                <label v-else-if="scope.row.vehicleType==114">包车客运</label>
                <label v-else-if="scope.row.vehicleType==140">危货运输</label>
                <label v-else-if="scope.row.vehicleType==112">公交运输</label>
                <label v-else-if="scope.row.vehicleType==113">巡游出租</label>
                <label v-else-if="scope.row.vehicleType==115">网约出租</label>
                <label v-else></label>
              </template>
            </el-table-column>
            <el-table-column label="业户名称" prop="enterprise" width="" show-overflow-tooltip>
              <template slot-scope="scope">
                <p
                  style="text-decoration: underline;cursor: pointer;"
                  @click="enterpriseJump(scope.$index, scope.row)"
                >{{scope.row.enterprise}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px;">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="table-detail-btn"
                  @click="handleEdit(scope.$index, scope.row)"
                >查看明细</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="result-page">
          <el-pagination
            small
            :pager-count="5"
            background
            layout="prev, pager, next,total"
            :total="total_AlarmInfo"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </section>

    <!--<TableAndPagination
          :showSearchPanel="false"
          :totalP="total_AlarmInfo"
          @fetchTableData="fetchTableData"
          @handleDetail="handleDetail"
          @getSearchValue="getSearchValue"
        >
          <el-table
            style="width: 100%;height:100%;overflow-y: auto;"
            :height="tableHeight"
            :data="tableData_AlarmInfo"
            stripe
            ref="table"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="车牌号" prop="vehicleNo"></el-table-column>
            <el-table-column label="车牌颜色" prop="vehicleColor"></el-table-column>
            <el-table-column label="报警次数" prop="alarmNum"></el-table-column>
            <el-table-column label="时间" prop="date"></el-table-column>
            <el-table-column label="所属行业" prop="ownerCode"></el-table-column>
            <el-table-column label="所属企业" prop="ownerName">
              <template slot-scope="scope">
                <p style="text-decoration: underline;cursor: pointer;" @click="enterpriseJump(scope.$index, scope.row)">{{scope.row.enterprise}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px;">
              <template slot-scope="scope">
                <el-button size="mini" class="table-detail-btn" @click="handleEdit(scope.$index, scope.row)">查看明细</el-button>
              </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>
      </div>
    </section>-->
    <section class="table-wrapper">
      <div class="detailTitle" v-if="isShowDetail">报警明细</div>
      <div class="item" v-if="isShowDetail">
        <TableAndPagination
          :showSearchPanel="false"
          :totalP="total_AlarmDetail"
          @fetchTableData="fetchTableData"
          @handleDetail="handleDetail"
          @getSearchValue="getSearchValue"
        >
          <el-table
            style="width: 100%;height:100%;overflow-y: auto"
            :height="tableHeight"
            :data="tableData_AlarmDetail"
            stripe
            ref="table"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="车牌号" prop="vehicleNo"></el-table-column>
            <el-table-column label="车牌颜色" prop="vehicleColor">
              <template slot-scope="scope">
                <label v-if="scope.row.vehicleColor==1">蓝色</label>
                <label v-else-if="scope.row.vehicleColor==2">黄色</label>
                <label v-else-if="scope.row.vehicleColor==3">黑色</label>
                <label v-else-if="scope.row.vehicleColor==4">白色</label>
                <label v-else-if="scope.row.vehicleColor==5">绿色</label>
                <label v-else-if="scope.row.vehicleColor==9">其他</label>
                <label v-else-if="scope.row.vehicleColor==91">农黄色</label>
                <label v-else-if="scope.row.vehicleColor==92">农绿色</label>
                <label v-else-if="scope.row.vehicleColor==93">黄绿色</label>
                <label v-else-if="scope.row.vehicleColor==94">渐变绿</label>
                <label v-else></label>
              </template>
            </el-table-column>
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
      </div>
    </section>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";
import dayjs from "dayjs";
import { _formatDate } from "../../../../components/common/common.js";
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
  mounted() {
    //this.getChars();
    this.getAdministrativeDivision();
    this.vehiclesQuery();
  },
  methods: {
    handleIndustryChange(val) {
      var obj = {};
      obj = this.options.find(function(item) {
        return item.value === val;
      });
      this.industryTemp = obj;
    },
    handleAlermTypeChange(val) {
      var obj = {};
      obj = this.options_AlarmType.find(function(item) {
        return item.value === val;
      });
      this.alarmTypeTemp = obj;
    },
    handleAdministrativeDivisionChange(val) {
      //行政区划
      var obj = {};
      obj = this.options_AdministrativeDivision.find(function(item) {
        return item.value === val;
      });
      this.administrativeDivisionTemp = obj;
    },
    handleCurrentChange(curPage) {
      debugger;
      this.vehiclesQuery(curPage);
    },
    vehiclesQuery(curPage) {
      debugger;
      let vehicleNo = this.input_cph;
      let enterpriseName = this.input_enterprise;
      let administrativeDivision = "";
      let alarmType = "";
      let industry = "";
      let timeRange = this.datevalue;
      let startTime = "";
      let endTime = "";
      if (timeRange != null && timeRange != undefined) {
        startTime = timeRange[0];
        endTime = timeRange[1];
      }

      let administrativeDivisionTemp = this.administrativeDivisionTemp;
      administrativeDivision = administrativeDivisionTemp.value;

      let administrativeDivisionName = administrativeDivisionTemp.label;

      let industryTemp = this.industryTemp;
      industry = industryTemp.value;

      let alarmTypeTemp = this.alarmTypeTemp;
      alarmType = alarmTypeTemp.value;

      let page =
        curPage != null && curPage != undefined && curPage != ""
          ? curPage
          : this.currentPage;
      let pageSize = this.pageSize;
      /* let queryFields_temp = new Array();
      

      if(administrativeDivision!=null && administrativeDivision!=undefined && administrativeDivision!=""){
        let queryField_AdministrationDivision = {};
        queryField_AdministrationDivision.columnName = "alarmDistinctCode";
        queryField_AdministrationDivision.dataType = "int";
        queryField_AdministrationDivision.operator = "=";
        queryField_AdministrationDivision.queryValue = administrativeDivision;
        queryFields_temp.push(queryField_AdministrationDivision);
      }
      
      if(industry!=null && industry!=undefined && industry!=""){
        let queryField_Industry = {};
        queryField_Industry.columnName = "industry";
        queryField_Industry.dataType = "int";
        queryField_Industry.operator = "=";
        queryField_Industry.queryValue = industry;
        queryFields_temp.push(queryField_Industry);
      }

      if(alarmType!=null && alarmType!=undefined && alarmType!=""){
        let queryField_AlarmType = {};
        queryField_AlarmType.columnName = "alarmType";
        queryField_AlarmType.dataType = "int";
        queryField_AlarmType.operator = "=";
        queryField_AlarmType.queryValue = alarmType;
        queryFields_temp.push(queryField_AlarmType);
      }

      if(vehicleNo!=null && vehicleNo!=undefined && vehicleNo!=""){
        let queryField_vehicleNo = {};
        queryField_vehicleNo.columnName = "vehicleNo";
        queryField_vehicleNo.dataType = "String";
        queryField_vehicleNo.operator = "like";
        queryField_vehicleNo.queryValue = vehicleNo;
        queryFields_temp.push(queryField_vehicleNo);
      }
      
      if(enterpriseName!=null && enterpriseName!=undefined && enterpriseName!=""){
        let queryField_EnterpriseName = {};
        queryField_EnterpriseName.columnName = "enterpriseName";
        queryField_EnterpriseName.dataType = "String";
        queryField_EnterpriseName.operator = "like";
        queryField_EnterpriseName.queryValue = enterpriseName;
        queryFields_temp.push(queryField_EnterpriseName);
      }
      
      if(timeRange!=null && timeRange!=undefined && timeRange!=""){
        let queryField_TimeRange = {};
        queryField_TimeRange.columnName = "enterpriseName";
        queryField_TimeRange.dataType = "String";
        queryField_TimeRange.operator = "like";
        queryField_TimeRange.queryValue = timeRange;
        queryFields_temp.push(queryField_TimeRange);
      }
      
      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      search.queryFields = JSON.stringify(queryFields_temp);
      console.log(search);

      let page = 1;
      let pageSize = 10;*/
      this.$http
        .$post("zdjc_IllegalWarningHandler/getVehicleAlarmDetailsByPage", {
          division: administrativeDivision,
          divisionName: administrativeDivisionName,
          vehicleType: industry,
          alarmType: alarmType,
          enterprise: enterpriseName,
          vehicleNo: vehicleNo,
          page: page,
          pageSize: pageSize,
          startTime: startTime,
          endTime: endTime
        })
        .then(param => {
          //this.dealWithData(param);
          this.tableData_AlarmInfo = param.results;
          this.total_AlarmInfo = param.totalRecordNum;
          this.tableData_AlarmDetail = [];
          this.total_AlarmDetail = 0;
          let tableDataTemp = param.results;
          if(tableDataTemp.length>0){
            this.handleEdit(0,tableDataTemp[0]);
          }else{
            this.isShowDetail = true;
          }

        });
    },
    exportInfo() {},
    getAdministrativeDivision() {
      this.$http
        .$get("zdjc_AlertSettingHandler/getAdministrativeDivision")
        .then(res => {
          let options = [
            {
              value: "0",
              label: "全部"
            }
          ];
          for (let i in res) {
            let option = [];
            option.value = res[i].codeValue;
            option.label = res[i].codeName;
            options.push(option);
          }

          this.options_AdministrativeDivision = options;
        });
    },
    enterpriseJump(index, row) {
      let enterprise = row.enterprise;
      //此处需要路由跳转  经营业户查询
      //this.$router.push({
      //name: "enterpriseSearch",
      //params: { search: "123" }
      // });
    },
    GPSLocation(index, row) {
      debugger;
      //跳转到 车辆高级查询，平带着车牌号
      let cph = row.vehicleNo;
      this.$router.push({
        path:
          "/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch",
        query: { input_cph: cph }
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
    workCountFormat(row) {
      return row.workNum == null ? 0 : row.workNum;
    },
    restCountFormat(row) {
      return row.restNum == null ? 0 : row.restNum;
    },
    getChars() {
      this.$http
        .$get("/gxdc_bikeServiceAnalysisHandler/getCycleTimesInTime")
        .then(data => {
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
      pickerOptions: dateRang,
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
.echar-wrapper {
  //display: flex;
  background-image: linear-gradient(to right, rgba(32, 86, 221, 0.4), #0a1e53);
  .item {
    width: 100%;
    height: 410px;
    .result-table {
      width: 100%;
      height: 380px;
    }
    result-page {
      width: 100%;
      height: 15px;
    }
    /** &:first-child {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        text-align: center;
        li:nth-child(1) {
          font-size: 26px;
          color: red;
        }
        li:nth-child(2) {
          font-size: 26px;
          color: red;
          margin: 20px 0;
        }
        li:nth-child(3) {
          font-size: 22px;
          color: yellow;
        }
      }
    }
    &:last-child {
      flex: 5;
      position: relative;
      .echar-pie {
        width: 100%;
        height: 100%;
      }
      .btn-wrappper {
        position: absolute;
        top: 10px;
        right: 120px;
        span {
          display: inline-block;
          cursor: pointer;
          padding: 6px;
          border-radius: 10px;
          font-size: 14px;
          &:first-child {
            background-color: #fff;
            border: 1px solid #fff;
            color: #2056dd;
          }
          &:last-child {
            background-color: aqua;
            margin-left: 20px;
            background-color: #2056dd;
            border: 1px solid #2056dd;
            color: #fff;
          }
        }
      }
    }*/
  }
}
.table-wrapper {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  .item {
    &:first-child {
      flex-basis: 26px;
      line-height: 26px;
      span {
        display: inline-block;
        cursor: pointer;
        padding: 3px;
        border-radius: 10px;
        font-size: 14px;
        &:first-child {
          background-color: #fff;
          border: 1px solid #fff;
          color: #2056dd;
        }
        &:last-child {
          background-color: aqua;
          margin-left: 20px;
          background-color: #485dcc;
          border: 1px solid #485dcc;
          color: #fff;
        }
      }
    }
    &:last-child {
      flex: 1;
      height: calc(100% - 30px);
    }
  }
}
</style>
<style lang="css" scoped>
.echar-wrapper >>> .SearchPanel {
  flex-basis: 0rem;
}
</style>