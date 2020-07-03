<template>
  <!-- 车辆查询 -- 车辆驾驶员及押解员 -->
  <div class="vehicleInfo-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="序号"  type="index" width="100" ></el-table-column>
            <el-table-column label="驾驶员姓名" prop="vehiclePlateNum"></el-table-column>
            <el-table-column label="发证机关" prop="vehiclePlateNum"></el-table-column>
            <el-table-column label="身份证号" prop="vehicleId"></el-table-column>
            <el-table-column label="从业资格证号码" prop="vehicleId"></el-table-column>
            <el-table-column label="记录时间" prop="vehicleId"></el-table-column>
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
      let cph = row.vehiclePlateNum;
      this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehic les/operaterMonitor/vehiclesSearch', query: {"input_cph": cph}});

    }
  },
  data() {
    return {
      title: "",
      url: "/gjjc_busBaseInfo/getGjBusinfoList",
      searchConfig: {
        searchCondition: [{
            type: "daterange",
            formate: "yyyy-MM-dd",
            label: "时间",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
                name: "dateRange",
                defaultValue: "4"
            }
        }
        ],
        searchButtonGroup:  [
          {
            action: "query",
            label: "查询"
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
      margin:8px 8px 8px 8px;
      background:rgba(0,79,197,.4);
    }
</style>

