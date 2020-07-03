<template>
    <div class="PassengerFlowTrend-wrapper">
    <!-- <h2>客流趋势分析</h2> -->
        <!-- 搜索开始 -->
        <section class="search-wrapper">
            <SearchPanel :searchConfig="searchConfig" ></SearchPanel>
        </section>
        <!-- echar图开始 -->
        <section class="echar-wrapper">
            <div class="item">
                <ul>
                    <li>总客流</li>
                    <li>123456</li>
                </ul>
            </div>
            <div class="item">
                <div class="echar-pie">
                    <v-chart :options="option"/>
                </div>
                <div class="btn-wrappper" @click="changeEchar" >
                    <span>趋势图</span>
                    <span>对比图</span>
                </div>
            </div>
        </section>
        <!-- 表格开始 -->
        <section class="table-wrapper">
            <div class="item">
                <span>分区间统计数据</span>
                <span>分线路统计数据</span>
            </div>
            <div class="item">
                <TableAndPagination 
                :showSearchPanel=false
                >
                    <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
                        <el-table-column label="时间" prop="1"></el-table-column>
                        <el-table-column label="区域" prop="2"></el-table-column>
                        <el-table-column label="线路" prop="3"></el-table-column>
                        <el-table-column label="客流量(乘次)" prop="4"></el-table-column>
                        <el-table-column label="同比" prop="5"></el-table-column>
                        <el-table-column label="环比" prop="6"></el-table-column>
                        <!-- <el-table-column label="关注状态">
                                            <template slot-scope="scope">
                                            <img src="./img/gz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '关注'" >   <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.statu == '关注' ">{{ scope.row.statu }}</span>
                                            <img src="./img/wgz.png" alt="" style="width:16px;height:16px;margin-right: 10px;vertical-align: sub;" v-if="scope.row.statu == '未关注' " >  <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.statu == '未关注' ">{{ scope.row.statu }}</span>
                                            </template>
                        </el-table-column>-->
                        <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </TableAndPagination>
            </div>
        </section>
        <DetailForm></DetailForm>
    </div>
</template>

<script>
    import tableMixins from "@/components/common/tableAndPagination/tableMixins";
    import { option3,option2 } from "./components/options";
    export default {
        name: '',
        mixins: [tableMixins],
        methods: {
          changeEchar(e){
              console.log(e);
              let content = e.srcElement.textContent;
              if (content == "趋势图") {
                  this.option = option3;
              }else if(content == "对比图"){
                   this.option = option2;
              }
              
          },
        },
        data() {
            return {
            option: option2,
            tableData: [
                ...new Array(16).fill({
                1: "2019/08/23",
                2: "中心城区",
                3: "1号线",
                4: "60%",
                5: "10&",
                6: "13%",
                })
            ],
            searchConfig: {
                searchCondition: [
                {
                    order: 3,
                    type: "select",
                    label: "",
                    filterable:true,
                    placeholder: "行政区域",
                    VModelvalue: {
                    name: "qy",
                    defaultValue: ""
                    },
                    options: [
                    {
                        value: "1",
                        label: "全部"
                    },
                    {
                        value: "2",
                        label: "5+1区域"
                    }
                    
                    ]
                },
                {
                    order: 36,
                    type: "select",
                    label: "",
                    placeholder: "经营企业",
                    VModelvalue: {
                    name: "jyqy",
                    defaultValue: ""
                    },
                    options: [
                    {
                        value: "1",
                        label: "全部"
                    },
                    {
                        value: "2",
                        label: "A公司"
                    },
                    {
                        value: "3",
                        label: "B公司"
                    }
                    
                    ]
                },
                {
                    order: 14,
                    type: "datetimerange",
                    formate: "yyyy-MM-dd HH:mm:ss",
                    label: "",
                    placeholderStart: "开始时间",
                    placeholderEnd: "截止时间",
                    VModelvalue: {
                    name: "date1",
                    defaultValue: "2"
                    }
                },
                {
                    order: 316,
                    type: "select",
                    label: "",
                    placeholder: "线路",
                    VModelvalue: {
                    name: "roadLine",
                    defaultValue: "1"
                    },
                    options: [
                    {
                        value: "1",
                        label: "1路"
                    },
                    {
                        value: "2",
                        label: "2路"
                    },
                    {
                        value: "3",
                        label: "3路"
                    }
                    
                    ]
                },
                {
                    order: 361,
                    type: "select",
                    label: "",
                    placeholder: "时段",
                    VModelvalue: {
                    name: "timePart",
                    defaultValue: "1"
                    },
                    options: [
                    {
                        value: "1",
                        label: "早高峰"
                    },
                    {
                        value: "2",
                        label: "晚高峰"
                    },
                    {
                        value: "3",
                        label: "平峰"
                    }
                    
                    ]
                },
                {
                    order: 3611,
                    type: "select",
                    label: "",
                    placeholder: "频次",
                    VModelvalue: {
                    name: "frequency",
                    defaultValue: "1"
                    },
                    options: [
                    {
                        value: "1",
                        label: "小时"
                    },
                    {
                        value: "2",
                        label: "日"
                    },
                    {
                        value: "3",
                        label: "月"
                    },
                    {
                        value: "4",
                        label: "年"
                    }
                    
                    ]
                }
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
    .echarts {
        width: 100%;
        height: 100%;
    }
    .PassengerFlowTrend-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        section:not(:first-child){
            flex: 1;
        }
        .search-wrapper{
            flex-basis: 50px;
        }
    }
    .echar-wrapper{
        display: flex;
        background-image: linear-gradient(to right, rgba(32, 86, 221, .4), #0A1E53);
        .item{
            &:first-child{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                ul{
                    text-align: center;
                    li:nth-child(1){
                        font-size: 26px;
                        color: red;
                    }
                    li:nth-child(2){
                        font-size: 26px;
                        color: red;
                        margin: 20px 0;
                    }
                    li:nth-child(3){
                        font-size: 22px;
                        color: yellow;
                    }
                }
            }
            &:last-child{
                flex: 5;
                position: relative;
                .echar-pie{
                    width: 100%;
                    height: 100%;
                }
                .btn-wrappper{
                    position: absolute;
                    top: 10px;
                    right: 120px;
                    span{
                        display: inline-block;
                        cursor: pointer;
                        padding: 6px;
                        border-radius: 10px;
                        font-size: 14px;
                        &:first-child{
                            background-color: #fff;
                            border: 1px solid #fff;
                            color: #2056dd;
                        }
                        &:last-child{
                            background-color: aqua;
                            margin-left: 20px;
                             background-color: #2056dd;
                            border: 1px solid #2056dd;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    .table-wrapper{
        display: flex;
        flex-direction: column;
        .item{
            &:first-child{
                flex-basis: 26px;
                line-height: 26px;
                span{
                    display: inline-block;
                    cursor: pointer;
                    padding: 3px;
                    border-radius: 10px;
                    font-size: 14px;
                    &:first-child{
                        background-color: #fff;
                        border: 1px solid #fff;
                        color: #2056dd;
                    }
                    &:last-child{
                        background-color: aqua;
                        margin-left: 20px;
                        background-color: #485dcc;
                        border: 1px solid #485dcc;
                        color: #fff;
                }
            }
            }
            &:last-child{
                flex: 1;
                height: calc(100% - 30px);
            }
        }
    }
</style>