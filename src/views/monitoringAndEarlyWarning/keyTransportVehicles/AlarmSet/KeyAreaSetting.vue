<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <div class="left">
              <div class="vehicles-distribution-area">
                    <div class="area-left">
                        <label>区域名称</label>
                    </div>
                    <div class="area-right">
                        <el-input v-model="input_AreaName" placeholder=""></el-input>
                    </div>
                </div>
              <el-divider ></el-divider>
              
              <div class="vehicles-distribution-area">
                    <div class="area-left">
                        <label>行业</label>
                    </div>
                    <div class="area-right">
                        <el-checkbox-group v-model="checkList" @change="groupchange">
                            <el-checkbox label="班线客运"></el-checkbox>
                            <el-checkbox label="包车客运"></el-checkbox>
                            <el-checkbox label="危货运输"></el-checkbox>        
                      <!--  <el-checkbox label="公交运输"></el-checkbox>-->
                            <el-checkbox label="巡游出租"></el-checkbox>
                            <el-checkbox label="网约出租"></el-checkbox>                 
                        </el-checkbox-group>
                    </div>
                </div>
              <el-divider></el-divider>
              <div class="vehicles-location-area">
                    <div class="area-left">
                        <el-input v-model="input_LonLat" placeholder="" :disabled="true"></el-input>    
                    </div>
                    <div class="area-right">
                        <el-button type="primary" class="searchButton" @click="plotting()">标绘</el-button> 
                    </div>
                </div>
              <el-divider></el-divider>
              <div class="vehicles-area-button">
                    <div class="area-left">
                        <el-button type="primary" class="searchButton" @click="saveButton()">保存</el-button>   
                    </div>
                    <div class="area-right">
                        <el-button type="primary" class="searchButton" @click="cancelButton()">取消</el-button> 
                    </div>
                </div>
              <div class="vehicles-location-area">
                <span>已经添加的重点区域</span>
              </div>
              <el-divider></el-divider>
              <div class="result">
                <el-table
                    style="width: 100%;height:95%;overflow-y: auto;"
                    :height="tableHeight"
                    @row-click="rowHanddle"
                    :data="tableData"
                    stripe
                    ref="table"
                  >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="区域名称" prop="areaName" width="" show-overflow-tooltip></el-table-column>
                    <el-table-column label="最后修改时间" prop="updateTime" width="" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row.updateTime|formatDate}}
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                      <!--  <el-button
                          size="mini"
                          class="table-detail-btn"
                          @click="handleInfo(scope.$index, scope.row)"
                        >定位</el-button>-->
                        <el-button
                          size="mini"
                          class="table-detail-btn1 table-detail-btn"
                          @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                          size="mini"
                          class="table-detail-btn1 table-detail-btn"
                          @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination small  :pager-count="5" 
                                    background layout="prev, pager, next" 
                                    :total="total"
                                    :current-page="currentPage"
                                    @current-change="handleCurrentChange"
                                ></el-pagination>
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
  <!--  <keyAreaDetail v-show="isShow" ref="keyAreaDetail" @transferName="getData"></keyAreaDetail>-->
  </div>
</template>

<script>
import Basemap from "../../../../components/common/map/baseMap";
import keyAreaDetail from "./keyAreaDetail.vue";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import {_formatDate} from "../../../../components/common/common.js";

