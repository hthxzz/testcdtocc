<template>
<!-- 综合查询查询结果组件  经营许可证号  经营业户 -->
    <div class="SearchContent-wrapper">
        <div class="item-wrapper" v-for="item in itemList" :key="item.name" >
                    <div class="table-wrapper">
                        <table border="1" >
                            <tr>
                                <th>车牌号:</th>
                                <td> <div>{{ item.yhmc }}</div> </td>
                                <th>车牌颜色:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>发动机号:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>底盘号:</th>
                                <td><div>{{ item.frdb }}</div></td>
                            </tr>
                            <tr>
                                <th>车主姓名:</th>
                                <td> <div>{{ item.yhmc }}</div> </td>
                                <th>车身颜色:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>经营许可证:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>许可证核发时间:</th>
                                <td><div>{{ item.frdb }}</div></td>
                            </tr>
                            <tr>
                                <th>许可证有效时间:</th>
                                <td> <div>{{ item.yhmc }}</div> </td>
                                <th>初次发证日期:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>技术等级评定日期:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>技术等级:</th>
                                <td><div>{{ item.frdb }}</div></td>
                            </tr>
                            <tr>
                                <th>年审日期:</th>
                                <td> <div>{{ item.yhmc }}</div> </td>
                                <th>年审状态:</th>
                                <td><div>{{ item.yhdz }}</div></td>
                                <th>营运状态:</th>
                                <td><div>{{ item.frdb }}</div></td>
                                <th>业户名称:</th>
                                <td><div>{{ item.frdb }}</div></td>
                            </tr>
                            

                            <tr>
                                <th>业户地址:</th>
                                <td colspan="2" ><div>{{ item.jyfw }}</div></td>
                                <th>经营范围:</th>
                                <td colspan="2" ><div>{{ item.jyfw }}</div></td>
                            </tr>
                        </table>
                    </div>
                    <section class="btn-wrapper">
                        <div class="item"><span>行车事故</span><span>({{ item.xcsg }})</span></div>
                        <div class="item"><span>交通违法</span><span>({{ item.jtwf }})</span></div>
                        <div class="item"><span>行政处罚</span><span>({{ item.xzcf }})</span></div>
                        <div class="item"><span>客运线路</span><span>({{ item.kyxl }})</span></div>
                    </section>
                </div>
    </div>
</template>

<script>
    export default {
        name: '',
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