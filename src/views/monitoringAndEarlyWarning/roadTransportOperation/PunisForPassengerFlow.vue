<template>
  <div class="content-container nomap-content-container">
    <!-- <h2>客流趋势分析</h2> -->
    <!-- 搜索开始 -->
    <ChartAndTable :chartAndTable="chartAndTable"></ChartAndTable>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 配置项
      chartAndTable: {
        searchConfig: {
          searchCondition: [
            {
              order: 36,
              type: "input",
              label: "经营企业",
              placeholder: "经营企业",
              VModelvalue: {
                name: "jyqy",
                defaultValue: ""
              }
            },
            {
              order: 306,
              type: "select",
              label: "频次",
              placeholder: "频次",
              VModelvalue: {
                name: "pc",
                defaultValue: ""
              },
              options: [
                {
                  value: "1",
                  label: "小时"
                },
                {
                  value: "2",
                  label: "日"
                },
                {
                  value: "3",
                  label: "月"
                },
                {
                  value: "4",
                  label: "年"
                }
              ]
            },
            {
              order: 14,
              otype: "week",
              type: "daterange",
              formate: "yyyy-MM-dd",
              label: "时间区间",
              placeholderStart: "开始时间",
              placeholderEnd: "截止时间",
              VModelvalue: {
                name: "date1",
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
        },
        // 中间部分图表配置
        charConfig: {
          ub: "处罚次数",
          url: "",
          echarConfig: [
            {
              url: ""
            }
          ]
        },
        //
        tableConfig: {
          labelA: "",
          labelB: "",
          tableA: {
            url: "/kyjc_transportStatistic/getComplaintStat",
            colconfig: [
              {
                label: "时间",
                name: "statisticsTime"
              },
              {
                label: "经营企业",
                name: "companyName"
              },
              {
                label: "行政处罚次数",
                name: "complaintCount"
              },
              {
                label: "环比",
                name: "growthRate"
                // formate:true,
              },
              {
                label: "同比",
                name: "yearonyearRate"
                // formate:true,
              }
            ]
          }
          //   tableB: {
          //     url:"/kyjc_transportStatistic/getCapacityStat",
          //     colconfig: [
          //       {
          //         label: "时间",
          //         name: "statisticsTime"
          //       },
          //       {
          //         label: "线路",
          //         name: "lineName"
          //       },
          //       {
          //         label: "运力",
          //         name: "prevCapacityAble"
          //       },
          //       {
          //         label: "环比",
          //         name: "capacityAbleLastRate",
          //         // formate:true,
          //       },
          //       {
          //         label: "同比",
          //         name: "capacityAblePrevRate",
          //         // formate:true,
          //       }
          //     ]
          //   }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.PassengerFlowTrend-wrapper {
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
        // span{
        //     display: inline-block;
        //     cursor: pointer;
        //     padding: 6px;
        //     border-radius: 10px;
        //     font-size: 14px;
        //     &:first-child{
        //         background-color: #fff;
        //         border: 1px solid #fff;
        //         color: #2056dd;
        //     }
        //     &:last-child{
        //         background-color: aqua;
        //         margin-left: 20px;
        //          background-color: #2056dd;
        //         border: 1px solid #2056dd;
        //         color: #fff;
        //     }
        // }
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