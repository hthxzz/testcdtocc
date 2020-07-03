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
        <el-table-column label="车牌号" prop="vehiclePlateId"></el-table-column>
        <el-table-column label="投诉分类" prop="complaintType"></el-table-column>
        <el-table-column label="所属企业名称" prop="enterpriseName"></el-table-column>
        <el-table-column label="违章分类二级名称" prop="violationTwo"></el-table-column>
        <el-table-column label="投诉单号" prop="complaintId"></el-table-column>
        <el-table-column label="投诉渠道" prop="complaintChannel"></el-table-column>
        <el-table-column label="处理人" prop="handleName"></el-table-column>
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
import OperationComplaint from "./config/OperationComplaint";
export default {
  name: "",
  mixins: [tableMixins, OperationComplaint]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>