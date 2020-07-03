<template>
  <div class="road-condition-setting">
    <SearchPanel
      :direction="direction"
      :searchConfig="searchConfig"
      @getSearchValue="getSearchValue"
    />
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.allRoadName();
  },
  methods: {
    getSearchValue(val) {
      debugger;
      this.$http
        .$get("lkfx_lukforecastHandler/roadForecastLukByTime", val)
        .then(res => {
          const options = [];
          for (const item of res) {
            options.push({
              label: item.NAME,
              value: item.NAME
            });
          }
          this.searchConfig.searchCondition[0].options = options;
        });
    },
    allRoadName() {
      this.$http.$get("lkfx_lukforecastHandler/allRoadName").then(res => {
        const options = [];
        for (const item of res) {
          options.push({
            label: item.NAME,
            value: item.NAME
          });
        }
        this.searchConfig.searchCondition[0].options = options;
      });
    }
  },
  data() {
    return {
      direction: "column",
      searchConfig: {
        isKeyV: true,
        // delaySeach: true,
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ],
        searchCondition: [
          {
            order: 222,
            type: "select",
            label: "预测道路",
            placeholder: "",
            VModelvalue: {
              name: "roadName",
              defaultValue: ""
            },
            options: []
          },
          {
            order: 3,
            type: "datetime",

            formate: "yyyy-MM-dd HH:mm:ss",
            label: "预测时刻",
            VModelvalue: {
              name: "forecastTime",
              defaultValue: ""
            }
          },
          //   {
          //     order: 2,
          //     type: "select",
          //     label: "时间间隔",
          //     placeholder: "",
          //     VModelvalue: {
          //       name: "timeType",
          //       defaultValue: "半小时"
          //     },
          //     options: [
          //       {
          //         value: "选项1",
          //         label: "半小时"
          //       },
          //       {
          //         value: "选项2",
          //         label: "一小时"
          //       },
          //       {
          //         value: "选项3",
          //         label: "二小时"
          //       }
          //     ]
          //   },
          //   {
          //     order: 36,
          //     type: "radio",
          //     label: "路线类型",
          //     VModelvalue: {
          //       name: "date1",
          //       defaultValue: "2"
          //     },
          //     radioList: [
          //       {
          //         value: "1",
          //         label: "高速公路"
          //       },
          //       {
          //         value: "2",
          //         label: "国省干道"
          //       }
          //     ]
          //   },

          {
            order: 36,
            type: "radio",
            label: "道路方向",
            VModelvalue: {
              name: "roadDir",
              defaultValue: "2"
            },
            radioList: [
              {
                value: "1",
                label: "上行"
              },
              {
                value: "2",
                label: "下行"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>