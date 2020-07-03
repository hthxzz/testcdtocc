<template>
    <div class="BusCrowdedDegree-wrapper">

        <div  class="blsz" style="top: 3%;">
            <span class="title" style="padding-left: 2%">早晚高峰时段公共交通平均拥挤度设置</span>
            <hr>
            <div class="content">
                <div class="search-wrapper left">
                    <SearchPanel :searchConfig="searchConfig2" @getSearchValue="getSearchValueSelf" direction="column" ></SearchPanel>
                </div>
                <div class="right">
                    <div class="first">
                        <div>早晚高峰时段公共交通平均拥挤度=</div>
                    </div>
                    <div class="second">
                        <div class="top">
                            <div class="left">
                                <div class="one">
                                    <div><span style="">∑ (</span><input  v-model="a" placeholder="高峰时段公共汽电车最大断面乘客数" title="高峰时段公共汽电车最大断面乘客数"></input><span>)</span></div>
                                    <hr style="width:100%" />
                                    <div ><span style="">∑ (</span><input  v-model="b" placeholder="高峰时段公共汽电车最大客流断面班次的额定载客量" title="高峰时段公共汽电车最大客流断面班次的额定载客量"></input><span>)</span></div>
                                </div>
                                <div class="two">
                                     X 100%
                                </div>
                            </div>
                            <div style="margin:0 5px; font-size: 24px">
                                 +
                            </div>
                            <div class="right">
                                <div class="one">
                                    <div><span style="">∑ (</span><input v-model="c" placeholder="高峰时段轨道交通最大断面乘客数" title="高峰时段轨道交通最大断面乘客数"></input><span> )</span></div>
                                    <hr style="width:100%" />
                                    <div ><span style="">∑ (</span><input  v-model="d" placeholder="高峰时段轨道交通最大客流断面列次的额定载客量" title="高峰时段轨道交通最大客流断面列次的额定载客量"></input><span> )</span></div>
                                </div>
                                <div class="two">
                                    X 100%
                                </div>
                            </div>

                        </div>
                        <hr style="width:100%"/>
                        <div  class="botton">
                          2
                        </div>

                    </div>
                    <div class="third">
                        <div class="bl">{{dealedData}}%</div>
                        <div  class="button-wrap">
                            <div  class="button"  @click="installData">
                                <button  type="button">
                                    <span>设置</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div  class="blcx">
            <span class="title" style="padding-left: 2%">早晚高峰时段公共交通平均拥挤度</span>
            <hr>
            <TableAndPagination  :searchConfig="searchConfig"
                                 :totalP=total
                                 @getSearchValue="getSearchValueMy"
                                 @fetchTableData="fetchTableDataMy"
            >
                <el-table style="width: 100%;height:100%;overflow-y: auto" height="200":data="tableData" stripe
                          ref="table">

                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="统计时间" prop="staticDate"></el-table-column>
                    <el-table-column label="早晚高峰时段公共交通平均拥挤度(%)" prop="indexValue"></el-table-column>
                    <el-table-column label="环比" prop="mom">
                        <template slot-scope="scope">
                            <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.mom > 0 ">{{ scope.row.mom }}%⬆</span>
                            <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.mom < 0 ">{{ scope.row.mom - scope.row.mom - scope.row.mom }}%⬇</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="同比" prop="yoy">
                        <template slot-scope="scope">
                            <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.yoy > 0 ">{{ scope.row.yoy }}%⬆</span>
                            <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.yoy < 0 ">{{ scope.row.yoy - scope.row.yoy - scope.row.yoy }}%⬇</span>
                        </template>
                    </el-table-column>
                </el-table>
            </TableAndPagination>
        </div>

    </div>
</template>

