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
        <el-table-column label="客运站名称" prop="stationName"></el-table-column>
        <el-table-column label="场站占地面积" prop="siteArea"></el-table-column>
        <el-table-column label="行政区划" prop="districtCode"></el-table-column>
        <el-table-column label="中心纬度" prop="latitude"></el-table-column>
        <el-table-column label="客运站描述" prop="remark"></el-table-column>
        <el-table-column label="客运站地址" prop="stationAddress"></el-table-column>
        <el-table-column label="客运站级别" prop="levalCode"></el-table-column>
        <el-table-column label="订票电话" prop="tel"></el-table-column>
        <el-table-column label="中心经度" prop="longitude"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="table-detail-btn" @click="handleDetail( scope.row,scope.$index)">详情</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </TableAndPagination>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import BusStation from "./config/BusStation";
export default {
  name: "",
  mixins: [tableMixins, BusStation]
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>