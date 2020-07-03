<template>
  <!-- 公交运行监测 -- 基础 数据 -- 车辆信息 -->
  <div class="vehicleInfo-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="车辆自编号" prop="vehicleId"></el-table-column>
            <el-table-column label="车牌号" prop="vehiclePlateNum"></el-table-column>
            <el-table-column label="线路" prop="vehicleRoute"></el-table-column>
            <el-table-column label="所属公司" prop="enterpriseId"></el-table-column>
            <el-table-column label="所属车队" prop="fleetNo"></el-table-column>
            <el-table-column label="车辆型号" prop="busTypeCode"></el-table-column>
            <el-table-column label="车辆状态" prop="busStatusCode">
              <template slot-scope="scope">
                <label v-if="scope.row.busStatusCode==0">正常</label>
                <label v-else-if="scope.row.busStatusCode==1">报废</label>
                <label v-else-if="scope.row.busStatusCode==2">封存</label>
                <label v-else-if="scope.row.busStatusCode==3">临停</label>
                <label v-else-if="scope.row.busStatusCode==4">新车待分配</label>
                <label v-else-if="scope.row.busStatusCode==5">借出</label>
                <lable v-else>不正常</lable>
              </template>
            </el-table-column>
            <el-table-column label="核定载客数" prop="busCapacity"></el-table-column>
            <el-table-column label="座位数" prop="seatNum"></el-table-column>
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
      url: "/gjjc_busBaseInfo/getGjBusinfoList",
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
          //   order: 3,
          //   type: "select",
          //   label: "是否有效",
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
          //       label: "无效"
          //     },
          //     {
          //       value: "2",
          //       label: "有效"
          //     }
          //
          //   ]
          // },
          {
            order: 36,
            type: "select",
            label: "经营企业",
            placeholder: "经营企业",
            VModelvalue: {
              name: "enterpriseId",
              defaultValue: ""
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
            label: "线路名称",
            placeholder: "线路名称",
            VModelvalue: {
              name: "vehicleRoute",
              defaultValue: ""
            },
          },
          {
            order: 3,
            type: "input",
            label: "车牌号",
            placeholder: "车牌号",
            VModelvalue: {
              name: "vehiclePlateNum",
              defaultValue: ""
            },
          },
          {
            order: 3,
            type: "input",
            label: "车辆编号",
            placeholder: "车辆编号",
            VModelvalue: {
              name: "vehicleId",
              defaultValue: ""
            },
          },
          {
            order: 36,
            type: "select",
            label: "车辆状态",
            placeholder: "车辆状态",
            VModelvalue: {
              name: "busStatusCode",
              defaultValue: ""
            },
            options: [
              {
                value: "0",
                label: "正常"
              },
              {
                value: "1",
                label: "报废"
              },
              {
                value: "2",
                label: "封存"
              },
              {
                value: "3",
                label: "临停"
              },
              {
                value: "4",
                label: "新车待分配"
              },
              {
                value: "5",
                label: "借出"
              }

            ]
          },
          // {
          //   order: 36,
          //   type: "select",
          //   label: "燃料类型",
          //   placeholder: "燃料类型",
          //   VModelvalue: {
          //     name: "busStatusCode",
          //     defaultValue: ""
          //   },
          //   options: [
          //     {
          //       value: "0",
          //       label: "天然气"
          //     },
          //     {
          //       value: "1",
          //       label: "电动"
          //     },
          //     {
          //       value: "2",
          //       label: "油电"
          //     }
          //
          //   ]
          // },
        ],
        searchButtonGroup:  [
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
        url: '/gjjc_busBaseInfo/getGjBusinfoById',
        show: false,
        title: '车辆信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '车辆编号',
              key: 'vehicleId',
              col: 12,
            },
            {
              label: '车牌号',
              key: 'vehiclePlateNum',
              col: 12,
              formate: function (val) {
                return val;
              }
            }
          ],
          [
            {
              label: '车牌颜色',
              key: 'plateColorCode',
              col: 12,
              formate: function (val) {
                if (val == 1) {
                  return '蓝';
                } else if (val == 0) {
                  return '黄';
                } else if (val == 2) {
                  return '绿';
                } else {
                  return val;
                }
              }
            },
            {
              label: '是否BRT',
              key: 'isBrt',
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
              label: '所属车队',
              key: 'fleetNo',
              col: 12,
            }],
          [
            {
              label: '车辆型号',
              key: 'busTypeCode',
              col: 12,
            }, {
            label: '车辆等级',
            key: 'busLevelCode',
            col: 12,
          }],
          [
            {
              label: '车辆状态',
              key: 'busStatusCode',
              col: 12,
              formate: function (val) {
                if (val == 0) {
                  return '正常';
                } else if (val == 1) {
                  return '报废';
                } else if (val == 2) {
                  return '封存';
                } else if (val == 3) {
                  return '临停';
                } else if (val == 4) {
                  return '新车待分配';
                } else if (val == 2) {
                  return '借出';
                } else {
                  return '未定义';
                }
              }
            },
            {
            label: '线路号',
            key: 'vehicleRoute',
            col: 12,
          }],
          [
            {
              label: '核定载客量',
              key: 'busCapacity',
              col: 12,
            }, {
            label: '座位数',
            key: 'seatNum',
            col: 12,
          }],
          [
             {
            label: '是否新能源车',
            key: 'isEnergy',
            col: 12,
          }],

        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
    .vehicleInfo-wrapper{
        height: 100%;
    }
</style>

