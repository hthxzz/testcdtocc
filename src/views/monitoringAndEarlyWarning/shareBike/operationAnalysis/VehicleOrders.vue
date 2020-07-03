<template>
  <div class="VehicleOrders-wrapper nomap-content-container">
    <section class="search-wrapper">
      <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"></SearchPanel>
    </section>
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <div class="item">
        <ul>
          <li>总订单</li>
          <li>{{ orderSum }}</li>
        </ul>
      </div>
      <div class="item">
        <div class="echar-pie" style="height: 300px">
          <v-chart :options="option" />
        </div>
        <!--<div class="btn-wrappper" @click="changeEchar">-->
        <!--<span>趋势图</span>-->
        <!--<span>对比图</span>-->
        <!--</div>-->
      </div>
    </section>
    <section class="table-wrapper">
      <div class="item">
        <TableAndPagination
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
            <el-table-column label="日期范围" prop="dateRange"></el-table-column>
            <el-table-column label="青桔单车" :formatter="orderFormat1"></el-table-column>
            <el-table-column label="哈啰单车" :formatter="orderFormat2"></el-table-column>
            <el-table-column label="摩拜单车" :formatter="orderFormat6"></el-table-column>
            <el-table-column label="ofo小黄车" :formatter="orderFormat5"></el-table-column>
            <el-table-column label="一步单车" :formatter="orderFormat4"></el-table-column>
            <el-table-column label="赳赳单车" :formatter="orderFormat3"></el-table-column>
          </el-table>
        </TableAndPagination>
      </div>
    </section>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";

