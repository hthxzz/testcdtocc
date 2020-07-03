<template>
    <div class="log-container">
        <!-- 模板管理 -->
        <TableAndPagination 
        :searchConfig="searchConfig" 
        :totalP=total
        @fetchTableData="fetchTableData"
        @getSearchValue="getSearchValue"
        @handleAdd="handleAdd1">
          <el-table style="width: 100%;height:100%;overflow-y: auto"  :data="tableData" stripe ref="table" >
            <el-table-column label="模板名称" prop="templateName"></el-table-column>
            <el-table-column label="类别" prop="templateType"></el-table-column>
            <el-table-column label="创建日期" prop="createTime">
                <template slot-scope="scope">
                    {{scope.row.createTime|formatDate}}
                </template>
            </el-table-column>
            <el-table-column label="最新修改日期" prop="updateTime">
                <template slot-scope="scope">
                    {{scope.row.updateTime|formatDate}}
                </template>
            </el-table-column>
            <el-table-column label="创建人" prop="addPerson"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- <el-button size="mini" class="table-detail-btn"
                        @click="handleInfo(scope.$index,scope.row)">查看
                    </el-button> -->
                    <el-button size="mini" type="warning"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>  
            </el-table-column>
          </el-table>
        </TableAndPagination>
        <div> <!-- 审核-->
          <addTemplate :show="templateShow"  @hideTemplate="hideTemplate"/>
        </div>
    </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import {_formatDate} from "../../../../components/common/common.js";
import addTemplate from "./components/addTemplate.vue";
    export default {
        name: '',
        mixins: [tableMixins],
        components:{
            addTemplate
        },
        filters: {
            formatDate(time) {
            if (time<0) return '0000-00-00 00:00:00';
            let date = new Date(time/1);
            return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log("编辑 index:"+index+ "row:"+row);
                // this.$http.$get("/gxdc_bikeAreaHandler/getAreaInfoById", {id: row.id}).then(data => {
                //      tmap.addLayer("SHAREBIKE_FOCUS_AREA");
                //      tmap.addPolygonOnLayer("SHAREBIKE_FOCUS_AREA",row.id,row.geom)
                // });
            },
            handleDelete(index,row){
                // 删除数据
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.$get("/xxfb_releaseSetUp/delTemplate", {'oid': row.id}).then(data => {
                        debugger;
                        if (data === 1) {//此处需要调试时注意，是否是1
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getSearchValue();
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    });
                });

            },getSearchValue(val) {
                this.getSearchTableValue(val);
            }, 
            // openAudit(){
            //     this.templateShow=true;
            // },
            hideTemplate(){
                this.templateShow =false;
            },handleAdd1() {
                debugger;
                console.log("templateShow:"+this.templateShow);
                this.templateShow =true;
                this.$props.templateShow = true;
            },

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
                url:"xxfb_releaseSetUp/findTemplateByCondition",
                templateShow:false,      // 添加模板
                tableData:[
                    // ...new Array(2).fill({
                    // templateName: "道路交通日报",
                    // createTime:"2020-01-23",
                    // updateTime:"2020-01-23",
                    // addPerson: "wxr"
                    // }),
                ],
                searchConfig: {
                    searchCondition: [
                    {
                    type: "select",
                    label: "按行业",
                    placeholder: "按行业",
                    VModelvalue: {
                        name: "industry",
                        defaultValue: ""
                    },
                    options: [
                         {
                        value: "",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "道路交通"
                        },
                        {
                        value: "2",
                        label: "轨道交通"
                        },
                        {
                        value: "3",
                        label: "地面公交"
                        },
                        {
                        value: "4",
                        label: "出租汽车"
                        },
                        {
                        value: "5",
                        label: "公路客运"
                        },
                        {
                        value: "6",
                        label: "航空运输"
                        },
                        {
                        value: "7",
                        label: "铁路运输"
                        }]
                    },{
                    type: "select",
                    label: "日期频次",
                    placeholder: "日期频次",
                    VModelvalue: {
                        name: "frequency",
                        defaultValue: ""
                    },
                    options: [
                        {
                        value: "",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "日"
                        },
                        {
                        value: "2",
                        label: "周"
                        },
                        {
                        value: "3",
                        label: "月"
                        },
                        {
                        value: "4",
                        label: "季度"
                        },
                        {
                        value: "5",
                        label: "年"
                        }
                    ]
                    },{       
                    type: "select",
                    label: "按时间特征",
                    placeholder: "按时间特征",    
                    VModelvalue: {
                        name: "feature",
                        defaultValue: ""
                    },
                    options: [
                        {
                        value: "",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "工作日"
                        },
                        {
                        value: "2",
                        label: "非工作日"
                        },
                        {
                        value: "3",
                        label: "高峰时段"
                        }]
                    },{   
                    type: "select",
                    label: "按节假日",
                    placeholder: "按节假日",
                    VModelvalue: {
                        name: "holiday",
                        defaultValue: ""
                    },
                    options: [
                        {
                        value: "",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "元旦"
                        },
                        {
                        value: "2",
                        label: "春节"
                        },
                        {
                        value: "3",
                        label: "清明"
                        },{
                        value: "4",
                        label: "劳动节"
                        },
                        {
                        value: "5",
                        label: "端午节"
                        },
                        {
                        value: "6",
                        label: "中秋节"
                        },{
                        value: "7",
                        label: "国庆节"
                        }]
                    },
                    {
                        type: "daterange",
                        formate: "yyyy-MM-dd",
                        label: "创建时间",
                        placeholderStart: "开始时间",
                        placeholderEnd: "截止时间",
                        VModelvalue: {
                            name: "createTime",  //dataType columnExpression queryValue operator columnName
                            defaultValue: ""
                        }
                    }
                    ],
                    searchButtonGroup: 
                    [
                    {
                        action: "query",
                        label: "查询"
                    },{
                        action: "add",
                        label: "添加模板"
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