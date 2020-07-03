<template>
    <!-- 公交运行监测 -- 实时 监测 -->
    <div class="comprehensiveMonitor-wrapper">
        <Basemap></Basemap>
        <div class="top">
            <div class="traffic-wrapper">
                <div class="item-wrapper">
                    <mapDataCenterData :itemList="itemList" ></mapDataCenterData>
                </div>
            </div>
        </div>
        <div class="panel-wrapper left">
            <panel>
                <!-- 今日运行情况 -->
                <div class="yxqk-container">
                    <PanelItem title="实时运行异常情况" :displaySwitch=false >
                        <div class="yxqk-wrapper">
                            <div class="item-wrapper">
                                <div class="item" @click="qk1">
                                    <h2>客流拥挤线路</h2>
                                    <p>{{klyjxl}}<span>条</span>  </p>
                                </div>
                                <div class="item" @click="qk2">
                                    <h2>客流异常站点</h2>
                                    <p>{{yczd}} <span>个</span>  </p>
                                </div>
                            </div>
                            <div class="item-wrapper bj">
                                <div class="item" @click="qk3">
                                    <h2>拥堵线路</h2>
                                    <p>{{ydxl}} <span>条</span>  </p>
                                </div>
                                <div class="item" @click="qk4">
                                    <h2>故障车辆</h2>
                                    <p>{{gzcl}} <span>辆</span>  </p>
                                </div>
                            </div>

                        </div>
                        <!-- 详情 -->
                        <div class="detail-wrapper">
                            <h2>运行异常明细({{detailName}})</h2>
                            <div style="position: absolute; width: calc(100% - 0.45rem); left:0.2rem;right: 0.4rem; height: 0.02rem;background-color: rgba(32, 86, 221, 0.6);bottom: -0.1rem;"></div>
                            <!--                        <p v-if="p1" >出港 <span>{{cgsl}} 架次/小时</span> ,最新出港 <span> {{zxcg}} </span> </p>-->
                            <!--                        <p v-if="p2">进港 <span>{{jgsl}} 架次/小时</span> ,最新进港 <span> {{zxjg}} </span> </p>-->
                            <!--                        <p v-if="p3">延误率 <span>{{ywl}}</span> ,平均延误 <span> {{pjyw}} </span> </p>-->
                            <div class="detail" v-if="p1">
                                <div >
                                    <el-table :data="linePersonData" style="width: 100%" stripe fit=true >
                                        <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >=200&&scope.row.person<=400">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{scope.$index+1 }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="线路" prop="lineNo">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.row.lineNo }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >=200&&scope.row.person<=400">{{ scope.row.lineNo }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.row.lineNo }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{scope.row.lineNo }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="影响车辆" prop="carNo">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >=200&&scope.row.person<=400">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{ scope.row.carNo }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="客流人数" prop="person">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.row.person }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >300&&scope.row.person<=400">{{ scope.row.person }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.row.person }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{ scope.row.person }}</span>
                                            </template>
                                        </el-table-column>

                                    </el-table>
                                </div>

                            </div>
                            <div class="detail" v-if="p2">
                                <div >
                                    <el-table :data="stationPersonData" style="width: 100%" stripe fit=true >
                                        <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >=200&&scope.row.person<=400">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{scope.$index+1 }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="站点名称" prop="stationName">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.row.stationName }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >=200&&scope.row.person<=400">{{ scope.row.stationName }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.row.stationName }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{scope.row.stationName }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="影响车辆" prop="carNo">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >=200&&scope.row.person<=400">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{ scope.row.carNo }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="客流人数" prop="person">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.person >400">{{ scope.row.person }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.person >300&&scope.row.person<=400">{{ scope.row.person }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.person >=100&&scope.row.person<200">{{ scope.row.person }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.person <100">{{ scope.row.person }}</span>
                                            </template>
                                        </el-table-column>

                                    </el-table>
                                </div>

                            </div >
                            <div class="detail" v-if="p3">
                                <!--                            <trafficJam></trafficJam>-->
                                <div >
                                    <ChangeEchar :itemList="tableConfigm" @getStatues="changeTable" ></ChangeEchar>
                                </div>
                                <div v-if="tableOneShow">
                                    <el-table :data="tableData1" style="width: 100%" stripe fit=true >
                                        <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.speed <=3">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.speed >3&&scope.row.speed<=4">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.speed >4&&scope.row.speed<6">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.speed >=6">{{scope.$index+1 }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="线路" prop="lineNo">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.speed <=3">{{ scope.row.lineNo }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.speed >3&&scope.row.speed<=4">{{ scope.row.lineNo }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.speed >4&&scope.row.speed<6">{{ scope.row.lineNo }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.speed >=6">{{scope.row.lineNo }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="影响车辆">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.speed <=3">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.speed >3&&scope.row.speed<=4">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.speed >4&&scope.row.speed<6">{{ scope.row.carNo }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.speed >=6">{{ scope.row.carNo }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="路段车速">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.speed <=3">{{ scope.row.speed }}km/h</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.speed >3&&scope.row.speed<=4">{{ scope.row.speed }}km/h</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.speed >4&&scope.row.speed<6">{{ scope.row.speed }}km/h</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.speed >=6">{{ scope.row.speed }}km/h</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="拥堵路段">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.speed <=3">{{ scope.row.roadSection }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.speed >3&&scope.row.speed<=4">{{ scope.row.roadSection }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.speed >4&&scope.row.speed<6">{{ scope.row.roadSection }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.speed >=6">{{ scope.row.roadSection }}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div  v-else >
                                    <!--                                <TableAndPagination :showSearchPanel=false>-->
                                    <el-table style="width: 100%;height:100%;overflow-y: auto" :height="tableHeight" :data="tableData" stripe ref="table" >
                                        <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.speed <=3">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,158,30)" v-if="scope.row.speed >3&&scope.row.speed<=4">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,234,70)" v-if="scope.row.speed >4&&scope.row.speed<6">{{ scope.$index+1 }}</span>
                                                <span style="color:rgb(255,255,255)" v-if="scope.row.speed >=6">{{scope.$index+1 }}</span>
                                            </template>

                                        </el-table-column>

                                        <el-table-column label="路段" prop="roadSection"></el-table-column>
                                        <el-table-column label="速度" prop="speed"></el-table-column>
                                    </el-table>
                                    <!--                                </TableAndPagination>-->
                                </div>
                            </div>
                            <div class="detail" v-if="p4">
                                <div >
                                    <el-table :data="vehiclenData" style="width: 100%" stripe fit=true >
                                        <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                <span style="color:rgb(255,255,255)" >{{scope.$index+1 }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="线路" prop="lineNo">
                                            <template slot-scope="scope">
                                                <span style="color:rgb(255,255,255)" >{{scope.row.lineNo }}</span>
                                            </template>

                                        </el-table-column>
                                        <el-table-column label="车牌号">
                                            <template slot-scope="scope">
                                                <span style="color:rgb(255,255,255)" >{{ scope.row.vehicleNO }}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>

                            </div>
                        </div>
                    </PanelItem>

                </div>

                <div class="gjzxl">
                    <PanelItem title="公交在线率" :displaySwitch=false >
                        <!--                    <jczbdl />-->
                        <div>
                            <div>
                                <h2> 当前在线率{{online}}%</h2>
                            </div>
                            <div style="height:200px;margin-top:20px;">
                                <v-chart :options="zxlOption" :autoresize="true" theme="theme"></v-chart>
                            </div>

                        </div>
                    </PanelItem>
                </div>
            </panel>

        </div>
        <div class="panel-wrapper right">
            <div>
                <!--<el-checkbox-group v-model="checkList">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                </el-checkbox-group>-->
            </div>


        </div>
        
    </div>
</template>

<script>
    import echartContent from"../AirTransport/echartContent";
    export default {
        name: '',
        mixins: [echartContent],
        mounted() {
            this.$http.$get("gjjc_busMainInfo/getBusCurrentInfo").then((param) => {
                this.dealWithData(param);
                // this.xcsg=1213;
            });
            this.zxlOption=this.creatOption(this.zxlData,"line","",false,false,8,true,10, "在线率");
        },
        methods: {
            dealWithData(data){
                if(data.busOnLineList!=null&&data.busOnLineList.length>0){
                    var zxlarr=[ ['工作日','今日']],time=[],value=[],value1=[];
                    data.busOnLineList.forEach(e=>{
                        time.push(e.statisticTime);
                        value.push((e.workdayOnLimeVehicleNum/e.workdayVehicleNum*100).toFixed(2));
                        value1.push((e.todayOntimeVehicleNum/e.todayVehicleNum*100).toFixed(2));
                    })
                    zxlarr.push(time);
                    zxlarr.push(value);
                    zxlarr.push(value1);
                    this.zxlOption=this.creatOption(zxlarr,"line","",false,false,8,true,10, "在线率");
                    var max=data.busOnLineList.length-1;
                    this.online=(data.busOnLineList[max].todayOntimeVehicleNum/data.busOnLineList[max].todayVehicleNum*100).toFixed(2);
                }
                if(data.busLineSectionCongestedList!=null&&data.busLineSectionCongestedList.length>0){
                    var buslineArr=[];
                    data.busLineSectionCongestedList.forEach(e=>{
                        var value={};
                        value.lineNo=e.lineName;
                        value.carNo=e.vehicleNum;
                        value.speed=e.speed;
                        value.roadSection=e.sectionName;
                        buslineArr.push(value);
                    })

                    this.tableData=buslineArr;
                    this.ydxl=data.busLineSectionCongestedList.length;
                }
                if(data.busPersonNumMaxList!=null&&data.busPersonNumMaxList.length>0){
                    var buslineArr=[];
                    data.busPersonNumMaxList.forEach(e=>{
                        var value={};
                        value.lineNo=e.lineName;
                        value.carNo=e.vehicleNum;
                        value.person=e.personNum;
                        buslineArr.push(value);
                    })

                    this.linePersonData=buslineArr;
                    this.klyjxl=data.busPersonNumMaxList.length;
                }
                if(data.busPersonNumWarnStationList!=null&&data.busPersonNumWarnStationList.length>0){
                    var buslineArr=[];
                    data.busPersonNumWarnStationList.forEach(e=>{
                        var value={};
                        value.lineNo=e.lineName;
                        value.carNo=e.vehicleNum;
                        value.person=e.personNum;
                        value.stationName=e.stationName;
                        buslineArr.push(value);
                    })

                    this.stationPersonData=buslineArr;
                    this.yczd=data.busPersonNumWarnStationList.length;
                }
                if(data.busErrorList!=null&&data.busErrorList.length>0){
                    var buslineArr=[];
                    data.busErrorList.forEach(e=>{
                        var value={};
                        value.lineNo=e.lineName;
                        value.vehicleNO=e.vehicleNO;
                        buslineArr.push(value);
                    })

                    this.vehiclenData=buslineArr;
                    this.gzcl=data.busErrorList.length;
                }
                // this.online=data.
                this.itemList[0].number=data.busNum==null?0:data.busNum;
                this.itemList[0].rate=data.lastMonthBusNumRate==null?0:data.lastMonthBusNumRate.toFixed(2);
                this.itemList[1].number=data.busMileage==null?0:data.busMileage;
                this.itemList[1].rate=data.lastMonthBusMileageRate==null?0:data.lastMonthBusMileageRate.toFixed(2);
                this.itemList[2].number=data.busAvgSpeed==null?0:data.busAvgSpeed;
                this.itemList[2].rate=data.lastMonthBusAvgSpeedRate==null?0:data.lastMonthBusAvgSpeedRate.toFixed(2);
                this.itemList[3].number=data.personNum==null?0:data.personNum;
                this.itemList[3].rate=data.lastMonthPersonNumRate==null?0:data.lastMonthPersonNumRate.toFixed(2);

            },
            changeTable(content){
                if (content == "按公交线路") {
                    this.tableOneShow = true;
                }else if(content == "按道路方式"){
                    this.tableOneShow = false;
                }
            },
            qk1() {
                this.detailName = '客流拥挤线路';
                this.p1 = true;
                this.p2 = false;
                this.p3 = false;
                this.p4 = false;
            },
            qk2() {
                this.detailName = '客流异常站点';
                this.p1 = false;
                this.p2 = true;
                this.p3 = false;
                this.p4 = false;
            },
            qk3() {
                this.detailName = '拥堵线路';
                this.p1 = false;
                this.p2 = false;
                this.p3 = true;
                this.p4 = false;
            },
            qk4() {
                this.detailName = '故障车辆';
                this.p1 = false;
                this.p2 = false;
                this.p3 = false;
                this.p4 = true;
            }
        },
        data() {
            return {
                checkList:[],
                klyjxl:0,//客流拥挤线路
                yczd:0,//异常站点
                ydxl:0,//拥堵线路
                gzcl:0,//故障车辆
                detailName:'客流拥挤线路',
                p1:true,
                p2:false,
                p3:false,
                p4:false,
                tableOneShow:true,
                tableConfigm:['按公交线路','按道路方式'],
                zxlData:[
                    ['工作日','今日'],
                    ['1：00','2：00','3：00','4：00','5：00'],
                    [20,54.31,34.21,76.25,82.82],
                    [65.32,26.25,87.56,72.52,43.52]
                ],
                zxlOption:{},
                online:80,
                tableData:[
                    {
                        lineNo:55,
                        carNo:2,
                        speed:3,
                        roadSection:'科华南路'
                    },
                    {
                        lineNo:83,
                        carNo:3,
                        speed:4,
                        roadSection:'金沙'
                    },
                    {
                        lineNo:133,
                        carNo:4,
                        speed:5,
                        roadSection:'科华南路'
                    },
                    {
                        lineNo:34,
                        carNo:6,
                        speed:6,
                        roadSection:'人民南路'
                    },
                    {
                        lineNo:91,
                        carNo:5,
                        speed:10,
                        roadSection:'人民北路'
                    },

                ],
                tableData1:[
                    {
                        lineNo:55,
                        carNo:2,
                        speed:3,
                        roadSection:'科华南路'
                    },
                    {
                        lineNo:83,
                        carNo:3,
                        speed:4,
                        roadSection:'金沙'
                    },
                    {
                        lineNo:133,
                        carNo:4,
                        speed:5,
                        roadSection:'科华南路'
                    },
                    {
                        lineNo:34,
                        carNo:6,
                        speed:6,
                        roadSection:'人民南路'
                    },
                    {
                        lineNo:91,
                        carNo:5,
                        speed:10,
                        roadSection:'人民北路'
                    },
                    ],
                linePersonData:[
                    {
                        lineNo:55,
                        carNo:2,
                        person:3,
                    },
                    {
                        lineNo:83,
                        carNo:3,
                        person:4,
                    },
                    {
                        lineNo:133,
                        carNo:4,
                        person:5,
                    },
                    {
                        lineNo:34,
                        carNo:6,
                        person:6,
                    },
                    {
                        lineNo:91,
                        carNo:5,
                        person:10,
                    },

                ],
                stationPersonData:[
                    {
                        lineNo:55,
                        carNo:2,
                        person:3,
                        stationName:'科华南路'
                    },
                    {
                        lineNo:83,
                        carNo:3,
                        person:4,
                        stationName:'金沙'
                    },
                    {
                        lineNo:133,
                        carNo:4,
                        person:5,
                        stationName:'科华南路'
                    },
                    {
                        lineNo:34,
                        carNo:6,
                        person:6,
                        stationName:'人民南路'
                    },
                    {
                        lineNo:91,
                        carNo:5,
                        person:10,
                        stationName:'人民北路'
                    },

                ],
                vehiclenData:[
                    {
                        lineNo:55,
                        vehicleNO :'川A12345',
                    },
                    {
                        lineNo:83,
                        vehicleNO :'川A12345',

                    },
                    {
                        lineNo:133,
                        vehicleNO :'川A12345',

                    },


                ],
                itemList: [
                        {
                            id: "1",
                            sub: "发班班次",
                            number: 12312,
                            unite: "次",
                            rateUnite: "较上月",
                            rate: -6
                        },
                        {
                            id: "2",
                            sub: "营运里程",
                            number: 4567,
                            unite: "公里",
                            rateUnite: "较上月",
                            rate: 6
                        },
                        {
                            id: "3",
                            sub: "平均车速",
                            number: 45,
                            unite: "km/h",
                            rateUnite: "较上月",
                            rate: -16
                        },
                        {
                            id: "4",
                            sub: "客流",
                            number: 125.45,
                            unite: "万人",
                            rateUnite: "较上月",
                            rate: 12
                        },
                    ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comprehensiveMonitor-wrapper{
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
            display: flex;
            flex-direction: column;
            .yxqk-wrapper{
               flex:6;
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
            .gjzxl {
                flex: 4;
            }
        }
        .top{
            position: absolute;
            top :10px;
            left:50%;
            width:640px;
            height:90px;
            border-radius:16px;
            transform: translateX(-50%);
            justify-content: center;
            .traffic-wrapper{
                display: flex;
                flex-direction: column;
                margin-top: 10px;
                .bj{
                    margin: 20px 0;
                }
                .item-wrapper{
                    display: flex;
                    justify-content: space-around;
                    .item{
                        width: 110px;
                        height: 70px;
                        border:2px solid rgba(32,86,221,.4);
                        border-radius:8px;
                        background-color: rgba(32, 86, 221, .4);
                        .section{
                            p{
                                font-size: 12px;
                                color: #ea1c2f;
                            }
                        }
                        @include v-center;
                        h2{
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
                .data-time{
                    p{
                        color:#00ff00;
                    }
                }
            }
        }
        .right{
            top:120px;
            right: 20px;
            height:50px;
            background: rgba(32, 86, 221, 0.4);
            border: 0.01rem solid #2056dd;
            display: flex;
            flex-direction: column;
        }
    }
</style>