<template>
    <div class="homepage-wrapper">
        <BaseLayoutContent>
            <template #leftPanel>


            </template>
            <template #midContent>
                <div class="testmap">
                    <Basemap></Basemap>
                </div>
                <div>

                </div>

<!--                <div class="mapLegend" v-if="activeNo==1">-->
<!--                    <MapLegend :mapLegend="mapLegend" />-->
<!--                </div>-->
<!--                <div class="mapLegend" v-if="activeNo==2">-->
<!--                    <MapLegend :mapLegend="mapLegendStation" />-->
<!--                </div>-->
<!--                <div class="mapLegend" v-if="activeNo==3">-->
<!--                    <MapLegend :mapLegend="mapLegendOnline" />-->
<!--                </div>-->
<!--                <div class="mapLegend" v-if="activeNo==5">-->
<!--                    <MapLegend :mapLegend="mapLegendLane" />-->
<!--                </div>-->
                <div class="busMetro-wrap" v-if="showBusMetro">
                    <!-- 线路详情 -->
                    <!-- <span class="close" @click="close">x</span> -->
                    <i class="el-icon-close close" @click="closeBusMetroDetail"></i>
                    <div class="content-radius top-left"></div>
                    <div class="content-radius bottom-right"></div>
                    <div class="content-radius top-right"></div>
                    <div class="content-radius bottom-left"></div>

                    <div class="busMetro-inner">
                        <table>
                            <tr>
                                <th>地铁站点名称:</th>
                                <td class="station_name">{{busMetroStationName}}</td>
                            </tr>
                            <tr>
                                <th>换乘客流人数:</th>
                                <td>
                                    <!--                            <count-to :startVal="0" :endVal="content.mileage" :duration="2000" />-->
                                    {{busMetroPersonNum}}
                                    <span class="unit">人次</span>
                                </td>
                            </tr>
                            <tr>
                                <th>50米线路|站点数量:</th>
                                <td>
                                    {{lineNum50m}} | {{stationNum50m}}
                                    <!--<span class="unit">%</span>-->
                                </td>
                            </tr>
                            <tr>
                                <th width="50%">100米线路|站点数量:</th>
                                <td width="50%">
                                    {{lineNum100m}} | {{stationNum100m}}
                                    <!--                            <count-to :startVal="0" :endVal="content.linePassengerFlow" :duration="4000" />-->
                                    <!--                            <span class="unit">人次</span>-->
                                </td>
                            </tr>
                            <tr>
                                <th>150米线路|站点数量:</th>
                                <td>
                                    {{lineNum150m}} | {{stationNum150m}}
                                    <!--                            {{content.passengerFlowProp}}-->
                                    <!--                            <span class="unit">%</span>-->
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </template>
            <template #rightPanel>
                <panel>
                    <PanelItem title :displaySwitch="false">
                        <div class="panel-wrapper right">
                            <div class="right-content">
                                <div class='echartsClass' >
                                    <v-chart :options="busMetroOption" :autoresize="true"></v-chart>
                                </div>

