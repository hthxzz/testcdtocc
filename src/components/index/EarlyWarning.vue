<template>
  <div class="cntainer">
    <div class="earlyWarning">
        <v-chart :options="polar"/>
    </div>
        
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
        polar:{
      radar: [
        {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "rgba(32, 86, 221, 1)",
              borderRadius: 3,
              padding: [1, 1]
            }
          },
          indicator: [
            { text: "恶劣天气", max: 150 },
            { text: "出租汽车异常", max: 150 },
            { text: "公共交通大客流", max: 150 },
            { text: "重点车辆", max: 120 },
            { text: "航班延误", max: 108 },
            { text: "道路拥堵", max: 72 }
          ],
          center: ["50%", "50%"],
          radius: "60%",
          splitArea: {
            areaStyle: {
              color: "rgba(32,86,221,.4)"
            }
          }
        }
      ],
      series: [
        {
          name: "成绩单",
          type: "radar",
          data: [
            {
              value: [90, 113, 100, 30, 70, 60],
              areaStyle: {
                normal: {
                  opacity: 0.9,
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    {
                      color: "#2056DD",
                      offset: 0
                    },
                    {
                      color: "#2056DD",
                      offset: 1
                    }
                  ])
                }
              }
            }
          ]
        }
      ]
    }
    };
  },
  mounted() {
    // var myChart = echarts.init(document.querySelector(".earlyWarning"));
    // var option = 

    // myChart.setOption(option);
  }
};
</script>

<style lang="scss" scoped>
.cntainer {
  width: 100%;
  height: 100%;
  .earlyWarning {
    width: 100%;
    height: 100%;
  }
      .echarts{
        min-height: 161px;
        width: 100%;
        height: 100%;
    }
}
</style>