<template>
<!-- 综合指标 -->
    <div class="CompositeIndicator-wrapper nomap-content-container">
        <div class="left-panel">
                <div class="top">
                    <panelTitle title="交通运营相关" :displaySwitch=false></panelTitle>
                    <TrafficOperationCorrelation :jcl="publicvehicleEnntryrate" :wjl="complaintCloserate" :syl="cardUsagerate" :srsp="employeeIncomelevel"></TrafficOperationCorrelation>
                    <!-- <verticesBorderStyle /> -->
                </div>
                <div class="bottom">
                    <panelTitle title="安全事故相关" :displaySwitch=false></panelTitle>
                    <SafetyAccidents :qcswl="publicvehicleEventMortalityrate" :gdswl="railEventMortalityrate" coefficient="10"/>
                    <!--                        <verticesBorderStyle />-->
                </div>
        </div>
        <div class="mid-panel">
            <div class="panel-wrap">
                <panelTitle :title="title" :displaySwitch=false></panelTitle>
            </div>
            
            <section class="percent-wrapper">
                <div class="title-item" v-for="item in itemList" :key="item.title" >
                    <NoDisplay :title="item.title" :percent="item.number" :color="item.color" ></NoDisplay>
                </div>
            </section>
            <section class="map">
                <div class="item item1">
                    <verticesBorderStyle4Gj/>
                    <div class="textClass">
                        <p class="content" >公交专用车道</p>
                        <p class="content" >设置比率 <span class="value"> {{dedicatedlaneSetrate}} </span><span class="unit"> %</span> </p>
                    </div>

                </div>
                <div class="item item2">
                    <verticesBorderStyle4Gj/>
                    <div class="textClass">
                        <p class="content" >公共汽电车</p>
                        <p class="content" >线网密度 <span class="value">{{linenetworkDensity}}</span><span class="unit"> km/km²</span> </p>
                    </div>

                </div>
                <div class="item item3">
                    <verticesBorderStyle4Gj/>
                    <div class="textClass">
                        <p class="content" >公共汽电车<span>(早晚高峰时段)</span></p>
                        <p class="content" >平均运营时速 <span class="value">{{peakAvgOperaspeed}}</span><span class="unit"> km/h</span></p>
                    </div>

                </div>
                <div class="item item4">
                    <verticesBorderStyle4Gj/>
                    <div class="textClass">
                        <p class="content" >公交专用车道</p>
                        <p class="content" >线路网比率 <span class="value">{{linenetworkRate}}</span><span class="unit"> %</span> </p>
                    </div>

                </div>
<!--                <Basemap></Basemap>-->
            </section>
        </div>
        <div class="right-panel">
            <panelTitle title="服务保障相关" :displaySwitch=false></panelTitle>
            <ServiceGuarantee :getdata="serviceGuarantee"/>
<!--            <verticesBorderStyle />-->
        </div>
        <div class="date-float" :style="{visibility:visibility}" >
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
            <SearchPanel :searchConfig="searchConfig2" @getSearchValue="getSearchValueSelf"></SearchPanel>
         </div>
    </div>
</template>

