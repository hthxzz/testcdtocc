export default {
    data() {
        return {
            total: 0,
            pageSize: 10,
            tableData: [],
            currentPage: 1
        }
    },
    props: ['totalP'],
    methods: {
        fetchTableData(){
            // console.log(this.$parent.fetchTableData);
            // this.$parent.fetchTableData({pageSize: this.pageSize,currentPage: this.currentPage})
            this.$emit("fetchTableData",{
                pageSize: this.pageSize,
                currentPage: this.currentPage
            });
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        handlePrevClick(PrevPage) {
            this.currentPage = PrevPage;
                // this.fetchTableData();
        },
        handleNextClick(nextPage) {
            this.currentPage = nextPage;
                // this.fetchTableData();
        }
    },
    watch: {
        totalP(){
            this.total = this.totalP;
        },
        currentPage() {
            this.fetchTableData();
        },
        pageSize() {
            this.fetchTableData();
        }
    }
}