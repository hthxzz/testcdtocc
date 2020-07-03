<template>
  <div class="wrap">
    <div class="search-panel" v-loading.fullscreen.lock="fullscreenLoading">
      <SearchPanel
        v-if="showSearchPanel"
        :searchConfigList="searchConfigList"
        :searchButtonList="searchButtonList"
        @getSearchValue="getSearchValue"
        @handleAdd="handleAdd"
      />
    </div>

    <div class="table-content">
      <el-table
        :data="tableData"
        header-row-class-name="headClass"
        :row-class-name="tableRowClassName"
        style="width: 100%;height:100%;overflow-y: auto"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column v-bind="item" v-for="item in colConfigList" :key="item.name"></el-table-column>
        <el-table-column label="关注状态">
          <template slot-scope="scope">
            <!-- <img src="./img/gz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '关注'" >   <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.statu == '关注' ">{{ scope.row.statu }}</span>
            <img src="./img/wgz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '未关注' " >  <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.statu == '未关注' ">{{ scope.row.statu }}</span>-->
            <slot></slot>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260px">
          <template slot-scope="scope">
            <el-button
              v-if="allowOperation('add')"
              size="mini"
              class="table-detail-btn"
              @click="handleAdd(scope.$index, scope.row)"
            >添加</el-button>
            <el-button
              v-if="allowOperation('edit')"
              size="mini"
              class="table-detail-btn"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              v-if="allowOperation('detail')"
              size="mini"
              class="table-detail-btn"
              @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              v-if="allowOperation('delete')"
              size="mini"
              class="table-detail-btn"
              @click="handleEdit(scope.$index, scope.row)"
            >定位</el-button>
            <el-button
              v-if="allowOperation('location')"
              size="mini"
              class="table-detail-btn"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-if="showPagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        background
      ></el-pagination>
    </div>
    <AddForm :AddFormConfig="formConfig" @close="close"></AddForm>
    <DetailForm :detailFormConfig="detailFormConfig" @close="close"></DetailForm>
  </div>
</template>


<script>
import tablePaginationMixin from "@/mixins/tablePaginationMixin";
// import { formConfig } from "../common/addForm/formConfig.js";
export default {
  name: "",
  mixins: [tablePaginationMixin],
  mounted() {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);
  },
  computed: {
    fullscreenLoading() {
      return this.$store.state.app.fullscreenLoading;
    }
  },
  props: {
    showSearchPanel: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    colConfigList: {},
    searchConfigList: {},
    operationList: {},
    formConfig: {},
    detailFormConfig: {}
  },
  methods: {
    close() {
      this.$emit("close");
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning";
      }
    },
    allowOperation(action) {
      return this.operationList.indexOf(action) == -1 ? false : true;
    },
    getSearchValue(data) {
      console.log(data);
      this.fetchTableData();
    },
    handleAdd(index, row) {
      console.log(index, row);
      this.$message.success("成功");
      this.$emit("handleAdd", index);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$emit("handleEdit", index);
    },
    handleDetail(index, row) {
      console.log(index, row);
      // this.$store.state.app.fullscreenLoading = true;
      this.$emit("handleDetail", row);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  data() {
    return {
      url: "/users/getUserByPage",
      loading: false,
      // formConfig:formConfig,
      formLabelWidth: "120px",
      dialogFormVisible: true,
      tableData: new Array(6).fill({
        name: "天府一街道路拥堵",
        sex: "男",
        address: "天府一街",
        birthday: "2019 / 08 / 23 15: 35",
        email: "从川大路东延线到益州大道中段 - 由西向东"
      })
    };
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-panel {
    height: 50px;
    // flex: 60;
    flex-basis: 34px;
  }
  .table-content {
    flex: 600;
    margin-top: 20px;
  }
  .pagination {
    flex-basis: 30px;
    background-color: #0a1e53;
    text-align: left;
  }
}
</style>