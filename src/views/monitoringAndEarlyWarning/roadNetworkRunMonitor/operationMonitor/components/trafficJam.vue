<template>
  <!-- 拥堵路段Top10 -->
  <div class="trafficJam-container">
    <div class="header">
      <SelectTag :content="content" @activeTag="activeTag"></SelectTag>
    </div>
    <div class="trafficJam-content">
      <!-- <StaticTableScrollContainer> -->
      <el-table :data="tableData" style="width: 100%;height:100%" stripe>
        <el-table-column type="index" width="10"></el-table-column>
        <el-table-column type="expand" width="13">
          <template slot-scope="props">
            <div class="expand-ele">
              <p>
                <label>路段名称 :</label>
                <span>{{ props.row.startEndName }}</span>
              </p>
              <p>
                <label>路段起止点桩号 :</label>
                <span>{{ props.row.startEndMile }}</span>
              </p>
              <p>
                <label>路段全名 :</label>
                <span>{{ props.row.fullName }}</span>
              </p>
              <p>
                <label>道路名称 :</label>
                <span>{{ props.row.roadName }}</span>
              </p>
              <p>
                <label>路段平均速度 :</label>
                <span>{{ props.row.speed }}</span>
              </p>
              <p>
                <label>路段行驶方向 :</label>
                <span>{{ props.row.direction | direction }}</span>
              </p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="路段" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.startEndName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="速度" prop="speed"></el-table-column>
        <el-table-column label="拥堵情况">
          <template slot-scope="scope">
            <span
              style="color:rgba(255, 0, 0, 1)"
              v-if="scope.row.index > 0 && scope.row.index < 2"
            >畅通</span>
            <span
              style="color:rgba(255, 0, 0, 1)"
              v-if="scope.row.index > 2 &&  scope.row.index < 4"
            >基本畅通</span>
            <span
              style="color:rgba(255, 0, 0, 1)"
              v-if="scope.row.index > 4 &&  scope.row.index < 6"
            >轻度拥堵</span>
            <span
              style="color:rgba(255, 0, 0, 1)"
              v-if="scope.row.index > 6 &&  scope.row.index < 8"
            >中度拥堵</span>
            <span
              style="color:rgba(255, 0, 0, 1)"
              v-if="scope.row.index > 8 &&  scope.row.index < 11"
            >严重拥堵</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- </StaticTableScrollContainer> -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "",
  mounted() {
    this.roadTrafficIndexTop10();
  },
  filters: {
    direction(val) {
      const type = {
        "1": "上行",
        "2": "下行",
        "3": "双向",
        "11": "南北",
        "12": "东西",
        "13": "顺时针",
        "21": "北南",
        "22": "西东",
        "23": "逆时针"
      };
      return type[val];
    }
  },
  methods: {
    roadTrafficIndexTop10(content) {
      this.$http
        .$get("lkfx_trafficIndexHandler/roadTrafficIndexTop10", {
          roadType: content || 1
        })
        .then(res => {
          this.tableData = res;
        });
    },
    activeTag(content) {
      this.roadTrafficIndexTop10(content.code);
    }
  },
  data() {
    return {
      tableData: [],
      content: [
        { uid: _.uniqueId("tags"), tag: "全路网", code: 1 },
        { uid: _.uniqueId("tags"), tag: "主干道", code: 2 },
        { uid: _.uniqueId("tags"), tag: "绕城高速", code: 3 }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.trafficJam-container {
  width: 100%;
  // height: 100%;
  .header {
    overflow: hidden;
  }
  .trafficJam-content {
    // height: 500px;
    position: relative;
    margin-top: 10px;
  }
}
.expand-ele p {
  margin: 10px;
}
</style>