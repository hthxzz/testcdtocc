<template>
  <div class="search-panel-container">
    <div class="search-panel-wrap" :style="{flexDirection:direction}">
      <!-- 遍历表单配置项 -->
      <div
        class="item"
        v-for="item in searchConfig && searchConfig.searchCondition"
        :key="item.VModelvalue.name"
        :class="{colItem:colItem}"
        :style="{width:item.width + 'px'}"
      >
        <!-- select选择 -->
        <div class="select-wrap search-item-wrap" v-if="item.type == 'select'">
          <label for v-if="item.label" class="select-label search-item">{{ item.label }}</label>
          <el-select
            class="wrap-content"
            :filterable="item.filterable"
            :style="{width:item.width}"
            v-model="searchData[item.VModelvalue.name]"
            :placeholder="item.placeholder || '请选择' "
            :change="item.change"
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- input输入框 -->
        <div class="input-wrap search-item-wrap" v-if="item.type == 'input'">
          <label for v-if="item.label" class="input-label search-item">{{ item.label }}</label>
          <div class="input-w" :style="{width:item.width}">
            <el-input v-model="searchData[item.VModelvalue.name]" :placeholder="item.placeholder"></el-input>
          </div>
        </div>
        <!-- timePicker时间选择 -->
        <div
                class="daterange-wrap search-item-wrap"
                v-if="item.type == 'timeselect'"
        >
          <label for v-if="item.label" class="daterange-label search-item">{{ item.label }}</label>
          <el-time-select
                  v-model="searchData[item.VModelvalue.name]"
                  :picker-options="{ start: '00:00',step: '01:00', end: '24:00' }"
                  :placeholder="item.placeholder"
                  :default-value="item.VModelvalue.defaultValue"
          ></el-time-select>
        </div>
        <!-- 日期范围选择 -->
        <div
          class="daterange-wrap search-item-wrap"
          v-if="item.type == 'daterange' || item.type == 'datetimerange'  || item.type == 'monthrange' "
        >
          <label for v-if="item.label" class="daterange-label search-item">{{ item.label }}</label>
          <el-date-picker
            v-model="searchData[item.VModelvalue.name]"
            :type="item.type"
            align="right"
            unlink-panels
            range-separator="至"
            :start-placeholder="item.placeholderStart"
            :value-format="item.formate"
            :end-placeholder="item.placeholderEnd"
            :picker-options="item.type == 'monthrange' ? 'monthrange' : 'daterange'"
          ></el-date-picker>
        </div>
        <!-- 日期选择 -->
        <div
          class="date-wrap search-item-wrap"
          v-if="item.type == 'date' || item.type == 'datetime'"
        >
          <label for v-if="item.label" class="date-label search-item">{{ item.label }}</label>
          <el-date-picker
            v-model="searchData[item.VModelvalue.name]"
            :type="item.type"
            :value-format="item.formate"
            :placeholder="item.placeholder || '请选择' "
            :picker-options="dateOptions"
            :default-value="item.VModelvalue.defaultValue"
          ></el-date-picker>
        </div>
        <div
                class="date-wrap search-item-wrap"
                v-if="item.type == 'year'||item.type == 'month'"
        >
          <label for v-if="item.label" class="date-label search-item">{{ item.label }}</label>
          <el-date-picker
                  v-model="searchData[item.VModelvalue.name]"
                  :type="item.type"
                  :value-format="item.formate"
                  :placeholder="item.placeholder || '请选择' "
                  :default-value="item.VModelvalue.defaultValue"
          ></el-date-picker>
        </div>
        <!-- radio -->
        <div class="radio-wrap search-item-wrap" v-if="item.type == 'radio' ">
          <label for v-if="item.label" class="date-label search-item">{{ item.label }}</label>
          <div>
            <el-radio
              v-for="option in item.radioList"
              :key="option.value"
              v-model="searchData[item.VModelvalue.name]"
              :label="option.value"
            >{{ option.label }}</el-radio>
          </div>
        </div>
        <!-- checkbox  -->
        <div class="checkbox-wrap search-item-wrap" v-if="item.type == 'checkbox' ">
          <label for v-if="item.label" class="date-label search-item">{{ item.label }}</label>
          <div>
            <el-checkbox
              v-for="option in item.checkboxList"
              :key="option.value"
              v-model="searchData[item.VModelvalue.name]"
              :label="option.label"
            >{{ option.label }}</el-checkbox>
          </div>
        </div>
        <!-- linkDate -->
        <div class="linkDate-wrap search-item-wrap" v-if="item.type == 'linkDate' ">
          <label for v-if="item.label" class="date-label search-item">{{ item.label }}</label>
          <div class="search">
            <el-select
              v-model="searchData[item.VModelvalue.name]"
              placeholder="请选择"
              @change="changeDate"
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
            <div class="date-wrapper">
              <el-date-picker
                v-model="searchData[item.VModelvalue2.name]"
                :type="type"
                placeholder="选择年"
                :value-format="valueFormate"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <!-- linkDateRang -->
        <div class="linkDate-wrap search-item-wrap" v-if="item.type == 'linkDateRang' ">
          <label for v-if="item.label" class="date-label search-item">{{ item.label }}</label>
          <div class="search">
            <el-select
              v-model="searchData[item.VModelvalue.name]"
              placeholder="请选择"
              @change="changeDateRang"
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
            <div class="date-wrapper" v-show="!isShowDateYearRange">
              <el-date-picker
                v-model="searchData[item.VModelvalue2.name]"
                :type="type"
                placeholder="选择日期"
                :value-format="valueFormate"
                :format="valueFormate"
              ></el-date-picker>
            </div>
            <div class="date-wrapper" v-if="isShowDateYearRange">
              <el-date-picker
                v-model="yearV1"
                type="year"
                value-format="yyyy"
                placeholder="开始时间"
                :picker-options="date"
              ></el-date-picker>-
              <el-date-picker
                v-model="yearV2"
                type="year"
                value-format="yyyy"
                placeholder="结束时间"
                :picker-options="date"
              ></el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮组 -->
      <div class="button-wrap" v-if="showButtonGroup">
        <div class="button" v-for="item in searchConfig.searchButtonGroup" :key="item.action">
          <el-button
            type="primary"
            v-if="item.action == 'query'"
            @click="handleQuery"
          >{{ item.label }}</el-button>
          <el-button type="primary" v-if="item.action == 'add'" @click="handleAdd">{{ item.label }}</el-button>
          <el-button type="primary" v-if="item.action == 'click'" @click="addClick">{{ item.label }}</el-button>
          <el-button
            type="primary"
            v-if="item.action == 'location'"
            @click="handleLocation"
          >{{ item.label }}</el-button>
          <el-button
            type="primary"
            v-if="item.action == 'import'"
            @click="handleImport"
          >{{ item.label }}</el-button>
          <el-button
            type="primary"
            v-if="item.action == 'export'"
            @click="handlExport"
          >{{ item.label }}</el-button>
          <el-button
            type="primary"
            v-if="item.action == 'print'"
            @click="handlPrint"
          >{{ item.label }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateRang, dateOptions } from "./SearchPanelConfig.js";
