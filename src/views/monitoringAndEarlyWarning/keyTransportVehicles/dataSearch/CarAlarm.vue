<template>
  <!-- 重点车辆运输运行监测 -- 数据查询 -- 车辆报警查询 -->
  <div class="BusStation-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig" :detailFormConfig="detailFormConfig" :totalP='total' :fatherMethod="fatherMethod">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="车牌号" prop="cph">
                <template slot-scope="scope">
                    <span style="color:#00FF00" v-if="scope.row.vehicleColor === 5 ">{{ scope.row.vehicleNo }}</span>
                    <span style="color:#FFFF00" v-else-if="scope.row.vehicleColor === 2 ">{{ scope.row.vehicleNo }}</span>
                    <span style="color:#FFFFFF" v-else-if="scope.row.vehicleColor === 4 ">{{ scope.row.vehicleNo }}</span>
                    <span style="color:#0000FF" v-else-if="scope.row.vehicleColor === 1 ">{{ scope.row.vehicleNo }}</span>
                    <span style="color:#000000" v-else-if="scope.row.vehicleColor === 3 ">{{ scope.row.vehicleNo }}</span>
                    <span style="color:#FF0000" v-else-if="scope.row.vehicleColor === 6 ">{{ scope.row.vehicleNo }}</span>
                </template>
            </el-table-column>
            <el-table-column label="报警类型" prop="alarmTypeName"></el-table-column>
            <el-table-column label="开始时间" prop="firstOnlineTime"></el-table-column>
            <el-table-column label="结束时间" prop="lastOnlineTime"></el-table-column>
            <el-table-column label="业户名称" prop="merchantName"></el-table-column>
            <el-table-column label="接入平台" prop="accessPlatform"></el-table-column>
            <el-table-column label="开始地区" prop="startArea"></el-table-column>
            <el-table-column label="结束地区" prop="endArea"></el-table-column>
            <el-table-column label="所属行业" prop="belongsIndustry"></el-table-column>
          </el-table>
        </TableAndPagination>
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  mixins: [tableMixins],
  data() {
    return {
      total:0,
      title: "",
      url:'zdjc_vehiclegpsstatistic/getVehicleListOfAlarmByPage',
      tableData: [
        // ...new Array(6).fill({
        //   cph: "川A79096",//vehicleNo
        //   alarmType: "超速报警",//alarmType
        //   firstOnlineTime: "20191201 12:00:00",
        //   lastOnlineTime: "20191201 12:00:00",
        //   merchantName: "安运运输有限公司",//ownerName
        //   accessPlatform: "省厅平台",
        //   startArea:"",
        //   endArea: "",
        //   belongsIndustry: "班线客运",//vehicleType
        //   cphcolor: "黄色"//vehicleColor
        // })
      ],
      searchConfig: {
        searchCondition: [
        {
            type: "input",
            label: "车牌号",
            placeholder: "车牌号",
            VModelvalue: {
                name: "cph",
                defaultValue: ""
            }
        },
        {
            type: "input",
            label: "业户名称",
            placeholder: "业户名称",
            VModelvalue: {
                name: "merchantName",
                defaultValue: ""
            }
        },{
            type: "daterange",
            formate: "yyyy-MM-dd",
            label: "日期范围",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
                name: "dateRange",
                defaultValue: "4"
            }
        }
        ],
        searchButtonGroup: 
        [
          {
            action: "query",
            label: "查询"
          },
          {
            action: "export",
            label: "导出"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
    .BusStation-wrapper{
        height: 100%;
    }
</style>