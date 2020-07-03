<template>
  <div class="OperationComplaint-wrapper">
    <!-- <h2>营运投诉</h2> -->
    <TableAndPagination 
      :searchConfig="searchConfig"
      :detailFormConfig="detailFormConfig"
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
        <el-table-column label="投诉线路" prop="line"></el-table-column>
        <el-table-column label="投诉类型" prop="type"></el-table-column>
        <el-table-column label="所属公司" prop="enterprise"></el-table-column>
        <el-table-column label="投诉内容" prop="context"></el-table-column>
        <el-table-column label="时间" prop="date"></el-table-column>
        <el-table-column label="是否责任内" prop="isResponse"></el-table-column>
        <el-table-column label="处理状态" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="table-detail-btn" @click="handleDetail( scope.row,scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </TableAndPagination>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import OperationComplaint from "./config/OperationComplaint";
export default {
  name: "",
  mixins: [tableMixins,OperationComplaint],
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>