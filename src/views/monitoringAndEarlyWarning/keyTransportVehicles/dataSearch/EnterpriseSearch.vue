<template>
  <!-- 车辆运行监测 -- 经营业户查询数据 -- 车辆信息 -->
  <div class="vehicleInfo-wrapper nomap-content-container">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column label="序号"  type="index" width="100" ></el-table-column>
            <el-table-column label="行政区划" prop="districtCode">
              <template slot-scope="scope">
                <label v-if="scope.row.districtCode==510104">锦江区</label>
                <label v-else-if="scope.row.districtCode==510105">青羊区</label>
                <label v-else-if="scope.row.districtCode==510106">金牛区</label>
                <label v-else-if="scope.row.districtCode==510107">武侯区</label>
                <label v-else-if="scope.row.districtCode==510108">成华区</label>
                <label v-else-if="scope.row.districtCode==510112">龙泉驿区</label>

                <label v-else-if="scope.row.districtCode==510113">青白江区</label>
                <label v-else-if="scope.row.districtCode==510114">新都区</label>
                <label v-else-if="scope.row.districtCode==510115">温江区</label>
                <label v-else-if="scope.row.districtCode==510116">双流区</label>
                <label v-else-if="scope.row.districtCode==510117">郫都区</label>

                <label v-else-if="scope.row.districtCode==510121">金堂县</label>
                <label v-else-if="scope.row.districtCode==510129">金牛区</label>
                <label v-else-if="scope.row.districtCode==510107">大邑县</label>
                <label v-else-if="scope.row.districtCode==510131">蒲江县</label>
                <label v-else-if="scope.row.districtCode==510132">新津县</label>

                <label v-else-if="scope.row.districtCode==510181">都江堰市</label>
                <label v-else-if="scope.row.districtCode==510182">彭州市</label>
                <label v-else-if="scope.row.districtCode==510183">邛崃市</label>
                <label v-else-if="scope.row.districtCode==510184">崇州市</label>
                <label v-else-if="scope.row.districtCode==510185">简阳市</label>
                <label v-else></label>
              </template>
            </el-table-column>
            <el-table-column label="所属行业" prop="industry">
              <template slot-scope="scope">
                <label v-if="scope.row.industry==111">班线客运</label>
                <label v-else-if="scope.row.industry==114">包车客运</label>
                <label v-else-if="scope.row.industry==140">危货运输</label>
                <label v-else-if="scope.row.industry==112">公交运输</label>
                <label v-else-if="scope.row.industry==113">巡游出租</label>
                <label v-else-if="scope.row.industry==115">网约出租</label>
                <label v-else></label>
              </template>
            </el-table-column>
            <el-table-column label="企业编号" prop="enterpriseId" width="" show-overflow-tooltip></el-table-column>
            <el-table-column label="经营业户" prop="enterpriseName" width="" show-overflow-tooltip></el-table-column>
            <el-table-column label="经营范围" prop="bussinessScopeCode" width="" show-overflow-tooltip></el-table-column> 
            <el-table-column label="法人代表" prop="legalName"></el-table-column>
            <el-table-column label="联系方式" prop="picTel"></el-table-column>
            <el-table-column label="经营许可证" prop="licenseAbbr"></el-table-column>
            <el-table-column label="证书有效期" prop="effectiveDate"></el-table-column>
            <el-table-column label="操作" width="60px;">
              <template slot-scope="scope">
                <el-button size="mini" class="table-detail-btn" @click="handleDetail1(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </TableAndPagination>
        <EnterpriseSearchDetailForm  :enterpriseId="enterpriseId" :enterpriseName="enterpriseName" :show="detailFormShow"  @hideDetailForm="hideDetailForm" ref="detail"/>

  </div>
</template>
<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import EnterpriseSearchDetailForm from "./EnterpriseSearchDetailForm.vue";
export default {
  name: "",
  mixins: [tableMixins],
  components:{
    EnterpriseSearchDetailForm
  },
  methods:{
      getAdministrativeDivision(){
      this.$http
        .$get("zdjc_AlertSettingHandler/getAdministrativeDivision")
        .then(res => {
          let options = [{
                        value: '',
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
    },handleDetail1(row){
      debugger;
      let enterpriseId = row.enterpriseId;
      let enterpriseName = row.enterpriseName;

      this.enterpriseId = enterpriseId;
      this.enterpriseName = enterpriseName;
      this.detailFormShow = true;
      this.$refs.detail.getEnterpriseDetails(enterpriseId,enterpriseName);
      
    },openDetailForm(){
      this.detailFormShow = true;
    },
    hideDetailForm(){
      this.detailFormShow = false;
    },
  },
  mounted() {
   this.getAdministrativeDivision();
  },
  data() {
    return {
      title: "",
      url: "zdjc_basicDataQueryHandler/getEnterpriseByPage",
      enterpriseId:'',
      enterpriseName:'',
      detailFormShow:false,
      searchConfig: {
        searchCondition: [
          {
            order: 36,
            type: "select",
            dataType:'int',
            label: "行政区划",
            placeholder: "",
            VModelvalue: {
              name: "districtCode",
              defaultValue: ""
            },
            options: []
          },
          {
            order: 13,
            type: "select",
            dataType:'int',
            label: "所属行业",
            placeholder: "",
            VModelvalue: {
              name: "industry",
              defaultValue: ""
            },              
            options: [{
                        value: 0,
                        label: '全部'
                    },{
                        value: 111,
                        label: '班线客运'
                    }, {
                        value: 114,
                        label: '包车客运'
                    }, {
                        value: 140,
                        label: '危货运输'
                    }, {
                        value: 112,
                        label: '公交运输'
                    }, {
                        value: 113,
                        label: '巡游出租'
                    }, {
                        value: 115,
                        label: '网约出租'
                    }
          
            ]
          },
          {
            order: 3,
            type: "input",
            label: "经营业户",
            placeholder: "",
            VModelvalue: {
              name: "enterpriseName",
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
        title: '经营业户信息详情',
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

