<template>
  <div class="CyclingTime-wrapper nomap-content-container">
  <panel>
    <section class="search-wrapper">
     <!--   <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"></SearchPanel> -->
     <div class="firstLineCondition">
        <div class="searchCondition">
          <label>所属行业</label>
          <el-select v-model="value_vehicleType" placeholder="请选择" @change="handleIndustryChange"> 
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>
        <div class="searchCondition">
          <label>业户名称</label>
          <el-input v-model="input_enterprise" placeholder="" style="width: 160px;"></el-input>
        </div>
        <div class="searchCondition">
          <label>统计时间</label>
          <el-select v-model="value_Statistics" placeholder="请选择" @change="handleStatisticsChange" style="width:80px;"> 
              <el-option
                v-for="item in options_Statistics"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
          <el-date-picker
            v-model="value_StatisticsYear"
            type="year"
            format="yyyy"
            value-format="yyyy"
            placeholder="选择年" style="width: 160px;" v-if="value_Statistics==0">
          </el-date-picker>
          <el-date-picker
            v-model="value_StatisticsMonth"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择月" style="width: 160px;" v-if="value_Statistics==1">
          </el-date-picker>
        </div> 

        <div class="searchCondition">
          <label>排序</label>
          <el-select v-model="value_AlarmType" placeholder="请选择" @change="handleAlarmTypeChange"> 
              <el-option
                v-for="item in options_AlarmType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>      
        <div class="searchCondition">
          <el-button type="primary" class="searchButton" @click="vehiclesQuery()">查询</el-button>   
        </div>
      </div>
    </section>
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <div class="item">
        <div class="echar-pie" style="height: 300px">
            <v-chart :options="monthOption" :autoresize="true"/>
          </div>
      </div>
    </section>
    <section class="echar-table-wrapper">
      <div class="item">
          <div class="echar-table" style="height:350px;"> 
            <TableAndPagination
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
                <el-table-column label="所属行业" prop="vehicleTypeName"></el-table-column>
                <el-table-column label="业户名称" prop="enterprise">
                  <template slot-scope="scope">
                    <p style="text-decoration: underline;cursor: pointer;" @click="enterpriseJump(scope.$index, scope.row)">{{scope.row.enterprise}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="营运车辆数" prop="vehicleNum"></el-table-column>
                <el-table-column label="报警次数" prop="alarmNum"></el-table-column>              
                <el-table-column label="报警率" prop="alarmRate"></el-table-column>
                <el-table-column label="统计时间" prop="date"></el-table-column>
                <el-table-column label="操作" width="120px;">
                  <template slot-scope="scope">
                    <el-button size="mini" class="table-detail-btn" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </TableAndPagination>
          </div>
        </div>
    </section>
    <section class="table-wrapper" >
      <!-- <div class="detailTitle"  v-if="isShowDetail">{{enterpriseName_Selected}}报警详情</div> -->
      <panelTitle :title=enterpriseName_Selected v-show="isShowDetail" :displaySwitch="false" />
      <div class="item" v-if="isShowDetail">
        <!-- <analysisDetail></analysisDetail> -->
        <section>
          <div class="item">
            <div class="echar-pie" style="height: 300px">
                <v-chart :options="option_Detail" />
              </div>
          </div>
        </section>
        <section>
          <el-table
                  style="width: 100%;overflow-y: auto;"
                  :data="tableData_AlarmDetail_"
                  stripe
                >
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column label="月份" prop="month"></el-table-column>
                  <el-table-column label="所属行业" prop="industry"></el-table-column>
                  <el-table-column label="所属企业" prop="enterpriseName"></el-table-column>
                  <el-table-column label="营运车辆数" prop="allNum"></el-table-column>
                  <el-table-column label="月报警次数统计" prop="alarmNum"></el-table-column>
                  <el-table-column label="环比" prop="ratio" width="100"></el-table-column>
                </el-table>
        </section>
      </div>
    </section>
    </panel>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import analysisDetail from "./components/EnterpriseVehicleAlarmAnalysisDetail.vue";
import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";
//import { option3 } from "./options";
import dayjs from 'dayjs';
export default {
  name: "",
  mixins: [tableMixins],
  mounted() {
    //this.setCurrentYear();
    this.vehiclesQuery();
    let winHeight = window.innerHeight;
    console.log(winHeight);
  },
  components:{
    analysisDetail
  },
  methods: {
    setCurrentYear(){//进入页面后，默认当前年
      let year=new Date(new Date().toLocaleDateString());  //此种写法具体到了某一天的某个时辰
     // let year=new Date(new Date().getFullYear());//返回展示1970年
      this.value_StatisticsYear = year;
    },
    handleAlarmTypeChange(val){
      var obj = {};
      obj = this.options_AlarmType.find(function(item) {
        return item.value === val;
      });
      this.alarmTypeOrderTemp = obj;
    },
    handleIndustryChange(val){
      var obj = {};
      obj = this.options.find(function(item) {
        return item.value === val;
      });
      this.industryTemp = obj;
    },
    handleStatisticsChange(val){
      var obj = {};
      obj = this.options_Statistics.find(function(item) {
        return item.value === val;
      });
      this.statisticsTemp = obj;
    },
    vehiclesQuery(){
      debugger;
      let industryTemp = this.industryTemp;
      let vehicleCharater = industryTemp.value;  

      let enterprise = this.input_enterprise;

      let statisticsTemp = this.statisticsTemp;
      let statistics = statisticsTemp.value;  
      let dateTemp='';
      let cycleType = 'year';
      if(statistics == 1){
        dateTemp = this.value_StatisticsMonth;
        cycleType = 'month';
      }else{
        dateTemp = this.value_StatisticsYear;
      }

      let alarmTypeTemp = this.value_AlarmType;
      let alarmType ='alarmNum';
      let sortOrder_='asc';
      if(alarmTypeTemp == '1'){//
        alarmType ='alarmRate';
        sortOrder_='desc';
      }

      this.$http.$post("zdjc_IllegalWarningHandler/getAlarmAnalysis",{"vehicleType":vehicleCharater,"enterprise":enterprise,
      "cycleType":cycleType,"date":dateTemp,"sortField":alarmType,"sortOrder":sortOrder_}).then((param) => {
        //this.dealWithData(param);
        this.tableData_AlarmInfo = param.results;
        this.total_AlarmInfo = param.totalRecordNum;
        this.getChars();
        let tableDataTemp = param.results;
        if(tableDataTemp.length>0){
          this.handleDetail(0,tableDataTemp[0]);
        }else{
          this.isShowDetail = true;
        }
      });
    },
    exportInfo(){

    },
    enterpriseJump(index, row){
      let enterprise = row.enterprise;

      //此处需要路由跳转  经营业户查询
      //this.$router.push({
        //name: "enterpriseSearch",
        //params: { search: "123" }
     // });
    },GPSLocation(index, row){
      //跳转到 车辆高级查询，平带着车牌号
      let cph = row.cph;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});

    },
    handleDetail(index, row) {
      debugger;
      this.isShowDetail = true;
      if(row.enterprise!=null && row.enterprise!=undefined){
        this.enterpriseName_Selected = row.enterprise +"报警详情";
      }else{
        this.enterpriseName_Selected =  "报警详情";
      }
      let enterpriseId = row.enterpriseId;

      let cycleType = 'year';
      let dateTemp = '';
      if(this.value_Statistics == 1){
        cycleType = 'month';
        dateTemp = this.value_StatisticsMonth;
      }else{
        dateTemp = this.value_StatisticsYear;
      }

      this.$http.$post("zdjc_IllegalWarningHandler/getEnterpriseAlarmDetail",{"enterpriseId":enterpriseId,"cycleType":cycleType,"date":dateTemp}).then((param) => {
        //this.dealWithData(param);
        debugger;
        this.tableData_AlarmDetail_ = param;
        this.setAlarmDetailOption();

      });
      

    },
    workCountFormat(row) {
      return row.workNum == null ? 0 : row.workNum;
    },
    restCountFormat(row) {
      return row.restNum == null ? 0 : row.restNum;
    },
    getChars() {
      var time=[],ky=[],qn=[];
      let alarmInfoTable = this.tableData_AlarmInfo;

      if(alarmInfoTable && alarmInfoTable.length>0){
        alarmInfoTable.forEach(e=>{
          time.push(e.enterprise!=null?e.enterprise:'');
          ky.push(e.alarmRate!=null?e.alarmRate:0);
         // ky.push(((e.alarmRate!=null?e.alarmRate:0)/10000).toFixed(2));
        })
      }
      var testData2={
        //title:data.chartTitle,
        unitName:'报警率',
        legendData:[''],
      //  axisLabelFormatter:'{value} %',
        xAxisData: time,
        seriesData:[ky]
      }
      this.monthOption=this.$utils.echart.creatEchartOption_5_3(testData2);
      /**this.$http
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
        });*/
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
          this.total_AlarmInfo = data.totalRecordNum;
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
    },setAlarmDetailOption(){
      var time=[],ky=[],qn=[];
      let data_AlarmDetail = this.tableData_AlarmDetail_;
      if(data_AlarmDetail != null && data_AlarmDetail != undefined && data_AlarmDetail.length>0){
        data_AlarmDetail.forEach(e=>{
          time.push(e.month);
          ky.push(e.alarmNum!=null?e.alarmNum:0);
         // ky.push(((e.alarmNum!=null?e.alarmNum:0)/10000).toFixed(2));
        });
      }
      /**if(data.lineChartYoyData&&data.lineChartYoyData.length>0){
        data.lineChartYoyData.forEach(e=>{
          qn.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
        })
      }*/
      var testData2={
       // title:data.chartTitle,
        unitName:'',
        legendData:['月报警次数'],
        xAxisData: time,
        seriesData:[ky]
      }
      this.option_Detail=this.$utils.echart.creatEchartOption_4_3(testData2);
      /**let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['月报警次数'],
                    textStyle:{
                      color: '#fff',
                    }

                },
                xAxis: {
                    axisLabel: {
                      textStyle: {
                        color: '#fff',
                        fontSize: 14,
                      }
                    },axisLine: {
                        lineStyle: {
                            color:'#FFF'
                        }
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color:'#FFF'
                        }
                    },
                    axisLabel: {
                      color:'#FFF',
                        //formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name: '月报警次数',
                        type: 'line',
                        data: [11, 11, 15, 13, 12, 13, 10],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },itemStyle: {
                          normal: {
                            color: "#FFFF00",//折线点的颜色
                            lineStyle: {
                              color: "#FFFF00"//折线的颜色
                            }
                          }
                        }
                    }
                ]
            };
          this.option_Detail =option;*/
    }
  },
  data() {
    return {
      url: "/gxdc_bikeServiceAnalysisHandler/getCycleTimesInTime",
      input_enterprise:'',
      value_StatisticsYear:'',
      value_StatisticsMonth:'',
      pickerOptions: dateRang,
      total_AlarmInfo:0,
      total_AlarmDetail:0,
      datevalue: '',
      industryTemp:{},
      statisticsTemp:{},
      alarmTypeOrderTemp:{},
      // value_vehicleType:'',
      value_AdministrativeDivision:'',
      options_AdministrativeDivision: [{
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
                    }],
      value_AdministrativeDivision:'',
      options_AlarmType: [{
                        value: '0',
                        label: '报警次数降序'
                    },{
                        value: '1',
                        label: '报名率降序'
                    }],
      value_AlarmType:'0',
      options_Statistics: [{
                        value: '0',
                        label: '年'
                    },{
                        value: '1',
                        label: '月'
                    }],
      value_Statistics:'0',
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
                    }],
                value_vehicleType: '0',//此处默认 下拉列 什么都不选中
      option: {},
      monthOption:{},
      dayOption:{},
      option_Detail:{},
      tableData_AlarmInfo:[],
      tableData_AlarmDetail_:[],
      isShowDetail:false,
      enterpriseName_Selected:''
      
      
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
    .firstLineCondition{
      height:45px;
      .searchCondition{
        float:left;
        margin-left:10px;
      }

    }
    .secondLineCondition{
      margin:10px 0px 10px 0px;
      .searchCondition{
        float:left;
        margin-left:10px;
      }

    }
  }
}
.echar-wrapper {
  display: flex;
  background-image: linear-gradient(to right, rgba(32, 86, 221, 0.4), #0a1e53);
  .item {
    &:first-child {
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
    }
  }
}
.table-wrapper {
  height:640px;
  /**display: flex;
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
  }*/
}

</style>
<style lang="css" scoped>
  .echar-wrapper>>>.SearchPanel{
    flex-basis:0rem;
  }
</style>
<!-- <style lang="css">
  .el-picker-panel__icon-btn{
    color:red; 
  }
</style> -->