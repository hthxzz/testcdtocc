<template>
  <div class="wrap">
    <div class="search-panel" v-if="showSearchPanel" v-loading.fullscreen.lock="fullscreenLoading">
      <!-- handleAdd打开添加表单 -->
      <!-- searchConfig搜索配置 -->
      <!-- getSearchValue得到搜索值 -->
      <SearchPanel
        :direction="direction"
        :searchConfig="searchConfig"
        @getSearchValue="getSearchValue"
        @handleQuery="handleQuery"
        @handleAdd="handleAdd"
        @addClick="addClick"
      />
    </div>

    <div class="table-content">
      <slot></slot>
    </div>
    <div class="pagination" v-if="showPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next,total"
        :total="total"
        background
      ></el-pagination>
    </div>
    <AddForm :AddFormConfig="AddFormConfig" v-if="hasAddFormConfig" @close="close"></AddForm>
    <DetailForm :detailFormConfig="detailFormConfig" v-if="hasDetailFormConfig" @close="close"></DetailForm>
  </div>
</template>


<script>
import tablePaginationMixin from "./tablePaginationMixin";
// import { AddFormConfig } from "../common/addForm/AddFormConfig.js";
export default {
  name: "TableAndPagination",
  mixins: [tablePaginationMixin],
  computed: {
    fullscreenLoading() {
      return this.$store.state.app.fullscreenLoading;
    },
    // 是否渲染详情组件
    hasDetailFormConfig() {
      return this.$props.detailFormConfig && this.$props.detailFormConfig.url
        ? true
        : false;
    },
    // 是否渲染添加组件
    hasAddFormConfig() {
      return this.$props.AddFormConfig && this.$props.AddFormConfig.url
        ? true
        : false;
    },
    // 是否渲染 搜索组件
    isShowSearchPanel() {
      return this.searchConfig ? true : false;
    }
  },
  props: {
    showSearchPanel: {
      type: Boolean,
      default: true
    },
    searchConfig: {},
    showPagination: {
      type: Boolean,
      default: true
    },
    colConfigList: {},

    operationList: {},
    // 添加配置
    AddFormConfig: {},
    // 详情配置
    detailFormConfig: {},
    direction: {
      default: "row"
    }
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
      // this.fetchTableData();
      this.$emit("getSearchValue", data);
    },
    //
    handleAdd(index, row) {
      this.$props.AddFormConfig.dialogFormVisible = true;
      //  this.$emit("handleAdd", index);
    },
    addClick(index, row) {
      // this.$props.AddFormConfig.dialogFormVisible = true;
      this.$emit("addClick", index);
    },
    handleQuery(index, row) {
      this.$props.AddFormConfig.dialogFormVisible = true;
      // this.$emit("handleAdd", index);
    },
    handleEdit(index, row) {
      this.$emit("handleEdit", index);
    },
    handleDetail(index, row) {
      // this.$store.state.app.fullscreenLoading = true;
      this.$emit("handleDetail", row);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
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
      loading: false,
      // AddFormConfig:AddFormConfig,
      formLabelWidth: "120px",
      dialogFormVisible: true
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
    // height: 50px;
    // flex: 60;
    flex-basis: 34px;
  }
  .table-content {
    flex: 600;
    margin-top: 10px;
    height: calc(100% - 80px);
  }
  .pagination {
    flex-basis: 30px;
    background-color: #0a1e53;
    text-align: left;
  }
}
</style>