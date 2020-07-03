<template>
  <!-- 轨道线路查询 -->
  <div class="practitioners-wrapper nomap-content-container">
    <TableAndPagination
      :searchConfig="searchConfig"
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
        <el-table-column label="线路名称" prop="lineName"></el-table-column>
        <el-table-column label="区间" prop="originName">
          <template slot-scope="scope">{{scope.row.originName}}-{{scope.row.destinationName}}</template>
        </el-table-column>

        <el-table-column label="开通时间" prop="openTime"></el-table-column>
        <el-table-column label="运营里程(公里)" prop="mileage"></el-table-column>
        <el-table-column label="车站个数" prop="stationNum">
          <template slot-scope="scope">{{scope.row.stationNum}}</template>
        </el-table-column>
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" class="table-detail-btn" @click="handleDetail(scope.row)">详情</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </TableAndPagination>
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { _formatDate } from "../../../../components/common/common.js";
export default {
  name: "",
  mixins: [tableMixins],

  filters: {
    formatDate(time) {
      if (time < 0) return "0000-00-00";
      let date = new Date(time / 1);
      return _formatDate(date, "yyyy-MM-dd "); //年-月-日 时分
    }
  },
  mounted() {
    this.getAllLineData();
  },
  methods:{
     getAllLineData(){
       this.$http.$get('/gdjc_infoManagerHandler/getLine').then(res => {
         if(res!=null&&res.length>0){
           res.forEach(e=>{
             this.searchConfig.searchCondition[0].options.push({value:e.lineCode,label:e.lineName})
           })
         }
       });
     }
  },
  data() {
    return {
      title: "",
      url: "/gdjc_infoManagerHandler/getLineCase",
      searchConfig: {
        isKeyV: true,
        searchCondition: [

          {
            order: 3,
            type: "select",
            label: "线路名称",
            placeholder: "线路名称",
            VModelvalue: {
              name: "lineCode",
              defaultValue: ""
            },
            options: [
              {
                value: "",
                label: "全部"
              }
            ]
          }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ]
      },
      // detailFormConfig: {
      //   // 表单详情请求地址
      //   url: "/gjjc_busBaseInfo/getGjBusPersoninfoById",
      //   show: false,
      //   title: "从业人员信息详情",
      //   // 是否显示x按钮
      //   showCancel: true,
      //   id: "",
      //   data: [
      //     [
      //       {
      //         label: "员工号",
      //         key: "workNo",
      //         col: 12
      //       },
      //       {
      //         label: "姓名",
      //         key: "personName",
      //         col: 12,
      //         formate: function(val) {
      //           return val;
      //         }
      //       }
      //     ],
      //     [
      //       {
      //         label: "职称",
      //         key: "personTitle",
      //         col: 12
      //       },
      //       {
      //         label: "岗位",
      //         key: "personPost",
      //         col: 12
      //       }
      //     ],
      //     [
      //       {
      //         label: "所属企业",
      //         key: "companyName",
      //         col: 12
      //       },
      //       {
      //         label: "在职状态",
      //         key: "personState",
      //         col: 12
      //       }
      //     ],
      //     [
      //       {
      //         label: "入职时间",
      //         key: "joinTime",
      //         col: 12,
      //         formate: function(val) {
      //           if (val < 0) return "0000-00-00";
      //           let date = new Date(val / 1);
      //           return _formatDate(date, "yyyy-MM-dd "); //年-月-日 时分;
      //         }
      //       },
      //       {
      //         label: "类别",
      //         key: "workType",
      //         col: 12
      //       }
      //     ]
      //   ]
      // }
    };
  }
};
</script>

<style lang="scss" scoped>
.practitioners-wrapper {
  height: 100%;
}
</style>















