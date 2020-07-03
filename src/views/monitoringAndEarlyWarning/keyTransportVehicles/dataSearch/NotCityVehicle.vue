<template>
  <!-- 重点车辆运输运行监测 -- 数据查询 -- 非市内车辆查询 -->
  <div class="BusStation-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig" :detailFormConfig="detailFormConfig">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            
            <el-table-column label="车牌号" prop="cphcolor">
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
            <el-table-column label="所属行业" prop="belongsIndustry"></el-table-column>
            <el-table-column label="业户名称" prop="merchantName"></el-table-column>
            <el-table-column label="接入平台" prop="accessPlatform"></el-table-column>
            <el-table-column label="在线状态" prop="onlineStatus">
                <template slot-scope="scope">
                    <span style="color:green" v-if="scope.row.onlineStatus === '在线' ">{{ scope.row.onlineStatus }}</span>
                    <span style="color:red" v-else>{{ scope.row.onlineStatus }}</span>
                </template>
            </el-table-column>
            <el-table-column label="第一次入平台时间" prop="firstAccessPlatformTime"></el-table-column>
            <el-table-column label="最后上线时间" prop="lastOnlineTime"></el-table-column>
            <el-table-column label="当前位置" prop="currentLocation"></el-table-column>
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
          belongsIndustry: "危货运输",
          merchantName: "安运运输有限公司",
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