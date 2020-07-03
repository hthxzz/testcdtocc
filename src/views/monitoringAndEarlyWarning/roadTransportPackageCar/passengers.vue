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
        <el-table-column label="车牌号" prop="enterpriseName"></el-table-column>
        <el-table-column label="底盘号" prop="legalName"></el-table-column>
        <el-table-column label="经营许可证号" prop="enterpriseTel"></el-table-column>
        <el-table-column label="许可证有效期" prop="licenseAbbr"></el-table-column>
        <el-table-column label="技术等级" prop="bussinessScopeCode"></el-table-column>
        <el-table-column label="技术等级评定日期" prop="operaStatus"></el-table-column>
        <el-table-column label="年审状态" prop="operaStatus"></el-table-column>
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
import passengers from "./config/passengers";
export default {
  name: "",
  mixins: [tableMixins,passengers],
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>