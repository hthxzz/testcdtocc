<template>
    <div class="BusDepartureFrequency-wrapper">
        <div style="height: 300px;width: 100%">
            <PanelItem title="各发车间隔时间的线路统计情况" :displaySwitch=false></PanelItem>
            <section class="search-wrapper">
                <SearchPanel :searchConfig="searchConfig" ></SearchPanel>
            </section>
            <v-chart :options="option" style="height: 300px"></v-chart>
        </div>
        <div style="margin-top: 100px">
        <TableAndPagination
                :showSearchPanel=false

        >
            <el-table style="width: 100%;height:100%;overflow-y: auto" stripe
                      ref="table">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="时间段开始时间">
                                <span>1</span>
                            </el-form-item>
                            <el-form-item label="时间段结束时间">
                                <span>2</span>
                            </el-form-item>
                            <el-form-item label="发车时间间隔范围（分钟）">
                                <span>3</span>
                            </el-form-item>
                            <el-form-item label="线路数">
                                <span>4</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column label="时间段开始时间" prop="a"></el-table-column>
                <el-table-column label="时间段结束时间" prop="c"></el-table-column>
                <el-table-column label="发车时间间隔范围（分钟）" prop="d"></el-table-column>
                <el-table-column label="线路数" prop="e"></el-table-column>
                <el-table-column label="详细信息">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </TableAndPagination>
        </div>
    </div>
</template>


<script>
    import echartContent from "../../monitoringAndEarlyWarning/AirTransport/echartContent"
    import {option5} from "./components/options";
    export default {
        name: '',
        methods: {
        },
        data() {
            return {
                option:option5,
                searchConfig: {
                    searchCondition: [
                        {
                            order: 14,
                            type: "datetimerange",
                            formate: "yyyy-MM-dd HH:mm:ss",
                            label: "",
                            placeholderStart: "开始时间",
                            placeholderEnd: "截止时间",
                            VModelvalue: {
                                name: "date1",
                                defaultValue: "2"
                            }
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
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>