<script>
    import NoDisplay from "./components/NoDisplay.vue";
    import ServiceGuarantee from "./components/ServiceGuarantee.vue";
    import TrafficOperationCorrelation from "./components/TrafficOperationCorrelation.vue";
    import SafetyAccidents from "./components/SafetyAccidents.vue";
    import { dateRang } from "@/components/common/searchPanel/SearchPanelConfig";
    import PanelItem from "../../../components/common/PanelItem";
    import PanelTitle from "../../../components/common/panelTitle/panelTitle";
    import verticesBorderStyle4Gj from "./components/verticesBorderStyle4Gj";
    export default {
        name: '',
        components: {
            PanelTitle,
            PanelItem,
            NoDisplay,
            TrafficOperationCorrelation,
            SafetyAccidents,
            ServiceGuarantee,
            verticesBorderStyle4Gj
        },
        mounted () {
            
            setTimeout(() => {
                // 防止时间组件闪烁
                this.visibility = "visible"
            }, 1000);
            var queryparam={};
            queryparam.type=this.timetype;
            queryparam.time=this.time;
            this.getData(queryparam);
        },
        methods:{
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
                queryparam.type=this.timetype;
                queryparam.time=this.time;
                this.getData(queryparam);

            },
            getData(querData){
                this.$http.$get("gjjc_cityIndex/getTrafficServiceIndex",querData).then((param) => {
                    this.dealWithData(param);
                });
                this.$http.$get("gjjc_cityIndex/getSecurityIncidentIndex",querData).then((param) => {
                    this.dealWithIncident(param);
                });
                this.$http.$get("gjjc_cityIndex/getLineNetworkRunIndex",querData).then((param) => {
                    this.dealWithLineNetwork(param);
                });
                this.$http.$get("gjjc_cityIndex/getServiceGuaranteeIndex",querData).then((param) => {
                    this.serviceGuarantee=param;
                });
            },
            dealWithData(data){
                this.publicvehicleEnntryrate=data.publicvehicleEnntryrate==null?0:parseFloat(data.publicvehicleEnntryrate).toFixed(0);
                this.complaintCloserate=data.publicvehicleEnntryrate==null?0:parseFloat(data.publicvehicleEnntryrate).toFixed(0);
                this.cardUsagerate=data.publicvehicleEnntryrate==null?0:parseFloat(data.publicvehicleEnntryrate).toFixed(0);
                this.employeeIncomelevel=data.publicvehicleEnntryrate==null?0:parseFloat(data.publicvehicleEnntryrate).toFixed(0);
            },
            dealWithIncident(data){
                this.railEventMortalityrate=data.railEventMortalityrate==null?0:parseFloat(data.railEventMortalityrate).toFixed(1);
                this.publicvehicleEventMortalityrate=data.publicvehicleEventMortalityrate==null?0:parseFloat(data.publicvehicleEventMortalityrate).toFixed(1);
            },
            dealWithLineNetwork(data){
                this.itemList[1].number=data.travelSharingrate==null?0:parseFloat(data.travelSharingrate).toFixed(1),//公共交通出行分担率
                this.peakAvgOperaspeed=data.peakAvgOperaspeed==null?0:parseFloat(data.peakAvgOperaspeed).toFixed(1);//公共汽电车(早晚高峰时段)平均运营时速
                this.linenetworkRate=data.linenetworkRate==null?0:parseFloat(data.linenetworkRate).toFixed(1);//公共汽电车线路网密度
                this.itemList[2].number=data.siteFivemCoverage==null?0:parseFloat(data.siteFivemCoverage).toFixed(1)//公共交通站点500米覆盖率
                this.linenetworkDensity=data.linenetworkDensity==null?0:parseFloat(data.linenetworkDensity).toFixed(1);//公共汽电车线路网密度
                this.dedicatedlaneSetrate=data.dedicatedlaneSetrate==null?0:parseFloat(data.dedicatedlaneSetrate).toFixed(1);//公共汽电车线路网比率
                this.itemList[3].number=data.siteThreemCoverage==null?0:parseFloat(data.siteThreemCoverage).toFixed(1)//公共交通站点300米覆盖率
                this.itemList[0].number=data.motorizedTravelSharingrate==null?0:parseFloat(data.motorizedTravelSharingrate).toFixed(1)//公共交通机动化出行分担率

            }
        },
        data() {
            return {
                searchConfig2:{
                    searchCondition: [
                        {
                            order: 36,
                            type: "select",
                            label: "时间类型",
                            placeholder: "",
                            width:50,
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
                            VModelvalue: {
                                name: "time",
                                defaultValue:new Date().getFullYear().toString(),
                            }
                        },
                    ],
                },
                timetype:'year',
                time:'',
                serviceGuarantee:{
                    publicvehicleAvgage:6.7,//公交汽电车平均年龄
                    urbanruralLineOperaterate:54,//城乡客运线路公交化运营比
                    greenvehicleOversameRate:-2.0,//绿色公共交通车辆比率较去年同期比
                    trafficPunctuality:96,// 公共交通正点率
                    buspriorityInterseciotnrate:63,// 公交优先通行交叉口比率
                    pubicvehicleAvgStationarea:9.4,//公交汽电车车均场站面积
                    urbanruralLineOversameRate:2.0,//城乡客运线路公交化运营比较去年同期比
                    greenVehiclerate:78,//绿色公共交通车辆比率
                    thousandVehicleownership:9873,// 万人公共交通车辆保有量
                    peakAvgCongesiton:67,//公共交通平均拥挤度（早晚高峰时段）
                    ownershipOversameRate:10,//万人公共交通车辆保有量较去年同期比
                    harborstyleSiterate:78,//公交汽电车港湾式停靠站设
                    buspriorityOversameRate:-5.3,//公交优先通行交叉口比率较去年同期比
                },//服务保障数据
                peakAvgOperaspeed:0,//公共汽电车(早晚高峰时段)平均运营时速
                linenetworkRate:0,//公交专用道路网比率
                linenetworkDensity:0,//公共汽电车线路网密度
                dedicatedlaneSetrate:0,//公共汽电车线路网设置比率
                railEventMortalityrate:0,//轨道交通事故死亡率
                publicvehicleEventMortalityrate:0,//公共汽电车责任事故死亡率
                publicvehicleEnntryrate:0,// 公共汽电车进场率
                complaintCloserate:0,// 公共交通投诉完结率
                cardUsagerate:0,//公共交通一卡通使用率
                employeeIncomelevel:0,//公共交通职工收入水平
                title: '线网运行相关',
                datevalue: '',
                pickerOptions: dateRang,
                visibility:"hidden",
                itemList:[
                    {
                        title: '机动化出行分担率',
                        number: '67',
                        color:"#fff101"
                    },
                    {
                        title: '出行分担率',
                        number: '82',
                        color:"#fff101"
                    },
                    {
                        title: '站点500米覆盖率',
                        number: '95',
                        color:"#01fefe"
                    },
                    {
                        title: '站点300米覆盖率',
                        number: '77',
                        color:"#01fefe"
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin flexLayOut{
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .CompositeIndicator-wrapper{
        display: flex;
        height: 100%;
        .left-panel{
            flex: 400;
            @include flexLayOut;
            .top{
                flex: 5;
            }
            .bottom{
                flex: 2;
                margin-top: 30px;
            }
        }
        .mid-panel{
            flex: 700;
            position: relative;
            margin: 0 30px;
            /*background: rgba(5, 12, 38, 0.4);*/
            display: flex;
            flex-direction: column;
            .panel-wrap{
                flex: 50;
            }
            .percent-wrapper{
                position: relative;
                display: flex;
                margin-top: 10px;
                flex: 100;
                .title-item{
                    flex: 1;
                    margin-left: 20px;
                    border-radius: 5px;
                }
                .title-item:last-child {
                    margin-right: 20px;
                }
            }
            .map{
                position: relative;
                display: flex;
                margin-top: 20px;
                justify-items: center;
                align-items: center;
                justify-content: center;
                width: 767px;
                height:608px;
                background: url("./img/gj_xwyx_bg.png")  no-repeat;
                /*background-size: 100%;*/
                @media only screen and (max-width: 1366px){
                    background-size: 90%;
                    margin-bottom: -40px;
                }
                background-position: center bottom ;
                .item1{
                    top: 35px;
                    left:190px;
                    /*width: 100px;*/
                    /*height: 60px;*/

                }
                .item2{
                    top:35px;
                    right:130px;
                }
                .item3{
                    top:155px;
                    left: 0;
                }
                .item4{
                    top:155px;
                    right: 20px;
                    /*bottom: 20px;*/
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
                    background: rgba(0,0,0,.4);
                    .textClass{
                        /*flex: 3;*/
                        /*position: absolute;*/
                        margin: 10px 20px;
                        font-size: 14px;
                        font-weight: bold;
                        p{
                            height:30px;
                            line-height: 30px;
                        }
                        .content:nth-child(1){
                            span{
                                color:#FFF100;
                            }
                        }
                        .content:nth-child(2){
                            /*margin: 6px 0 16px 0;*/

                            span{
                                color: #00FFFF;
                            }
                            .value{
                                font-size: 20px;
                                font-weight: bold;
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
        .right-panel{
            flex: 400;
            position: relative;
        }
    }
    .date-float{
        position: absolute;
        right: 20px;
        top: -10px;
        visibility: hidden;
    }
</style>