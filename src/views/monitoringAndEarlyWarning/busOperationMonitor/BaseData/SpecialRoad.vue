<template>
  <!-- 公交运行监测 -- 基础 数据 -- 专用道 -->
  <div class="specialroad-wrapper">
        <TableAndPagination :searchConfig="searchConfig" :detailFormConfig="detailFormConfig">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="专用道性质" prop="1"></el-table-column>
            <el-table-column label="道路名称" prop="2"></el-table-column>
            <el-table-column label="起止点" prop="3"></el-table-column>
            <el-table-column label="道路长度" prop="4"></el-table-column>
            <el-table-column label="公交专用道性质" prop="5"></el-table-column>
            <el-table-column label="专用道长度(Km)" prop="6"></el-table-column>
            <el-table-column label="实施时间" prop="7"></el-table-column>
            <el-table-column label="状态" prop="8"></el-table-column>
            <el-table-column label="说明" prop="9"></el-table-column>
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
export default {
  name: "",
  mixins: [tableMixins],
  data() {
    return {
      title: "",
      tableData: [
        ...new Array(16).fill({
          1: "白天时段公交专用道",
          2: "蜀都大道",
          3: "经华路口-谢家祠",
          4: "11.3km",
          5: "7—20",
          6: "22.6",
          7: "2012/12/31",
          8: "正常",
          9: "2016年2月1日起，总府路（北新街-北打金）公交专用时间调整为7—17",
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
    .specialroad-wrapper{
        height: 100%;
    }
</style>



























