<template>
  <!-- 公交运行监测 -- 基础 数据 -- 交通事故 -->
  <div class="TrafficAccident-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="事故编号" prop="accidentId"></el-table-column>
            <el-table-column label="事故发生时间" prop="occurTime">
              <template slot-scope="scope">
                {{scope.row.occurTime|formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="驾驶员" prop="driverName"></el-table-column>
            <el-table-column label="从业资格证号" prop="2"></el-table-column>
            <el-table-column label="车牌号" prop="vehiclePlateId"></el-table-column>
            <el-table-column label="经营业户" prop="orgName"></el-table-column>
            <el-table-column label="死亡人数" prop="deathNum"></el-table-column>
            <el-table-column label="是否责任内" prop="dutyType"></el-table-column>
            <el-table-column label="事故描述" prop="accidentDescribe"></el-table-column>
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
      url:"/gjjc_busMonitorInfo/getJgStatsAccidentList",
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
        url: '/gjjc_busMonitorInfo/getJgTrafficAccidentById',
        show: false,
        title: '交通事故信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '事故编号',
              key: 'accidentId',
              col: 12,
            },
            {
              label: '事故发生时间',
              key: 'occurTime',
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
              label: '事故发生地址',
              key: 'locationDescribe',
              col: 24,
            },

          ],
          [
            {
              label: '经度',
              key: 'longitude',
              col: 12,
            },
            {
              label: '纬度',
              key: 'latitude',
              col: 12,
            },

          ],
          [
            {
              label: '事故描述',
              key: 'accidentDescribe',
              col: 24,
            },

          ],
          [
            {
              label: '事故来源',
              key: 'accidentSource',
              col: 24,
            },

          ],
          [
            {
              label: '事故发生原因',
              key: 'accidentReason',
              col: 24,
            },

          ],
          [
            {
              label: '死亡人数',
              key: 'deathNum',
              col: 12,
            },
            {
              label: '受伤人数',
              key: 'injuredNum',
              col: 12,
            },
          ],
          [
            {
              label: '失踪人数',
              key: 'unaccountedNum',
              col: 12,
            },
            {
              label: '财产损失',
              key: 'propertyLoss',
              col: 12,
            },
          ],

          [
            {
              label: '行政区划',
              key: 'districtCode',
              col: 12,
            },
            {
              label: '责任类型',
              key: 'dutyType',
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
            }],
          [
            {
              label: '当事人属性',
              key: 'personAttr',
              col: 12,
            }, {
            label: '驾驶员姓名',
            key: 'driverName',
            col: 12,
          }],
          [
            {
              label: '性别',
              key: 'sex',
              col: 12,
            }, {
            label: '驾驶员年龄',
            key: 'age',
            col: 12,
          }],
          [
            {
              label: '准驾车型',
              key: 'vehicleCode',
              col: 12,
            },
            {
              label: '驾驶证种类',
              key: 'licenseType',
              col: 12,
            }],
          [
            {
              label: '驾驶证号码',
              key: 'licenseId',
              col: 12,
            }, {
            label: '驾驶员证件号码',
            key: 'certifyId',
            col: 12,
          }],
          [
            {
              label: '当事人所属机构',
              key: 'orgName',
              col: 12,
            },
            {
              label: '路段管辖单位',
              key: 'squadronName',
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
    .TrafficAccident-wrapper{
        height: 100%;
    }
</style>


















