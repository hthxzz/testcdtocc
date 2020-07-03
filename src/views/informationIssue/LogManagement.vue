<template>
    <div class="log-container">
        <!-- 日志管理 -->
        <TableAndPagination 
        :searchConfig="searchConfig" 
        :totalP=total
        @fetchTableData="fetchTableData"
        @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto"  :data="tableData" stripe ref="table" >
            <el-table-column label="信息标题" prop="infoId"></el-table-column>
            <el-table-column label="操作记录" prop="oprateContent"></el-table-column>
            <el-table-column label="操作人" prop="opratePerson"></el-table-column>
            <el-table-column label="操作时间" prop="oprateTime">
                <template slot-scope="scope">
                    {{scope.row.oprateTime|formatDate}}
                </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>
    </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import {_formatDate} from "../../components/common/common.js";
    export default {
        name: '',
        mixins: [tableMixins],
        filters: {
            formatDate(time) {
            if (time<0) return '0000-00-00 00:00:00';
            let date = new Date(time/1);
            return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分
            }
        },
        methods: {
            // dealWithTableData(data){
            //     debugger;
            //     if(data.results!=null&&data.results.length>0){
            //         this.tableData=data.results;
            //     }
            // },
            // getSearchValue(content){
            //     debugger;
            //     console.log(content);
            //     let queryFields = content[0];
            //     const data = {};
            //     data.page = 1;
            //     data.pageSize = 10;
            //     data.sortField ='OPRATE_TIME'; 
            //     data.sortOrder = 'desc';
            //     data.queryFields = queryFields;
            //     // const data={};
            //     // if(content.time!=""){
            //     //     data.startTime=content.time[0];
            //     //     data.endTime=content.time[1];
            //     // }
            //     // if (content.pc!=""){
            //     //     data.frequency=content.pc;
            //     // }
            //     this.$http.$get("irest/base/xxfb_logManager/findRecordByCondition",data).then((param) => {
            //         this.dealWithData(param);
            //     });

            // },
            // handleLogQuery(content){
            //     debugger;
            //     const data={};
            //     if(content.time!=""){
            //         data. startTime=content.time[0];
            //         data.endTime=content.time[1];
            //     }
            //     if (content.pc!=""){
            //         data.frequency=content.pc;
            //     }
            //     this.$http.$get("xxfb_logManager/findRecordByCondition",data).then((param) => {
            //         this.dealWithData(param);
            //     });
            //     // this.$http.$get("kyjc_flightStatistic/getFlightStatisticsList",data).then((param) => {
            //     //     this.dealWithData(param);
            //     // });
            //     // this.$http.$get("kyjc_flightStatistic/getFlightStatisticsPage",data).then((param) => {
            //     //     this.dealWithTableData(param);
            //     // });
            // },
        },
        data() {
            return {
                url:"xxfb_logManager/findRecordByCondition",
                tableData:[],
                searchConfig: {
                    searchCondition: [
                    {
                        type: "daterange",
                        formate: "yyyy-MM-dd",
                        label: "日期范围",
                        placeholderStart: "开始时间",
                        placeholderEnd: "截止时间",
                        VModelvalue: {
                            name: "oprateTime",  //dataType columnExpression queryValue operator columnName
                            defaultValue: ""
                        }
                    }
                    ],
                    searchButtonGroup: 
                    [
                    {
                        action: "query",
                        label: "查询"
                    }
                    ]  
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .log-container{
        height: 100%;
    }
</style>