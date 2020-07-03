<template>
  <!-- 重点车辆运输运行监测 -- 数据查询 -- 未上线车辆查询 -->
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
            <el-table-column label="报警总数" prop="totalAlarmNum"></el-table-column>
            <el-table-column label="超速报警" prop="overspeed"></el-table-column>
            <el-table-column label="疲劳驾驶" prop="fatiguedrive"></el-table-column>
            <el-table-column label="违法上路报警" prop="illegalRoadAlarm"></el-table-column>
            <el-table-column label="疲劳驾驶报警" prop="fatigueDrivieAlarm"></el-table-column>
            <el-table-column label="违法通行报警" prop="illegalTrafficAlarm"></el-table-column>
            <el-table-column label="运行线路报警" prop="runningLineAlarm" style="color:red;"></el-table-column>
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
          overspeed: "120", 

          fatiguedrive: "201",
          illegalRoadAlarm: "120",   
          fatigueDrivieAlarm: "201",
          illegalTrafficAlarm: "120",   
          runningLineAlarm: "120"
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