<template>
    <div class="homepage-wrapper">
        <BaseLayoutContent>
            <template #leftPanel>


            </template>
            <template #midContent>
                <div class="testmap">
                    <Basemap></Basemap>
                </div>
            </template>
            <template #rightPanel>
                <panel>
                    <PanelItem title :displaySwitch="false">
                        <div class="panel-wrapper right">
                            <div class="right-content">
                                <div style="width:100%;height:100%">
                                    <div class="title">{{xzqhName}}<span>({{lineNum}})</span></div>
                                    <swiper :options="swiperOption" ref="mySwiper">
                                        <swiper-slide v-for="item in busTopicToCityLineList">
                                            <div  class="line_content">
                                                <ul>
                                                    <li class="gjLineName"><span>{{item.lineName}}路</span></li>
                                                    <li>{{item.startStationName}}-{{item.endStationName}}</li>
                                                    <li>全长 {{parseFloat(item.lineLen).toFixed(2)}}公里</li>
                                                    <li>客流 {{item.personNum}} 人次</li>
                                                </ul>
                                            </div>
                                            <div class="blue-line"></div>
                                        </swiper-slide>

<!--                                        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--                                        <div class="swiper-button-next" slot="button-next"></div>-->
                                    </swiper>
                                </div>

                            </div>
                        </div>
                    </PanelItem>
                </panel>
                <
            </template>
        </BaseLayoutContent>

    </div>
</template>

