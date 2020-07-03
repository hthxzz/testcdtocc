<template>
  <div class="road-congestion-prediction-container">
    <StaticTableScrollContainer>
    <el-table :data="tableData" style="width: 100%" stripe >
      <el-table-column label="路段名称" :show-overflow-tooltip=true>
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          
        </template>
      </el-table-column>
     <el-table-column label="拥堵情况">
        <template slot-scope="scope">
          <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.ydqk == '重度拥堵' ">{{ scope.row.ydqk }}</span>
          <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.ydqk == '中度拥堵' ">{{ scope.row.ydqk }}</span>
          <span style="color:rgba(255, 255, 0, 1)" v-if="scope.row.ydqk == '轻度拥堵' ">{{ scope.row.ydqk }}</span>
          <span style="color:rgba(146, 208, 80, 1)" v-if="scope.row.ydqk == '基本畅通' ">{{ scope.row.ydqk }}</span>
        </template>
      </el-table-column>
    </el-table>
    </StaticTableScrollContainer>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [
        ... new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          ydqk: "重度拥堵"
        }),
        ... new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          ydqk: "中度拥堵"
        }),
        ... new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          ydqk: "轻度拥堵"
        }),
        ... new Array(3).fill({
          content: "从香岛大道到旌江干道-由剑南大道中段辅路由南向北",
          name: "成青路",
          ydqk: "基本畅通"
        })
      ]
    };
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
    .road-congestion-prediction-container{
        width: 100%;
        height: 493px;
    }
</style>