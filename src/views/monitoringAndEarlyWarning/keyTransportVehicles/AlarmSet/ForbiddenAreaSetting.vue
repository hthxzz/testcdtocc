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
                  <el-input v-model="input_AreaName" placeholder></el-input>
                </div>
              </div>
              <el-divider></el-divider>

              <div class="vehicles-distribution-area">
                <div class="area-left">
                  <label>行业</label>
                </div>
                <div class="area-right">
                  <el-checkbox-group v-model="checkList_industry" @change="groupchange_industry">
                    <el-checkbox label="111">班线客运</el-checkbox>
                    <el-checkbox label="114">包车客运</el-checkbox>
                    <el-checkbox label="141">危货运输</el-checkbox>
                    <!--  <el-checkbox label="112">公交运输</el-checkbox>-->
                    <el-checkbox label="113">巡游出租</el-checkbox>
                    <el-checkbox label="115">网约出租</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <el-divider></el-divider>

              <div class="vehicles-time-area">
                <div class="area-left">
                  <label>时间设置</label>
                </div>
                <div class="area-right">
                  <el-checkbox-group v-model="checkList_time" @change="groupchange_time">
                    <el-checkbox label="0">所有时间</el-checkbox>
                    <el-checkbox label="1">临时时间</el-checkbox>
                    <el-checkbox label="2">每日固定时间</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <section v-if="temporaryPeriodTimeShow">
                <div class="vehicles-temporaryTime">
                  <div class="area-left">
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  </div>
                  <div class="area-right">
                    <el-date-picker
                      v-model="value_TemplateTime"
                      @row-click="rowHanddle"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </div>
              </section>
              <section v-if="fixedPeriodTimeShow">
                <div class="vehicles-temporaryTime" v-for="(item, index) in fixedPeriodTimeList">
                  <div class="area-left">
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  </div>
                  <div class="area-right">
                    <el-time-picker
                      is-range
                      arrow-control
                      v-model="item.value_TemplateTime"
                      value-format="HH:mm:ss"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                    ></el-time-picker>
                    <el-button
                      v-if="index == 0"
                      type="primary"
                      icon="el-icon-plus"
                      class="searchButton"
                      @click="add()"
                    ></el-button>
                  </div>
                </div>
              </section>
              <div class="vehicles-location-area">
                <div class="area-left">
                  <el-input v-model="input_LonLat" placeholder :disabled="true"></el-input>
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
                <span>已经添加的禁行区域</span>
              </div>
              <el-divider></el-divider>
              <div class="result">
                <el-table
                  style="width: 100%;height:95%;overflow-y: auto;"
                  :height="tableHeight"
                  :data="tableData"
                  stripe
                  ref="table" 
                >
                  <el-table-column type="index" width="30"></el-table-column>
                  <el-table-column label="区域名称" prop="areaName" width="" show-overflow-tooltip></el-table-column>
                  <el-table-column label="最后修改时间"  prop="updateTime" width="" show-overflow-tooltip>
                      <template slot-scope="scope">{{scope.row.updateTime|formatDate}}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                      <!--<el-button
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
                <el-pagination
                  small
                  :pager-count="5"
                  background
                  layout="prev, pager, next,total"
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
    <!--<keyAreaDetail v-show="isShow" ref="keyAreaDetail" @transferName="getData"></keyAreaDetail>-->
  </div>
</template>

<script>
import Basemap from "../../../../components/common/map/baseMap";
import keyAreaDetail from "./keyAreaDetail.vue";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { daterange } from "@/components/common/searchPanel/SearchPanelConfig";
import { _formatDate } from "../../../../components/common/common.js";
import dayjs from "dayjs";

