<template>
  <!-- 公交运行监测 -- 基础 数据 -- 线路信息 -->
  <div class="lineInfor-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="线路名称" prop="lineName"></el-table-column>
            <el-table-column label="区域" prop="regionCode"></el-table-column>
            <el-table-column label="线路级别" prop="lineLevelCode"></el-table-column>
            <el-table-column label="所属组织" prop="enterpriseId"></el-table-column>
            <el-table-column label="有效期" prop="lineTerm"></el-table-column>
            <el-table-column label="负责人" prop="chargeName"></el-table-column>
            <el-table-column label="配车数" prop="busNum"></el-table-column>
            <el-table-column label="有效" prop="lineStatusCode"></el-table-column>
            <el-table-column label="起点站" prop="originName"></el-table-column>
            <el-table-column label="终点站" prop="destinationName"></el-table-column>
            <el-table-column label="车站数" prop="stationNum"></el-table-column>
            <el-table-column label="配车数" prop="busNum"></el-table-column>
            <el-table-column label="峰段" prop="lineformantId"></el-table-column>
            <el-table-column label="限速标准" prop="speedlimitStandard"></el-table-column>
            <!-- <el-table-column label="关注状态">
                                <template slot-scope="scope">
                                <img src="./img/gz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '关注'" >   <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.statu == '关注' ">{{ scope.row.statu }}</span>
                                <img src="./img/wgz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '未关注' " >  <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.statu == '未关注' ">{{ scope.row.statu }}</span>
                                </template>
            </el-table-column>-->
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
      url:'/gjjc_busBaseInfo/getGjBusLineList',
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
            label: "公司名称",
            placeholder: "公司名称",
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
            order: 3,
            type: "input",
            label: "线路名称",
            placeholder: "线路名称",
            VModelvalue: {
              name: "lineName",
              defaultValue: ""
            },
          },
          {
            order: 3,
            type: "select",
            label: "线路级别",
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
                label: "干线"
              },
              {
                value: "2",
                label: "支线"
              },
              {
                value: "3",
                label: "微线"
              }

            ]
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
        url: '/gjjc_busBaseInfo/getGjBusLineById',
        show: false,
        title: '车辆信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '线路编号',
              key: 'lineId',
              col: 12,
            },
            {
              label: '线路名称',
              key: 'lineName',
              col: 12,
              formate: function (val) {
                return val;
              }
            }
          ],
          [
            {
              label: '线路级别',
              key: 'lineLevelCode',
              col: 12,
            },
            {
              label: '线路长度',
              key: 'lineLength',
              col: 12,
            }
          ],
          [
            {
              label: '所属企业',
              key: 'enterpriseId',
              col: 12,
            },
            {
              label: '运营区域',
              key: 'regionCode',
              col: 12,
            }],
          [
            {
              label: '专用道长度',
              key: 'laneLength',
              col: 12,
            }, {
            label: '线路类别',
            key: 'lineTypeCode',
            col: 12,
          }],
          [
            {
              label: '配车数',
              key: 'busNum',
              col: 12,
            },
            {
              label: '车站数',
              key: 'stationNum',
              col: 12,
            }],
          [
            {
              label: '起点站',
              key: 'originName',
              col: 12,
            }, {
            label: '终点站',
            key: 'destinationName',
            col: 12,
          }],
          [
            {
              label: '开通运营日期',
              key: 'lineSdate',
              col: 12,
            },
            {
              label: '线路经营期限',
              key: 'lineSdate',
              col: 12,
            },
          ],
          [
            {
              label: '夏季首班发车日期',
              key: 'sumfirstTime',
              col: 12,
            },
            {
              label: '夏季末班发车日期',
              key: 'sumfinalTime',
              col: 12,
            },
          ],
          [
            {
              label: '冬季首班发车日期',
              key: 'winfirstTime',
              col: 12,
            },
            {
              label: '冬季末班发车日期',
              key: 'winfinalTime',
              col: 12,
            },
          ],
          [
            {
              label: '负责人',
              key: 'chargeName',
              col: 12,
            },
            {
              label: '是否准循环',
              key: 'routeType',
              col: 12,
            },
          ],
          [
            {
              label: '线路状态',
              key: 'lineStatusCode',
              col: 12,
            },
            {
              label: '票价',
              key: 'ticketPrice',
              col: 12,
            },
          ],
          [
            {
              label: '限速标准',
              key: 'speedlimitStandard',
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
    .lineInfor-wrapper{
        height: 100%;
    }
</style>




