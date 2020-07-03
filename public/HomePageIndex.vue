<template>
    <div class="homepage-wrapper">
        <Basemap></Basemap>
        <div class="top">
            <div class="er">
                <ul class="zhu1">
<!--                    <li>-->
<!--						<span >-->
<!--						 <h3 class="mi">企业数量</h3>-->
<!--						<h3 class="mi1">{{busEnterprise}}</h3>-->
<!--						<h3 class="mi2">家</h3>-->
<!--						</span>-->
<!--                    </li>-->
                    <li>
						<span>
						 <h3 class="mi">今日公交客流</h3>
						<h3 class="mi1">{{personNum}}</h3>
						<h3 class="mi2">万</h3>
						</span>
                    </li>
                    <li>
						<span >
						 <h3 class="mi">公交线路</h3>
						<h3 class="mi1">{{busLineInternet}}</h3>
						<h3 class="mi2">条</h3>
						</span>
                    </li>
                    <li>
						<span >
						 <h3 class="mi">公交车辆</h3>
						<h3 class="mi1">{{busVehicle}}</h3>
						<h3 class="mi2">辆</h3>
						</span>
                    </li>
<!--                    <li>-->
<!--						<span >-->
<!--						 <h3 class="mi">公交从业人员</h3>-->
<!--						<h3 class="mi1">{{busPerson}}</h3>-->
<!--						<h3 class="mi2">人</h3>-->
<!--						</span>-->
<!--                    </li>-->
                    <li>
						<span id="tong">
						 <h3 class="mi">公交驾驶员</h3>
						<h3 class="mi1">{{busDriver}}</h3>
						<h3 class="mi2">人</h3>
						</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="top2">
            <ul class="data_box" v-if="activeNo==1" >
<!--                <li>-->
<!--                    <span class="data_name">公交线路<span class="cut_s">|</span>客流</span>-->
<!--                    <div class="layer_cont">-->
<!--                        <div class="data_left"></div>-->
<!--                        <div class="data_right"></div>&lt;!&ndash;亮色边角&ndash;&gt;-->
<!--                        <div class="data data_bg">-->
<!--                            <span class="blue_data">{{busLineInternet}}</span>-->
<!--                            <span class="unit">条</span>-->
<!--                            <span class="cut">|</span>-->
<!--                            <span class="yellow">{{personNum}}</span>-->
<!--                            <span class="unit">万人次</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </li>-->
                <li  @click="activeQuick">
                    <span class="data_name">快线<span class="cut_s">|</span>客流</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{quickLine}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{quickLinePerson}}</span>
                            <span class="unit">人次</span>
                        </div>
                    </div>
                </li>
                <li @click="activeMain">
                    <span class="data_name">干线<span class="cut_s">|</span>客流</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{mainLine}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{mainLinePerson}}</span>
                            <span class="unit">人次</span>
                        </div>
                    </div>
                </li>
                <li @click="activeRegional">
                    <span class="data_name">支线<span class="cut_s">|</span>客流</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{regionalLine}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{regionalLinePerson}}</span>
                            <span class="unit">人次</span>
                        </div>
                    </div>
                </li>
                <li @click="activeMicro">
                    <span class="data_name">微线<span class="cut_s">|</span>客流</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{microLine}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{microLinePerson}}</span>
                            <span class="unit">人次</span>
                        </div>
                    </div>
                </li>
                <li @click="activeOther">
                    <span class="data_name">其它<span class="cut_s">|</span>客流</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{busLineOther}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{personNumOther}}</span>
                            <span class="unit">人次</span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="data_box" v-if="activeNo==2" >
                <li>
                    <span class="data_name">公交枢纽站</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{hubStationNum}}</span>
                            <span class="unit">个</span>

                        </div>
                    </div>
                </li>
                <li  >
                    <span class="data_name">公交站点</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{busStation}}</span>
                            <span class="unit">个</span>
                        </div>
                    </div>
                </li>
                <li @click="activeRate300m">
                    <span class="data_name">300米覆盖率</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{coverageRate300m}}</span>
                            <span class="unit">%</span>
                        </div>
                    </div>
                </li>
                <li @click="activeRate500m">
                    <span class="data_name">500米覆盖率</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{coverageRate500m}}</span>
                            <span class="unit">%</span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="data_box" v-if="activeNo==3" >
                <li>
                    <span class="data_name">在线车辆</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{onLineBus}}</span>
                            <span class="unit">辆</span>

                        </div>
                    </div>
                </li>
                <li  >
                    <span class="data_name">电动公交车</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{ddBus}}</span>
                            <span class="unit">辆</span>
                        </div>
                    </div>
                </li>
                <li>
                    <span class="data_name">CNG</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{cngBus}}</span>
                            <span class="unit">辆</span>
                        </div>
                    </div>
                </li>
                <li>
                    <span class="data_name">混合动力</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{hhBus}}</span>
                            <span class="unit">辆</span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="data_box" v-if="activeNo==5" >