<script>
    // import tableMixins from "@/components/common/tableAndPagination/tableMixins";
    export default {
        name: '',
        // mixins: [tableMixins],
        methods:{
            dealWithData(){
                var one=this.b==''||this.a==''?0:parseFloat(this.a)/parseFloat(this.b)*100;
                var two=this.c==''||this.d==''?0:parseFloat(this.c)/parseFloat(this.d)*100;
                this.dealedData= ((one+two)/2).toFixed(2);
            },
            getSearchValueMy(content){
                if(content.timeType2=='year'){
                    this.searchConfig.searchCondition[1]={
                        order: 14,
                        type: "year",
                        formate: "yyyy",
                        label: "开始时间",
                        VModelvalue: {
                            name: "startTime",
                            defaultValue: ""
                        }
                    };
                    this.searchConfig.searchCondition[2]={
                        order: 14,
                        type: "year",
                        formate: "yyyy",
                        label: "结束时间",
                        VModelvalue: {
                            name: "endTime",
                            defaultValue: ""
                        }
                    }

                }else{
                    this.searchConfig.searchCondition[1]={
                        order: 14,
                        type: "month",
                        formate: "yyyy-MM",
                        label: "开始时间",
                        VModelvalue: {
                            name: "startTime",
                            defaultValue: ""
                        }
                    };
                    this.searchConfig.searchCondition[2]={
                        order: 14,
                        type: "month",
                        formate: "yyyy-MM",
                        label: "结束时间",
                        VModelvalue: {
                            name: "endTime",
                            defaultValue: ""
                        }
                    };
                }
                this.startTime=content.startTime;
                this.endTime=content.endTime;
                this.timeType2=content.timeType2;
                this.reloadData();
            },
            getSearchValueSelf(content){
                if(content[0].queryValue=='year'){
                    this.searchConfig2.searchCondition[1]={
                        order: 14,
                        type: "year",
                        formate: "yyyy",
                        label: "时  间",
                        VModelvalue: {
                            name: "time",
                            defaultValue: ""
                        }
                    };

                }else{
                    this.searchConfig2.searchCondition[1]={
                        order: 14,
                        type: "month",
                        formate: "yyyy-MM",
                        label: "时  间",
                        VModelvalue: {
                            name: "time",
                            defaultValue: ""
                        }
                    };
                }
                this.time=content[1]?content[1].queryValue:'';
                this.timeType=content[0]?content[0].queryValue:'year';
                var queryparam={};
                queryparam.indexCode=this.indexCode;
                queryparam.type=this.timeType;
                queryparam.time=this.time;
                this.getdata(queryparam);

            },
            installData(){
                if(this.time==''){
                    alert('请选择时间');
                    return;
                }
                var param={
                    type:this.timetype,
                    time:this.time,

                    indexCode:this.indexCode,
                    dealedData:this.dealedData,
                    busPassengerMaxNum:this.a,
                    busPassengeCapacityRate:this.b,
                    trackPassengerMaxNum:this.c,
                    trackPassengeCapacityRate:this.d,
                    resultVlue:this.dealedData,

                };
                var url="gjjc_cityIndexSet/setMorningAndEveningPeakHourAvgCongestion";
                this.$http.$post(url,param).then((data) => {
                    if(data.code=='0000'){
                        this.reloadData();
                    }


                });
            },
            fetchTableDataMy(state){
                this.reloadData(state);
            },
            reloadData(state){
                const search = {
                    page: state && state.currentPage || this.currentPage,
                    pageSize: state && state.pageSize || this.pageSize,
                    indexCode:this.indexCode,
                    type:this.timeType2,
                    startTime:this.startTime,
                    endTime:this.endTime
                };

                this.$http.$post(this.url, search

                ).then((data) => {
                    if (this.showPagination) {
                        this.tableData = data.results;
                        this.total = data.totalRecordNum;
                    } else {
                        this.tableData = data;
                        // this.total = data.totalRecordNum;
                    }
                })
            },
            getdata(queryParam){
                // this.$refs.busindicatorInstallView[0].reloadData();
                this.$http.$get("gjjc_cityIndexSet/queryIndexInfo",queryParam).then((param) => {
                    this.a=param&&param.groupOneDivisor?param.groupOneDivisor:'';
                    this.b=param&&param.groupOneDividend?param.groupOneDividend:'';
                    this.c=param&&param.groupTwoDivisor?param.groupTwoDivisor:'';
                    this.d=param&&param.groupTwoDividend?param.groupTwoDividend:'';
                });
            },


        },
        mounted() {
            this.dealWithData();
            var data={};
            data.indexCode=this.indexCode;
            data.type=this.timetype;
            data.time=this.time;
            this.getdata(data);

        },
        watch:{
            a:function(val){
                this.dealWithData();
                // this.dealedData=this.b==''||this.a==''?'':(parseFloat(this.a)/parseFloat(this.b)*100).toFixed(2);
            },
            b:function(val){
                this.dealWithData();
                // this.dealedData=this.b==''||this.a==''?'':(parseFloat(this.a)/parseFloat(this.b)*100).toFixed(2);
            },
            c:function(){
                this.dealWithData();
            },
            d:function(){
                this.dealWithData();
            },

        },

        data() {
            return {
                tableData: [],
                tableHeight: 0,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                showPagination: true,
                startTime:'',//开始时间
                endTime:'',//结束时间
                timeType2:'year',
                timetype:'year',
                time:'',
                url:'gjjc_cityIndexSet/queryIndexInfoByPage',
                indexCode:'MorningAndEveningPeakHourAvgCongestion',
                dealedData:'',
                a:'',
                b:'',
                c:'',
                d:'',
                searchConfig2: {
                    searchCondition: [
                        {
                            order: 36,
                            type: "select",
                            label: "时间类型",
                            placeholder: "",
                            width:200,
                            VModelvalue: {
                                name: "timetype",
                                defaultValue: "year"
                            },
                            options: [
                                {
                                    value: "year",
                                    label: "年"
                                },
                                {
                                    value: "month",
                                    label: "月"
                                }
                            ]
                        },
                        {
                            order: 14,
                            type: "year",
                            formate: "yyyy",
                            label: "时  间",
                            width:200,
                            VModelvalue: {
                                name: "time",
                                defaultValue:new Date().getFullYear().toString(),
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
                searchConfig: {
                    searchCondition: [
                        {
                            order: 36,
                            type: "select",
                            label: "时间类型",
                            placeholder: "",
                            VModelvalue: {
                                name: "timeType2",
                                defaultValue: "year"
                            },
                            options: [
                                {
                                    value: "year",
                                    label: "年"
                                },
                                {
                                    value: "month",
                                    label: "月"
                                }
                            ]
                        },
                        {
                            order: 14,
                            type: "year",
                            formate: "yyyy",
                            label: "开始时间",
                            VModelvalue: {
                                name: "startTime",
                                defaultValue: ""
                            }
                        },
                        {
                            order: 14,
                            type: "year",
                            formate: "yyyy",
                            label: "结束时间",
                            VModelvalue: {
                                name: "endTime",
                                defaultValue: ""
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
    .BusCrowdedDegree-wrapper{
        .title{
            height:20px;
            line-height: 20px;
        }
        height:90%;
        display: flex;
        flex-direction: column;
        .blsz{
            flex:2;
            margin-bottom: 10px;
            font-size: 18px;
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
                    flex:4;
                    display: flex;
                    flex-direction: row;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    .first{
                        flex:1.2;
                        div{
                            margin: 0 auto;
                            line-height: 40px;
                            /*height: 40px;*/
                            color: #fff;
                            /*background-color: #ffff;*/
                            text-align: center;
                            width: 250px;
                            border-radius: 3px;
                        }
                    }
                    .second{
                        flex:2.2;
                        height: 100%;
                        display:flex;
                        flex-direction: column;
                        justify-items: center;
                        align-items: center;
                        justify-content: center;
                        .top{
                            height: 100%;
                            flex: 8;
                            display:flex;
                            flex-direction: row;
                            justify-items: center;
                            align-items: center;
                            justify-content: center;
                            .left,.right {
                                width: 100%;
                                flex:1;
                                display: flex;

                                flex-direction: row;
                                justify-items: center;
                                align-items: center;
                                justify-content: center;
                                .one {
                                    width: 100%;
                                    flex: 8;
                                    /*display: flex;*/
                                    /*flex-direction: column;*/
                                    div{
                                        height:30px;
                                        line-height: 30px;
                                        span{
                                            width:40px;
                                            text-align: center;
                                            height:30px;
                                            line-height: 30px;
                                        }
                                        input{
                                            width:80%;
                                            font-size: 14px;
                                            height:30px;

                                        }
                                    }

                                }
                                .two {
                                    /*flex:1.5;*/
                                    /*height:40px;*/
                                    /*line-height: 40px;*/
                                    /*margin-left: 20px;*/
                                }
                            }


                        }
                       .bottom{
                            flex:1.5;
                            /*height:40px;*/
                            line-height: 40px;
                            margin-left: 20px;
                        }

                    }
                    .third{
                        flex:1;
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
        .blcx{
            flex:3;
            font-size: 18px;
        }
    }

</style>