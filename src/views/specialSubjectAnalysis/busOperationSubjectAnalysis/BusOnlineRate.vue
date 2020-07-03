<template>
  <!-- 公交运行监测 -- 基础 数据 -- 公交投诉 -->
  <div class="BusComplaints-wrapper">
        <TableAndPagination :searchConfig="searchConfig" :detailFormConfig="detailFormConfig">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="投诉线路" prop="1"></el-table-column>
            <el-table-column label="投诉类型" prop="2"></el-table-column>
            <el-table-column label="所属公司" prop="3"></el-table-column>
            <el-table-column label="投诉内容" prop="4"></el-table-column>
            <el-table-column label="时间" prop="5"></el-table-column>
            <el-table-column label="是否责任内" prop="6"></el-table-column>
            <el-table-column label="处理状态" prop="7"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
export default {
  name: "",
  mixins: [tableMixins],
  data() {
    return {
      title: "",
      tableData: [
        ...new Array(16).fill({
          1: "投诉线路",
          2: "投诉类型",
          3: "所属公司",
          4: "投诉内容",
          5: "时间",
          6: "是否责任内",
          7: "处理状态",
        })
      ],
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
            type: "select",
            label: "是否有效",
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
                label: "无效"
              },
              {
                value: "2",
                label: "有效"
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
          }
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

