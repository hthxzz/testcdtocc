<template>
    <!-- 公交运行监测 -- 综合 监测 -->
    <div class="comprehensiveMonitor-wrapper nomap-content-container">
         <div class="left">
             <div class="top ">
                 <panelTitle title="公交基础情况" :displaySwitch=false ></panelTitle>
                 <div class="content">
<!--                     <img :src="gjche" alt="" srcset="" class="gjche" >-->
                 </div>
             </div>
             <div class="bottom ">
                 <div class="jcxx">
                     <div class="tupian">
                         <img  :src="require('./img/gjxl_new.png')" class="imgClass" />
                     </div>
                     <div class="wenzi">
                         <ul>
                             <li>公交线路(条)</li>
                             <li>{{gjxl}}<span class="unitName"> 条</span></li>
                         </ul>
                     </div>
                 </div>
                 <div class="jcxx">
                     <div class="tupian">
                         <img  :src="require('./img/snzd_new.png')" class="imgClass" />
                     </div>
                     <div class="wenzi">
                         <ul>
                             <li>枢纽站点(个)</li>
                             <li>11/{{zdsl}}<span class="unitName"> 个</span></li>
                         </ul>
                     </div>
                 </div>
                 <div class="jcxx">
                     <div class="tupian">
                         <img  :src="require('./img/yycl_new.png')" class="imgClass" />
                     </div>
                     <div class="wenzi">
                         <ul>
                             <li>营运车辆(辆)</li>
                             <li>{{busVehicle}}<span class="unitName"> 辆</span></li>
                         </ul>
                     </div>
                 </div>
                 <div class="jcxx">
                     <div class="tupian">
                         <img  :src="require('./img/zyd_new.png')" class="imgClass" />
                     </div>
                     <div class="wenzi">
                         <ul>
                             <li>专用道</li>
                             <li>{{busLane}}<span class="unitName"> 条</span> {{busLaneLength}}<span class="unitName"> 公里</span> </li>
                         </ul>
                     </div>
                 </div>
                 <div class="jcxx">
                     <div class="tupian">
                         <img  :src="require('./img/cyry_new.png')" class="imgClass" />
                     </div>
                     <div class="wenzi">
                         <ul>
                             <li>从业人员(人)</li>
                             <li>{{cyry}}<span class="unitName"> 人</span></li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
         <div class="mid">
             <div class="top ">
                 <panelTitle title="实时运营情况" :displaySwitch=false ></panelTitle>
                 <div class="yltr_warpper">
                     <div>
                         <h2 class="content" >发班班次(次)</h2>
                     </div>
                     <div>
                         <img :src="ylqkbg" alt="" srcset="" class="yltrqkbg" >
                     </div>

                     <div>
                         <p class="content" >{{fbbc}} </p>
                         <h2 class="content" >较上月同期
                             <span class="content up" v-if="fbbcbl>=0">{{fbbcbl}}% <span>⬆</span></span>
                             <span class="content down" v-else>{{fbbcbl}}% <span>⬇</span> </span></h2>
                     </div>

<!--                     <div class="item item1">-->
<!--                         <h2 class="content" >发班班次</h2>-->
<!--                         <p class="content" >{{fbbc}} <span>次</span> </p>-->
<!--                         <h2 class="content" >较上月同期</h2>-->
<!--                         <p class="content up" v-if="fbbcbl>=0">{{fbbcbl}}% <span>⬆</span> </p>-->
<!--                         <p class="content down" v-else>{{fbbcbl}}% <span>⬇</span> </p>-->
<!--                     </div>-->
<!--                     <div class="item item2">-->
<!--                         <h2 class="content" >营运里程</h2>-->
<!--                         <p class="content" >{{yylc}} <span>公里</span> </p>-->
<!--                         <h2 class="content" >较上月同期</h2>-->
<!--                         <p class="content up" v-if="yylcbl>=0">{{yylcbl}}% <span>⬆</span> </p>-->
<!--                         <p class="content down" v-else>{{yylcbl}}% <span>⬇</span> </p>-->
<!--                     </div>-->
                 </div>

             </div>
             <div class="mid ">
                 <div class="kl">
                     <div class="rollNumber-container">
                         <div class="rollNumber-wrap">
                             <!-- <label for>{{ title }}</label> -->
                             <div class="number rubberBand animated">
                                 <div class="item" v-for="item in  String(this.totalTraffic).split('')">
                                     <!-- {{ item }} -->
                                 </div>
                                 <count-to :startVal="0" :endVal="totalTraffic" separator :duration="5000" />
                             </div>
                             <label for>人</label>
                         </div>
                     </div>
