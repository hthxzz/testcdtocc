<template>
    <div class="real-time-tracffic-container">
        <!-- 实时拥堵状况 -->
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span  style="color:#2f60de;cursor: pointer;" @click="openDetail" >巡查</span>
            <span   style="color:#2f60de;cursor: pointer;margin-left: 10px;" >协同</span>
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
        methods: {
          openDetail(){
              this.$emit("openDetail");
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .network-content{
        height: 260px;
        
        
    }
</style>