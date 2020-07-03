<template>
  <!-- 车辆运行监测 -- 入域车辆查询数据 -- 车辆信息 -->
  <div class="vehicleInfo-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="序号"  type="index" width="100" ></el-table-column>
            <el-table-column label="车牌号" prop="vehicleNo"></el-table-column>
            <el-table-column label="车牌颜色" prop="color">
              <template slot-scope="scope">
                    <span style="color:#00B050" v-if="scope.row.color === '绿色' ">{{ scope.row.color }}</span>
                    <span style="color:#FFFF00" v-else-if="scope.row.color === '黄色' ">{{ scope.row.color }}</span>
                    <span style="color:#FFFFFF" v-else-if="scope.row.color === '白色' ">{{ scope.row.color }}</span>
                    <span style="color:#2056DD" v-else-if="scope.row.color === '蓝色' ">{{ scope.row.color }}</span>
                    <span style="color:#667464" v-else-if="scope.row.color === '黑色' ">{{ scope.row.color }}</span>
                    <span style="color:#EE4D60" v-else-if="scope.row.color === '红色' ">{{ scope.row.color }}</span>
                </template>
            </el-table-column>
            <el-table-column label="车辆类型" prop="vehicleTypeName"></el-table-column>
            <el-table-column label="业户名称" prop="enterprise"></el-table-column>
            <el-table-column label="在线状态" prop="statusName"></el-table-column>
            <el-table-column label="域内上线时间" prop="onlineTime"></el-table-column>
            <el-table-column label="域内最后上线时间" prop="lastTime"></el-table-column>
            <!-- <el-table-column label="年审状态" prop="busStatusCode">
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
            <el-table-column label="关注状态">
                                <template slot-scope="scope">
                                <img src="./img/gz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '关注'" >   <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.statu == '关注' ">{{ scope.row.statu }}</span>
                                <img src="./img/wgz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '未关注' " >  <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.statu == '未关注' ">{{ scope.row.statu }}</span>
                                </template>
            </el-table-column>-->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" class="table-detail-btn" @click="handleDetail(scope.$index,scope.row)">详情</el-button>
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
  methods:{
    handleDetail(index,row){
      debugger;
      let cph = row.vehicleNo;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});

    }
  },
  data() {
    return {
      title: "",
      url: "zdjc_basicDataQueryHandler/getInVehicle",
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
            order: 3,
            type: "input",
            label: "车牌号",
            placeholder: "",
            VModelvalue: {
              name: "vehicleNo",
              defaultValue: ""
            },
          },
          {
            order: 3,
            type: "input",
            label: "业户名称",
            placeholder: "",
            VModelvalue: {
              name: "employeedName",
              defaultValue: ""
            },
          },
        ],
        searchButtonGroup:  [
          {
            action: "query",
            label: "查询"
          },
          {
            action: "export",
            label: "导出"
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
      margin-top: 40px;
      
    }
</style>

