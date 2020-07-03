<template>
<!-- 综合查询查询结果组件  运输证号  车牌号 -->
    <div class="SearchContent-wrapper nomap-content-container">
        <div class="item-wrapper" v-for="item in itemList" :key="item.name" >
                    <div class="table-wrapper">
                        <table border="1" >
                            <tr>
                                <th>姓名:</th>
                                <td> <div>{{ item.yhmc }}</div></td>
                                <th>性别:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>出生日期:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>身份证号码:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                
                            </tr>
                            <tr>
                                <th>联系电话:</th>
                                <td> <div>{{ item.yhmc }}</div> </td>
                                <th>联系地址:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>驾驶证号:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>驾驶证初领日期:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                
                            </tr>
                            <tr>
                                <th>准驾车型:</th>
                                <td> <div>{{ item.yhmc }}</div> </td>
                                <th>资格证初领日期:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>资格证有效期起止:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>资格证发证日期:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                
                            </tr>
                            <tr>
                                <th>资格证当前状态:</th>
                                <td> <div>{{ item.yhmc }}</div> </td>
                                <th>从业资格证类别:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>从业资格证核发单位:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>从业资格证号:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                
                            </tr>
                            
                        </table>
                    </div>
                    <section class="btn-wrapper">
                        <el-row>
                            <el-button type="primary" @click="choosebtn(xcsg)"><span>行车事故</span><span>({{ item.xcsg }})</span></el-button>
                            <el-button @click="choosebtn(xcsg)" type="primary" round >交通违法({{ item.jtwf }})</el-button>
                            <el-button @click="choosebtn(xcsg)" type="primary" round>行政处罚({{ item.xzcf }})</el-button>
                            <el-button @click="choosebtn(xcsg)" type="primary" round>客运线路({{ item.kyxl }})</el-button>
                            <el-button @click="choosebtn(xcsg)" type="primary" round>投诉({{ item.ts }})</el-button>                        </el-row>
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
                this.$parent.detailShow(buttonType);
            }
        },
        data() {
            return {
                itemList:[
                    {
                        yhmc:'张三',
                        yhdz:'成都市锦江区人民南路二段72号',
                        frdb:'胥执鹏',
                        dhhm:'85327047',
                        jyxkz:'510000000005',
                        xkzhfsj:'2015-1-1',
                        xkzyxsj:'2015-1-1~2020-1-1',
                        fzjg:'四川省道路运输管理局',
                        jyfw:'省际班车客运（二类）,省际班车客运（三类）,省际班车客运（四类）,省际班车客运（一类）',
                        jyzt:'营业',
                        zlxykh:'A',
                        shxydm:'91510000201801701W',
                        xcsg:3,
                        jtwf:4,
                        xzcf:6,
                        kyxl:13,
                        ts:1
                    },
                    {
                        yhmc:'张三',
                        yhdz:'成都市锦江区人民南路二段72号',
                        frdb:'胥执鹏',
                        dhhm:'85327047',
                        jyxkz:'510000000005',
                        xkzhfsj:'2015-1-1',
                        xkzyxsj:'2015-1-1~2020-1-1',
                        fzjg:'四川省道路运输管理局',
                        jyfw:'省际班车客运（二类）,省际班车客运（三类）,省际班车客运（四类）,省际班车客运（一类）',
                        jyzt:'营业',
                        zlxykh:'A',
                        shxydm:'91510000201801701W',
                         xcsg:3,
                        jtwf:4,
                        xzcf:6,
                        kyxl:13,
                    },
                    {
                        yhmc:'张三',
                        yhdz:'成都市锦江区人民南路二段72号',
                        frdb:'胥执鹏',
                        dhhm:'85327047',
                        jyxkz:'510000000005',
                        xkzhfsj:'2015-1-1',
                        xkzyxsj:'2015-1-1~2020-1-1',
                        fzjg:'四川省道路运输管理局',
                        jyfw:'省际班车客运（二类）,省际班车客运（三类）,省际班车客运（四类）,省际班车客运（一类）',
                        jyzt:'营业',
                        zlxykh:'A',
                        shxydm:'91510000201801701W',
                         xcsg:3,
                        jtwf:4,
                        xzcf:6,
                        kyxl:13,
                    },
                    {
                        yhmc:'张三',
                        yhdz:'成都市锦江区人民南路二段72号',
                        frdb:'胥执鹏',
                        dhhm:'85327047',
                        jyxkz:'510000000005',
                        xkzhfsj:'2015-1-1',
                        xkzyxsj:'2015-1-1~2020-1-1',
                        fzjg:'四川省道路运输管理局',
                        jyfw:'省际班车客运（二类）,省际班车客运（三类）,省际班车客运（四类）,省际班车客运（一类）',
                        jyzt:'营业',
                        zlxykh:'A',
                        shxydm:'91510000201801701W',
                         xcsg:3,
                        jtwf:4,
                        xzcf:6,
                        kyxl:13,
                    },
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