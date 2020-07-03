<template>
  <!-- 重点车辆运输运行监测 -- 数据查询 -- 车辆错误数据查询 -->
  <div class="BusStation-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig" :detailFormConfig="detailFormConfig">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            
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
            <el-table-column label="车牌颜色" prop="cphcolor"></el-table-column>
            <el-table-column label="业户名称" prop="merchantName"></el-table-column>

            <el-table-column label="报错位置" prop="errorLocation"></el-table-column>
            <el-table-column label="接收时间" prop="receiveTime"></el-table-column>
            <el-table-column label="终端时间" prop="terminalTime"></el-table-column>

            <el-table-column label="经度" prop="lon"></el-table-column>
            <el-table-column label="纬度" prop="lat"></el-table-column>
            
            <el-table-column label="速度" prop="velocity"></el-table-column>
            <el-table-column label="方向" prop="direction"></el-table-column>
            <el-table-column label="海拔" prop="altitude"></el-table-column>
            <el-table-column label="错误类型" prop="errorType"></el-table-column>
            
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
      title: "",
      tableData: [
        ...new Array(6).fill({
          cph: "川A79096",
          cphcolor: "黄色",          
          merchantName: "安运运输有限公司",
          errorLocation: "",
          receiveTime: "",
          terminalTime: "",
          lon: "104.118934",
          lat: "30.667025",
          velocity: "80Km/h",
          direction: "正西",
          altitude: "",
          errorType: "时间错误",

          accessPlatform: "省厅平台",
          onlineStatus: "在线",
          firstAccessPlatformTime: "20191201 12:00:00",
          lastOnlineTime: "20191201 12:00:00",
          currentLocation:"成都市-武侯区"
        })
      ],
      searchConfig: {
        searchCondition: [
        {
            type: "input",
            label: "车牌号码",
            placeholder: "车牌号码",
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