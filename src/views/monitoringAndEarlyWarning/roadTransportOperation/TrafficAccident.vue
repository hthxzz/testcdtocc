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
        <el-table-column label="驾驶员姓名" prop="driverName"></el-table-column>
        <el-table-column label="发生时间" prop="occurTime" :formatter="formateTime"></el-table-column>
        <el-table-column label="车牌号" prop="vehiclePlateId"></el-table-column>
        <el-table-column label="车牌颜色" prop="plateColorCode"></el-table-column>
        <el-table-column label="死亡人数" prop="deathNum"></el-table-column>
        <el-table-column label="驾驶证号码" prop="licenseId"></el-table-column>
        <el-table-column label="受伤人数" prop="injuredNum"></el-table-column>
        <el-table-column label="失踪人数" prop="unaccountedNum"></el-table-column>
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
import TrafficAccident from "./config/TrafficAccident";
export default {
  name: "",
  mixins: [tableMixins, TrafficAccident]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>