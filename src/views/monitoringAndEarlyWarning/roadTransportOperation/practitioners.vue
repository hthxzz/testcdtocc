<template>
  <div class="content-container nomap-content-container">
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
        <el-table-column label="姓名" prop="personName"></el-table-column>
        <el-table-column label="从业资格证号" prop="legalName"></el-table-column>
        <el-table-column label="联系电话" prop="tel"></el-table-column>
        <el-table-column label="联系地址" prop="addr"></el-table-column>
        <el-table-column label="资格证有效期" prop="bussinessScopeCode"></el-table-column>
        <el-table-column label="从业资格类别" prop="operaStatus"></el-table-column>
        <el-table-column label="驾驶证号" prop="enterpriseTypeCode"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="table-detail-btn" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </TableAndPagination>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import practitioners from "./config/practitioners";
export default {
  name: "",
  mixins: [tableMixins, practitioners]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>