export default {
  mixins: [tableMixins],
  components: { Basemap, keyAreaDetail },
  filters: {
    formatDate(time) {
      if (time<0) return '0000-00-00 00:00:00';
            let date = new Date(time/1);
            return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分
    }
  },
  mounted(){
    this.vehiclesQuery();
  },
  methods: {
    getSearchValue(val) {
      this.getSearchTableValue(val);
    },
    groupchange(val){
      if(this.checkList.length>1){
        this.checkList.shift();
      }
    },
    // 查看
    //handleInfo(index, row) {
    rowHanddle(row, column, event){
      this.$http.$get("zdjc_vehicleAreaHandler/getAreaInfoById",{ id: row.id }).then(data => {
          tmap.addLayer("VEHICLES_KEY_FOCUS_AREA");
          tmap.addPolygonOnLayer(
            "VEHICLES_KEY_FOCUS_AREA",
            row.id,
            row.geom,
            "rgba(0, 255, 255,.2)",
            { color: "rgba(0, 255, 255,1)", width: 2 },
            null,
            null,
            null,
            { text: row.areaName }
          );
          // 保存上一次请求的id
          this.beginId = row.id;
        });
      // 消除上一个图层
      tmap.removePolygonOnLayer("VEHICLES_KEY_FOCUS_AREA", this.beginId);
    },
    // 修改  重绘
    handleEdit(index, row) {
      // 消除上一个图层
      try {
        tmap.removePolygonOnLayer("VEHICLES_KEY_FOCUS_AREA", row.id);
      } catch {}
      this.updateId = row.id;
      this.input_AreaName = row.areaName;
      //this.updateAreaName = row.areaName;
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
        this.input_LonLat = data;   
      }
    },
    //编辑后提交
    edit(){
      let data = this.input_LonLat;
      let areaNameTemp = this.input_AreaName;
      // 保存图层
        let params = {
          id: this.updateId,
         // areaName: this.updateAreaName,
         areaType:1,
         areaName:areaNameTemp,
          geom: data
        };
        this.$http
          .$post("/zdjc_AlertSettingHandler/updateAreaInfo", {
            data: JSON.stringify(params)
          })
          .then(data => {
            // if (data === 1) {
            if (data) {
              this.$message.success("修改成功");
              //this.getSearchValue();
              this.vehiclesQuery();
              tmap.drawTool.features.clear();
            } else {
              this.$message.error("修改失败");
              //this.getSearchValue();
              this.vehiclesQuery();
            }
          });
    },

    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .$get("/zdjc_AlertSettingHandler/deleteAreaInfoById", { id: row.id })
          .then(data => {
            if (data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //this.getSearchValue();
              this.vehiclesQuery();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
      });
    },
    plotting() {
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
    res(data) {
      this.areaData = data;
      this.input_LonLat = data;
      /**let keyAreaDetail = this.$refs.keyAreaDetail.$el;

      var temp = data.split(";");
      var temp2 = temp[0].split(",");
      var temp3 = [];
      temp3.push(Number(temp2[0]));
      temp3.push(Number(temp2[1]));
      tmap.popupHtml(temp3, keyAreaDetail, "设置区域名称", "", "", false);
      keyAreaDetail.style.display = "block";*/
      // tmap.drawTool.features.clear();
      return;
    },
    handleCurrentChange(curPage){
      this.vehiclesQuery(curPage);
    },vehiclesQuery(curPage){
      let queryFields_temp = [];
     
      let queryField_AreaType = {};
      queryField_AreaType.columnName = "areaType";
      queryField_AreaType.dataType = "String";
      queryField_AreaType.operator = "=";
      queryField_AreaType.queryValue = "1";
      queryFields_temp.push(queryField_AreaType);
      
      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      search.queryFields = JSON.stringify(queryFields_temp);
      console.log(search);

      //let page = 1;
      //let pageSize = 10;
      this.$http.$post("zdjc_AlertSettingHandler/getAreaInfoByPage",search).then((param) => {
        //this.dealWithData(param);
        this.tableData = param.results;
        this.total = param.totalRecordNum;
      });

    },
    cancelButton(){
      this.input_LonLat = '';
      this.input_AreaName = '';
      this.updateId='';
      //this.getSearchValue();
      this.vehiclesQuery();
    },
    saveButton(){
      if(this.updateId!=null && this.updateId!=undefined && this.updateId!=""){
        this.edit();
      }else{
        let data = this.input_AreaName;
        let industry = this.checkList[0];
        if(data=="" && this.areaData==""){
          this.$message.warning("区域名称和标绘内容不能同时为空");
        }else{
          let params = {
            areaName: data,
            industry:industry,
            areaType:1,
            geom: this.areaData
          };
          this.$http
            .$post("zdjc_AlertSettingHandler/AddAreaInfo", {
              data: JSON.stringify(params)
            })
            .then(data => {
              if (data) {
                this.$message.success("添加成功");
                //this.getSearchValue();
                this.vehiclesQuery();
                tmap.drawTool.features.clear();
              } else {
                this.$message.error("添加失败");
                this.vehiclesQuery();
                //this.getSearchValue();
              }
            });
        }
        
      }
    },
    getData(data) {
      if (data) {
        this.input_AreaName =data;
        // 保存图层
      }
    }
  },
  data() {
    return {
      //url: "zdjc_vehicleAreaHandler/getAreaInfoByPage?areaType=1",  //url 已修改
      total:0,
      currentPage:1,
      checkList:['班线客运'],
      input_LonLat:'',
      input_AreaName:'',
      value_TemplateTime:'',//临时时间
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
.keyarea-wrap {
  display: flex;
  height: 100%;
  width: 100%;
}

.left {
  width: 100%;
  height: 550px;
  .vehicles-distribution-area{
    float: left;
    width:100%;
    margin-top: 10px;
    margin-bottom:10px;
    .area-left{
      float: left; 
        width:20%; 
        margin-top:10px;
      }
    .area-right{
      float: left;
      width:79%;
      .el-checkbox:nth-child(1){
        width: 23%;
        color: #FFF;
      }
      .el-checkbox:nth-child(2){
        width: 23%;
        color: #FFF;
      }
      .el-checkbox:nth-child(3){
        width: 23%;
        color: #FFF;
      }
      .el-checkbox:nth-child(4){
        width: 23%;
        color: #FFF;
      }
      .el-checkbox:nth-child(5){
        width: 23%;
        color: #FFF;
      }
      .el-checkbox:nth-child(6){
        width: 23%;
        color: #FFF;
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
      }
      .el-checkbox:nth-child(2){
        width: 23%;
      }
      .el-checkbox:nth-child(3){
        width: 20%;
      }
    }
  }
  .vehicles-location-area{
    margin:10px 0px 10px 0px;
    float: left;
    width: 100%;
    .area-left{
      float: left; 
      width:72%; 
    }
    .area-right{
      float: left; 
      margin-left:10px;
      width:24%; 
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
      width:72%; 
      .el-button{
        float:right;
      }
    }
    .area-right{
      float: left; 
      margin-left:10px;
      width:24%; 
    }
  }
  .result{
    float: left; 
    width:100%;
    height: 90%;
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