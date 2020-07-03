<template>
    <div class="shiftAnalysis-wrapper">
        <!-- 出行客流目的地分析 -->
        <basemap />
        <div class="panel-wrapper left">
            <div class="cxkl-container">
                <PanelItem title="出行客流目的地分析" :displaySwitch=false >
                    <div class="cxkl-wrapper">
                        <div class="item-wrapper">
                            <div class="item" >
                                <h2>节假日</h2>
                            </div>
                            <div class="item" >
                                <h2>工作日</h2>
                            </div>
                        </div>
                        <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"  @handleQuery="handleQuery" direction="column"  ></SearchPanel>
                    </div>

                </PanelItem>

            </div>
        </div>
        <div class="panel-wrapper right">
            <!-- 公交基础情况 -->
            <div class="cxmddpm-container">
                <PanelItem title="出行目的地排名" :displaySwitch=false >
                    <div>
                        <el-table :data="tableData" style="width: 100%" stripe fit=true >
                            <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.shift >= 400">{{ scope.$index+1 }}</span>
                                    <span style="color:rgb(255,158,30)" v-if="scope.row.shift >=200&&scope.row.shift<400">{{ scope.$index+1 }}</span>
                                    <span style="color:rgb(255,234,70)" v-if="scope.row.shift >=100&&scope.row.shift<200">{{ scope.$index+1 }}</span>
                                    <span style="color:rgb(54,255,41)" v-if="scope.row.shift <100">{{scope.$index+1 }}</span>
                                </template>

                            </el-table-column>
                            <el-table-column label="目的地" prop="mdd">
                                <template slot-scope="scope">
                                    <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.shift >= 400">{{ scope.row.mdd }}</span>
                                    <span style="color:rgb(255,158,30)" v-if="scope.row.shift >=200&&scope.row.shift<400">{{ scope.row.mdd }}</span>
                                    <span style="color:rgb(255,234,70)" v-if="scope.row.shift >=100&&scope.row.shift<200">{{ scope.row.mdd }}</span>
                                    <span style="color:rgb(54,255,41)" v-if="scope.row.shift <100">{{scope.row.mdd }}</span>
                                </template>

                            </el-table-column>
                            <el-table-column label="班次">
                                <template slot-scope="scope">
                                    <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.shift >= 400">{{ scope.row.shift }}</span>
                                    <span style="color:rgb(255,158,30)" v-if="scope.row.shift >=200&&scope.row.shift<400">{{ scope.row.shift }}</span>
                                    <span style="color:rgb(255,234,70)" v-if="scope.row.shift >=100&&scope.row.shift<200">{{ scope.row.shift }}</span>
                                    <span style="color:rgb(54,255,41)" v-if="scope.row.shift <100">{{ scope.row.shift }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </PanelItem>
            </div>
            <div class="cfdpm-container">
                <PanelItem title="出发地排名" :displaySwitch=false >
                    <div>
                        <el-table :data="tableData1" style="width: 100%" stripe fit=true >
                            <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.shift >= 40000">{{ scope.$index+1 }}</span>
                                    <span style="color:rgb(255,158,30)" v-if="scope.row.shift >=20000&&scope.row.shift<40000">{{ scope.$index+1 }}</span>
                                    <span style="color:rgb(255,234,70)" v-if="scope.row.shift >=100&&scope.row.shift<20000">{{ scope.$index+1 }}</span>
                                    <span style="color:rgb(54,255,41)" v-if="scope.row.shift <100">{{scope.$index+1 }}</span>
                                </template>

                            </el-table-column>
                            <el-table-column label="出发地" prop="cfd">
                                <template slot-scope="scope">
                                    <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.shift >= 400">{{ scope.row.cfd }}</span>
                                    <span style="color:rgb(255,158,30)" v-if="scope.row.shift >=200&&scope.row.shift<400">{{ scope.row.cfd }}</span>
                                    <span style="color:rgb(255,234,70)" v-if="scope.row.shift >=100&&scope.row.shift<200">{{ scope.row.cfd }}</span>
                                    <span style="color:rgb(54,255,41)" v-if="scope.row.shift <100">{{scope.row.cfd }}</span>
                                </template>

                            </el-table-column>
                            <el-table-column label="班次">
                                <template slot-scope="scope">
                                    <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.shift >= 400">{{ scope.row.shift }}</span>
                                    <span style="color:rgb(255,158,30)" v-if="scope.row.shift >=200&&scope.row.shift<400">{{ scope.row.shift }}</span>
                                    <span style="color:rgb(255,234,70)" v-if="scope.row.shift >=100&&scope.row.shift<200">{{ scope.row.shift }}</span>
                                    <span style="color:rgb(54,255,41)" v-if="scope.row.shift <100">{{ scope.row.shift }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>


                </PanelItem>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
        name: '',
        components: {
        },
        mounted() {
            // this.czOption=this.creatOption(this.czData,"line","",false,false,8,true,10, "人次");
            // this.createCXFSOption(this.travelData);

        },
        data() {
            return {
                tableData:[
                    {mdd:"北京",shift:567},
                    {mdd:"上海",shift:345},
                    {mdd:"广州",shift:234},
                    {mdd:"成都",shift:50},
                ],
                tableData1:[
                    {cfd:"北京",shift:567},
                    {cfd:"上海",shift:345},
                    {cfd:"广州",shift:234},
                    {cfd:"成都",shift:50},
                ],
                rollNo:1234,
                comeOrOutConfig:['到达','出发'],
                cxkldetail:'出港航班情况',
                cgsl:21,
                zxcg:'CA502',
                jgsl:100,
                zxjg:'ZA1234',
                ywl:'21%',
                pjyw:'112m',
                p1:true,
                p2:false,
                p3:false,
                czOption:{},
                czData:[
                    ['今日','昨日'],
                    ['1：00','2：00','3：00','4：00','5：00'],
                    [2000,5431,3421,7625,8282],
                    [6532,2625,8756,7252,4352]
                ],
                travelData: [
                    ['出租车', '公交', '地铁', '大巴', '其它'],
                    [
                        {value: 15, name: '出租车'},
                        {value: 45, name: '公交'},
                        {value: 12, name: '地铁'},
                        {value: 15, name: '大巴'},
                        {value: 13, name: '其它'}]
                ],
                travelEcharOption:{},
                searchConfig: {
                    searchCondition: [
                        {
                            order: 14,
                            otype: 'week',
                            type: "daterange",
                            formate: "yyyy-MM-dd",
                            label: "时间",
                            placeholderStart: "开始时间",
                            placeholderEnd: "截止时间",
                            VModelvalue: {
                                name: "date1",
                                defaultValue: ""
                            }
                        },
                        {
                            order: 306,
                            type: "select",
                            label: "频次",
                            placeholder: "频次",
                            VModelvalue: {
                                name: "pc",
                                defaultValue: ""
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
                        },
                        {
                            order: 36,
                            type: "select",
                            label: "类型",
                            placeholder: "类型",
                            VModelvalue: {
                                name: "lx",
                                defaultValue: ""
                            },
                            options: [
                                {
                                    value: "1",
                                    label: "出港"
                                },
                                {
                                    value: "2",
                                    label: "进港"
                                }

                            ]
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
                },

            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .shiftAnalysis-wrapper{
        height: 100%;
        width: 100%;
        position: relative;
        .panel-wrapper{
            height: 100%;
            // padding: 10px 0;
            position: absolute;
            top: 0;
            width: 410px;
            // border: 1px solid red;
        }
        .left{
            left: 0;
        }
        .right{
            right: 0;
        }
    }
    .comeorout{
        float:right;
    }
    .cxkl-wrapper{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .bj{
            margin: 20px 0;
        }
        .item-wrapper{
            display: flex;
            justify-content: space-around;
            .item{
                width: 110px;
                height: 60px;
                border:2px solid rgba(32,86,221,.4);
                border-radius:8px;
                background-color: rgba(32, 86, 221, .4);
                @include v-center;
                h2{
                    line-height: 60px;
                    font-size: 14px;
                }
                p{
                    margin-top: 6px;
                    font-size: 18px;
                    color: #ead72c;
                    span{
                        font-size: 14px;
                    }
                }

            }
        }

    }
    .detail-wrapper{

        h2{
            padding: 10px 0 0 30px;
            font-size: 16px;
        }
        p{
            padding: 10px 0 0 30px;
            font-size: 14px;
            span{
                color: #ead72c;
                font-size: 16px;
            }
        }
    }
    .zbdl{
        height: 230px;
        margin-top: 16px;
    }
    .cxmddpm-container{
        height:40%;
        overflow: auto;
    }
    .cfdpm-container{
        height:50%;
    }



</style>