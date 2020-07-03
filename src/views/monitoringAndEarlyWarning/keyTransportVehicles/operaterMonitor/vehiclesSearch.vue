<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="车辆查询" :displaySwitch=false >
            <div class="vehicles-query">
              <el-tabs>
                <el-tab-pane label="车辆查询" class="vehicles-distribution-query-tab">
                  <BicycleQuery @childFn="parentFn"></BicycleQuery>
                </el-tab-pane>
                <el-tab-pane label="区域查车" class="vehicles-location-query-tab">
                  <BicycleLocationQuery @childFn="parentFn"></BicycleLocationQuery>
                  <!--<BicycleQuery @childFn="parentFn"></BicycleQuery>-->
                </el-tab-pane>
              </el-tabs>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
      <!--  <div class="tag-wrap">
          <ChangeTag :itemList="itemList" @getStatues="getStatues" />
        </div> -->
      </template>
      <template #rightPanel></template>
    </BaseLayoutContent>
    <VehicleSearchMore style="position: absolute;bottom: 45px;right: 20px;width:1110px;" v-if="isshowhide" :test='vehicleNo' ref="ptus" />
  <!--  <vehiclesSearchDetail v-show="isShow" ref="keyAreaDetail" @transferName="getData"></vehiclesSearchDetail>  -->
  </div>
</template>

<script>
import Basemap from "../../../../components/common/map/baseMap";
//import vehiclesSearchDetail from "./components/vehiclesSearchDetail.vue";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import BicycleLocationQuery from "./components/bicycleLocationQuery.vue";
import BicycleQuery from "./components/bicycleQuery.vue";
import VehicleSearchMore from "./components/vehicleSearchMore.vue";
import mapAnimation from "@/components/common/map/animation/mapAnimation";

export default {
  mixins: [tableMixins],
  components:
   { Basemap,BicycleLocationQuery,BicycleQuery,VehicleSearchMore
   },
   mounted(){
    //tmap.setMapZoomLevel(5);
     window.getBaseInfoHtml = this.getBaseInfoHtml;
     //tmap.removeLayer("NATIONWIDE_VEHICLES");

    // tmapproxy.safeExcute("removeLayer","NATIONWIDE_VEHICLES");
     
   },methods: {
     //区域查询定位的基本信息
            getBaseInfoHtml(type, data, feaCoordinate, titleText, width, height) {
                if (type.indexOf("AREA_VEHICLES") !== -1) {
                    this.vehicleNo = data.vehicleNo;
                    if(this.isshowhide==true){
                        this.$refs.ptus.getVehicle(data.vehicleNo);
                    }
                    this.isshowhide = true;
                    return null;
                }else if(type.indexOf("BUS_VEHICLES") !== -1){
                     this.vehicleNo = data.vehicleNo;
                    if(this.isshowhide==true){
                        this.$refs.ptus.getVehicle(data.vehicleNo);
                    }
                    this.isshowhide = true;
                    return null;
                }else if(type.indexOf("NETABOUT_VEHICLES") !== -1){
                    this.vehicleNo = data.vehicleNo;
                    if(this.isshowhide==true){
                        this.$refs.ptus.getVehicle(data.vehicleNo);
                    }
                    this.isshowhide = true;
                    return null;
                }else if(type.indexOf("CRUISE_VEHICLES") !== -1){
                    this.vehicleNo = data.vehicleNo;
                    if(this.isshowhide==true){
                        this.$refs.ptus.getVehicle(data.vehicleNo);
                    }
                    this.isshowhide = true;
                    return null;
                }else if(type.indexOf("LKYW_VEHICLES") !== -1){
                    this.vehicleNo = data.vehicleNo;
                    if(this.isshowhide==true){
                        this.$refs.ptus.getVehicle(data.vehicleNo);
                    }
                    this.isshowhide = true;
                    return null;
                }else{
                    return null;
                }
                // return null;
            },
    getStatues(val,firstLoad){//获取tag选择状态
    },
    parentFn(item){
                this.ishide = item
            },
    getSearchValue(val) {
      this.getSearchTableValue(val);
    },
    // 查看
    handleInfo(index, row) {
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
            // if (data === 1) {
            if (data) {
              this.$message.success("修改成功");
              this.getSearchValue();
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
        this.$http
          .$get("/zdjc_vehicleAreaHandler/deleteAreaInfoById", { id: row.id })
          .then(data => {
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
    }
  },
  data() {
    return {
     // url: "zdjc_vehicleAreaHandler/getAreaInfoByPage",  //url 已修改
     itemList: [],
      isshowhide:false,
      areaName: "",
      areaData: "",
      updateId: "",
      updateAreaName: "",
      beginId: "",
      isShow: false,
      searchConfig: {
        // isKeyV:true,
        searchCondition: [
          {
            type: "input",
            label: "区域名称",
            placeholder: "请输入",
            VModelvalue: {
              name: "area_name",
              defaultValue: ""
            }
          }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          },
          {
            action: "click",
            label: "新增区域"
          }
        ]
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
  height: 600px;
}
.table-detail-btn1 {
  background: rgba(32, 86, 221, 0.4) !important;
  border: 0 !important;
}


</style>
<style lang="css" scoped>
 .vehicles-query >>> .el-tabs__header {
        /* border-bottom: 1px solid #0C4AC8 !important; */
        margin: 0 0 10 !important; 
    }.vehicles-query >>> .el-tabs__content{
        width: 100%;
        margin-left: 0 !important;
        margin-top: 8px;
    }
    .vehicles-query >>> .el-tabs__content .colItem + .button-wrap{
        /* width: 100%;
        margin-left: 0 !important; */
        margin-top: 8px;
    }
    .vehicles-query >>> .el-tabs__content .colItem + .button-wrap .button{
        flex: 1;
        text-align: right;
        align-self: center;
        margin-right: 5px;
    }
    .vehicles-query >>> .el-tabs__content .table-content {
        height: calc(100% - 160px);
    } 
</script>