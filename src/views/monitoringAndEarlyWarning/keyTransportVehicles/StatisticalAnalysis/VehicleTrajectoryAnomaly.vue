<template>
  <!-- 重点车辆运输运行监测 -- 统计分析 -- 车辆轨迹异常统计 -->
  <div class="BusStation-wrapper">
        <TableAndPagination :searchConfig="searchConfig">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" :header-cell-style="tableHeaderColor" >
            <el-table-column label="日期范围" prop="dateRange"></el-table-column>
            <el-table-column label="车牌号" prop="cph">
                <template slot-scope="scope">
                    <span style="color:#00B050" v-if="scope.row.cphcolor === '绿色' ">{{ scope.row.cph }}</span>
                    <span style="color:#FFFF00" v-else-if="scope.row.cphcolor === '黄色' ">{{ scope.row.cph }}</span>
                    <span style="color:#FFFFFF" v-else-if="scope.row.cphcolor === '白色' ">{{ scope.row.cph }}</span>
                    <span style="color:#2056DD" v-else-if="scope.row.cphcolor === '蓝色' ">{{ scope.row.cph }}</span>
                    <span style="color:#667464" v-else-if="scope.row.cphcolor === '黑色' ">{{ scope.row.cph }}</span>
                    <span style="color:#EE4D60" v-else-if="scope.row.cphcolor === '红色' ">{{ scope.row.cph }}</span>
                </template>
            </el-table-column>
            <el-table-column label="车辆颜色" prop="cphcolor"></el-table-column>
            <el-table-column label="所属行业" prop="belongsIndustry"></el-table-column>
            <el-table-column label="业户名称" prop="merchantName"></el-table-column>
            <el-table-column label="接入平台" prop="accessPlatform"></el-table-column>
            <el-table-column label="所属地区" prop="belongsArea">
                <template slot-scope="scope">
                    <span style="color:green">{{ scope.row.belongsArea }}</span>
                </template>
            </el-table-column>

            <el-table-column label="错误类型" prop="errorType"></el-table-column>
            <el-table-column label="轨迹异常开始日期" prop="startTime"></el-table-column>
            <el-table-column label="异常起始地图经纬度" prop="start_lon_lat"></el-table-column>
            <el-table-column label="异常结束经纬度" prop="end_lon_lat"></el-table-column>
            <el-table-column label="轨迹异常里程" prop="mileage"></el-table-column>
            <el-table-column label="轨迹异常结束日期" prop="endTime"></el-table-column>
          </el-table>
        </TableAndPagination>
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { create } from 'domain';
export default {
  name: "",
  mixins: [tableMixins],
  data() {
    return {
      title: "",
      tableData: [
        ...new Array(6).fill({
          dateRange: "2019-12-01~20191202",
          cph: "川A79096",
          cphcolor: "黄色",
          transportStatus:"营运",
          belongsIndustry: "班线客运",
          merchantName: "安运运输有限公司",
          accessPlatform: "省厅平台",
          vehicleType: "未知",
          belongsArea: "34",
          totalAlarmNum: "201",
          overspeed: "130", 

          errorType: "经纬度",
          startTime: "2020-01-26",   
          start_lon_lat: "",
          end_lon_lat: "",   
          mileage: "10",
          endTime: "2020-01-26"
        })
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
  },
  create(){},
  methods:{
      // 修改table tr行的背景色,配合    :row-style="tableRowStyle" 使用
    // tableRowStyle({ row, rowIndex }) {
    //   return 'background-color: pink'
    // },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && (columnIndex>=8)) {
        return 'color: #ff0;'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
    .BusStation-wrapper{
        height: 100%;
    }
</style>