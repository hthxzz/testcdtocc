<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <div class="left">
              <div class="vehicles-distribution-area">
                <div class="area-left">
                  <label>车牌号</label>
                </div>
                <div class="area-right">
                  <el-input v-model="input_cph" placeholder style="width: 100%;"></el-input>
                </div>
              </div>
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
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="vehicles-roadType">
                <div class="area-left">
                  <label>道路类型</label>
                </div>
                <div class="area-right">
                  <el-checkbox-group v-model="checkList_RoadType" @change="groupchange_RoadType">
                    <el-checkbox label="2">国省干线</el-checkbox>
                    <el-checkbox label="3">城市道路</el-checkbox>
                    <el-checkbox label="1">高速</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="vehicles-area-button">
                <div class="area-left">
                  <el-button type="primary" class="searchButton" @click="vehiclesQuery()">查询</el-button>
                </div>
                <div class="area-right">
                  <el-button type="primary" class="searchButton" @click="vehiclesQueryCanel()">取消</el-button>
                </div>
              </div>
              <div class="vehicles-Info" v-show="isShowVehicleInfo">
                <span>为您查询到1条车辆信息</span>
                <div class="vehicles-line-two">
                  <div class="vehicles-left">
                    <label>车牌号码:</label>
                    <span>{{ vehicleInfoItem.vehicleNum }}</span>
                  </div>
                  <div class="vehicles-right">
                    <label>营运证：</label>
                    <span>{{ vehicleInfoItem.licenseNum }}</span>
                  </div>
                </div>
                <div class="vehicles-line-one">
                  <div class="vehicles-left">
                    <label>车辆类型：</label>
                    <span>{{ vehicleInfoItem.vehicleTypeName }}</span>
                  </div>
                </div>
                <div class="vehicles-line-one">
                  <label>业户名称：</label>
                  <span>{{ vehicleInfoItem.enterpriseName }}</span>
                </div>
              </div>
              <div class="vehicles-location-area">
                <span>为您找到出现次数排名前10道路</span>
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
                  <!--  <el-table-column type="index" width="50"></el-table-column>-->
                  <el-table-column label="排名" prop="rankNum" width="50"></el-table-column>
                  <el-table-column label="区域名称" prop="name" width show-overflow-tooltip></el-table-column>
                  <el-table-column label="出现车次" prop="count"></el-table-column>
                  <el-table-column label="环比" prop="rate" width="70"></el-table-column>
                  <!--  <el-table-column label="操作">
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
                <div>
                  <span class="el-icon-arrow-down" @click="more()" v-if="isShowMore">更多</span>
                </div>-
                <div>
                  <span class="arrow-down-finished" v-if="isShowFinished">没有更多了</span>
                </div>
              </div>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
        <!--<div class="line-detail-container">
          <lineDetail :item='lineDetailData' ref="lineDetail"/>
        </div>-->
        <div class="tag-wrap">
          <!-- <ChangeTag :itemList="itemList" @getStatues="getStatues" /> -->
        </div>
      </template>
      <template #rightPanel></template>
    </BaseLayoutContent>

    <!--<keyAreaDetail v-show="isShow" ref="keyAreaDetail" @transferName="getData"></keyAreaDetail>-->
  </div>
</template>

<script>
import Basemap from "../../../../components/common/map/baseMap";
import keyAreaDetail from "./components/keyAreaDetail.vue";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { monthrange } from "@/components/common/searchPanel/SearchPanelConfig";
import { _formatDate } from "../../../../components/common/common.js";
//import lineDetail from "./components/lineDetail.vue";
import dayjs from "dayjs";

