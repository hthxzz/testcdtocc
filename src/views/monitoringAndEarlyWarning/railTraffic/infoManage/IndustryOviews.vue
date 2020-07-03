<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="综合监测" :displaySwitch="false">
            <div class="item-content number-wrapper">
              <RollNumber title="总客运量" :value="rollNo"></RollNumber>
            </div>
          </PanelItem>
          <PanelItem title="线网监测" :displaySwitch="false">
            <xwjc />
          </PanelItem>
          <PanelItem title="站点监测" :displaySwitch="false">
            <zdjc />
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
        <div class="line-detail-container">
          <lineDetail />
        </div>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title="客流刷卡类型统计" :displaySwitch="false">
            <klsklxtj />
          </PanelItem>
          <PanelItem title="乘坐车站数分布" :displaySwitch="false">
            <czczsfb />
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
  </div>
</template>

<script>
import xwjc from "./components/xwjc.vue";
import lineDetail from "./components/lineDetail.vue";
import czczsfb from "./components/czczsfb.vue";
import zdjc from "./components/zdjc.vue";
import klsklxtj from "./components/klsklxtj.vue";
export default {
  name: "",
  components: {
    lineDetail,
    czczsfb,
    klsklxtj,
    xwjc,
    zdjc
  },
  mounted() {
    this.getTotalPassengerVolume();
    this.getLonAndLatInfo("市");
    this.init("市");
  },
  methods: {
    init() {
      mapProxy.setMapZoomLevel(9);
    },
    getLonAndLatInfo(type) {
      this.$http
        .$get("/kyjc_indexHandler/getLonAndLatInfo", { type: type })
        .then(res => {
          const pointData = [];
          const switchPoint = [];
          for (const item of res) {
            pointData.push({
              name: item.toName,
              value: item.coords[1].concat(item.value, item.shifts)
            });
            switchPoint.push(item.coords[1]);
          }
          this.switchPoint = switchPoint;
          this.autoSwitchView();
          let option = this.$utils.echart.getMigrationOption(
            {
              seriesData: {
                pointData: pointData
                // linesData: [res]
              }
            },
            {
              // tooltip: {
              //   formatter: function(params, ticket, callback) {
              //     //根据业务自己拓展要显示的内容
              //     if (params.seriesType == "effectScatter") {
              //       var res = "";
              //       var name = params.data.name;
              //       var value = params.data.value[2];
              //       var value2 = params.data.value[3];
              //       res =
              //         "<span style='color:#fff;'>" +
              //         name +
              //         "</span><br/>客流量：" +
              //         value +
              //         "</span><br/>班次数量：" +
              //         value2;
              //       return res;
              //     }
              //   }
              // }
            }
          );
          console.log(option);

          if (type == "市") {
            tmap.addChart("cityLayer", option);
          } else {
            tmap.addChart("provinceLayer", option);
          }
          // resolve(option);
        });
      // });
    },
    autoSwitchView() {
      let i = 0,
        switchPoint = this.switchPoint,
        len = switchPoint.length;
      setInterval(() => {
        if (i == len) {
          i = 0;
        }
        this.switchView(switchPoint[i]);
        i++;
      }, 11000);
    },
    switchView(point) {
      const duration = 6000;
      let view = tmap.omap.getView();
      view.animate({ center: point, duration: duration });
      view.animate(
        {
          zoom: tmap.getMapZoomLevel() - 3,
          duration: duration / 2
        },
        {
          zoom: 12,
          duration: duration / 2
        }
      );
    },
    getTotalPassengerVolume() {
      this.$http
        .$get("gdjc_runMonitorHandler/getTotalPassengerVolume")
        .then(data => {
          this.rollNo = data;
        });
    }
  },
  data() {
    return {
      rollNo: 0,
      content: {
        lineName: "1号线",
        yylc: "23.5公里",
        lczb: "25%",
        xlkl: "256431人次",
        klzb: "29%"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.jyyh,
.realTime {
  width: 100%;
  table {
    width: 100%;
    height: 66px;
    tr {
      th {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: normal;
        vertical-align: middle;
      }
      td {
        text-align: center;
        font-size: 24px;
        color: #00ffff;
        letter-spacing: 2px;
        vertical-align: bottom;
        font-family: "datafont";
        animation: turn 8s ease-in-out infinite;
      }
    }
  }
}
.line-detail-container {
  position: absolute;
  right: 410px;
  top: 10px;
}
</style>