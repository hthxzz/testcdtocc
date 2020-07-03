<template>
  <!-- 车辆运行监测 -- 从业人员查询数据 -- 车辆信息 -->
  <div class="vehicleInfo-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="序号"  type="index" width="100" ></el-table-column>
            <el-table-column label="姓名" prop="personName"></el-table-column>
            <el-table-column label="性别" prop="sexCode">
              <template slot-scope="scope">
                <label v-if="scope.row.sexCode==0">未知</label>
                  <label v-else-if="scope.row.sexCode==1">男</label>
                  <label v-else-if="scope.row.sexCode==1">女</label>
                  <label v-else>未知</label>
              </template>
            </el-table-column>
            <el-table-column label="证件号码" prop="cardId"></el-table-column>
            <el-table-column label="人员编码" prop="personId"></el-table-column>
            <el-table-column label="联系电话" prop="tel"></el-table-column>
            <el-table-column label="联系地址" prop="addr"></el-table-column>
            <el-table-column label="员工卡号" prop="staffcardId"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" class="table-detail-btn" @click="handleDetail1(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>
        <EmployedDetailForm  :personId="personId" :personName="personName" :cardId="cardId" :show="detailFormShow"  @hideDetailForm="hideDetailForm" ref="detail"/>
        <!--<detailForm :show="auditShow"  @hideAudit="hideAudit"/>-->
  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import EmployedDetailForm from "./EmployedDetailForm.vue";
export default {
  name: "",
  mixins: [tableMixins],
  components:{
    EmployedDetailForm
  },
  mounted() {
   this.getAdministrativeDivision();
  },
  methods:{
    handleDetail1(row){
      debugger;
      let personId = row.personId;
      let personName = row.personName;
      let cardId = row.cardId;
      this.personId = personId;
      this.personName = personName;
      this.cardId = cardId;
      this.detailFormShow = true;
      this.$refs.detail.getPersonDetails(personId,personName,cardId);
      
    },
    openDetailForm(){
      this.detailFormShow = true;
    },
    hideDetailForm(){
      this.detailFormShow = false;
    },
    getAdministrativeDivision(){
      debugger;
      this.$http
        .$get("zdjc_AlertSettingHandler/getAdministrativeDivision")
        .then(res => {
          let options = [{
                        value: '0',
                        label: '全部'
                    }];
          for(let i in res){
            let option = [];
            option.value = res[i].codeValue;
            option.label = res[i].codeName;
            options.push(option);
          }

          let searchConfig = this.searchConfig;
          let searchCondition = searchConfig.searchCondition;
          searchCondition[0].options = options ;

        });
    }
  },
  data() {
    return {
      title: "",
      url: "zdjc_basicDataQueryHandler/getPersonByPage",
      detailFormShow:false,
      personId:'',
      personName:'',
      cardId:'',
      searchConfig: {
        searchCondition: [
         /** {
            order: 36,
            type: "select",
            label: "行政区划",
            placeholder: "",
            VModelvalue: {
              name: "enterpriseId",
              defaultValue: ""
            },
            options: []
          }, 
          {
            order: 3,
            type: "input",
            label: "从业资格证号",
            placeholder: "",
            VModelvalue: {
              name: "vehiclePlateNum",
              defaultValue: ""
            },
          },*/
          {
            order: 3,
            type: "input",
            label: "姓名",
            placeholder: "",
            VModelvalue: {
              name: "personName",
              defaultValue: ""
            },
          },{
            order: 3,
            type: "input",
            label: "证件号码",
            placeholder: "",
            VModelvalue: {
              name: "cardId",
              defaultValue: ""
            },
          }
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
        title: '从业人员信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '姓名',
              key: 'vehicleId',
              col: 12,
            },
            {
              label: '从业资格证号',
              key: 'vehiclePlateNum',
              col: 12,
              formate: function (val) {
                return val;
              }
            }
          ],
          [
            {
              label: '联系电话',
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
              label: '联系地址',
              key: 'isBrt',
              col: 12,
            }
          ],
          [
            {
              label: '资格证有效期',
              key: 'enterpriseId',
              col: 12,
            },
            {
              label: '从业资格类别',
              key: 'fleetNo',
              col: 12,
            }],
          [
            {
              label: '驾驶证号',
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

