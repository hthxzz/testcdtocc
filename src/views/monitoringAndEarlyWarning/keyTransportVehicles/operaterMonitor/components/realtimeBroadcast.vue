<template>
  <div class="rmxl-wrap">
    <div class="realTime">
      <div class="totalNum_mapLocation">
        <VehicleTotalNumber :value="vehiclesNum" style="float: left;"></VehicleTotalNumber>
        <div class="right">
          <!--<p @click="mapLocationDistribution()">地图分布</p>-->
        </div>
      </div>

      <StaticTableScrollContainer :stepLength="stepLength">
        <!-- <el-table :data="tableData" style="width: 100%" >
          <el-table-column label="序号" prop="id"  width="70" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span >
                {{scope.row.id}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="车牌号" prop="vehicleNo" width="90"></el-table-column>
          <el-table-column label="违法类型" prop="alarmType">
          </el-table-column>
        </el-table>-->
        <table>
          <tr v-for="(item, index) in tableData" :key="item.id" @click="tableDataFn(item)">
            <th>NO.{{index + 1 }}</th>
            <th>{{item.vehicleNo}}</th>
            <td>{{item.alarmType}}</td>
            <th>{{item.alarmTime}}</th>
          </tr>
        </table>
      </StaticTableScrollContainer>
    </div>
  </div>
</template>

<script>
import VehicleTotalNumber from "./vehicleTotalNumber.vue";
import mapAnimation from "@/components/common/map/animation/mapAnimation";
import dayjs from "dayjs";
export default {
  name: "RealtimeBroadcast",
  mixins: [mapAnimation],
  components: {
    VehicleTotalNumber
  },
  mounted() {
    this.getVehicleListOfAlarm();
  },
  methods: {
    mapLocationDistribution() {
      let param = this.tempAlarmInfo;
      //this.$emit('childFn',false);
      this.setMapLocation(param);
    },
    tableDataFn(item) {
      // console.log(item);
      this.$emit("childFn", false);
      let lon = item.lon;
      let lat = item.lat;
      let arr = [];
      arr.push(lon, lat);
      tmap.removeLayer("WXPC_VEHICLES");
      tmap.removeLayer("LYBC_VEHICLES");
      tmap.removeLayer("BXKY_VEHICLES");
      tmap.removeLayer("NETABOUT_VEHICLES");
      tmap.removeLayer("BUS_VEHICLES");
      tmap.removeLayer("CRUISE_VEHICLES");
      tmap.removeLayer("PROVINCE_VEHICLES");
      tmap.removeLayer("NATIONWIDE_VEHICLES");
      tmap.removeLayer("AREA_VEHICLES");
      this.moveToPoint(arr, 1000, function() {
        tmap.centerAt(lon, lat, 10);
      });
      // tmap.centerAt(lon, lat, 12);
      tmap.addFeatureOnLayer(
        "AREA_VEHICLES",
        item,
        "AREA_VEHICLES",
        false,
        false
      );
    },
    getVehicleListOfAlarm() {
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getVehicleListOfAlarm")
        .then(res => {
          if (res != null && res != undefined) {
            let arr = res;
            let param = [];
            for (let i in res) {
              let temp = res[i];
              // arr[i].id = i;
              let alarmType = temp.alarmType;
              arr[i].vehiclePlateNum = temp.vehicleNo;

              if (alarmType == "1") {
                arr[i].alarmType = "超速报警";
              } else if (alarmType == "2") {
                arr[i].alarmType = "疲劳驾驶";
              } else {
                //6
                arr[i].alarmType = "路线偏离";
              }
              let item = {};
              item.lon = temp.lon;
              item.lat = temp.lat;
              //arr[i].alarmTime = dayjs(temp.alarmTime).format("YYYY-MM-DD HH:mm:ss");
              let alarmTimeTemp = parseInt(temp.alarmTime);

              console.log(alarmTimeTemp);
              arr[i].alarmTime = dayjs(1592243183000).format(
                "YYYY-MM-DD hh:mm:ss"
              );
              param.push(item);

              this.tableData = arr;
              this.vehiclesNum = arr.length;
            }
            this.tempAlarmInfo = arr;
            //this.setMapLocation(param);
          } else {
            this.tableData = [];
          }
        });
    },
    setMapLocation(param) {
      param.forEach(item => {
        tmap.addFeatureOnLayer(
          "AREA_VEHICLES",
          item,
          "AREA_VEHICLES",
          false,
          false
        );
      });
    }
  },
  data() {
    return {
      stepLength: 160,
      tableConfig: {
        height: "310"
      },
      tempAlarmInfo: [],
      tableData: [],
      vehiclesNum: 0
    };
  }
};
</script>

<style lang="scss" scoped>
$capcity: 0.9;
.realTime {
  // margin-top: 20px;
  height: 210px;
  position: relative;
  margin-top: 10px;
  .totalNum_mapLocation {
    .right {
      margin-left: 10px;
      float: left;
      p {
        color: #2056dd;
        margin-top: 12px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  table {
    width: calc(100% - 20px);
    height: 300px;
    tr {
      &:hover th {
        color: rgba(255, 255, 255, 1);
      }
      th {
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.6);
        text-align: left;
      }
      th:nth-child(1) {
        width: 20%;
        // color: rgba(32, 86, 221, $capcity);
      }
      th:nth-child(2) {
        width: 25%;
        text-align: left;
        // color: rgba(114, 246, 250, $capcity);
      }
      th:nth-child(3) {
        text-align: left;
        width: 25%;
        // color: rgba(255, 255, 0, $capcity);
      }
      th:nth-child(4) {
        text-align: left;
        width: 29%;
        // color: rgba(255, 255, 0, $capcity);
      }
    }
  }
}
</style>