<!--                                <div class="item item1" @click="activeZL" :class="{active:activeNo==4}">交通走廊(<span>{{channel}}</span>)</div>-->
<!--                                <div class="item" @click="activeZYD" :class="{active:activeNo==5}">公交专用道(<span>{{busLane}}</span>)</div>-->
<!--                                <div class="item item3" @click="activeHC" :class="{active:activeNo==6}">换乘地铁出行(<span>{{busMetro}}</span>)</div>-->
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
            this.activeHC();
            // tmap.addLayer("BUS_LINE").loadData(); //加载路线图层
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
                this.$http.$get("gjjc_busTopicInfo/getBusMetroInfo").then(param => {
                    //公交地铁换乘
                    this.dealWithBusMetroInfo(param);
                });

            },
            dealWithBusMetroInfo(data) {
                //处理公交地铁换乘数据
                this.busMetro = data.busMetro == null ? 0 : data.busMetro;
                if (
                    data.busTopicMetroStationList &&
                    data.busTopicMetroStationList.length > 0
                ) {
                    this.busTopicMetroStationList = data.busTopicMetroStationList;
                    var top10BusMetroList = [],
                        station = [],
                        personNum = [];
                    var pointData = [];
                    var radius = [40, 38, 36, 34, 32, 30, 28, 26, 24, 22];
                    for (var i = 0; i < 10; i++) {
                        station.push(data.busTopicMetroStationList[i].stationName);
                        personNum.push(
                            data.busTopicMetroStationList[i].personNum == null
                                ? 0
                                : data.busTopicMetroStationList[i].personNum
                        );
                        pointData.push({
                            name: data.busTopicMetroStationList[i].stationName,
                            value: [
                                data.busTopicMetroStationList[i].longitude,
                                data.busTopicMetroStationList[i].latitude,
                                data.busTopicMetroStationList[i].personNum= null ? 0: data.busTopicMetroStationList[i].personNum,
                                radius[i]
                            ]
                        });
                    }
                    top10BusMetroList.push(station);
                    top10BusMetroList.push(personNum);
                    this.busMetroOption = this.creatOption2(
                        top10BusMetroList,
                        "换乘地铁站点客流TOP10",
                        "单位(人次)",
                        0,0
                    );
                    this.echartoption = this.$utils.echart.getMigrationOption(
                        {
                            seriesData: {
                                pointData: pointData
                                // linesData: [res]
                            }
                        },
                        {
                            series: [
                                {
                                    label: {
                                        normal: {
                                            show: true,
                                            position: "right",
                                            formatter: ["{a|{b}}", "{b|换乘客流 {@[2]} 人次}"].join(
                                                "\n"
                                            ),
                                            rich: {
                                                a: {
                                                    color: "#00ffff",
                                                    fontSize: this.$utils.setSize(16)
                                                    // lineHeight: 10
                                                },
                                                b: {
                                                    // height: 40
                                                    padding: [5, 0],
                                                    color: "#00ffff"
                                                },
                                                x: {
                                                    fontSize: this.$utils.setSize(18),
                                                    borderColor: "#449933",
                                                    borderRadius: 4
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                            // tooltip: {
                            //   formatter: function(params, ticket, callback) {
                            //     //根据业务自己拓展要显示的内容
                            //     if (params.seriesType == "effectScatter") {
                            //       var res = "";
                            //       var name = params.data.name;
                            //       var value = params.data.value[2];
                            //       var value2 = params.data.value[3];
                            //       res =
                            //         "<span style='color:#fff;'>" +
                            //         name +
                            //         "</span><br/>客流量：" +
                            //         value +
                            //         "</span><br/>班次数量：" +
                            //         value2;
                            //       return res;
                            //     }
                            //   }
                            // }
                        },
                        "换乘客流"
                    );
                    if (this.activeNo == 6) {
                        tmap.removeChart("channelDetail");
                        tmap
                            .addChart("channelDetail", this.echartoption)
                            .$chart.on("click", param => {
                            this.showBusMetroTop10(param);
                        });
                    }
                }
            },
            activeHC() {
                //展示公交地铁换乘数据
                tmap.centerAt(104.072165, 30.663431);
                tmap.setMapZoomLevel(11);
                tmap.qTipTool.hidePopupWindow();
                this.activeNo = 6;
                tmap.setLayerVisible("", false);
                if (tmap.getLayer("BUS_METRO")) {
                    tmap.setLayerVisible("BUS_METRO", true);
                } else {
                    tmap.addLayer("BUS_METRO").loadData();
                    // tmap.addCircleOnLayer('BUS_METRO','channelDetail',103,30.5,500/11100,'channelDetail');
                }
                tmap.addChart("channelDetail", this.echartoption) .$chart.on("click", param => {
                    this.showBusMetroTop10(param);
                });
            },
            showBusMetroTop10(param) {
                //显示公交地铁换乘TOP10的详情
                if (
                    this.busTopicMetroStationList &&
                    this.busTopicMetroStationList.length > 0
                ) {
                    for (var i = 0; i < this.busTopicMetroStationList.length; i++) {
                        if (this.busTopicMetroStationList[i].stationName == param.name) {
                            this.busMetroDetail(this.busTopicMetroStationList[i]);
                            break;
                        }
                    }
                }

                // this.showBusMetro=true;
            },
            busMetroDetail(data) {
                this.showBusMetro = true;
                this.busMetroStationName =
                    data.stationName == null ? "" : data.stationName;
                this.busMetroPersonNum = data.personNum == null ? 0 : data.personNum;
                this.lineNum50m = data.lineNum50m == null ? 0 : data.lineNum50m;
                this.stationNum50m = data.stationNum50m == null ? 0 : data.stationNum50m;
                this.lineNum100m = data.lineNum100m == null ? 0 : data.lineNum100m;
                this.stationNum100m =
                    data.stationNum100m == null ? 0 : data.stationNum100m;
                this.lineNum150m = data.lineNum150m == null ? 0 : data.lineNum150m;
                this.stationNum150m =
                    data.stationNum150m == null ? 0 : data.stationNum150m;
            },
            closeBusMetroDetail() {
                //关闭公交地铁换乘详情框
                this.showBusMetro = false;
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
                    // autoplay:true,
                    initialSlide: 0,
                    slidesPerView: 4,
                    spaceBetween: 30,
                    observer:true,
                    observeParents:true,
                    // centeredSlides: true,
                    // loop: true,
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
        .top {
            position: absolute;
            top: 25px;
            width: 800px;
            height: 48px;
            left: 50%;
            right:156px;
            transform: translateX(-50%);
            /*margin: 0px auto;*/
            justify-content: center;
            /*background: url(img/bj.png) center no-repeat;*/
            background-size: 100%;
            margin-top: 3px;
            .zhu1 {
                margin-left: 38px;
                li {
                    line-height: 30px;
                }
                .mi {
                    float: left;
                    font-size: 14px;
                    color: #ffffff;
                    margin-right: 4px;
                    font-weight: normal;
                    margin-left: 10px;
                    margin-top: 10px;
                }
                .mi1 {
                    float: left;
                    font-size: 24px;
                    font-weight: bold;
                    color: #00ffff;
                    margin-top: 10px;
                }
                .mi2 {
                    float: left;
                    font-size: 14px;
                    font-weight: normal;
                    color: #00ffff;
                    margin-top: 10px;
                    margin-left: 2px;
                }
            }

        }
        .top2 {
            position: absolute;
            top: 70px;
            /*width: 823px;*/
            /*height: 48px;*/
            left: 50%;
            transform: translateX(-50%);
            height: 100px;
            width: 100%;
            .data_box {
                display: flex;
                width: 100%;
                justify-content: center;
                position: absolute;
                li {
                    display: block;
                    /* float: left; */
                    list-style: none;
                    margin-right: 20px;
                }

                .data_name {
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    display: block;
                }
                .layer_cont {
                    cursor: pointer;
                    position: relative;
                    border-radius: 4px;
                    margin-top: 5px;
                    background: url(img/top_data_bg.png) center no-repeat;
                    /*background-size: 100%;*/
                    height: 60px;
                    padding: 0px 20px;
                    animation: turn 14s ease-in-out;
                    -webkit-animation: turn 14s ease-in-out;
                    -moz-animation: turn 14s ease-in-out;
                }
                .data_left,
                .data_right {
                    position: absolute;
                    width: 20px;
                    height: 71px;
                }
                .data_left {
                    top: -6px;
                    left: -6px;
                    /*background: url(img/left_data.png) 0px center no-repeat;*/
                    background-size: 100%;
                }

                .data_right {
                    top: -6px;
                    right: -6px;
                    /*background: url(img/right_data.png) 0px center no-repeat;*/
                    background-size: 100%;
                }

                .data_bg span {
                    font-size: 36px;
                    font-family: "datafont";
                    line-height: 60px;
                    font-weight: bold;
                }
                .data_name span.cut_s {
                    font-size: 14px;
                    color: #144b8c;
                    margin: 0px 5px;
                }
                .data_bg span.cut {
                    font-size: 36px;
                    color: rgba(20, 75, 140,.2);
                    font-weight:normal;
                    margin: 0px 1px;
                    font-family: "Microsoft YaHei";
                }

                .data_bg span.unit {
                    font-size: 14px;
                    color: #72f6fa;
                    margin-left: 2px;
                }
                .blue_data {
                    color: #00ffff !important;
                }
                .yellow {
                    color: #ffff00;
                    font-size: 30px;
                }
            }
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
                .echartsClass{
                    width:100%;
                    height:756px;
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
            left: 350px;
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