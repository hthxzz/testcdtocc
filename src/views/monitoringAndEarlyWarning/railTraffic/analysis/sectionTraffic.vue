<template>
  <div class="content-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title :displaySwitch="false">
            <railSearch @getSearchVal="globleSearch" />
          </PanelItem>
          <PanelItem :title="titleTime+'断面客流分布分析'" :displaySwitch="false">
            <div class="search">
              <ChangeTag :itemList="itemList" @getStatues="getStatues" />
            </div>
            <TableAndPagination :showPagination="showPagination" :showSearchPanel="false">
              <el-table
                      style="width: 100%;height:260px;overflow-y: auto"
                      :height="tableHeight"
                      :data="tableData"
                      stripe
                      ref="table"
              >
                <!-- <el-table-column type="index" width="50"></el-table-column> -->
                <el-table-column label="起点" prop="inStationName"></el-table-column>
                <el-table-column label="终点" prop="outStationName"></el-table-column>
                <el-table-column label="客流量" prop="passengerNum"></el-table-column>
              </el-table>
            </TableAndPagination>
          </PanelItem>
        </panel>
      </template>
      <template #midContent>
        <div class="testmap">
          <railTrafficMap />
        </div>
      </template>

<!--      <template #rightPanel>-->
<!--        <panel>-->
<!--          <PanelItem title="2019年成都东客站-犀浦日均小时客流变化情况" :displaySwitch="false">-->
<!--            <div class="echar-wrap">-->
<!--              <v-chart :options="option2" />-->
<!--            </div>-->
<!--          </PanelItem>-->
<!--          <PanelItem title="成都东客站站点客流OD分析" :displaySwitch="false">-->
<!--            <div class="echar-wrap">-->
<!--              <v-chart :options="option2" />-->
<!--            </div>-->
<!--          </PanelItem>-->
<!--        </panel>-->
<!--      </template>-->
    </BaseLayoutContent>
  </div>
</template>

<script>
  import tableMixins from "@/components/common/tableAndPagination/tableMixins";
  import railSearch from "./components/railSearch.vue";
  import railTrafficMap from "./components/railTrafficMap.vue";
  export default {
    name: "",
    components: {
      railSearch,
      railTrafficMap
    },
    mixins: [tableMixins],
    methods: {
      globleSearch(val) {
        this.frequency=val.frequency;// 频率
        this.staticDate=val.staticDate;//统计时间
        this.isWorkDay=val.isWorkDay;//是否工作日
        this.lineCode=val.lineCode;//线路编码
        if(val.frequency=="年"){
          this.titleTime=val.staticDate+'年';
        }else if(val.frequency=="月"){
          let times=val.staticDate.split("-");
          this.titleTime=times[0]+'年'+Number(times[1].toString())+'月';
        }
        this.getStationPassengerVolumeRank(val);
      },
      getStatues(val) {
        this.dimension=val.code;
        this.getStationPassengerVolumeRank();
        // this.getStationPassengerVolumeRank();
      },
      getStationPassengerVolumeRank() {
        this.$http
                .$get("gdjc_staticAnalysisHandler/getSectionPassengerVolumeData", {
                  frequency:this.frequency,// 频率
                  staticDate:this.staticDate,//统计时间
                  isWorkDay:this.isWorkDay,//是否工作日
                  lineCode:this.lineCode,
                  dimension:this.dimension
                })
                .then(res => {
                  this.tableData=res;
                });
      },
      init() {
        tmap.setMapZoomLevel(13);
      },
    },
    mounted() {
      // this.test();
      this.init();
      this.getStationPassengerVolumeRank();
    },
    data() {
      return {
        frequency:'年',// 频率
        staticDate:this.$utils.dayjs().format("YYYY"),//统计时间
        isWorkDay:'工作日',//是否工作日
        lineCode:'',//线路编码
        dimension:'平峰',//时间维度
        titleTime:this.$utils.dayjs().format("YYYY")+'年',//标题时间
        option2: {},
        tableData: [
        ],
        showPagination: false,
        itemList: [
          // { code: "总量", value: "总量" },
          { code: "平峰", value: "平峰" },
          { code: "早高峰", value: "早高峰" },
          { code: "晚高峰", value: "晚高峰" }
        ]
      };
    },
    destroyed() {
      tmap.removeChart('stationName');
    }
  };
</script>

<style lang="scss" scoped>
  .search {
    text-align: right;
  }
  .testmap {
    height: 100%;
  }
  .echar-wrap {
    width: 100%;
    height: 256px;
    overflow: hidden;
  }
  .echars {
    width: 100%;
    height: 100%;
  }
</style>