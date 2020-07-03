<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <div class="left">
              <div class="vehicles-time-area">
                    <div class="area-left">
                        <label>时间区间</label>
                    </div>
                    <div class="area-right">
                      <el-date-picker
                v-model="value_Month"
                type="monthrange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                :picker-options="pickerOptions">
            </el-date-picker>
                      <!--  <el-date-picker
                          v-model="value_StartMonth"
                          type="month"
                          placeholder="" style="width: 47%;">
                        </el-date-picker>
                        <span>~</span>                  
                        <el-date-picker
                          v-model="value_EndMonth"
                          type="month"
                          placeholder="" style="width: 47%;">
                        </el-date-picker>-->
                    </div>
                </div>
              <el-divider ></el-divider>
              
              <div class="vehicles-distribution-area">
                    <div class="area-left">
                        <label>行业</label>
                    </div>
                    <div class="area-right">
                        <el-checkbox-group v-model="checkList_industry" @change="groupchange_industry">
                            <el-checkbox label="111">班线客运</el-checkbox>
                            <el-checkbox label="114">包车客运</el-checkbox>
                            <el-checkbox label="141">危货运输</el-checkbox>        
                        <!--<el-checkbox label="112">公交运输</el-checkbox>-->
                            <el-checkbox label="113">巡游出租</el-checkbox>
                            <el-checkbox label="115">网约出租</el-checkbox>                 
                        </el-checkbox-group>
                    </div>
                </div>
              <el-divider></el-divider>

              <div class="vehicles-distribution-area">
                    <div class="area-left">
                        <label>业户名称</label>
                    </div>
                    <div class="area-right">
                        <el-autocomplete
                                    class="inline-input"
                                    value-key="enterpriseName"
                                    v-model="input_enterprise"
                                    :fetch-suggestions="querySearch"
                                    placeholder="请输入内容"
                                    :trigger-on-focus="false"
                                    @select="handleSelect"
                                ></el-autocomplete>
                    </div>
                </div>
              <el-divider></el-divider>
              <div class="vehicles-roadType">
                    <div class="area-left">
                        <label>道路类型</label>
                    </div>
                    <!--<div class="area-right" :style=roadType>-->
                    <div class="area-right">
                        <el-checkbox-group v-model="checkList_RoadType" @change="groupchange_RoadType">
                            <el-checkbox label="2">国省干线</el-checkbox>
                            <el-checkbox label="3">城市道路</el-checkbox> 
                            <el-checkbox label="1">高速</el-checkbox>              
                        </el-checkbox-group>
                    </div>
                </div>
              <div class="vehicles-area-button">
                    <div class="area-left">
                        <el-button type="primary" class="searchButton" @click="vehiclesQuery()">查询</el-button>   
                    </div>
                    <div class="area-right">
                        <el-button type="primary" class="searchButton" @click="vehiclesCancel()">取消</el-button> 
                    </div>
                </div>
              <div class="vehicles-location-area">
                <span>为您找到出现次数排名前{{rank}}道路</span>
              </div>
              <el-divider></el-divider>
              <div class="result">
                <el-table
                    style="width: 100%;height:95%;overflow-y: auto;"
                    :height="tableHeight"
                    :data="tableData"
                    stripe
                    ref="table"
                    @row-click="handleInfo"
                  >
                  <!--  <el-table-column type="index" width="50"></el-table-column>>-->
                    <el-table-column label="排名" prop="rankNum" width="50"></el-table-column>
                    <el-table-column label="道路名称" prop="name" width="" show-overflow-tooltip></el-table-column>
                    <el-table-column label="出现车次" prop="count"></el-table-column>
                    <el-table-column label="环比" prop="rate" width="70"></el-table-column>
                    <!-- <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          class="table-detail-btn"
                          @click="handleInfo(scope.$index, scope.row)"
                        >定位</el-button>
                      </template> 
                    </el-table-column>-->
                  </el-table>
                  <!--<el-pagination small  :pager-count="5" 
                                    background layout="prev, pager, next" 
                                    :total="queryResult_Area" 
                                    @current-change="handleCurrentChange"
                                ></el-pagination>-->
                  <div><span class="el-icon-arrow-down" @click="more()" v-if="isShowMore">更多</span></div>
                  <div><span class="arrow-down-finished" v-if="isShowFinished">没有更多了</span></div>
                </div>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
        <div class="tag-wrap">
        <!-- <ChangeTag :itemList="itemList" @getStatues="getStatues" /> -->
        </div>
      </template>
      <template #rightPanel></template>
    </BaseLayoutContent>
    <keyAreaDetail v-show="isShow" ref="keyAreaDetail" @transferName="getData"></keyAreaDetail>
  </div>
