<template>
<!-- 综合查询查询结果组件  经营许可证号  经营业户 -->
    <div class="SearchContent-wrapper nomap-content-container">
        <div class="item-wrapper" v-for="item in itemList" :key="item.name" >
                    <div class="table-wrapper">
                        <table border="1" >
                            <tr>
                                <th>车牌号:</th>
                                <td> <div>{{ item.cph }}</div> </td>
                                <th>车牌颜色:</th>
                                <td><div>{{ item.cpys }}</div></td>
                                <th>发动机号:</th>
                                <td><div>{{ item.fdjh }}</div></td>
                                <th>底盘号:</th>
                                <td><div>{{ item.dph }}</div></td>
                            </tr>
                            <tr>
                                <th>车主姓名:</th>
                                <td> <div>{{ item.czxm }}</div> </td>
                                <th>车身颜色:</th>
                                <td><div>{{ item.csys }}</div></td>
                                <th>经营许可证:</th>
                                <td><div>{{ item.jyxkz }}</div></td>
                                <th>许可证核发时间:</th>
                                <td><div>{{ item.xkzhfsj }}</div></td>
                            </tr>
                            <tr>
                                <th>许可证有效时间:</th>
                                <td> <div>{{ item.xkzyxsj }}</div> </td>
                                <th>初次发证日期:</th>
                                <td><div>{{ item.ccfzrq }}</div></td>
                                <th>技术等级评定日期:</th>
                                <td><div>{{ item.jsdjpdrq }}</div></td>
                                <th>技术等级:</th>
                                <td><div>{{ item.jsdj }}</div></td>
                            </tr>
                            <tr>
                                <th>年审日期:</th>
                                <td> <div>{{ item.nsrq }}</div> </td>
                                <th>年审状态:</th>
                                <td><div>{{ item.nszt }}</div></td>
                                <th>营运状态:</th>
                                <td><div>{{ item.yyzt }}</div></td>
                                <th>业户名称:</th>
                                <td><div>{{ item.yhmc }}</div></td>
                            </tr>
                            <tr>
                                <th>业户地址:</th>
                                <td colspan="2" ><div>{{ item.yhdz }}</div></td>
                                <th>经营范围:</th>
                                <td colspan="2" ><div>{{ item.jyfw }}</div></td>
                            </tr>
                        </table>
                    </div>
                    <section class="btn-wrapper">
                        <el-row>
                            <el-button class="item" @click="choosebtn('xcsg')" type="primary" round><span>行车事故</span><span>({{ item.xcsg }})</span></el-button>
                            <el-button class="item" @click="choosebtn('jtwf')" type="primary" round >交通违法({{ item.jtwf }})</el-button>
                            <el-button class="item" @click="choosebtn('xzcf')" type="primary" round>行政处罚({{ item.xzcf }})</el-button>
                            <el-button class="item" @click="choosebtn('kyxl')" type="primary" round>客运线路({{ item.kyxl }})</el-button>
                            <el-button class="item" @click="choosebtn('ts')" type="primary" round>投诉({{ item.ts }})</el-button>
                        </el-row>
                        <!-- <div class="item"><span>行车事故</span><span>({{ item.xcsg }})</span></div>
                        <div class="item"><span>交通违法</span><span>({{ item.jtwf }})</span></div>
                        <div class="item"><span>行政处罚</span><span>({{ item.xzcf }})</span></div>
                        <div class="item"><span>客运线路</span><span>({{ item.kyxl }})</span></div>
                        <div class="item" v-if="item.ts > 0"><span>投诉</span><span>({{ item.ts }})</span></div>
                        <div class="item" v-else-if="item.ts == 0"></div> -->
                    </section>
                </div>
    </div>
</template>

<script>
    export default {
        name: '',
        methods:{
            choosebtn(buttonType){
                alert('button:'+buttonType);
                this.$parent.detailShow(buttonType);
            }
        },
        data() {
            return {
                itemList:[
                    {
                        cph:'川AB8787',
                        cpys:'黄色',
                        fdjh:'GHJKL09876',
                        dph:'LA92V2203B0HMN049',
                        czxm:'刘勇军',
                        csys:'红色',
                        jyxkz:'5100000000005',
                        xkzhfsj:'2015-1-1',
                        xkzyxsj:'2015-1-1~2020-1-1',
                        ccfzrq:'2010/11/4',
                        jsdjpdrq:'2019-10-10',
                        jsdj:'二级',
                        nsrq:'2019-10-10',
                        nszt:'年审合格',
                        yyzt:'营运',
                        yhmc:'四川东方龙运业有限公司',
                        yhdz:'成都市锦江区人民南路二段72号',
                        jyfw:'省级班车客运（二类）',
                        xcsg:1,
                        jtwf:2,
                        xzcf:3,
                        kyxl:4,
                        ts:0
                    }  
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .SearchContent-wrapper{
        // height: 100%;
        width: 100%;
    }
    .item-wrapper{
                    &:not(:first-child){
                        margin-top: 40px;
                    }
                    position: relative;
                    background-color: rgb(16, 49, 122);
                    padding: 10px;
                    border-radius: 9px;
                    .table-wrapper{
                        table{
                            // width: 100%;
                            text-align: center;
                            tr{
                                th{
                                    // width: 130px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    // display: inline-block;
                                    text-align: right;
                                    padding-left: 6px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                    // padding-bottom: 16px;
                                }
                                td{
                                    // width: 160px;
                                    text-align: left;
                                    font-size: 14px;
                                    // display: inline-block;
                                }
                            }
                        }
                    }
                }
    .btn-wrapper{
        position: absolute;
        display: flex;
        bottom: -36px;
        .item{
            margin-left: 10px;
            background-color: rgba(30, 86, 221, 1);
            padding: 6px;
            border-radius: 10px;
            cursor: pointer;
            span{
                color: #FFFF00;
            }
        }
    }
</style>