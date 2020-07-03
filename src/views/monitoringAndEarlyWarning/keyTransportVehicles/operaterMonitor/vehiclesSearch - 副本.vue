<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <div class="left">
              <TableAndPagination
                :searchConfig="searchConfig"
                :detailFormConfig="detailFormConfig"
                :totalP="total"
                @fetchTableData="fetchTableData"
                @handleDetail="handleDetail"
                @getSearchValue="getSearchValue"
                @addClick="add"
              >
                <el-table
                  style="width: 100%;height:100%;overflow-y: auto"
                  :height="tableHeight"
                  :data="tableData"
                  stripe
                  ref="table"
                >
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column label="区域名称" prop="areaName" width="70"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        class="table-detail-btn"
                        @click="handleInfo(scope.$index, scope.row)"
                      >查看</el-button>
                      <el-button
                        size="mini"
                        class="table-detail-btn1 table-detail-btn"
                        @click="handleEdit(scope.$index, scope.row)"
                      >重绘</el-button>
                      <el-button
                        size="mini"
                        class="table-detail-btn1 table-detail-btn"
                        @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>n
                </el-table>
              </TableAndPagination>
            </div>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
        <div class="tag-wrap">
          <ChangeTag :itemList="itemList" @getStatues="getStatues" />
        </div>
      </template>
      <template #rightPanel></template>
    </BaseLayoutContent>
    <vehiclesSearchDetail v-show="isShow" ref="keyAreaDetail" @transferName="getData"></vehiclesSearchDetail> 
  </div>
</template>

<script>
import Basemap from "../../../../components/common/map/baseMap";
import vehiclesSearchDetail from "./components/vehiclesSearchDetail.vue";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";

export default {
  mixins: [tableMixins],
  components:
   { Basemap
      , vehiclesSearchDetail
   },
  methods: {
    getSearchValue(val) {
      this.getSearchTableValue(val);
    },
    // 查看
    handleInfo(index, row) {
      debugger;
      this.$http.$get("zdjc_vehicleAreaHandler/getAreaInfoById",{ id: row.id }).then(data => {
          tmap.addLayer("VEHICLES_KEY_FOCUS_AREA");
          debugger;
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
    res(data) {
      debugger;
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
      debugger;
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