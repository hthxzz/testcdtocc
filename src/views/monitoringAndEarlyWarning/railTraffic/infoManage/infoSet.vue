<template>
  <!-- 公交运行监测 -- 基础 数据 -- 从业人员 -->
  <div class="practitioners-wrapper">
    <TableAndPagination
      :searchConfig="searchConfig"
      :detailFormConfig="detailFormConfig"
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
        <el-table-column label="姓名" prop="personName"></el-table-column>
        <el-table-column label="员工号" prop="workNo"></el-table-column>

        <el-table-column label="岗位类型" prop="personPost"></el-table-column>
        <el-table-column label="所属公司" prop="companyName"></el-table-column>
        <el-table-column label="加入公司时间" prop="joinTime">
          <template slot-scope="scope">{{scope.row.joinTime|formatDate}}</template>
        </el-table-column>
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
  data() {
    return {
      title: "",
      url: "/gjjc_busBaseInfo/getGjBusPersoninfoList",
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
            label: "姓名",
            placeholder: "",
            VModelvalue: {
              name: "personName",
              defaultValue: ""
            }
          },
          {
            order: 3,
            type: "input",
            label: "员工号",
            placeholder: "",
            VModelvalue: {
              name: "workNo",
              defaultValue: ""
            }
          },
          {
            order: 36,
            type: "select",
            label: "公司名称",
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
            type: "select",
            label: "岗位",
            placeholder: "区域",
            VModelvalue: {
              name: "personPost",
              defaultValue: "全部"
            },
            options: [
              {
                value: "1",
                label: "全部"
              },
              {
                value: "2",
                label: "驾驶员"
              },
              {
                value: "3",
                label: "队长"
              }
            ]
          }
        ],
        searchButtonGroup: [
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
        url: "/gjjc_busBaseInfo/getGjBusPersoninfoById",
        show: false,
        title: "从业人员信息详情",
        // 是否显示x按钮
        showCancel: true,
        id: "",
        data: [
          [
            {
              label: "员工号",
              key: "workNo",
              col: 12
            },
            {
              label: "姓名",
              key: "personName",
              col: 12,
              formate: function(val) {
                return val;
              }
            }
          ],
          [
            {
              label: "职称",
              key: "personTitle",
              col: 12
            },
            {
              label: "岗位",
              key: "personPost",
              col: 12
            }
          ],
          [
            {
              label: "所属企业",
              key: "companyName",
              col: 12
            },
            {
              label: "在职状态",
              key: "personState",
              col: 12
            }
          ],
          [
            {
              label: "入职时间",
              key: "joinTime",
              col: 12,
              formate: function(val) {
                if (val < 0) return "0000-00-00";
                let date = new Date(val / 1);
                return _formatDate(date, "yyyy-MM-dd "); //年-月-日 时分;
              }
            },
            {
              label: "类别",
              key: "workType",
              col: 12
            }
          ]
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.practitioners-wrapper {
  height: 100%;
}
</style>