<!--                <li>-->
<!--                    <span class="data_name">公交专用道条数<span class="cut_s">|</span>长度</span>-->
<!--                    <div class="layer_cont">-->
<!--                        <div class="data_left"></div>-->
<!--                        <div class="data_right"></div>&lt;!&ndash;亮色边角&ndash;&gt;-->
<!--                        <div class="data data_bg">-->
<!--                            <span class="blue_data">{{busLane}}</span>-->
<!--                            <span class="unit">条</span>-->
<!--                            <span class="cut">|</span>-->
<!--                            <span class="yellow">{{busLaneLength}}</span>-->
<!--                            <span class="unit">公里</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </li>-->
                <li @click="activeLaneDay">
                    <span class="data_name">白天时段<span class="cut_s">|</span>长度</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{busLaneDay}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{busLaneDayLen.toFixed(3)}}</span>
                            <span class="unit">公里</span>
                        </div>
                    </div>
                </li>
                <li @click="activeLaneTide">
                    <span class="data_name">潮汐<span class="cut_s">|</span>长度</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{busLaneTide}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{busLaneTideLen.toFixed(3)}}</span>
                            <span class="unit">公里</span>
                        </div>
                    </div>
                </li>
                <li @click="activeLaneOneway" >
                    <span class="data_name">单向全天候<span class="cut_s">|</span>长度</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{busLaneOneway}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{busLaneOnewayLen.toFixed(3)}}</span>
                            <span class="unit">公里</span>
                        </div>
                    </div>
                </li>
                <li @click="activeLanePeak" >
                    <span class="data_name">高峰<span class="cut_s">|</span>长度</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{busLanePeak}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{busLanePeakLen.toFixed(3)}}</span>
                            <span class="unit">公里</span>
                        </div>
                    </div>
                </li>
                <li @click="activeLaneQuick">
                    <span class="data_name">快速路<span class="cut_s">|</span>长度</span>
                    <div class="layer_cont">
                        <div class="data_left"></div>
                        <div class="data_right"></div><!--亮色边角-->
                        <div class="data data_bg">
                            <span class="blue_data">{{busLaneQuick}}</span>
                            <span class="unit">条</span>
                            <span class="cut">|</span>
                            <span class="yellow">{{busLaneQuickLen.toFixed(3)}}</span>
                            <span class="unit">公里</span>
                        </div>
                    </div>
                </li>

            </ul>
        </div>
        <div class="panel-wrapper left">
            <div class="left-content">
                <div class="item item1" @click="activeXW" :class="{active:activeNo==1}">公交线网({{busLineInternet}})</div>
                <div class="item" @click="activeZD":class="{active:activeNo==2}">公交站点({{busStation}})</div>
                <div class="item item3"@click="activeCL" :class="{active:activeNo==3}">在线车辆({{onLineBus}})</div>
            </div>
        </div>
        <div class="panel-wrapper right">
            <div class="right-content">
                <div class="item item1"@click="activeZL" :class="{active:activeNo==4}">公交走廊({{channel}})</div>
                <div class="item "@click="activeZYD" :class="{active:activeNo==5}">公交专用道({{busLane}})</div>
                <div class="item item3"@click="activeHC" :class="{active:activeNo==6}">地铁公交换乘({{busMetro}})</div>
            </div>
        </div>
        <div>
            <div class="bottom" v-if="activeNo==1&&activeLineTOP!=5">
                <div style="width:100%;height:100%" v-if="activeLineTOP==0">
                    <v-chart :options="option" :autoresize="true"></v-chart>
                </div>
                <div style="width:100%;height:100%"  v-if="activeLineTOP==1">
                    <v-chart :options="quickLineOption" :autoresize="true"></v-chart>
                </div>
                <div style="width:100%;height:100%"  v-if="activeLineTOP==2">
                    <v-chart :options="mainLineOption" :autoresize="true"></v-chart>
                </div>
                <div style="width:100%;height:100%"  v-if="activeLineTOP==3">
                    <v-chart :options="regionalLineOption" :autoresize="true"></v-chart>
                </div>
                <div style="width:100%;height:100%" v-if="activeLineTOP==4">
                    <v-chart :options="microLineOption" :autoresize="true"></v-chart>
                </div>

            </div>
            <div class="bottom" v-if="activeNo==2&&activeStationNo==1">
                <div style="width:100%;height:100%" v-if="activeStationNo==1">
                    <v-chart :options="topStationOption" :autoresize="true"></v-chart>
                </div>

            </div>
            <div class="bottom" v-if="activeNo==5">
                <div style="width:100%;height:100%">
                    <v-chart :options="laneSpeedOption" :autoresize="true"></v-chart>
                </div>
            </div>
            <div class="bottom" v-if="activeNo==6">
                <div style="width:100%;height:100%">
                    <v-chart :options="busMetroOption" :autoresize="true"></v-chart>
                </div>
            </div>
        </div>
        <div class="mapLegend" v-if="activeNo==1">
            <MapLegend :mapLegend="mapLegend" />
        </div>
        <div class="mapLegend" v-if="activeNo==3">
            <MapLegend :mapLegend="mapLegendOnline" />
        </div>
        <div class="mapLegend" v-if="activeNo==5">
            <MapLegend :mapLegend="mapLegendLane" />
        </div>


    </div>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "",
        mounted() {
            this.getData();
            tmap.addLayer('BUS_LINE').loadData();//加载路线图层
            window.getBaseInfoHtml=this.getBaseInfoHtml;
            window.test=this.test;

        },
        methods:{
            test(data){
                document.getElementById("xq_"+data).style.display="block";
            },
            getBaseInfoHtml(type, data,feaCoordinate,titleText,width,height){
                var content = "";
                if(type.indexOf("BUS_LINE") !== -1){
                    // sessionStorage.setItem("stationId",data.station_id);
                    var busLineData={};
                    for(var i=0;i<this.gjBusLineInternetList.length;i++){
                        if(this.gjBusLineInternetList[i].lineId==data.name){
                            busLineData=this.gjBusLineInternetList[i];
                            break;
                        }
                    }
                    var title = [
                        {display: '线路名称', name: 'lineName',colspan:3},
                        {display: '起点站', name: 'lineStartName',colspan:3},
                        {display: '终点站', name: 'lineEndName',colspan:3},
                        {display: '线路长度', name: 'lineLen',colspan:3},
                        {display: '线路类型', name: 'lineType',colspan:3},
                        {display: '乘客数', name: 'personNum',colspan:3}
                    ];
                    content = [{name: "详细信息", content: window.creatInfoHtml(title, busLineData, 2)}];
                }
                else if (type.indexOf("BUS_STATION") !== -1){//公交站点
                    var busStationData={};
                    for(var i=0;i<this.busTopicStationList.length;i++){
                        if(this.busTopicStationList[i].stationId==data.station_id){
                            busStationData=this.busTopicStationList[i];
                            break;
                        }
                    }
                    var title = [
                        {display: '站点名称', name: 'stationName',colspan:3},
                        {display: '乘客数', name: 'personNum',colspan:3},

                    ];
                    content = [{name: "详细信息", content: window.creatInfoHtml(title, busStationData, 2)}];

                }
                else if(type.indexOf("BUS_ONLINE") !== -1){//在线车辆
                    var busOnlineData={};
                    for(var i=0;i<this.busTopicOnLineBusList.length;i++){
                        if(this.busTopicOnLineBusList[i].vehicleId==data.name){
                            busOnlineData=this.busTopicOnLineBusList[i];
                            break;
                        }
                    }
                    var title = [
                        {display: '车牌号', name: 'vehiclePlateNum',colspan:3},
                        {display: '速度(km/h)', name: 'speed',colspan:3},
                        {display: '纬度', name: 'latitude',colspan:3},
                        {display: '经度', name: 'longitude',colspan:3},
                    ];
                    content = [{name: "详细信息", content: window.creatInfoHtml(title, busOnlineData, 2)}];
                }else if(type.indexOf("BUS_SPECIAL") !== -1){//专用道
                    var busLaneData={};
                    for(var i=0;i<this.busTopicBusLaneList.length;i++){
                        if(this.busTopicBusLaneList[i].busLaneId==data.id){
                            busLaneData=this.busTopicBusLaneList[i];
                            break;
                        }
                    }
                    var title = [
                        {display: '专用道名称', name: 'busLaneName',colspan:3},
                        {display: '起点名称', name: 'startName',colspan:3},
                        {display: '终点名称', name: 'endName',colspan:3},
                        {display: '专用道类型', name: 'busType',colspan:3},
                        {display: '长度(km)', name: 'length',colspan:3},
                        {display: '速度(km/h)', name: 'speed',colspan:3},
                    ];
                    content = [{name: "详细信息", content: window.creatInfoHtml(title, busLaneData, 2)}];
                }
                else{
                    content=null;
                    console.warn("图层："+type+"没有配置弹窗展示内容！");
                }
                return content;
            },
            getData(){
                this.$http.$get("gjjc_busTopicInfo/getBusTopicInfo").then((param) => {//
                    this.dealWithBusTopicInfo(param);
                });
                this.$http.$get("gjjc_busTopicInfo/getBusLineInternetInfo").then((param) => {//公交线网
                    this.dealWithBusLineInternetInfo(param);
                });
                this.$http.$get("gjjc_busTopicInfo/getBusStationInfo").then((param) => {//公交站点
                     this.dealWithBusStationInfo(param);
                });
                this.$http.$get("gjjc_busTopicInfo/getBusOnLineVehicleInfo").then((param) => {//在线车辆
                    this.dealWithBusOnLineVehicleInfo(param);
                });
                this.$http.$get("gjjc_busTopicInfo/getBusChannelInfo").then((param) => {//公交走廊
                    this.dealWithBusChannelInfo(param);
                });
                this.$http.$get("gjjc_busTopicInfo/getBusLaneInfo").then((param) => {//公交专用道
                    // this.dealWithBusStationInfo(param);
                    this.dealWithBusLaneInfo(param);
                });
                this.$http.$get("gjjc_busTopicInfo/getBusMetroInfo").then((param) => {//公交地铁换乘
                     this.dealWithBusMetroInfo(param);
                });

                this.$http.$get("lkfx_busStationCoverRateHandler/getBusStations?isCd6Zone=true").then((param) => {//公交地铁换乘
                    // this.dealWithBusStationInfo(param);
                    this.stationRate=param;
                });
                this.$http.$get("lkfx_busStationCoverRateHandler/getBusStationCoverRate300").then((param) => {//300米覆盖率
                    this.coverageRate300m=param==null?0:param;//300m覆盖率
                });
                this.$http.$get("lkfx_busStationCoverRateHandler/getBusStationCoverRate500").then((param) => {//500米覆盖率
                    this.coverageRate500m=param==null?0:param;//500m覆盖率
                });

            },
            dealWithBusMetroInfo(data){
               this.busMetro=data.busMetro==null?0:data.busMetro;
               if(data.busTopicMetroStationList&&data.busTopicMetroStationList.length>0){
                   this.busTopicMetroStationList=data.busTopicMetroStationList;
                   var top10BusMetroList=[],station=[],personNum=[];
                   var pointData=[];
                   for(var i=0;i<10;i++){
                       station.push(data.busTopicMetroStationList[i].stationName);
                       personNum.push(data.busTopicMetroStationList[i].personNum==null?0:data.busTopicMetroStationList[i].personNum);
                       pointData.push({
                           name: data.busTopicMetroStationList[i].stationName,
                           value: [data.busTopicMetroStationList[i].longitude, data.busTopicMetroStationList[i].latitude, 200, 30]
                       });
                   }
                   top10BusMetroList.push(station);
                   top10BusMetroList.push(personNum);
                   this.busMetroOption=this.creatOption(top10BusMetroList,'地铁站点换乘公交客流TOP10','人次',30);
                   this.echartoption = this.$utils.echart.getMigrationOption(
                       {
                           seriesData: {
                               pointData: pointData
                               // linesData: [res]
                           }
                       },
                       {
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
                       }
                   );
               }
            },
            dealWithBusChannelInfo(data){
                if(data.busTopicChannelList&&data.busTopicChannelList.length>0){
                    this.busTopicChannelList=data.busTopicChannelList;
                }

                this.channel=data.channel==null?0:data.channel;//
            },
            dealWithBusOnLineVehicleInfo(data){
                this.onLineBus=data.onLineBus==null?0:data.onLineBus;//公交在线车辆数量
                if(data.busTopicOnLineBusStatisticList&&data.busTopicOnLineBusStatisticList.length>0){
                    data.busTopicOnLineBusStatisticList.forEach(e=>{
                        var level=e.vehicleType,num=e.vehicleNum==null?0:parseInt(e.vehicleNum);
                        if(level==2||level==4){
                            this.ddBus+=num;
                        }else if(level==1||level==7){
                            this.cngBus+=num;
                        }else if(level==3||level==5||level==6){
                            this.hhBus+=num;
                        }
                    })

                }
                if(data.busTopicOnLineBusList&&data.busTopicOnLineBusList.length>0){
                    this.busTopicOnLineBusList=data.busTopicOnLineBusList;
                }

                /*busTopicOnLineBusStatisticList:
                0: {vehicleType: "1", vehicleNum: "3037"}
                1: {vehicleType: "2", vehicleNum: "2609"}
                2: {vehicleType: "3", vehicleNum: "439"}
                3: {vehicleType: "4", vehicleNum: "61"}
                4: {vehicleType: "5", vehicleNum: "30"}
                5: {vehicleType: "6", vehicleNum: "16"}
                6: {vehicleType: "7", vehicleNum: "9"}
                7: {vehicleType: "8", vehicleNum: "46"}*/
            },
            dealWithBusLaneInfo(data){
                this.busLane=data.busLane==null?0:data.busLane;//公交专用道数量
                this.busLaneLength=data.busTopicBusLaneStatisticModel.busLaneLength==null?0:data.busTopicBusLaneStatisticModel.busLaneLength;
                if(data.busTopicBusLaneList!==null&&data.busTopicBusLaneList.length>0){
                    this.busTopicBusLaneList=data.busTopicBusLaneList;
                    var top10LaneMaxSpeedList=[],line=[],speed=[];
                    for(var i=0;i<10;i++){
                        line.push(data.busTopicBusLaneList[i].busLaneName);
                        speed.push(data.busTopicBusLaneList[i].speed);
                    }
                    top10LaneMaxSpeedList.push(line);
                    top10LaneMaxSpeedList.push(speed);
                    this.laneSpeedOption=this.creatOption(top10LaneMaxSpeedList,'专用道公交车运行速度TOP10','km/h',30);
                    data.busTopicBusLaneList.forEach(e=>{
                        var len=parseFloat(parseFloat(e.length).toFixed(3));
                        if(e.busTypeCode==1){
                            this.busLaneDay+=1;
                            this.busLaneDayLen+=len;

                        }else if(e.busTypeCode==2){
                            this.busLaneTide+=1;
                            this.busLaneTideLen+=len;

                        }else if(e.busTypeCode==3){
                            this.busLaneOneway+=1;
                            this.busLaneOnewayLen+=len;

                        }else if(e.busTypeCode==4){
                            this.busLanePeak+=1;
                            this.busLanePeakLen+=len;

                        }else if(e.busTypeCode==5){
                            this.busLaneQuick+=1;
                            this.busLaneQuickLen+=len;
                        }
                    })

                }
            },
            dealWithBusLineInternetInfo(data){
                this.busLineInternet=data.busLineInternet==null?0:data.busLineInternet;//公交线网数量

                if(data.gjBusLineInternetList!==null&&data.gjBusLineInternetList.length>0){
                    this.gjBusLineInternetList=data.gjBusLineInternetList;
                        var top10LineMaxPersonList=[],line=[],person=[];
                        for(var i=0;i<10;i++){
                            line.push(data.gjBusLineInternetList[i].lineId);
                            person.push((data.gjBusLineInternetList[i].personNum/10000).toFixed(2));
                        }
                        top10LineMaxPersonList.push(line);
                        top10LineMaxPersonList.push(person);
                        this.option=this.creatOption(top10LineMaxPersonList,'公交线路客流TOP10','万人',0);
                    var quickLineMaxPersonList=[],quickLine=[],quickPerson=[];
                    var mainLineMaxPersonList=[],mainLine=[],mainPerson=[];
                    var regionalLineMaxPersonList=[],regionalLine=[],regionalPerson=[];
                    var microLineMaxPersonList=[],microkLine=[],microPerson=[];
                    data.gjBusLineInternetList.forEach(e=>{
                        if(e.lineType=="快线"&&quickLine.length<10){
                            quickLine.push(e.lineId);
                            quickPerson.push(e.personNum==null?0:parseInt(e.personNum));
                        }else if(e.lineType=="干线"&&mainLine.length<10){
                            mainLine.push(e.lineId);
                            mainPerson.push(e.personNum==null?0:parseInt(e.personNum));
                        }else if(e.lineType=="支线"&&regionalLine.length<10){
                            regionalLine.push(e.lineId);
                            regionalPerson.push(e.personNum==null?0:parseInt(e.personNum));
                        }else if(e.lineType=="微循环"&&microkLine.length<10){
                            microkLine.push(e.lineId);
                            microPerson.push(e.personNum==null?0:parseInt(e.personNum));
                        }
                    })
                    quickLineMaxPersonList.push(quickLine); quickLineMaxPersonList.push(quickPerson);
                    mainLineMaxPersonList.push(mainLine); mainLineMaxPersonList.push(mainPerson);
                    regionalLineMaxPersonList.push(regionalLine); regionalLineMaxPersonList.push(regionalPerson);
                    microLineMaxPersonList.push(microkLine); microLineMaxPersonList.push(microPerson);
                    this.quickLineOption=this.creatOption(quickLineMaxPersonList,'快线客流TOP10','人',0);
                    this.mainLineOption=this.creatOption(mainLineMaxPersonList,'干线客流TOP10','人',0);
                    this.regionalLineOption=this.creatOption(regionalLineMaxPersonList,'支线客流TOP10','人',0);
                    this.microLineOption=this.creatOption(microLineMaxPersonList,'微线客流TOP10','人',0);

                    }
                if(data.busPersonNumByLineTypeList!=null&&data.busPersonNumByLineTypeList.length){
                    data.busPersonNumByLineTypeList.forEach(e=>{
                            if(e.lineTypeCode==1){
                                this.quickLine=e.lineNum==null?0:e.lineNum;//快线
                                this.quickLinePerson=e.personNum==null?0:e.personNum;//快线人数
                            }else if(e.lineTypeCode==2){
                                this.mainLine=e.lineNum==null?0:e.lineNum;//干线
                                this.mainLinePerson=e.personNum==null?0:e.personNum;//快线人数

                            }else if(e.lineTypeCode==3){
                                this.regionalLine=e.lineNum==null?0:e.lineNum;//支线
                                this.regionalLinePerson=e.personNum==null?0:e.personNum;//支线人数

                            }else if(e.lineTypeCode==4){
                                this.microLine=e.lineNum==null?0:e.lineNum;//微线
                                this.microLinePerson=e.personNum==null?0:e.personNum;//微线线人数
                            }else{
                                this.busLineOther+=parseInt(e.lineNum==null?'0':e.lineNum.toString());//其它公交线路数
                                this.personNumOther+=parseInt(e.personNum==null?'0':e.personNum.toString());//其它公交人数
                            }

                    })
                }
            },
            dealWithBusStationInfo(data){
                this.busStation=data.busStation==null?0:data.busStation;//公交站点数量
                // this.coverageRate300m=data.busTopicStationStatisticModel.coverageRate300m==null?0:data.busTopicStationStatisticModel.coverageRate300m;//300m覆盖率
                this.hubStationNum=data.busTopicStationStatisticModel.hubStationNum==null?0:data.busTopicStationStatisticModel.hubStationNum;//公交枢纽站数量
                // this.coverageRate500m=data.busTopicStationStatisticModel.coverageRate500m==null?0:data.busTopicStationStatisticModel.coverageRate500m;//500m覆盖率
                if(data.busTopicStationList!==null&&data.busTopicStationList.length>0){
                    this.busTopicStationList=data.busTopicStationList;
                    var top10StationMaxPersonList=[],station=[],person=[];
                    for(var i=0;i<10;i++){
                        station.push(data.busTopicStationList[i].stationName);
                        person.push(data.busTopicStationList[i].personNum);
                    }

                    top10StationMaxPersonList.push(station);
                    top10StationMaxPersonList.push(person);
                    this.topStationOption=this.creatOption(top10StationMaxPersonList,'公交站点客流TOP10','人',30);

                }
            },
            dealWithBusTopicInfo(data){//
              this.busDriver=data.busDriver==null?0:data.busDriver;
              this.assageWaydata=data.assageWaydata==null?0:data.assageWaydata;

              this.busEnterprise=data.busEnterprise==null?0:data.busEnterprise;//企业数
              this.busLine=data.busLine==null?0:data.busLine;//公交线路数

              this.busPerson=data.busPerson==null?0:data.busPerson;// 公交从业人员
              this.personNum=data.personNum==null?0:(data.personNum/10000).toFixed(2);//总客流量
              this.busVehicle=data.busVehicle==null?0:data.busVehicle;//车辆数
              this.busMetro=data.busMetro==null?0:data.busMetro;//公交地铁换乘数量
              // this.busStation=data.busStation==null?0:data.busStation;//公交站点数量


            },
            activeQuick(){
                // tmap.removeLayer();
                tmap.centerAt(104.072165, 30.663431);
                this.activeLineTOP=1;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_LINE_QUICK')){
                    tmap.setLayerVisible("BUS_LINE_QUICK",true);
                }else{
                    tmap.addLayer('BUS_LINE_QUICK').loadData();
                }
            },
            activeMain(){
                tmap.centerAt(104.072165, 30.663431);
                // tmap.removeLayer();
                // tmap.removeLayer("BUS_ONLINE");
                this.activeLineTOP=2;
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_LINE_MAIN')){
                    tmap.setLayerVisible("BUS_LINE_MAIN",true);
                }else{
                    tmap.addLayer('BUS_LINE_MAIN').loadData();
                }
            },
            activeRegional(){
                tmap.centerAt(104.072165, 30.663431);
                // tmap.removeLayer();
                this.activeLineTOP=3;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_LINE_REGIONAL')){
                    tmap.setLayerVisible("BUS_LINE_REGIONAL",true);
                }else{
                    tmap.addLayer('BUS_LINE_REGIONAL').loadData();
                }
            },
            activeMicro(){
                tmap.centerAt(104.072165, 30.663431);
                // tmap.removeLayer();
                // tmap.removeLayer("BUS_ONLINE");
                this.activeLineTOP=4;
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_LINE_MICRO')){
                    tmap.setLayerVisible("BUS_LINE_MICRO",true);
                }else{
                    tmap.addLayer('BUS_LINE_MICRO').loadData();
                }
            },
            activeOther(){
                tmap.centerAt(104.072165, 30.663431);
                // tmap.removeLayer();
                // tmap.removeLayer("BUS_ONLINE");
                this.activeLineTOP=5;
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_LINE_OTHER')){
                    tmap.setLayerVisible("BUS_LINE_OTHER",true);
                }else{
                    tmap.addLayer('BUS_LINE_OTHER').loadData();
                }
            },

            activeXW(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeNo=1;
                this.activeLineTOP=0;
                // tmap.removeLayer();
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_LINE')){
                    tmap.setLayerVisible("BUS_LINE",true);
                }else{
                    tmap.addLayer('BUS_LINE').loadData();
                }
                this.deleteZLDataOverLay();
                tmap.removeChart('test');

            },
            activeZD(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeNo=2;
                this.activeStationNo=1;
                // tmap.setLayerVisible("",false);
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_STATION')){
                    tmap.setLayerVisible("BUS_STATION",true);
                    tmap.setLayerVisible("BUS_HUB_STATION",true);

                }else{
                    tmap.addLayer('BUS_STATION').loadData();
                    tmap.addLayer('BUS_HUB_STATION').loadData();
                }
                this.deleteZLDataOverLay();
                tmap.removeChart('test');
            },
            activeRate300m(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeStationNo=2;
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_CoverRate300')){
                    tmap.setLayerVisible("BUS_CoverRate300",true);
                }else{
                    tmap.addLayer('BUS_CoverRate300');
                    if(this.stationRate.length>0){
                        this.stationRate.forEach(e=>{
                            tmap.addPolygonOnLayer('BUS_CoverRate300',e.stationId,e.circle300m,'rgb(0,176,80)',"{color:'rgb(0,176,80)',width:0}")
                        })
                    }
                }

            },
            activeRate500m(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeStationNo=3;
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_CoverRate500')){
                    tmap.setLayerVisible("BUS_CoverRate500",true);
                }else{
                    tmap.addLayer('BUS_CoverRate500');
                    if(this.stationRate.length>0){
                        this.stationRate.forEach(e=>{
                            tmap.addPolygonOnLayer('BUS_CoverRate500',e.stationId,e.circle500m,'#FFFF00',"{color:'#FFFF00',width:0}")
                        })
                    }
                }

            },
            activeCL(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeNo=3;
                tmap.setLayerVisible("",false);
                tmap.setMapZoomLevel(13);
                tmap.addLayer('BUS_ONLINE').loadData();
                this.deleteZLDataOverLay();
                tmap.removeChart('test');

            },
            activeZL(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeNo=4;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                tmap.setMapZoomLevel(13);
                if(tmap.getLayer('BUS_CORRIDOR')){
                    tmap.setLayerVisible("BUS_CORRIDOR",true);
                }else{
                    tmap.addLayer('BUS_CORRIDOR').loadData();
                };
                if(this.busTopicChannelList.length>0){
                    this.busTopicChannelList.forEach(e=>{
                        this.addZLDataOverLay(e);
                    })
                }
                tmap.removeChart('test');
            },
            addZLDataOverLay(data){

                var geoms=data.geom.split(';');
                if(data.personNum==null){
                    data.personNum=0;
                }
                if(geoms.length>0){
                    var num=geoms.length%2==0?geoms.length/2:(geoms.length+1)/2;
                    var  lineNum=data.line==null?0:data.line.split(',').length;
                    var center=geoms[num].split(',');
                    var html='<div style="width: 300px;  background-color: rgba(35, 94, 243, 0.4); border-radius: 2px;transition: all 1.6s;">' +
                        ' <div style=" height: 100%; width: 100%; padding: 20px;">' +
                        '      <table class="zlxq" >' +
                        '        <tr style=" line-height: 36px;width:270px">\n' +
                        '          <th style=" width:30%;text-align: left; color: rgba(255, 255, 255, 0.9);">通道名称</th>\n' +
                        '          <td style=" width:70%;text-align: left;">'+data.channelName+'</td>\n' +
                        '        </tr>\n' +
                        '        <tr style=" line-height: 36px;width:270px">\n' +
                        '          <th style="width:30%; text-align: left; color: rgba(255, 255, 255, 0.9);">全长</th>\n' +
                        '          <td style="width:70%;text-align: left;">'+data.length+' 公里</td>\n' +
                        '        </tr>\n' +
                        '        <tr style=" line-height: 36px;width:270px">\n' +
                        '          <th style=" width:30%;text-align: left; color: rgba(255, 255, 255, 0.9);">客流量</th>\n' +
                        '          <td style=" width:70%;text-align: left;">'+data.personNum+' 人次</td>\n' +
                        '        </tr>\n' +
                        '        <tr style=" line-height: 36px;width:270px">\n' +
                        '          <th style=" width:30%;text-align: left; color: rgba(255, 255, 255, 0.9);">途经线路</th>\n' +
                        '          <td style=" width:70%; text-align: left; word-wrap: break-word;word-break: break-all;" onclick="test('+data.channelId+')">'+lineNum+'条</td>\n' +
                        '        </tr>\n' +

                        '        <tr id="xq_'+data.channelId+'" style="display:none; line-height: 36px;width:270px">\n' +
                        '          <th style=" width:30%; text-align: left; color: rgba(255, 255, 255, 0.9);">详情</th>\n' +
                        '          <td style="width:70%; text-align: left; word-wrap: break-word;word-break: break-all;" >'+data.line+'</td>\n' +
                        '        </tr>\n' +
                        '      </table>\n' +
                        '    </div></div>';
                    tmap.addOverlay('channel',data.channelId,html,center[0],center[1]);
                }
            },

            deleteZLDataOverLay(){
                if(this.busTopicChannelList.length>0){
                    this.busTopicChannelList.forEach(e=>{
                        tmap.deleteOverlay(e.channelId,'channel');
                    })
                }
            },
            activeZYD(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeNo=5;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_SPECIAL')){
                    tmap.setLayerVisible("BUS_SPECIAL",true);
                }else{
                    tmap.addLayer('BUS_SPECIAL').loadData();
                }
                this.deleteZLDataOverLay();
                tmap.removeChart('test');
            },
            activeLaneDay(){//白天时段
                tmap.centerAt(104.072165, 30.663431);
                // tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_SPECIAL_DAY')){
                    tmap.setLayerVisible("BUS_SPECIAL_DAY",true);
                }else{
                    tmap.addLayer('BUS_SPECIAL_DAY').loadData();
                }
                // this.deleteZLDataOverLay();
            },
            activeLaneTide(){
                tmap.centerAt(104.072165, 30.663431);
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_SPECIAL_TIDE')){
                    tmap.setLayerVisible("BUS_SPECIAL_TIDE",true);
                }else{
                    tmap.addLayer('BUS_SPECIAL_TIDE').loadData();
                }
            },
            activeLaneOneway(){
                tmap.centerAt(104.072165, 30.663431);
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_SPECIAL_ONEWAY')){
                    tmap.setLayerVisible("BUS_SPECIAL_ONEWAY",true);
                }else{
                    tmap.addLayer('BUS_SPECIAL_ONEWAY').loadData();
                }
            },
            activeLanePeak(){
                tmap.centerAt(104.072165, 30.663431);
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_SPECIAL_PEAK')){
                    tmap.setLayerVisible("BUS_SPECIAL_PEAK",true);
                }else{
                    tmap.addLayer('BUS_SPECIAL_PEAK').loadData();
                }
            },
            activeLaneQuick(){
                tmap.centerAt(104.072165, 30.663431);
                tmap.setLayerVisible("",false);
                if(tmap.getLayer('BUS_SPECIAL_QUICK')){
                    tmap.setLayerVisible("BUS_SPECIAL_QUICK",true);
                }else{
                    tmap.addLayer('BUS_SPECIAL_QUICK').loadData();
                }
            },
            activeHC(){
                tmap.centerAt(104.072165, 30.663431);
                this.activeNo=6;
                tmap.removeLayer("BUS_ONLINE");
                tmap.setLayerVisible("",false);
                // if(tmap.getLayer('BUS_METRO')){
                //     tmap.setLayerVisible("BUS_METRO",true);
                // }else{
                //     tmap.addLayer('BUS_METRO');
                //     tmap.addCircleOnLayer('BUS_METRO','test',103,30.5,500/11100,'test');
                //
                // }
                tmap.addChart('test',this.echartoption);
                this.deleteZLDataOverLay();
            },
            creatOption:function(data,title,unitName,rotate){
                const option =
                    {
                        title: {
                           text: title,
                           subtext: '',
                           x: 'center',
                           textStyle: {fontSize: 16, color: '#fff'}
                        },
                        // backgroundColor: '#23243a',
                        tooltip: { //提示框组件
                            trigger: 'axis',
                            formatter: '{b}: {c}',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            },
                            textStyle: {
                                color: '#fff',
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 12,
                            }
                        },
                        grid: {
                            //    left: '1%',
                            //     right: '4%',
                            //     bottom: '6%',
                            //     top: 30,
                            //     padding: '0 0 10 0',
                            top:40,
                            left: 50,
                            right: 50,
                            bottom:40,
                            // containLabel: true,
                        },
                        // legend: { //图例组件，颜色和名字
                        //     // right: 10,
                        //     // top: 0,
                        //     // itemGap: 16,
                        //     // itemWidth: 18,
                        //     // itemHeight: 10,
                        //     data: data[0],
                        //     textStyle: {
                        //         color: '#a8aab0',
                        //         fontStyle: 'normal',
                        //         fontFamily: '微软雅黑',
                        //         fontSize: 12,
                        //     }
                        // },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: true, //坐标轴两边留白
                            data:data[0],
                            axisLabel: { //坐标轴刻度标签的相关设置。
                                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                                rotate:rotate,
                                margin: 15,
                                textStyle: {
                                    color: '#ffffff',
                                    fontStyle: 'normal',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                }
                            },
                            axisTick: { //坐标轴刻度相关设置。
                                show: false,
                            },
                            axisLine: { //坐标轴轴线相关设置
                                show:false,
                                lineStyle: {
                                    color: '#fff',
                                    opacity: 0.2
                                }
                            },
                            splitLine: { //坐标轴在 grid 区域中的分隔线。
                                show: false,
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            name: unitName,
                            // nameLocation: 'end',
                            nameTextStyle: {
                                color: '#ffffff',
                                padding: [0, 0, 0, -20] // 四个数字分别为上右下左与原位置距离
                            },
                            splitNumber: 5,
                            axisLabel: {
                                textStyle: {
                                    color: '#a8aab0',
                                    fontStyle: 'normal',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                }
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: ['#fff'],
                                    opacity: 0.06
                                }
                            }

                        }],
                        series: [{
                            // name: data[1],
                            type: 'bar',
                            data: data[1],
                            barWidth: 30,
                            barGap: 0, //柱间距离
                            label: { //图形上的文本标签
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#a8aab0',
                                        fontStyle: 'normal',
                                        fontFamily: '微软雅黑',
                                        fontSize: 12,
                                    },
                                },
                            },
                            itemStyle: { //图形样式
                                normal: {
                                    color:'#00FFFF',
                                    // barBorderRadius: [5, 5, 0, 0],
                                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    //     offset: 1,
                                    //     color: 'rgba(127, 128, 225, 0.7)'
                                    // }, {
                                    //     offset: 0.9,
                                    //     color: 'rgba(72, 73, 181, 0.7)'
                                    // }, {
                                    //     offset: 0.31,
                                    //     color: 'rgba(0, 208, 208, 0.7)'
                                    // }, {
                                    //     offset: 0.15,
                                    //     color: 'rgba(0, 208, 208, 0.7)'
                                    // }, {
                                    //     offset: 0,
                                    //     color: 'rgba(104, 253, 255, 0.7)'
                                    // }], false),
                                },
                            },
                        }
                        ]
                    };
                return option;
            }

        },
        data() {
            return {
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
                            name: "其它"
                        }
                    ]
                },//图例
                mapLegendLane: {
                    list: [
                        {
                            color: "rgba(26, 117, 209,1)",
                            name: "白天时段" // 圖例名字
                        },
                        {
                            color: "#FFFF00",
                            name: "潮汐"
                        },
                        {
                            color: "rgb(68, 209, 53)",
                            name: "单向全天候"
                        },
                        {
                            color: "#72F6FA",
                            name: "高峰"
                        },
                        {
                            color:'#CC91E2',
                            name:'快速路'
                        }
                    ]
                },//图例
                mapLegendOnline:{
                    list:[
                        {
                            color: "rgba(26, 117, 209,1)",
                            name: "混合动力" // 圖例名字
                        },
                        {
                            color: "#72F6FA",
                            name: "CNG"
                        },
                        {
                            color: "rgb(68, 209, 53)",
                            name: "电动"
                        },
                        {
                            color: "rgba(127,45,0,1)",
                            name: "柴油"
                        },


                ]},
                stationRate:[],//覆盖率相关数据

                busLaneDay:0,//白天条数
                busLaneDayLen:0,//白天长度
                busLaneTide:0,//潮汐条数
                busLaneTideLen:0,//潮汐长度
                busLaneOneway:0,//全天单向条数
                busLaneOnewayLen:0,//全天单向长度
                busLanePeak:0,//高峰条数
                busLanePeakLen:0,//高峰长度
                busLaneQuick:0,//快速路条数
                busLaneQuickLen:0,//快速路长度

                activeLineTOP:0,//线路top10展示顺序
                activeStationNo:1,//站点展示顺序
                quickLine:0,//快线
                quickLinePerson:0,//快线人数
                mainLine:0,//干线
                mainLinePerson:0,//快线人数
                regionalLine:0,//支线
                regionalLinePerson:0,//支线人数
                microLine:0,//微线
                microLinePerson:0,//微线线人数
                quickLineOption:{},//快线TOP10
                mainLineOption:{},//干线top10
                regionalLineOption:{},//支线TOP10
                microLineOption:{},//微线top10
                busMetroOption:{},//公交地铁换乘TOP10
                echartoption:{},//echarts配置文件

                busTopicMetroStationList:[],//公交地铁换乘集合
                busTopicBusLaneList:[],//公交专用道集合
                busTopicChannelList:[],//公交走廊集合
                busTopicOnLineBusList:[],//在线车辆
                busTopicStationList:[],//公交站点集合
                gjBusLineInternetList:[],//公交线路集合
                laneSpeedOption:{},//公交专用道速度TOP
                topStationOption:{},//公交站点客流TOP10图表展示配置
                option:{},
                activeNo:1,//当前页面
                testData:[
                    ['1路','2路','3路','4路','5路']
                    ,[5,4,3,2,1]],
                busLineOther:0,//其它公交线路数
                personNumOther:0,//其它公交人数
                busDriver:0,//  公交驾驶人员
                busLane:0,//公交专用道数量
                busEnterprise:0,//企业数
                busLine:0,//公交线路数
                busLineInternet:0,//公交线网数量
                busPerson:0,// 公交从业人员
                personNum:0,//总客流量
                busVehicle:0,//车辆数
                busMetro:0,//公交地铁换乘数量
                busStation:0,//公交站点数量
                onLineBus:0,//公交在线车辆数量
                coverageRate300m:0,//300m覆盖率
                hubStationNum:0,//公交枢纽站数量
                coverageRate500m:0,//500m覆盖率
                channel:0,//公交走廊
                hhBus:0,//混合动力
                ddBus:0,//电动
                cngBus:0,//CNG
            }
        }
    }
