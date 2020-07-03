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
        <el-table-column label="车牌号" prop="vehiclePlateNum"></el-table-column>
        <el-table-column label="准载客数" prop="seatNum"></el-table-column>
        <el-table-column label="保险有效期" prop="insuranceExpires" :formatter="formateTime"></el-table-column>
        <el-table-column label="额定座数" prop="seatsCount"></el-table-column>
        <el-table-column label="车站名称" prop="station"></el-table-column>
        <el-table-column label="车牌颜色" prop="plateColorCode"></el-table-column>
        <!-- <el-table-column label="年审状态" prop="operaStatus"></el-table-column> -->
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
import OperationVehicle from "./config/OperationVehicle";
export default {
  name: "",
  mixins: [tableMixins, OperationVehicle]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>