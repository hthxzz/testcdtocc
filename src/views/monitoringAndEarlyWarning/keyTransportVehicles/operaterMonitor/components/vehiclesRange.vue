<template>
  <div class="real-time-traffic-flow-wrap">
    <section class="wrap"></section>
    <section class="wrap table-list">
      <!-- <StaticTableScrollContainer> -->
        <!-- <el-table :data="vehicleRangeTableData" @row-click="showHeatMap" style="width: 94%;"  stripe> -->
        <el-table :data="vehicleRangeTableData" style="width: 94%;"  stripe>
          <el-table-column label="序号" prop="id" width="60px;"></el-table-column>
          <el-table-column label="所在区域" prop="codeName"  :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column label="总数" prop="allAreaNum" width="50px;"></el-table-column> -->
          <el-table-column label="在线数" prop="onlineNum" ></el-table-column>
          <el-table-column label="报警数" prop="alarmvehNum">
            <template slot-scope="scope">
              <span
                style="color:rgba(255, 0, 0, 1);font-weight:bold;"
                v-if="scope.row.alarmvehNum >= 2"
              >{{ scope.row.alarmvehNum }}</span>
              <span
                style="color:rgba(255, 192, 0, 1)"
                v-if="scope.row.alarmvehNum <2"
              >{{ scope.row.alarmvehNum }}</span>
            </template>
          </el-table-column>
        </el-table>
      <!-- </StaticTableScrollContainer> -->
    </section>
  </div>
</template>

<script>
export default {
  name: "VehiclesRange",
  props: {
    vehicleRangeTableData: Array,
    required: true
  },
  mounted() {
    // this.getVehicleRange();
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex >= 0) {
        return "color: #ff0;";
      }
    },
    getVehicleRange() {
      
      // this.tableData = this.vehicleRangeTableData;
      // console.log("测试结果");
      // this.vehicleRangeTableData = [];
      // let type ='0';//该参数无效，默认全国
      // let checkbox_value = '111';
      // if(checkbox_value != null && checkbox_value!=undefined){
      //   checkbox_value =this.$refs.checkbox_value;
      // }
      // this.$http.$get("zdjc_vehiclegpsstatistic/getVehicleMainlyStat",{"type":type,"vehicletype":checkbox_value}).then((param) => {
      //   this.tableData = param;
      // });
    },showHeatMap(row, event, column){
      // console.log(object);
      // let coordinates = row.coordinates;
      // let alarmvehNum = row.alarmvehNum;
      // console.log("在此展示热力图");
      // tmap.addFeatureOnLayer('AREA_VEHICLES',coordinates,'AREA_VEHICLES',false,false);
      // console.log(row);
      tmap.removeLayer("NATIONWIDE_VEHICLES");
      tmap.removeLayer("AREA_VEHICLES");
      tmap.removeLayer("VEHICLES_KEY_FOCUS_AREA");
      tmap.removeLayer("PROVINCE_VEHICLES");
      let vehicleGPSArea = {}
      let geomstr = row.coordinates
      vehicleGPSArea = {...row,geomstr}
      tmap.addFeatureOnLayer(
          "PROVINCE_VEHICLES",
          vehicleGPSArea,
          "PROVINCE_VEHICLES",
          false,
          false
      );
    }
    
  },
  data() {
    return {
      stepLength: 60,
      tableConfig: {
        height: "380"
      },
      // vehicleRangeTableData: [],
      tableData: [
        ...new Array(3).fill({
          codeName: "川LX4296",
          onlineNum: "违规停车",
          time: "2020-04-26 13:24:09"
          // content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          // name: "成青路",
          // changeRate: "1.2",
          // flow: 123
        }),
        ...new Array(3).fill({
          codeName: "川A43961",
          onlineNum: "违规停车",
          time: "2020-04-26 16:24:09"
          // content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          // name: "成青路",
          // changeRate: "1.6",
          // flow: 234
        }),
        ...new Array(3).fill({
          codeName: "川B43990",
          onlineNum: "违规停车",
          time: "2020-04-26 16:24:09"
          // content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          // name: "成青路",
          // changeRate: "2.2",
          // flow: 345
        }),
        ...new Array(3).fill({
          codeName: "川L43990",
          onlineNum: "违规停车",
          time: "2020-04-26 16:24:09"
          // content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          // name: "成青路",
          // changeRate: "2.6",
          // flow: 456
        })
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.table-list {
  height: 380px;
  position: relative;
  margin-top: 10px;
}

</style>