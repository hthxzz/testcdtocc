<template>
    <div class="BusRouteNetRatioManage-wrapper">

        <div  class="xlwblsz" style="top: 3%;font-size: 18px;">
            <span style="padding-left: 2%">公交汽车线路网比率设置</span>
            <hr>
            <div class="content">
                <div class="search-wrapper left">
                    <SearchPanel :searchConfig="searchConfig"></SearchPanel>
                </div>
                <div class="right">
                    <div class="first">
                        <div>公交汽车线路网比率=</div>
                    </div>
                    <div class="second">
                        <input v-model="a" placeholder="公共汽电车线路网长度"></input>
                        <hr>
                        <input v-model="b" placeholder="城市道路网长度"></input>
                    </div>
                    <div class="third">
                        <div class="bl">{{lwbl}}%</div>
                        <div  class="button-wrap">
                            <div  class="button">
                                <button  type="button">
                                    <span>查询</span>
                                </button>
                            </div>
                            <div class="button">
                                <button  type="button">
                                    <span>导出</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div  class="xlbl"style="font-size: 18px;">
            <span style="padding-left: 2%">公交汽车线路网比率</span>
            <hr>
            <TableAndPagination  :searchConfig="searchConfig2">
                <el-table style="width: 100%;height:100%;overflow-y: auto" :data="tableData" stripe
                          ref="table">

                    <el-table-column label="序号" :prop="this.datat.name"></el-table-column>
                    <el-table-column label="统计时间" prop="c"></el-table-column>
                    <el-table-column label="公交汽车路网比率（%）" prop="d"></el-table-column>
                    <el-table-column label="环比" :prop="this.datat.name">
                        <template slot-scope="scope">
                            <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.e > 0 ">{{ scope.row.e }}%⬆</span>
                            <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.e < 0 ">{{ scope.row.e - scope.row.e - scope.row.e }}%⬇</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="同比" prop="f">
                        <template slot-scope="scope">
                            <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.e > 0 ">{{ scope.row.f }}%⬆</span>
                            <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.e < 0 ">{{ scope.row.f - scope.row.f - scope.row.f }}%⬇</span>
                        </template>
                    </el-table-column>
                </el-table>
            </TableAndPagination>
        </div>

    </div>
</template>

<script>
    import tableMixins from "@/components/common/tableAndPagination/tableMixins";
    export default {
        name: '',
        mixins: [tableMixins],
        mounted() {
            this.lwbl=this.b==''?'':(parseFloat(this.a)/parseFloat(this.b)*100).toFixed(2);
        },
        watch:{
            a:function(val){
                this.lwbl=this.b==''?'':(parseFloat(this.a)/parseFloat(this.b)*100).toFixed(2);
            },
            b:function(val){
                this.lwbl=this.b==''?'':(parseFloat(this.a)/parseFloat(this.b)*100).toFixed(2);
            },
        },

        data() {
            return {
                datat:{
                    name:'aa',
                },
                lwbl:'',
                a:'',
                b:'',
                tableData:[{
aa:1
                },
                    {
                        aa:2
                    }],
                searchConfig: {
                    searchCondition: [
                        {
                            order: 14,
                            type: "datetimerange",
                            formate: "yyyy-MM-dd",
                            label: "时间区间",
                            placeholderStart: "开始时间",
                            placeholderEnd: "截止时间",
                            VModelvalue: {
                                name: "date1",
                                defaultValue: "2"
                            }
                        },
                    ],
                    // searchButtonGroup:
                    //     [
                    //         {
                    //             action: "query",
                    //             label: "设置"
                    //         },
                    //         {
                    //             action: "export",
                    //             label: "生成数据"
                    //         }
                    //     ]
                },
                searchConfig2: {
                    searchCondition: [
                        {
                            order: 12,
                            type: "datetimerange",
                            formate: "yyyy-MM-dd",
                            label: "时间区间",
                            placeholderStart: "开始时间",
                            placeholderEnd: "截止时间",
                            VModelvalue: {
                                name: "date1",
                                defaultValue: "2"
                            }
                        },
                    ],
                    searchButtonGroup:
                        [
                            {
                                action: "query",
                                label: "查询"
                            },
                            {
                                action: "export",
                                label: "导出"
                            }
                        ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .BusRouteNetRatioManage-wrapper{
        height:90%;
        display: flex;
        flex-direction: column;
        .xlwblsz{
            flex:2;
            width: 100%;
            height: 100%;
            .content{
                width: 100%;
                height: 80%;
                display: flex;
                flex-direction: row;
                justify-items: center;
                align-items: center;
                justify-content: center;
                .left{
                    flex:1;
                }
                .right{
                    width: 100%;
                    height: 100%;
                    flex:2.5;
                    display: flex;
                    flex-direction: row;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    .first{
                        flex:1;
                        div{
                            margin: 0 auto;
                            line-height: 40px;
                            height: 40px;
                            color: #84A7FD;
                            background-color: #ffff;
                            text-align: center;
                            width: 200px;
                            border-radius: 3px;
                        }
                    }
                    .second{
                        flex:1;
                        input{
                            width:80%;
                            font-size: 14px;
                            height:30px;

                        }
                    }
                    .third{
                        flex:1.5;
                        /*width:50%;*/
                        margin-left: 50px;
                        display: flex;
                        flex-direction: row;
                        /*justify-items: center;*/
                        align-items: center;
                        /*justify-content: center;*/
                        .bl{
                            /*margin: 0 auto;*/
                            line-height: 40px;
                            height: 40px;
                            color: #84A7FD;
                            background-color: #ffff;
                            text-align: center;
                            width: 80px;
                            border-radius: 3px;
                        }
                        .button-wrap{
                            display: flex;
                            margin-left: 50px;
                            .button{
                                margin-left: 20px;
                                /*background: #796EFD;*/


                                /*line-height: 30px;*/
                                text-align: center;

                            }
                            button{
                                width:70px;
                                height:30px;
                                border: 0;
                                border-radius: 3px;
                                border-color:#7e6dfd;
                                background: #7e6dfd;
                                color:#fff;
                                font-size: 14px;
                                font-weight: bold;

                            }
                            button:hover{
                                background: rgba(132,167,253,.4);
                            }
                        }
                    }
                }
            }
        }
        .xlbl{
            flex:3;
        }
    }

</style>