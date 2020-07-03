<template>
  <!-- 公交运行监测 -- 基础 数据 -- 行政处罚 -->
  <div class="BusComplaints-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >

            <el-table-column label="案件编号" prop="caseNo"></el-table-column>
            <el-table-column label="当事人姓名" prop="partyName"></el-table-column>
            <el-table-column label="当事人电话" prop="partyTel"></el-table-column>
            <el-table-column label="检查情况" prop="inspection"></el-table-column>
            <el-table-column label="检查时间" prop="checkStartTime">
              <template slot-scope="scope">
                {{scope.row.checkStartTime|formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="案由" prop="caseReason"></el-table-column>
            <el-table-column label="行政处罚文书号" prop="punishDecisionNo"></el-table-column>
            <el-table-column label="案件类别" prop="caseType"></el-table-column>
            <el-table-column label="处罚依据" prop="punishBase"></el-table-column>
            <el-table-column label="处罚机构" prop="punishUnit"></el-table-column>
            <el-table-column label="处置措施" prop="disposeMean"></el-table-column>
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
import {_formatDate} from "../../../../components/common/common";
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
      url:"/gjjc_busMonitorInfo/getZfLawcaseList",
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
            label: "驾驶员",
            placeholder: "驾驶员",
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
        url: '/gjjc_busMonitorInfo/getZfLawcaseById',
        show: false,
        title: '交通事故信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '编号',
              key: 'caseNo',
              col: 12,
            },
            {
              label: '检查开始时间',
              key: 'checkStartTime',
              col: 12,
              formate: function (val) {
                if (val < 0) return '0000-00-00';
                let date = new Date(val / 1);
                return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分;
              }
            }
          ],
          [
            {
              label: '检查结束时间',
              key: 'checkEndTime',
              col: 12,
              formate: function (val) {
                if (val < 0) return '0000-00-00';
                let date = new Date(val / 1);
                return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分;
              }
            },
            {
              label: '检查情况',
              key: 'inspection',
              col: 12,
            },

          ],
          [
            {
              label: '检查地点',
              key: 'checkAddr',
              col: 12,
            },
            {
              label: '检查单位',
              key: 'checkUnit',
              col: 12,
            },

          ],
          [
            {
              label: '检查人姓名',
              key: 'checkerName',
              col: 12,
            },

          ],

          [
            {
              label: '车牌号',
              key: 'vehiclePlateId',
              col: 12,
            },
            {
              label: '车牌颜色',
              key: 'plateColorCode',
              col: 12,
            },
          ],
          [
            {
              label: '当事人姓名',
              key: 'partyName',
              col: 12,
            },
            {
              label: '当事人证件号码',
              key: 'partyCardId',
              col: 12,
            },
          ],
          [
            {
              label: '当事人所属单位',
              key: 'partyUnit',
              col: 12,
            },
            {
              label: '车属单位',
              key: 'vehicleUnit',
              col: 12,
            },
          ],

          [
            {
              label: '当事人住址',
              key: 'partyAddr',
              col: 12,
            },
            {
              label: '企业法人姓名',
              key: 'legalPerson',
              col: 12,
            },

          ],

          [
            {
              label: '联系人',
              key: 'contactName',
              col: 12,
            },
            {
              label: '联系电话',
              key: 'contactTel',
              col: 12,
            }],
          [
            {
              label: '车辆类型',
              key: 'vehicleType',
              col: 12,
            }, {
            label: '车籍地',
            key: 'vehicleAddr',
            col: 12,
          }],
          [
            {
              label: '案由',
              key: 'caseReason',
              col: 12,
            }, {
            label: '案件类别',
            key: 'caseType',
            col: 12,
          }],
          [
            {
              label: '处罚机构',
              key: 'punishReason',
              col: 12,
            },
            {
              label: '处罚金额',
              key: 'punishMoney',
              col: 12,
            }],
          [
            {
              label: '处罚决定书编号',
              key: 'punishDecisionNo',
              col: 12,
            }, {
            label: '处罚依据',
            key: 'punishBase',
            col: 12,
          }],
          [
            {
              label: '处罚机构联系地址',
              key: 'punishUnitAddr',
              col: 12,
            },
            {
              label: '处置措施',
              key: 'disposeMean',
              col: 12,
            },
          ],
          [
            {
              label: '所属大队',
              key: 'belongGroup',
              col: 12,
            },
            {
              label: '负责人审核时间',
              key: 'headAuditTime',
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
              label: '负责人审核结果',
              key: 'headAudit',
              col: 12,
            },

          ]
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