<!--                     <RollNumber title="总客流量" :value="totalTraffic" unit="人"></RollNumber>-->
                 </div>
                 <div class="gjjc_warpper">
                     <div>
                         <h2 class="content" >营运里程(公里)</h2>
                     </div>
                     <div>
                         <img :src="require('./img/yylc_new.png')" alt="" srcset="" class="yltrqkbg" >
                     </div>

                     <div>
                         <p class="content" >{{yylc}}  </p>
                         <h2 class="content" >较上月同期
                             <span class="content up" v-if="yylcbl>=0">{{yylcbl}}% <span>⬆</span></span>
                             <span class="content down" v-else>{{yylcbl}}% <span>⬇</span> </span></h2>
                     </div>

                     <!--                     <div class="item item1">-->
                     <!--                         <h2 class="content" >发班班次</h2>-->
                     <!--                         <p class="content" >{{fbbc}} <span>次</span> </p>-->
                     <!--                         <h2 class="content" >较上月同期</h2>-->
                     <!--                         <p class="content up" v-if="fbbcbl>=0">{{fbbcbl}}% <span>⬆</span> </p>-->
                     <!--                         <p class="content down" v-else>{{fbbcbl}}% <span>⬇</span> </p>-->
                     <!--                     </div>-->
                     <!--                     <div class="item item2">-->
                     <!--                         <h2 class="content" >营运里程</h2>-->
                     <!--                         <p class="content" >{{yylc}} <span>公里</span> </p>-->
                     <!--                         <h2 class="content" >较上月同期</h2>-->
                     <!--                         <p class="content up" v-if="yylcbl>=0">{{yylcbl}}% <span>⬆</span> </p>-->
                     <!--                         <p class="content down" v-else>{{yylcbl}}% <span>⬇</span> </p>-->
                     <!--                     </div>-->
                 </div>

             </div>
             <div class="bottom ">
                 
                 <div class="fwbz_warpper">
                     <img :src="fwbzbg" alt="" srcset="" class="fwbzbg" >
                     <div class="item item1">
                         <h2 class="content" >车次准点率</h2>
                         <p class="content" >{{cczdl}}% <span></span> </p>
                         <h2 class="content" >较上月同期
                             <span class="content up" v-if="cczdlbl>=0">{{cczdlbl}}% <span>⬆</span> </span>
                             <span class="content down" v-else>{{cczdlbl}}% <span>⬇</span> </span></h2>

                     </div>
                     <div class="item item2">
                         <h2 class="content" >班次执行率</h2>
                         <p class="content" >{{bczxl}}% <span></span> </p>
                         <h2 class="content" >较上月同期
                             <span class="content up" v-if="bczxlbl>=0">{{bczxlbl}}% <span>⬆</span> </span>
                             <span class="content down" v-else>{{bczxlbl}}% <span>⬇</span> </span></h2>

                     </div>
                     <div class="item item3">
                         服务保障
                     </div>
                 </div>


             </div>
         </div>
         <div class="right">
             <div class="top ">
                 <panelTitle title="公交投诉情况" :displaySwitch=false ></panelTitle>
               <!--  <yytsCommon :tssl="tssl" :tsslbl="tsslbl" :clwj="clwj" :clwjbl="clwjbl"></yytsCommon>&ndash;&gt;-->
<!--                 <aqwfCommon :xcsg="xcsg" :xcsgbl="xcsgbl" :xzcf="xzcf" :xzcfbl="xzcfbl" :jtwf="jtwf" :jtwfbl="jtwfbl"></aqwfCommon>-->
                 <div class="tsqk">
                     <div class="tssl">
                         <div class="wenzi">
                             <ul>
                                 <li>投诉数量(起)  <span style="color:#FFFF00"> {{tssl}}</span></li>
                                 <li><h2 class="content" >较上月同期
                                     <span class="content up" v-if="tsslbl>=0">{{tsslbl}}% <span>⬆</span></span>
                                     <span class="content down" v-else>{{tsslbl}}% <span>⬇</span> </span></h2></li>
                             </ul>
                         </div>
                     </div>
                     <div class="wjqk">
                         <div class="wenzi">
                             <ul>
                                 <li>投诉数量(起)  <span style="color:#FFFF00"> {{clwj}}</span></li>
                                 <li><h2 class="content" >较上月同期
                                     <span class="content up" v-if="clwjbl>=0">{{clwjbl}}% <span>⬆</span></span>
                                     <span class="content down" v-else>{{clwjbl}}% <span>⬇</span> </span></h2></li>
                             </ul>
                         </div>
                     </div>
                 </div>


             </div>
             <div class="mid ">
                 <panelTitle title="安全违法情况" :displaySwitch=false ></panelTitle>
                 <!--                 <aqwfCommon :xcsg="xcsg" :xcsgbl="xcsgbl" :xzcf="xzcf" :xzcfbl="xzcfbl" :jtwf="jtwf" :jtwfbl="jtwfbl"></aqwfCommon>-->
