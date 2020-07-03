<template>
  <div class="TrafficAccident-wrapper nomap-content-container">
    <!-- <h2>交通事故分析</h2> -->
    <section class="search-wrapper">
      <SearchPanel :searchConfig="searchConfig"></SearchPanel>
    </section>
    <section class="content-wrapper item">
      <div class="echar-wrapper">
        <v-chart :options="option2" />
      </div>
      <div class="echar-wrapper">
        <v-chart :options="option" />
      </div>
    </section>
    <section class="content-wrapper item">
      <div class="echar-wrapper">
        <v-chart :options="option" />
      </div>
      <div class="echar-wrapper">
        <v-chart :options="option2" />
      </div>
    </section>
    <section class="content-wrapper">
      <StaticTableScrollContainer>
        <el-table :data="statictableData" style="width: 100%" stripe fit="true">
          <el-table-column label="时间" prop="time"></el-table-column>
          <el-table-column label="百公里事故数" prop="hNumber"></el-table-column>
          <el-table-column label="年事故数" prop="yearNumber">
            <!-- <template slot-scope="scope">
                        <span
                        style="color:rgba(255, 0, 0, 1)"
                        v-if="scope.row.changeRate > 2"
                        >{{ scope.row.changeRate }}</span>
                        <span
                        style="color:rgba(255, 192, 0, 1)"
                        v-if="scope.row.changeRate <2"
                        >{{ scope.row.changeRate }}</span>
                
            </template>-->
          </el-table-column>
          <el-table-column label="行车事故伤人数" prop="heatNumeber"></el-table-column>
          <el-table-column label="行车事故死亡数" prop="dieNumber"></el-table-column>
        </el-table>
      </StaticTableScrollContainer>
    </section>
  </div>
</template>

<script>
import { option3, option2 } from "./components/options";
export default {
  name: "",
  data() {
    return {
      option: option3,
      option2: option2,
      statictableData: [
        ...new Array(9).fill({
          time: "2010",
          hNumber: "100",
          yearNumber: "200",
          heatNumeber: "300",
          dieNumber: "400"
        })
      ],
      searchConfig: {
        searchCondition: [
          {
            order: 36,
            type: "select",
            label: "",
            placeholder: "经营企业",
            VModelvalue: {
              name: "jyqy",
              defaultValue: ""
            },
            options: [
              {
                value: "1",
                label: "全部"
              },
              {
                value: "2",
                label: "A公司"
              },
              {
                value: "3",
                label: "B公司"
              }
            ]
          },
          {
            order: 14,
            type: "date",
            formate: "yyyy-MM-dd HH:mm:ss",
            label: "",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "date1",
              defaultValue: "2"
            }
          }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.TrafficAccident-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-wrapper {
    flex-basis: 36px;
  }
  .item {
    display: flex;

    .echar-wrapper {
      flex: 1;
    }
  }
  .content-wrapper {
    flex: 1;
    &:nth-child(3) {
      margin: 10px 0;
    }
  }
}
</style>
