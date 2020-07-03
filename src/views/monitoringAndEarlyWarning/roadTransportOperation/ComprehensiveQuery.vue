<template>
  <div class="ComprehensiveQuery-wrapper nomap-content-container">
    <!-- 搜索条件 -->
    <section class="search-wrapper">
      <SearchPanel
        :searchConfig="searchConfig"
        @getSearchValue="getSearchValue"
        @handleQuery="handleQuery"
      ></SearchPanel>
    </section>
    <section class="content-wrapper">
      <h2>
        为你找到
        <span>{{ resultNo }}</span> 条相关内容
      </h2>
      <div class="list-wrapper">
        <!-- 左侧list内容 -->
        <SearchContentOne v-if="type1"></SearchContentOne>
        <SearchContentTwo v-if="type2"></SearchContentTwo>
        <SearchContentThree v-if="type3"></SearchContentThree>
        <!-- 分页组件 -->
        <div class="Pagination-wrapper">
          <el-pagination
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
      </div>
      <!-- 右侧详情 -->
      <div class="detail-wrapper">
        <StaticTableScrollContainer>
          <jtwf></jtwf>
        </StaticTableScrollContainer>
      </div>
    </section>
  </div>
</template>
<script>
import SearchContentOne from "./components/ComprehensiveQuery/SearchContentOne.vue";
import SearchContentTwo from "./components/ComprehensiveQuery/SearchContentTwo.vue";
import SearchContentThree from "./components/ComprehensiveQuery/SearchContentThree.vue";
import jtwf from "./components/ComprehensiveQuery/Jtwf.vue";
export default {
  name: "",
  components: {
    SearchContentOne,
    SearchContentTwo,
    SearchContentThree,
    jtwf
  },
  methods: {
    getSearchValue(content) {},
    handleQuery(content) {
      console.log(content);
      const type1 = ["从业资格证号", "姓名", "身份证号"];
      const type2 = ["运输证号", "车牌号"];
      const type3 = ["经营许可证号", "经营业户"];
      if (type1.indexOf(content.cxnx) != -1) {
        this.type1 = true;
        this.type2 = false;
        this.type3 = false;
      } else if (type2.indexOf(content.cxnx) != -1) {
        this.type1 = false;
        this.type2 = true;
        this.type3 = false;
      } else if (type3.indexOf(content.cxnx) != -1) {
        this.type1 = false;
        this.type2 = false;
        this.type3 = true;
      }
    }
  },
  data() {
    return {
      type1: true,
      type2: false,
      type3: false,
      total: 100,
      pageSize: 10,
      resultNo: 100,
      searchConfig: {
        searchCondition: [
          {
            order: 36,
            type: "select",
            label: "查询类型",
            placeholder: "查询类型",
            VModelvalue: {
              name: "cxnx",
              defaultValue: "从业资格证号"
            },
            options: [
              {
                value: "全部",
                label: "全部"
              },
              {
                value: "从业资格证号",
                label: "从业资格证号"
              },
              {
                value: "姓名",
                label: "姓名"
              },
              {
                value: "身份证号",
                label: "身份证号"
              },
              {
                value: "运输证号",
                label: "运输证号"
              },
              {
                value: "车牌号",
                label: "车牌号"
              },
              {
                value: "经营许可证号",
                label: "经营许可证号"
              },
              {
                value: "经营业户",
                label: "经营业户"
              }
            ]
          },

          {
            order: 1,
            type: "input",
            label: "查询内容",
            // width: "123px",
            placeholder: "查询内容",
            VModelvalue: {
              name: "cxnr",
              defaultValue: ""
            }
          },
          {
            order: 14,
            otype: "week",
            type: "daterange",
            formate: "yyyy-MM-dd",
            label: "时间",
            placeholderStart: "开始时间",
            placeholderEnd: "截止时间",
            VModelvalue: {
              name: "sj",
              defaultValue: ""
            }
          }
        ],
        searchButtonGroup: [
          {
            action: "query",
            label: "查询"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.ComprehensiveQuery-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .search-wrapper {
    flex-basis: 40px;
  }
  .content-wrapper {
    flex: 1;
    // border: 1px solid red;
    display: flex;
    position: relative;
    h2 {
      position: absolute;
      margin: 20px 0;
      span {
        color: #ffff00;
      }
    }
    .list-wrapper {
      flex: 1.6;
      width: 450px;
      // border: 1px solid red;
      margin-top: 50px;
      // padding-top: 30px;
    }
    .detail-wrapper {
      flex: 1;
      margin-left: 50px;
    }
  }
}

.Pagination-wrapper {
  position: absolute;
  bottom: 6px;
  // margin-top: 40px;
}
</style>