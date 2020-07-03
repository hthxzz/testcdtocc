<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">

    <div class="sub">
       <p>脱班车辆</p>
    </div>
    <div class="trafficJam-content">
      <StaticTableScrollContainer>
        <el-table :data="tableData" style="width: 100%" stripe :fit=true>
          <el-table-column label="车牌号" prop="vehiclePlateId" >
          </el-table-column>
          <el-table-column label="班线" prop="shuttleName"></el-table-column>
          <el-table-column label="经营公司" prop="companyName"></el-table-column>
          <el-table-column label="监测时间" prop="createTime" :formatter="formate" ></el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  mounted () {
      this.$http.$get('kyjc_stationTransportState/getOffdutyVehicle').then((data)=>{
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