<!--                 <yytsCommon :tssl="tssl" :tsslbl="tsslbl" :clwj="clwj" :clwjbl="clwjbl"></yytsCommon>-->
                 <div class="aqwf">
                     <div class="aqwffl">
                         <div class="tupian">
                             <img  :src="require('./img/xcsg_new.png')" class="imgClass" />
                         </div>
                         <div class="wenzi">
                             <ul>
                                 <li>行车事故(起) <span>{{xcsg}}</span></li>
                                 <li><h2 class="content" >较上月同期
                                     <span class="content up" v-if="xcsgbl>=0">{{xcsgbl}}% <span>⬆</span></span>
                                     <span class="content down" v-else>{{xcsgbl}}% <span>⬇</span> </span></h2></li>
                             </ul>
                         </div>
                     </div>
                     <div class="aqwffl">
                         <div class="tupian">
                             <img  :src="require('./img/xzcf_new.png')" class="imgClass" />
                         </div>
                         <div class="wenzi">
                             <ul>
                                 <li>行政处罚(起) <span>{{xzcf}}</span></li>
                                 <li><h2 class="content" >较上月同期
                                     <span class="content up" v-if="xzcfbl>=0">{{xzcfbl}}% <span>⬆</span></span>
                                     <span class="content down" v-else>{{xzcfbl}}% <span>⬇</span> </span></h2></li>
                             </ul>
                         </div>
                     </div>
                     <div class="aqwffl">
                         <div class="tupian">
                             <img  :src="require('./img/jtwf_new.png')" class="imgClass" />
                         </div>
                         <div class="wenzi">
                             <ul>
                                 <li>交通违法(起) <span>{{jtwf}}</span></li>
                                 <li><h2 class="content" >较上月同期
                                     <span class="content up" v-if="jtwfbl>=0">{{jtwfbl}}% <span>⬆</span></span>
                                     <span class="content down" v-else>{{jtwfbl}}% <span>⬇</span> </span></h2></li>
                             </ul>
                         </div>
                     </div>

                 </div>
             </div>

         </div>
<!--         <div class="date-float" :style="{visibility:visibility}" >-->
<!--             <el-date-picker-->
<!--                v-model="datevalue"-->
<!--                type="daterange"-->
<!--                align="right"-->
<!--                unlink-panels-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--                :picker-options="pickerOptions">-->
<!--            </el-date-picker>-->
<!--         </div>-->
    </div>
</template>