</script>

<style lang="scss" scoped>
    .homepage-wrapper{
        height: 100%;
        width:100%;
        position: relative;
        .panel-wrapper{
            height: 400px;
            // padding: 10px 0;
            position: absolute;
            top: 50%;
            width: 410px;
            transform: translateY(-50%);
            // border: 1px solid red;
        }
        .top{
            position: absolute;
            top:0;
            width: 700px;
            height: 48px;
            left:50%;
            transform: translateX(-50%);
            /*margin: 0px auto;*/
            justify-content: center;
            /*background: url(img/bj.png) center no-repeat;*/
            background: rgba(0,0,0,.4);
            background-size: 100%;
            margin-top: 3px;
            .zhu1{
                margin-left: 38px;
                li{
                    line-height: 30px;
                }
                .mi{
                    float: left;
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-right: 4px;
                    font-weight: normal;
                    margin-left: 10px;
                    margin-top: 10px;
                }
                .mi1{
                    float: left;
                    font-size: 24px;
                    font-weight: bold;
                    color: #00ffff;
                    margin-top: 10px;
                }.mi2{
                     float: left;
                     font-size: 14px;
                     font-weight: normal;
                     color: #00ffff;
                     margin-top: 10px;
                     margin-left: 2px;

                 }
            }
        }
        .top2{
            position: absolute;
            top:50px;
            /*width: 823px;*/
            /*height: 48px;*/
            left:50%;
            transform: translateX(-50%);
            height: 100px;
            width: 90%;
            .data_box{
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
                    width: 40px;
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
                .data_name span.cut_s{
                    font-size:14px;
                    color:#144b8c;
                    margin:0px 5px;
                }
                .data_bg span.cut {
                    font-size:36px;
                    color:#144b8c;
                    margin:0px 10px;
                    font-family: "Microsoft YaHei";
                }

                .data_bg span.unit {
                    font-size: 14px;
                    color: #72F6FA;
                    margin-left: 10px;
                }
                .blue_data {
                    color: #00FFFF !important;

                }
                .yellow {
                    color: #FFFF00;
                    font-size: 30px;
                }
            }

        }
        .left{
            /*position: absolute;*/
            left:0;
            display:flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            justify-content: center;
            .left-content{

                .item{
                    width:272px;
                    height:92px;
                    line-height: 92px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    background: url(img/leftNomal.png) center no-repeat;
                    background-size: 100%;
                }
                .item:hover{
                    background: url(img/leftHover.png) center no-repeat;
                    background-size: 100%;
                }
                .item1{
                    transform: rotateZ(8deg);
                }
                .item3{
                    transform: rotateZ(-8deg);
                }
                .active{
                    background: url(img/leftHover.png) center no-repeat;
                    background-size: 100%;
                }
            }
        }
        .right{
            /*position: absolute;*/
            right:0;
            display:flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            justify-content: center;
            .right-content{
                .item{
                    width:272px;
                    height:92px;
                    line-height: 92px;
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    background: url(img/rightNomal.png) center no-repeat;
                    background-size: 100%;
                }
                .item:hover{
                    background: url(img/rightHover.png) center no-repeat;
                    background-size: 100%;
                }
                .item1{
                    transform: rotateZ(-8deg);
                }
                .item3{
                    transform: rotateZ(8deg);
                }
                .active{
                    background: url(img/rightHover.png) center no-repeat;
                    background-size: 100%;
                }
            }
        }
        .bottom{
            background-color: rgba(0,0,0,.4);
            position: absolute;
            bottom:20px;
            height:200px;
            width:calc(100% - 600px) ;
            /*width: 823px;*/
            /*height: 48px;*/
            left:50%;
            transform: translateX(-50%);

        }
        .mapLegend{
            position: absolute;
            z-index: 6;
            right: -3.1rem;
            bottom: -0.25rem;
            width: 110px;
        }
.zlxq{
    width:400px;
}
    }
</style>