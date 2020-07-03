<template>
    <div class="homepage-wrapper">
        <BaseLayoutContent>
            <template #leftPanel>
                <panel>
                    <PanelItem title :displaySwitch="false">
                        <div class="panel-wrapper left">
                            <div class="left-content">
                                <!--                        <div class="item item1" @click="activeXW" :class="{active:activeNo==1}"  >公交线网(<span>{{busLineInternet}}</span>)</div>-->
                                <!--                        <div class="item" @click="activeZD" :class="{active:activeNo==2}">公交站点(<span>{{busStation}}</span>)</div>-->
                                <!--                        <div class="item item3" @click="activeCL" :class="{active:activeNo==3}">在线车辆(<span>{{onLineBus}}</span>)</div>-->
                                <div class="left-main" @click="activeXW">
                                    <div class="line">
                                        <ul>
                                            <li>总线路(条)</li>
                                            <li><count-to :startVal="0" :endVal="busLineInternet" :duration="4000" /></li>
                                        </ul>

                                    </div>
                                    <div class="traffic">
                                        <ul>
                                            <li>总客流(万人)</li>
                                            <li>{{personNum}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="left-item" @click="activeQuick">
                                    <div class="title">
                                        <ul>
                                            <li>快线(条)</li>
                                            <li>客流(人)</li>
                                        </ul>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li>{{quickLine}}</li>
                                            <li><count-to :startVal="0" :endVal="quickLinePerson" :duration="4000" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="left-item" @click="activeMain">
                                    <div class="title">
                                        <ul>
                                            <li>干线(条)</li>
                                            <li>客流(人)</li>
                                        </ul>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li>{{mainLine}}</li>
                                            <li><count-to :startVal="0" :endVal="mainLinePerson" :duration="4000" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="left-item" @click="activeRegional">
                                    <div class="title">
                                        <ul>
                                            <li>支线(条)</li>
                                            <li>客流(人)</li>
                                        </ul>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li>{{regionalLine}}</li>
                                            <li><count-to :startVal="0" :endVal="regionalLinePerson" :duration="4000" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="left-item" @click="activeMicro">
                                    <div class="title">
                                        <ul>
                                            <li>微线(条)</li>
                                            <li>客流(人)</li>
                                        </ul>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li>{{microLine}}</li>
                                            <li><count-to :startVal="0" :endVal="microLinePerson" :duration="4000" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="left-item" @click="activeOther">
                                    <div class="title">
                                        <ul>
                                            <li>特色(条)</li>
                                            <li>客流(人)</li>
                                        </ul>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li>{{busLineOther}}</li>
                                            <li><count-to :startVal="0" :endVal="personNumOther" :duration="4000" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PanelItem>
                </panel>

            </template>
            <template #midContent>
                <div class="testmap">
                    <Basemap></Basemap>
                </div>
                <div>
                    <div class="bottom" >
                        <table>
                            <tr>
                                <th  v-for="item in mapLegend.list" :key="item.name">
                                    <span :style="{backgroundColor:item.color}"></span> <span>{{item.name}}</span>
                                </th>
                            </tr>
                        </table>
                    </div>
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

            </template>
            <template #rightPanel>
                <panel>
                    <PanelItem title :displaySwitch="false">
                        <div class="panel-wrapper right">
                            <div class="right-content">
                                <el-tabs>
                                    <el-tab-pane label="线路客流">
                                        <div class='echartsClass'  v-if="activeLineTOP==0">
                                            <v-chart :options="option2" :autoresize="true"></v-chart>
                                        </div>
                                        <div  class='echartsClass' v-if="activeLineTOP==1">
                                            <v-chart :options="quickLineOption" :autoresize="true"></v-chart>
                                        </div>
                                        <div class='echartsClass'  v-if="activeLineTOP==2">
                                            <v-chart :options="mainLineOption" :autoresize="true"></v-chart>
                                        </div>
                                        <div class='echartsClass'  v-if="activeLineTOP==3">
                                            <v-chart :options="regionalLineOption" :autoresize="true"></v-chart>
                                        </div>
                                        <div class='echartsClass'  v-if="activeLineTOP==4">
                                            <v-chart :options="microLineOption" :autoresize="true"></v-chart>
                                        </div>
                                        <div class='echartsClass'  v-if="activeLineTOP==5">
                                            <v-chart :options="otherLineOption" :autoresize="true"></v-chart>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="线路搜索">
                                        <div class="lineserch">
                                            <div class="serchContent">
                                                <div class="area-left">
                                                    <el-autocomplete
                                                            class="inline-input"
                                                            value-key="lineId"
                                                            v-model="lineIdSelected"
                                                            :fetch-suggestions="querySearch"
                                                            placeholder="请输入线路"
                                                            :trigger-on-focus="false"
                                                            @select="handleSelect"
                                                    ></el-autocomplete>
                                                </div>
                                                <div class="area-right">
                                                    <el-button type="primary" class="searchButton" @click="lineQuery()">查询</el-button>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="result">
                                                    <div class="title">
                                                        <ul>
                                                            <li>线路名称</li>
                                                            <li>线路里程</li>
                                                            <li>营运时间</li>
                                                        </ul>
                                                    </div>
                                                    <div class="content">
                                                        <li>XXXXXX</li>
                                                        <li>XXXXXX</li>
                                                        <li>XX:XX:XX-XX:XX:XX</li>
                                                    </div>
                                                </div>
                                                <div class="blue-line"></div>
                                            </div>
                                            <div class="details">
                                                <div class="title">
                                                    <div class="tongji">
                                                        <span>站点</span>
                                                        <span>共<lable>7</lable>站</span>
                                                    </div>
                                                    <div class="anniu">
                                                        <ChangeTag :itemList="itemList" @getStatues="getStatues" />
                                                    </div>
                                                </div>

                                                <div class="stations" >
                                                    <el-timeline :reverse="false">
                                                        <el-timeline-item  >站点 1</el-timeline-item>
                                                        <el-timeline-item  >站点 2</el-timeline-item>
                                                        <el-timeline-item  >站点 3</el-timeline-item>
                                                        <el-timeline-item  >站点 4</el-timeline-item>
                                                        <el-timeline-item  >站点 5</el-timeline-item>
                                                        <el-timeline-item  >站点 6</el-timeline-item>
                                                        <el-timeline-item  >站点 7</el-timeline-item>
                                                        <el-timeline-item  >站点 8</el-timeline-item>
                                                        <el-timeline-item  >站点 9</el-timeline-item>
                                                        <el-timeline-item  >站点 10</el-timeline-item>
                                                        <el-timeline-item  >站点 1</el-timeline-item>
                                                        <el-timeline-item  >站点 2</el-timeline-item>
                                                        <el-timeline-item  >站点 3</el-timeline-item>
                                                        <el-timeline-item  >站点 4</el-timeline-item>
                                                        <el-timeline-item  >站点 5</el-timeline-item>
                                                        <el-timeline-item  >站点 6</el-timeline-item>
                                                        <el-timeline-item  >站点 7</el-timeline-item>
                                                        <el-timeline-item  >站点 8</el-timeline-item>
                                                        <el-timeline-item  >站点 9</el-timeline-item>
                                                        <el-timeline-item  >站点 10</el-timeline-item>
                                                    </el-timeline>
                                                </div>
                                            </div>

                                        </div>


                                    </el-tab-pane>
                                </el-tabs>
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
            tmap.addLayer("BUS_LINE").loadData(); //加载路线图层
            window.getBaseInfoHtml = this.getBaseInfoHtml;
            window.showDetail = this.showDetail;
            window.showBusMetroInfo = this.showBusMetroInfo;
            this.autohand = setInterval(() => {
                this.getData();
            }, 5 * 60 * 1000);
        },
        methods: {
            getStatues(val){

            },
            lineQuery(){
                this.$http.$get("gjjc_busTopicInfo/getBusLineInternetInfoById",{lineId:this.lineIdSelected}).then(data => {
                    debugger;
                })
            },
            querySearch(queryString, cb) {
                let gjBusLineInternetList = this.gjBusLineInternetList;
                let results = queryString ? gjBusLineInternetList.filter(this.createFilter(queryString)) : gjBusLineInternetList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },createFilter(queryString) {
                return (enterpriseSearchData) => {
                    let temp = enterpriseSearchData.lineId;
                    if(temp!=null &&temp!=""){
                        return (enterpriseSearchData.lineId.indexOf(queryString) !== -1);
                    }

                    //return (enterpriseSearchData.enterpriseName.toLowerCase().indexOf(queryString.toLowerCase()) === 0));
                };
            },
            handleSelect(item) {
                this.lineIdSelected = item.lineId;
            },
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
                this.$http.$get("gjjc_busTopicInfo/getBusTopicInfo").then(param => {
                    //
                    this.dealWithBusTopicInfo(param);
                });
                this.$http.$get("gjjc_busTopicInfo/getBusLineInternetInfo") .then(param => {
                    //公交线网
                    this.dealWithBusLineInternetInfo(param);
                });

            },

            dealWithBusLineInternetInfo(data) {
                //处理公交贤网数据
                this.busLineInternet =
                    data.busLineInternet == null ? 0 : data.busLineInternet; //公交线网数量

                if (
                    data.gjBusLineInternetList !== null &&
                    data.gjBusLineInternetList.length > 0
                ) {
                    this.gjBusLineInternetList = data.gjBusLineInternetList;
                    var top10LineMaxPersonList = [],
                        line = [],
                        person = [];
                    for (var i = 0; i < 10; i++) {
                        line.push(data.gjBusLineInternetList[i].lineId);
                        person.push(
                            (data.gjBusLineInternetList[i].personNum / 10000).toFixed(2)
                        );
                    }
                    top10LineMaxPersonList.push(line);
                    top10LineMaxPersonList.push(person);
                    this.option = this.creatOption(
                        top10LineMaxPersonList,
                        "公交线路客流TOP10",
                        "万人",
                        0
                    );
                    this.option2=this.creatOption2(
                        top10LineMaxPersonList,
                        "公交线路客流TOP10",
                        "单位（万人）",
                        0
                    );
                    var quickLineMaxPersonList = [],
                        quickLine = [],
                        quickPerson = [];
                    var mainLineMaxPersonList = [],
                        mainLine = [],
                        mainPerson = [];
                    var regionalLineMaxPersonList = [],
                        regionalLine = [],
                        regionalPerson = [];
                    var microLineMaxPersonList = [],
                        microkLine = [],
                        microPerson = [];
                    var otherLineMaxPersonList=[], otherLine = [], otherPerson = [];
                    data.gjBusLineInternetList.forEach(e => {
                        if (e.lineType == "快线" && quickLine.length < 10) {
                            quickLine.push(e.lineId);
                            quickPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
                        } else if (e.lineType == "干线" && mainLine.length < 10) {
                            mainLine.push(e.lineId);
                            mainPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
                        } else if (e.lineType == "支线" && regionalLine.length < 10) {
                            regionalLine.push(e.lineId);
                            regionalPerson.push(
                                e.personNum == null ? 0 : parseInt(e.personNum)
                            );
                        } else if (e.lineType == "微循环" && microkLine.length < 10) {
                            microkLine.push(e.lineId);
                            microPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
                        }else if(e.lineType!="快线"&&e.lineType!="干线"&&e.lineType!="支线"&&e.lineType!="微循环"&&otherLine.length<10){
                            otherLine.push(e.lineId);
                            otherPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
                        }
                    });
                    quickLineMaxPersonList.push(quickLine);
                    quickLineMaxPersonList.push(quickPerson);
                    mainLineMaxPersonList.push(mainLine);
                    mainLineMaxPersonList.push(mainPerson);
                    regionalLineMaxPersonList.push(regionalLine);
                    regionalLineMaxPersonList.push(regionalPerson);
                    microLineMaxPersonList.push(microkLine);
                    microLineMaxPersonList.push(microPerson);
                    otherLineMaxPersonList.push(otherLine);
                    otherLineMaxPersonList.push(otherPerson);
                    this.quickLineOption = this.creatOption2(
                        quickLineMaxPersonList,
                        "快线客流TOP10",
                        "单位(人)",
                        0,0
                    );
                    this.mainLineOption = this.creatOption2(
                        mainLineMaxPersonList,
                        "干线客流TOP10",
                        "单位(人)",
                        0,0
                    );
                    this.regionalLineOption = this.creatOption2(
                        regionalLineMaxPersonList,
                        "支线客流TOP10",
                        "单位(人)",
                        0,0
                    );
                    this.microLineOption = this.creatOption2(
                        microLineMaxPersonList,
                        "微线客流TOP10",
                        "单位(人)",
                        0, 0
                    );
                    this.otherLineOption=this.creatOption2(
                        otherLineMaxPersonList,
                        "特色线路客流TOP10",
                        "单位(人)",
                        0,0
                    );
                }

                if (
                    data.busPersonNumByLineTypeList != null &&
                    data.busPersonNumByLineTypeList.length
                ) {
                    if (this.busLineOther != 0) {
                        this.busLineOther = 0;
                        this.personNumOther = 0;
                    }
                    data.busPersonNumByLineTypeList.forEach(e => {
                        if (e.lineTypeCode == 1) {
                            this.quickLine = e.lineNum == null ? 0 : e.lineNum; //快线
                            this.quickLinePerson = e.personNum == null ? 0 : e.personNum; //快线人数
                        } else if (e.lineTypeCode == 2) {
                            this.mainLine = e.lineNum == null ? 0 : e.lineNum; //干线
                            this.mainLinePerson = e.personNum == null ? 0 : e.personNum; //快线人数
                        } else if (e.lineTypeCode == 3) {
                            this.regionalLine = e.lineNum == null ? 0 : e.lineNum; //支线
                            this.regionalLinePerson = e.personNum == null ? 0 : e.personNum; //支线人数
                        } else if (e.lineTypeCode == 4) {
                            this.microLine = e.lineNum == null ? 0 : e.lineNum; //微线
                            this.microLinePerson = e.personNum == null ? 0 : e.personNum; //微线线人数
                        } else {
                            this.busLineOther += parseInt(
                                e.lineNum == null ? "0" : e.lineNum.toString()
                            ); //其它公交线路数
                            this.personNumOther += parseInt(
                                e.personNum == null ? "0" : e.personNum.toString()
                            ); //其它公交人数
                        }
                    });
                    this.personNum =((this.quickLinePerson+this.mainLinePerson+this.regionalLinePerson+this.microLinePerson+this.personNumOther)/ 10000).toFixed(2); //总客流量
                }
            },

            dealWithBusTopicInfo(data) {
                //
                this.busDriver = data.busDriver == null ? 0 : data.busDriver;
                this.assageWaydata = data.assageWaydata == null ? 0 : data.assageWaydata;

                this.busEnterprise = data.busEnterprise == null ? 0 : data.busEnterprise; //企业数
                this.busLine = data.busLine == null ? 0 : data.busLine; //公交线路数

                this.busPerson = data.busPerson == null ? 0 : data.busPerson; // 公交从业人员
                // this.personNum =data.personNum == null ? 0 : (data.personNum / 10000).toFixed(2); //总客流量
                this.busVehicle = data.busVehicle == null ? 0 : data.busVehicle; //车辆数
                this.busMetro = data.busMetro == null ? 0 : data.busMetro; //公交地铁换乘数量
                // this.busStation=data.busStation==null?0:data.busStation;//公交站点数量
            },
            activeQuick() {
                //展示快线图层
                // tmap.removeLayer();
                tmap.centerAt(104.072165, 30.663431);
                tmap.qTipTool.hidePopupWindow();
                this.activeLineTOP = 1;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("", false);
                if (tmap.getLayer("BUS_LINE_QUICK")) {
                    tmap.setLayerVisible("BUS_LINE_QUICK", true);
                } else {
                    tmap.addLayer("BUS_LINE_QUICK").loadData();
                }
            },
            activeMain() {
                //展示干线图层
                tmap.centerAt(104.072165, 30.663431);
                tmap.qTipTool.hidePopupWindow();
                // tmap.removeLayer();
                // tmap.removeLayer("BUS_ONLINE");
                this.activeLineTOP = 2;
                tmap.setLayerVisible("", false);
                if (tmap.getLayer("BUS_LINE_MAIN")) {
                    tmap.setLayerVisible("BUS_LINE_MAIN", true);
                } else {
                    tmap.addLayer("BUS_LINE_MAIN").loadData();
                }
            },
            activeRegional() {
                //展示支线数据
                tmap.centerAt(104.072165, 30.663431);
                tmap.qTipTool.hidePopupWindow();
                // tmap.removeLayer();
                this.activeLineTOP = 3;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("", false);
                if (tmap.getLayer("BUS_LINE_REGIONAL")) {
                    tmap.setLayerVisible("BUS_LINE_REGIONAL", true);
                } else {
                    tmap.addLayer("BUS_LINE_REGIONAL").loadData();
                }
            },
            activeMicro() {
                //展示微线数据
                tmap.centerAt(104.072165, 30.663431);
                tmap.qTipTool.hidePopupWindow();
                // tmap.removeLayer();
                // tmap.removeLayer("BUS_ONLINE");
                this.activeLineTOP = 4;
                tmap.setLayerVisible("", false);
                if (tmap.getLayer("BUS_LINE_MICRO")) {
                    tmap.setLayerVisible("BUS_LINE_MICRO", true);
                } else {
                    tmap.addLayer("BUS_LINE_MICRO").loadData();
                }
            },
            activeOther() {
                //展示其它种类数据
                tmap.centerAt(104.072165, 30.663431);
                tmap.qTipTool.hidePopupWindow();
                // tmap.removeLayer();
                // tmap.removeLayer("BUS_ONLINE");
                this.activeLineTOP = 5;
                tmap.setLayerVisible("", false);
                if (tmap.getLayer("BUS_LINE_OTHER")) {
                    tmap.setLayerVisible("BUS_LINE_OTHER", true);
                } else {
                    tmap.addLayer("BUS_LINE_OTHER").loadData();
                }
            },
            activeXW() {
                this.removeZLArea();
                //展示公交线网数据
                tmap.centerAt(104.072165, 30.663431);
                tmap.setMapZoomLevel(11);
                tmap.qTipTool.hidePopupWindow();
                this.activeNo = 1;
                this.activeLineTOP = 0;
                // tmap.removeLayer();
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("", false);
                if (tmap.getLayer("BUS_LINE")) {
                    tmap.setLayerVisible("BUS_LINE", true);
                } else {
                    tmap.addLayer("BUS_LINE").loadData();
                }
                this.deleteZLDataOverLay();
                tmap.removeChart("channelDetail");
                this.closeBusMetroDetail();
            },


            getSearchValueSelf(param) {
                //时间类型选择
            }
        },
        data() {
            return {
                lineIdSelected:'',
                itemList: [
                    { code: "up", value: "上行" },
                    { code: "down", value: "下行" }
                ],
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
                searchConfig: {
                    searchCondition: [
                        {
                            order: 36,
                            type: "input",
                            label: "",
                            placeholder: "请输入线路",
                            VModelvalue: {
                                name: "lineName",
                                defaultValue: ""
                            },

                        }
                    ],
                    searchButtonGroup: [
                        {
                            action: "query",
                            label: "查询"
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
    .stations>>>.el-timeline-item__content{
        color:#00ffff;
        font-size: 16px;
    }
    .stations>>>.el-timeline-item__tail{
        left:4px;
        top:6px;
        border-color:#00ffff;
    }
    .stations>>>.el-timeline-item__node--normal{
        left:0px;
        top:6px;
        width: 0.10rem;
        height: 0.10rem;
    }
    .stations>>>.el-timeline-item__node{
        background-color:#00ffff;
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
                .echartsClass{
                    width:100%;
                    height:756px;
                }
                .lineserch{
                    .serchContent{
                        display: flex;
                        flex-direction: row;
                        .area-right{
                            margin-left: 20px;
                        }
                    }
                    li{
                        height:30px;
                        line-height: 30px;
                    }
                    .result{
                        margin-top: 20px;
                        display: flex;
                        flex-direction: row;
                        .title{
                            flex: 1;
                            ul{
                                margin-left: 10px;
                            }
                        }
                        .content{
                            flex:1.5;

                        }

                    }
                    .blue-line{
                        background-color: rgba(10, 39, 118, 1) ;
                        height:2px;
                        width:90%;
                    }

                }
                .details{
                    margin-top: 10px;
                    .title{
                        display: flex;
                        flex-direction: row;
                        .tongji{
                            flex:1;
                            display: flex;
                            flex-direction: row;
                            span{
                                flex:1;
                                lable{
                                    color:#00ffff;
                                }
                            }
                        }
                        .anniu{
                            margin-left: 80px;
                            flex:1;
                        }
                    }
                    .stations{
                        height:500px;
                        overflow-y: auto;
                        padding: 20px;
                    }
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