<script>
import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";

    export default {
        name: '',
        mounted () {
            
            setTimeout(() => {
                // 防止时间组件闪烁
                this.visibility = "visible"
            }, 1000);
            // this.creatMigrationOption();
            this.$http.$get("gjjc_busMainInfo/getBusMainInfo").then((param) => {
                this.dealWithData(param);
                // this.xcsg=1213;
            });
            this.$http.$get("gjjc_busTopicInfo/getBusTopicInfo").then(param => {
                //
                this.dealWithBusTopicInfo(param);
            });
            this.$http.$get("gjjc_busTopicInfo/getBusLaneInfo").then(param => {
                //公交专用道
                // this.dealWithBusStationInfo(param);
                this.dealWithBusLaneInfo(param);
            });
            this.$http.$get("gjjc_busTopicInfo/getBusLineInternetInfo") .then(param => {
                //公交线网
                this.dealWithBusLineInternetInfo(param);
            });
        },
        methods:{
            dealWithBusLineInternetInfo(data) {
                if (
                    data.busPersonNumByLineTypeList != null &&
                    data.busPersonNumByLineTypeList.length
                ) {
                    if (this.totalTraffic != 0) {
                        this.totalTraffic = 0;

                    }
                    data.busPersonNumByLineTypeList.forEach(e => {

                            this.totalTraffic += parseInt(
                                e.personNum == null ? "0" : e.personNum.toString()
                            ); //总客流量

                    });
                }
            },
            dealWithBusLaneInfo(data) {
                //处理公交专用道数据
                this.busLane = data.busLane == null ? 0 : data.busLane; //公交专用道数量
                this.busLaneLength =
                    data.busTopicBusLaneStatisticModel.busLaneLength == null? 0: data.busTopicBusLaneStatisticModel.busLaneLength;
            },
            dealWithBusTopicInfo(data) {
                this.busVehicle = data.busVehicle == null ? 0 : data.busVehicle; //车辆数

            },
            activeTag(val){
                if(val.tag=="站点"){
                    this.ifLinetop=false;
                }else{
                    this.ifLinetop=true;
                }
            },
            dealWithData(data){
                this.totalTraffic=data.personNum==null?0:data.personNum;//客流总量
                // this.fbbc=data.busNum==null?0:data.busNum;//发班班次
                this.xcsg=data.busAccident==null?0:data.busAccident;//行车事故
                this.xcsgbl=data.lastMonthBusAccidentRate==null?0:data.lastMonthBusAccidentRate.toFixed(2);//行车事故环比
                this.xzcf=data.busLawcase==null?0:data.busLawcase;//行政处罚
                this.xzcfbl=data.lastMonthBusLawcaseRate==null?0:data.lastMonthBusLawcaseRate.toFixed(2);//行政处罚环比
                this.jtwf=data.busIlleail==null?0:data.busIlleail;//交通违法
                this.jtwfbl=data.lastMonthBusIlleailRate==null?0:data.lastMonthBusIlleailRate.toFixed(2);//交通违法环比
                this.tssl=data.busComplaint==null?0:data.busComplaint;//投诉数量
                this.tsslbl=data.lastMonthBusComplaintRate==null?0:data.lastMonthBusComplaintRate.toFixed(2);//投诉数量环比
                this.clwj=data.busComplaintFinish==null?0:data.busComplaintFinish;//投诉完结
                this.clwjbl=data.busComplaintFinishRate==null?0:data.busComplaintFinishRate.toFixed(2);//投诉完结比例;
                this.yxycxl=data.workAbnormalLineNum==null?0:data.workAbnormalLineNum;//运行异常线路
                this.klycqy=data.personAbnormalLineNum==null?0:data.personAbnormalLineNum;//客流异常区域
                this.zdxlyj=data.pointLineNum==null?0:data.pointLineNum;//重点线路拥挤
                this.fbbc=data.busNum==null?0:data.busNum;//发班班次
                this.fbbcbl=data.lastMonthBusNumRate==null?0:data.lastMonthBusNumRate.toFixed(2);//发班班次环比
                this.yylc=data.busMileage==null?0:data.busMileage;//运营里程
                this.yylcbl=data.lastMonthBusMileageRate==null?0:data.lastMonthBusMileageRate.toFixed(2);//运营里程环比
                this.gjxl=data.busLine==null?0:data.busLine;//公交线路
                this.gjxlbl=data.lastMonthBusLineRate==null?0:data.lastMonthBusLineRate.toFixed(2);//公交线路环比
                this.czsl=data.busDepot==null?0:data.busDepot;//场站数量
                this.czslbl=data.lastMonthBusDepotRate==null?0:data.lastMonthBusDepotRate.toFixed(2);//场站数量环比
                this.zdsl=data.busStation==null?0:data.busStation;//站点数量
                this.zdslbl=data.lastMonthBusStationRate==null?0:data.lastMonthBusStationRate.toFixed(2);//站点数量环比
                this.cyry=data.busPerson==null?0:data.busPerson;//从业人员
                this.cyrybl=data.lastMonthBusPersonRate==null?0:data.lastMonthBusPersonRate.toFixed(2);//从业人员环比
                this.jsry=data.busDriver==null?0:data.busDriver;//驾驶人员
                this.jsrybl=data.lastMonthBusDriverRate==null?0:data.lastMonthBusDriverRate.toFixed(2);//驾驶人员环比
                this.cczdl=(data.onTimeBusNum==null||data.busNum==null)?0:((data.onTimeBusNum-data.busNum)/data.busNum*100).toFixed(2);//车次准点率
                this.cczdlbl=data.lastMonthThanOnTimeBusNumRate==null?0:data.lastMonthThanOnTimeBusNumRate.toFixed(2);//车次准点率
                this.bczxl=(data.expectBusNum==null||data.busNum==null)?0:((data.busNum-data.expectBusNum)/data.expectBusNum*100).toFixed(2);//班次执行率
                this.bczxlbl=data.lastMonthThanBusRunRate==null?0:data.lastMonthThanBusRunRate.toFixed(2);//班次执行率环比
                if(data.busLineChangeList!=null&&data.busLineChangeList.length>0){//线路改变
                    var changeData=[];
                    var i=1;
                    data.busLineChangeList.forEach(ele=>{
                        var change={};
                        change.name=i;
                        change.roadName=ele.lineName;
                        change.sAndEName=ele.startStation+'-'+ele.stopStation;
                        change.content=ele.detail;
                        change.time=ele.startDate+'~'+ele.stopDate;
                        changeData.push(change);
                        i++;
                    })
                    this.xltzData=changeData;
                };
                if(data.busPersonNumByDistrictList!=null&&data.busPersonNumByDistrictList.length>0){//各区客流
                    var klData=[];
                    data.busPersonNumByDistrictList.forEach(ele=>{
                        var kl={};
                        kl.name=ele.name;
                        kl.value=ele.personNum;
                        klData.push(kl);
                    })
                    this.creatMigrationOption(klData);
                };
                if(data.top10LineMaxPersonList!=null&&data.top10LineMaxPersonList.length>0){
                    var arr=[];
                    data.top10LineMaxPersonList.forEach(e=>{
                        var a={};
                        a.name=e.lineName;
                        a.value=e.personNum;
                        arr.push(a);
                    })
                    this.lineList=arr;
                };
                if(data.top10StationMaxPersonList!=null&&data.top10StationMaxPersonList.length>0){
                    var arr=[];
                    data.top10StationMaxPersonList.forEach(e=>{
                        var a={};
                        a.name=e.stationName;
                        a.value=e.personNum;
                        arr.push(a);
                    })
                    this.stationList=arr;
                };
            },
            creatMigrationOption: function (CDData) {//创建
                var geoCoordMap = {
                    '武侯区': [104.039702,30.613487],
                    '锦江区': [104.126862,30.578036],
                    "成华区": [104.171523,30.682695],
                    '金牛区': [104.058264,30.697105],
                    "青羊区": [104.010668,30.676235],
                };

                var CDData = [
                    {name: '武侯区', value: 95},
                    {name: '锦江区', value: 90},
                    {name: '成华区', value: 80},
                    {name: '金牛区', value: 70},
                    {name: '青羊区', value: 60},
                ];

                // var convertData = function (data) {
                //     var res = [];
                //     for (var i = 0; i < data.length; i++) {
                //         var dataItem = data[i];
                //         var fromCoord = geoCoordMap[dataItem[0].name];
                //         var toCoord = geoCoordMap[dataItem[1].name];
                //         if (fromCoord && toCoord) {
                //             res.push({
                //                 fromName: dataItem[0].name,
                //                 toName: dataItem[1].name,
                //                 value: dataItem[1].value,
                //                 coords: [fromCoord, toCoord]
                //             });
                //         }
                //     }
                //     return res;
                // };

                var color = ['#F4E925'];
                // var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
                var series = [];
                [['成都', CDData]].forEach(function (item, i) {
                    series.push(
                        // {
                        //     name: item[0] + ' Top10',
                        //     type: 'lines',
                        //     zlevel: 2,
                        //     symbol: ['none', 'arrow'],
                        //     symbolSize: 5,
                        //     effect: {
                        //         show: true,
                        //         period: 6,
                        //         symbol: planePath,
                        //         trailLength: 0,
                        //         // symbol: 'arrow',
                        //         symbolSize: 20,
                        //         color: 'rgb(255,255,255,0.6)'
                        //     },
                        //     lineStyle: {
                        //         normal: {
                        //             color: color[i],
                        //             width: 1,
                        //             opacity: 0.6,
                        //             curveness: 0.2
                        //         }
                        //     },
                        //     data: convertData(item[1])
                        // },
                        {
                            name: '主城区客流量',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    fontSize:14,
                                    position: 'top',
                                    formatter: '{b}: {@value}'
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] / 8;
                            },
                            itemStyle: {
                                normal: {
                                    color: color[i]
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem.name,
                                    value: geoCoordMap[dataItem.name].concat([dataItem.value])
                                };
                            })
                        });
                });

                var option = {
                    //backgroundColor: '#404a59',
                    grid: {
                        /*x: 80,
                            x2: 40,*/
                        left: 50,
                        top: 30,
                        right: 30,
                        bottom: 0,
                    },
                    tooltip: {
                        trigger: 'item',
                        // formatter: "{b}: {c}"
                        formatter: function (params) {
                            var res = params.seriesName + "<br/>";
                            if (params.seriesType === 'effectScatter') {
                                res += params.data.name + ':' + params.data.value[2];
                            } else {
                                res += params.data.toName + ':' + params.data.value;
                            }

                            return res;
                        }
                    },

                    geo: {
                        map: 'chengqu',
                        label: {
                            emphasis: {
                                show: false,
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#133484',
                                borderColor: '#000000',
                                borderWidth: 1,
                                shadowColor: 'rgba(17,46,120,0.5)',
                                 // shadowBlur: 30,
                                shadowOffsetY:8,
                            },
                            emphasis: {
                                areaColor: '#112e78',
                                lable:{
                                    show:true,
                                }
                            }
                        },
                        lable:{
                            show:true,
                        }
                    },
                    series: series
                };
                this.trafficOption = option;
            }

        },
        data() {
            return {
                ifLinetop:true,
                list:[{uid:1,tag:'线路'},{uid:2,tag:'站点'}],
                busVehicle:0,//车辆数
                busLane:0, //公交专用道数量
                busLaneLength:0,
                xcsg:0,//行车事故
                xcsgbl:12.3,//行车事故环比
                xzcf:0,//行政处罚
                xzcfbl:-1.3,//行政处罚环比
                jtwf:27,//交通违法
                jtwfbl:230,//交通违法环比
                tssl:534,//投诉数量
                tsslbl:-20,//投诉数量环比
                clwj:20,//投诉完结
                clwjbl:80,//投诉完结比例;
                yxycxl:326,//运行异常线路
                klycqy:856,//客流异常区域
                zdxlyj:143,//重点线路拥挤
                fbbc:48895,//发班班次
                fbbcbl:-2.0,//发班班次环比
                yylc:32000,//运营里程
                yylcbl:3.3,//运营里程环比
                gjxl:800,//公交线路
                gjxlbl:2.0,//公交线路环比
                czsl:100,//场站数量
                czslbl:-3.3,//场站数量环比
                zdsl:18973,//站点数量
                zdslbl:-2.0,//站点数量环比
                cyry:36549,//从业人员
                cyrybl:3.3,//从业人员环比
                jsry:27684,//驾驶人员
                jsrybl:-6.4,//驾驶人员环比
                cczdl:80,//车次准点率
                cczdlbl:3.5,//车次准点率
                bczxl:90,//班次执行率
                bczxlbl:-5.6,//班次执行率环比
                src1:require('./img/gj_yxyc_bg.png'),
                ylqkbg:require('./img/fbbc_bg_new.png'),
                fbbcbg:require('./img/gj_yltr_fbbc.png'),
                yylcbg:require('./img/gj_yltr_yylc.png'),
                //公交基础信息图片
                jcxxbg:require('./img/gj_jcxx_bg.png'),
                jcxxpng:require('./img/gj_jcxx_png.png'),
                gjxlbg:require('./img/gj_jcxx_gjxl.png'),
                cyrybg:require('./img/gj_jcxx_cyry.png'),
                czslbg:require('./img/gj_jcxx_czsl.png'),
                jsrybg:require('./img/gj_jcxx_jsry.png'),
                zdslbg:require('./img/gj_jcxx_zdsl.png'),
                //公交服务保障图片
                fwbzbg:require('./img/fwbz_new.png'),

                gjche:require('./img/gjche.png'),

                datevalue: '',
                pickerOptions: dateRang,
                visibility:"hidden",
                activeName: '1',
                totalTraffic:534271,
                trafficOption:{}
            }
        }
    }
