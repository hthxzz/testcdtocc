<!--右侧车辆分布查询 -->
<template>
  <div class="vehicles-distribution-container">
    <div class="vehicles-distribution-wrap">
      <div class="vehicles-list">
        <div class="search">
          <div class="search-condition-select">
            <el-select v-model="value_type" placeholder="请选择" @change="handleVehicleTypeChange">
              <el-option
                v-for="item in options_VehivcleType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="search-condition-select">
            <el-select v-model="value_area" placeholder="请选择区域名称" @change="handleChange">
              <el-option
                v-for="item in options_Area"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="search-condition">
            <div class="query-left-lab">
              <!-- <el-button  class="selfDesign" @click="selfDesignArea()" type="primary" plain>自定义区域</el-button>      -->
            </div>
            <div class="query-right-lab">
              <el-button type="primary" class="searchButton" @click="customAreaQuery()">查询</el-button>
            </div>
          </div>
        </div>
        <div class="search-result">
          <div class="result-num">
            相关
            <span>{{queryResult_Area}}</span>条记录
          </div>
          <div class="result-table" style="width: 96%">
            <el-table :data="tableData" stripe>
              <el-table-column prop="areaName" label="区域名称"></el-table-column>
              <el-table-column prop="vehiclePlateNum" label="车牌号"></el-table-column>
              <el-table-column prop="statusName" label="状态" width="50px;"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="table-detail-btn"
                    @click="handleEdit(scope.$index, scope.row)"
                  >定位</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              small
              :pager-count="5"
              background
              layout="prev, pager, next"
              :total="queryResult_Area"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- <div class="query-right-lab">
              <el-button type="primary" class="searchButton" @click="customAreaQuery()">查询</el-button>
      </div>-->
    </div>
  </div>
</template>

