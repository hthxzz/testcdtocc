<template>
  <div class="OperationVehicle-wrapper nomap-content-container">
    <section class="search-wrapper" style="height: 50px;">
      <SearchPanel :searchConfig="searchConfig"></SearchPanel>
    </section>
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <div class="item">
        <ul>
          <li>车俩总数</li>
          <li>123456</li>
        </ul>
      </div>
      <div class="item" style="height: 300px">
        <div class="echar-pie">
          <v-chart :options="option" />
        </div>
        <div class="btn-wrappper" @click="changeEchar">
          <span>趋势图</span>
          <span>对比图</span>
        </div>
      </div>
    </section>
    <section class="table-wrapper">
      <div class="item"></div>
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
            <el-table-column label="日期" prop="date" :formatter="formate"></el-table-column>
            <el-table-column label="正常车辆" prop="parkNum"></el-table-column>
            <el-table-column label="报废车辆" prop="scrapNum" :formatter="carFormate"></el-table-column>
            <el-table-column label="维修车辆(次)" prop="repairNum"></el-table-column>
          </el-table>
        </TableAndPagination>
      </div>
    </section>
    <DetailForm></DetailForm>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { option5, option6 } from "./options";
export default {
  name: "",
  mixins: [tableMixins],
  methods: {
    changeEchar(e) {
      console.log(e);
      let content = e.srcElement.textContent;
      if (content == "趋势图") {
        this.option = option6;
      } else if (content == "对比图") {
        this.option = option5;
      }
    },
    formate(row, column, cellValue) {
      return (
        cellValue && this.$utils.dayjs(parseInt(cellValue)).format("YYYY-MM-DD")
      );
    },
    carFormate(row) {
      return row.bikeTypeCode === 2 ? "维修" : "--";
    }
  },
  data() {
    return {
      url: "/gxdc_bikeOperationQueryHandler/getOperatingVehicleStatisticsInfo",
      option: option5,
      searchConfig: {
        searchCondition: [
          {
            order: 36,
            type: "select",
            label: "企业",
            placeholder: "",
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
              }
            ]
          },
          {
            order: 14,
            type: "datetimerange",
            formate: "yyyy-MM-dd HH:mm:ss",
            label: "时间区间",
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
.OperationVehicle-wrapper {
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
        border-radius: 4px;
        li:nth-child(1) {
          width: 140px;
          border-radius: 4px;
          height: 66px;
          letter-spacing: 1px;
          color: #00ffff;
          font-weight: bolder;
          font-size: 24px;
          line-height: 66px;
          background: rgba(32, 86, 221, 1);
        }
        li:nth-child(2) {
          background: rgba(5, 14, 40, 0.4);
          border-radius: 4px;
          width: 140px;
          height: 50px;
          font-weight: bold;
          line-height: 51px;
          font-size: 14px;
          color: #ffffff;
          // margin: 20px 0;
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