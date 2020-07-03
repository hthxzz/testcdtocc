<template>
  <!-- 轨道站点 -->
  <div class="practitioners-wrapper  nomap-content-container">
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
        <el-table-column label="站点名称" prop="stationName"></el-table-column>
        <el-table-column label="途径线路" prop="wayLine"></el-table-column>

        <el-table-column label="营运时间" prop="operrateTime"></el-table-column>

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
    },
    getSearchValue(data){
      debugger;
      this.searchConfig.searchCondition[1].options=[{value:"",label:"全部"}];
      if (data.lineCode!=""){
        this.$http.$get('/gdjc_infoManagerHandler/getStationByLine',{lineCode:data.lineCode}).then(res => {
          if(res!=null&&res.length>0){
            res.forEach(e=>{
              this.searchConfig.searchCondition[1].options.push({value:e.stationName,label:e.stationName});
            })
          }
        });
      }else{
        data.stationName='';
      }
      this.getSearchTableValue(data);
    }
  },
  data() {
    return {
      title: "",
      url: "/gdjc_infoManagerHandler/getStationCase",
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
          },
          {
            order: 3,
            type: "select",
            label: "站点名称",
            placeholder: "站点名称",
            VModelvalue: {
              name: "stationName",
              defaultValue: ""
            },
            options: [
              {
                value: "",
                label: "全部"
              },
              {
                value: "2",
                label: "天府广场"
              }
            ]
          }
          // {
          //   order: 3,
          //   type: "input",
          //   label: "姓名",
          //   placeholder: "",
          //   VModelvalue: {
          //     name: "personName",
          //     defaultValue: ""
          //   }
          // }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ]
      },
    };
  }
};
</script>

<style lang="scss" scoped>
.practitioners-wrapper {
  height: 100%;
}
</style>