</script>
<style lang="css" scoped>
    .xltz >>> .el-collapse{
        border-top:0 !important;
        border-bottom:0 !important;
    }
    .xltz >>> .el-collapse-item__arrow{
        display:none !important;
    }
    .xltz >>>  .el-collapse-item__wrap{
        border-bottom:0 !important;
        background: rgba(0,0,0,.4);
    }
    .xltz >>> .el-collapse-item__header{
        background-color: rgba(32,86,211,.2);
        height: 0.40rem;
        line-height: 0.40rem;
        border-bottom:0 !important;
        margin:4px 0;
    }
    .xltz >>> .el-collapse-item__content{
        padding-bottom:10px !important;
    }
    .lineTop>>>.list-wrapper ul li .item:nth-child(2){
        flex-basis: 60px;
    }
</style>
<style lang="scss" scoped>
    @mixin flexLayOut{
            position: relative;
            display: flex;
            flex-direction: column;
    }
    .comprehensiveMonitor-wrapper{
        display: flex;
        height: 100%;
        width: 100%;
        
        .left{
            flex: 500;
            @include flexLayOut;
            .top{
                flex: 1.2;
                position: relative;
                .content{
                    background:url("./img/gjche.png") no-repeat ;
                    background-size: 100%;
                    height:100%;
                    .gjche{
                        width:374px;
                        height:203.7px;
                    }

                }

            }
            .bottom{
                flex: 3;
                position: relative;
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                .jcxx{
                    flex: 1;
                    width:468px;
                    height:100px;
                    background-size: 100%;
                    margin-top: 12px;
                    background: url("./img/beijing_new.png") no-repeat;
                    display: flex;
                    flex-direction: row;
                    .tupian{
                        flex: 1;
                        .imgClass{
                            width: 130px;
                            height: 76px;
                            margin-top: 12px;
                            margin-left: 10px;
                        }
                    }
                    .wenzi{
                        flex: 2;
                        li{
                            height: 40px;
                            line-height: 40px;

                        }
                        li:nth-child(1){
                            margin-top: 10px;
                        }
                        li:nth-child(2){
                            font-size: 26px;
                            font-weight: bold;
                            color:#00FFFF;
                            .unitName{
                                font-size: 14px;
                            }
                        }
                    }
                }


            }
        }
        .mid{
            @include flexLayOut;
            flex: 800;
            margin: 0 30px;
            .top{
                flex: 2;
                position: relative;

                .yltr_warpper{
                    position: relative;
                    // text-align: center;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    height: calc(100% - 45px);
                    flex-direction: column;
                    .yltrqkbg{
                        width:536px;
                        height:149px;
                    }
                    div:nth-child(1){
                        h2{
                            font-weight: normal;
                        }
                    }
                    div:nth-child(3){
                        margin-top: 10px;
                        p{
                            font-size: 26px;
                            color:#00FFFF;
                            font-weight: bold;
                            text-align: center;
                        }
                        h2{
                            margin-top: 10px;
                            font-size: 12px;
                            font-weight: normal;
                            background-color: rgb(29,69,154);
                            color: rgba(162, 162, 162, 0.75);
                            height: 20px;
                            line-height: 20px;
                            width: 140px;
                            text-align: center;
                            border-radius: 10px;
                        }

                    }
                    span.up{
                        font-size: 14px;
                        color: #ea2022;
                    }
                    span.down {
                        font-size: 14px;
                        color: #00B050;
                    }
                }


            }
            .mid{
                flex: 6.5;
                position: relative;
                margin: 10px 0;
                justify-items: center;
                align-items: center;
                justify-content: center;
                display: flex;
                flex-direction: column;
                .kl{
                    /*flex:1;*/
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    flex-direction: column;
                    background-color: #0A214F;
                    border-radius: 40px;
                    height: 80px;
                    width: 60%;
                    text-align: center;
                    .rollNumber-container {
                        .rollNumber-wrap {
                            display: flex;
                            overflow: hidden;
                            flex-direction: row;
                            align-items: center;
                            label {
                                font-size: 14px;
                                color: rgba(255,255,255,.6);
                            }
                            .number {
                                animation-delay: 5.3s;
                                animation-iteration-count: 3;
                                display: flex;
                                position: relative;
                                .item {
                                    font-size: 36px;
                                    text-align: center;
                                    font-family: Microsoft YaHei;
                                    font-weight: 400;
                                    /*line-height:30px;*/
                                    text-shadow: 0px 5px 0px rgba(0, 0, 0, 0.35);
                                    /*background-image: url("../../../image/common/big_data_bg.png");*/
                                    background-image: url("./img/number_bg.png");
                                    font-weight: 400;
                                    margin-left: 1px;
                                    color: #FFFF00;
                                    width: 40px;
                                    height: 40px;
                                    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.35);
                                    text-shadow: 0px 5px 0px rgba(0, 0, 0, 0.35);
                                    // box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);
                                    border-radius: 8px;
                                    background-size: 100% 100%;
                                }
                            }
                        }
                    }
                }
                .gjjc_warpper{
                    flex:2;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    // text-align: center;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    flex-direction: column;
                    div:nth-child(1){
                        h2{
                            font-weight: normal;
                        }

                    }
                    div:nth-child(2){
                       margin-top: 10px;
                        text-align: center;
                    }
                    div:nth-child(3){
                        margin-top: 10px;
                        p{
                            font-size: 26px;
                            color:#00FFFF;
                            font-weight: bold;
                            text-align: center;
                        }
                        h2{
                            margin-top: 10px;
                            font-size: 12px;
                            font-weight: normal;
                            background-color: rgb(29,69,154);
                            color: rgba(162, 162, 162, 0.75);
                            height: 20px;
                            line-height: 20px;
                            width: 140px;
                            text-align: center;
                            border-radius: 10px;
                        }

                    }
                    span.up{
                        font-size: 14px;
                        color: #ea2022;
                    }
                    span.down{
                        font-size: 14px;
                        color: #00B050;
                    }
                }

            }
            .bottom{
                flex: 1.5;
                position: relative;
                .fwbz_warpper{
                    margin-top:20px;
                    position: relative;
                    // text-align: center;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    height: calc(100% - 45px);
                    .fwbzbg{
                        width: 761px;
                        height:187px;
                    }
                    .item1{
                        left: 46px;
                        .content:nth-child(2){
                            font-size: 26px;
                            margin: 6px 0 16px 0;
                            font-weight: bold;
                            color:#00FFFF;
                            span{
                                font-size: 14px;
                            }
                        }

                    }
                    .item2{
                        right: 56px;
                        .content:nth-child(2){
                            font-size: 26px;
                            margin: 6px 0 16px 0;
                            color: #00FFFF;
                            font-weight: bold;
                            span{
                                font-size: 14px;
                            }
                        }

                    }
                    .item3{
                       font-weight: normal;
                        font-size: 18px;

                    }
                    .item{
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        width: 30%;
                        height: 100%;
                        .content:nth-child(1){
                            font-size: 16px;
                            font-weight: normal;
                        }
                        .content:nth-child(3){
                            font-size: 12px;
                            font-weight: normal;
                            background-color: rgb(29,69,154);
                            color: rgba(162, 162, 162, 0.75);
                            height: 20px;
                            line-height: 20px;
                            width: 140px;
                            text-align: center;
                            border-radius: 10px;
                        }
                        .content:nth-child(4){
                            font-size: 16px;
                            margin-top: 6px;
                            /*color: rgba(0, 176, 80, 1);*/
                        }
                        span.up{
                            font-size: 14px;
                            color: #ea2022;
                        }
                        span.down{
                            font-size: 14px;
                            color: #00B050;
                        }
                    }

                }

                
            }
        }
        .right{
            @include flexLayOut;
            flex: 500;
            .top{
                flex: 1;
                position: relative;
                .tsqk{
                    background: url("./img/tsqk_new.png") no-repeat;
                    width: 398px;
                    height:229px;
                    display: flex;
                    flex-direction: column;
                    .tssl{
                        flex:1;
                        margin-top: 33px;
                        margin-left: 140px;

                    }
                    .wjqk{
                        flex:1;
                        margin-left: 238px;
                        margin-top: 45px;
                    }
                    .wenzi{
                        li:nth-child(1){
                            margin-top: 10px;
                            span{
                                color:#FFFF00;
                                font-size: 32px;
                                font-weight: bold;
                            }
                        }
                        li:nth-child(2){
                            font-size: 12px;
                            /*background-color: rgb(9,36,61);*/
                            height: 20px;
                            margin-top: 10px;
                            /*<!--margin-left: -20px;-->*/
                            line-height: 20px;
                            /*width: 150px;*/
                            /*border-radius: 10px;*/
                            font-weight: normal;
                            h2{
                                color: rgba(162, 162, 162, 0.75);
                                /*text-align: center;*/
                                span.up{
                                    font-size: 14px;
                                    color: #ea2022;
                                }
                                span.down{
                                    font-size: 14px;
                                    color: #00B050;
                                }
                            }
                        }
                    }
                }
            }
            .mid{
                 margin: 10px 0;
                 flex: 2;
                .aqwf{
                    display: flex;
                    flex-direction: column;
                    .aqwffl{
                        flex:1;
                        margin-top:20px;
                        background-size: 100%;
                        background: url("./img/aqwf_bg.png") no-repeat;
                        display: flex;
                        flex-direction: row;
                        .tupian{
                            flex:1
                        }
                        .wenzi{
                            flex:1;
                            li{
                            height: 70px;
                            line-height: 70px;

                             }
                            li:nth-child(1){
                                margin-top: 10px;
                                span{
                                    color:#FFFF00;
                                    font-size: 32px;
                                    font-weight: bold;
                                }
                            }
                            li:nth-child(2){
                                font-size: 12px;
                               background-color: rgb(9,36,61);
                                height: 20px;
                                margin-left: -20px;
                                line-height: 20px;
                                width: 150px;
                                border-radius: 10px;
                                font-weight: normal;
                                h2{
                                    color: rgba(162, 162, 162, 0.75);
                                    text-align: center;
                                    span.up{
                                        font-size: 14px;
                                        color: #ea2022;
                                    }
                                    span.down{
                                        font-size: 14px;
                                        color: #00B050;
                                    }
                                }
                            }
                        }

                    }
                }
            }

        }

    }
    .date-float{
        position: absolute;
        right: 20px;
        top: -10px;
        visibility: hidden;
    }
</style>
<style  scoped>
    .number >>> span {
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 42px;
        color: #FFFF00;
        letter-spacing: 30px;
        margin-left: 16px;
        font-weight: bold;
        font-family: "datafont";
    }
</style>