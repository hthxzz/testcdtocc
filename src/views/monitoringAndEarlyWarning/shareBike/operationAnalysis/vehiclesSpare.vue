<template>
  <div class="vehiclesSpare-wrapper nomap-content-container">
    <section class="search-wrapper">
      <SearchPanel :searchConfig="searchConfig"></SearchPanel>
    </section>
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <div class="item">
        <ul>
          <li>违停次数</li>
          <li>1234</li>
        </ul>
      </div>
      <div class="item">
        <div class="echar-pie" style="height: 300px">
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
        <TableAndPagination :showSearchPanel="false">
          <el-table
            style="width: 100%;height:100%;overflow-y: auto"
            :height="tableHeight"
            :data="tableData"
            stripe
            ref="table"
          >
            <el-table-column label="序号" prop="1"></el-table-column>
            <el-table-column label="地区" prop="2"></el-table-column>
            <el-table-column label="日期范围" prop="4"></el-table-column>
            <el-table-column label="违停次数" prop="5"></el-table-column>
            <el-table-column label="月环比" prop="6"></el-table-column>
          </el-table>
        </TableAndPagination>
      </div>
    </section>
    <DetailForm></DetailForm>
  </div>
</template>

<script>
import { option3, option2 } from "./options";
export default {
  name: "",
  methods: {
    changeEchar(e) {
      console.log(e);
      let content = e.srcElement.textContent;
      if (content == "趋势图") {
        this.option = option3;
      } else if (content == "对比图") {
        this.option = option2;
      }
    }
  },
  data() {
    return {
      option: option2,
      searchConfig: {
        searchCondition: [
          {
            order: 3,
            type: "select",
            label: "地区",
            filterable: true,
            placeholder: "",
            VModelvalue: {
              name: "qy",
              defaultValue: ""
            },
            options: [
              {
                value: "1",
                label: "成都市"
              },
              {
                value: "2",
                label: "武侯区"
              }
            ]
          },
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
          },
          {
            order: 29,
            type: "select",
            label: "频次",
            placeholder: "",
            VModelvalue: {
              name: "pc",
              defaultValue: ""
            },
            options: [
              {
                value: "1",
                label: "年"
              },
              {
                value: "2",
                label: "月"
              },
              {
                value: "3",
                label: "日"
              }
            ]
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
.vehiclesSpare-wrapper {
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