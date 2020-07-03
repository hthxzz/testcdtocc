<template>
  <div class="OperationComplaint-wrapper">
    <!-- <h2>营运投诉</h2> -->
    <TableAndPagination 
      :searchConfig="searchConfig"
      :totalP=total
      @fetchTableData="fetchTableData"
      @handleDetail="handleDetail"
      @getSearchValue="getSearchValue"
     >
      <el-table
        style="width: 100%;height:100%;overflow-y: auto"
        :height="tableHeight"
        :data="tableData"
        stripe
        ref="table"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <!-- <el-table-column label="事件ID" prop="eventId"></el-table-column> -->
        <el-table-column label="事件上报人" prop="reporter"></el-table-column>
        <el-table-column label="事件上报人电话" prop="phone" ></el-table-column>
        <el-table-column label="事件发生位置" prop="location"></el-table-column>
        <el-table-column label="阻断发生原因" prop="reason"></el-table-column>
        <el-table-column label="采取措施名称" prop="measureName"></el-table-column>
        <el-table-column label="事件上报时间" prop="reportTime"></el-table-column>
        <el-table-column label="预计恢复时间" prop="estimateTime"></el-table-column>
        <!-- <el-table-column label="年审状态" prop="operaStatus"></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="table-detail-btn" @click="handleDetail( scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </TableAndPagination>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  mixins: [tableMixins],
          mounted () {
          // this.noDisposeRoadEventStat();  
        },
        methods: {
          formateTableData(data){
            // debugger
            let results = [], totalRecordNum = 0;
              results = [].concat(data.blockEvents, data.congestionEvents, data.trafficEvents, data.publicEvents);
              
              let newresults = results.filter((val)=>{
                if (val) {
                  return true;
                }
              });
              totalRecordNum = newresults.length;
              return {
                results : newresults,
                totalRecordNum : totalRecordNum,
              }

          },
        },
  data() {
        return {
            url: "/lkfx_roadEventHandler/noDisposeRoadEventStat",
            
            searchConfig: {
                searchCondition: [
                    // {
                    //     type: "input",
                    //     label: "行政区划",
                    //     // width: "123px",
                    //     placeholder: "行政区划",
                    //     VModelvalue: {
                    //         name: "enterpriseName",
                    //         defaultValue: ""
                    //     }
                    // },
                    {
                        type: "input",
                        label: "车牌号",
                        // width: "123px",
                        placeholder: "车牌号",
                        VModelvalue: {
                            name: "vehiclePlateNum",
                            defaultValue: ""
                        }
                    },
                ],
                searchButtonGroup: [{
                        action: "query",
                        label: "查询"
                    },
                    // {
                    //     action: "export",
                    //     label: "导出"
                    // }
                ]
            },
        }
    }
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>