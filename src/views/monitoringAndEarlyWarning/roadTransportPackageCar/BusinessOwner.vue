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
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话号码" prop="tel"></el-table-column>
        <el-table-column label="身份证号" prop="id"></el-table-column>
        <el-table-column label="驾驶证号" prop="license"></el-table-column>
        <el-table-column label="从业资格证号" prop="certificate"></el-table-column>
        <el-table-column label="从业资格证有效期" prop="period"></el-table-column>
        <el-table-column label="从业资格证类别" prop="type"></el-table-column>
        <el-table-column label="地址" prop="addr"></el-table-column>
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
import BusinessOwner from "./config/BusinessOwner";
export default {
  name: "",
  mixins: [tableMixins,BusinessOwner],
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>