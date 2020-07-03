<template>
<!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">
    <!-- <div class="header">
      <SelectTag :content="content"></SelectTag>
    </div> -->
    <div class="sub">
       <p>路网异常</p>
    </div>
    <div class="trafficJam-content">
                              <StaticTableScrollContainer>
      <el-table :data="tableData" style="width: 100%" stripe >
        <el-table-column label="拥堵线路" prop="line" ></el-table-column>
          <el-table-column label="影响车辆" prop="affectedCarNum"></el-table-column>
          <el-table-column label="影响行程" prop="affectedLine"></el-table-column>
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
              this.tableData = res.abnormalList;
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