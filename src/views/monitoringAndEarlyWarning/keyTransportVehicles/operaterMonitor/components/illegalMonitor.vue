<template>
  <div class="real-time-traffic-flow-wrap">
    <section class="wrap">
      <VehicleTotalNumber :title="rollNumberLabel" :value="rollNumberValue"></VehicleTotalNumber>
      <!-- <RollNumber :title="rollNumberLabel" :value="rollNumberValue"></RollNumber> -->
    </section>
    <section class="wrap"></section>
    <section class="wrap table-list">
      <!-- <StaticTableScrollContainer> -->
        <el-table :data="tableData" style="width: 93.5%" >
          <el-table-column label="车牌号"  prop="cph"  width="70" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="违法类型" prop="type" width="90"></el-table-column>
          <el-table-column label="时间" prop="time">
          </el-table-column>
        </el-table>
      <!-- </StaticTableScrollContainer> -->
    </section>
  </div>
</template>

<script>

import VehicleTotalNumber from "./vehicleTotalNumber.vue";
export default {
  name: "IllegalMonitor",
  components: {
    VehicleTotalNumber
  },
  data() {
    return {
      rollNumberLabel: "违法数量",
      rollNumberValue: 0,
      stepLength: 60,
      tableConfig: {
        height: "100"
      },

      tableData: [
        ...new Array(1).fill({
          cph:"",
          type:"暂无数据",
          time:""
        }),
        // ...new Array(3).fill({
        //   cph:"川LX4296",
        //   type:"违规停车",
        //   time:"2020-04-26 13:24:09"
        // }),
        // ...new Array(3).fill({
        //   cph:"川A43961",
        //   type:"违规停车",
        //   time:"2020-04-26 16:24:09"      
        // }),
        // ...new Array(3).fill({
        //   cph:"川B43990",
        //   type:"违规停车",
        //   time:"2020-04-26 16:24:09" 
        // }),
        // ...new Array(3).fill({
        //   cph:"川L43990",
        //   type:"违规停车",
        //   time:"2020-04-26 16:24:09"
        // })
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.table-list {
  height: 100px;//150
  position: relative;
  margin-top: 10px;
}
</style>