export default {
  name: "",
  mixins: [tableMixins],
  mounted() {
    // 获取企业列表
    // this.$http.$get("/gxdc_bikeOperationQueryHandler/getEnterpriseNameList").then(data =>{
    //     this.searchConfig.searchCondition[2].options.push({
    //         "label":"全部",
    //         "value":'',
    //     });
    //     for (const item of data) {
    //         this.searchConfig.searchCondition[2].options.push({
    //             "label":item.enterpriseAbbr,
    //             "value":item.enterpriseAbbr,
    //         });
    //     }
    // })
  },
  methods: {
    getSearchValue(val) {
      if (val.length === 0) {
        // 默认显示图表
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
        this.$http
          .$post("/gxdc_bikeOperationQueryHandler/getUpOrderInfo", search)
          .then(data => {
            if (this.showPagination) {
              this.tableData = data.results;
              this.total = data.totalRecordNum;
            } else {
              this.tableData = data;
            }
            let xAxisData = [],
              seriesData = [],
              legendData = [
                "青桔单车",
                "哈啰单车",
                "摩拜单车",
                "ofo小黄车",
                "一步单车",
                "赳赳单车"
              ],
              ydata1 = [],
              ydata2 = [],
              ydata3 = [],
              ydata4 = [],
              ydata5 = [],
              ydata6 = [];
            for (const item of data.results) {
              xAxisData.push(item.dateRange);
              ydata1.push(item.qingju == null ? 0 : item.qingju);
              ydata2.push(item.halo == null ? 0 : item.halo);
              ydata3.push(item.mobai == null ? 0 : item.mobai);
              ydata4.push(item.ofo == null ? 0 : item.ofo);
              ydata5.push(item.yibu == null ? 0 : item.yibu);
              ydata6.push(item.jiujiu == null ? 0 : item.jiujiu);
              this.orderSum = item.total;
            }
            seriesData.push(ydata1);
            seriesData.push(ydata2);
            seriesData.push(ydata3);
            seriesData.push(ydata4);
            seriesData.push(ydata5);
            seriesData.push(ydata6);
            let option = this.$utils.echart.getLineOption(
              {
                xAxisData: xAxisData,
                legendData: legendData,
                seriesData: seriesData
              },
              {
                grid: {
                  left: 90
                }
              }
            );
            this.option = option;
          });
        this.getSearchTableValue(val);
      }

      // 获取参数
      let flag = val[1] == undefined ? "" : val[1].queryValue.split("|");

      if (val[0].columnName == "cycleType" && val[0].queryValue == "year") {
        // linkDateRang
        this.searchConfig.searchCondition[1].type = "monthrange";
        this.searchConfig.searchCondition[1].formate = "yyyy";
        // 请求图表接口
        if (flag[0] != "undefined") {
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
          this.$http
            .$post("/gxdc_bikeOperationQueryHandler/getUpOrderInfo", search)
            .then(data => {
              if (this.showPagination) {
                this.tableData = data.results;
                this.total = data.totalRecordNum;
              } else {
                this.tableData = data;
              }
              let xAxisData = [],
                seriesData = [],
                legendData = [
                  "青桔单车",
                  "哈啰单车",
                  "摩拜单车",
                  "ofo小黄车",
                  "一步单车",
                  "赳赳单车"
                ],
                ydata1 = [],
                ydata2 = [],
                ydata3 = [],
                ydata4 = [],
                ydata5 = [],
                ydata6 = [];
              for (const item of data.results) {
                xAxisData.push(item.dateRange);
                ydata1.push(item.qingju == null ? 0 : item.qingju);
                ydata2.push(item.halo == null ? 0 : item.halo);
                ydata3.push(item.mobai == null ? 0 : item.mobai);
                ydata4.push(item.ofo == null ? 0 : item.ofo);
                ydata5.push(item.yibu == null ? 0 : item.yibu);
                ydata6.push(item.jiujiu == null ? 0 : item.jiujiu);
                this.orderSum = item.total;
              }
              seriesData.push(ydata1);
              seriesData.push(ydata2);
              seriesData.push(ydata3);
              seriesData.push(ydata4);
              seriesData.push(ydata5);
              seriesData.push(ydata6);
              let option = this.$utils.echart.getLineOption(
                {
                  xAxisData: xAxisData,
                  legendData: legendData,
                  seriesData: seriesData
                },
                {
                  grid: {
                    left: 280
                  }
                }
              );
              this.option = option;
            });
          this.getSearchTableValue(val);
        }
      }
      if (val[0].columnName == "cycleType" && val[0].queryValue == "month") {
        this.searchConfig.searchCondition[1].type = "monthrange";
        this.searchConfig.searchCondition[1].formate = "yyyy-MM";
        // 请求图表接口
        if (flag[0] != "undefined") {
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
          this.$http
            .$post("/gxdc_bikeOperationQueryHandler/getUpOrderInfo", search)
            .then(data => {
              if (this.showPagination) {
                this.tableData = data.results;
                this.total = data.totalRecordNum;
              } else {
                this.tableData = data;
              }
              let xAxisData = [],
                seriesData = [],
                legendData = [
                  "青桔单车",
                  "哈啰单车",
                  "摩拜单车",
                  "ofo小黄车",
                  "一步单车",
                  "赳赳单车"
                ],
                ydata1 = [],
                ydata2 = [],
                ydata3 = [],
                ydata4 = [],
                ydata5 = [],
                ydata6 = [];
              for (const item of data.results) {
                xAxisData.push(item.dateRange);
                ydata1.push(item.qingju == null ? 0 : item.qingju);
                ydata2.push(item.halo == null ? 0 : item.halo);
                ydata3.push(item.mobai == null ? 0 : item.mobai);
                ydata4.push(item.ofo == null ? 0 : item.ofo);
                ydata5.push(item.yibu == null ? 0 : item.yibu);
                ydata6.push(item.jiujiu == null ? 0 : item.jiujiu);
                this.orderSum = item.total;
              }
              seriesData.push(ydata1);
              seriesData.push(ydata2);
              seriesData.push(ydata3);
              seriesData.push(ydata4);
              seriesData.push(ydata5);
              seriesData.push(ydata6);
              let option = this.$utils.echart.getLineOption({
                xAxisData: xAxisData,
                legendData: legendData,
                seriesData: seriesData
              });
              this.option = option;
            });
          this.getSearchTableValue(val);
        }
      }
      if (val[0].columnName == "cycleType" && val[0].queryValue == "day") {
        this.searchConfig.searchCondition[1].type = "daterange";
        this.searchConfig.searchCondition[1].formate = "yyyy-MM-dd";
        // 请求图表接口
        if (flag[0] != "undefined") {
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
          this.$http
            .$post("/gxdc_bikeOperationQueryHandler/getUpOrderInfo", search)
            .then(data => {
              if (this.showPagination) {
                this.tableData = data.results;
                this.total = data.totalRecordNum;
              } else {
                this.tableData = data;
              }
              let xAxisData = [],
                seriesData = [],
                legendData = [
                  "青桔单车",
                  "哈啰单车",
                  "摩拜单车",
                  "ofo小黄车",
                  "一步单车",
                  "赳赳单车"
                ],
                ydata1 = [],
                ydata2 = [],
                ydata3 = [],
                ydata4 = [],
                ydata5 = [],
                ydata6 = [];
              for (const item of data.results) {
                xAxisData.push(item.dateRange);
                ydata1.push(item.qingju == null ? 0 : item.qingju);
                ydata2.push(item.halo == null ? 0 : item.halo);
                ydata3.push(item.mobai == null ? 0 : item.mobai);
                ydata4.push(item.ofo == null ? 0 : item.ofo);
                ydata5.push(item.yibu == null ? 0 : item.yibu);
                ydata6.push(item.jiujiu == null ? 0 : item.jiujiu);
                this.orderSum = item.total;
              }
              seriesData.push(ydata1);
              seriesData.push(ydata2);
              seriesData.push(ydata3);
              seriesData.push(ydata4);
              seriesData.push(ydata5);
              seriesData.push(ydata6);
              let option = this.$utils.echart.getLineOption(
                {
                  xAxisData: xAxisData,
                  legendData: legendData,
                  seriesData: seriesData
                },
                {
                  grid: {
                    left: 280
                  }
                }
              );
              this.option = option;
              console.log(option);
            });
          this.getSearchTableValue(val);
        }
      }
    },
    orderFormat1(row) {
      return row.qingju == null ? 0 : row.qingju;
    },
    orderFormat2(row) {
      return row.halo == null ? 0 : row.halo;
    },
    orderFormat3(row) {
      return row.jiujiu == null ? 0 : row.jiujiu;
    },
    orderFormat4(row) {
      return row.yibu == null ? 0 : row.yibu;
    },
    orderFormat5(row) {
      return row.ofo == null ? 0 : row.ofo;
    },
    orderFormat6(row) {
      return row.mobai == null ? 0 : row.mobai;
    },
    // changeEchar(e) {
    //     let content = e.srcElement.textContent;
    //     if (content == "趋势图") {
    //         this.option = {};
    //     } else if (content == "对比图") {
    //         this.option = {};
    //     }
    // },
    // 获取当年
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year;
      return currentdate;
    }
  },
  data() {
    return {
      url: "/gxdc_bikeOperationQueryHandler/getOrderInfoDown",
      orderSum: "--",
      option: {},
      searchConfig: {
        searchCondition: [
          {
            order: 29,
            type: "select",
            label: "频次",
            placeholder: "",
            VModelvalue: {
              name: "cycleType",
              defaultValue: ""
            },
            options: [
              {
                value: "year",
                label: "年"
              },
              {
                value: "month",
                label: "月"
              },
              {
                value: "day",
                label: "日"
              }
            ]
          },
          {
            order: 14,
            type: "daterange",
            formate: "yyyy-MM-dd",
            label: "时间区间",
            dataType: "String",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "statisticsDate",
              defaultValue: ""
            }
          }
          // {
          //     order: 28,
          //     type: "select",
          //     label: "企业",
          //     placeholder: "",
          //     VModelvalue: {
          //         name: "enterprise",
          //         defaultValue: ""
          //     },
          //     options: []
          // },
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
.VehicleOrders-wrapper {
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
  .search {
    margin-top: 1px;
  }
}
</style>