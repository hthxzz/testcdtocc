<template>
  <div class="statistical-analysis-wrap nomap-content-container">
    <panel>
      <div class="statistical-analysis-container">
        <section>
          <panelTitle title="线路客运量" :displaySwitch="false"></panelTitle>
          <div class="search">
            <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValueSelf" @handleQuery="handleQuery"></SearchPanel>
          </div>
          <div class="top">
            <div class="t">
              <div class="left">
                <ul>
                  <li class="item1"><span class="smallPoint"></span><lable>总客运量</lable></li>
                  <li  class="item2">{{totalPassengerVolume>10000?totalPassengerVolume>=100000000?(totalPassengerVolume/100000000).toFixed(2):(totalPassengerVolume/10000).toFixed(2):totalPassengerVolume}}
                    <span class="unit" v-if="totalPassengerVolume>=100000000">亿人次</span>
                    <span class="unit" v-else-if="totalPassengerVolume>=10000&& totalPassengerVolume<100000000">万人次</span>
                    <span class="unit" v-else>人次</span>
                  </li>
                  <li  class="item1"><span class="smallPoint"></span><lable>日均客运量</lable></li>
                  <li  class="item2">{{dayAvgPassengerVolume>10000?(dayAvgPassengerVolume/10000).toFixed(2):dayAvgPassengerVolume}}
                    <span class="unit" v-if="dayAvgPassengerVolume>=10000">万人次/日 同比 </span>
                    <span class="unit" v-else>人次/日 同比 </span>
                    <lable class="up" v-if="dayAvgPassengerVolumeYoy>=0"> +{{dayAvgPassengerVolumeYoy}}% ↑</lable>
                    <lable class="down"v-else> {{dayAvgPassengerVolumeYoy}}% ↓</lable>
                  </li>
                  <li  class="item1"><span class="smallPoint"></span><lable>最高日均客运量</lable></li>
                  <li  class="item2">{{highestPassengerVolume>10000?(highestPassengerVolume/10000).toFixed(2):highestPassengerVolume}}
                    <span class="unit" v-if="highestPassengerVolume>=10000">万人次</span>
                    <span class="unit" v-else>人次</span>
                  <li  class="item1"><span class="smallPoint"></span><lable>最高日均客运量日期</lable></li>
                  <li  class="item2">{{highestPassengerVolumeDate}}</li>
                </ul>
              </div>
              <div class="right">
                <v-chart :options="option1" />
              </div>
            </div>
            <div class="b">
              <TableAndPagination
                      :totalP="total"
                :showSearchPanel="false"
                @fetchTableData="fetchTableData"
              >
                <el-table
                  style="width: 100%;height:100%;overflow-y: auto"
                  :height="tableHeight"
                  :data="tableData"
                  stripe
                  ref="table"
                >
                  <!-- <el-table-column type="index" width="50"></el-table-column> -->
                  <el-table-column label="线路名称" prop="lineName"></el-table-column>
                  <el-table-column label="客运总量(万人次)" prop="totalPassengerVolume":formatter="this.formateTraffic"></el-table-column>
                  <el-table-column label="日均客运量(万人次)" prop="dayAvgPassengerVolume":formatter="this.formateTraffic"></el-table-column>
                  <el-table-column label="日均同比" prop="dayAvgPassengerVolumeYoy" :formatter="this.formateRate"></el-table-column>
                  <el-table-column label="最高日客运量(万人次)" prop="highestPassengerVolume" :formatter="this.formateTraffic"></el-table-column>
                  <el-table-column label="最高客运量日期" prop="highestPassengerVolumeDate" :formatter="this.formateNYR"> </el-table-column>
                  <!-- <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          class="table-detail-btn"
                          @click="handleDetail( scope.row)"
                        >详情</el-button>
                      </template>
                  </el-table-column>-->
                </el-table>
              </TableAndPagination>
            </div>
          </div>
        </section>
        <section>
          <klfd></klfd>
        </section>
      </div>
    </panel>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import klfd from "./lineTrafficShare.vue";
