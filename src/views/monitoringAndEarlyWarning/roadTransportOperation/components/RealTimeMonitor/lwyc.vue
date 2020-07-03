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
      <el-table :data="tableData" style="width: 100%" stripe :fit=true >
        <el-table-column label="拥堵线路" prop="routeName" ></el-table-column>
          <el-table-column label="影响车辆(辆)" prop="vehicleNum"></el-table-column>
          <el-table-column label="影响行程(分)" prop="affectTime"></el-table-column>
          <el-table-column label="影响客运线路" prop="shuttleName"></el-table-column>
      </el-table>
    </StaticTableScrollContainer>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted () {
      this.$http.$get('kyjc_stationTransportState/getAbnormalRoad').then((data)=>{
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