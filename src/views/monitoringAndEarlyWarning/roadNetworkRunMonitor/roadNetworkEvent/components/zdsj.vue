<template>
  <div class="OperationComplaint-wrapper">
    <!-- <h2>营运投诉</h2> -->
    <TableAndPagination
      :showSearchPanel="false"
      :showPagination="false"
      :totalP="total"
      @fetchTableData="fetchTableData"
      @handleDetail="handleDetail"
      @getSearchValue="getSearchValue"
    >
      <el-table
        style="width: 100%;height:100%;overflow-y: auto"
        :data="tableData"
        stripe
        ref="table"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <label>措施详情 :</label>
            <span>{{ props.row.measureDetail }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事件上报人" prop="reporter"></el-table-column>
        <el-table-column label="事件上报人电话" prop="phone"></el-table-column>
        <el-table-column label="事件发生位置" prop="location"></el-table-column>
        <el-table-column label="阻断发生原因" prop="reason"></el-table-column>
        <el-table-column label="采取措施名称" prop="measureName"></el-table-column>
        <el-table-column label="事件上报时间" prop="reportTime"></el-table-column>
        <el-table-column label="预计恢复时间" prop="estimateTime"></el-table-column>
      </el-table>
    </TableAndPagination>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  mixins: [tableMixins],
  mounted() {
    // this.noDisposeRoadEventStat();
  },
  methods: {
    formateTableData(data) {
      return {
        results: data.blockEvents,
        totalRecordNum: data.blockEvents.length
      };
    }
  },
  data() {
    return {
      url: "/lkfx_roadEventHandler/noDisposeRoadEventStat"
    };
  }
};
</script>

<style lang="scss" scoped>
.OperationComplaint-wrapper {
  height: 100%;
}
</style>