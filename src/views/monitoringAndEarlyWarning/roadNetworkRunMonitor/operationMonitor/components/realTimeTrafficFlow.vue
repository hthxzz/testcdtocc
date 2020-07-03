<template>
  <div class="real-time-traffic-flow-wrap">
    <section class="wrap">
      <RollNumber :title="rollNumberLabel" :value="todayTotal" unit="车次"></RollNumber>
    </section>
    <section class="wrap"></section>
    <section class="wrap table-list">
      <StaticTableScrollContainer>
        <el-table :data="focusRoads" style="width: 100%;height:100%" stripe>
          <el-table-column label="路段" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sectionStartName }}</span>
              <span style="margin-left: 10px">{{ scope.row.sectionEndName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="断面交通流量" prop="totalFlow"></el-table-column>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="table-detail-btn"
                @click="handlePlayVideo( scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </section>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getTrafficFlowStat();
  },
  methods: {
    getTrafficFlowStat() {
      this.$http
        .$get("lkfx_trafficFlowHandler/getTrafficFlowStat")
        .then(res => {
          this.todayTotal = res.todayTotal;
          const focusRoads = res.focusRoads;
          const newfocusRoads = [];
          for (const key of focusRoads) {
            for (let index = 0; index < key.cameras.length; index++) {
              const element = key.cameras[index];
              newfocusRoads.push(Object.assign(key, element));
            }
            newfocusRoads.push(key);
          }
          this.focusRoads = newfocusRoads;
        });
    },
    handlePlayVideo() {
      tmap.removeLayer("luk");
    }
  },
  data() {
    return {
      rollNumberLabel: "今日断面交通流量总量",
      todayTotal: 62345,
      stepLength: 60,
      tableConfig: {
        height: "100"
      },

      focusRoads: [],
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
.table-list {
  height: 500px;
  position: relative;
  margin-top: 10px;
}
</style>