export default {
  mixins: [tableMixins],
  components: { Basemap, keyAreaDetail },
  filters: {
    formatDate(time) {
      if (time < 0) return "0000-00-00 00:00:00";
      let date = new Date(time / 1);
      return _formatDate(date, "yyyy-MM-dd hh:mm:ss"); //年-月-日 时分
    }
  },
  mounted() {
    this.vehiclesQuery();
  },
  methods: {
    add() {
      //每日固定时间设置
      let obj = { value_TemplateTime: "" };
      this.fixedPeriodTimeList.push(obj);
      //fixedPeriodTimeList:[{id:1,value_TemplateTime:''}],
    },
    groupchange_industry(val) {
      if (this.checkList_industry.length > 1) {
        this.checkList_industry.shift();
      }
    },
    groupchange_time(val) {
      debugger;
      if (this.checkList_time.length > 1) {
        this.checkList_time.shift();
      }
      let checkbox_value = this.checkList_time[0];
      if (checkbox_value == "1") {
        this.fixedPeriodTimeShow = false;
        this.temporaryPeriodTimeShow = true;
      } else if (checkbox_value == "2") {
        this.fixedPeriodTimeShow = true;
        this.temporaryPeriodTimeShow = false;
      } else {
        //所有时间
        this.fixedPeriodTimeShow = false;
        this.temporaryPeriodTimeShow = false;
      }
    },
    //getSearchValue(val) {
    // this.getSearchTableValue(val);
    // },
    // 查看
    //handleInfo(index, row) {
    rowHanddle(row, column, event) {
      this.$http
        .$get("zdjc_vehicleAreaHandler/getAreaInfoById", { id: row.id })
        .then(data => {
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
      this.input_AreaName = row.areaName;
      //this.updateAreaName = row.areaName;

      this.$http
        .$get("zdjc_vehicleAreaHandler/getAreaInfoById", { id: row.id })
        .then(data => {
          //tmap.addLayer("VEHICLES_KEY_FOCUS_AREA");
          // 保存上一次请求的id
          debugger;
          this.input_LonLat = data.geom;
          let forbiddenTimeTemp_ = data.forbiddenTime;
          //此处解析时间

          //所有时间：0
          //临时时间：1*[2020-1-12 12:09:34,2020-1-12 12:09:45]
          //每日固定时间：2*[8:09:34,9:09:45]#[12:09:34,13:09:45]

          //先判断是否含有*
          if (forbiddenTimeTemp_.indexOf("*") > 0) {
            //截取第一个元素，看是否为1还是为2
            let tempArr = forbiddenTimeTemp_.split(/\*/);

            if (tempArr[0] == "1") {
              //控制展示 临时时间
              this.groupchange_time("1");
              this.value_TemplateTime = tempArr[1];
            } else {
              //控制展示 每日固定时间
              this.groupchange_time("2");
              this.setFixedPeriodTimeList(tempArr[1]);
            }
          } else {
            this.groupchange_time("0");
          }

          this.beginId = row.id;
        });

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
    setFixedPeriodTimeList(forbiddenTimeTemp) {
      debugger;
      if (
        forbiddenTimeTemp != null &&
        forbiddenTimeTemp != undefined &&
        forbiddenTimeTemp.indexOf("#")
      ) {
        let forbiddenTimeTempArr = forbiddenTimeTemp.split(/#/);
        let forbiddenTimeItemArr = [];
        forbiddenTimeTempArr.forEach(element => {
          if (element.indexOf(",") > 0) {
            let temp = element.split(/,/);
            let obj = {};
            obj.value_TemplateTime = temp;
            forbiddenTimeItemArr.push(obj);
          }
        });
        this.fixedPeriodTimeList = forbiddenTimeItemArr;
      } else {
        //只有一对开始时间和结束时间
        let forbiddenTimeItemArr = [];
        if (forbiddenTimeTemp.indexOf(",") > 0) {
          let temp = forbiddenTimeTemp.split(/,/);
          let obj = {};
          obj.value_TemplateTime = temp;
          forbiddenTimeItemArr.push(obj);
        }
        this.fixedPeriodTimeList = forbiddenTimeItemArr;
      }
    },
    // 重绘数据并提交
    update(data) {
      if (data) {
        this.input_LonLat = data;
      }
    },
    plotting() {
      // 点击【标会】添加图层
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
    handleCurrentChange(curPage) {
      this.vehiclesQuery(curPage);
    },
    vehiclesQuery(curPage) {

      let queryFields_temp = [];

      let queryField_AreaType = {};
      queryField_AreaType.columnName = "areaType";
      queryField_AreaType.dataType = "String";
      queryField_AreaType.operator = "=";
      queryField_AreaType.queryValue = "2";
      queryFields_temp.push(queryField_AreaType);

      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      search.queryFields = JSON.stringify(queryFields_temp);

      let page = 1;
      let pageSize = 10;
      this.$http
        .$post("zdjc_AlertSettingHandler/getAreaInfoByPage", search)
        .then(param => {
          //this.dealWithData(param);
          this.tableData = param.results;
          this.total = param.totalRecordNum;
        });
    },
    cancelButton() {
      this.input_LonLat = "";
      this.input_AreaName = "";
      this.updateId = "";
      //this.getSearchValue();
      this.vehiclesQuery();
    },
    saveButton() {
      let forbiddenTimeTemp = "";

      if (this.checkList_time == 2) {
        let list = this.fixedPeriodTimeList;

        for (let i in list) {
          let temp = list[i];
          let value = temp.value_TemplateTime;
          let temp1 =
            value[0] != null && value[0] != undefined && value[0] != ""
              ? value[0]
              : "";
          let temp2 =
            value[1] != null && value[1] != undefined && value[1] != ""
              ? value[1]
              : "";
          temp1 = temp1 + "," + temp2;
          forbiddenTimeTemp += temp1 + "#";
        }
        if (forbiddenTimeTemp.length > 1) {
          //11:20:38,12:20:38#15:20:41,16:20:41#
          forbiddenTimeTemp =
            "2*" + forbiddenTimeTemp.substring(0, forbiddenTimeTemp.length - 1);
        }
      } else if (this.checkList_time == 1) {
        //临时时间
        forbiddenTimeTemp = "1*" + this.value_TemplateTime;
      } else {
        //全部
        forbiddenTimeTemp = "0";
      }

      if (
        this.updateId != null &&
        this.updateId != undefined &&
        this.updateId != ""
      ) {
        this.edit(forbiddenTimeTemp);
      } else {
        let data = this.input_AreaName;
        let industry = this.checkList_industry[0];

        //
        let params = {
          areaName: data,
          industry: industry,
          areaType: 2,
          geom: this.areaData,
          forbiddenTime: forbiddenTimeTemp
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
              //this.getSearchValue();
              this.vehiclesQuery();
            }
          });
      }
    },//编辑后提交
    edit(forbiddenTimeTemp) {
      debugger;
      let data = this.input_LonLat;
      let areaNameTemp = this.input_AreaName;

      // 保存图层
      let params = {
        id: this.updateId,
        //areaName: this.updateAreaName,
        areaType: 2,
        areaName: areaNameTemp,
        forbiddenTime: forbiddenTimeTemp,
        geom: data
      };
      this.$http
        .$post("/zdjc_AlertSettingHandler/updateAreaInfo", {
          data: JSON.stringify(params)
        })
        .then(data => {
          debugger;
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
    getData(data) {
      if (data) {
        this.input_AreaName = data;
        // 保存图层
      }
    }
  },
  data() {
    return {
      //url: "zdjc_vehicleAreaHandler/getAreaInfoByPage?areaType=2",  //url 已修改
      fixedPeriodTimeShow: false,
      temporaryPeriodTimeShow: false,
      fixedPeriodTimeList: [{ id: 1, value_TemplateTime: "" }],
      pickerOptions: daterange,
      tableData: 0,
      total: 0,
      checkList_time: ["0"],
      checkList_industry: ["111"],
      input_AreaName: "",
      value_TemplateTime: "",
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

.left {
  width: 100%;
  height: 550px;
  .vehicles-distribution-area {
    float: left;
    width: 100%;
    margin-top: 10px;
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
  .vehicles-time-area {
    float: left;
    width: 100%;
    margin-top: 10px;
    .area-left {
      float: left;
      width: 20%;
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
        width: 28%;
        @include el-checkbox__label;
      }
    }
  }
  .vehicles-temporaryTime {
    margin-top: 10px;
    float: left;
    width: 100%;
    .area-left {
      float: left;
      width: 21%;
    }
    .area-right {
      float: left;
      width: 69%;
      .el-date-editor {
        width: 80%;
      }
      .el-button {
        width: 18%;
        margin-left: 5px;
        .el-icon-plus {
          ::before {
            margin-left: -10px;
          }
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
      width: 72%;
    }
    .area-right {
      float: left;
      margin-left: 10px;
      width: 25%;
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
    margin-top: 10px;

    .area-left {
      float: left;
      width: 72%;
      .el-button {
        float: right;
      }
    }
    .area-right {
      float: left;
      margin-left: 10px;
      width: 25%;
    }
  }
  .result {
    float: left;
    width: 100%;
    height: 90%;
  }
}
.table-detail-btn1 {
  background: rgba(32, 86, 221, 0.4) !important;
  border: 0 !important;
}
.el-tooltip__popper {
  max-width:30%;
}
</style>
<style lang="css" scoped>
.result >>> .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>