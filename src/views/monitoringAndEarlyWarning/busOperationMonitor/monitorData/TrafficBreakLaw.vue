<template>
  <!-- 公交运行监测 -- 基础 数据 -- 交通违法 -->
  <div class="BusComplaints-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="编码" prop="illegalId"></el-table-column>
            <el-table-column label="车牌号" prop="vehiclePlateId"></el-table-column>
            <el-table-column label="车牌颜色" prop="plateColorCode"></el-table-column>
            <el-table-column label="违法地点" prop="illealLocation"></el-table-column>
            <el-table-column label="描述" prop="describeStr"></el-table-column>
            <el-table-column label="驾驶员姓名" prop="driverName"></el-table-column>
            <el-table-column label="驾驶证号" prop="licenseId"></el-table-column>
            <el-table-column label="驾驶证类型" prop="licenseTypeCode"></el-table-column>
            <el-table-column label="违法时间" prop="illegalTime">
              <template slot-scope="scope">
                {{scope.row.illegalTime|formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="违法行为" prop="vio1"></el-table-column>
            <el-table-column label="违法行为2" prop="vio2"></el-table-column>
            <el-table-column label="违法行为3" prop="vio3"></el-table-column>
            <el-table-column label="违法行为4" prop="vio4"></el-table-column>
            <el-table-column label="违法行为5" prop="vio5"></el-table-column>
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
      url:"/gjjc_busMonitorInfo/getJgTrafficIlleailList",
      searchConfig: {
        searchCondition: [
          // {
          //   order: 3,
          //   type: "select",
          //   label: "区域",
          //   placeholder: "区域",
          //   VModelvalue: {
          //     name: "qy",
          //     defaultValue: "全部"
          //   },
          //   options: [
          //     {
          //       value: "1",
          //       label: "全部"
          //     },
          //     {
          //       value: "2",
          //       label: "5+1区域"
          //     }
          //
          //   ]
          // },
          // {
          //   order: 36,
          //   type: "select",
          //   label: "经营企业",
          //   placeholder: "经营企业",
          //   VModelvalue: {
          //     name: "jyqy",
          //     defaultValue: "1"
          //   },
          //   options: [
          //     {
          //       value: "1",
          //       label: "全部"
          //     },
          //     {
          //       value: "2",
          //       label: "A公司"
          //     },
          //     {
          //       value: "3",
          //       label: "B公司"
          //     }
          //
          //   ]
          // },
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
        url: '/gjjc_busMonitorInfo/getJgTrafficIlleailById',
        show: false,
        title: '交通事故信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '编号',
              key: 'illegalId',
              col: 12,
            },
            {
              label: '违法发生时间',
              key: 'illegalTime',
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
              label: '违法地点',
              key: 'illealLocation',
              col: 24,
            },

          ],
          [
            {
              label: '描述',
              key: 'describeStr',
              col: 24,
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
              label: '驾驶员姓名',
              key: 'driverName',
              col: 24,
            },
          ],
          [
            {
              label: '驾驶证号',
              key: 'licenseId',
              col: 12,
            },
            {
              label: '驾驶证类型',
              key: 'licenseTypeCode',
              col: 12,
            },
          ],

          [
            {
              label: '违法行为',
              key: 'vio1',
              col: 12,
            },
            {
              label: '违法行为2',
              key: 'vio2',
              col: 12,
            },

          ],

          [
            {
              label: '违法行为3',
              key: 'vio3',
              col: 12,
            },
            {
              label: '违法行为4',
              key: 'vio4',
              col: 12,
            }],
          [
            {
              label: '违法行为5',
              key: 'vio5',
              col: 12,
            }, {
            label: '违法现场照片1',
            key: 'illegalPhoto1',
            col: 12,
          }],
          [
            {
              label: '违法现场照片2',
              key: 'illegalPhoto2',
              col: 12,
            }, {
            label: '违法现场照片2',
            key: 'illegalPhoto3',
            col: 12,
          }],
          [
            {
              label: '合法驾驶行为限定值1',
              key: 'limitIllegal1',
              col: 12,
            },
            {
              label: '合法驾驶行为限定值2',
              key: 'limitIllegal2',
              col: 12,
            }],
          [
            {
              label: '合法驾驶行为限定值3',
              key: 'limitIllegal3',
              col: 12,
            }, {
            label: '合法驾驶行为限定值4',
            key: 'limitIllegal4',
            col: 12,
          }],
          [
            {
              label: '合法驾驶行为限定值5',
              key: 'limitIllegal5',
              col: 12,
            },
            {
              label: '违法驾驶行为实测值1',
              key: 'actualIllegal1',
              col: 12,
            },
          ],
          [
            {
              label: '违法驾驶行为实测值2',
              key: 'limitIllegal2',
              col: 12,
            },
            {
              label: '违法驾驶行为实测值3',
              key: 'actualIllegal3',
              col: 12,
            },
          ],
          [
            {
              label: '违法驾驶行为实测值4',
              key: 'limitIllegal4',
              col: 12,
            },
            {
              label: '违法驾驶行为实测值5',
              key: 'actualIllegal5',
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





