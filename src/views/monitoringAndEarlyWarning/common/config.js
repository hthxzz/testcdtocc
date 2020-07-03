




export const echarAndTableConfig = {
     data() {
             return {
                echarConfig: ["趋势图", "对比图"],
                tableConfig: ["分区间统计数据", "分线路统计数据"]
             }
            },
      methods: {
         getSearchValue(content) {
            console.log(content);

         },
         handleQuery(content) {
            console.log(content);
         },
         // changeEchar(content) {
         //    if (content == "趋势图") {
         //       this.option = option2;
         //    } else if (content == "对比图") {
         //       this.option = option3;
         //    }

         // },
      },
}