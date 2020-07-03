<template>
    <!-- 公交运行监测 -- 综合 监测 -->
    <div class="comprehensiveMonitor-wrapper nomap-content-container">
         <div class="left">
             <div class="top ">
                 
                 <panelTitle title="公交客流情况" :displaySwitch=false ></panelTitle>
                 <div class="content">
                     <div class="number-wrapper">
                         <RollNumber title="总客流量" :value="totalTraffic" unit="人"></RollNumber>
                     </div>
                     <div class="topClass">
                         <div style="width:90%;margin-top: 10px">
                             <SelectTag :content="list" @activeTag="activeTag"></SelectTag>
                         </div>
                         <div v-if="ifLinetop" class="lineTop">
                             <topRanking :itemList="lineList" unit="人"></topRanking>
                         </div>
                         <div v-else>
                             <topRanking :itemList="stationList" unit="人"></topRanking>
                         </div>


<!--                         <v-chart :options="trafficOption" :autoresize="true" theme="theme"></v-chart>-->
                     </div>
                 </div>
             </div>
             <div class="bottom ">
                 
                 <panelTitle title="最新线路调整" :displaySwitch=false ></panelTitle>
                 <div class="xltz">
                     <el-collapse v-model="activeName" accordion>
                         <el-collapse-item v-for="(item,index) in xltzData" :name="item.name">
                             <template slot="title">
                                 <div class="title">
                                     <div class="roadName">{{item.roadName}}</div>
                                     <div class="stationName">起讫点：{{item.sAndEName}}</div>
                                 </div>
                             </template>
                             <div class="content  ">
                                 {{item.content}}<lable>[{{item.time}}]</lable>
                             </div>
                         </el-collapse-item>
                     </el-collapse>
                 </div>
             </div>
             
         </div>
         <div class="mid">
             <div class="top ">
                 
                 <panelTitle title="运力投入情况" :displaySwitch=false ></panelTitle>
                 <div class="yltr_warpper">
                     <img :src="ylqkbg" alt="" srcset="" class="yltrqkbg" >
                     <img :src="fbbcbg" alt="" srcset="" class="fbbcbg" >
                     <img :src="yylcbg" alt="" srcset="" class="yylcbg" >
                     <div class="item item1">
                         <h2 class="content" >发班班次</h2>
                         <p class="content" >{{fbbc}} <span>次</span> </p>
                         <h2 class="content" >较上月同期</h2>
                         <p class="content up" v-if="fbbcbl>=0">{{fbbcbl}}% <span>⬆</span> </p>
                         <p class="content down" v-else>{{fbbcbl}}% <span>⬇</span> </p>
                     </div>
                     <div class="item item2">
                         <h2 class="content" >营运里程</h2>
                         <p class="content" >{{yylc}} <span>公里</span> </p>
                         <h2 class="content" >较上月同期</h2>
                         <p class="content up" v-if="yylcbl>=0">{{yylcbl}}% <span>⬆</span> </p>
                         <p class="content down" v-else>{{yylcbl}}% <span>⬇</span> </p>
                     </div>
                 </div>

             </div>
             <div class="mid ">
                 
                 <panelTitle title="公交基础情况" :displaySwitch=false ></panelTitle>
                 <div class="gjjc_warpper">
                     <img :src="jcxxbg" alt="" srcset="" class="jcxxbg" >
                     <div class="item item1">
                         <div class="imgClass">
                             <img :src="jcxxpng" alt="" srcset="" class="imgclass">
                             <img :src="gjxlbg" alt="" srcset="" class="imgclass">
                         </div>
                         <div class="textClass">
                             <h2 class="content" >公交线路</h2>
                             <p class="content" >{{gjxl}}<span>条</span> </p>
                             <h2 class="content" >较上月同期</h2>
                             <p class="content up" v-if="gjxlbl>=0">{{gjxlbl}}% <span>⬆</span> </p>
                             <p class="content down" v-else>{{gjxlbl}}% <span>⬇</span> </p>
                         </div>

                     </div>
                     <div class="item item2">
                         <div class="imgClass">
                             <img :src="jcxxpng" alt="" srcset="" class="imgclass">
                             <img :src="czslbg" alt="" srcset="" class="imgclass">
                         </div>
                         <div class="textClass">
                             <h2 class="content" >场站数量</h2>
                             <p class="content" >{{czsl}} <span>个</span> </p>
                             <h2 class="content" >较上月同期</h2>
                             <p class="content up" v-if="czslbl>=0">{{czslbl}}% <span>⬆</span> </p>
                             <p class="content down" v-else>{{czslbl}}% <span>⬇</span> </p>
                         </div>
                     </div>
                     <div class="item item3">
                         <div class="imgClass">
                             <img :src="jcxxpng" alt="" srcset="" class="imgclass">
                             <img :src="zdslbg" alt="" srcset="" class="imgclass">
                         </div>
                         <div class="textClass">
                             <h2 class="content" >站点数量</h2>
                             <p class="content" >{{zdsl}}<span>个</span> </p>
                             <h2 class="content" >较上月同期</h2>
                             <p class="content up" v-if="zdslbl>=0">{{zdslbl}}% <span>⬆</span> </p>
                             <p class="content down" v-else>{{zdslbl}}% <span>⬇</span> </p>
                         </div>
                     </div>
                     <div class="item item4">
                         <div class="imgClass">
                             <img :src="jcxxpng" alt="" srcset="" class="imgclass">
                             <img :src="cyrybg" alt="" srcset="" class="imgclass">
                         </div>
                         <div class="textClass">
                             <h2 class="content" >从业人员</h2>
                             <p class="content" >{{cyry}} <span>人</span> </p>
                             <h2 class="content" >较上月同期</h2>
                             <p class="content up" v-if="cyrybl>=0">{{cyrybl}}% <span>⬆</span> </p>
                             <p class="content down" v-else>{{cyrybl}}% <span>⬇</span> </p>
                         </div>
                     </div>
                     <div class="item item5">
                         <div class="imgClass">
                             <img :src="jcxxpng" alt="" srcset="" class="imgclass">
                             <img :src="jsrybg" alt="" srcset="" class="imgclass">
                         </div>
                         <div class="textClass">
                             <h2 class="content" >驾驶人员</h2>
                             <p class="content" >{{jsry}} <span>人</span> </p>
                             <h2 class="content" >较上月同期</h2>
                             <p class="content up" v-if="jsrybl>=0">{{jsrybl}}% <span>⬆</span> </p>
                             <p class="content down" v-else>{{jsrybl}}% <span>⬇</span> </p>
                         </div>
                     </div>
                 </div>

             </div>
             <div class="bottom ">
                 
                 <div class="fwbz_warpper">
                     <img :src="fwbzbg" alt="" srcset="" class="fwbzbg" >
                     <div class="item item1">
                         <h2 class="content" >车次准点率</h2>
                         <p class="content" >{{cczdl}}% <span></span> </p>
                         <h2 class="content" >较上月同期</h2>
                         <p class="content up" v-if="cczdlbl>=0">{{cczdlbl}}% <span>⬆</span> </p>
                         <p class="content down" v-else>{{cczdlbl}}% <span>⬇</span> </p>
                     </div>
                     <div class="item item2">
                         <h2 class="content" >班次执行率</h2>
                         <p class="content" >{{bczxl}}% <span></span> </p>
                         <h2 class="content" >较上月同期</h2>
                         <p class="content up" v-if="bczxlbl>=0">{{bczxlbl}}% <span>⬆</span> </p>
                         <p class="content down" v-else>{{bczxlbl}}% <span>⬇</span> </p>
                     </div>
                     <div class="item item3">
                         <h2  >服务保障</h2>
                     </div>
                 </div>


             </div>
         </div>
         <div class="right">
             <div class="top ">
                 
                 <panelTitle title="安全违法情况" :displaySwitch=false ></panelTitle>
                 <aqwfCommon :xcsg="xcsg" :xcsgbl="xcsgbl" :xzcf="xzcf" :xzcfbl="xzcfbl" :jtwf="jtwf" :jtwfbl="jtwfbl"></aqwfCommon>
             </div>
             <div class="mid ">
                 
                 <panelTitle title="营运投诉情况" :displaySwitch=false ></panelTitle>
                 <yytsCommon :tssl="tssl" :tsslbl="tsslbl" :clwj="clwj" :clwjbl="clwjbl"></yytsCommon>
             </div>
             <div class="bottom ">
                 
                 <panelTitle title="实际运营异常情况" :displaySwitch=false ></panelTitle>
                 <div class="yxyc-wrapper">
                     <img :src="src1" alt="" srcset="">
                     <div class="item item1">
                         <p>{{yxycxl}}</p>
                         <h2>运行异常线路</h2>
                     </div>
                     <div class="item item2">
                         <p>{{zdxlyj}}</p>
                         <h2>重点线路拥挤</h2>
                     </div>
                     <div class="item item3">
                         <p>{{klycqy}}</p>
                         <h2>客流异常区域</h2>
                     </div>

                 </div>
             </div>
         </div>
         <div class="date-float" :style="{visibility:visibility}" >
             <el-date-picker
                v-model="datevalue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
         </div>
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
        },
        methods:{
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
                lineList:[
                    {
                        order: 1,
                        name: "55路",
                        value: 6951
                    },
                    {
                        order: 2,
                        name: "133路",
                        value: 1281
                    },
                    {
                        order: 3,
                        name: "K11路",
                        value: 4119
                    },
                    {
                        order: 4,
                        name: "L2路",
                        value: 3619
                    },
                    {
                        order: 5,
                        name: "P54",
                        value: 2619
                    },
                    {
                        order: 6,
                        name: "1路",
                        value: 4619
                    },
                    {
                        order: 7,
                        name: "7路",
                        value: 6619
                    },
                    {
                        order: 8,
                        name: "121路",
                        value: 4619
                    },
                ],
                stationList:[
                    {
                        order: 1,
                        name: "成都东站客运站",
                        value: 6951
                    },
                    {
                        order: 2,
                        name: "茶店子客运站",
                        value: 1281
                    },
                    {
                        order: 3,
                        name: "成都石羊客运站",
                        value: 4119
                    },
                    {
                        order: 4,
                        name: "昭觉寺客运站",
                        value: 3619
                    },
                    {
                        order: 5,
                        name: "北门汽车站",
                        value: 2619
                    },
                    {
                        order: 6,
                        name: "旅游集散中心",
                        value: 4619
                    },
                    {
                        order: 7,
                        name: "成都汽车总站",
                        value: 6619
                    },
                    {
                        order: 8,
                        name: "国际商贸城客运站",
                        value: 4619
                    },
                ],
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
                ylqkbg:require('./img/gj_yltr_bg.png'),
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
                fwbzbg:require('./img/gj_fwbz_bg.png'),

                datevalue: '',
                pickerOptions: dateRang,
                visibility:"hidden",
                activeName: '1',
                xltzData:[//线路调整数据
                    {
                        name:'1',
                        roadName:'32路',
                        sAndEName:'地铁红星桥站-龙潭工业园公交站',
                        content:'地铁红星桥站只华泰路北行驶路线及站点不变，临时调整经成康路、华冠路后回原线行驶。临时取消成宏路口（41591）、鹤林小区（41120）；临时增设华冠路成宏路口（42178）',
                        time:'2019-09-10~2019-12-10',
                    },
                    {
                        name:'2',
                        roadName:'32路',
                        sAndEName:'地铁红星桥站-龙潭工业园公交站',
                        content:'地铁红星桥站只华泰路北行驶路线及站点不变，临时调整经成康路、华冠路后回原线行驶。临时取消成宏路口（41591）、鹤林小区（41120）；临时增设华冠路成宏路口（42178）',
                        time:'2019-09-10~2019-12-10',
                    },

                ],
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
                flex: 6;
                position: relative;
                .content{
                    .number-wrapper{
                        margin-top: 20px;
                        margin-left: 20px;
                    }
                    .topClass{
                        /*flex:500;*/
                        /*position: absolute;*/
                        margin: 0px auto;
                        height: 500px;
                        width: 400px;


                        /*justify-items: center;*/
                        /*align-items: center;*/
                        /*justify-content: center;*/
                    }
                }
            }
            .bottom{
                flex: 4;
                position: relative;
                margin-top: -30px;


                .xltz{

                    .title{
                        width: 100%;
                        font-size: 16px;
                        font-weight: 400;
                        /*background-color: rgba(32,86,211,.4);*/
                        .roadName{
                            text-align: center;
                            float:left;
                            width:60px;
                            height:80%;
                            margin: 2px;
                            background-color: #133FBC;
                            color:#FFFF00;
                        }
                        .stationName{
                            margin-left: 10px;
                            float:left;
                            color:#00ffff;
                        }
                    }
                    .content{
                        color:#0a76a4;
                        font-size: 14px;
                        lable{
                            color:#878d99;
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
                    .yltrqkbg{
                        width:788px;
                        height:187px;
                    }
                    .fbbcbg{
                        position: absolute;
                        top:55px;
                        left:160px;
                        width:64px;
                        height:74px;
                    }
                    .yylcbg{
                        position: absolute;
                        top:55px;
                        right:320px;
                        width:64px;
                        height:74px;
                    }
                    .item1{
                        left: 166px;
                        .content:nth-child(2){
                            font-size: 26px;
                            margin: 6px 0 16px 0;
                            color: #00FFFF;
                            span{
                                font-size: 14px;
                            }
                        }

                    }
                    .item2{
                        right: 126px;
                        .content:nth-child(2){
                            font-size: 26px;
                            margin: 6px 0 16px 0;
                            color: rgba(255, 255, 0, 1);
                            span{
                                font-size: 14px;
                            }
                        }

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
                            font-size: 14px;
                            font-weight: bold;
                        }
                        .content:nth-child(3){
                            font-size: 14px;
                            color: rgba(162, 162, 162, 0.75);
                        }
                        .content:nth-child(4){
                            font-size: 16px;
                            margin-top: 6px;
                            /*color: rgba(0, 176, 80, 1);*/
                        }
                        p.up{
                            color: #ea2022;
                        }
                        p.down{
                            color: #00B050;
                        }
                    }
                }


            }
            .mid{
                flex: 6.5;
                position: relative;
                margin: 10px 0;
                .gjjc_warpper{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    // text-align: center;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    .jcxxbg {
                        width: 691px;
                        height:194px;
                        position: absolute;
                        bottom:0;
                    }
                    .item1{
                        top: 0;
                    }
                    .item2{
                        top:20%;
                        left: 0;
                    }
                    .item3{
                        top:20%;
                        right: 0;
                    }
                    .item4{
                        left: 0;
                        bottom: 20px;
                    }
                    .item5{
                        right: 0;
                        bottom: 20px;
                    }
                    .item{
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        width: 40%;
                        height: 30%;
                        .imgClass{
                            flex: 2;
                            position: absolute;
                            left: 10px;
                            .imgclass:nth-child(1){
                                width:158px;
                                height:113px;
                            }
                            .imgclass:nth-child(2){
                                width:50px;
                                height:50px;
                                position: absolute;
                                left:55px;
                                top:15px;
                            }
                        }
                       .textClass{
                           flex: 3;
                           position: absolute;
                           margin-left: 40px;
                           .content:nth-child(1){
                               font-size: 14px;
                               font-weight: bold;
                           }
                           .content:nth-child(2){
                               font-size: 26px;
                               margin: 6px 0 16px 0;
                               color: #00FFFF;
                               span{
                                   font-size: 14px;
                               }
                           }
                           .content:nth-child(3){
                               font-size: 14px;
                               color: rgba(162, 162, 162, 0.75);
                           }
                           .content:nth-child(4){
                               font-size: 16px;
                               margin-top: 6px;
                               /*color: rgba(0, 176, 80, 1);*/
                           }
                           p.up{
                               color: #ea2022;
                           }
                           p.down{
                               color: #00B050;
                           }
                       }

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
                            color: rgba(255, 255, 0, 1);
                            span{
                                font-size: 14px;
                            }
                        }

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
                            font-size: 14px;
                            font-weight: bold;
                        }
                        .content:nth-child(3){
                            font-size: 14px;
                            color: rgba(162, 162, 162, 0.75);
                        }
                        .content:nth-child(4){
                            font-size: 16px;
                            margin-top: 6px;
                            /*color: rgba(0, 176, 80, 1);*/
                        }
                        p.up{
                            color: #ea2022;
                        }
                        p.down{
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
                flex: 4;
                position: relative;
            }
            .mid{
                 margin: 10px 0;
                 flex: 2;
            }
            .bottom{
                flex: 3;
                position: relative;
                .yxyc-wrapper{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    img{
                        width: 397px;
                        height: 188px;
                        position: relative;
                        left:20px;
                        top:20px;
                    }
                    .item{
                        position: absolute;
                        text-align: center;
                        height: 50px;
                        width: 100px;
                        p{
                            font-size: 26px;
                            font-weight: bolder;
                        }
                        h2{
                            margin-top: 10px;
                            font-size: 14px;
                        }
                    }
                    .item1{
                        top: 36px;
                        left: 165px;
                    }
                    .item2{
                        top: 110px;
                        left: 330px;
                    }
                    .item3{
                        top: 136px;
                        left: 20px;
                    }
                    .item4{
                        top: 136px;
                        left: 210px;
                    }
                }
                /*margin-top: 10px;*/
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