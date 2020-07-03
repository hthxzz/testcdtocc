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
        <el-table-column label="序号" prop="num"></el-table-column>
        <el-table-column label="车牌号" prop="carNumber"></el-table-column>
        <el-table-column label="底盘号" prop="chassis"></el-table-column>
        <el-table-column label="经营许可证号" prop="license"></el-table-column>
        <el-table-column label="许可证有效期" prop="period"></el-table-column>
        <el-table-column label="技术等级" prop="techGrade"></el-table-column>
        <el-table-column label="技术等级评定日期" prop="date"></el-table-column>
        <el-table-column label="年审状态" prop="status"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="table-detail-btn" @click="handleDetail( scope.row,scope.$index)">详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </TableAndPagination>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import runCar from "./config/runCar";
export default {
  name: "",
  mixins: [tableMixins,runCar],
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>