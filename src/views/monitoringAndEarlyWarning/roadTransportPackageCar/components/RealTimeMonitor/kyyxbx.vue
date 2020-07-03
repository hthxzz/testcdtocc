<template>
<!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">
    <!-- <div class="header">
      <SelectTag :content="content"></SelectTag>
    </div> -->
    <div class="sub">
       <p>可疑运行班线</p>
    </div>
    <div class="trafficJam-content">
                              <StaticTableScrollContainer>
      <el-table :data="tableData" style="width: 100%" stripe >
          <el-table-column label="车牌号" prop="carNumber" ></el-table-column>
          <el-table-column label="包车行程" prop="line"></el-table-column>
          <!-- <el-table-column label="经营公司" prop="jygs"></el-table-column> -->
          <el-table-column label="时间" prop="date"></el-table-column>
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
              this.tableData = res.suspiciousList;
          }
      })
  },
  data() {
    return {
       tableData: []
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