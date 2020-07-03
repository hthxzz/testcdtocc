<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">
    <!-- <div class="header">
      <SelectTag :content="content"></SelectTag>
    </div>-->
    <div class="sub">
      <p>运能异常线路</p>
    </div>
    <div class="trafficJam-content">
      <StaticTableScrollContainer>
        <el-table :data="tableData" style="width: 100%" stripe>
          <!-- <el-table-column label="运能" prop="yn" ></el-table-column> -->
          <el-table-column label="客运线路" prop="shuttleName"></el-table-column>
          <el-table-column
            label="新增高铁"
            prop="ifHighspeedtrain"
            :formatter="formateIfHighspeedtrain"
          ></el-table-column>
          <el-table-column label="时间区间" prop="sjqj" :formatter="formate"></el-table-column>
          <el-table-column label="运能增长率" prop="growth"></el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </div>
  </div>
</template>


<script>
export default {
  name: "",
  mounted() {
    this.$http
      .$get("kyjc_stationTransportState/getAbncapacityLine")
      .then(data => {
        this.tableData = data;
      });
  },
  methods: {
    formate(row) {
      var startTime =
        row &&
        this.$utils.dayjs.unix(row.startTime / 1000).format("YYYY-MM-DD");
      var endTime =
        row && this.$utils.dayjs.unix(row.endTime / 1000).format("YYYY-MM-DD");
      return startTime + " 至 " + endTime;
    },
    formateIfHighspeedtrain(row, column, cellValue) {
      if (cellValue == "1") {
        return "有";
      } else if (cellValue == "2") {
        return "没有";
      } else {
        return cellValue;
      }
    }
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