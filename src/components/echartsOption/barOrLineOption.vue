<template>
        <!--折线图或者柱状图公用组件-->
        <v-chart :options="echarOption" theme="theme"/>
</template>

<script>
    export default {
        name: "barOrLineOption",
        props: {
                echartData:Array,//数据
                echartType:String,//类型
                echartTitle:String,//标题
                ifShowLable: Boolean,//是否在图上显示数据
                barWidth:Number,//柱状图宽度
                ifBrokenLine:Boolean,//是否是折线
                symbolSize:Number,//折线目标点的大小
                symbol:Boolean,//是否显示线上的点
        },
        created() {
            this.creatOption(this.echartData, this.echartType, this.echartTitle,this.ifShowLable,this.ifBrokenLine,this.symbolSize,this.symbol,this.barWidth);
        },
        data(){
            return{
                echarOption: {},
            }
        },
        methods:{
            creatOption: function (data, type, title,ifShowLable,ifBrokenLine,symbolSize,symbol,barWidth) {
                var arraylist = [];//
                for (var i = 2; i < data.length; i++) {
                    var mydata = {};
                    mydata["name"] = data[0][i - 2]!=undefined?data[0][i - 2]:"";
                    mydata["type"] = type;
                    if(type=="line"){
                            if(ifBrokenLine==false){//平滑曲线
                                    mydata["smooth"]=true;
                            }else{
                                    mydata["smooth"]=false;
                            }
                            if(symbol==false){
                                    mydata["symbol"] ="none";
                            }else{
                                    if(symbolSize!=undefined){
                                            mydata["symbolSize"]=symbolSize;
                                    }else{
                                            mydata["symbolSize"]=10;
                                    }

                            }
                    }else{
                        if(barWidth!=undefined){
                                mydata["barWidth"]=barWidth;
                        }
                    }
                    mydata["data"] = data[i];

                    mydata["itemStyle"] =  {
                                normal:{
                                        label: {
                                                show : ifShowLable,
                                                position : 'top',
                                                formatter : "{c}",
                                                textStyle : {color: '#ffffff' }
                                        }
                                }
                        }

                    arraylist.push (mydata);
                }
                var option = {
                    /*title: {
                        text: title,
                        subtext: '',
                        x: 'center',
                        textStyle: {fontSize: 16, color: '#266CB4'}
                    },*/
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
              /*      toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['bar', 'line', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },*/
                  /*  legend: { // 图例配置
                        x: 'center',
                        y: 'top',
                        padding: 5, // 图例内边距，单位px，默认上下左右内边距为5
                        itemGap: 10, // Legend各个item之间的间隔，横向布局时为水平间隔，纵向布局时为纵向间隔
                        data: data[0]//图例名称
                    },*/
                    grid: {
                        /*x: 80,
                        x2: 40,*/
                        left: 60,
                        top: 30,
                        right: '2%',
                        bottom: 20,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: data[1],//X轴名称
                            name: '时间'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: ''
                        }
                    ],
                    series: arraylist
                };
                if(title!=""){
                    option.title= {text: title,subtext: '',x: 'center',textStyle: {fontSize: 16, color: '#266CB4'}};
                }
                if(data[0].length>1){
                    option.legend={x: 'right', y: 'top', padding: 5, itemGap: 10, data: data[0]};
                }
                this.echarOption = option;
            }
        }
    }
</script>

<style lang="scss" scoped>
   /* .echarts{
        width: 200px ;!* 200/100 *!;
        height: 100px;
    }*/
</style>