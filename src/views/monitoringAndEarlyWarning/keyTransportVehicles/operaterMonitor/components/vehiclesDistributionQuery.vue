<!--右侧车辆分布查询 -->
<template>
    <div class="vehicles-distribution-container">
        <div class="vehicles-distribution-wrap">  
            
                <div class="vehicles-distribution-area">
                    <div class="area-left">
                        <lable>区域：</lable>
                    </div>
                    <div class="area-right">
                        <el-radio-group v-model="radio">
                        <el-radio :label="3">全国（出市）</el-radio>
                        <el-radio :label="6">全省（出市）</el-radio>
                        <el-radio :label="9">入成都市</el-radio>
                    </el-radio-group>
                    </div>
                    
                </div>
                <!-- <div class="vehicles-distribution-industry"> -->
                <div class="vehicles-distribution-area">
                    <div class="area-left">
                        <lable>行业：</lable>
                    </div>
                    <div class="area-right">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="班线客运"></el-checkbox>
                            <el-checkbox label="包车客运"></el-checkbox>
                            <el-checkbox label="危货运输"></el-checkbox>
                            <el-checkbox label="重载挂车"></el-checkbox>
                            <el-checkbox label="公交运输"></el-checkbox>
                            <el-checkbox label="巡游出租"></el-checkbox>
                            <el-checkbox label="网约出租"></el-checkbox>
                            <el-checkbox label="汽车租赁"></el-checkbox>                        
                        </el-checkbox-group>
                    </div>
                </div>
            <!-- <div class="vehicles-list"> -->
                <div class="vehicles-distribution-search-result">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 360px;opacity:0.9;" :header-cell-style="tableHeaderColor">
                        <el-table-column
                            prop="date"
                            label="进入省份"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="在线车辆"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="报警车辆">
                        </el-table-column>
                    </el-table>
                </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VehiclesDistributionQuery',
        props:{
            show : {
                default : false,
                type : Boolean
            }
        },
        data() {
            return {
                roadList : [{
                    bcky:10023,
                    gjys:784,   
                    bcky:523,  
                    xycz:12732,
                    whys:7723,
                    wyc:1723,  
                    zajqygc: 5723,
                    qczl:723
                }               
                ],
                radio: 3,
                checkList:['班线客运'],
                tableData: [{
          date: '湖南',
          name: '84',
          address: '1'
        }, {
          date: '山西',
          name: '113',
          address: '1'
        }, {
          date: '宁夏',
          name: '67',
          address: '1'
        }, {
          date: '江西',
          name: '56',
          address: '1'
        }]

            }
        },
        methods:{
            // 修改table tr行的背景色,配合    :row-style="tableRowStyle" 使用
            // tableRowStyle({ row, rowIndex }) {
            //   return 'background-color: pink'
            // },
            // 修改table header的背景色
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0 && (columnIndex>=0)) {
                return 'color: #ff0;'
            }
        }
    }
}  
</script>

<style lang="scss" scoped>
    .vehicles-distribution-container{
        .vehicles-distribution-wrap{
            width:360px;
            height:538px;
            box-shadow:0px 4px 5px 0px rgba(131, 152, 144, 0.35);
            opacity:0.9;  //透明度
            float: left;
            border:solid 2px #1b49b7;
            border-top-style: none;
            margin-top: 10px;

            .vehicles-distribution-area{
                    float: left;
                    .area-left{
                        float: left; 
                        width:70px; 
                        lable{
                            margin-left: 15px;
                        }
                    }
                    .area-right{
                        float: left;
                        width:290px;
                        
                    }
                }
            .vehicles-distribution-search-result{
                    opacity: 0.9;//table表后背景无法设置透明，该设置无效
                    text-align: left;                  
            }
        }
    }
</style>
