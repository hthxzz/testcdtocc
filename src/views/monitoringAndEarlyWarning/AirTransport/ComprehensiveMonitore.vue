<template>
<!-- 综合指标 -->
    <div class="CompositeIndicator-wrapper">
        <div class="left-panel">
            <div class="top ">
                
                <panelTitle title="航班概况" :displaySwitch=false ></panelTitle>
                <div class="hbgk">
                    <div class="first part">
                        <div class="item">
                            <h2>进港总量</h2>
                            <p>{{comeNum}}  </p>
                            <span>架次</span>
                        </div>
                        <div class="item">
                            <h2>进港延误</h2>
                            <p>{{comeDelayNum}}  </p>
                            <span>架次</span>
                        </div>
                        <div class="item">
                            <h2>进港取消</h2>
                            <p>{{comeCancelNum}}  </p>
                            <span>架次</span>
                        </div>
                    </div>
                    <div class="second part">
                        <div class="item">
                            <h2>出港总量</h2>
                            <p>{{outNum}}  </p>
                            <span>架次</span>
                        </div>
                        <div class="item">
                            <h2>出港延误</h2>
                            <p>{{outDelayNum}}  </p>
                            <span>架次</span>
                        </div>
                        <div class="item">
                            <h2>出港取消</h2>
                            <p>{{outCancelNum}}  </p>
                            <span>架次</span>
                        </div>
                    </div>
                </div>

            </div>
            <div class="mid ">
                
                <panelTitle title="航班延误预警" :displaySwitch=false ></panelTitle>
                    <div class="ywyj">
                        <p class="total">预警总数 <span class="b">{{alertNum}}</span> 架次<span class="a">环比</span> <span class="number">10%</span> <span class="up" >⬆</span>   <span class="bottom" >⬇</span></p>
                        <div class="item">
                            <p>{{yellowAlertNum}}</p>
                            <h2>黄色预警</h2>
                        </div>
                        <div class="item">
                            <p>{{orangeAlertNum}}</p>
                            <h2>橙色预警</h2>
                        </div>
                        <div class="item">
                            <p>{{blueAlertNum}}</p>
                            <h2>蓝色预警</h2>
                        </div>
                        <div class="item">
                            <p>{{redAlertNum}}</p>
                            <h2>红色预警</h2>
                        </div>
                    </div>
