<template>
  <!-- 跨区域经营 -->
  <div class="trafficJam-container">

    <div class="sub">
       <p>跨区域经营</p>
    </div>
    <div class="trafficJam-content">
      <StaticTableScrollContainer>
        <el-table :data="tableData" style="width: 100%" stripe >
          <el-table-column label="车牌号" prop="carNumber" >
          </el-table-column>
          <el-table-column label="包车行程" prop="line"></el-table-column>
          <el-table-column label="经营公司" prop="enterprise"></el-table-column>
          <el-table-column label="监测时间" prop="date"></el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted () {
      this.$http.$get("charteredCar_RealTimeMonitoringHandler/getAbnormalInfo").then((res)=>{
          if (res) {
              this.tableData = res.crossList;
          }
      })
  },
  data() {
    return {
      tableData: [],
      stepLength: 60,
      tableConfig: {
        height: "100"
      },
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