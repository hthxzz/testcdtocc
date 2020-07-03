<template>
    <div class="jtwf-wrapper nomap-content-container">
        <h2>行车事故</h2>
        <p>2017-1-1成都发生重大道路行车事故（2017-1-1 12:30:30）</p>
        <div class="SearchContent-wrapper">
            <div class="item-wrapper" v-for="item in itemList" :key="item.name" >
                        <div class="table-wrapper">
                            <table border="1" >
                                <tr>
                                    <th>发生时间:</th>
                                    <td> <div>{{ item.fssj }}</div> </td>
                                    <th>发生地点:</th>
                                    <td><div>{{ item.fsdd }}</div></td>
                                </tr>
                                <tr>
                                    <th>事故直接原因:</th>
                                    <td colspan="3"><div>{{ item.sgzjyy }}</div> </td>
                                </tr>
                                <tr>
                                    <th class="yello-lable">车牌号:</th>
                                    <td class="yello-lable"><div>{{ item.cph }}</div> </td>
                                    <th>营运证号:</th>
                                    <td><div>{{ item.yyzh }}</div></td>
                                </tr>
                                <tr>
                                    <th class="yello-lable">驾驶员姓名:</th>
                                    <td class="yello-lable"> <div>{{ item.jszh }}</div> </td>
                                    <th>身份证号:</th>
                                    <td><div>{{ item.sfzh }}</div></td>
                                </tr>
                                <tr>
                                    <th>从业资格证类别:</th>
                                    <td><div>{{ item.cyzgzlb }}</div></td>
                                    <th>从业资格证号码:</th>
                                    <td><div>{{ item.cyzgzhm }}</div> </td>  
                                </tr>
                                <tr>
                                    <th class="yello-lable">发生事故单位:</th>
                                    <td class="yello-lable" colspan="3"><div>{{ item.fssgdw }}</div> </td>
                                </tr>
                                <tr>
                                    <th>死亡人数:</th>
                                    <td><div>{{ item.swrs_d }}</div> </td>
                                    <th>伤亡人数:</th>
                                    <td><div>{{ item.swrs_s }}</div></td>
                                </tr>
                                <tr>
                                    <th>失踪人数:</th>
                                    <td colspan="3"><div>{{ item.szrs }}</div></td>
                                </tr>    
                                <tr>
                                    <th>事故概况:</th>
                                    <td colspan="3"> <div>{{ item.sggk }}</div> </td>
                                </tr>
                                <tr>
                                    <th>事故责任:</th>
                                    <td colspan="3" > <div>{{ item.sgzr }}</div> </td>
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
                        fssj:'2017-1-1 12:30:30',
                        fsdd:'成都市二环路西一段2号',
                        sgzjyy:'驾驶员操作不当',
                        cph:'川A12121',
                        yyzh:'1111234345655',
                        jsyxm:'雷鹏',
                        jszh:'',
                        sfzh:'510182198206013',
                        cyzgzlb:'',                               
                        cyzgzhm:'',
                        fssgdw:'四川东方龙运业有限公司',
                        swrs_d:5,
                        swrs_s:0,
                        szrs:2,
                        sggk:"",
                        sgzr:"",
                    },
                    {
                        fssj:'2017-1-1 12:30:30',
                        fsdd:'成都市二环路西一段2号',
                        sgzjyy:'驾驶员操作不当',
                        cph:'川A12121',
                        yyzh:'1111234345655',
                        jsyxm:'雷鹏',
                        jszh:'',
                        sfzh:'510182198206013',
                        cyzgzlb:'',                               
                        cyzgzhm:'',
                        fssgdw:'四川东方龙运业有限公司',
                        swrs_d:5,
                        swrs_s:0,
                        szrs:2,
                        sggk:"",
                        sgzr:"",
                    },{
                        fssj:'2017-1-1 12:30:30',
                        fsdd:'成都市二环路西一段2号',
                        sgzjyy:'驾驶员操作不当',
                        cph:'川A12121',
                        yyzh:'1111234345655',
                        jsyxm:'雷鹏',
                        jszh:'',
                        sfzh:'510182198206013',
                        cyzgzlb:'',                               
                        cyzgzhm:'',
                        fssgdw:'四川东方龙运业有限公司',
                        swrs_d:5,
                        swrs_s:0,
                        szrs:2,
                        sggk:"",
                        sgzr:"",
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
            color: #ea1c2f;
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
                                    width: 150px;
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
                                .yello-lable{
                                    color: #FFFF00;
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