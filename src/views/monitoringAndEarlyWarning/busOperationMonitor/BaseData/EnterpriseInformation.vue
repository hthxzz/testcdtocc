<template>
  <!-- 公交运行监测 -- 基础 数据 -- 企业信息 -->
  <div class="enterpriseInfo-wrapper">
        <TableAndPagination :searchConfig="searchConfig"
                            :detailFormConfig="detailFormConfig"
                            :totalP=total
                            @fetchTableData="fetchTableData"
                            @handleDetail="handleDetail"
                            @getSearchValue="getSearchValue">
          <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column label="企业编号" prop="enterpriseId"></el-table-column>
            <el-table-column label="公司名称" prop="enterpriseName"></el-table-column>
            <el-table-column label="驾驶员数量" prop="driverNum"></el-table-column>
            <el-table-column label="人员数量" prop="personNum"></el-table-column>
            <el-table-column label="车辆数量" prop="vehicleNum"></el-table-column>
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
      url: "/gjjc_busBaseInfo/getGgEnterpriseinfoList",
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
          }
        ],
        searchButtonGroup: [
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
      // 表单详情配置
      detailFormConfig: {
        // 表单详情请求地址
        url: '/gjjc_busBaseInfo/getGjEnterpriseinfoById',
        show: false,
        title: '企业信息详情',
        // 是否显示x按钮
        showCancel: true,
        id: '',
        data: [
          [
            {
              label: '企业编号',
              key: 'enterpriseId',
              col: 12,
            },
            {
              label: '公司名称',
              key: 'enterpriseName',
              col: 12,
              formate: function (val) {
                return val;
              }}
          ],
          [{
            label: '车辆数',
            key: 'vehicleNum',
            col: 12,
          }, {
            label: '从业人员数量',
            key: 'personNum',
            col: 12,
          }],
          [
            {
              label: '驾驶员数量',
              key: 'driverNum',
              col: 12,
            }],


        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
    .enterpriseInfo-wrapper{
        height: 100%;
    }
</style>