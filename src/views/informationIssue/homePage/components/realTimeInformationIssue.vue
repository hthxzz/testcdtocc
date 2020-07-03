<template>
    <div class="real-time-traffic-flow-wrap">
        <section class="wrap">
            <RollNumber :title="rollNumberLabel" :value="rollNumberValue" unit="条"></RollNumber>
        </section>
        <section class="wrap"></section>
        <section class="wrap table-list">
                                        <StaticTableScrollContainer>
      <el-table :data="tableData" style="width: 100%" stripe fit=true >
        <el-table-column label="信息名称" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.informationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行业类型" prop="flow">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布日期">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>       
          </template>
        </el-table-column>
      </el-table>
    </StaticTableScrollContainer>
        </section>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                rollNumberLabel : '发布数量',
                rollNumberValue : 512341,
                stepLength: 60,
                tableConfig: {
                    height: "100"
                },


                tableData: [
        ...new Array(3).fill({
          informationName: "道路交通分析日报",
          type: "道路交通",
          date: "2020-02-29"
        }),
        ...new Array(3).fill({
          informationName: "城市路网2020版日报",
          type: "城市日报",
          date: "2020-02-29"
        }),
        ...new Array(3).fill({
          informationName: "轨道交通分析日报",
          type: "轨道交通",
          date: "2020-02-29"
        }),
        ...new Array(3).fill({
          informationName: "地面公交分析日报",
          type: "地面公交",
          date: "2020-02-29"
        }),
        ...new Array(3).fill({
          informationName: "地面交通分析日报",
          type: "地面交通",
          date: "2020-02-29"
        })
      ],
                tableHeadList: [
                    {
                    prop: "date",
                    label: "排名",
                    align: "center",
                    width: "56"
                    // formatter:function(row, column, cellValue, index){
                    //     return "<div>"+ cellValue +"</div>";
                    // }
                    },
                    {
                    prop: "name",
                    label: "路段名称",
                    align: "center"
                    // "width":"100"
                    },
                    {
                    prop: "address",
                    align: "center",
                    label: "交通延时指数",
                    width: "100"
                    }
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table-list{
        height: 600px;
        position: relative;
        margin-top: 10px;
    }
</style>