<script>
import mapAnimation from "@/components/common/map/animation/mapAnimation";
export default {
  name: "VehiclesLocationQuery",
  mixins: [mapAnimation],
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  components: {},
  create() {},
  mounted() {
    this.getAllArea();
    this.customAreaQuery();
    // debugger;
    // window.getBaseInfoHtml = this.getBaseInfoHtml;
  },
  methods: {
    // getBaseInfoHtml(type, data, feaCoordinate, titleText, width, height) {
    //   // debugger;
    // //   let content = "";
    //   if (type.indexOf("AREA_VEHICLES") !== -1) {
    //       console.log(data.vehiclePlateNum);
    //     // let busLineData = {};
    //     // let array = this.datas.filter(item => {
    //     //   return item.vehiclePlateNum == data.vehiclePlateNum;
    //     // });
    //     // for (let i = 0; i < array.length; i++) {
    //     //   busLineData = array[i];
    //     // }
    //     // let title = [
    //     //   { display: "车牌号", name: "vehiclePlateNum", colspan: 3 },
    //     //   { display: "当前车速", name: "drivingSpeed", colspan: 3 },
    //     //   { display: "经营企业", name: "enterpriseName", colspan: 3 },
    //     //   { display: "联系电话", name: "picTel", colspan: 3 },
    //     //   { display: "联系人", name: "picName", colspan: 3 }
    //     // ];
    //     // content = [
    //     //   {
    //     //     name: "基本信息",
    //     //     content: window.creatInfoHtml(title, busLineData, 2)
    //     //   },
    //     //   { name: "线路牌信息" },
    //     //   { name: "车载视频" }
    //     // ];
    //   } else {
    //     // content = null;
    //     // console.warn("图层：" + type + "没有配置弹窗展示内容！");
    //   }
    // //   return content;
    // },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex >= 0) {
        return "color: #ff0;";
      }
    },
    handleCurrentChange(curPage) {
      this.customAreaQuery(curPage);
    },
    getAllArea() {
      this.$http.$get("zdjc_vehicleAreaHandler/getAllAreaInfo").then(res => {
        const options = [];
        for (let i = 0; i < res.length; i++) {
          let item = res[i];
          options.push({
            label: item.areaName,
            value: item.id,
            geom: item.geom
          });
        }
        this.options_Area = options;
        if (options.length > 0) {
          let tem = options[0];
          this.value_area = options[0].label;
          this.areaTemp = options[0];
        }
      });
    },
    handleVehicleTypeChange(val) {
      //车辆类型

      var obj = {};
      obj = this.options_VehivcleType.find(function(item) {
        return item.value === val;
      });
      this.vehicleTypeTemp = obj;
    },
    handleChange(val) {
      //车辆区域

      var obj = {};
      obj = this.options_Area.find(function(item) {
        return item.value === val;
      });
      this.areaTemp = obj;
    },
    customAreaQuery(curPage) {
      this.$emit("childFn", false);
      tmap.removeLayer("WXPC_VEHICLES");
      tmap.removeLayer("LYBC_VEHICLES");
      tmap.removeLayer("BXKY_VEHICLES");
      tmap.removeLayer("NETABOUT_VEHICLES");
      tmap.removeLayer("BUS_VEHICLES");
      tmap.removeLayer("CRUISE_VEHICLES");
      tmap.removeLayer("NATIONWIDE_VEHICLES");
      tmap.removeLayer("AREA_VEHICLES");
      let vehicleTypeTemp = this.vehicleTypeTemp;
      let vehicletype = vehicleTypeTemp.value;
      let areaTempObj = this.areaTemp;
      let areaId = areaTempObj.value;

      // if(areaId==""||areaId==undefined){
      //     // alert("请选择区域名称");
      //     this.$message({message: '请选择区域名称，若无待选区域名称，请前往【设置重点区域】功能进行设置',type: 'warning'});
      // }
      let areaName = areaTempObj.label;
      let geom = areaTempObj.geom;

      if (areaId !== null && areaId != undefined) {
        let areaIdTemp = this.areaId_temp;
        if (areaIdTemp != 0) {
          // 消除上一个图层
          tmap.removePolygonOnLayer("VEHICLES_KEY_FOCUS_AREA", areaIdTemp);
          tmap.removeLayer("AREA_VEHICLES");
        }
        this.areaId_temp = areaId;
        tmap.addLayer("VEHICLES_KEY_FOCUS_AREA");
        tmap.addPolygonOnLayer(
          "VEHICLES_KEY_FOCUS_AREA",
          areaId,
          geom,
          "rgba(0, 255, 255,.2)",
          { color: "rgba(0, 255, 255,1)", width: 2 },
          null,
          true,
          null,
          { text: areaName }
        );
      }
      let pageNum = curPage != "" && curPage != undefined ? curPage : 1;
      let pageSize =
        this.pageSize != null && this.pageSize != undefined
          ? this.pageSize
          : 10;
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getVehicleListByTypeAndArea", {
          vehicleType: vehicletype,
          id: areaId,
          pageNum: pageNum,
          pageSize: pageSize
        })
        .then(param => {
          let tableData = param.results;
          this.tableData = tableData;
          this.queryResult_Area = param.totalRecordNum;
          // this.tableData.forEach((item)=>{
          //     tmap.addFeatureOnLayer('AREA_VEHICLES',item,'AREA_VEHICLES',false,false);
          // })
        });
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getAllVehicleListByTypeAndArea", {
          vehicleType: vehicletype,
          id: areaId
        })
        .then(param => {
          //   console.log(param);
          this.datas = param;
          param.forEach(item => {
            tmap.addFeatureOnLayer(
              "AREA_VEHICLES",
              item,
              "AREA_VEHICLES",
              false,
              false
            );
          });
        });
    },
    handleEdit(index, row) {
      //定位
      // console.log(index, row);
      let lon = row.lon;
      let lat = row.lat;
      let arr = [];
      arr.push(lon, lat);
      // console.log("lon:"+lon +"lat:"+lat);
      tmap.removeLayer("PROVINCE_VEHICLES");
      tmap.removeLayer("NATIONWIDE_VEHICLES");
      tmap.removeLayer("AREA_VEHICLES");
      this.moveToPoint(arr, 1000, function() {
        tmap.centerAt(lon, lat, 10);
      });
      // tmap.centerAt(lon, lat, 13);
      tmap.addFeatureOnLayer(
        "AREA_VEHICLES",
        row,
        "AREA_VEHICLES",
        false,
        false
      );
    }
  },
  data() {
    return {
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      datas: [],
      isshow: true,
      zdyqy: require("../img/zdyqy.png"),
      roadList: [
        {
          bcky: 10023,
          gjys: 784,
          bcky: 523,
          xycz: 12732,
          whys: 7723,
          wyc: 1723,
          zajqygc: 5723,
          qczl: 723
        }
      ],
      radio: 3,
      checkList: ["班线客运"],
      // input_jyyh:'',
      input_cph: "",
      queryResult_Area: 0,
      options_Area: [],
      // options_Area:[{
      //         value: '0',
      //         label: '区域1'
      //     },{
      //         value: '1',
      //         label: '区域2'
      //     }],
      options_VehivcleType: [
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
      value_area: "", //此处默认 下拉列 什么都不选中
      value_type: "", //
      areaId_temp: 0,
      areaTemp: {}, //临时存放选中的区域名称中的信息
      vehicleTypeTemp: {},
      tableData: [
        //     {
        //      qymc:'区域1',
        //     cph:'川A123',
        //     zxzt:'在线'
        // }, {
        //     qymc:'区域1',
        //     cph:'川A131',
        //     zxzt:'在线',
        // }, {
        //     qymc:'区域2',
        //     cph:'川A235',
        //     zxzt:'在线'
        // }, {
        //     qymc:'区域2',
        //     cph:'川A293',
        //     zxzt:'在线'
        // }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.vehicles-distribution-container {
  .vehicles-distribution-wrap {
    // width:360px;
    // height:544px;
    // box-shadow:0px 4px 5px 0px rgba(131, 152, 144, 0.35);
    width: 100%;
    height: 100%;
    opacity: 0.9; //透明度
    float: left;
    // border:solid 2px #1b49b7;
    border-top-style: none;
    .vehicles-list {
      text-align: left;
      overflow-y: hidden;
      height: 550px;
      overflow-y: auto;
      .search {
        height: 150px;
        .search-condition-select {
          width: 98%;
          height: 40px;
          margin-bottom: 10px;
          .el-select {
            width: 98%;
          }
        }
        .search-condition {
          width: 98%;
          .query-left-lab {
            float: left;
            width: 75%;
            margin-bottom: 10px;
            .el-button {
              float: right;
            }
          }
          .query-right-lab {
            float: left;
            width: 20%;
            margin-left: 10px;
            .searchButton {
              float: right;
            }
          }
        }
      }
      .search-result {
        height: 340px;
        .result-num {
          margin-top: 15px;
          width: 100%;
          height: 30px;
          color: #1d4fc9;
          span {
            margin: 0px 10px 0px 5px;
            color: #fff;
            font-weight: bold;
          }
        }
        .result-table {
          opacity: 0.9; //table表后背景无法设置透明，该设置无效
          height: 90%;
          width: 98%;
        }
      }
    }
  }
}
</style>
<style lang="css" scoped>
.vehicles-list >>> .pane-1 {
  margin-top: 10px !important;
}
.result-table >>> .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>
