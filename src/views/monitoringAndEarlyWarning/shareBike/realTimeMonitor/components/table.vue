<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">
    <div class="header">
      <SelectTag :content="content"></SelectTag>
    </div>
    <div class="trafficJam-content">
      <StaticTableScrollContainer>
        <el-table :data="tableData" style="width: 100%" stripe fit="true">
          <el-table-column label="重点区域" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
              <span style="margin-left: 10px">{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量" prop="flow"></el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  methods: {
    videoPlay(row) {
      // console.log(row);
    }
  },
  data() {
    return {
      tableData: [
        ...new Array(1).fill({
          name: "春熙路商圈",
          flow: 20140
        }),
        ...new Array(1).fill({
          name: "成都双流国际机场",
          flow: 5960
        }),
        ...new Array(1).fill({
          name: "成都火车东站",
          flow: 4477
        }),
        ...new Array(1).fill({
          name: "成都华西医院",
          flow: 3965
        })
      ],
      stepLength: 60,
      tableConfig: {
        height: "100"
      }
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