<script>
    import echarts from "echarts";
    import createEcharts from "./createEcharts";
    import $ from "jquery";
    import echartContent from "../../AirTransport/echartContent";
    export default {
        name: "",
        // computed: {
        //   swiper() {
        //     return this.$refs.mySwiper.$swiper;
        //   }
        // },
        mixins: [createEcharts],
        mounted() {
            this.getData();
            this.activeZL();
            window.getBaseInfoHtml = this.getBaseInfoHtml;
            window.showDetail = this.showDetail;
            window.showBusMetroInfo = this.showBusMetroInfo;
            this.autohand = setInterval(() => {
                this.getData();
            }, 5 * 60 * 1000);
        },
        methods: {
            showDetail(data) {
                //显示途经线路的详细数据
                if (document.getElementById("xq_" + data).style.display == "block") {
                    document.getElementById("xq_" + data).style.display = "none";
                } else {
                    document.getElementById("xq_" + data).style.display = "block";
                }
            },
            getBaseInfoHtml (type, data, feaCoordinate, titleText, width, height) {
                //重写omap 的getBaseInfoHtml 方法
                var content = "";
                if (type.indexOf("BUS_LINE") !== -1) {
                    // sessionStorage.setItem("stationId",data.station_id);
                    var busLineData = {};
                    for (var i = 0; i < this.gjBusLineInternetList.length; i++) {
                        if (this.gjBusLineInternetList[i].lineId == data.name) {
                            busLineData = this.gjBusLineInternetList[i];
                            break;
                        }
                    }
                    var title = [
                        { display: "线路名称", name: "lineName", colspan: 3 },
                        { display: "起点站", name: "lineStartName", colspan: 3 },
                        { display: "终点站", name: "lineEndName", colspan: 3 },
                        { display: "线路长度", name: "lineLen", colspan: 3 },
                        { display: "线路类型", name: "lineType", colspan: 3 },
                        { display: "乘客数", name: "personNum", colspan: 3 }
                    ];
                    content = [
                        {
                            name: "详细信息",
                            content: window.creatInfoHtml(title, busLineData, 2)
                        }
                    ];
                }
                else if (type.indexOf("BUS_STATION") !== -1||type.indexOf("BUS_HUB_STATION")!==-1) {
                    //公交站点
                    var busStationData = {};
                    var stationId=data.station_id;
                    // for (var i = 0; i < this.busTopicStationList.length; i++) {
                    //   if (this.busTopicStationList[i].stationId == data.station_id) {
                    //     busStationData = this.busTopicStationList[i];
                    //     break;
                    //   }
                    // };
                    var title = [
                        { display: "站点名称", name: "stationName", colspan: 3 },
                        { display: "乘客数", name: "personNum", colspan: 3 },
                        {
                            display: "站点类型",
                            name: "stationType",
                            colspan: 3,
                            // render: function(data, index, value) {
                            //   if (value === "1") {
                            //     return "首末站";
                            //   } else {
                            //     return "中间站";
                            //   }
                            // }
                        },
                        { display: "途经线路条数", name: "lineNumber", colspan: 3 },
                        { display: "途经线路", name: "lines", colspan: 3 },

                    ];
                    $.ajax({
                        url:'http://192.167.252.246:8088/p/tocc/irest/base/gjjc_busTopicInfo/getBusStationInfoById',
                        type:'POST', //GET
                        async:false,    //或false,是否异步
                        data:{
                            stationId:stationId
                        },
                        timeout:20000,    //超时时间
                        dataType:'json',    //返回的数据格式：
                        beforeSend:function(xhr){
                        },
                        success:function(data,textStatus,jqXHR){
                            debugger;
                            busStationData=data.data;
                            var lineNumber=0, lines="";
                            var busTopicStationLineList=data.data.busTopicStationLineList;
                            if(busTopicStationLineList!=null&&busTopicStationLineList.length>0){
                                lineNumber=busTopicStationLineList.length;
                                busTopicStationLineList.forEach(e=>{
                                    lines+=e.lineName+",";
                                })

                            }
                            busStationData.lineNumber=lineNumber;
                            busStationData.lines=lines.substr(0,lines.length-1);
                            content = [
                                {
                                    name: "详细信息",
                                    content: window.creatInfoHtml(title, busStationData, 2)
                                }
                            ];
                            // return content;
                        },
                        error:function(xhr,textStatus){
                        },
                        complete:function(){
                        }
                    })
                    //  this.$http.$get("gjjc_busTopicInfo/getBusStationInfoById",{stationId:data.station_id}).then(param => {
                    //  debugger;
                    //   content = [
                    //     {
                    //       name: "详细信息",
                    //       content: window.creatInfoHtml(title, busStationData, 2)
                    //     }
                    //   ];
                    //   return content;
                    // });

                }
                else if (type.indexOf("BUS_ONLINE") !== -1) {
                    //在线车辆
                    var busOnlineData = {};
                    var vehicleId=data.name;
                    // for (var i = 0; i < this.busTopicOnLineBusList.length; i++) {
                    //   if (this.busTopicOnLineBusList[i].vehicleId == data.name) {
                    //     busOnlineData = this.busTopicOnLineBusList[i];
                    //     break;
                    //   }
                    // }
                    var title = [
                        { display: "车牌号", name: "vehiclePlateNum", colspan: 3 },
                        { display: "所属公司", name: "enterpriseName", colspan: 3 },
                        { display: "运行线路", name: "lineName", colspan: 3 },
                        // { display: "纬度", name: "latitude", colspan: 3 },
                        // { display: "经度", name: "longitude", colspan: 3 }
                    ];
                    $.ajax({
                        url:'http://192.167.252.246:8088/p/tocc/irest/base/gjjc_busTopicInfo/getBusOnLineVehicleInfoById',
                        type:'POST', //GET
                        async:false,    //或false,是否异步
                        data:{
                            vehicleId:vehicleId
                        },
                        timeout:20000,    //超时时间
                        dataType:'json',    //返回的数据格式：
                        beforeSend:function(xhr){
                        },
                        success:function(data,textStatus,jqXHR){
                            debugger;
                            busOnlineData=data.data;
                            var stationcontent=""
                            var busTopicStationList=data.data.busTopicStationList;
                            if(busTopicStationList!=null&&busTopicStationList.length>0){
                                busTopicStationList.forEach(e=>{
                                    if(e.personNum==null) e.personNum=0;
                                    stationcontent+="<tr><td></td><td class=\"map-infowindow-title\" style=\"width:200px;\">"+e.stationName+"：</td><td class=\"map-infowindow-content tab_cont_name\" colspan=\"2\">"+e.personNum+"</td></tr>";
                                })

                            }
                            var tableStation='<table class="map-infowindow-table">' + stationcontent + '</table>';
                            content = [
                                {
                                    name: "详细信息",
                                    content: window.creatInfoHtml(title, busOnlineData, 2)
                                },
                                {
                                    name: "线路站点信息",
                                    height:200,
                                    content: tableStation
                                }
                            ];
                            // return content;
                        },
                        error:function(xhr,textStatus){
                        },
                        complete:function(){
                        }
                    })
                    // content = [
                    //   {
                    //     name: "详细信息",
                    //     content: window.creatInfoHtml(title, busOnlineData, 2)
                    //   },{
                    //     name:"test",
                    //     content:"<table class=\"map-infowindow-table\"><tbody><tr><td class=\"map-infowindow-title\" style=\"width:62px;\">车牌号：</td><td class=\"map-infowindow-content tab_cont_name\" colspan=\"3\">川AQ3796</td></tr><tr><td class=\"map-infowindow-title\" style=\"width:89px;\">速度(km/h)：</td><td class=\"map-infowindow-content\" colspan=\"3\">4.932</td></tr><tr><td class=\"map-infowindow-title\" style=\"width:49px;\">纬度：</td><td class=\"map-infowindow-content\" colspan=\"3\">30.642206</td></tr><tr><td class=\"map-infowindow-title\" style=\"width:49px;\">经度：</td><td class=\"map-infowindow-content\" colspan=\"3\">104.053063</td></tr></tbody></table>"
                    //   }
                    // ];
                }
                else if (type.indexOf("BUS_SPECIAL") !== -1) {
                    //专用道
                    var busLaneId=data.id;
                    var busLaneData = {};
                    // for (var i = 0; i < this.busTopicBusLaneList.length; i++) {
                    //   if (this.busTopicBusLaneList[i].busLaneId == data.id) {
                    //     busLaneData = this.busTopicBusLaneList[i];
                    //     break;
                    //   }
                    // }
                    var title = [
                        { display: "专用道名称", name: "busLaneName", colspan: 3 },
                        { display: "起点名称", name: "startName", colspan: 3 },
                        { display: "终点名称", name: "endName", colspan: 3 },
                        { display: "专用道类型", name: "busType", colspan: 3 },
                        { display: "长度(km)", name: "length", colspan: 3 },
                        { display: "速度(km/h)", name: "speed", colspan: 3 },
                        { display: "途经线路条数", name: "lineNumber", colspan: 3 },
                        { display: "途经线路", name: "lines", colspan: 3 },
                    ];
                    $.ajax({
                        url:'http://192.167.252.246:8088/p/tocc/irest/base/gjjc_busTopicInfo/getBusLaneInfoById',
                        type:'POST', //GET
                        async:false,    //或false,是否异步
                        data:{
                            busLaneId:busLaneId
                        },
                        timeout:20000,    //超时时间
                        dataType:'json',    //返回的数据格式：
                        beforeSend:function(xhr){
                        },
                        success:function(data,textStatus,jqXHR){
                            debugger;
                            busLaneData=data.data;
                            var lineNumber=0, lines="";
                            var busTopicBusLaneLinelist=data.data.busTopicBusLaneLinelist;
                            var arr=[];
                            if(busTopicBusLaneLinelist!=null&&busTopicBusLaneLinelist.length>0){
                                busTopicBusLaneLinelist.forEach(e=>{
                                    arr.push(e.lineName)
                                    // lines+=e.lineName+",";
                                })

                            }
                            var set = new Set(arr);
                            if(set.size>0){
                                lineNumber=set.size;
                                for (let item of set) {
                                    lines+=item+",";
                                }
                            }

                            busLaneData.lineNumber=lineNumber;
                            busLaneData.lines=lines.substr(0,lines.length-1);
                            content = [
                                {
                                    name: "详细信息",
                                    content: window.creatInfoHtml(title, busLaneData, 2)
                                }
                            ];
                            // return content;
                        },
                        error:function(xhr,textStatus){
                        },
                        complete:function(){
                        }
                    })
                    // content = [
                    //   {
                    //     name: "详细信息",
                    //     content: window.creatInfoHtml(title, busLaneData, 2)
                    //   }
                    // ];
                }
                else if (type.indexOf("BUS_METRO") !== -1) {
                    //公交地铁换乘
                    for (var i = 0; i < this.busTopicMetroStationList.length; i++) {
                        if (this.busTopicMetroStationList[i].stationName == data.name) {
                            this.busMetroDetail(this.busTopicMetroStationList[i]);
                            break;
                        }
                    }
                    content = null;
                }
                else {
                    content = null;
                    console.warn("图层：" + type + "没有配置弹窗展示内容！");
                }
                return content;
            },
            getData() {
                //获取页面数据
                this.$http.$get("gjjc_busTopicInfo/getBusToCityCountyList").then(param => {
                    //公交走廊
                    this.dealWithBusChannelInfo(param);
                });

            },
            dealWithBusChannelInfo(data) {
                //处理公交走廊数据
                if (data.busTopicToCityCountyList && data.busTopicToCityCountyList.length > 0) {
                    this.channel=data.busTopicToCityCountyList.length;
                    this.busTopicChannelList = data.busTopicToCityCountyList;
                }

                if(this.activeNo == 4){
                    this.removeZLArea();
                    var lq=0,sl=0,tf=0,wj=0,pd=0,xd=0;
                    var lqlineNum=0,sllineNum=0,tflineNum=0,wjlineNum=0,pdlineNum=0,xdlineNum=0;

                    for(var i=0;i< this.busTopicChannelList.length;i++){
                        switch(this.busTopicChannelList[i].districtName){
                            case '天府新区':
                                tf=this.busTopicChannelList[i].personNum;
                                tflineNum=this.busTopicChannelList[i].lineNum;
                                break;
                            case '龙泉驿区':
                                lq=this.busTopicChannelList[i].personNum;
                                lqlineNum=this.busTopicChannelList[i].lineNum;
                                break;
                            case '新都区':
                                xd=this.busTopicChannelList[i].personNum;
                                xdlineNum=this.busTopicChannelList[i].lineNum;
                                break;
                            case '温江区':
                                wj=this.busTopicChannelList[i].personNum;
                                wjlineNum=this.busTopicChannelList[i].lineNum;
                                break;
                            case '双流区':
                                sl=this.busTopicChannelList[i].personNum==null?0:this.busTopicChannelList[i].personNum;
                                sllineNum=this.busTopicChannelList[i].lineNum;
                                break;
                            case '郫都区':
                                pd=this.busTopicChannelList[i].personNum;
                                pdlineNum=this.busTopicChannelList[i].lineNum;
                                break;
                        }
                    }
                    tmap.addChart('zc',this.createPieOption1("主城区",'rgb(12,40,106)'),104.072165,30.663431,{width:180,height:180});
                    tmap.addChart('lq',this.createPieOption("龙泉驿",lq,'人次',lqlineNum,'rgb(25,88,217)'),104.269181,30.56065,{width:140,height:140}).$chart.on("click", param => {
                        this.getOneAreaData('龙泉驿区');
                        // this.showBusMetroTop10(param);
                    });
                    tmap.addChart('sl',this.createPieOption("双流",sl,'人次',sllineNum,'rgb(25,88,217)'),103.922706,30.573243,{width:140,height:140}).$chart.on("click", param => {
                        this.getOneAreaData('双流区');

                    });
                    tmap.addChart('tf',this.createPieOption("天府新区",tf,'人次',tflineNum,'rgb(25,88,217)'),104.066307,30.491921,{width:140,height:140}).$chart.on("click", param => {
                        this.getOneAreaData('天府新区');

                    });
                    tmap.addChart('wj',this.createPieOption("温江",wj,'人次',wjlineNum,'rgb(25,88,217)'),103.836776,30.697996,{width:140,height:140}).$chart.on("click", param => {
                        this.getOneAreaData('温江区');

                    });
                    tmap.addChart('xd',this.createPieOption("新都",xd,'人次',xdlineNum,'rgb(25,88,217)'),104.16022000,30.82422300,{width:140,height:140}).$chart.on("click", param => {
                        this.getOneAreaData('新都区');
                    });
                    tmap.addChart('pd',this.createPieOption("郫都",pd,'人次',pdlineNum,'rgb(25,88,217)'),103.887842,30.808752,{width:140,height:140}).$chart.on("click", param => {
                        this.getOneAreaData('郫都区');
                    });
                    this.getOneAreaData('龙泉驿区');
                    this.addLineArea();//加线
                }
                // this.channel = data.channel == null ? 0 : data.channel; //
            },
            activeZL() {
                //展示公交走廊数据
                tmap.centerAt(104.072165, 30.663431);
                tmap.qTipTool.hidePopupWindow();
                this.activeNo = 4;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("", false);
                tmap.setMapZoomLevel(11);
                // if (tmap.getLayer("BUS_CORRIDOR")) {
                //   tmap.setLayerVisible("BUS_CORRIDOR", true);
                // } else {
                //   tmap.addLayer("BUS_CORRIDOR").loadData();
                // }
                // if (this.busTopicChannelList.length > 0) {
                //   this.busTopicChannelList.forEach(e => {
                //     this.addZLDataOverLay(e);
                //   });
                // }
                tmap.removeChart("channelDetail");
                var lq=0,sl=0,tf=0,wj=0,pd=0,xd=0;
                var lqlineNum=0,sllineNum=0,tflineNum=0,wjlineNum=0,pdlineNum=0,xdlineNum=0;

                for(var i=0;i< this.busTopicChannelList.length;i++){
                    switch(this.busTopicChannelList[i].districtName){
                        case '天府新区':
                            tf=this.busTopicChannelList[i].personNum;
                            tflineNum=this.busTopicChannelList[i].lineNum;
                            break;
                        case '龙泉驿区':
                            lq=this.busTopicChannelList[i].personNum;
                            lqlineNum=this.busTopicChannelList[i].lineNum;
                            break;
                        case '新都区':
                            xd=this.busTopicChannelList[i].personNum;
                            xdlineNum=this.busTopicChannelList[i].lineNum;
                            break;
                        case '温江区':
                            wj=this.busTopicChannelList[i].personNum;
                            wjlineNum=this.busTopicChannelList[i].lineNum;
                            break;
                        case '双流区':
                            sl=this.busTopicChannelList[i].personNum==null?0:this.busTopicChannelList[i].personNum;
                            sllineNum=this.busTopicChannelList[i].lineNum;
                            break;
                        case '郫都区':
                            pd=this.busTopicChannelList[i].personNum;
                            pdlineNum=this.busTopicChannelList[i].lineNum;
                            break;
                    }
                }
                tmap.addChart('zc',this.createPieOption1("主城区",'rgb(12,40,106)'),104.072165,30.663431,{width:180,height:180});
                tmap.addChart('lq',this.createPieOption("龙泉驿",lq,'人次',lqlineNum,'rgb(25,88,217)'),104.269181,30.56065,{width:140,height:140}).$chart.on("click", param => {
                    this.getOneAreaData('龙泉驿区');
                    // this.showBusMetroTop10(param);
                });
                tmap.addChart('sl',this.createPieOption("双流",sl,'人次',sllineNum,'rgb(25,88,217)'),103.922706,30.573243,{width:140,height:140}).$chart.on("click", param => {
                    this.getOneAreaData('双流区');

                });
                tmap.addChart('tf',this.createPieOption("天府新区",tf,'人次',tflineNum,'rgb(25,88,217)'),104.066307,30.491921,{width:140,height:140}).$chart.on("click", param => {
                    this.getOneAreaData('天府新区');

                });
                tmap.addChart('wj',this.createPieOption("温江",wj,'人次',wjlineNum,'rgb(25,88,217)'),103.836776,30.697996,{width:140,height:140}).$chart.on("click", param => {
                    this.getOneAreaData('温江区');

                });
                tmap.addChart('xd',this.createPieOption("新都",xd,'人次',xdlineNum,'rgb(25,88,217)'),104.16022000,30.82422300,{width:140,height:140}).$chart.on("click", param => {
                    this.getOneAreaData('新都区');
                });
                tmap.addChart('pd',this.createPieOption("郫都",pd,'人次',pdlineNum,'rgb(25,88,217)'),103.887842,30.808752,{width:140,height:140}).$chart.on("click", param => {
                    this.getOneAreaData('郫都区');
                });
                this.getOneAreaData('龙泉驿区');


                // tmap.addChart("test",option,104.269181,30.56065,{width:100,height:100});
                // var line= "104.078846,30.504502;104.078822,30.510648;104.078779,30.510833;104.078699,30.511064;104.078515,30.511342;104.077892,30.512115;104.077443,30.512513;104.076762,30.512942;104.076013,30.513156;104.075338,30.51323;104.073948,30.513222;104.073196,30.513215;104.072491,30.513216;104.072279,30.513229;104.072034,30.513252;104.071664,30.513294;104.071294,30.513361;104.070889,30.513456;104.070393,30.513598;104.069891,30.513779;104.06946,30.513968;104.069,30.51424;104.068649,30.514551;104.068325,30.514945;104.06811,30.515261;104.067901,30.515739;104.067723,30.516259;104.06765,30.516676;104.067616,30.517301;104.067616,30.518601;104.067616,30.519822;104.067327,30.527486;104.067327,30.528212;104.067327,30.528981;104.067001,30.538838;104.067001,30.539569;104.067001,30.54027;104.066696,30.547874;104.066695,30.548663;104.066695,30.54947;104.066422,30.556651;104.066422,30.557327;104.066422,30.558001;104.065873,30.566202;104.065688,30.567037;104.065343,30.567772;104.064906,30.568487;104.064617,30.568999;104.064247,30.569635;104.064023,30.570178;104.063786,30.570707;104.06353,30.571011;104.06315,30.571341;104.062726,30.571696;104.062496,30.572103;104.062292,30.572619;104.062198,30.573557;104.061836,30.576833;104.061823,30.577135;104.061816,30.577352;104.061816,30.577659;104.061812,30.578329;104.061808,30.579003;104.061638,30.584398;104.061646,30.585033;104.061653,30.585669;104.061376,30.59617;104.061346,30.596818;104.061306,30.597472;104.061294,30.597732;104.061275,30.59797;104.061282,30.598227;104.061351,30.598534;104.061501,30.598802;104.061754,30.599119;104.063672,30.601833;104.064133,30.60276;104.064581,30.603811;104.064755,30.604582;104.06478,30.605591;104.064905,30.606959;104.064885,30.6079;104.064859,30.608839;104.064607,30.617747;104.064373,30.626564;104.064377,30.627207;104.064373,30.627852;104.064099,30.634653;104.064098,30.635792;104.064099,30.636929;104.063976,30.638952;104.063771,30.645248;104.063545,30.65247;104.063523,30.653261;104.063242,30.65916;104.063244,30.659875;104.063242,30.660768;104.063134,30.66797;104.063109,30.668932;104.063081,30.669892;104.063139,30.67047;104.063261,30.671072;104.063419,30.671609;104.063613,30.672187;104.063807,30.672598;104.064128,30.673065;104.065524,30.674947;104.066911,30.676831;104.067079,30.67712;104.067999,30.678769;104.068996,30.680847;104.069568,30.682625;104.069916,30.684339;104.070282,30.685922;104.070535,30.687233;104.070797,30.688597;104.070928,30.689349;104.071031,30.690051;104.071112,30.690717;104.071187,30.691408;104.071355,30.693249;104.071489,30.6954;104.071533,30.69676;104.071533,30.697911;104.071533,30.698805;104.071545,30.698962;104.071571,30.699099;104.071608,30.699219;104.071663,30.699347;104.071746,30.699486;104.071877,30.699665;104.072027,30.699797;104.072284,30.699953;104.072562,30.700091;104.07297,30.700224;104.073575,30.700361;104.074604,30.700558;104.076288,30.700877;104.078075,30.701237;104.078797,30.701429;104.079326,30.701596;104.079858,30.701816;104.080282,30.70205;104.080671,30.702313;104.080938,30.702537;104.081179,30.702782;104.081352,30.703035;104.081449,30.703245;104.081526,30.703523;104.081569,30.703784;104.081609,30.70409;104.081611,30.704364;104.081585,30.704627;104.081507,30.704996;104.081392,30.705536;104.081236,30.706055;104.080939,30.707006;104.080768,30.707546;104.080694,30.708178;104.080683,30.708667;104.080737,30.709202;104.084321,30.720017";
                //        var line="104.269181,30.56065;103.922706,30.573243";

                // tmap.addLineOnLayer('BUS_CORRIDOR',"test2",line,6,'#fff')
                // [[104.269181,30.56065],[103.922706,30.573243]];
                this.addLineArea();

            },
            getOneAreaData(areaName){
                this.xzqhName=areaName;

                this.$http.$get("gjjc_busTopicInfo/getBusToCityLineInfo",{districtName:areaName}).then(param => {
                    this.lineNum=param.lineNum==null?0:param.lineNum;
                    this.busTopicToCityLineList=param.busTopicToCityLineList;
                });
            },
            addLineArea(){
                // tmap.centerAt(104.072165, 30.663431);
                //wj 103.836776	30.697996
                //103.887842	30.808752
                //xd 104.16022000,30.82422300
                var data = [
                    {
                        "fromName": "新都 ",
                        "toName": "主城区 ",
                        "coords": [
                            [
                                104.165220,30.824223
                            ],
                            [
                                104.077165, 30.670431
                            ],
                        ]
                    },
                    {
                        "fromName": "郫都 ",
                        "toName": "主城区 ",
                        "coords": [
                            [
                                103.887842,30.813752
                            ],
                            [
                                104.072165, 30.670431
                            ],
                        ]
                    },
                    {
                        "fromName": "温江 ",
                        "toName": "主城区 ",
                        "coords": [
                            [
                                103.836776,30.702996
                            ],
                            [
                                104.072165, 30.668431
                            ],
                        ]
                    },
                    {
                        "fromName": "longquan ",
                        "toName": "主城区 ",
                        "coords": [
                            [
                                104.269181, 30.56065
                            ],
                            [
                                104.072165, 30.663431
                            ],
                        ]
                    },
                    {
                        "fromName": "shuangliu ",
                        "toName": "主城区 ",
                        "coords": [
                            [
                                103.922706,30.563243
                            ],
                            [
                                104.072165, 30.653431
                            ],
                        ]
                    },{
                        "fromName": "tianfu ",
                        "toName": "主城区 ",
                        "coords": [
                            [
                                104.071307,30.491921
                            ],
                            [
                                104.077165, 30.663431
                            ],
                        ]
                    }
                ];
                var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

                var option2={
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // backgroundColor: 'rgba(128, 128, 128, 0.6)', //rgba设置透明度0.1
                    title: {
                        text: '',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    legend: {
                        show: false,
                        orient: 'vertical',
                        top: 'auto',
                        left: 'right',
                        data: ['地点', '线路'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    // geo: {
                    //   map: '山西',
                    //   "show": true,
                    //
                    //   "label": {
                    //     "normal": {
                    //       "show": true,
                    //       "textStyle": {
                    //         "color": "#fff",
                    //         "fontSize": 16,
                    //         "fontFamily": "Arial"
                    //       }
                    //     }
                    //   },
                    //   "aspectScale": 1.2,
                    //   "itemStyle": {
                    //     "emphasis": {
                    //       "label": {
                    //         "show": true
                    //       }
                    //     },
                    //     "normal": {
                    //       "areaColor": "#1E90FF",
                    //       "borderWidth": 2,
                    //       "borderColor": "#fff",
                    //       "shadowColor": "rgba(30,144,255,1)",
                    //       "shadowBlur": 10
                    //     }
                    //   },
                    //   "zoom": 1.2,
                    //   "left": 140
                    // },
                    series: [ {
                        name: "线",
                        type: 'lines',
                        polyline: true,
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            symbol: planePath,
                            symbolSize: 15
                        },
                        lineStyle: {
                            normal: {
                                color:"#fff",
                                width: 4,
                                opacity: 0.8,
                                curveness: 0.2,
                                type:'dotted'
                            }
                        },
                        data: data
                    },
                        {
                            name: "特效",
                            type: 'lines',
                            polyline: true,
                            zlevel: 2,
                            effect: {
                                show: true,
                                period:5,
                                trailLength: 0.6,
                                color: '#fff',
                                symbolSize: 10
                            },
                            lineStyle: {
                                normal: {
                                    color: "#fff",
                                    width: 0,
                                    curveness: 0.2
                                }
                            },
                            data:data
                        }
                    ]
                };
                var data2 = [
                    {
                        "fromName": "主城区 ",
                        "toName": "新都",
                        "coords": [
                            [
                                104.067165, 30.670431
                            ],
                            [
                                104.155220,30.824223
                            ],

                        ]
                    },
                    {
                        "fromName": "主城区",
                        "toName": " 郫都 ",
                        "coords": [
                            [
                                104.072165, 30.660431
                            ],
                            [
                                103.887842,30.800752
                            ],

                        ]
                    },
                    {
                        "fromName": "主城区 ",
                        "toName": "温江",
                        "coords": [
                            [
                                104.072165, 30.658431
                            ],
                            [
                                103.836776,30.692996
                            ],

                        ]
                    },
                    {
                        "fromName": "主城区 ",
                        "toName": "龙泉 ",
                        "coords": [
                            [
                                104.072165, 30.673431
                            ],
                            [
                                104.269181, 30.57065
                            ],

                        ]
                    },
                    {
                        "fromName": "shuangliu ",
                        "toName": "主城区 ",
                        "coords": [
                            [
                                104.072165, 30.673431
                            ],
                            [
                                103.922706,30.583243
                            ],

                        ]
                    },
                    {
                        "fromName": "主城区 ",
                        "toName": "天府",
                        "coords": [
                            [
                                104.067165, 30.653431
                            ],
                            [
                                104.061307,30.491921
                            ],

                        ]
                    }
                ];
                var option3={
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // backgroundColor: 'rgba(128, 128, 128, 0.6)', //rgba设置透明度0.1
                    title: {
                        text: '',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    legend: {
                        show: false,
                        orient: 'vertical',
                        top: 'auto',
                        left: 'right',
                        data: ['地点', '线路'],
                        textStyle: {
                            color: '#fff'
                        }
                    },

                    series: [ {
                        name: "线",
                        type: 'lines',
                        polyline: true,
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            symbol: planePath,
                            symbolSize: 15
                        },
                        lineStyle: {
                            normal: {
                                color:"#3affff",
                                width: 4,
                                opacity: 0.8,
                                curveness: 0.2,
                                type:'dotted'
                            }
                        },
                        data: data2
                    },
                        {
                            name: "特效",
                            type: 'lines',
                            polyline: true,
                            zlevel: 2,
                            effect: {
                                show: true,
                                period:5,
                                trailLength: 0.6,
                                color: '#fff',
                                symbolSize: 10
                            },
                            lineStyle: {
                                normal: {
                                    color: "#fff",
                                    width: 0,
                                    curveness: 0.2
                                }
                            },
                            data:data2
                        }
                    ]
                };
                tmap.addChart("test",option2);
                tmap.addChart("test2",option3);
            },
            removeZLArea(){
                tmap.removeChart('zc');
                tmap.removeChart('lq');;
                tmap.removeChart('sl');
                tmap.removeChart('tf');
                tmap.removeChart('wj');
                tmap.removeChart('xd');
                tmap.removeChart('pd');
                tmap.removeChart("test");
                tmap.removeChart("test2");
            },


            getSearchValueSelf(param) {
                //时间类型选择
            }
        },
        data() {
            return {
                timetype: 1, //时间类型
                xzqhName:"",//行政区划名称
                lineNum:0,//线路条数
                busTopicToCityLineList:[],
                swiperOption: {
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false,
                    },
                    // slidesPerView :'auto',
                    // autoplay:false,
                    direction:'vertical',
                    grabCursor:true,
                    // autoplayDisableOnInteraction:false,
                    mousewheelControl:true,
                    autoHeight:true,
                    speed:2000,
                    slidesPerView: 5,
                    // centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                },
                searchConfig2: {
                    searchCondition: [
                        {
                            order: 36,
                            type: "select",
                            label: "",
                            placeholder: "",
                            width: 100,
                            VModelvalue: {
                                name: "timetype",
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
                                }
                            ]
                        }
                    ]
                },
                showBusMetro: false,
                busMetroStationName: "",
                busMetroPersonNum: 0,
                lineNum50m: 0,
                stationNum50m: 0,
                lineNum100m: 0,
                stationNum100m: 0,
                lineNum150m: 0,
                stationNum150m: 0,
                mapLegend: {
                    list: [
                        {
                            color: "rgba(26, 117, 209,1)",
                            name: "快线" // 圖例名字
                        },
                        {
                            color: "#FFFF00",
                            name: "干线"
                        },
                        {
                            color: "rgb(68, 209, 53)",
                            name: "支线"
                        },
                        {
                            color: "#72F6FA",
                            name: "微线"
                        },
                        {
                            color: "#CC91E2",
                            name: "特色"
                        }
                    ]
                }, //图例
                mapLegendLane: {
                    list: [
                        {
                            color: "#8D3DD7",
                            name: "双向全天候"
                        },
                        {
                            color: "#54A74D",
                            name: "单向全天候"
                        },
                        {
                            color: "#006AFA",
                            name: "白天时段" // 圖例名字
                        },
                        {
                            color: "#E03F46",
                            name: "高峰时段"
                        },
                        {
                            color: "#35AAE7",
                            name: "潮汐"
                        },



                    ]
                }, //图例
                mapLegendStation: {
                    list: [
                        {
                            color: "rgba(26, 117, 209,1)",
                            name: "中间站" // 圖例名字
                        },
                        {
                            color: "#FFFF00",
                            name: "首末站"
                        }
                    ]
                },
                mapLegendOnline: {
                    list: [
                        {
                            color: "rgba(26, 117, 209,1)",
                            name: "CNG" // 圖例名字
                        },
                        {
                            color: "#FFFF00",
                            name: "混合动力"
                        },
                        {
                            color: "rgb(68, 209, 53)",
                            name: "电动"
                        },
                        {
                            color: "rgba(127,45,0,1)",
                            name: "柴油"
                        }
                    ]
                },
                stationRate: [], //覆盖率相关数据

                busLaneSpeed: 0, //专用道平均时速
                busLaneDaySpeed: 0, //白天平均时速
                busLaneTideSpeed: 0, //潮汐时速
                busLaneOnewaySpeed: 0, //全天单向时速
                busLanePeakSpeed: 0, //高峰时速
                busLaneQuickSpeed: 0, //快速路时速

                busLaneDay: 0, //白天条数
                busLaneDayLen: 0, //白天长度
                busLaneTide: 0, //潮汐条数
                busLaneTideLen: 0, //潮汐长度
                busLaneOneway: 0, //全天单向条数
                busLaneOnewayLen: 0, //全天单向长度
                busLanePeak: 0, //高峰条数
                busLanePeakLen: 0, //高峰长度
                busLaneQuick: 0, //快速路条数
                busLaneQuickLen: 0, //快速路长度

                activeLineTOP: 0, //线路top10展示顺序
                activeStationNo: 1, //站点展示顺序
                quickLine: 0, //快线
                quickLinePerson: 0, //快线人数
                mainLine: 0, //干线
                mainLinePerson: 0, //快线人数
                regionalLine: 0, //支线
                regionalLinePerson: 0, //支线人数
                microLine: 0, //微线
                microLinePerson: 0, //微线线人数
                quickLineOption: {}, //快线TOP10
                mainLineOption: {}, //干线top10
                regionalLineOption: {}, //支线TOP10
                microLineOption: {}, //微线top10
                otherLineOption:{},//特色Top10
                busMetroOption: {}, //公交地铁换乘TOP10
                echartoption: {}, //echarts配置文件

                busTopicMetroStationList: [], //公交地铁换乘集合
                busTopicBusLaneList: [], //公交专用道集合
                busTopicChannelList: [], //公交走廊集合
                busTopicOnLineBusList: [], //在线车辆
                busTopicStationList: [], //公交站点集合
                gjBusLineInternetList: [], //公交线路集合
                laneSpeedOption: {}, //公交专用道速度TOP
                topStationOption: {}, //公交站点客流TOP10图表展示配置
                option: {},
                option2:{},
                activeNo: 1, //当前页面
                testData: [
                    ["1路", "2路", "3路", "4路", "5路"],
                    [5, 4, 3, 2, 1]
                ],
                busLineOther: 0, //其它公交线路数
                personNumOther: 0, //其它公交人数
                busDriver: 0, //  公交驾驶人员
                busLane: 0, //公交专用道数量
                busEnterprise: 0, //企业数
                busLine: 0, //公交线路数
                busLineInternet: 0, //公交线网数量
                busPerson: 0, // 公交从业人员
                personNum: 0, //总客流量
                busVehicle: 0, //车辆数
                busMetro: 0, //公交地铁换乘数量
                busStation: 0, //公交站点数量
                onLineBus: 0, //公交在线车辆数量
                coverageRate300m: 0, //300m覆盖率
                hubStationNum: 0, //公交枢纽站数量
                coverageRate500m: 0, //500m覆盖率
                channel: 0, //公交走廊
                hhBus: 0, //混合动力
                ddBus: 0, //电动
                cngBus: 0, //CNG
                cyBus: 0 //柴油
            };
        },
        beforeDestroy() {
            if (this.autohand) {
                window.clearInterval(this.autohand);
            }
        },
        destroy() {
            if (this.autohand) {
                window.clearInterval(this.autohand);
            }
        }
    };
</script>
<style lang="css" scoped>
    .timeSelect >>> .search-panel-container {
        height: 30px;
    }
    .timeSelect >>> .search-panel-wrap {
        height: 30px;
    }
    .right-content>>>.swiper-container {
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
<style lang="scss" scoped>
    .homepage-wrapper {
        height: 100%;
        width: 100%;
        position: relative;
        .panel-wrapper {
            height: 98%;
            // padding: 10px 0;
            /*position: absolute;*/
            /*top: 50%;*/
            width: 360px;
            /*<!--transform: translateY(-50%);-->*/
            // border: 1px solid red;
        }

        .left {
            /*position: absolute;*/
            height: 756px;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            justify-content: center;
            .left-content {
                div{
                    flex:1;
                    cursor:pointer
                }
                .left-main{
                    width:312px;
                    height:112px;
                    display: flex;
                    flex-direction: row;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    .line{
                        flex:1;
                        text-align: center;
                        margin-left:20px;
                    }
                    .traffic{
                        flex:1;
                        margin-left:20px;
                        text-align: center;
                    }
                     li{
                         line-height: 50px;
                         height:50px;
                     }
                    li:nth-child(2){
                        color:#FFFF00;
                        font-size: 26px;
                        font-weight: bold;
                    }

                }
                .left-item{
                    background: url('./img/left_item.png') no-repeat;
                    /*background-size: 100%;*/
                    width:360px;
                    height:112px;
                    margin-top:20px;
                    display: flex;
                    flex-direction: row;
                    .title{
                        flex:1;
                        margin-left: 60px;
                    }
                    .content{
                        flex:1;
                        li{
                            color:#00FFFF;
                            font-size: 26px;
                            font-weight: bold;
                        }
                    }
                    li{
                        height:56px;
                        line-height: 56px;
                    }
                }

                /*<!--.item1{-->
                <!--    transform: rotateZ(8deg);-->
                <!--}-->
                <!--.item3{-->
                <!--    transform: rotateZ(-8deg);-->
                <!--}-->*/

            }
        }
        .right {
            /*position: absolute;*/
            height: 756px;
            right: 0;

            .right-content {
                height:800px;
                .title{
                    text-align:center ;
                    font-size: 18px;
                    font-weight: normal;
                    /*font-family: '幼圆';*/
                }
                .line_content{
                    /*font-family: '幼圆';*/
                    margin-top: 20px;
                    height:150px;
                    margin-left: 20px;
                    ul{
                        padding-left: 20px;
                        .gjLineName span{

                            color:#00ffff;
                            font-size: 20px;
                            font-weight: bold;
                            /*border-radius: 2px;*/
                        }
                        li{
                            height: 34px;
                            line-height: 34px;
                        }
                    }
                }
                .blue-line{
                    background-color: rgba(10, 39, 118, 1) ;
                    height:2px;
                    width:90%;
                }

            }
        }
        .bottom {
            /*background: -webkit-gradient(linear,top,bottom, from(rgba(5, 14, 38, 0.2)), to(#050e26));*/
            background: linear-gradient(to bottom, rgba(10, 39, 118, 1), #050e26);
            border-radius:4px;
            position: absolute;
            bottom: 2px;
            height: 40px;
            width: 400px;
            /*width: 823px;*/
            /*height: 48px;*/
            left: 50%;
            transform: translateX(-50%);
            table {
                width:100%;
                tr {
                    line-height: 31px;
                    text-align: center;
                    //   color: rgba(66, 51, 207, 0.938);
                    th {
                        line-height: 31px;
                        margin-left: 10px;
                        span:nth-child(1) {
                             height: 10px;
                             width: 10px;
                             border-radius: 50%;
                             margin-right: 10px;
                             display: inline-block;
                         }
                        span:nth-child(2){
                            font-weight: normal;
                        }
                    }
                }
            }
            .timeSelect {
                position: absolute;
                top: 2px;
                right: 2px;
            }
            .title{
                text-align:center ;
                font-size: 18px;
                font-weight: normal;
                /*font-family: '幼圆';*/
            }
            .line_content{
                /*font-family: '幼圆';*/
                margin-top: 20px;
                height:180px;
                margin-left: 20px;
                ul{
                    padding-left: 20px;
                    .gjLineName span{
                        border: 1px solid rgb(255,255,255);
                        border-radius: 2px;
                    }
                    li{
                        height: 34px;
                        line-height: 34px;
                    }
                }
            }
        }
        .mapLegend {
            position: absolute;
            z-index: 6;
            right: -3.1rem;
            bottom: -0.25rem;
            width: 110px;
        }
        .busMetro-wrap {
            position: absolute;
            top: 132px;
            right: 307px;
            width: 300px;
            background-color: rgba(35, 94, 243, 0.05);
            border-radius: 2px;
            transition: all 1.6s;
            border: 1px solid rgba(32, 86, 221, 0.2);
            .content-radius {
                position: absolute;
                width: 10px;
                height: 10px;
                z-index: 999;
            }
            .top-left {
                top: -1px;
                left: -1px;
                border-left: 1px solid #2056dd;
                border-top: 1px solid #2056dd;
            }

            .bottom-right {
                bottom: -1px;
                right: -1px;
                border-bottom: 1px solid #2056dd;
                border-right: 1px solid #2056dd;
            }

            .top-right {
                top: -1px;
                right: -1px;
                border-right: 1px solid #2056dd;
                border-top: 1px solid #2056dd;
            }

            .bottom-left {
                bottom: -1px;
                left: -1px;
                border-bottom: 1px solid #2056dd;
                border-left: 1px solid #2056dd;
            }
            .close {
                position: absolute;
                right: 10px;
                top: 1px;
                font-size: 22px;
                color: rgba(255, 255, 255, 0.9);
                display: inline-block;
                cursor: pointer;
            }
            .close:hover {
                color: rgba(35, 94, 243, 1);
            }
            .busMetro-inner {
                height: 100%;
                /*width: 100%;*/
                padding: 20px 10px 10px 10px;
            }
            table {
                padding-top: 20px;
                background-color: rgba(35, 94, 243, 0.15);
                width: 100%;
                tr {
                    line-height: 36px;
                    td {
                        padding-left: 5px;
                    }
                    td.station_name {
                        color: #00ffff;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    td:not(.station_name) {
                        text-align: left;
                        font-size: 14px;
                        font-weight: bold;
                        /*font-family: "datafont";*/
                        /*color: #00ffff;*/
                        span.unit {
                            font-size: 14px;
                            color: rgba(255,255,255,.6);
                            font-weight: normal;
                        }
                    }
                    th {
                        text-align: left;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 14px;
                        font-weight: normal;
                    }
                }
            }
        }
    }
</style>