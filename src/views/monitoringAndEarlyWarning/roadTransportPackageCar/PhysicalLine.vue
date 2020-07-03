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
        <el-table-column label="线路名称" prop="enterpriseName"></el-table-column>
        <el-table-column label="线路类别" prop="legalName"></el-table-column>
        <el-table-column label="出发城市" prop="enterpriseTel"></el-table-column>
        <el-table-column label="到达城市" prop="licenseAbbr"></el-table-column>
        <el-table-column label="到期时间" prop="bussinessScopeCode"></el-table-column>
        <el-table-column label="途径站" prop="operaStatus"></el-table-column>
        <el-table-column label="状态" prop="enterpriseTypeCode"></el-table-column>
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
import PhysicalLine from "./config/PhysicalLine";
export default {
  name: "",
  mixins: [tableMixins,PhysicalLine],
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>