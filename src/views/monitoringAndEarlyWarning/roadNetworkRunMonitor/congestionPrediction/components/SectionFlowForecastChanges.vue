<template>
  <div class="section-flow-forecast-changes-container">
    <v-chart :options="options" />
    <div class="section-flow-forecast-content">

    
    <StaticTableScrollContainer>
      <el-table :data="tableData" style="width: 100%" stripe fit=true >
        <el-table-column label="路段" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="断面交通流量" prop="flow">

        </el-table-column>
        <el-table-column label="变化情况">
          <template slot-scope="scope">
            <span
              style="color:rgba(255, 0, 0, 1)"
              v-if="scope.row.changeRate > 2"
            >{{ scope.row.changeRate }}</span>
            <span
              style="color:rgba(255, 192, 0, 1)"
              v-if="scope.row.changeRate <2"
            >{{ scope.row.changeRate }}</span>
       
          </template>
        </el-table-column>
      </el-table>
    </StaticTableScrollContainer>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      options: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ]
      },
      tableData: [
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "1.2",
          flow:123
        }),
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "1.6",
          flow:234
        }),
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "2.2",
          flow:345
        }),
        ...new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          changeRate: "2.6",
          flow:456
        })
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.section-flow-forecast-changes-container{
    width: 410px;
}
.echarts{
    width: 100%;
}
.section-flow-forecast-content{
    height: 260px;
}
</style>