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
        <el-table-column label="当事人姓名" prop="partyName"></el-table-column>
        <el-table-column label="案件名称" prop="legalName"></el-table-column>
        <el-table-column label="处罚决定书编号" prop="punishDecisionNo"></el-table-column>
        <el-table-column label="案件类别" prop="caseType"></el-table-column>
        <el-table-column label="处罚理由" prop="punishReason"></el-table-column>
        <el-table-column label="处罚金额" prop="punishMoney"></el-table-column>
        <el-table-column label="车牌颜色" prop="plateColorCode"></el-table-column>
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
import AdministrativePunishment from "./config/AdministrativePunishment";
export default {
  name: "",
  mixins: [tableMixins, AdministrativePunishment]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>