</template>

<script>
import Basemap from "../../../../components/common/map/baseMap";
import keyAreaDetail from "./components/keyAreaDetail.vue";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { monthrange } from "@/components/common/searchPanel/SearchPanelConfig";
import {_formatDate} from "../../../../components/common/common.js";
import dayjs from "dayjs";
export default {
  mixins: [tableMixins],
  components: { Basemap, keyAreaDetail },
  mounted(){
    
    this.loadEnterprise();
    //this.testCompany();
    this.vehiclesQuery();
  },filters: {
    formatDate(time) {
      if (time<0) return '0000-00';
            let date = new Date(time/1);
            return _formatDate(date, 'yyyy-MM') //年-月-日 时分
    }
  },
  methods: {
    tampall(){
      console.log(111);
    },
    testCompany(){
      this.$http.$post("lkfx_keyVehiclePathHandler/companyNamefuzzySearch",{"companyName":"灰狗"}).then((param) => {
        //this.dealWithData(param);
        // debugger;
        this.tableDataTotal = param;
        if(param.length>10){
          this.tableData = param.slice(0,10);
          this.rank = 10;
          this.isShowMore = true;
          this.isShowFinished = false;
        }else{
          this.tableData = param;
          this.rank = param.length;
          this.isShowMore = false;
          this.isShowFinished = true;
        }
      });
    },
    groupchange_industry(val){
      console.log("变化：",this.checkList_industry);
      if(this.checkList_industry.length>1){
        this.checkList_industry.shift();
      }        
    },
    groupchange_RoadType(val){
      console.log("变化：",this.checkList_RoadType);
      if(this.checkList_RoadType.length>1){
        this.checkList_RoadType.shift();
      }   
    },
    groupchange_time(val){
      if(this.checkList_time.length>1){
          this.checkList_time.shift();
          //let checkbox_value = this.checkList_time[0];
            //         this.getVehiclesStatus(checkbox_value);
            //         this.$refs.range.getVehicleRange(); 
            //         this.getVehiclesStatus(checkbox_value);
     }
    },
    getSearchValue(val) {
      this.getSearchTableValue(val);
    },
    vehiclesCancel(){

    },
     // 【定位】查看
    handleInfo(row) {
      // console.log();
      debugger;
      tmap.removeLayer('TR_VEHICLES_KEY_ROAD');
      tmap.addLayer('TR_VEHICLES_KEY_ROAD')
      let temp = row.roads;
      for(let i in temp){
        // temp[i].id = parseInt(i)+1;
        let geomstr = temp[i].geometry;
        let isinfos = {...temp[i],geomstr};
        // isinfos = {...geomstr};
        delete isinfos.geometry;
        // console.log(isinfos);
        // debugger;
        tmap.addFeatureOnLayer("TR_VEHICLES_KEY_ROAD",
                                isinfos,
                                "TR_VEHICLES_KEY_ROAD",
                                false,
                                false
                            );
      }
    },
    // // 【定位】查看
    // handleInfo(index, row) {
    //   // debugger;
    //   let temp = row.roads;
    //   let isinfos = {};
    //   for(let i in temp){
    //     temp[i].id = parseInt(i)+1;
    //     let geomstr = temp[i].geom;
    //     isinfos = {...temp[i],geomstr};
    //     //isinfos = {...geomstr};
    //     tmap.addFeatureOnLayer("TR_VEHICLES_KEY_ROAD",
    //                             isinfos,
    //                             "TR_VEHICLES_KEY_ROAD",
    //                             false,
    //                             false
    //                         );
    //   }
    // },
    // 修改  重绘
    handleEdit(index, row) {
      // 消除上一个图层
      try {
        tmap.removePolygonOnLayer("VEHICLES_KEY_FOCUS_AREA", row.id);
      } catch {}
      this.updateId = row.id;
      this.updateAreaName = row.areaName;
      this.$alert(
        '<p style="font-size: 14px;text-align: center">请在右侧地图上圈出您想要的地图，单击开始画图，双击结束！</p>',
        "提示",
        {
          confirmButtonText: "确定",
          dangerouslyUseHTMLString: true
        }
      );
      tmap.setActiveTool("polygon", this.update);
    },
    // 重绘数据并提交
    update(data) {
      if (data) {
        // debugger;
        // 保存图层
        let params = {
          id: this.updateId,
          areaName: this.updateAreaName,
          geom: data
        };
        this.$http
          .$post("/zdjc_vehicleAreaHandler/updateAreaInfo", {
            data: JSON.stringify(params)
          })
          .then(data => {
            // debugger;
            // if (data === 1) {
            if (data) {
              this.$message.success("修改成功");
              this.getSearchValue();
              // debugger;
              tmap.drawTool.features.clear();
            } else {
              this.$message.error("修改失败");
              this.getSearchValue();
            }
          });
      }
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // debugger;
        this.$http
          .$get("/zdjc_vehicleAreaHandler/deleteAreaInfoById", { id: row.id })
          .then(data => {
            // debugger;
            if (data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getSearchValue();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
      });
    },
    add() {
      // 添加图层
      this.$alert(
        '<p style="font-size: 14px;text-align: center">请在右侧地图上圈出您想要的地图，单击开始画图，双击结束！</p>',
        "提示",
        {
          confirmButtonText: "确定",
          dangerouslyUseHTMLString: true
        }
      );
      tmap.setActiveTool("polygon", this.res);
    },
    querySearch(queryString, cb) {
                // debugger;
                let enterpriseSearchData = this.enterpriseSearchData;
                let results = queryString ? enterpriseSearchData.filter(this.createFilter(queryString)) : enterpriseSearchData;
                // 调用 callback 返回建议列表的数据
                cb(results);
    },createFilter(queryString) {
                // debugger;
                return (enterpriseSearchData) => {
                    let temp = enterpriseSearchData.enterpriseName;
                    if(temp!=null &&temp!=""){
                        return (enterpriseSearchData.enterpriseName.indexOf(queryString) !== -1);
                    }
                    
                    //return (enterpriseSearchData.enterpriseName.toLowerCase().indexOf(queryString.toLowerCase()) === 0));
                };
            },
    handleSelect(item) {
               // console.log(item);
      this.enterpriseIdSelected = item.enterpriseId;
    },
    loadEnterprise(){
                this.$http.$get("zdjc_vehiclegpsstatistic/getEnterpriseList").then(data => {
                    // debugger;
                     //for(var i=0;i<data.length;i++){
                      //  data[i].value = data[i].enterpriseName;   
                     //}
                    this.enterpriseSearchData = data;
                });
                
            },
    res(data) {
      // debugger;
      this.areaData = data;
      let keyAreaDetail = this.$refs.keyAreaDetail.$el;

      var temp = data.split(";");
      var temp2 = temp[0].split(",");
      var temp3 = [];
      temp3.push(Number(temp2[0]));
      temp3.push(Number(temp2[1]));
      tmap.popupHtml(temp3, keyAreaDetail, "设置区域名称", "", "", false);
      keyAreaDetail.style.display = "block";
      // tmap.drawTool.features.clear();
      return;
    },
    handleCurrentChange(curPage){

      this.vehiclesQuery(curPage);

    },vehiclesQuery(curPage){
       if(tmap.getLayer("TR_VEHICLES_KEY_ROAD")){
       tmap.removeLayer('TR_VEHICLES_KEY_ROAD')
      }else{
        tmap.addLayer("TR_VEHICLES_KEY_ROAD")
      }
      let companyName = this.enterpriseIdSelected;
      let industry = parseInt(this.checkList_industry[0]);
      let timeMonth = this.value_Month;
      let timeStartMonth="";
      let timeEndMonth="";
      if(timeMonth!=""){
        timeStartMonth = dayjs(timeMonth[0]).format("YYYY-MM");
        timeEndMonth = dayjs(timeMonth[1]).format("YYYY-MM");
      }
      let type = parseInt(this.checkList_RoadType[0]);
      //1、高速；2、国省干线；3、城市道路；4、街道片区
      this.$http.$post("lkfx_keyVehiclePathHandler/companyVehiclePathStat",{"companyId":companyName,"industry":industry,"type":type,"startMonth":timeStartMonth,"endMonth":timeEndMonth}).then((param) => {
        //this.dealWithData(param);
        this.tableDataTotal = param;
        debugger;
        this.tabless =[];
        
        if(param!=null && param!=undefined){
          // let temp;
          param.forEach(element => {
            
            let temp = element.roads;
          for(let i in temp){
            // temp[i].id = parseInt(i)+1;
            let geomstr = temp[i].geometry;
            let isinfos = {...temp[i],geomstr};
            delete isinfos.geometry
            //isinfos = {...geomstr};
            // this.tabless.push(isinfos);
            console.log(isinfos);
            debugger;
            tmap.addFeatureOnLayer("TR_VEHICLES_KEY_ROAD",
                                    isinfos,
                                    "TR_VEHICLES_KEY_ROAD",
                                    false,
                                    false
                                );
          }
          });

          
          if(param.length>10){
            this.tableData = param.slice(0,10);
            this.rank = 10;
            this.isShowMore = true;
            this.isShowFinished = false;
          }else{
            this.tableData = param;
            this.rank = param.length;
            this.isShowMore = false;
            this.isShowFinished = true;
          }
        }
      });
    },
    getData(data) {
      // debugger;
      if (data) {
        // 保存图层
        let params = {
          areaName: data,
          geom: this.areaData
        };
        this.$http
          .$post("zdjc_vehicleAreaHandler/AddAreaInfo", {
            data: JSON.stringify(params)
          })
          .then(data => {
            if (data) {
              this.$message.success("添加成功");
              this.getSearchValue();
            } else {
              this.$message.error("添加失败");
              this.getSearchValue();
            }
          });
      }
    },more(){
      //计算接下来的10条数据
      let clickMoreButtonNum = this.clickMoreButtonNum;
      let tableTemp = this.tableDataTotal;
      let currentDataItemCount = this.tableData.length;
      let tableData=[];
      if((tableTemp.length-currentDataItemCount)>10){
        tableData = tableTemp.slice(currentDataItemCount+1,currentDataItemCount+10);
        this.rank = currentDataItemCount+10;
        this.isShowMore = true;
        this.isShowFinished = false;
      }else{
        tableData = tableTemp.slice(currentDataItemCount+1,tableTemp.length);
        this.rank = tableTemp.length;
        this.isShowMore = false;
        this.isShowFinished = true;
      }
      this.clickMoreButtonNum = clickMoreButtonNum+1;
    }
  },
  data() {
    return {
      tabless:[],
      url: "lkfx_keyVehiclePathHandler/singleVehiclePathStat",  //url 已修改
      pickerOptions: monthrange,
      queryResult_Area:0,
      tableData_vehicleInfo:[],
      tableData:[],
      tableDataTotal:[],
      isShowFinished:true,isShowMore:false,
      clickMoreButtonNum:1,//点击更多按钮的次数
      rank:0,
      checkList_time:['0'],
      checkList_industry:['111'],
      enterpriseIdSelected:'',
      checkList_RoadType:['2'],
      value_Month:'', 
      input_enterprise:'',
      enterpriseSearchData:[],
      input_LonLat:'',
      areaName: "",
      areaData: "",
      updateId: "",
      updateAreaName: "",
      beginId: "",
      isShow: false,
      searchConfig: {
       
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin el-checkbox__label{
  color:#FFF;
 }
.keyarea-wrap {
  display: flex;
  height: 100%;
  width: 100%;
}

.left {
  width: 100%;
  height: 550px;
  .vehicles-time-area{
    float: left;
    width:100%;
    margin-bottom:10px;
    .area-left{
      float: left; 
        width:20%; 
        margin-top:10px;
      }
    .area-right{
      float: left;
      width:79%;
      /**.el-date-editor:nth-child(1){
        width: 99%;
        //float: left;
      }
      span{
        float: left;
        margin-top: 12px;
        width: 10px;
      }
      .el-date-editor:nth-child(2){
        width: 140px;
        float: left;
      }*/

    }
  }
  .vehicles-distribution-area{
    float: left;
    width:100%;
    margin:10px 0px 10px 0px;
    .area-left{
      float: left; 
        width:20%; 
        margin-top:10px;
      }
    .area-right{
      float: left;
      width:79%;
      .el-autocomplete{
        width:100%;
      }
      .el-checkbox:nth-child(1){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(2){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(3){
        width: 20%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(4){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(5){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(6){
        width: 20%;
        @include el-checkbox__label;
      }
    }
  }
  .vehicles-roadType{
    float: left;
    width:100%;
    
    margin-bottom:10px;
    .area-left{
      float: left; 
        width:21%; 
        margin-top:10px;
      }
    .area-right{
      float: left;
      margin-top:10px;
      width:69%;
      .el-checkbox:nth-child(1){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(2){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(3){
        width: 20%;
        @include el-checkbox__label;
      }
    }
  }
  .vehicles-time-area{
    float: left;
    width: 100%;
    .area-left{
      float: left; 
      width:20%; 
    }
    .area-right{
      float: left; 
      width:79%; 
      .el-checkbox:nth-child(1){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(2){
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(3){
        width: 20%;
        @include el-checkbox__label;
      }
    }
  }
  .vehicles-location-area{
    margin:10px 0px 10px 0px;
    float: left;
    width: 100%;
    .area-left{
      float: left; 
      width:68%; 
    }
    .area-right{
      float: left; 
      margin-left:10px;
      width:29%; 
    }
  }
  .el-divider{
    float: left;
    width:100%;
    margin:5px 0px 5px 0px;
    background-color:rgba(32, 86,221, 0.4);
  }
  .vehicles-area-button{
    float: left;
    width: 100%;
    margin-top: 10px;

    .area-left{
      float: left; 
      width:75%; 
      .el-button{
        float:right;
      }
    }
    .area-right{
      float: left; 
      margin-left:10px;
      width:22%; 
    }
  }
  .result{
    float: left; 
    width:100%;
    height: 95%;
    .el-icon-arrow-down{
      text-align: center;
      display: block;
    }
    .arrow-down-finished{
      text-align: center;
      display: block;
    }
  }
}
.table-detail-btn1 {
  background: rgba(32, 86, 221, 0.4) !important;
  border: 0 !important;
}
</style>
<style lang="css" scoped>
    
    .result >>> .el-table--scrollable-x .el-table__body-wrapper {
          overflow-x: hidden;
    }
</style>