export default {
  name: "",
  mixins: [tableMixins],
  components: {
    klfd
  },
  mounted() {
    // this.setSearchInitValue();
    // this.handleSearch();
    this.handleQuery();
  },
  methods: {
    handleQuery(data){
      if(data==undefined){
        data={};
        data.frequency="年";
        data.staticDate=this.$utils.dayjs().format("YYYY");
      }
      this.$http.$get("gdjc_basicPassengerFlowHandler/getLinePassengerVolumeChart",data).then(res => {
        debugger;
        this.getLinePassengerData(res);
      });
    },
    getSearchValue(val) {
      this.getSearchTableValue(val);
    },
    // handleQuery() {},
    //   设置搜索初始值
    setSearchInitValue() {
      this.value2 = this.$utils.dayjs().format("YYYY");
      this.startTime = this.$utils.dayjs().format("YYYY");
      this.endTime = this.$utils.dayjs().format("YYYY");
    },
    //  带年纪搜索
    handleSearch() {
      // this.getStationPassengerFlow(this.value1, this.value2);
      this.getLinePassengerData();
      // this.getDatePassengerFlow(this.value1, this.value2);
    },
    getSearchValue3(val) {
      this.getPassengerFlowByPage(val);
    },
    getStartStations() {
      this.$http.$get("kyjc_transportStatistic/getStartStations").then(data => {
        const options = [
          {
            label: "全部",
            value: ""
          }
        ];
        for (const item of data) {
          options.push({
            label: item.staStationName,
            value: item.staStationName
          });
        }
        this.searchConfig.searchCondition[0].options = options;
      });
    },
    changeDate(a) {
      if (a == "year") {
        this.type = "year";
        this.valueFormate = "yyyy";
        this.value2 = this.$utils.dayjs().format("YYYY");
        this.startTime = this.$utils.dayjs().format("YYYY");
        this.endTime = this.$utils.dayjs().format("YYYY");
      }
      if (a == "month") {
        this.type = "month";
        this.valueFormate = "yyyy-MM";
        this.value2 = this.$utils.dayjs().format("YYYY-MM");
        this.startTime = this.$utils.dayjs().format("YYYY-MM");
        this.endTime = this.$utils.dayjs().format("YYYY-MM");
      }
      // if (a == "day") {
      //   this.type = "date";
      //   this.valueFormate = "yyyy-MM-dd";
      //   this.value2 = this.$utils.dayjs().format("YYYY-MM-DD");
      //   this.startTime = this.$utils.dayjs().format("YYYY-MM-DD");
      //   this.endTime = this.$utils.dayjs().format("YYYY-MM-DD");
      // }
    },
    getLinePassengerData(data){
      this.dayAvgPassengerVolume=data.dayAvgPassengerVolume;
      this.dayAvgPassengerVolumeYoy=data.dayAvgPassengerVolumeYoy;
      this.highestPassengerVolume=data.highestPassengerVolume;
      this.highestPassengerVolumeDate=data.highestPassengerVolumeDate==null?"":data.highestPassengerVolumeDate.substring(0,4)+"年"+Number(data.highestPassengerVolumeDate.substring(4,6))+"月"+
              Number(data.highestPassengerVolumeDate.substring(6,8))+"日";
      this.totalPassengerVolume=data.totalPassengerVolume;
      var time=[],ky=[],qn=[];
      if(data.currentPassengerVolume&&data.currentPassengerVolume.length>0){
        data.currentPassengerVolume.forEach(e=>{
          time.push(e.lineName);
          ky.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
        })
      }
      if(data.yoyPassengerVolume&&data.yoyPassengerVolume.length>0){
        var flg=false;
        if(time.length==0){
          flg=true;
        }
        data.yoyPassengerVolume.forEach(e=>{
          if(flg){
            time.push(e.lineName);
          }
          qn.push(((e.passengerVolume!=null?e.passengerVolume:0)/10000).toFixed(2));
        })
      }
      var testData2={
        title:data.chartTitle,
        unitName:'万人次',
        legendData:['客运量','去年'],
        xAxisData: time,
        seriesData:[ky,qn]
      }
      this.option1=this.$utils.echart.creatEchartOption_9_1(testData2);
    },
    getSearchValueSelf(content){
      if(content.frequency=='年'){
        this.searchConfig.searchCondition[1].type='year';
        this.searchConfig.searchCondition[1].formate="yyyy";
        this.searchConfig.searchCondition[1].VModelvalue.defaultValue=this.$utils.dayjs().format("YYYY");
        if(content.staticDate.length>4){
          content.staticDate=content.staticDate.split('-')[0]
        }

      }else{
        this.searchConfig.searchCondition[1].type='month';
        this.searchConfig.searchCondition[1].formate="yyyy-MM";
        this.searchConfig.searchCondition[1].VModelvalue.defaultValue=this.$utils.dayjs().format("YYYY-MM");

        if(content.staticDate.length<5){
          content.staticDate= content.staticDate+'-01'
        }

      }
      this.getSearchTableValue(content);

    },
  },
  data() {
    return {
      dayAvgPassengerVolume:0,
      dayAvgPassengerVolumeYoy:0,
      highestPassengerVolume:0,
      highestPassengerVolumeDate:"",
      totalPassengerVolume:0,
      searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 36,
            type: "select",
            label: "",
            placeholder: "",
            VModelvalue: {
              name: "frequency",
              defaultValue: "年"
            },
            options: [
              {
                value: "年",
                label: "年"
              },
              {
                value: "月",
                label: "月"
              }
            ]
          },
          {
            order: 14,
            type: "year",
            formate: "yyyy",
            label: "",
            VModelvalue: {
              name: "staticDate",
              defaultValue:this.$utils.dayjs().format("YYYY"),
            }
          },

        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ]
      },
      timetype:'year',
      time:'',
      grid: Object.freeze({
        left: 70
      }),
      url: "/gdjc_basicPassengerFlowHandler/getLinePassengerVolume",
      option1: {},
      option2: {},
      option3: {},
      stationName: "",
      valueFormate: "yyyy",
      value1: "year",
      value2: "",
      staStationName: "",
      startTime: "",
      cycleType: "year",
      staStationNameList: "",
      endTime: "",
      type: "year",
      // searchConfig: {
      //   isKeyV: false,
      //   searchCondition: [
      //     {
      //       order: 3,
      //       width: "220px",
      //       type: "select",
      //       label: "",
      //       filterable: true,
      //       placeholder: "客运站名称",
      //       operator: "like",
      //       VModelvalue: {
      //         name: "stationName",
      //         defaultValue: ""
      //       },
      //       options: []
      //     },
      //     {
      //       order: 11,
      //       width: "220px",
      //       type: "linkDateRang",
      //       label: "",
      //       filterable: true,
      //       placeholder: "方式",
      //       VModelvalue: {
      //         name: "cycleType",
      //         defaultValue: "year"
      //       },
      //       VModelvalue2: {
      //         name: "date",
      //         operator: "between",
      //         defaultValue: ""
      //       },
      //       options: [
      //         {
      //           value: "year",
      //           label: "年"
      //         },
      //         {
      //           value: "month",
      //           label: "月"
      //         },
      //         {
      //           value: "day",
      //           label: "日"
      //         }
      //       ]
      //     }
      //   ],
      //   searchButtonGroup: [
      //     {
      //       action: "query",
      //       label: "查询"
      //     }
      //   ]
      // },
      searchoptions: [
        {
          value: "year",
          label: "年"
        },
        {
          value: "month",
          label: "月"
        }
      ],
      searchoptionsForStation: [],
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped>
$backgroundColor: rgba(5, 12, 38, 1);
.statistical-analysis-wrap {
  // width:100%;
  height: calc(100% - 36px);
  margin-top: 36px;
  // overflow-y: auto;
  // background: rgba(5, 12, 38, 1);
  // border: 1px solid rgba(32, 86, 221, 0.6);
  // background-image: url("./img/search_bg.png");
  background-size: 124px 120px;
  background-repeat: no-repeat;
  background-position: right top;
  .statistical-analysis-container {
    margin: 0 21px;
  }
}
.date-wrapper,
.btn-wrapper {
  display: inline-block;
  margin-left: 20px;
}
.top > div {
  width: 100%;
  height: 280px;
}
.t {
  display: flex;
  .left {
    flex: 1;
    height: 100%;
    ul {
      margin-left: 30px;
      margin-top:10px;
      li{
        height:30px;
        line-height: 30px;
        position: relative;
       }
      li.item1{
        font-size: 14px;
        span.smallPoint{
          width:8px;
          height:8px;
          background:linear-gradient(180deg,rgba(0,246,255,1),rgba(52,83,244,1));
          border-radius:50%;
          display: block;
          position: absolute;
          top:40%;
        }
        lable{
          margin-left: 20px;
        }
      }
      li.item2{
        margin-left: 20px;
        font-size: 18px;
        color:#00FFFF;
        span.unit{
          font-size: 10px;
          color:#fff;
        }
        .up{
          color:rgb(255,0,0);
        }
        .down{
          color:#00B050;
        }

      }

    }
  }
  .right {
    flex: 4;
    height: 100%;
  }
}
</style>