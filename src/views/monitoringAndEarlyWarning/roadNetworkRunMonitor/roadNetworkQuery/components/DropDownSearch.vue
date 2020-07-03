<template>
  <div class="drop-down-search-container">
    <div class="search-wrap">
      <div class="search-key">
        <el-input v-model="searchName" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="search-result">
        <ul class="result-list">
          <li
            v-for="item in itemList"
            class="item"
            @click="getValue($event)"
            :data-value="item.keyName"
            :key="item.uid"
            v-html="item.name"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getUniqueID } from "@/untils/dom.js";
import _ from "lodash";

export default {
  name: "",
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    getValue($event) {
      let value = $event.currentTarget.getAttribute("data-value");
      this.searchName = value;
    }
  },
  data() {
    return {
      value: "",
      all: [
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
        { uid: getUniqueID(), name: "双河大桥" },
        { uid: getUniqueID(), name: "机耕桥" },
        { uid: getUniqueID(), name: "汪水湾碾桥" },
      ],
      itemList: [
        // { name: "双河大桥" },
        // { name: "机耕桥" },
        // { name: "汪水湾碾桥" }
      ],
      searchName: ""
    };
  },
  watch: {
    searchName(search) {
      let all = _.cloneDeep(this.all);
      this.itemList = [];

      const searchValue = search.split("");

      all.forEach(element => {
        element.keyName = element.name;
      });
      this.$nextTick(() => {
        if (search.length == 0) {
          this.itemList = all;
          return;
        }
        this.itemList = all.map(val => {
          let flag = false;
          
          for (const key in searchValue) {
            if (val.name.indexOf(searchValue[key]) != -1) {
              flag = true;
              val.name = val.name.replace(
                searchValue[key],
                `<span style="color:red">${searchValue[key]}</span>`
              );
              continue;
            }
            return false;
          }
          return flag
            ? {
                name: val.name,
                uid: val.uid,
                keyName:val.keyName
              }
            : false;
        });
        this.itemList = this.itemList.filter(val => {
          return val && val.uid;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.drop-down-search-container {
  .search-wrap {
    width: 297px;
    .search-key {
      width: 100%;
    }
    .search-result {
      max-height: 200px;
      .result-list {
        padding-left: 0;
        max-height: 200px;
        overflow-y: auto;
        text-align: left;
        width: 296px;
        // height: 122px;
        background: rgba(9, 28, 74, 1);
        border: 1px solid rgba(32, 86, 221, 1);
        opacity: 0.8;
        .item {
          list-style: none;
          height: 36px;
          cursor: pointer;
          padding-left: 6px;
          line-height: 36px;
        }
      }
    }
  }
}
</style>