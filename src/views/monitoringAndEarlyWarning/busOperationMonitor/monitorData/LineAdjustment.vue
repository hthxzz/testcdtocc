<template>
  <!-- 公交运行监测 -- 基础 数据 -- 线路调整 -->
  <div class="LineAdjustment-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="线路" prop="lineName"></el-table-column>
            <el-table-column label="调整时间" >
              <template slot-scope="scope">
                {{scope.row.startDate|formatDate}}-{{scope.row.stopDate|formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="调整信息" prop="detail"></el-table-column>
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
      return _formatDate(date, 'yyyy-MM-dd') //年-月-日 时分
    }
  },
  data() {
    return {
      title: "",
      url:"/gjjc_busMonitorInfo/getbusLineChangeList",
      // tableData: [
      //   ...new Array(16).fill({
      //     1: "投诉线路",
      //     2: "投诉类型",
      //     3: "所属公司",
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
        url: '/gjjc_busMonitorInfo/getbusLineChangeById',
        show: false,
        title: '交通事故信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '线路名称',
              key: 'lineName',
              col: 12,
            },
            {
              label: '发布日期',
              key: 'publishDate',
              col: 12,
              formate: function (val) {
                if (val < 0) return '0000-00-00';
                let date = new Date(val / 1);
                return _formatDate(date, 'yyyy-MM-dd') //年-月-日 时分;
              }
            }
          ],
          [
            {
              label: '开始日期',
              key: 'startDate',
              col: 12,
              formate: function (val) {
                if (val < 0) return '0000-00-00';
                let date = new Date(val / 1);
                return _formatDate(date, 'yyyy-MM-dd') //年-月-日 时分;
              }
            },
            {
              label: '结束日期',
              key: 'stopDate',
              col: 12,
              formate: function (val) {
                if (val < 0) return '0000-00-00';
                let date = new Date(val / 1);
                return _formatDate(date, 'yyyy-MM-dd') //年-月-日 时分;
              }
            },

          ],
          [
            {
              label: '调整内容',
              key: 'detail',
              col: 24,
            },

          ],
        ]
      }

    };
  }
};
</script>

<style lang="scss" scoped>
    .LineAdjustment-wrapper{
        height: 100%;
    }
</style>





