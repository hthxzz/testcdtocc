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
        <el-table-column label="线路名称" prop="shuttleName"></el-table-column>
        <el-table-column label="线路类别" prop="shuttleTypeCode" :formatter="ShuttleTypeCode"></el-table-column>
        <el-table-column label="出发城市" prop="startCity"></el-table-column>
        <el-table-column label="到达城市" prop="endCity"></el-table-column>
        <el-table-column label="线路里程" prop="mile"></el-table-column>
        <el-table-column label="主要途经区域" prop="keyArea"></el-table-column>
        <el-table-column label="线路状态" prop="routeStateCode"></el-table-column>
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
import PhysicalLine from "./config/PhysicalLine";
export default {
  name: "",
  mixins: [tableMixins, PhysicalLine]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>