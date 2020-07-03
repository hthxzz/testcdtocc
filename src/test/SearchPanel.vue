<template>
  <div class="test">
    <SearchPanel :searchConfig="searchConfig" @search="search" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  methods: {
    search(data) {
      console.log(data);
      let filterData = [];
      this.tableData.forEach(element => {
        if (element.date == data.date) {
          filterData.push(element);
        }
      });
      this.tableData = filterData;
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2019-07-08",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],

      searchConfig: [
        {
          type: "input",
          width: "123px",
          VModelvalue: {
            name: "input",
            defaultValue: ""
          },
          placeholder: "输入......"
        },
        {
          type: "select",
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
          type: "radio",
          radio: "1",
          VModelvalue: {
            name: "radioinput",
            defaultValue: "2"
          }
        },
        {
          type: "date",
          VModelvalue: {
            name: "date",
            defaultValue: ""
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>