<template>
    <div class="BusIndicatorInstall-view-wrapper">

        <div  class="blsz" style="top: 3%;">
            <span class="title" style="padding-left: 2%">{{title}}设置</span>
            <hr>
            <div class="content">
                <div class="search-wrapper left">
                    <SearchPanel :searchConfig="searchConfig2" @getSearchValue="getSearchValueSelf" direction="column" ></SearchPanel>
                </div>
                <div class="right">
                    <div class="first">
                        <div>{{title}}=</div>
                    </div>
                    <div class="second">
                        <div >
                            <div><span v-if="content.install.ifShowSum" style="">∑</span><input class="normal" v-model="a" :placeholder="dividendName"></input></div>
                            <hr>
                            <div v-if="content.install.if365"><span >365 X </span><input class="special"  v-model="b" :placeholder="divisorName"></input></div>
                            <div v-else><input class="normal" v-model="b" :placeholder="divisorName"></input></div>
                        </div>
                        <div v-if="content.install.ifShowPercent">
                            X 100%
                        </div>

                    </div>
                    <div class="third">
                        <div class="bl">{{dealedData}}<label v-if="content.install.ifShowPercent">%</label></div>
                        <div  class="button-wrap">
                            <div  class="button" @click="installData">
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
            <span class="title" style="padding-left: 2%">{{title}}</span>
            <hr>
            <TableAndPagination  :searchConfig="searchConfig"
                                 :totalP=total
                                 @getSearchValue="getSearchValueMy"
                                 @fetchTableData="fetchTableDataMy"
            >
                <el-table style="width: 100%;height:100%;overflow-y: auto" height="250" :data="tableData" stripe
                          ref="table">

                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="统计时间" prop="staticDate"></el-table-column>
                    <el-table-column :label="title1" prop="indexValue"></el-table-column>
                    <el-table-column label="环比" prop="mom">
                        <template slot-scope="scope">
                            <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.mom > 0 ">{{ scope.row.mom }}%⬆</span>
                            <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.mom < 0 ">{{ scope.row.mom - scope.row.mom - scope.row.mom }}%⬇</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="同比" prop="f">
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
        name: 'BusindicatorInstallView',
        // mixins: [tableMixins],
        props:{
            title:{default:'--'},
            indexCode:{default:''},
            content:{
                type:Object,
            }
        },
        methods:{
            dealWithData(){
                this.dealedData=this.b==''||this.a==''?'':(this.content.install.ifShowPercent?(parseFloat(this.a)/(this.content.install.if365?365*parseFloat(this.b):parseFloat(this.b))*100):parseFloat(this.a)/(this.content.install.if365?365*parseFloat(this.b):parseFloat(this.b))).toFixed(2);
            },
            getSearchValueMy(content){
                if(content.timeType2=='year'){
                    this.searchConfig.searchCondition[2]={
                        order: 14,
                        type: "year",
                        formate: "yyyy",
                        label: "开始时间",
                        VModelvalue: {
                            name: "startTime",
                            defaultValue: ""
                        }
                    };
                    this.searchConfig.searchCondition[3]={
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
                    this.searchConfig.searchCondition[2]={
                        order: 14,
                        type: "month",
                        formate: "yyyy-MM",
                        label: "开始时间",
                        VModelvalue: {
                            name: "startTime",
                            defaultValue: ""
                        }
                    };
                    this.searchConfig.searchCondition[3]={
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
                queryparam.type=this.timetype;
                queryparam.time=this.time;
                this.getdata(queryparam);

            },
            installData(){
                if(this.time==''){
                    alert('请选择时间');
                    return;
                }
                var data={
                    timeType:this.timetype,
                    time:this.time,

                    type:this.indexCode,
                    dealedData:this.dealedData,
                    a:this.a,
                    b:this.b,
                };
                // this.$emit('install',data);
                // this.reloadData();
                this.saveOrupdate(data);
            },
            saveOrupdate(data){
                var postData=this.dealPostData(data);
                if(postData.url!=""){
                    this.$http.$post(postData.url,postData.param).then((data) => {
                        if(data.code)
                        this.reloadData();

                    });

                }

            },

            dealPostData(data){
                var postData={};
                var url="",param={};
                param.type=data.timeType;
                param.time=data.time;
                param.resultVlue=data.dealedData;
                switch(data.type){
                    case 'busTramEntranceRate'://公共汽电车进场率
                        url="gjjc_cityIndexSet/setBusTramEntranceRate";
                        param.parkedVehicleNum=data.a;
                        param.busTramTotalNum=data.b;
                        break;
                    case 'PubTransportComplaintSetRate'://公共交通投诉处理完结率
                        url="gjjc_cityIndexSet/setPubTransportComplaintSetRate";
                        // param.type=data.timeType;
                        // param.time=data.time;
                        param.finishedPubTransportCaseNum=data.a;
                        param.pubTransportComplaintsTotalNum=data.b;
                        // param.resultVlue=data.dealedData;
                        break;
                    case 'PubTransportCardUseRate'://公共交通乘车一卡通使用率
                        url="gjjc_cityIndexSet/setPubTransportCardUseRate";
                        // param.type=data.timeType;
                        // param.time=data.time;
                        param.oneCardPassengerTotalNum=data.a;
                        param.pubTransportTrafficTotalNum=data.b;
                        // param.resultVlue=data.dealedData;
                        break;
                    case 'PubTransportemployeesIncomeLevel'://公共交通职工收入水平
                        url="gjjc_cityIndexSet/setPubTransportemployeesIncomeLevel";
                        param.pubTransportEmployeeAvgWage=data.a;
                        param.localSocialWorkAvgWage=data.b;
                        break;
                    case 'PubCarTramAccidentMortalityRate'://公共汽电车责任事故死亡率
                        url="gjjc_cityIndexSet/setPubCarTramAccidentMortalityRate";
                        param.liabilityAccidentDeathNum=data.a;
                        param.operatTotalMileage=data.b;
                        break;
                    case 'RailTrafficLiabilityAccidentMortalityRate'://轨道交通责任事故死亡率
                        url="gjjc_cityIndexSet/setRailTrafficLiabilityAccidentMortalityRate";
                        param.liabilityAccidentDeathNum=data.a;
                        param.operatTotalMileage=data.b;
                        break;
                    case 'publicTransportMobilityShare'://公共交通机动化出行分担率
                        url="gjjc_cityIndexSet/setPublicTransportMobilityShare";
                        param.pubTransportTrips=data.a;
                        param.totalMotorizedTravel=data.b;//???
                        break;
                    case 'PubTransportTripsShare'://公共交通出行分担率
                        url="gjjc_cityIndexSet/setPubTransportTripsShare";
                        param.pubTransportTrips=data.a;
                        param.residentTripsWithoutWalkeTotal=data.b;
                        break;
                    case 'pubTransitStationFiveMCoverage'://公共交通站点500米覆盖率
                        url="gjjc_cityIndexSet/setPubTransitStationFiveMCoverage";
                        param.stationFiveMCoverageAreaRadius=data.a;
                        param.cityCenterArea=data.b;
                        break;
                    case 'pubTransitStationThreeMCoverage'://公共交通站点300米覆盖率
                        url="gjjc_cityIndexSet/setPubTransitStationThreeMCoverage";
                        param.stationThreeMCoverageAreaRadius=data.a;
                        param.cityCenterArea=data.b;
                        break;
                    case 'BusLaneSetRatio'://公交专用车道设置比率
                        url="gjjc_cityIndexSet/setBusLaneSetRatio";
                        param.dedicatedLaneRoadLength=data.a;
                        param.busLineNetworkTotalLength=data.b;
                        break;
                    case 'BusNetworkDensity'://公共汽电车线路网密度
                        url="gjjc_cityIndexSet/setBusNetworkDensity";
                        param.busLineNetworkLength=data.a;
                        param.centerCityBuiltArea=data.b;
                        break;
                    case 'BusLineNetworkRatio'://公共汽电车线路网比率
                        url="gjjc_cityIndexSet/setBusLineNetworkRatio";
                        param.busLineNetworkLength=data.a;
                        param.urbanRoadNetworkLength=data.b;
                        break;
                    case 'MorningAndEveningPeakHourAvgSpeed'://早晚高峰时段公共汽电车平均运营时速
                        url="gjjc_cityIndexSet/setMorningAndEveningPeakHourAvgSpeed";
                        param.avgOprateSpeed=data.a;
                        param.shiftsTotalNum=data.b;
                        break;
                    case 'PubTransitVehiclePopulationPerople'://万人公共交通车辆保有量
                        url="gjjc_cityIndexSet/setPubTransitVehiclePopulationPerople";
                        param.pubTransPortPlatformsTotalNum=data.a;
                        param.urbanPopulation=data.b;
                        break;
                    case 'GreenPubTransPortVehicleRatio'://绿色公共交通车辆比率
                        url="gjjc_cityIndexSet/setGreenPubTransPortVehicleRatio";
                        param.greenPubTransportVehicleNum=data.a;
                        param.pubTransportVehicleTotalNum=data.b;
                        break;
                    case 'UrbanRuralPassLineTransitOperationRatio'://城乡客运线路公交化运营比率
                        url="gjjc_cityIndexSet/setUrbanRuralPassLineTransitOperationRatio";
                        param.pubTransportUrbanRuralLineNum=data.a;
                        param.urbanRuralPassengerTotalNum=data.b;
                        break;
                    case 'BusTramsAvgAge'://公共汽电车平均车龄
                        url="gjjc_cityIndexSet/setBusTramsAvgAge";
                        param.pubMotorCycleUseYear=data.a;
                        param.busTramTotalNum=data.b;
                        break;
                    case 'BusTramsStationAvgArea'://公共汽电车车均场站面积
                        url="gjjc_cityIndexSet/setBusTramsStationAvgArea";
                        param.busStationTotalArea=data.a;
                        param.pubBusTotalNum=data.b;
                        break;
                    case 'PubTransportharborStopSetRate'://公共汽电车港湾式停靠站设置率
                        url="gjjc_cityIndexSet/setPubTransportharborStopSetRate";
                        param.harbourStyleStopStationNum=data.a;
                        param.stopNum=data.b;
                        break;
                    case 'BusPriorityIntersectionRatio'://公交优先通行交叉口比率
                        url="gjjc_cityIndexSet/setBusPriorityIntersectionRatio";
                        param.busPriorityCrossNum=data.a;
                        param.urbanArerialRoadCrossNum=data.b;
                        break;





                }
                postData.url=url;
                postData.param=param;
                return postData;
            },
            fetchTableDataMy(state){
                debugger;
                this.reloadData(state);
            },
            reloadData(state){
                const search = {
                    page: state && state.currentPage || this.currentPage,
                    pageSize: state && state.pageSize || this.pageSize,
                    indexCode:this.indexCode==''?1:this.indexCode,
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
                });
            },

        },
        mounted() {
            this.dealWithData();
            this.divisorName=this.content.install.divisorName;//除数名称
            this.dividendName=this.content.install.dividendName//被除数名称

            this.title1=this.title;
            if(this.content.install.ifShowPercent){
                this.title1+='(%)';
            }
            if(this.content.install.if365){
                this.searchConfig2.searchCondition[0].options.splice(1,1);
                this.searchConfig.searchCondition[1].options.splice(1,1);
            }
            // this.searchConfig2.searchCondition[0].VModelvalue.defaultValue=this.indexCode;
            var data={};
                data.indexCode=this.indexCode;
            data.type=this.timeType;
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
                title1:'--',
                divisorName:'',//除数名称
                dividendName:'',//被除数名称
                dealedData:'',
                a:'',
                b:'',
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
                    isKeyV:true,
                    searchCondition: [
                        {
                            order: 3,
                            type: "input",
                            label: "指标编码",
                            placeholder: "指标编码",
                            VModelvalue: {
                                name: "indexCode",
                                defaultValue: this.indexCode,
                            },
                        },
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
                },
                url:"/gjjc_cityIndexSet/queryIndexInfoByPage",
            }
        }
    }
</script>
<style lang="css" scoped>
    .blcx >>>  .item:nth-child(1){
    display:none;
    }
</style>

<style lang="scss" scoped>
    .BusIndicatorInstall-view-wrapper{
        height:90%;
        display: flex;
        flex-direction: column;
        .title{
            height:20px;
            line-height: 20px;
        }
        .blsz{
            flex:2;
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
                    flex:2.5;
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
                        flex:1.4;
                        display:flex;
                        flex-direction: row;
                        justify-items: center;
                        align-items: center;
                        justify-content: center;
                        div:nth-child(1){
                            flex: 7;
                            hr{
                                width:260px;
                            }
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
                                    /*width:80%;*/
                                    font-size: 14px;
                                    height:30px;
                                }
                                input.normal{
                                    width:230px;
                                }
                                input.special{
                                    width:178px;
                                }
                            }

                        }
                        div:nth-child(2){
                            flex:3;
                            /*width:50px;*/
                            /*height:40px;*/
                            line-height: 40px;
                            margin-left: 10px;
                        }

                    }
                    .third{
                        flex:1.2;
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
                            background-color: rgba(255,255,255,1);
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
            margin-top: 20px;
            flex:3;
            font-size: 18px;
        }
    }

</style>