export default {
  mixins: [tableMixins],
  components: {
    Basemap,
    keyAreaDetail
    //,lineDetail
  },
  mounted() {
    //this.loadEnterprise();
    //window.showFeatureInfo = this.showFeatureInfo;
  },
  filters: {
    formatDate(time) {
      if (time < 0) return "0000-00";
      let date = new Date(time / 1);
      return _formatDate(date, "yyyy-MM"); //年-月-日 时分
    }
  },
  methods: {
    /**getBaseInfoHtml(type, data, feaCoordinate, titleText, width, height) {
      this.lineDetailData = data;
    },*/
    groupchange_industry(val) {
      if (this.checkList_industry.length > 1) {
        this.checkList_industry.shift();
      }
    },
    groupchange_RoadType(val) {
      if (this.checkList_RoadType.length > 1) {
        this.checkList_RoadType.shift();
      }
    },
    groupchange_time(val) {
      if (this.checkList_time.length > 1) {
        this.checkList_time.shift();
      }
    },
    test(row) {
      console.log(row);
      tmap.removeLayer();
      var index = 0;
      var roads = row.roads;
      var center = row.roads[0]["geometry"].split(";")[0];
      tmap.centerAt(center.split(",")[0], center.split(",")[1]);
      for (const item of roads) {
        index++;
        tmap.addFeatureOnLayer(
          "testaa" + index,
          {
            geomstr: item["geometry"]
            // value: item["value"],
            // shifts: item["shifts"],
            // toName: item["toName"]
          },
          "testaa",
          false,
          false
        );
      }
    },
    getSearchValue(val) {
      this.getSearchTableValue(val);
    },
    // 【定位】查看
    handleInfo(index, row) {
      tmap.removeLayer("TR_VEHICLES_KEY_ROAD");
      tmap.addLayer("TR_VEHICLES_KEY_ROAD");
      let temp = row.roads;
      let isinfos = {};
      for (let i in temp) {
        temp[i].id = parseInt(i) + 1;
        let geomstr = temp[i].geometry;
        isinfos = { ...temp[i], geomstr };
        delete isinfos.geometry;
        //isinfos = {...geomstr};

        //tmap.addLineFeatureOnLayer();(layerId, fea, width, color, extentTo, onclick
        //addFeatureOnLayer(layerId, attr, layerConfigId, showHightAnimation, removeOldFeature)
        tmap.addFeatureOnLayer(
          "TR_VEHICLES_KEY_ROAD",
          isinfos,
          "TR_VEHICLES_KEY_ROAD",
          false,
          false
        );
      }
    },
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
        debugger;
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
            debugger;
            // if (data === 1) {
            if (data) {
              this.$message.success("修改成功");
              this.getSearchValue();
              debugger;
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
        debugger;
        this.$http
          .$get("/zdjc_vehicleAreaHandler/deleteAreaInfoById", { id: row.id })
          .then(data => {
            debugger;
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
      let enterpriseSearchData = this.enterpriseSearchData;
      let results = queryString
        ? enterpriseSearchData.filter(this.createFilter(queryString))
        : enterpriseSearchData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return enterpriseSearchData => {
        let temp = enterpriseSearchData.enterpriseName;
        if (temp != null && temp != "") {
          return (
            enterpriseSearchData.enterpriseName.indexOf(queryString) !== -1
          );
        }

        //return (enterpriseSearchData.enterpriseName.toLowerCase().indexOf(queryString.toLowerCase()) === 0));
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    loadEnterprise() {
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getEnterpriseList")
        .then(data => {
          //for(var i=0;i<data.length;i++){
          //  data[i].value = data[i].enterpriseName;
          //}
          this.enterpriseSearchData = data;
        });
    },
    res(data) {
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
    handleCurrentChange(curPage) {
      this.vehiclesQuery(curPage);
    },
    vehiclesQuery(curPage) {
      this.isShowVehicleInfo = true;
      let vehicleNum = this.input_cph;
      let timeMonth = this.value_Month;
      let timeStartMonth="";
      let timeEndMonth="";
      if(timeMonth!=""){
        timeStartMonth = dayjs(timeMonth[0]).format("YYYY-MM");
        timeEndMonth = dayjs(timeMonth[1]).format("YYYY-MM");
      }
      let type = parseInt(this.checkList_RoadType[0]);
      //1、高速；2、国省干线；3、城市道路；4、街道片区
      this.$http
        .$post("lkfx_keyVehiclePathHandler/singleVehiclePathStat", {
          vehicleNum: vehicleNum,
          type: type,
          startMonth: timeStartMonth,
          endMonth: timeEndMonth
        })
        .then(param => {
          //this.dealWithData(param);
          let vehicleStatList = param.vehicleStatList;
          this.tableDataTotal = vehicleStatList;
          this.vehicleInfoItem = param.vehicleInfo;

          if (vehicleStatList != null && vehicleStatList != undefined) {
            if (vehicleStatList.length > 10) {
              this.tableData = vehicleStatList.slice(0, 9);
              this.rank = 10;
              this.isShowMore = true;
              this.isShowFinished = false;
            } else {
              this.tableData = vehicleStatList;
              this.rank = vehicleStatList.length;
              this.isShowMore = false;
              this.isShowFinished = true;
            }
            let tempCurrentTableData = this.tableData;

            tempCurrentTableData.forEach(element => {
              let temp = element.roads;
              for (let i in temp) {
                // temp[i].id = parseInt(i)+1;
                let geomstr = temp[i].geometry;
                let isinfos = { ...temp[i], geomstr };
                delete isinfos.geometry;
                //isinfos = {...geomstr};
                // this.tabless.push(isinfos);
                console.log(isinfos);
                debugger;
                tmap.addFeatureOnLayer(
                  "TR_VEHICLES_KEY_ROAD",
                  isinfos,
                  "TR_VEHICLES_KEY_ROAD",
                  false,
                  false
                );
              }
            });
          }

          /** for(let k in tempCurrentTableData){
            let temp = tempCurrentTableData[k].roads;
            
            let isinfos = {};
            for(let i in temp){
              //此处未避免同一条路线出现多种颜色，在内循环中，使用同一个id来渲染，此处将parseInt(i)换成parseInt(k)
              temp[i].id = (parseInt(i)+1)/10;
              let geomstr = temp[i].geometry;
              isinfos = {...temp[i],geomstr};
              delete isinfos.geometry;
              tmap.addFeatureOnLayer("TR_VEHICLES_KEY_ROAD",
                                      isinfos,
                                      "TR_VEHICLES_KEY_ROAD",
                                      false,
                                      false
                                  );
            }

          
           
        }
        }*/
        });
    },
    vehiclesQueryCanel() {
      this.isShowVehicleInfo = false;
      this.input_cph = "";
      this.value_Month = "";
      this.tableData = [];
      this.vehicleInfoItem = {};
      this.rank = 0;
      this.isShowMore = false;
      this.isShowFinished = true;
    },
    getData(data) {
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
    },
    more() {
      //计算接下来的10条数据
      let clickMoreButtonNum = this.clickMoreButtonNum;
      let tableTemp = this.tableDataTotal;
      let currentDataItemCount = this.tableData.length;
      let tableData = [];
      if (tableTemp.length - currentDataItemCount > 10) {
        tableData = tableTemp.slice(
          currentDataItemCount + 1,
          currentDataItemCount + 10
        );
        this.rank = currentDataItemCount + 10;
        this.isShowMore = true;
        this.isShowFinished = false;
      } else {
        tableData = tableTemp.slice(currentDataItemCount + 1, tableTemp.length);
        this.rank = tableTemp.length;
        this.isShowMore = false;
        this.isShowFinished = true;
      }
      this.clickMoreButtonNum = clickMoreButtonNum + 1;
    }
  },
  data() {
    return {
      //url: "lkfx_keyVehiclePathHandler/singleVehiclePathStat",  //url 已修改
      queryResult_Area: 0,
      lineDetailData: {},
      pickerOptions: monthrange,
      isShowVehicleInfo: false,
      isShowFinished: true,
      isShowMore: false,
      vehicleInfoItem: {},
      tableData: [],
      checkList_time: ["0"],
      checkList_industry: ["111"],
      checkList_RoadType: ["2"],
      value_Month: "",
      input_cph: "",
      enterpriseSearchData: [],
      input_LonLat: "",
      areaName: "",
      areaData: "",
      updateId: "",
      updateAreaName: "",
      beginId: "",
      isShow: false,
      searchConfig: {}
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin el-checkbox__label {
  color: #fff;
}
.keyarea-wrap {
  display: flex;
  height: 100%;
  width: 100%;
}
.line-detail-container {
  position: absolute;
  transition: all 0.6s;
  right: 410px;
  top: 140px;
}

.left {
  width: 100%;
  height: 650px;
  .vehicles-time-area {
    float: left;
    width: 100%;
    margin-bottom: 10px;
    .area-left {
      float: left;
      width: 20%;
      margin-top: 10px;
    }
    .area-right {
      float: left;
      width: 78%;
      /**.el-date-editor:nth-child(1){
        width: 140px;
        float: left;
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
  .vehicles-distribution-area {
    float: left;
    width: 100%;
    margin-bottom: 10px;
    .area-left {
      float: left;
      width: 20%;
      margin-top: 10px;
    }
    .area-right {
      float: left;
      width: 79%;
      .el-checkbox:nth-child(1) {
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(2) {
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(3) {
        width: 20%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(4) {
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(5) {
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(6) {
        width: 20%;
        @include el-checkbox__label;
      }
    }
  }
  .vehicles-roadType {
    float: left;
    width: 100%;

    margin-bottom: 10px;
    .area-left {
      float: left;
      width: 21%;
      margin-top: 10px;
    }
    .area-right {
      float: left;
      margin-top: 10px;
      width: 69%;
      .el-checkbox:nth-child(1) {
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(2) {
        width: 23%;
        @include el-checkbox__label;
      }
      .el-checkbox:nth-child(3) {
        width: 20%;
        @include el-checkbox__label;
      }
    }
  }
  .vehicles-Info {
    width: 100%;
    height: 300px;
    line-height: 25px;
    .vehicles-line-one {
      label {
        font-size: 14px;
      }
      span {
        color: #999999;
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .vehicles-line-two {
      .vehicles-left {
        float: left;
        width: 50%;
        label {
          font-size: 14px;
        }
        span {
          color: #999999;
          font-family: Source Han Sans CN;
          font-weight: 400;
          font-size: 14px;
        }
      }
      .vehicles-right {
        float: left;
        width: 49%;
        label {
          font-size: 14px;
        }
        span {
          color: #999999;
          font-family: Source Han Sans CN;
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
  }
  .vehicles-location-area {
    margin: 10px 0px 10px 0px;
    float: left;
    width: 100%;
    .area-left {
      float: left;
      width: 68%;
    }
    .area-right {
      float: left;
      margin-left: 10px;
      width: 29%;
    }
  }
  .el-divider {
    float: left;
    width: 100%;
    margin: 5px 0px 5px 0px;
    background-color: rgba(32, 86, 221, 0.4);
  }
  .vehicles-area-button {
    float: left;
    width: 100%;

    .area-left {
      float: left;
      width: 68%;
      .el-button {
        float: right;
      }
    }
    .area-right {
      float: left;
      margin-left: 10px;
      width: 29%;
    }
  }
  .result {
    float: left;
    width: 100%;
    height: 95%;
    .moreButton {
      text-align: center;
      display: block;
    }
    .arrow-down-finished {
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