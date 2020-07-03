export default {
    data() {
        return {
            tableData: [],
            tableHeight: 0,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            showPagination: true,
        }
    },
    created() {
        // 进入页面时加载 表格数据
        if (this.searchConfig) {
            this.fetchTableData();
        }

    },
    mounted() {
        this.setTableHeight();
    },
    methods: {
        setTableHeight() {
            let tableHeight = 0;
            tableHeight = this.$refs.table && this.$refs.table.$el.getBoundingClientRect().height;
            if (tableHeight != 0) {
                this.tableHeight = tableHeight;
                setTimeout(() => {
                    this.tableHeight = this.tableHeight + 0.1;
                }, 6);
            }
        },
        formateTime(row, column, cellValue) {
            return cellValue && this.$utils.dayjs(parseInt(cellValue)).format('YYYY-MM-DD');
        },
        // 进入页面时加载 表格数据
        fetchTableData(state) {
            this.$http.$get(this.url, {
                page: state && state.currentPage || this.currentPage,
                pageSize: state && state.pageSize || this.pageSize
            }).then((data) => {
                if (this.showPagination) {
                    if (this.formateTableData) {
                        let tableData = this.formateTableData(data)
                        this.tableData = tableData.results;
                        this.total = tableData.totalRecordNum;
                        return;
                    } else {
                        this.tableData = data.results;
                        this.total = data.totalRecordNum;
                    }

                } else {
                    this.tableData = data;
                    // this.total = data.totalRecordNum;
                }

            })
        },
        handleDetail(row, searchname) {
            const searchConfig = {};
            if (searchname) {
                searchConfig[searchname] = row[searchname]
            } else {
                searchConfig.id = row["id"]
            }
            const data = this.detailFormConfig.data;
            this.$http.$get(this.detailFormConfig.url, searchConfig).then(result => {
                if (!result) {
                    return;
                }
                const res = result;
                const keys = Object.keys(res);
                data.forEach((val) => {
                    val.forEach((val2) => {
                        for (const key of keys) {
                            if (val2.key == key) {
                                if (val2.formate) {
                                    val2.value = val2.formate.call(this, res[key]);
                                } else {
                                    val2.value = res[key];
                                }
                            }
                        }
                    })
                })
                this.detailFormConfig.data = data;
                // this.$store.state.app.fullscreenLoading = false;
                this.detailFormConfig.show = true;
            });

        },
        getSearchValue(val) {
            this.getSearchTableValue(val);
        },
        getSearchTableValue(val) {
            let isKeyV = this.searchConfig.isKeyV;
            const search = {
                page: this.currentPage,
                pageSize: this.pageSize
            };
            if (isKeyV) {
                Object.assign(search, val)
            } else {
                search.queryFields = JSON.stringify(val)
            }
            this.$http.$post(this.url, search

            ).then((data) => {
                if (this.showPagination) {
                    this.tableData = data.results;
                    this.total = data.totalRecordNum;
                } else {
                    this.tableData = data;
                    // this.total = data.totalRecordNum;
                }
            })

        },
        formateRate(row, column, cellValue) {//同比格式化
            return cellValue?cellValue.toFixed(0)+'%':'--';
        },
        formateTraffic(row, column, cellValue) {//轨道客流量格式化
            return cellValue?(cellValue/10000).toFixed(2):'--';
        },
        formateNYR(row, column, cellValue) {//轨道客流量格式化
            return cellValue?cellValue.substring(0,4)+"年"+Number(cellValue.substring(4,6))+"月"+
                Number(cellValue.substring(6,8))+"日":'--';
        },
    }
}