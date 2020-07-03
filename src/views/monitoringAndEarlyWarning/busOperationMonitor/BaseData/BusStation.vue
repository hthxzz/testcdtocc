<template>
  <!-- 公交运行监测 -- 基础 数据 -- 公交站 -->
  <div class="BusStation-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="站点编号" prop="stationId"></el-table-column>
            <el-table-column label="站点名称" prop="stationName"></el-table-column>
            <el-table-column label="所属区域" prop="districtCode"></el-table-column>
            <el-table-column label="站牌类型" prop="boardTypeCode"></el-table-column>
            <el-table-column label="候车亭" prop="isShelter"></el-table-column>
            <el-table-column label="港湾式站点" prop="isBay"></el-table-column>
            <el-table-column label="站台长度(米)" prop="stationLength"></el-table-column>
            <el-table-column label="经度" prop="longitude"></el-table-column>
            <el-table-column label="纬度" prop="latitude"></el-table-column>
            <el-table-column label="途径线路" prop="passLineId"></el-table-column>
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
      url:"/gjjc_busBaseInfo/getGjBusStationList",
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
            label: "途经线路",
            placeholder: "途经线路",
            VModelvalue: {
              name: "passLineName",
              defaultValue: ""
            },
          },
          {
            order: 3,
            type: "input",
            label: "站点名称",
            placeholder: "站点名称",
            VModelvalue: {
              name: "stationName",
              defaultValue: ""
            },
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
        url: '/gjjc_busBaseInfo/getGjBusStationById',
        show: false,
        title: '公交车站信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '站点编号',
              key: 'stationId',
              col: 12,
            },
            {
              label: '站点名称',
              key: 'stationName',
              col: 12,
              formate: function (val) {
                return val;
              }
            }
          ],
          [
            {
              label: '车站位置',
              key: 'location',
              col: 12,
            },
            {
              label: '行政区域',
              key: 'districtCode',
              col: 12,
            }
          ],
          [
            {
              label: '站点类型',
              key: 'stationTypeCode',
              col: 12,
            },
            {
              label: '车站设置类型',
              key: 'settingTypeCode',
              col: 12,
            }],
          [
            {
              label: '是否有候车亭',
              key: 'isShelter',
              col: 12,
            }, {
            label: '站牌类型',
            key: 'boardTypeCode',
            col: 12,
          }],
          [
            {
              label: '站台长度',
              key: 'stationLength',
              col: 12,
            },
            {
              label: '是否BRT车站',
              key: 'isBrt',
              col: 12,
            }],
          [
             {
            label:'车站经度',
            key: 'longitude',
            col: 12,
          },
            {
              label: '车站纬度',
              key: 'latitude',
              col: 12,
            },
          ],
          [
            {
              label: '是否公交走廊式停靠站',
              key: 'isCorridor',
              col: 12,
            },
            {
              label: '是否为枢纽站',
              key: 'isHub',
              col: 12,
            },
          ],
          [
            {
              label: '是否港湾式停靠站',
              key: 'isBay',
              col: 12,
            },
            {
              label: '港湾式停靠站停车数',
              key: 'bayNum',
              col: 12,
            },
          ],
          [
            {
              label: '途经线路',
              key: 'passLineName',
              col: 12,
            },
            {
              label: '车站状态',
              key: 'stationStatusCode',
              col: 12,
            },
          ],

        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
    .BusStation-wrapper{
        height: 100%;
    }
</style>