import _ from "lodash";
export default {
  name: "SearchPanel",
  props: {
    // 搜索配置  包括搜索条件配置和搜索按钮配置
    searchConfig: {
      type: Object
    },
    // 搜索条件横向排列还是竖向排列
    direction: {
      default: "row"
    }
  },
  mounted() {
    if (this.searchConfig) {
      this.init();
    }
  },
  watch: {
    // 监测到搜索值变化时向上一级发送搜索值
    searchData: {
      handler(newData) {
        if (this.delaySeach) {
          return;
        }
        if (this.isKeyV) {
          for (let [k, v] of Object.entries(newData)) {
            let name = k.split(",");
            if (name.length == 2) {
              newData[name[0]] = v[0];
              newData[name[1]] = v[1];
            }
            if (name.length == 1 && Array.isArray(v)) {
              k = v[0] + "|" + v[1];
              newData[name[0]] = k;
            }
          }
          this.result = newData;
          this.$emit("getSearchValue", newData);
          return;
        }
        let configCopy = _.merge(this.config);
        const value = [];
        for (const item of configCopy) {
          let columnName = item.columnName;
          if (item.type == "linkDateRang" && this.type == "year") {
            item.queryValue = this.yearV1 + "|" + this.yearV2;
            value.push(item);
            continue;
          }
          if (item.operator == "between" && newData[columnName][0]) {
            item.queryValue =
              newData[columnName][0] + "|" + newData[columnName][1];
            value.push(item);
            continue;
          }
          if (newData[columnName]) {
            item.queryValue = newData[columnName];
            value.push(item);
          }
        }
        this.result = value;
        this.$emit("getSearchValue", value);
      },
      deep: true
    }
  },
  beforeMount() {
    let VModelvalue2Name = sessionStorage.getItem("VModelvalue2Name");
    let VModelvalue1Name = sessionStorage.getItem("VModelvalue1Name");
    this[VModelvalue1Name] = "year";
    this[VModelvalue2Name] = this.$utils.dayjs().format("YYYY");
    this["yearV1"] = this.$utils.dayjs().format("YYYY");
    this["yearV2"] = this.$utils.dayjs().format("YYYY");
  },
  data() {
    // 设置搜索条件的默认值
    const type2operation = {
      input: "like", //输入框默认为模糊查询
      daterange: "between", //
      linkDateRang: "=", //
      monthrange: "between", //
      select: "=" //
    };
    const type2dataType = {
      daterange: "Date", //输入框默认为模糊查询
      monthrange: "Date" //输入框默认为模糊查询
    };
    const config = [];
    let searchConfigList =
      this.searchConfig && this.searchConfig.searchCondition;
    let searchValue = {};
    searchConfigList &&
      searchConfigList.forEach(element => {
        searchValue[element.VModelvalue.name] =
          element.VModelvalue.defaultValue;
        if (element.VModelvalue.name) {
          config.push({
            queryValue: searchValue[element.VModelvalue.name], //  查询列值
            operator: element.operator || type2operation[element.type], //  操作符
            dataType:
              element.dataType || type2dataType[element.type] || "String", //  字段类型
            columnName: element.VModelvalue.name // 查询列名称
          });
        }
        if (element.VModelvalue2) {
          searchValue[element.VModelvalue2.name] =
            element.VModelvalue2.defaultValue;
          if (element.VModelvalue2.name) {
            sessionStorage.setItem(
              "VModelvalue2Name",
              element.VModelvalue2.name
            );
            sessionStorage.setItem(
              "VModelvalue1Name",
              element.VModelvalue.name
            );
            config.push({
              queryValue: searchValue[element.VModelvalue2.name], //  查询列值
              operator: element.VModelvalue2.operator || "", //  操作符
              dataType:
                element.dataType || type2dataType[element.type] || "Date", //  字段类型
              columnName: element.VModelvalue2.name, // 查询列名称
              type: element.type
            });
          }
        }
      });
    return {
      // 搜索输入值
      searchData: {
        ...searchValue
      },
      isKeyV: this.searchConfig && this.searchConfig.isKeyV,
      config: Object.freeze(config),
      // 日期范围快捷方式
      daterange: dateRang,
      // 时间选择快捷方式
      date: dateOptions,
      valueFormate: "yyyy",
      value1: "year",
      isShowDateYearRange: true,
      value2: "",
      type: "year",
      yearV1: "",
      yearV2: ""
    };
  },
  computed: {
    // 横竖排列设置不同的class
    colItem() {
      return this.direction == "column" ? true : false;
    },
    // 是否显示按钮组
    showButtonGroup() {
      return this.searchConfig &&
        this.searchConfig.searchButtonGroup &&
        this.searchConfig.searchButtonGroup.length != 0
        ? true
        : false;
    }
  },
  methods: {
    init() {
      // dataType":"Date
      // var elementTypes = ['text', 'checkbox', 'radio', 'select'];
      // var sqloperators = ['=', '==', '>', '>=', '<', '<=', 'like', 'llike', 'leftlike', 'rlike', 'rightlike', 'in', 'between'];
      // var dataTypes = ['string', 'varchar', 'number', 'double', 'float', 'int', 'integer', 'long', 'date', 'datetime', 'boolean', 'bool'];
      if (this.isKeyV) {
        this.$emit("getSearchValue", this.searchData);
        return;
      }
      let configCopy = _.merge(this.config);
      const value = [];
      for (const item of configCopy) {
        // if (item.dataType == "Date") {
        //   item.queryValue =
        //   value.push(item);
        // }
        if (item.queryValue) {
          value.push(item);
        }
      }
      this.$emit("getSearchValue", value);
    },
    changeDate(a) {
      if (a == "year") {
        this.type = "year";
        this.valueFormate = "yyyy";
        this.value2 = this.$utils.dayjs().format("YYYY");
      }
      if (a == "month") {
        this.type = "month";
        this.valueFormate = "yyyy-MM";
        this.value2 = this.$utils.dayjs().format("YYYY-MM");
      }
      if (a == "day") {
        this.type = "date";
        this.valueFormate = "yyyy-MM-dd";
        this.value2 = this.$utils.dayjs().format("YYYY-MM-DD");
      }
    },
    changeDateRang(a) {
      let VModelvalue2Name = sessionStorage.getItem("VModelvalue2Name");
      if (a == "year") {
        this.isShowDateYearRange = true;
        this.type = "year";
        this.valueFormate = "yyyy";
        this.value2 = this.$utils.dayjs().format("YYYY");

        this[VModelvalue2Name] = this.$utils.dayjs().format("YYYY");
      }
      if (a == "month") {
        let currentDate = this.$utils.dayjs().format("YYYY-MM");
        this.isShowDateYearRange = false;
        this.type = "monthrange";
        this.valueFormate = "yyyy-MM";
        this.value2 = currentDate;
        this[VModelvalue2Name] = [currentDate, currentDate];
      }
      if (a == "day") {
        let currentDate = this.$utils.dayjs().format("yyyy-MM-dd");
        this.isShowDateYearRange = false;
        this.type = "daterange";
        this.valueFormate = "yyyy-MM-dd";
        this.value2 = currentDate;
        this[VModelvalue2Name] = [currentDate, currentDate];
      }
    },
    getQueryValue() {},
    getPickerOptions(type) {
      return type;
    },
    handleQuery(label) {
      this.$emit("handleQuery", this.result);
    },
    handleAdd(label) {
      this.$emit("handleAdd", label);
    },
    addClick(label) {
      this.$emit("addClick", label);
    },
    handleLocation(label) {
      this.$emit("handleLocation", label);
    },
    handleImport(label) {
      this.$emit("handleImport", label);
    },
    handlExport(label) {
      this.$emit("handlExport", label);
    },
    handlPrint(label) {
      this.$emit("handlPrint", label);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-panel-container {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  // line-height:44px;
  overflow: hidden;
  .search-panel-wrap {
    display: flex;
    // flex-direction: column;
    .item {
      // width: 100%;
      display: flex;
      align-self: center;
      // margin-left: 20px;
    }
    .item:not(:nth-child(1)) {
      margin-left: 20px;
    }
  }
}
.search-item-wrap {
  display: flex;
}
.search-item-wrap > .search-item {
  @include allCenter;
  justify-content: flex-end;
  margin-right: 10px;
}
.wrap-content {
  width: 180px;
}
.button-wrap {
  display: flex;
  margin-left: 10px;
  div {
    margin-left: 10px;
  }
}
.colItem {
  width: 100%;
  margin-left: 0 !important;
  margin-top: 20px;
  .search-item-wrap {
    width: 100%;
    > label {
      margin-right: 0 !important;
      width: 66px;
      justify-content: flex-start;
      text-align: left;
    }
    > div {
      width: calc(100% - 70px);
      text-align: left;
    }
  }
  .daterange-wrap {
    div {
      width: 100% !important;
    }
  }
}
.colItem + .button-wrap {
  margin-top: 20px;
}
.date-wrapper {
  display: inline-block;
  margin-left: 10px;
}
.select-wrap {
  width: 100%;
}
</style>