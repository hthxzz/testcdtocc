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
        <el-table-column label="驾驶员" prop="driver"></el-table-column>
        <el-table-column label="从业资格证号" prop="certificate"></el-table-column>
        <el-table-column label="车牌号" prop="carNumber"></el-table-column>
        <el-table-column label="经营业户" prop="enterprise"></el-table-column>
        <el-table-column label="死亡人数" prop="deathNum"></el-table-column>
        <el-table-column label="是否责任内" prop="isResponse"></el-table-column>
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
import TrafficAccident from "./config/TrafficAccident";
export default {
  name: "",
  mixins: [tableMixins,TrafficAccident],
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>