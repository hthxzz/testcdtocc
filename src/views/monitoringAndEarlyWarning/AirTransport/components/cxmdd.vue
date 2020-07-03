<template>
<!-- 出行目的地 -->
  <div class="trafficJam-container">
    <div class="trafficJam-content">
      <StaticTableScrollContainer>
      <el-table :data="tableData" style="width: 100%" stripe fit=true >
        <el-table-column label="路段" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拥堵情况" prop="flow">

        </el-table-column>
        <el-table-column label="影响公交线路">
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
  methods: {
    videoPlay(row){
        console.log(row);

    }  
  },
  data() {
    return {

      
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
      ],
      stepLength: 60,
      tableConfig: {
        height: "100"
      },
      tableHeadList: [
        {
          prop: "date",
          label: "排名",
          align: "center",
          width: "56"
          // formatter:function(row, column, cellValue, index){
          //     return "<div>"+ cellValue +"</div>";
          // }
        },
        {
          prop: "name",
          label: "路段名称",
          align: "center"
          // "width":"100"
        },
        {
          prop: "address",
          align: "center",
          label: "交通延时指数",
          width: "100"
        }
      ]
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