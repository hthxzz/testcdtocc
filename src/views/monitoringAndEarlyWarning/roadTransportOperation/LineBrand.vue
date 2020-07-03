<template>
  <div class="OperationComplaint-wrapper nomap-content-container">
    <!-- <h2>营运投诉</h2> -->
    <TableAndPagination
      :searchConfig="searchConfig"
      :detailFormConfig="detailFormConfig"
      :totalP="total"
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
        <el-table-column label="线路名" prop="shuttleName"></el-table-column>
        <el-table-column label="车牌号" prop="vehiclePlateId"></el-table-column>
        <el-table-column label="起点站名" prop="startStationName"></el-table-column>
        <el-table-column label="终点站名" prop="endStationName"></el-table-column>
        <el-table-column label="线路牌有效期" prop="startTime" :formatter="formateTime"></el-table-column>
        <el-table-column label="线路牌号" prop="shuttlePlateNo"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
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
import LineBrand from "./config/LineBrand";
export default {
  name: "",
  mixins: [tableMixins, LineBrand]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>