<template>
  <!-- 公交运行监测 -- 基础 数据 -- 公交投诉 -->
  <div class="BusComplaints-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="投诉线路" prop="1"></el-table-column>
            <el-table-column label="投诉人" prop="complainantName"></el-table-column>
            <el-table-column label="投诉内容" prop="complaintContent"></el-table-column>
            <el-table-column label="投诉渠道" prop="complaintChannel"></el-table-column>
            <el-table-column label="投诉类型" prop="complaintType"></el-table-column>
            <el-table-column label="所属公司" prop="enterpriseName"></el-table-column>
            <el-table-column label="投诉时间" prop="complaintTime">
              <template slot-scope="scope">
                {{scope.row.complaintTime|formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="车牌号" prop="vehiclePlateId"></el-table-column>
            <el-table-column label="处理状态" prop="handleState"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" class="table-detail-btn" @click="handleDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import {_formatDate} from "../../../../components/common/common.js";
export default {
  name: "",
  mixins: [tableMixins],
  filters: {
    formatDate(time) {
      if (time<0) return '0000-00-00';
      let date = new Date(time/1);
      return _formatDate(date, 'yyyy-MM-dd hh:mm') //年-月-日 时分
    }
  },
  data() {
    return {
      title: "",
      url:"/gjjc_busMonitorInfo/getGgComplaintList",
      // tableData: [
      //   ...new Array(16).fill({
      //     1: "投诉线路",
      //     2: "投诉类型",
      //     3: "所属公司",
      //     4: "投诉内容",
      //     5: "时间",
      //     6: "是否责任内",
      //     7: "处理状态",
      //   })
      // ],
      searchConfig: {
        searchCondition: [
          {
            order: 3,
            type: "select",
            label: "区域",
            placeholder: "区域",
            VModelvalue: {
              name: "qy",
              defaultValue: "全部"
            },
            options: [
              {
                value: "1",
                label: "全部"
              },
              {
                value: "2",
                label: "5+1区域"
              }
              
            ]
          },
          {
            order: 36,
            type: "select",
            label: "经营企业",
            placeholder: "经营企业",
            VModelvalue: {
              name: "jyqy",
              defaultValue: "1"
            },
            options: [
              {
                value: "1",
                label: "全部"
              },
              {
                value: "2",
                label: "A公司"
              },
              {
                value: "3",
                label: "B公司"
              }

            ]
          },
          {
            order: 3,
            type: "input",
            label: "车牌号",
            placeholder: "车牌号",
            VModelvalue: {
              name: "vehiclePlateId",
              defaultValue: ""
            },
          },
          {
            order: 3,
            type: "input",
            label: "线路",
            placeholder: "线路",
            VModelvalue: {
              name: "",
              defaultValue: ""
            },
          },
          {
            order: 14,
            otype: 'week',
            type: "daterange",
            formate: "yyyy-MM-dd",
            label: "时间区间",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "time",
              defaultValue: ""
            }
          },

        ],
        searchButtonGroup: 
        [
          {
            action: "query",
            label: "查询"
          },
          {
            action: "export",
            label: "导出"
          },
          {
            action: "print",
            label: "打印"
          }
        ]
      },
      detailFormConfig: {
        // 表单详情请求地址
        url: '/gjjc_busMonitorInfo/getGgComplaintById',
        show: false,
        title: '公交投诉信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '投诉编号',
              key: 'complaintId',
              col: 12,
            },
            {
              label: '投诉人',
              key: 'complainantName',
              col: 12,
              formate: function (val) {
                return val;
              }
            }
          ],
          [
            {
              label: '投诉内容',
              key: 'complaintContent',
              col: 24,
            },

          ],
          [
            {
              label: '投诉人联系电话',
              key: 'complainantTel',
              col: 24,
            },

          ],
          [
            {
              label: '投诉线路',
              key: '',
              col: 12,
            },
            {
              label: '发生地点',
              key: 'occurTime',
              col: 12,
            }],
          [
            {
              label: '投诉类型',
              key: 'complaintType',
              col: 12,
            }, {
            label: '投诉渠道',
            key: 'complaintChannel',
            col: 12,
          }],
          [
            {
              label: '投诉时间',
              key: 'complaintTime',
              col: 12,
            }, {
            label: '投诉处理状态',
            key: 'handleState',
            col: 12,
          }],
          [
            {
              label: '违章分类',
              key: 'violationType',
              col: 12,
            },
            {
              label: '违章分类一级名称',
              key: 'violationOne',
              col: 12,
            }],
          [
            {
              label: '违章分类二级名称',
              key: 'violationTwo',
              col: 12,
            }, {
            label: '所属企业',
            key: 'enterpriseName',
            col: 12,
          }],
          [
            {
              label: '行业分类',
              key: 'tradeType',
              col: 12,
            },
            {
              label: '处理时间',
              key: 'handleTime',
              col: 12,
              formate: function (val) {
                if (val < 0) return '0000-00-00';
                let date = new Date(val / 1);
                return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分;
              }
            },
          ],
          [
            {
              label: '处理人',
              key: 'handleName',
              col: 12,
            }
          ],

        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
    .BusComplaints-wrapper{
        height: 100%;
    }
</style>

