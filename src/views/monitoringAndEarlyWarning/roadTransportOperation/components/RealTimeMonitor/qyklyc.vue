<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">

    <div class="sub">
       <p>区域客流异常</p>
    </div>
    <div class="trafficJam-content">
      <StaticTableScrollContainer>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column label="客运站" prop="stationName" >
          </el-table-column>
          <el-table-column label="异常情况" prop="abnormalDescribe"></el-table-column>
          <el-table-column label="时间" prop="updateTime" :formatter="formate" ></el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted () {
      this.$http.$get('kyjc_stationTransportState/getAbnormalArea').then((data)=>{
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