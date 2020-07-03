<template>
  <div class="RidingPoint-wrapper nomap-content-container">
    <basemap />
    <div class="panel-wrapper left">
      <div class="cxkl-container">
        <PanelItem title="骑行始终点分析" :displaySwitch="false">
          <div class="cxkl-wrapper">
            <SearchPanel
              :searchConfig="searchConfig"
              @getSearchValue="getSearchValue"
              @handleQuery="handleQuery"
              direction="column"
            ></SearchPanel>
          </div>
        </PanelItem>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    // this.$http.$get("/gxdc_bikeServiceAnalysisHandler/getStartEndPoint?date=2019-12-18&hour=16~20").then((data) => {
    //     console.log(data);
    // });
    this.getSearchValue();
  },
  methods: {
    getSearchValue(val) {
      tmap.removeLayer();

      let date = val.date;
      let type = val.type;
      let hour = val.hour.split("-");
      let url =
        "startTime=" +
        date +
        " " +
        hour[0] +
        ":00:00" +
        "&endTime=" +
        date +
        " " +
        hour[1] +
        ":00:00&type=" +
        type;
      tmap.addLayer("HEATMAP_SHAREBIKE").loadData(url);
    },
    getMap(url) {
      let date = "2019-12-18",
        hour = "16~20";
      tmap.addLayer("HEATMAP_SHAREBIKE").loadData(url);
    }
  },
  data() {
    return {
      searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 306,
            type: "select",
            label: "骑行始终点",
            placeholder: "骑行始终点",
            VModelvalue: {
              name: "type",
              defaultValue: "1"
            },
            options: [
              {
                value: "1",
                label: "骑行起点"
              },
              {
                value: "2",
                label: "骑行终点"
              }
            ]
          },
          {
            order: 14,
            type: "date",
            formate: "yyyy-MM-dd",
            label: "日期",
            VModelvalue: {
              name: "date",
              defaultValue: "2020-04-13"
            }
          },
          {
            order: 306,
            type: "select",
            label: "时段",
            placeholder: "时段",
            VModelvalue: {
              name: "hour",
              defaultValue: "01-07"
            },
            options: [
              // {
              //   value: "1",
              //   label: "全部"
              // },
              {
                value: "01-07",
                label: "0-7"
              },
              {
                value: "07-09",
                label: "7-9"
              },
              {
                value: "09-10",
                label: "9-10"
              },
              {
                value: "10-12",
                label: "10-12"
              },
              {
                value: "12-14",
                label: "12-14"
              },
              {
                value: "14-17",
                label: "14-17"
              },
              {
                value: "17-19",
                label: "17-19"
              },
              {
                value: "19-21",
                label: "19-21"
              },
              {
                value: "21-23",
                label: "21-23"
              }
            ]
          }
        ]
        // searchButtonGroup: [
        //   {
        //     action: "query",
        //     label: "查询"
        //   },
        //   {
        //     action: "export",
        //     label: "导出"
        //   }
        // ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.RidingPoint-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .panel-wrapper {
    height: 100%;
    // padding: 10px 0;
    position: absolute;
    top: 0;
    width: 410px;
    // border: 1px solid red;
  }
  .left {
    left: 0;
  }
  .cxkl-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .bj {
      margin: 20px 0;
    }
  }
}
</style>