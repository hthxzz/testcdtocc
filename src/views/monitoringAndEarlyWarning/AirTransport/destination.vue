<template>
    <div class="destination-wrapper">
        <!-- 市内客流分析 -->
        <basemap />
        <div class="panel-wrapper left">
            <!-- 今日运行情况 -->
            <div class="snkl-container">
                <PanelItem title="市内客流目的地分析" :displaySwitch=false >
                    <div class="snkl-wrapper">
                        <div class="item-wrapper">
                            <div class="item" >
                                <h2>节假日</h2>
                            </div>
                            <div class="item" >
                                <h2>工作日</h2>
                            </div>
                        </div>
                        <SearchPanel :searchConfig="searchConfig" @getSearchValue="getSearchValue"  @handleQuery="handleQuery"  ></SearchPanel>
                    </div>

                </PanelItem>

            </div>
        </div>
        <div class="panel-wrapper right">
            <panel>
                <div class="kel-container">
                    <PanelItem title="客流排名" :displaySwitch=false >
                        <div>
                            <el-table :data="tableData" style="width: 100%" stripe fit=true >
                                <el-table-column  label="序号"  :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.traffic >= 40000">{{ scope.$index+1 }}</span>
                                        <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.traffic >=20000&&scope.row.traffic<40000">{{ scope.$index+1 }}</span>
                                        <span style="color:rgb(255,234,70)" v-if="scope.row.traffic >=10000&&scope.row.traffic<20000">{{ scope.$index+1 }}</span>
                                        <span style="color:rgb(54,255,41)" v-if="scope.row.traffic <10000">{{scope.$index+1 }}</span>
                                    </template>

                                </el-table-column>
                                <el-table-column label="客流区域" prop="area">
                                    <template slot-scope="scope">
                                        <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.traffic >= 40000">{{ scope.row.area }}</span>
                                        <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.traffic >=20000&&scope.row.traffic<40000">{{ scope.row.area }}</span>
                                        <span style="color:rgb(255,234,70)" v-if="scope.row.traffic >=10000&&scope.row.traffic<20000">{{ scope.row.area }}</span>
                                        <span style="color:rgb(54,255,41)" v-if="scope.row.traffic <10000">{{scope.row.area }}</span>
                                    </template>

                                </el-table-column>
                                <el-table-column label="平均客流">
                                    <template slot-scope="scope">
                                        <span style="color:rgba(255, 0, 0, 1)" v-if="scope.row.traffic >= 40000">{{ scope.row.traffic }}</span>
                                        <span style="color:rgba(255, 192, 0, 1)" v-if="scope.row.traffic >=20000&&scope.row.traffic<40000">{{ scope.row.traffic }}</span>
                                        <span style="color:rgb(255,234,70)" v-if="scope.row.traffic >=10000&&scope.row.traffic<20000">{{ scope.row.traffic }}</span>
                                        <span style="color:rgb(54,255,41)" v-if="scope.row.traffic <10000">{{ scope.row.traffic }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </PanelItem>
                </div>
                <div class="cxxz-container">
                    <PanelItem title="出行选择" :displaySwitch=false >

                        <div style="height:200px;">
                            <v-chart :options="travelEcharOption" :autoresize="true" theme="theme"></v-chart>
                        </div>


                    </PanelItem>
                </div>
            </panel>

        </div>
    </div>
</template>



<script>
    import trafficJam from "./components/trafficJam.vue";
    import echartContent from"./echartContent";
    export default {
        name: '',
        components: {
            trafficJam,
        },
        mixins: [echartContent],
        mounted() {
            // this.czOption=this.creatOption(this.czData,"line","",false,false,8,true,10, "人次");
            this.createCXFSOption(this.travelData);

            },
        data() {
            return {
                tableData:[
                    {area:"天府广场",traffic:56700},
                    {area:"天府软件园",traffic:34500},
                    {area:"府城大道",traffic:23450},
                    {area:"三圣花乡",traffic:5000},
                ],
                rollNo:1234,
                comeOrOutConfig:['到达','出发'],
                snkldetail:'出港航班情况',
                cgsl:21,
                zxcg:'CA502',
                jgsl:100,
                zxjg:'ZA1234',
                ywl:'21%',
                pjyw:'112m',
                p1:true,
                p2:false,
                p3:false,
                czOption:{},
                czData:[
                    ['今日','昨日'],
                    ['1：00','2：00','3：00','4：00','5：00'],
                    [2000,5431,3421,7625,8282],
                    [6532,2625,8756,7252,4352]
                ],
                travelData: [
                    ['出租车', '公交', '地铁', '大巴', '其它'],
                    [
                        {value: 15, name: '出租车'},
                        {value: 45, name: '公交'},
                        {value: 12, name: '地铁'},
                        {value: 15, name: '大巴'},
                        {value: 13, name: '其它'}]
                ],
                travelEcharOption:{},
                searchConfig: {
                    searchCondition: [
                        {
                            order: 14,
                            otype: 'week',
                            type: "daterange",
                            formate: "yyyy-MM-dd",
                            label: "",
                            placeholderStart: "开始时间",
                            placeholderEnd: "截止时间",
                            VModelvalue: {
                                name: "date1",
                                defaultValue: ""
                            }
                        },
                        {
                            order: 306,
                            type: "select",
                            label: "频次",
                            placeholder: "频次",
                            VModelvalue: {
                                name: "pc",
                                defaultValue: ""
                            },
                            options: [
                                {
                                    value: "1",
                                    label: "小时"
                                },
                                {
                                    value: "2",
                                    label: "日"
                                },
                                {
                                    value: "3",
                                    label: "月"
                                },
                                {
                                    value: "4",
                                    label: "年"
                                }

                            ]
                        },
                        {
                            order: 36,
                            type: "select",
                            label: "类型",
                            placeholder: "类型",
                            VModelvalue: {
                                name: "lx",
                                defaultValue: ""
                            },
                            options: [
                                {
                                    value: "1",
                                    label: "出港"
                                },
                                {
                                    value: "2",
                                    label: "进港"
                                }

                            ]
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
                }

            }
        },
        methods: {
            createCXFSOption(data){
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
                            radius: ['20%', '38%'],
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
                            radius: "49%",
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
                            radius: "49%",
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
                            radius: ["65%", "80%"],
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
                            radius: ["50%", "51%"],
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
            qk1(){
                this.snkldetail = '出港航班情况';
                this.p1 = true;
                this.p2 = false;
                this.p3 = false;
            },
            qk2(){
                this.snkldetail = '进港航班情况';
                this.p1 = false;
                this.p2 = true;
                this.p3 = false;
            },
            qk3(){
                this.snkldetail = '出港延误';
                this.p1 = false;
                this.p2 = false;
                this.p3 = true;
            },
            qk4(){
                this.snkldetail = '进港延误';
                this.p1 = false;
                this.p2 = false;
                this.p3 = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .destination-wrapper{
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
        }
        .right{
            right: 0;
        }
    }
    .comeorout{
        float:right;
    }
    .snkl-wrapper{
        display: flex;
        flex-direction: column;
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
                    line-height: 60px;
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
    .detail-wrapper{

        h2{
            padding: 10px 0 0 30px;
            font-size: 16px;
        }
        p{
            padding: 10px 0 0 30px;
            font-size: 14px;
            span{
                color: #ead72c;
                font-size: 16px;
            }
        }
    }
    .zbdl{
        height: 230px;
        margin-top: 16px;
    }
    .kel-container{
        height:40%;
        overflow: auto;
    }
    .cxxz-container{
        height:50%;
    }



</style>