<template>
  <div class="RidingDistance-wrapper nomap-content-container">
    <section class="search-wrapper">
      <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"></SearchPanel>
    </section>
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <div class="item">
        <div class="echar-pie" style="height: 300px">
          <v-chart :options="option" />
        </div>
      </div>
    </section>
    <section class="table-wrapper">
      <div class="item">
        <TableAndPagination
          :detailFormConfig="detailFormConfig"
          :totalP="total"
          @fetchTableData="fetchTableData"
          @handleDetail="handleDetail"
          @getSearchValue="getSearchValue"
        >
          <el-table
            style="width: 100%;height:100%;overflow-y: auto"
            :height="tableHeight"
            :data="tableData"
            stripe
            ref="table"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="统计日期" prop="time"></el-table-column>
            <el-table-column label="骑行距离" prop="distance"></el-table-column>
            <el-table-column label="百分比" prop="ratio"></el-table-column>
            <el-table-column label="总订单" prop="count"></el-table-column>
            <el-table-column label="工作日订单" prop="workCount" :formatter="workCountFormat"></el-table-column>
            <el-table-column label="节假日订单" prop="restCount" :formatter="restCountFormat"></el-table-column>
          </el-table>
        </TableAndPagination>
      </div>
    </section>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { option2 } from "./options";
export default {
  name: "",
  mixins: [tableMixins],
  mounted() {
    this.getCyclingAndCount();
  },
  methods: {
    formate(row, column, cellValue) {
      return (
        cellValue && this.$utils.dayjs(parseInt(cellValue)).format("YYYY-MM-DD")
      );
    },
    workCountFormat(row) {
      return row.workCount == null ? 0 : row.workCount;
    },
    restCountFormat(row) {
      return row.restCount == null ? 0 : row.restCount;
    },
    getSearchValue(val) {
      this.getSearchTableValue(val);
      let isKeyV = this.searchConfig.isKeyV;
      const search = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      if (isKeyV) {
        Object.assign(search, val);
      } else {
        search.queryFields = JSON.stringify(val);
      }
      this.$http.$post(this.url, search).then(data => {
        if (this.showPagination) {
          this.tableData = data.results;
          this.total = data.totalRecordNum;
        } else {
          this.tableData = data;
        }
        let xAxisData = [],
          seriesData = [],
          legendData = ["工作日", "节假日"],
          ydata = [],
          ydata2 = [];
        for (const item of data.results) {
          xAxisData.push(item.distance);
          ydata.push(item.workCount == null ? 0 : item.workCount);
          ydata2.push(item.restCount == null ? 0 : item.restCount);
        }
        seriesData.push(ydata);
        seriesData.push(ydata2);
        let option = this.$utils.echart.getLineOption({
          xAxisData: xAxisData,
          legendData: legendData,
          seriesData: seriesData
        });
        this.option = option;
      });
    },
    // 骑行距离与次数
    getCyclingAndCount() {
      this.$http
        .$get("/gxdc_bikeServiceAnalysisHandler/analysisOfDistance")
        .then(data => {
          let xAxisData = [],
            seriesData = [],
            legendData = ["工作日", "节假日"],
            ydata = [],
            ydata2 = [];
          for (const item of data.results) {
            xAxisData.push(item.distance);
            ydata.push(item.workCount == null ? 0 : item.workCount);
            ydata2.push(item.restCount == null ? 0 : item.restCount);
          }
          seriesData.push(ydata);
          seriesData.push(ydata2);
          let option = this.$utils.echart.getLineOption({
            xAxisData: xAxisData,
            legendData: legendData,
            seriesData: seriesData
          });
          this.option = option;
        });
    }
  },
  data() {
    return {
      url: "/gxdc_bikeServiceAnalysisHandler/analysisOfDistance",
      option: {},
      searchConfig: {
        searchCondition: [
          {
            order: 14,
            type: "monthrange",
            formate: "yyyy-MM",
            label: "时间区间",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "statisticsDate",
              defaultValue: ""
            }
          }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          },
          {
            action: "export",
            label: "导出"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.RidingDistance-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  section:not(:first-child) {
    flex: 1;
  }
  .search-wrapper {
    flex-basis: 50px;
  }
}
.echar-wrapper {
  display: flex;
  background-image: linear-gradient(to right, rgba(32, 86, 221, 0.4), #0a1e53);
  .item {
    &:first-child {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        text-align: center;
        li:nth-child(1) {
          font-size: 26px;
          color: red;
        }
        li:nth-child(2) {
          font-size: 26px;
          color: red;
          margin: 20px 0;
        }
        li:nth-child(3) {
          font-size: 22px;
          color: yellow;
        }
      }
    }
    &:last-child {
      flex: 5;
      position: relative;
      .echar-pie {
        width: 100%;
        height: 100%;
      }
      .btn-wrappper {
        position: absolute;
        top: 10px;
        right: 120px;
        span {
          display: inline-block;
          cursor: pointer;
          padding: 6px;
          border-radius: 10px;
          font-size: 14px;
          &:first-child {
            background-color: #fff;
            border: 1px solid #fff;
            color: #2056dd;
          }
          &:last-child {
            background-color: aqua;
            margin-left: 20px;
            background-color: #2056dd;
            border: 1px solid #2056dd;
            color: #fff;
          }
        }
      }
    }
  }
}
.table-wrapper {
  display: flex;
  flex-direction: column;
  .item {
    &:first-child {
      flex-basis: 26px;
      line-height: 26px;
      span {
        display: inline-block;
        cursor: pointer;
        padding: 3px;
        border-radius: 10px;
        font-size: 14px;
        &:first-child {
          background-color: #fff;
          border: 1px solid #fff;
          color: #2056dd;
        }
        &:last-child {
          background-color: aqua;
          margin-left: 20px;
          background-color: #485dcc;
          border: 1px solid #485dcc;
          color: #fff;
        }
      }
    }
    &:last-child {
      flex: 1;
      height: calc(100% - 30px);
    }
  }
}
</style>