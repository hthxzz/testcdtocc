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
        <el-table-column label="车牌号" prop="vehiclePlateId"></el-table-column>
        <el-table-column label="车牌颜色" prop="plateColorCode"></el-table-column>
        <el-table-column label="描述" prop="describeStr"></el-table-column>
        <el-table-column label="交通违法编号" prop="illegalId"></el-table-column>
        <el-table-column label="违法地点" prop="illealLocation"></el-table-column>
        <el-table-column label="驾驶证号" prop="licenseId"></el-table-column>
        <el-table-column label="违法时间" prop="illegalTime" :formatter="formateTime"></el-table-column>
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
import TrafficIllegal from "./config/TrafficIllegal";
export default {
  name: "",
  mixins: [tableMixins, TrafficIllegal]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>