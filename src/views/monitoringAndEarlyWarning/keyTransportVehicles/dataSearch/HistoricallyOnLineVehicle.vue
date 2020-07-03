<template>
  <!-- 重点车辆运输运行监测 -- 数据查询 -- 数据接入查询 -->
  <div class="BusStation-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig" :detailFormConfig="detailFormConfig">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
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
            <el-table-column label="营运状态" prop="transportStatus"></el-table-column>
            <el-table-column label="所属行业" prop="belongsIndustry"></el-table-column>
            <el-table-column label="在线状态" prop="onlineStatus">
                <template slot-scope="scope">
                    <span style="color:green" v-if="scope.row.onlineStatus === '在线' ">{{ scope.row.onlineStatus }}</span>
                    <span style="color:red" v-else>{{ scope.row.onlineStatus }}</span>
                </template>
            </el-table-column>
            <el-table-column label="业户名称" prop="merchantName"></el-table-column>
            <el-table-column label="接入平台" prop="accessPlatform"></el-table-column>
            <el-table-column label="所属地区" prop="belongsArea">
                <template slot-scope="scope">
                    <span style="color:green">{{ scope.row.belongsArea }}</span>
                </template>
            </el-table-column>
            <el-table-column label="轨迹点数" prop="locusNumber"></el-table-column>
            <el-table-column label="首次上线时间" prop="firstOnlineTime"></el-table-column>
            <el-table-column label="最后上线时间" prop="lastOnlineTime"></el-table-column>
            <el-table-column label="上线率" prop="OnlineRate"></el-table-column>
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
          dateRange: "2019-12-01~20191202",
          cph: "川A79096",
          transportStatus:"营运",
          belongsIndustry: "班线客运",
          onlineStatus: "在线",
          merchantName: "安运运输有限公司",
          accessPlatform: "省厅平台",
          vehicleType: "未知",
          belongsArea: "34",
          locusNumber: "11345",
          firstOnlineTime: "20191201 12:00:00",
          lastOnlineTime: "20191201 12:00:00",
          OnlineRate:"100%",
          cphcolor: "黄色"
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
  }
};
</script>

<style lang="scss" scoped>
    .BusStation-wrapper{
        height: 100%;
    }
</style>