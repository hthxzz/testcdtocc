<template>
  <div class="test">
    <TablePagination
      @handleNextClick="handleNextClick"
      @handleAdd="handleAdd"
      @handleEdit="handleEdit"
      @handleDetail="handleDetail"
      @close="close"
      :colConfigList="colConfigList"
      :searchConfigList="searchConfigList"
      :searchButtonList="searchButtonList"
      :operationList="operationList"
      :formConfig="AddFormConfig"
      :detailFormConfig="detailFormConfig"
      :showSearchPanel="true"
      :showPagination="true"
    >
      aaaaaaaa{{tr}}
      <span style="color:red">{{}}</span>
    </TablePagination>
  </div>
</template>

  <script>
import { AddFormConfig } from "../components/common/addForm/AddFormConfig.js";
import { detailFormConfig } from "../components/common/tableAction/detailForm/detailFormConfig.js";
export default {
  inheritAttrs: false,
  methods: {
    handleNextClick() {
      console.log("handleNextClick");
    },
    handleEdit() {},
    handleAdd() {
      this.AddFormConfig.dialogFormVisible = true;
    },
    handleDetail(row) {
      console.log(row);
      const data = this.detailFormConfig.data;
      this.$http
        .$get2(this.detailFormConfig.url, { name: row.name })
        .then(result => {
          const res = result.data.result[0];
          const keys = Object.keys(res);
          data.forEach(val => {
            val.forEach(val2 => {
              for (const key of keys) {
                if (val2.key == key) {
                  if (val2.formate) {
                    val2.value = val2.formate(res[key]);
                  } else {
                    val2.value = res[key];
                  }
                }
              }
            });
          });

          console.log(data);
          this.detailFormConfig.data = data;
          this.$store.state.app.fullscreenLoading = false;
          this.detailFormConfig.show = true;
        });
    },
    close() {
      this.AddFormConfig.dialogFormVisible = false;
    }
  },
  data() {
    return {
      operationList: ["add", "edit", "detail", "delete", "location"],
      dialogFormVisible: false,
      AddFormConfig: AddFormConfig,
      searchButtonList: [
        {
          order: 1,
          label: "查询"
        },
        {
          order: 2,
          label: "添加"
        }
      ],
      detailFormConfig: detailFormConfig,
      colConfigList: [
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "性别",
          prop: "sex",
          formatter: function(row, column, cellValue, index) {
            const sexConfig = {
              "1": "男",
              "0": "女"
            };
            return sexConfig[cellValue];
          }
        },
        {
          label: "地址",
          prop: "address"
        },
        {
          label: "日期",
          prop: "birthday"
        },
        {
          label: "邮箱",
          prop: "email"
        }
      ],
      searchConfigList: [
        {
          order: 1,
          type: "input",
          label: "姓名哈哈篇",
          // width: "123px",
          placeholder: "输入......",
          VModelvalue: {
            name: "name",
            defaultValue: "11111111111"
          }
        },
        {
          order: 2,
          type: "select",
          label: "选择食物",
          placeholder: "输入......",
          VModelvalue: {
            name: "select",
            defaultValue: ""
          },
          options: [
            {
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            },
            {
              value: "选项3",
              label: "蚵仔煎"
            },
            {
              value: "选项4",
              label: "龙须面"
            },
            {
              value: "选项5",
              label: "北京烤鸭"
            }
          ]
        },
        {
          order: 3,
          type: "datetimerange",
          formate: "yyyy-MM-dd HH:mm:ss",
          label: "日期范围",
          VModelvalue: {
            name: "date1",
            defaultValue: "2"
          }
        },
        {
          order: 6,
          type: "datetime",
          formate: "yyyy-MM-dd HH:mm:ss",
          label: "日期",
          VModelvalue: {
            name: "datetime",
            defaultValue: "2"
          }
        },
        {
          order: 4,
          type: "date",
          formate: "yyyy-MM-dd",
          label: "日期",
          placeholder: "输入......",
          VModelvalue: {
            name: "date",
            defaultValue: "2019-8-16"
          }
        },
        {
          order: 5,
          type: "button",
          label: "查询"
        }
      ]
    };
  }
};
</script>

  <style lang="scss" scoped>
.test {
  width: 100%;
  height: 100%;
}
</style>
  