<template>
  <div class="lineDetail-wrap" v-if="hide" :class="{hide:isHide}">
    <!-- 线路详情 -->
    <span class="close" @click="close">x</span>
    <div class="lineDetail-inner">
      <table>
        <tr>
          <th>线路名称</th>
          <td>{{content.lineName}}</td>
        </tr>
        <tr>
          <th>营运里程</th>
          <td>{{content.yylc}}</td>
        </tr>
        <tr>
          <th>营运里程占比</th>
          <td>{{content.lczb}}</td>
        </tr>
        <tr>
          <th width="40%">线路客流</th>
          <td width="60%">{{content.xlkl}}</td>
        </tr>
        <tr>
          <th>线路客流占比</th>
          <td>{{content.klzb}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  // props: ["content"],
  mounted() {
    this.addHide();
  },
  methods: {
    addHide() {
      let i = 1,
        content = "";
      setInterval(() => {
        if (i == 4) {
          i = 1;
        }
        this.content = this[content];
        content = "content" + i;
        console.log(content);

        this.isHide = !this.isHide;

        i++;
      }, 3000);
    },
    close() {
      this.hide = !this.hide;
    }
  },
  data() {
    return {
      content: {},
      content1: {
        lineName: "1号线",
        yylc: "23.5公里",
        lczb: "25%",
        xlkl: "256431人次",
        klzb: "29%"
      },
      content2: {
        lineName: "2号线",
        yylc: "45.1公里",
        lczb: "15%",
        xlkl: "664031人次",
        klzb: "39%"
      },
      content3: {
        lineName: "3号线",
        yylc: "56.5公里",
        lczb: "65%",
        xlkl: "564031人次",
        klzb: "79%"
      },
      hide: true,
      isHide: false
    };
  }
};
</script>

<style lang="scss" scoped>
.lineDetail-wrap {
  position: relative;
  width: 300px;
  background-color: rgba(7, 18, 49,.8);
  // border-radius: 2px;
  transition: all 1.6s;
  .close {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.9);
    display: inline-block;
    cursor: pointer;
  }
  .lineDetail-inner {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
  table {
    padding-top: 20px;
    width: 100%;
    tr {
      line-height: 36px;
      td {
        text-align: left;
      }
      th {
        text-align: left;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
}
.hide {
  opacity: 0;
}
</style>