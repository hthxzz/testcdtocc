<template>
    <div class="jtwf-wrapper nomap-content-container">
        <h2>交通违法</h2>
        <p>雷鹏机动车行驶超速50%以上案件（2019-11-08）</p>
        <div class="SearchContent-wrapper">
            <div class="item-wrapper" v-for="item in itemList" :key="item.name" >
                        <div class="table-wrapper">
                            <table border="1" >
                                <tr>
                                    <th>决定书编号:</th>
                                    <td> <div>{{ item.yhmc }}</div> </td>
                                    <th>驾驶人姓名:</th>
                                    <td><div>{{ item.yhdz }}</div></td>
                                </tr>
                                <tr>
                                    <th>车辆号牌号码:</th>
                                    <td> <div>{{ item.yhmc }}</div> </td>
                                    <th>车辆号牌种类:</th>
                                    <td><div>{{ item.yhdz }}</div></td>
                                </tr>
                                <tr>
                                    <th>处罚类别:</th>
                                    <td> <div>{{ item.yhmc }}</div> </td>
                                    <th>处罚结果:</th>
                                    <td><div>{{ item.yhdz }}</div></td>
                                </tr>
                                <tr>
                                    <th>记分:</th>
                                    <td> <div>{{ item.yhmc }}</div> </td>
                                    <th>处罚依据:</th>
                                    <td><div>{{ item.yhdz }}</div></td>
                                </tr>
                                <tr>
                                    <th>处罚部门:</th>
                                    <td> <div>{{ item.yhmc }}</div> </td>
                                    <th>处罚日期:</th>
                                    <td><div>{{ item.yhdz }}</div></td>
                                </tr>
                                <tr>
                                    <th>企业名称:</th>
                                    <td> <div>{{ item.yhmc }}</div> </td>
                                    <th>社会信用代码:</th>
                                    <td><div>{{ item.yhdz }}</div></td>
                                </tr>
                                <tr>
                                    <th>处罚事实:</th>
                                    <td colspan="3" > <div>{{ item.yhmc }}</div> </td>
                                </tr>



                            </table>
                        </div>
                    </div>
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
                    }
                    
                    ]
            }
        }
    }
</script>

<style lang="scss" scoped>

    .jtwf-wrapper{
        height: 100%;
        h2{
            background-color: rgba(30, 86, 221, 1);
            padding: 6px;
            width: 100px;
            border-radius: 10px;
            cursor: pointer;
            color: #FFFF00;
            text-align: center;
            margin-bottom: 10px;
        }
        p{
            margin: 10px 0;
        }
    }
    

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
    // .btn-wrapper{
    //     position: absolute;
    //     display: flex;
    //     bottom: -36px;
    //     .item{
    //         margin-left: 10px;
    //         background-color: rgba(30, 86, 221, 1);
    //         padding: 6px;
    //         border-radius: 10px;
    //         cursor: pointer;
    //         span{
    //             color: #FFFF00;
    //         }
    //     }
    // }
</style>