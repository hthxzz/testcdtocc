<template>
  <!-- 公交运行监测 -- 基础 数据 -- 公交场站 -->
  <div class="VehicleInfo-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="场站名称" prop="depotName"></el-table-column>
            <el-table-column label="地址" prop="depotAddress"></el-table-column>
            <el-table-column label="行政区划" prop="districtCode"></el-table-column>
            <el-table-column label="类型" prop="depotTypeCode"></el-table-column>
            <el-table-column label="面积" prop="depotArea"></el-table-column>
            <el-table-column label="容量" prop="depotCapacity"></el-table-column>
            <el-table-column label="实际停车数量" prop="parkingNum"></el-table-column>
            <el-table-column label="经度" prop="longitude"></el-table-column>
            <el-table-column label="纬度" prop="latitude"></el-table-column>
            <el-table-column label="用途" prop="depotUse"></el-table-column>
            <el-table-column label="停靠路线" prop="operationLine"></el-table-column>
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
      url:"/gjjc_busBaseInfo/getGjBusDepotList",
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
            label: "场站类型",
            placeholder: "",
            VModelvalue: {
              name: "depotTypeCode",
              defaultValue: "1"
            },
            options: [
              {
                value: "1",
                label: "全部"
              },
              {
                value: "2",
                label: "首末站"
              },
              {
                value: "3",
                label: "停车及保养"
              }
              
            ]
          },
          {
            order: 3,
            type: "input",
            label: "停靠线路",
            placeholder: "停靠线路",
            VModelvalue: {
              name: "operationLine",
              defaultValue: ""
            },
          },
          {
            order: 3,
            type: "input",
            label: "场站名称",
            placeholder: "场站名称",
            VModelvalue: {
              name: "depotName",
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
        url: '/gjjc_busBaseInfo/getGjBusDepotById',
        show: false,
        title: '公交场站信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '场站编号',
              key: 'depotId',
              col: 12,
            },
            {
              label: '场站名称',
              key: 'depotName',
              col: 12,
              formate: function (val) {
                return val;
              }
            }
          ],
          [
            {
              label: '场站位置',
              key: 'depotAddress',
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
              label: '用途',
              key: 'depotUse',
              col: 12,
            },
            {
              label: '权属类型',
              key: 'ownershipTypeCode',
              col: 12,
            }],
          [
            {
              label: '场站类型',
              key: 'depotTypeCode',
              col: 12,
            }, {
            label: '营运线路',
            key: 'operationLine',
            col: 12,
          }],
          [
            {
              label: '场站容量',
              key: 'depotCapacity',
              col: 12,
            },
            {
              label: '实际停车数量',
              key: 'parkingNum',
              col: 12,
            }],
          [
            {
              label: '场站面积',
              key: 'depotArea',
              col: 12,
            }, {
            label: '经度',
            key: 'longitude',
            col: 12,
          }],
          [
            {
              label: '纬度',
              key: 'latitude',
              col: 12,
            },
            {
              label: '联系人',
              key: 'chargeName',
              col: 12,
            },
          ],
          [
            {
              label: '联系电话',
              key: 'chargeTel',
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
    .VehicleInfo-wrapper{
        height: 100%;
    }
</style>











