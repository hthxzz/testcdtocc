<template>
  <div class="OperationComplaint-wrapper">
    <!-- <h2>关注车辆</h2> -->
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
        <el-table-column label="车牌号" prop="enterpriseName"></el-table-column>
        <el-table-column label="所属企业" prop="legalName"></el-table-column>
        <el-table-column label="关注状态" prop="enterpriseTel"></el-table-column>
        <!-- <el-table-column label="经营许可证" prop="licenseAbbr"></el-table-column>
        <el-table-column label="经营范围" prop="bussinessScopeCode"></el-table-column>
        <el-table-column label="经营状态" prop="operaStatus"></el-table-column>
        <el-table-column label="业户类型" prop="enterpriseTypeCode"></el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="table-detail-btn"
              @click="handleDetail( scope.row,scope.$index)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </TableAndPagination>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import BusinessOwner from "../../config/gzcl";
export default {
  name: "",
  mixins: [tableMixins, BusinessOwner]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>