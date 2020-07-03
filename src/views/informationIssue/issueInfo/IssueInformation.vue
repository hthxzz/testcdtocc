<template>
  <!-- 信息发布 -- 发布信息  -->
  <div class="BusStation-wrapper">
        <div class="search-panel">
          <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"  @handleQuery="handleQuery1"
          @handleAdd="handleAdd1"></SearchPanel>
        </div>
        <el-tabs class="tab-content">
                <el-tab-pane label="发布任务（6）" class="">
                    <div class="table-content">
                      <el-table  :data="tableData" stripe ref="table" :header-cell-style="tableHeaderColor" >
                            <el-table-column label="信息标题" prop="xxbt"></el-table-column>
                            <el-table-column label="行业类别" prop="hylb"></el-table-column>
                            <el-table-column label="更新频次" prop="gxpc"></el-table-column>
                            <el-table-column label="更新日期" prop="gxrq"></el-table-column>
                            <el-table-column label="状态" prop="zt"></el-table-column>
                            <el-table-column label="操作" prop="cz">
                                <template slot-scope="scope">
                                    <el-button-group v-if="scope.row.zt === '已发布' " >
                                        <el-button type="text" size="small">详情</el-button>
                                    </el-button-group>
                                    <el-button-group v-else-if="scope.row.zt === '待发布' " >
                                        <el-button type="text" size="small" @click="openIssue">发布</el-button>
                                        <el-button type="text" size="small" style="margin-left:10px;">详情</el-button>
                                    </el-button-group>
                                    <el-button-group v-else-if="scope.row.zt === '审核未通过' " >
                                        <el-button type="text" size="small">报审</el-button>
                                        <el-button type="text" size="small" style="margin-left:10px;">编辑</el-button>
                                    </el-button-group>
                                    <el-button-group v-else-if="scope.row.zt === '待审核' " >
                                        <el-button type="text" size="small" @click="openAudit">审核</el-button>
                                    </el-button-group>
                                    <el-button-group  v-else-if="scope.row.zt === '待报审' " >
                                        <el-button type="text" size="small">报审</el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                   <!-- <div class="pagination">
                       <el-pagination v-if="showPagination"
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          @prev-click="handlePrevClick"
                          @next-click="handleNextClick"
                          :current-page="currentPage"
                          :page-size="pageSize"
                          layout="prev, pager, next,total"
                          :total="total"
                          background
                        ></el-pagination> 
                        <el-pagination v-show="showPagination">ijj</el-pagination>
                    </div>-->

                </el-tab-pane>
                <el-tab-pane label="待发布（12）" class="">
                    <el-table  :data="tableDataToBeIssued" stripe ref="table" :header-cell-style="tableHeaderColor" >
                            <el-table-column label="信息标题" prop="xxbt"></el-table-column>
                            <el-table-column label="行业类别" prop="hylb"></el-table-column>
                            <el-table-column label="更新频次" prop="gxpc"></el-table-column>
                            <el-table-column label="更新日期" prop="gxrq"></el-table-column>
                            <el-table-column label="状态" prop="zt"></el-table-column>
                            <el-table-column label="操作" prop="cz">
                                <template slot-scope="scope">
                                    <el-button-group v-if="scope.row.zt === '已发布' " >
                                        <el-button type="text" size="small">详情</el-button>
                                    </el-button-group>
                                    <el-button-group v-else-if="scope.row.zt === '待发布' " >
                                        <el-button type="text" size="small" @click="openIssue">发布</el-button>
                                        <el-button type="text" size="small" style="margin-left:10px;">详情</el-button>
                                    </el-button-group>
                                    <el-button-group v-else-if="scope.row.zt === '审核未通过' " >
                                        <el-button type="text" size="small">报审</el-button>
                                        <el-button type="text" size="small" style="margin-left:10px;">编辑</el-button>
                                    </el-button-group>
                                    <el-button-group v-else-if="scope.row.zt === '待审核' " >
                                        <el-button type="text" size="small" @click="openAudit" >审核</el-button>
                                    </el-button-group>
                                    <el-button-group v-else-if="scope.row.zt === '待报审' " >
                                        <el-button type="text" size="small">报审</el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-tab-pane>
                <el-tab-pane label="已发布（23）" class="">
                    <el-table  :data="tableDataIssued" stripe ref="table" :header-cell-style="tableHeaderColor" >
                            <el-table-column label="信息标题" prop="xxbt"></el-table-column>
                            <el-table-column label="行业类别" prop="hylb"></el-table-column>
                            <el-table-column label="更新频次" prop="gxpc"></el-table-column>
                            <el-table-column label="发布日期" prop="gxrq"></el-table-column>
                            <el-table-column label="状态" prop="zt"></el-table-column>
                            <el-table-column label="操作" prop="cz">
                                <template slot-scope="scope">
                                    <el-button-group v-if="scope.row.zt === '已发布' " >
                                        <el-button type="text" size="small">详情</el-button>
                                    </el-button-group>
                                    <!-- <el-button-group v-else-if="scope.row.zt === '待发布' " >
                                        <el-button type="text" size="small">发布</el-button>
                                        <el-button type="text" size="small">详情</el-button>
                                    </el-button-group>
                                    <el-button-group v-else >
                                        <el-button type="text" size="small" @click="openAudit">审核（报审）</el-button>
                                        <el-button type="text" size="small">编辑</el-button>
                                    </el-button-group> -->
                                </template>
                            </el-table-column>
                        </el-table>
                </el-tab-pane>
        </el-tabs>
        <!-- <div class="video-wrap">
            <DetailFormForTab :show="detailShow" @hideDetailForm="hideDetailForm" />
        </div> -->
        <div class="video-wrap"><!-- 信息发布-->
          <IssueInfo :show="issueInfoShow" @hideIssueInfo="hideIssueInfo"/>
        </div>
        <div> <!-- 审核-->
          <audit :show="auditShow"  @hideAudit="hideAudit"/>

        </div>
        <div class="issue-wrap"> <!-- 发布-->
          <issue :showIssue="issueShow" @hideIssue="hideIssue"/>
        </div>
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import { create } from 'domain';
import audit from "./components/audit/audit.vue";
import issue from "./components/issue/issue.vue";
import IssueInfo from "./components/issueInfo/IssueInfo.vue";
export default {
  name: "",
  mixins: [tableMixins],
  components:{
    audit,
    issue,
    IssueInfo
  },
  props:{
    // showPagination : {
    //   type:Boolean,
    //   default:true
    // },
  },
  create(){},
  methods:{
      // 修改table tr行的背景色,配合    :row-style="tableRowStyle" 使用
    // tableRowStyle({ row, rowIndex }) {
    //   return 'background-color: pink'
    // },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && (columnIndex>=8)) {
        return 'color: #ff0;'
      }
    },
    openAudit(){
      this.auditShow=true;
    },
    hideAudit(){
      this.auditShow =false;
    },
    hideIssueInfo(){
      this.issueInfoShow =false;
    },
    openIssue(){
      this.issueShow = true;
    },
    hideIssue(){
      this.issueShow = false;
    },
    openIssueInfo(){
      this.issueInfoShow =true;
    },
    handleAdd1() {
      // this.$props.AddFormConfig.dialogFormVisible = true;
      this.issueInfoShow =true;
    },
    handleQuery1(content){
      console.log(content);
    }
  },
  data() {
    return {
      title: "",
      // dialogFormVisible:false,
      auditShow:false,      // 审核
      issueShow:false,      //发布
      issueInfoShow:false,  //发布信息
      // showPagination:true,
      tableData: [
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-23",
          zt: "待审核"
        }),
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-22",
          zt: "已发布"
        }),
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-22",
          zt: "待发布"
        })
      ],
    tableDataToBeIssued:[
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-23",
          zt: "待审核"
        }),
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-22",
          zt: "已发布"
        }),
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-22",
          zt: "待发布"
        })
    ],
    tableDataIssued:[
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-23",
          zt: "已发布"
        }),
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-22",
          zt: "已发布"
        }),
        ...new Array(2).fill({
          xxbt: "道路交通日报",
          hylb: "道路交通",
          gxpc: "日",
          gxrq:"2020-01-22",
          zt: "已发布"
        })
    ],
      searchConfig: {
        searchCondition: [
        {
          type: "select",
          VModelvalue: {
            name: "按行业",
            defaultValue: "按行业"
          },
          options: [
            {
              value: "0",
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
            }
          ]
        },{
          type: "select",
          VModelvalue: {
            name: "按日期频次",
            defaultValue: "按日期频次"
          },
          options: [
            {
              value: "0",
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
          VModelvalue: {
            name: "按时间特征",
            defaultValue: "按时间特征"
          },
          options: [
            {
              value: "0",
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
          VModelvalue: {
            name: "按节假日",
            defaultValue: "按节假日"
          },
          options: [
            {
              value: "0",
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
        }],
        searchButtonGroup: 
        [
          {
            action: "query",
            label: "查询"
          },
          {
            action: "add",
            label: "发布信息"
          }
        ]
      }
    };
  }
  
};
</script>

<style lang="scss" scoped>
    .BusStation-wrapper{
        // height: 100%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .search-panel{
      // height: 50px;
      // flex: 60;
      flex-basis: 34px;
    }
    .tab-content{
      flex: 600;
      margin-top: 20px;
      // height: calc(100% - 80px);
      height: 100%;
    }

    .table-content {
    flex: 600;
    margin-top: 20px;
    height: calc(100% - 80px);
  }
  .pagination{
    flex-basis: 30px;
    background-color: #0A1E53;
    text-align: left;
  }
    .video-wrap{
      position: absolute;
      top: 18%;
      left: 20%;
      width: 660px;
      height: 720px;
    }
    issue-wrap{
      position: absolute;
      top: 18%;
      left: 20%;
      width: 660px;
      height: 720px;
    }

</style>