<!--                </PanelItem>-->
            </div>
            <div class="bottom ">
                
                <panelTitle title="周边路网拥堵指数" :displaySwitch=false ></panelTitle>
                <div class="ydzs">
                    <p>
                        <span>3.8</span>
                        <span>2.8</span>
                    </p>
                    <h2>
                        <span>周边道路</span>
                        <span>机场高速</span>
                    </h2>
                </div>
            </div>
        </div>
        <div class="mid-panel ">
            
            <div class="panel-wrap">
                <panelTitle :title="title" :displaySwitch=false></panelTitle>
                <section class="percent-wrapper">
                    <!--                <div class="title-item" v-for="item in itemList" :key="item.title" >-->
                    <!--                    <NoDisplay :title="item.title" :percent="item.number" :color="item.color" ></NoDisplay>-->
                    <!--                </div>-->

                    <div class="btn-wrappper"  >
                        <ChangeEchar :itemList="comeOrOutConfig" @getStatues="changeComeOrOut" ></ChangeEchar>
                    </div>
                    <div class="number-wrapper">
                        <div class="rollNumber-container">
                            <div class="rollNumber-wrap">
                                <label >客流总量</label>
                                <div class="number">
                                    <div class="item" v-for="item in numberList">
                                        {{ item }}
                                    </div>
                                </div>
                                <label >人</label>
                            </div>
                        </div>
                        <!--                        <RollNumber title="总客运量" :value="rollNo" ></RollNumber>-->
                    </div>

                </section>
            </div>
            <section class="map">
                <Basemap></Basemap>
            </section>
            <!--  -->
        </div>
        <div class="right-panel">
            <div class="top ">
                
                <panelTitle title="周边交通分布情况" :displaySwitch=false ></panelTitle>
                <div class="zbjt">
                    <div class="item-wrapper">
                        <div class="item first">
                            <p>16</p>
                            <h2>地铁线路</h2>
                        </div>
                        <div class="item second">
                            <p>61</p>
                            <h2>机场大巴</h2>
                        </div>
                        <div class="item three">
                            <p>1</p>
                            <h2>公交线路</h2>
                        </div>
                        <div class="item four">
                            <p>1</p>
                            <h2>客运线路</h2>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="bottom ">
                
                <panelTitle title="客流分担情况" :displaySwitch=false ></panelTitle>
                <div style="width:100%;height:100%;">
                    <div style="height:55%">
                        <v-chart :options="travelEcharOption" theme="theme"/>
                    </div>
                    <div class="trafficList">
                        <ul >
                            <li class="traffic" v-for="(item,index) in itemList" :key="item.order">
                                <img :src="srcbg" alt="" class="item" >
                                <span class="item" >{{ index + 1 }}</span>
                                紫薇东路--345人
                            </li>
                        </ul>
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
    import {option2, option3} from "../roadTransportOperation/components/options";
    export default {
        name: '',
        components: {
            
        },
        mounted () {
            setTimeout(() => {
                // 防止时间组件闪烁
                this.visibility = "visible"
            }, 1000);
            this.$http.$get("kyjc_flightStatistic/getFlightStatistic").then((param) => {
                this.dealWithData(param);
            });
        },
        created() {
            this.creatRingOption(this.travelData);
        },
        methods:{
            creatRingOption: function (data) {
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}%"
                    },
                    legend: {
                        show:false,
                        // orient: 'vertical',//图例列表布局朝向
                        x: 'right', y: 'top',
                        data: data[0]
                    },

                    grid: {
                        top:0,
                        /*x: 80,
                        x2: 40,*/
                        //top: 60,
                        bottom: 0,
                    },
                    series: [
                        {
                            name: '出行分担率',
                            type: 'pie',
                            center:['50%','55%'],
                            radius: ['20%', '45%'],
                            avoidLabelOverlap: false,
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 15,
                                    length2: 60,
                                    lineStyle: {
                                        width:2,
                                        // color: '#d3d3d3'
                                    },
                                    align: 'right'
                                },
                                // color: "#000",
                                emphasis: {
                                    show: true
                                }
                            },
                            label: {
                                normal: {
                                    //formatter: ' {c}%   ',
                                    formatter: function(params){
                                        var total = 0; //考生总数量
                                        var percent = 0; //考生占比
                                        data[1].forEach(function(value, index, array) {
                                            total += value.value;
                                        });
                                        percent = ((params.value / total) * 100).toFixed(1);
                                        var str ='{nameStyle|'+params.name+'}'+'{rate|'+percent+'%}';
                                        return str
                                    },
                                    padding: [0, -30],
                                    height: 45,
                                    // backgroundColor: '#eee',
                                    // borderColor: '#aaa',
                                    // borderWidth: 1,
                                    // borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        nameStyle: {
                                            fontSize: 12,
                                            color: "#fff",
                                            align: 'left'
                                        },
                                        rate: {
                                            fontSize: 14,
                                            color: "#fff",
                                            align: 'left'
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            // labelLine: {
                            //     normal: {
                            //         show: true
                            //     }
                            // },
                            data: data[1]
                        },
                        {//仪表刻度
                            name: "",
                            center:['50%','55%'],
                            type: "gauge",
                            radius: "59%",
                            startAngle: 0,
                            endAngle: 359.9,
                            splitNumber: 12,
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                length: 5,
                                lineStyle: {
                                    width: 2,
                                    color: "rgba(17,26,120,0.8)",
                                    type: 'solid',
                                    // shadowBlur: 8,
                                    // shadowColor: '#fff',
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    opacity: 0.9
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            pointer: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    opacity: 0
                                }
                            },
                            detail: {
                                show: false
                            },
                            data: [{
                                value: 0,
                                name: ""
                            }]
                        },
                        {//仪表小刻度
                            name: "",
                            center:['50%','55%'],
                            type: "gauge",
                            radius: "59%",
                            startAngle: 0,
                            endAngle: 359.9,
                            splitNumber: 60,
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "rgba(17,26,120,0.5)",
                                    type: 'solid',
                                    // shadowBlur: 8,
                                    // shadowColor: '#fff',
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    opacity: 0.9
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            pointer: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    opacity: 0
                                }
                            },
                            detail: {
                                show: false
                            },
                            data: [{
                                value: 0,
                                name: ""
                            }]
                        },
                        {
                            type: 'pie',
                            center:['50%','55%'],
                            radius: ["75%", "90%"],
                            hoverAnimation: false,
                            labelLine: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            tooltip: {
                                show: false //显示提示框
                            },
                            name: "",
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'radial',
                                        x: 0.5,
                                        y: 0.5,
                                        r: 0.5,
                                        colorStops: [{
                                            offset: 0.8,
                                            color: 'rgba(160,247,255,0.23)' // 100% 处的颜色
                                        },
                                            {
                                                offset: 0.95,
                                                color: 'rgba(0,0,0,0.23)' // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(0,0,0,0.5)' // 0% 处的颜色
                                                // color: 'rgba(160,247,255,0.23)' // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    }
                                },
                            },
                            data:[{value:0}]
                            // data: [{
                            //     name: '',
                            //     value: 0,
                            //     itemStyle: {
                            //         normal: {
                            //             color: "rgba(32,86,221,0.2)"
                            //         }
                            //     }
                            // }]
                        },
                        {
                            type: 'pie',
                            center:['50%','55%'],
                            radius: ["60%", "61%"],
                            hoverAnimation: false,
                            labelLine: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            name: "",
                            tooltip: {
                                show: false //显示提示框
                            },
                            data: [{
                                name: '',
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: "#112E78"
                                    }
                                }
                            }]
                        }
                    ]
                }
                this.travelEcharOption = option;
            },
            dealWithData:function(data){
                this.comeNum=data.comeNum==null?0:data.comeNum;
                this.comeDelayNum=data.comeDelayNum==null?0:data.comeDelayNum;
                this.comeCancelNum=data.comeCancelNum==null?0:data.comeCancelNum;
                this.outNum=data.outNum==null?0:data.outNum;
                this.outDelayNum=data.outDelayNum==null?0:data.outDelayNum;
                this.outCancelNum=data.outCancelNum==null?0:data.outCancelNum;
                this.alertNum=data.alertNum==null?0:data.alertNum;
                this.blueAlertNum=data.blueAlertNum==null?0:data.blueAlertNum;
                this.yellowAlertNum=data.yellowAlertNum==null?0:data.yellowAlertNum;
                this.redAlertNum=data.redAlertNum==null?0:data.redAlertNum;
                this.orangeAlertNum=data.orangeAlertNum==null?0:data.orangeAlertNum;
                this.numberList=String(this.realComePersonNum=data.realComePersonNum==null?0:data.realComePersonNum).split("");
                this.realOutPersonNum=data.realOutPersonNum==null?0:data.realOutPersonNum;
            },
            changeComeOrOut(content){
                if (content == "进港") {
                    this.numberList=String(this.realComePersonNum).split("");
                }else if(content == "出港"){
                    this.numberList=String(this.realOutPersonNum).split("");
                }
            },
        },
        data() {
            return {
                numberList:['0'],//客运量
                realComePersonNum: 0,//实际进港人数
                realOutPersonNum: 0,//实际出港人数
                comeNum:0,//进港航班数量
                comeDelayNum: 0,//进港延误数量
                comeCancelNum: 0,//进港取消数量
                outNum: 0,//出港航班数量
                outDelayNum: 0,//出港延误数量
                outCancelNum: 0,//出港取消数量
                alertNum: 0,//预警数量
                blueAlertNum: 0,//蓝色预警数量
                yellowAlertNum: 0,//黄色预警数量
                redAlertNum: 0,//红色预警数量
                orangeAlertNum: 0,//橙色预警数量
                comeOrOutConfig:['进港','出港'],
                srcbg: require('../roadTransportOperation/img/dlys_num_bg.png'),
                travelEcharOption: {},
                travelData: [
                    ['出租车', '公交', '地铁', '大巴', '其它'],
                    [
                        {value: 15, name: '出租车'},
                        {value: 45, name: '公交'},
                        {value: 12, name: '地铁'},
                        {value: 15, name: '大巴'},
                        {value: 13, name: '其它'}]
                ],
                title: '客流总体情况',
                datevalue: '',
                pickerOptions: dateRang,
                visibility:"hidden",
                itemList:[
                    {
                        order: 1,
                        title: "",
                        traffic: 6951
                    },
                    {
                        order: 2,
                        title: "",
                        traffic: 1281
                    },
                    {
                        order: 3,
                        title: "",
                        traffic: 4119
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
            width: 410px;

            @include flexLayOut;
            .top{
                flex: 338;
                position: relative;
                .hbgk{
                    background: url('./img/zhjc_hb_bg.png') no-repeat;
                    background-size: 203px 118px;
                    .part{
                        display: flex;
                        /*height: 50%;*/
                        justify-content: space-evenly;
                        .item{
                            @include allCenter;
                            flex-direction: column;
                            text-align: center;
                            width:110px;
                            height:100px;
                            border:2px solid rgba(32,86,221,.4);
                            border-radius:8px;
                            background-color: rgba(32, 86, 221, .4);
                            h2{
                                width: 100%;
                            }
                            p{
                                width: 100%;
                                color:#00FFFF;
                                font-size:24px ;
                                margin: 10px 0;
                            }
                            span{
                                color:#00FFFF;
                                font-size: 16px;
                            }
                        }
                    }
                    .first{
                        margin-top: 10px;
                        align-items: flex-end;
                        margin-bottom: 10px;
                    }
                    .second{
                        align-items: flex-start;
                    }
                }

                
            }
            .mid{
                flex: 308;
                position: relative;
                margin: 10px 0;
                .ywyj{
                     height: calc(100% - 45px);
                    //height: 100%;
                    background: url('./img/zhjc_hb_hbyw_bg.png') no-repeat;
                    background-size: 316px 158px;
                    background-position: center center;
                    position: relative;
                    .total{
                        font-size: 14px;
                        padding: 20px;
                        .a{
                            margin-left: 20px;
                        }
                        .b{
                            margin: 0 6px;
                            font-size: 18px;
                            color: yellow;
                        }
                        .number{
                            color: rgba(255, 0, 0, 1);
                            font-size: 18px;
                            margin: 0 6px;
                        }
                        .up{
                            color: red;
                        }
                        .bottom{
                            color: green;
                        }
                    }
                    .item{
                        width:59px;
                        height:59px;
                        border-radius:50%;
                        position: absolute;
                        font-weight: bold;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                        
                        p{
                            font-size: 16px;
                        }
                        h2{
                            font-size: 14px;
                            margin-top: 10px;
                        }
                        &:nth-child(2){
                            left: 160px;
                            top: 60px;
                            background:linear-gradient(180deg,rgba(255,241,0,1),rgba(255,138,0,1));
                        }
                        &:nth-child(3){
                            right: 20px;
                            top: 30px;
                            width:69px;
                            height:70px;
                            background:linear-gradient(180deg,rgba(242,136,23,1),rgba(154,50,13,1));
                        }
                        &:nth-child(4){
                            left: 60px;
                            bottom: 10px;
                            width:91px;
                            height:91px;
                            background:linear-gradient(180deg,rgba(0,255,255,1),rgba(8,49,150,1));
                        }
                        &:nth-child(5){
                            right: 80px;
                            bottom: 18px;
                            width:80px;
                            height:80px;
                            background:linear-gradient(180deg,rgba(251,46,59,1),rgba(91,5,5,1));
                            border-radius:50%;
                        }

                    }

                }
            }
            .bottom{
                flex: 214;
                position: relative;
                /*margin-top: 10px;*/
                .ydzs{
                    height: calc(100% - 45px);
                    background: url('./img/zhjc_hb_zblw_bg.png') no-repeat;
                    background-size: 382px 124px;
                    background-position: center center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    p{
                        font-size:36px;
                        width: 382px;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        margin: 0 auto;
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        span{
                            display: inline-block;
                            // width: 50%;
                        }
                        span:nth-child(1){
                            margin-left: 30px;
                        }
                        span:nth-child(2){
                            margin-right: 30px;
                        }
                    }
                    h2{
                        width: 382px;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        display: flex;
                        margin: 0 auto;
                        justify-content: space-between;
                        margin-top: 10px;
                        span:nth-child(1){
                            margin-left: 30px;
                        }
                        span:nth-child(2){
                            margin-right: 30px;
                        }
                    }
                }
                
            }
        }
        .mid-panel{
            flex: 700;
            position: relative;
            margin: 0 10px;
            /*background: rgba(12, 12, 12, 0.62);*/
            display: flex;
            flex-direction: column;
            .panel-wrap{
                flex: 50;
            }
            .percent-wrapper{
                display: flex;
                /*margin-top: 30px;*/
                flex: 150;
                /*background: rgba(12, 12, 12, 0.62);*/
                .title-item{
                    flex: 1;
                    margin-left: 20px;
                }
                .title-item:last-child {
                    margin-right: 20px;
                }
                .btn-wrappper{
                    position: absolute;
                    right:10px;
                    margin-top:10px;
                }
                .number-wrapper{
                    width:100%;
                    margin-top: 40px;
                    .rollNumber-container{
                        margin-left: 100px;
                    }
                    .rollNumber-wrap{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        label{
                            font-size: 16px;
                        }
                        .number{
                            margin-left: 10px;
                            display: flex;
                            .item{
                                font-size:60px;
                                text-align: center;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color:rgba(255,255,0,1);
                                line-height:88px;
                                text-shadow:0px 5px 0px rgba(0, 0, 0, 0.35);
                                background-image: url('./img/zhjc_klzt_data_bg.png');
                                font-weight:400;
                                margin-left: -8px;
                                color:rgba(255,255,0,1);
                                /*line-height:30px;*/
                                width:80px;
                                height:88px;
                                /*box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);*/
                                text-shadow:0px 5px 0px rgba(0, 0, 0, 0.35);
                                // box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);
                                border-radius:8px;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
            }
            .map{
                margin-top: 20px;
                flex: 700;
            }


        }
        .right-panel{
            flex: 380;
            position: relative;
            display: flex;
            flex-direction: column;

            .top{
                position: relative;
                flex: 320;
                .zbjt{
                    height: calc(100% - 45px);
                    background: url('./img/zhjc_zbjt_bg.png') no-repeat;
                    background-size: 427px 269px;
                    background-position: center center;
                    text-align: center;
                    position: relative;
                     @include allCenter;
                    .item-wrapper{
                        width: 427px;
                        height: 269px;
                        position: relative;
                        .item{
                            position: absolute;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            p{
                                font-size: 24px;
                            }
                            h2{
                                margin-top: 10px;
                                font-size: 14px;
                            }
                        }
                        .first{
                            left: 161px;
                            top: 1px;
                            width: 110px;
                            height: 120px;
                        }
                        .second{
                            right: 1px;
                            top: 1px;
                            width: 110px;
                            height: 120px;
                        }
                        .three{
                            left: 1px;
                            bottom: 1px;
                            width: 170px;
                            height: 180px;
                        }
                        .four{
                            right: 80px;
                            bottom: 1px;
                            width: 120px;
                            height: 140px;
                        }
                    }
                }
            }
            .bottom{
                margin-top: 10px;
                position: relative;
                flex: 450;
                .trafficList {
                    ul {
                        display: flex;
                        flex-direction: column;
                        li {
                            display: flex;
                            margin-top: 5px;
                            /*justify-content: center;*/
                            align-items: center;
                            justify-items: center;

                            .item:nth-child(1) {
                                width: 40px;
                                height: 40px;
                            }

                            .item:nth-child(2) {
                                position: absolute;
                                text-align: left;
                                left: 16px;
                            }

                            .item:nth-child(3) {
                                flex-basis: 110px;
                            }

                            .item:nth-child(4) {
                                flex: 1;
                                position: relative;

                                span:nth-child(1) {
                                    border-radius: 6px;
                                    width: 100%;
                                    height: 20px;
                                    display: inline-block;
                                    background-color: #364b7b;
                                    // background-image: linear-gradient(to right, rgb(30, 89, 219), rgb(3, 225, 234));
                                }

                                span:nth-child(2) {
                                    border-radius: 6px;
                                    position: absolute;
                                    left: 0;
                                    width: 90%;
                                    height: 20px;
                                    display: inline-block;
                                    background-image: linear-gradient(to right, rgb(30, 89, 219), rgb(3, 225, 234));
                                }
                            }

                            .item:nth-child(5) {
                                margin-left: 16px;
                                flex-basis: 50px;
                                font-size: 16px;
                                color: rgba(1, 233, 235, 1);
                            }
                        }
                    }
                }
                .traffic{
                    background-color: #0e2d72;
                }
            }
        }
        .back_color{//背景颜色
            background-color:   rgba(0,0,0,0.6);
        }
    }
    .date-float{
        position: absolute;
        right: 20px;
        top: -10px;
        visibility: hidden;
    }
</style>