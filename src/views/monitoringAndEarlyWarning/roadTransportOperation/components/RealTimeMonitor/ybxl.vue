<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">

    <div class="sub">
       <p>延班线路</p>
    </div>
    <div class="trafficJam-content">
      <StaticTableScrollContainer>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column label="客运线路" prop="shuttleName" >
          </el-table-column>
          <el-table-column label="计划发班时间" prop="planTime"></el-table-column>
          <el-table-column label="实时状态" prop="delaySituation"></el-table-column>
          <el-table-column label="最近车辆" prop="vehiclePlateId"></el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  mounted () {
      this.$http.$get('kyjc_stationTransportState/getDelayLine').then((data)=>{
        this.tableData = data;
      });
  },
  methods: {
    formate(row, column, cellValue){
        return cellValue && this.$utils.dayjs(parseInt(cellValue)).format('YYYY-MM-DD');
    }
  },
  data() {
    return {
      tableData: [],
    };
  }
};
</script>

<style lang="scss" scoped>
.trafficJam-container {
  width: 100%;
  height: 100%;
  .header {
    overflow: hidden;
  }
  .trafficJam-content {
    height: 300px;
    position: relative;
    margin-top: 10px;
  }
}
</style>