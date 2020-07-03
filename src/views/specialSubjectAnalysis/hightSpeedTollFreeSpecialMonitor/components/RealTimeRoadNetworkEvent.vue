<template>
    <div class="real-time-road-network-event-container">
        <!-- 实时路网事件状况 -->
           <div class="network-content">
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
            <el-button v-if="scope.row.changeRate > 2"  style="color:rgba(255, 192, 0, 1)" >未解除</el-button>
            <el-button v-if="scope.row.changeRate < 2"  style="color:rgba(255, 192, 0, 1)" >已解除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </StaticTableScrollContainer>
    </div>

    </div>
</template>

<script>
    export default {
        name: '',
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .network-content{
        height: 260px;
    }
</style>