<template>
  <div class="userNumber-wrapper nomap-content-container">
    <panelTitle title="单车周转率统计" :displaySwitch="false" />
    <section class="search-wrapper">
       <SearchPanel :searchConfig="searchConfig" ></SearchPanel>
    </section>
    <!-- <SearchPanel :searchConfig="searchConfig" ></SearchPanel> -->
    <!-- echar图开始 -->
    <section class="echar-wrapper">
      <!-- <div class="item">
        <ul>
          <li>总用户</li>
          <li>12345</li>
        </ul>
      </div> -->
      <div class="item">
        <div class="echar-pie" style="height: 300px">
          <v-chart :options="NotWDoption"  theme="theme"/>
        </div>
        <!-- <div class="btn-wrappper" @click="changeEchar">
          <span>趋势图</span>
          <span>对比图</span>
        </div> -->
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
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="统计时间" prop="2"></el-table-column>
            <el-table-column label="营运企业" prop="4"></el-table-column>
            <el-table-column label="周转率" prop="5"></el-table-column>
            <!-- <el-table-column label="活跃率" prop="6"></el-table-column> -->
            <!-- <el-table-column label="增加用户月环比" prop="6"></el-table-column> -->
          </el-table>
        </TableAndPagination>
      </div>
    </section>
    <DetailForm></DetailForm>
  </div>
</template>

<script>
import { option3, option2,option1 } from "./options";
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  mixins: [tableMixins],
   mounted(){
    this.getNotWorkingDaysData();
  },
  methods: {
     getNotWorkingDaysData(data){
      var time=[],ky=[],qn=[];
      var testData2={
        title:'2020年客流非工作日小时变化趋势',
        unitName:'万人次',
        legendData:['客运量','去年'],
        xAxisData: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
        seriesData:[["0.00", "0.00", "0.00", "0.00", "0.00", "0.01", "0.33", "1.41", "2.34", "1.33", "0.98", "0.91", "0.94", "1.07", "1.06", "1.05", "1.15", "1.86", "2.03", "1.17","0.95","0.77","0.48","0.06"],["0.00", "0.00", "0.00", "0.00", "0.00", "0.02", "0.57", "2.35", "3.57", "2.29", "1.88", "1.76", "1.87", "2.06", "2.10", "2.06", "2.35", "3.38", "3.62", "2.20","1.82","1.59","1.01","0.10"]]
      }
      // console.log(testData2);
      this.NotWDoption=this.$utils.echart.creatEchartOption_4_3(testData2);
    },
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
      url: "",
      option: option1,
     searchConfig: {
        isKeyV: true,
        searchCondition: [
          {
            order: 3,
            type: "select",
            label: "企业",
            placeholder: "企业名称",
            VModelvalue: {
              name: "busnessCode",
              defaultValue: ""
            },
            options: [
              {
                value: "",
                label: "全部"
              }
            ]
          }, {
            order: 5,
            type: "select",
            label: "",
            placeholder: "区域名称",
            VModelvalue: {
              name: "areaCode",
              defaultValue: ""
            },
            options: [
              {
                value: "",
                label: "全部区域"
              }
            ]
          },{
            order: 6,
            type: "select",
            label: "",
            placeholder: "",
            VModelvalue: {
              name: "lineCode",
              defaultValue: "1"
            },
            options: [
               {
                value: "1",
                label: "年"
              },
              {
                value: "2",
                label: "月"
              }
            ]
          }, {
            order: 14,
            type: "monthrange",
            formate: "yyyy-MM",
            label: "",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "statisticsDate",
              defaultValue: ""
            }
          },
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.userNumber-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  section:not(:first-child) {
    // flex: 1;
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