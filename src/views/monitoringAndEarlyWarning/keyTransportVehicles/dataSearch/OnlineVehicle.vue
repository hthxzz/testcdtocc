<template>
  <!-- 车辆运行监测 -- 营运车辆查询数据 -- 车辆信息 -->
  <div class="vehicleInfo-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="序号"  type="index" width="100" ></el-table-column>
            <el-table-column label="车牌号" prop="vehicleNo"></el-table-column>
            <el-table-column label="营运状态" prop="operationStatus"></el-table-column>
            <el-table-column label="所属行业" prop="vehicleTypeName"></el-table-column>
            <el-table-column label="在线状态" prop="statusName"></el-table-column>
            <el-table-column label="业户名称" prop="enterprise"></el-table-column>
            <el-table-column label="最后上线时间" prop="lastTime">
              <template slot-scope="scope">
                {{scope.row.lastTime|formatDate}}
              </template>
            </el-table-column>
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
import {_formatDate} from "../../../../components/common/common.js";
export default {
  name: "",
  mixins: [tableMixins],
  filters: {
            formatDate(time) {
            if (time<0) return '0000-00-00 00:00:00';
            let date = new Date(time/1);
            return _formatDate(date, 'yyyy-MM-dd hh:mm:ss') //年-月-日 时分
            }
  },

  methods:{
    handleDetail(index,row){
      debugger;
      let cph = row.vehiclePlateNum;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});

    }, getSearchValue(content){
                 let vehicleNo = "";
                 let enterpriseName = "";
                 for(let i in content){
                   if(content[i].columnName == "vehicleNo"){
                    vehicleNo = content[i].queryValue;
                   }
                   if(content[i].columnName == "enterpriseName"){
                    enterpriseName = content[i].queryValue;
                   }

                 }
                 
                 let page = 1;
                 let pageSize = 10;
             this.$http.$get("zdjc_basicDataQueryHandler/getOnlineVehicleByPage",{"vehicleNo":vehicleNo,"enterpriseName":enterpriseName,"page":page}).then((param) => {
                //this.dealWithData(param);
                this.tableData = param.results;
                this.total = param.totalRecordNum;
              });
    }
  },
  data() {
    return {
      title: "",
      url: "zdjc_basicDataQueryHandler/getOnlineVehicleByPage",
      searchConfig: {
        searchCondition: [
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
              name: "enterpriseName",
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
      height: calc(100% - 40px);
      margin-top: 40px;      
    }
</style>

