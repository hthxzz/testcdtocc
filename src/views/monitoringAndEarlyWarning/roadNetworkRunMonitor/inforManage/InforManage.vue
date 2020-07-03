<template>
  <div class="infor-manage-wrap nomap-content-container">
    <div class="infor-manage-title">
      <div class="item"></div>
      <div class="item basicInfor active" @click="activeTab1($event)">基础信息管理</div>
      <div class="item">|</div>
      <div class="item argumentSet" @click="activeTab2($event)">参数设置</div>
      <div class="line1"></div>
      <div class="line2"></div>
    </div>
    <div class="infor-manage-content">
      <!-- 基础信息管理内容 -->
      <div class="first">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <div class="imgWrap">
                <img src="./img/xxgl_gzld.png" alt />
              </div>
              <div for="关注路段">关注路段</div>
            </span>
            <div class="road-network-event-content">
              <TableAndPagination
                :searchConfig="searchConfig"
                :totalP="total"
                @fetchTableData="fetchTableData"
                @handleDetail="handleDetail"
                @getSearchValue="getSearchValue"
              >
                <el-table
                  style="width: 100%;height:100%;overflow-y: auto"
                  :data="tableData"
                  stripe
                  @cell-dblclick="changeStatus"
                >
                  <el-table-column label="路段名称" prop="roadName"></el-table-column>
                  <el-table-column label="路段编号" prop="linkId"></el-table-column>
                  <el-table-column label="路段起点名称" prop="startName"></el-table-column>
                  <el-table-column label="路段止点名称" prop="endName"></el-table-column>
                  <el-table-column label="路段长度（公里）" prop="length"></el-table-column>
                  <el-table-column label="道路方向" prop="direction" :formatter="formateDirection"></el-table-column>
                  <el-table-column label="关注类型" width="150px" prop="focusType">
                    <template slot-scope="scope">
                      <!-- <div>{{scope.$index}}</div> -->
                      <el-select v-model="scope.row.focusType1" multiple placeholder="请选择">
                        <el-option label="拥堵" value="拥堵"></el-option>
                        <el-option label="流量" value="流量"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="指数是否展示到首页" prop="isShowIndex" align="center">
                    <template slot-scope="scope">
                      <img
                        src="./img/gz.png"
                        alt
                        style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;cursor: pointer;"
                        v-if="scope.row.isShowIndex == '1'"
                      />
                      <img
                        src="./img/wgz.png"
                        alt
                        style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;cursor: pointer;"
                        v-if="scope.row.isShowIndex == '0' "
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="流量是否展示到首页" prop="isShowFlow" align="center">
                    <template slot-scope="scope">
                      <img
                        src="./img/gz.png"
                        alt
                        style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;cursor: pointer;"
                        v-if="scope.row.isShowFlow == '1'"
                      />
                      <img
                        src="./img/wgz.png"
                        alt
                        style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;cursor: pointer;"
                        v-if="scope.row.isShowFlow == '0' "
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="是否为关注路段" align="center" prop="isFocus">
                    <template slot-scope="scope">
                      <img
                        src="./img/gz.png"
                        alt
                        style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;cursor: pointer;"
                        v-if="scope.row.isFocus == '1'"
                      />
                      <img
                        src="./img/wgz.png"
                        alt
                        style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;cursor: pointer;"
                        v-if="scope.row.isFocus == '0' "
                      />
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="操作" >
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)"
                            
                          >详情</el-button>
                        </template>
                  </el-table-column>-->
                </el-table>
              </TableAndPagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="桥梁">
            <span slot="label">
              <div class="imgWrap">
                <img src="./img/xxgl_ql.png" alt />
              </div>
              <div for="桥梁">桥梁</div>
            </span>桥梁
          </el-tab-pane>
          <el-tab-pane label="隧道">
            <span slot="label">
              <div class="imgWrap">
                <img src="./img/xxgl_sd.png" alt />
              </div>
              <div for="隧道">隧道</div>
            </span>隧道
          </el-tab-pane>
          <el-tab-pane label="道路设备">
            <span slot="label">
              <div class="imgWrap">
                <img src="./img/xxgl_dlsb.png" alt />
              </div>
              <div foar="道路设备">道路设备</div>
            </span>道路设备
          </el-tab-pane>
          <el-tab-pane label="道路设施">
            <span slot="label">
              <div class="imgWrap">
                <img src="./img/xxgl_dlss.png" alt />
              </div>
              <div for="道路设施">道路设施</div>
            </span>道路设施
          </el-tab-pane>
        </el-tabs>
        <!-- <img class="bgimg" src="./img/search_bg.png" alt /> -->
      </div>
      <!-- 参数设置内容 -->
      <div class="second" style="display:none">参数设置内容</div>
    </div>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  mixins: [tableMixins],
  mounted() {
    document
      .querySelector(".basicInfor")
      .addEventListener("click", function() {});
  },
  methods: {
    formateDirection(a, b, c) {
      const type = {
        "1": "上行",
        "2": "下行",
        "3": "双向",
        "11": "南北",
        "12": "东西",
        "13": "顺时针",
        "21": "北南",
        "22": "西东",
        "23": "逆时针"
      };
      return type[c];
    },
    formateTableData(data) {
      for (const item of data && data.results) {
        item.focusType1 = item.focusType ? item.focusType.split(",") : [];
      }
      return data;
    },
    updateRoadFocusStatu(row, column, cell, event) {
      debugger;
      if (column.property == "isFocus") {
        let val = row.isFocus;
        let linkId = row.linkId;
      }
    },
    changeStatus(row, column, cell, event) {
      var linkId, isFocus;
      linkId = row.linkId;
      isFocus = row.isFocus;
      if (column.property == "isShowIndex") {
        this.$http
          .$get("lkfx_focusRoadHandler/updateRoadShowIndexStatu", {
            roadId: linkId,
            isShow: row.isShowIndex == 1 ? 0 : 1,
            isFocus: isFocus
          })
          .then(res => {
            this.getSearchTableValue();
          });
      }
      if (column.property == "isShowFlow") {
        this.$http
          .$get("lkfx_focusRoadHandler/updateRoadShowFlowStatu", {
            roadId: linkId,
            isShow: row.isShowFlow == 1 ? 0 : 1,
            isFocus: isFocus
          })
          .then(res => {
            this.getSearchTableValue();
          });
      }
    },
    formateIndex(a, b, c) {
      const type = {
        "1": "是",
        "0": "否"
      };
      return type[c];
    },
    activeTab1($event) {
      let index = Array.from($event.srcElement.classList).indexOf("active");
      if (index != -1) {
        return;
      } else {
        $event.srcElement.classList.add("active");
        document.querySelector(".argumentSet").classList.remove("active");
        document.querySelector(".first").style.display = "block";
        document.querySelector(".second").style.display = "none";
      }
    },
    activeTab2($event) {
      let index = Array.from($event.srcElement.classList).indexOf("active");
      if (index != -1) {
        return;
      } else {
        $event.srcElement.classList.add("active");
        document.querySelector(".basicInfor").classList.remove("active");
        document.querySelector(".second").style.display = "block";
        document.querySelector(".first").style.display = "none";
      }
    }
  },
  data() {
    return {
      url: "/lkfx_focusRoadHandler/allMainRoadsData",
      0: "",
      1: "",
      focusType: "",
      focusType0: "",
      focusType1: "",
      focusType2: "",
      focusType3: "",
      focusType4: "",
      focusType5: "",
      focusType6: "",
      focusType7: "",
      focusType8: "",
      focusType9: "",
      searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 1,
            type: "input",
            label: "",
            // width: "123px",
            placeholder: "路段名称",
            VModelvalue: {
              name: "roadName",
              defaultValue: ""
            }
          }
          // {
          //   order: 11,
          //   type: "input",
          //   label: "",
          //   // width: "123px",
          //   placeholder: "路段编号",
          //   VModelvalue: {
          //     name: "linkId",
          //     defaultValue: ""
          //   }
          // },
          // {
          //   order: 3,
          //   type: "datetimerange",
          //   formate: "yyyy-MM-dd HH:mm:ss",
          //   label: "",
          //   placeholderStart: "开始时间",
          //   placeholderEnd: "截止时间",
          //   VModelvalue: {
          //     name: "date1",
          //     defaultValue: "2"
          //   }
          // }
        ],
        searchButton: [
          {
            order: 1,
            label: "查询"
          },
          {
            order: 2,
            label: "添加"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.infor-manage-wrap {
  // width: 100%;
  height: 100%;
  // background: rgba(5, 12, 38, 1);
  // border: 1px solid rgba(32, 86, 221, 1);
  display: flex;
  flex-direction: column;
  .infor-manage-title {
    flex: 50;
    display: flex;
    margin-left: 23px;
    margin-right: 16px;
    position: relative;
    .line1 {
      position: absolute;
      width: 145px;
      height: 1px;
      background-color: rgba(32, 86, 221, 1);
      bottom: -4px;
    }
    .line2 {
      position: absolute;
      width: calc(100% - 145px);
      left: 145px;
      height: 1px;
      background-color: rgba(32, 86, 221, 0.6);
      bottom: -4px;
    }
    .item {
      width: 220px;
      height: 20px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 21px;
      // line-height:30px;
      // margin-bottom: 8px;
    }
    .item:nth-child(1) {
      width: 6px;
      height: 20px;
      background: rgba(32, 86, 221, 1);
      // margin-left: 23px;
    }
    .item:nth-child(2) {
      width: 120px;
      // height:20px;
      // background:rgba(32,86,221,1);
      color: #fff;
      margin-left: 8px;
      color: rgba(32, 86, 221, 1);
      cursor: pointer;
    }
    .item:nth-child(3) {
      width: 6px;
      height: 20px;
      // background:rgba(32,86,221,1);
      margin-left: 10px;
    }
    .item:nth-child(4) {
      width: 120px;
      height: 20px;
      // background:rgba(32, 86, 221, 1);
      color: rgba(32, 86, 221, 1);
      margin-left: 10px;
      text-align: left;
      cursor: pointer;
    }
  }
  .infor-manage-content {
    flex: 910;
  }
  .active {
    color: #fff !important;
  }
}

$backgroundColor: rgba(5, 12, 38, 1);
.road-network-event-wrap {
  // width:100%;
  height: 100%;
  // background: rgba(5, 12, 38, 1);
  border: 1px solid rgba(32, 86, 221, 0.6);
  // background-image: url("./img/search_bg.png");
  background-size: 124px 120px;
  background-repeat: no-repeat;
  background-position: right top;
}
.road-network-event-content {
  height: 100%;
  width: 100%;
}
.bgimg {
  position: absolute;
  top: 45px;
  right: 19px;
  width: 124px;
  height: 120px;
}
.imgWrap {
  width: 48px;
  height: 48px;
  background: rgba(32, 86, 221, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgWrap > img {
  width: 34px;
  height: 34px;
  vertical-align: bottom;
}
.first,
.second {
  margin-top: 22px;
}
.showIndex {
  cursor: pointer;
}
</style>