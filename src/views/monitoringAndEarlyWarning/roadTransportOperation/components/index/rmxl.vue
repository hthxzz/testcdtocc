<template>
  <div class="rmxl-wrap">
    <div>
      <ChangeTag :itemList="itemList" @getStatues="getStatues" />
    </div>
    <div class="realTime" v-loading="loading">
      <table>
        <tr v-for="(item, index) in rmxlList" :key="item.name">
          <td>NO. {{index + 1 }}</td>
          <th>{{item.toName}}</th>
          <td>{{item.value}} 人次</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getHotLine();
  },
  methods: {
    getHotLine(val) {
      const s = val || "";
      this.$http
        .$get("/kyjc_indexHandler/getHotLine", {
          type: s
        })
        .then(res => {
          this.rmxlList = res.slice(0, 5);
          this.loading = false;
        });
    },
    getStatues(val) {
      this.loading = true;
      this.getHotLine(val.code);
      this.$emit("setHotDes", val.code);
    }
  },
  data() {
    return {
      loading: true,
      itemList: [
        { code: "all", value: "省内" },
        { code: "city", value: "市内" }
      ],
      rmxlList: []
    };
  }
};
</script>

<style lang="scss" scoped>
$capcity: 0.9;
.realTime {
  margin-top: 10px;
  // margin-left: 10px;
  // padding-left: 10px;
  table {
    width: 100%;
    tr {
      &:hover {
        background-color: rgba(32, 86, 221, 0.8) !important;
      }
      th {
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
      }
      td {
        color: rgba(255, 255, 255, 0.6);
      }
      th:nth-child(1) {
        width: 15%;
        // color: rgba(32, 86, 221, $capcity);
      }
      th:nth-child(2) {
        text-align: left;
        // color: rgba(114, 246, 250, $capcity);
      }
      th:nth-child(3) {
        // color: rgba(255, 255, 0, $capcity);
      }
    }
    tr:nth-child(2n) {
      background-color: rgba(32, 86, 221, 0.1);
    }
  }
}
.rmxl-wrap {
  overflow: hidden;
}
</style>