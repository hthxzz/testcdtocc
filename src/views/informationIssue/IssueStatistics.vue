<template>
    <div class="AdministrativePunishment-wrapper">
    <!-- <h2>发布统计</h2> -->
        <!-- 搜索开始 -->
        <section class="search-wrapper">
            <SearchPanel :searchConfig="searchConfig" :totalP=total
        @fetchTableData="fetchTableData"
        @getSearchValue="getSearchValue"
        ></SearchPanel>
        </section>
        <!-- echar图开始 -->
        <section class="echar-wrapper">
            <div class="item">
                <div class="echar-pie">
                    <v-chart :options="option"/>
                </div>
            </div>
        </section>
        <!-- 表格开始 -->
        <section class="table-wrapper">
            <div class="item">
                <TableAndPagination 
                :showSearchPanel=false
                >
                    <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="statisticModel" stripe ref="table" >
                        <el-table-column label="行业类别" prop="industry"></el-table-column>
                        <el-table-column label="信息数量" prop="statisticNum"></el-table-column>
                        <el-table-column label="更新日期" prop="updateDay">
                        </el-table-column>
                    </el-table>
                </TableAndPagination>
            </div>
        </section>
        <!-- <DetailForm></DetailForm> -->
    </div>
</template>

<script>
    import tableMixins from "@/components/common/tableAndPagination/tableMixins";
    import {_formatDate} from "../../components/common/common.js";
    import { green } from 'color-name';
    // import { option3,option2 } from "./components/options";
    export default {
        name: '',
        mixins: [tableMixins],
        mounted() {
            const data={};
            //获取所有的发布渠道，并给检索条件赋值
            this.$http.$get("xxfb_releaseSetUp/queryAllChannel").then((param) => {
                // this.dealWithTableData(param);
                debugger;
                let issueChannelData = param.data;
// {"code":1,"message":"success","data":[{"id":1,"channelName":"dsaf","channelCode":"sfs","interfaceUrl":"dsf","channelDesc":"dsf","createTime":"1584845888000","updateTime":"1584845892000"},{"id":2,"channelName":"1","channelCode":"1","interfaceUrl":"111","channelDesc":null,"createTime":"1584845917000","updateTime":"1584845917000"},{"id":3,"channelName":"111","channelCode":"111","interfaceUrl":"222","channelDesc":null,"createTime":"1585881656000","updateTime":"1585881656000"}],"attrs":null}
            });
            this.$http.$get("xxfb_releaseStatistic/findReleaseInfoByCondition",data).then((param) => {
                this.dealWithTableData(param);
            });
        },
        methods: {
            dealWithTableData(data){
                debugger;
                console.log("len:"+data);
                if(data!=null && data!=undefined){

                    this.statisticModel = data.statisticModel;
                    // this.option = data.option;
                    let option_=data.option;
                    this.createbarOption(option_);

                }
            },
            getSearchValue(content){
                console.log(content);
                this.handleQuery1(content);
            },
            handleQuery1(content){
                debugger;
                const queryFields={};

                if(content.isTrusted){//什么都没选，默认不限

                    const queryField=[];
                    
                    queryFields.industry="";
                    queryFields.frequency="";
                    queryFields.feature="";
                    queryFields.holiday="";
                    queryFields.channel="";
                }else{
                    queryFields=content;
                }

                this.$http.$get("xxfb_releaseStatistic/findReleaseInfoByCondition",queryFields).then((param) => {
                    // this.dealWithData(param);
                    
                    let statisticModel = param.statisticModel;
                    let chartOption = param.option;

                    this.statisticModel = statisticModel;
                    this.createbarOption(chartOption);
                });
                
            },
            createbarOption(data){
                debugger;
                let xData = data.yAxis[0].data;
                let seriesData = data.series[0].data;

                const option= {
                    title:{
                        text:'各行业发布信息数量统计',
                        textStyle: {color:'#FFFFFF',fontSize:14},
                        left:'center'
                    },
                    xAxis: {
                        type: 'category',
                        // data: ['道路交通', '轨道交通', '地面公交', '出租汽车', '公路客运', '航空运输', '铁路运输'],
                        data:xData,
                        axisLine:{
                            lineStyle: {
                            color:'#fff', //修改横坐标轴线颜色
                        }},
                        axisLabel: {
                            textStyle: {
                            color: '#fff',//坐标值得具体的颜色
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine:{
                            lineStyle: {
                                color:'#fff', //修改横坐标轴线颜色
                                }
                        },
                        axisLabel: {
                            textStyle: {
                            color: '#fff',//坐标值得具体的颜色
                            }
                        }
                    },
                    series: [{
                        // data: [120, 200, 150, 80, 70, 110, 130],
                        data:seriesData,
                        type: 'bar',
                        itemStyle:{color:'#FFFF00',borderWidth:1},
                        barWidth : 30,//柱图宽度
                    }]
                }
                this.option = option;
            }
        },
        data() {
            return {
            // option: option2,
            // url : 'xxfb_releaseStatistic/findReleaseInfoByCondition',
            option:{},
            // option: {
            //     title:{
            //         text:'各行业发布信息数量统计',
            //         textStyle: {color:'#FFFFFF',fontSize:14},
            //         left:'center'
            //     },
            //     xAxis: {
            //         type: 'category',
            //         data: ['道路交通', '轨道交通', '地面公交', '出租汽车', '公路客运', '航空运输', '铁路运输'],
            //         axisLine:{
            //             lineStyle: {
            //             color:'#fff', //修改横坐标轴线颜色
            //         }},
            //         axisLabel: {
            //             textStyle: {
            //             color: '#fff',//坐标值得具体的颜色
            //             }
            //         }
            //     },
            //     yAxis: {
            //         type: 'value',
            //         axisLine:{
            //             lineStyle: {
            //                 color:'#fff', //修改横坐标轴线颜色
            //                 }
            //         },
            //         axisLabel: {
            //             textStyle: {
            //             color: '#fff',//坐标值得具体的颜色
            //             }
            //         }
            //     },
            //     series: [{
            //         data: [120, 200, 150, 80, 70, 110, 130],
            //         type: 'bar',
            //         itemStyle:{color:'#FFFF00',borderWidth:1},
            //         barWidth : 30,//柱图宽度
            //     }]
            // },
            statisticModel:[],
            // tableData: [
            //     ...new Array(16).fill({
            //     1: "2019-1",
            //     2: "成都市公共交通集团有限公司",
            //     4: "100"
            //     })
            // ],
            searchConfig: {
                searchCondition: [{
                    type: "select",
                    label: "按行业",
                    placeholder: "按行业",
                    VModelvalue: {
                        name: "industry",
                        defaultValue: "0"
                    },
                    options: [
                         {
                        value: "0",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "道路交通"
                        },
                        {
                        value: "2",
                        label: "轨道交通"
                        },
                        {
                        value: "3",
                        label: "地面公交"
                        },
                        {
                        value: "4",
                        label: "出租汽车"
                        },
                        {
                        value: "5",
                        label: "公路客运"
                        },
                        {
                        value: "6",
                        label: "航空运输"
                        },
                        {
                        value: "7",
                        label: "铁路运输"
                        }]
                    },{
                    type: "select",
                    label: "日期频次",
                    placeholder: "日期频次",
                    VModelvalue: {
                        name: "frequency",
                        defaultValue: "0"
                    },
                    options: [
                        {
                        value: "0",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "日"
                        },
                        {
                        value: "2",
                        label: "周"
                        },
                        {
                        value: "3",
                        label: "月"
                        },
                        {
                        value: "4",
                        label: "季度"
                        },
                        {
                        value: "5",
                        label: "年"
                        }
                    ]
                    },{       
                    type: "select",
                    label: "按时间特征",
                    placeholder: "按时间特征",    
                    VModelvalue: {
                        name: "feature",
                        defaultValue: "0"
                    },
                    options: [
                        {
                        value: "0",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "工作日"
                        },
                        {
                        value: "2",
                        label: "非工作日"
                        },
                        {
                        value: "3",
                        label: "高峰时段"
                        }]
                    },{   
                    type: "select",
                    label: "按节假日",
                    placeholder: "按节假日",
                    VModelvalue: {
                        name: "holiday",
                        defaultValue: "0"
                    },
                    options: [
                        {
                        value: "0",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "元旦"
                        },
                        {
                        value: "2",
                        label: "春节"
                        },
                        {
                        value: "3",
                        label: "清明"
                        },{
                        value: "4",
                        label: "劳动节"
                        },
                        {
                        value: "5",
                        label: "端午节"
                        },
                        {
                        value: "6",
                        label: "中秋节"
                        },{
                        value: "7",
                        label: "国庆节"
                        }]
                    },{  
                    type: "select",
                    label: "发布渠道",
                    placeholder: "发布渠道",
                    VModelvalue: {
                        name: "channel",
                        defaultValue: "0"
                    },
                    options: [
                        {
                        value: "0",
                        label: "不限"
                        },
                        {
                        value: "1",
                        label: "工作日"
                        },
                        {
                        value: "2",
                        label: "非工作日"
                        },
                        {
                        value: "3",
                        label: "高峰时段"
                        }]
                    }],
                searchButtonGroup: 
                [
                {
                    action: "query",
                    label: "查询"
                }
                ]
            }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .AdministrativePunishment-wrapper{
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