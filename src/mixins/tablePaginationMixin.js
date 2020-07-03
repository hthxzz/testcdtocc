export default {
    data () {
        return {
            total:100,
            pageSize:10,
            url: '/users/getUserByPage',
            tableData:[],
            currentPage:1
        }
    },
    created () {
        this.fetchTableData();
    },
    methods: {
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        handlePrevClick(PrevPage) {
            this.currentPage = PrevPage;
        },
        handleNextClick(nextPage) {
            this.currentPage = nextPage;
        },
        fetchTableData(){
            this.$http.$get2(this.url,{
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }).then((data) => {
                this.tableData = data.data.result;
            })
        }
    },
    watch: {
        currentPage(){
            this.fetchTableData();
        },
        pageSize(){
            this.fetchTableData();
        }
    }
}